import { Component, AfterViewInit, OnInit, OnDestroy, Inject } from '@angular/core';
import {Sort} from '@angular/material/sort';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { IProfile } from 'src/app/services/profile/IProfile';
import { TwsService } from 'src/app/services/tws/tws.service';
import {TickObservable} from 'src/app/services/tws/ITickObserver'
import { OrderObservable } from 'src/app/services/tws/IOrderObserver';

//import { MarketUtilities } from 'src/app/utilities/marketUtilities';
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
				orders.push( new Order(value) );
				let subscription = this.tws.reqMktData( value.contract.id, [Requests.ETickList.CreditmanMarkPrice, Requests.ETickList.RTVolume], false );
				this.mktDataSubscriptions.set( value.contract.id, subscription );
			/*	subscription.subscribe2(
				{
					generic:( type:Results.ETickType, value:number )=>{ console.log( `(${holding.contract.symbol})onGenericTick( '${type.toString()}', '${value}')` ); },
					price:( type:Results.ETickType, price:number, attributes:Results.ITickAttrib )=>
					{
						if( price!=-1 )
						{
							if( type==Results.ETickType.ClosePrice )
								holding.current.last = price;
							else if( type==Results.ETickType.BidPrice )
								holding.current.bid = price;
							else if( type==Results.ETickType.AskPrice )
								holding.current.ask = price;
							else
								console.log( `(${holding.contract.symbol})onPriceTick( '${type.toString()}', '${price}') - not handled` );
						}
					},
					size:( type:Results.ETickType, size:number )=>
					{
						if( type==Results.ETickType.SHORTABLE_SHARES )
							console.log( `(${holding.contract.symbol}) onSizeTick( '${type.toString()}', '${size}')` );
						else if( type==Results.ETickType.Volume )
							holding.volume = size;
						else
							console.log( `(${holding.contract.symbol})onSizeTick( '${type.toString()}', '${size}') - not handled` );
					},
					string:( type:Results.ETickType, value:string )=>{ /*holding.onStringTick(type, value);* / },
					complete: ()=>{ console.log("reqMktData::complete") }
				});*/
			},
			complete: ()=>{ this.data = new DataSource(this.settings.sort, orders); },
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
	displayedColumns:string[] = ["symbol","shares", "openTime", "closeTime", "status", "Limit", "bid", "ask", "last", "commissions", "buttons"];
	subscription:OrderObservable;
	mktDataSubscriptions = new Map<number,TickObservable>();
}

class PageSettings
{
	assign( value:PageSettings ){ this.sort = value.sort; }
	sort:Sort = {active: "openTime", direction: "asc"};
}
