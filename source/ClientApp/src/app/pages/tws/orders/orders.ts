import { Component, AfterViewInit, OnInit, OnDestroy, Inject } from '@angular/core';
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
import { FormControl } from '@angular/forms';
import { ComponentPageTitle } from '../../material-site/page-title/page-title';
import * as IbRequests from 'src/app/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;


import * as IbResults from '../../../proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
//import { Data } from 'src/app/shared/tws/summary/summary';

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
		this.profile.load().subscribe(
		{
			complete: ()=>{this.load();},
			error: e =>{console.log(e);}
		});
	}
	load()
	{
		//this.data = null;
		let orders:Order[] = [];
		this.subscription = this.tws.reqAllOpenOrders();
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
				let order = new Order( value );
				this.tws.reqContractDetails( value.contract ).subscribe({ next: details=>
				{
					const isMarketOpen = MarketUtilities.isMarketOpen( details );
					var previousDay = DateUtilities.toDays( MarketUtilities.previousTradingDay(new Date(), details.tradingHours[0]) );
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
						this.mktDataSubscriptions.set( value.contract.id, subscription );
					}
				}});
				orders.push( order );
			},
			complete: ()=>
			{
				debugger;
				console.log('complete2');
				this.data = new DataSource(this.settings.sort, orders);
			},
			error:e=>{this.subscription=null;console.error(e); this.cnsle.error(e,null); }
		});
	}
	sortData(sort:Sort)
	{
		this.data.sort( sort );
		this.sort = sort;
	}
	cancel( id:number, event:MouseEvent ):void
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

	get end():Date{ return new Date( this._end.value );} set end(value:Date){this._end.setValue(value);} _end = new FormControl();
	get start():Date{ return this._start.value; } set start(value:Date){ this._start.setValue(value); } private _start = new FormControl();
	private data:DataSource;
	get settings(){return this.profile.value; }
	profile = new Settings<PageSettings>( PageSettings, "OrderComponent", this.profileService );
	get sort():Sort{ return this.settings.sort; } set sort(value){this.settings.sort = value;}
	displayedColumns:string[] = ["symbol","shares", "status", "Limit", "bid", "ask", "last", "buttons"];
	subscription:OrderObservable;
	mktDataSubscriptions = new Map<number,TickObservable>();
}

class PageSettings
{
	assign( value:PageSettings ){ this.sort = value.sort; }
	sort:Sort = {active: "id", direction: "asc"};
}
