import { Component, AfterViewInit, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Sort} from '@angular/material/sort';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { IProfile } from 'src/app/services/profile/IProfile';
import { TwsService } from 'src/app/services/tws/tws.service';
import {TickObservable} from 'src/app/services/tws/ITickObserver'
import { OrderObservable } from 'src/app/services/tws/IOrderObserver';
import {DateUtilities} from 		'src/app/utilities/dateUtilities'
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { ProtoUtilities } from 'src/app/utilities/protoUtilities';
import { Settings } from 'src/app/utilities/settings'
import {DataSource,Order} from './DataSource'
import { ComponentPageTitle } from '../../material-site/page-title/page-title';

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbRequests from 'src/app/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;

import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
//import { Data } from 'src/app/shared/tws/summary/summary';

class Cell
{
	constructor( public order:Order, public control:string ){}
	equals( rhs ):boolean{ return rhs!=null && rhs && rhs.order.id===this.order.id && rhs.control==this.control; }
};

@Component( {selector: 'orders', styleUrls: ['orders.css'], templateUrl: './orders.html'} )
export class OrderComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private tws : TwsService, private componentPageTitle:ComponentPageTitle, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnInit()
	{
		this.componentPageTitle.title = this.componentPageTitle.title ? this.componentPageTitle.title+" | Orders" : "Orders";
	};

	ngOnDestroy()
	{
		this.profile.save();
	}

	ngAfterViewInit():void
	{
		this.profile.load().then( (value)=>{this.load();} );
	}
	load()
	{
		//this.data = null;
		let orders:Order[] = [];
		this.subscription = this.tws.reqAllOpenOrders();//TODO cancel this.
		this.subscription.subscribe2(
		{
			status: (value:Results.IOrderStatus)=>
			{
				orders.some( (order) =>
				{
					const found = order.id==value.orderId;
					if( found )
						order.status = value;
					return found
				});
			},
			open: (value:Results.IOpenOrder)=>
			{
				for( let index = this.data && this.data.values ? this.data.values.findIndex((original)=>original.openOrder.order.id==value.order.id) : -1; index!=-1; index=-1 )
				{
					let element = this.data.values[index];
					element.openOrder = value;
					element.limitNew = element.quantityNew = null;
					if( this.editing?.order?.id==value.order.id )
						this.editing = null;
					return;
				}
				let order = new Order( value );
				this.tws.reqContractSingle( value.contract ).then( (details)=>
				{
					const isMarketOpen = MarketUtilities.isMarketOpen( details );
					var previousDay = DateUtilities.toDays( MarketUtilities.previousTradingDate(new Date(), details.tradingHours[0]) );
					this.tws.reqPreviousDay( [value.contract.id] ).subscribe(
					{
						next: ( bar:Results.IDaySummary ) =>
						{
							if( isMarketOpen && bar.day>previousDay )
							{
								order.high = bar.high;
								order.low = bar.low;
								order.open = bar.open;
							}
							else if( isMarketOpen || bar.day==previousDay )
								order.close = bar.close;
							else if( bar.day>previousDay )
							{
								order.high = bar.high;//!isMarketOpen && day>previousDay
								order.low = bar.low;

								order.bid = bar.bid;
								order.ask = bar.ask;
								order.volume = ProtoUtilities.toNumber( bar.volume );
								order.last = ProtoUtilities.toNumber( bar.close );
							}
						},
						error: e=>{ console.error(e); }
					});
					if( isMarketOpen )
					{
						let subscription = this.tws.reqMktData( value.contract.id, [Requests.ETickList.CreditmanMarkPrice, Requests.ETickList.RTVolume], false );
						subscription.subscribe2( order );
						this.mktDataSubscriptions.set( value.contract.id, subscription );
					}
				});
				orders.push( order );
			},
			complete: ()=>
			{
				//console.log('complete2');
				this.data = new DataSource(this.settings.sort, orders);
			},
			error:e=>{this.subscription=null;console.error(e); this.cnsle.error(e,null); }
		});
	}
	lastEquals;
	isEditing( element, column )
	{
		const cell = new Cell( element, column );
		const equals = cell.equals( this.editing );
		if( equals!=this.lastEquals )
		{
			this.lastEquals = equals;
			//console.log( `equals=${equals}` );
		}
		return equals
			|| ( column=='shares' && cell.order.quantityNew!=null )
			|| ( column=='limit' && cell.order.limitNew!=null );
	}
	edit( element, column ){ this.editing = new Cell( element, column ); }
	hasChanges(order:Order){ return order.limitNew || order.quantityNew; }
	sortData(sort:Sort)
	{
		this.data.sort( sort );
		this.sort = sort;
	}
	submit( tick:Order )
	{
		var newOrder:IB.IOrder = JSON.parse( JSON.stringify(tick.openOrder.order) );
		if( tick.quantityNew )
			newOrder.quantity = tick.quantityNew;
		if( tick.limitNew )
			newOrder.limit = tick.limitNew;
		this.tws.placeOrder( tick.contract, newOrder, null, null );

	}
	undo( order:Order )
	{
		this.editing = order.quantityNew = order.limitNew = null;
	}
	cancel( id:number ):void
	{
		this.tws.cancelOrder( id );
/*		var button = <Button>event.currentTarget;
		if( button && button.innerText=="Help" )
		{
			var iframe = '<html><head><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="https://www.w3schools.com" style="height:calc(100% - 4px);width:calc(100% - 4px)"></iframe></html></body>';
			var win = window.open("","","width=600,height=480,toolbar=no,menubar=no,resizable=yes");
			win.document.write(iframe);
		}*/
		console.log( `cancel( '${id}' )` );
	}
	focusChange( $event, order, column )
	{
		//console.log( `focusChange( '${$event}', '${column}' );` );
		var editing = $event ? new Cell(order,column) : null;
		if( editing )
			this.editing = editing;
	}
	get editing():Cell{ return this._editing;} set editing(value:Cell){ this._editing=value;} private _editing:Cell;
	get end():Date{ return new Date( this._end.value );} set end(value:Date){this._end.setValue(value);} private _end = new FormControl();
	get start():Date{ return this._start.value; } set start(value:Date){ this._start.setValue(value); } private _start = new FormControl();
	data:DataSource;
	get settings(){return this.profile.value; }
	profile = new Settings<PageSettings>( PageSettings, "OrderComponent", this.profileService );
	get sort():Sort{ return this.settings.sort; } set sort(value){this.settings.sort = value;}
	displayedColumns:string[] = ["symbol","shares", "status", "Limit", "bidSize", "bid", "ask", "askSize", "last", "buttons"];
	subscription:OrderObservable;
	mktDataSubscriptions = new Map<number,TickObservable>();
}

class PageSettings
{
	assign( value:PageSettings ){ this.sort = value.sort; }
	sort:Sort = {active: "id", direction: "asc"};
}
