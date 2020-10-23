import { Component, AfterViewInit, OnInit, ViewChild, Input, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { TwsService, IBar } from 'src/app/services/tws/tws.service';
import{ TickObservable } from 'src/app/services/tws/ITickObserver'
import { TickDetails } from 'src/app/services/tws/Tick';
import {Option} from './option';
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { IPageEvent } from 'src/app/shared/framework/paginator/paginator'
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { ProtoUtilities } from 'src/app/utilities/protoUtilities';

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbRequests from 'src/app/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;
import { DateUtilities } from 'src/app/utilities/dateUtilities';

enum OptionType{Call=1,Put=2,Combined=3}

@Component({ selector: 'option-table', styleUrls: ['option-table.css'], templateUrl: './option-table.html' })
export class OptionTableComponent implements OnInit, OnDestroy
{
	constructor( private tws : TwsService, @Inject('IErrorService') private cnsl: IErrorService )
	{}
	ngOnInit()
	{
		this.run();
	}
	ngOnDestroy()
	{
		this.tws.cancelMktData( this.subscriptions.values() );
		this._pageSubscription?.unsubscribe();
		this._destroyed = true;
	}
	run():void
	{
		console.log( `OptionTable::run( ${DateUtilities.fromDays(this.startExpiration)} )` );
		if( !this.contract )
			return;
		if( this.options && this.options.length!=0 )
			this.lengthChange.emit( 0 );
		this.options = new Array<Option>();
		const currentDay = MarketUtilities.currentTradingDay( new Date(), MarketUtilities.contractHours(this.detail.liquidHours) );
		this.tws.optionSummary( this.contract.id, this.optionType, this.startExpiration, this.endExpiration, this.startStrike, this.endStrike ).then( (values:Results.IOptionValues)=>
		{
			this.setPrices = values.day==currentDay;
			var midOption;
			for( let day of values.optionDays )
			{
				for( let option of day.values )
				{
					var optionContract = new IB.Contract( this.contract );
					optionContract.localSymbol = null;
					optionContract.expiration = day.expirationDays;
					optionContract.securityType = IB.SecurityType.Option;
					optionContract.right = day.isCall ? IB.SecurityRight.Call : IB.SecurityRight.Put;
					optionContract.strike = option.strike;
					optionContract.id = option.id;
					var value = this.setPrices ? new Option( optionContract, option, option.bid, option.ask, option.last, option.volume ) : new Option( optionContract, option );//, index++
					//value.oi = option.openInterest;
					//value.oiChange = option.oiChange;
					if( !midOption || optionContract.strike-this.midPrice<optionContract.strike-midOption.strike )
						midOption = value;
					this.options.push( value );
				}
			}

			this.pageInfo.startIndex = Math.max( 0, this.options.indexOf(midOption)-Math.round(this.pageInfo.pageSize/2) );
			if( this.pageInfo.startIndex!=0 )
				this.startIndexChange.emit( this.pageInfo.startIndex );

			if( this.options.length!=0 )
				this.lengthChange.emit( this.options.length );

			this.setPageContent();
			this._pageSubscription = this.pageEvents.subscribe( {next: value=>{this.pageInfo=value;this.setPageContent();}} );
		}).catch( (e)=>{debugger;console.error(e); this.cnsl.error("Could not connect to Tws.", e);} );
	}

	sortData(sort: Sort)
	{
    	const data = this.options.slice();
    	if( !sort.active || sort.direction === '' )
    	{
			this.options = data;
			return;
    	}
  		const multiplier = sort.direction === 'asc' ? 1 : -1;
    	this.options = data.sort((a, b) =>
    	{
    		let aValue = 0; let bValue = 0;
		  	switch (sort.active)
		  	{
			case 'value':
				aValue = a.value; bValue = b.value;
				break;
			case 'change':
				aValue = a.change; bValue = b.change;
				break;
			case 'oi':
				aValue = a.oi; bValue = b.oi;
				break;
			case 'oiChange':
				aValue = a.oiChange; bValue = b.oiChange;
				break;
			default:
				console.error( `unknown sort'${sort.active}'` );
			}
			return (aValue<bValue ? -1 : 1)*multiplier;
		});
		this.setPageContent();
  	}
	setPageContent()
	{
		console.log( `OptionTable::setPageContent( ${DateUtilities.fromDays(this.startExpiration)} )` );
		this.pageContent = new Array<Option>();
		let foundSelected = !this.selectedOption;
		const marketOpen = MarketUtilities.isLiquid( this.detail );
		let cancelSubscriptions = new Map<number,TickObservable>(); let subscriptions = new Array<Option>();
		for( var i=0; i<this.options.length; ++i )
		{
			let option = this.options[i];

			if( !foundSelected && option==this.selectedOption )
				foundSelected = true;

			const displayed = i>=this.pageInfo.startIndex && i<this.pageInfo.startIndex+this.pageInfo.pageSize;
			if( displayed )
			{
				subscriptions.push( option );
				this.pageContent.push( option );
			}
			else if( this.subscriptions.has(option.contractId) )
			{
				cancelSubscriptions.set( option.contractId, this.subscriptions.get(option.contractId) );
				this.subscriptions.delete( option.contractId );
			}
		}
		if( cancelSubscriptions.size )
			this.tws.cancelMktData( cancelSubscriptions.values() );
		for( let option of subscriptions )
		{
			if( this.subscriptions.has(option.contractId) )
				continue;
			//if( marketOpen )
			{
				//var subscription = this.tws.reqMktData( option.contractId, [Requests.ETickList.PlPrice, Requests.ETickList.MiscStats], false );
				var subscription = this.tws.reqMktData( option.contractId, [], false );
				this.subscriptions.set( option.contractId, subscription );
				subscription.subscribe2( option );
			}
			/*else*/ if( !this.setPrices )
			{
				this.tws.reqPreviousDay( [option.contractId] ).subscribe(
				{
					next: ( bar:Results.IDaySummary ) =>
					{
						option.high = bar.high;//!isMarketOpen && day>previousDay
						option.low = bar.low;

						option.bid = bar.bid;
						option.ask = bar.ask;
						option.volume = ProtoUtilities.toNumber( bar.volume );
						option.last = ProtoUtilities.toNumber( bar.close );
					},
					complete:()=>
					{
						if( !option.close )
							console.log( `No previous day close for '${option.contract.symbol}'` );
					},
					error: e=>{ if( e.code!=162 ) console.error( e ); }
				});
			}
		}
		if( !foundSelected )
			 this.selectedOption = null;
		//console.log( `this._table._data=${this._table._data.length}` );
		//if( this._table._data )
		this._table.renderRows();
		//console.log( `end renderRows - this._table._data=${this._table._data.length}` );
		//else
		 //   console.log('no data');
	}

	cellClick( row:Option )
	{
		this._isSingleClick = true;
		setTimeout( ()=>
		{
			if( this._isSingleClick )
			{
				const index = 0;//+row.index;
				this.selectedOption = this.selectedOption == row ? null : row;
				this.selectionChange.emit( this.selectedOption );
			}
		},250);
	}
	cellDblClick( row:Option )
	{
		this._isSingleClick = false;
		const index = 0;//+row.index;
		if( this.selectedOption!=row )
		this.selectedOption = row;
//		this.dialog.open( DetailsDialog, {width: '600px', data: row} );
	}
	priceChange( price:number )
	{
		if( this._nextGreatestIndex<1 || price>this.options[this._nextGreatestIndex].strike || price<this.options[this._nextGreatestIndex-1].strike )
			this._nextGreatestIndex = this.options.findIndex( (x)=>{return x.last>price;} );
	} _nextGreatestIndex:number=-1;

	get contract(){return this.detail.contract;}
	get detail(){return this.tick.detail;}
	displayedColumns : string[] = [ 'strike', 'oi', 'oiChange', 'volume', 'last', 'bid_size', 'bid', 'ask', 'ask_size' ];
	@Input() set optionType( value )
	{
		const optionType = +value;
		if(  optionType!=this._optionType )
		{
			const isUndefined = this._optionType==undefined;
			this._optionType=optionType;
			if( !isUndefined )
				this.run();
		}
	} get optionType(){ return this._optionType;} _optionType:OptionType;
	@Input() midPrice:number;
	@Input() startExpiration:number;
	@Input() endExpiration:number;
	@Input() startStrike:number;
	@Input() endStrike:number;
	@Input() pageEvents:Observable<IPageEvent>; private _pageSubscription:Subscription;
	@Input() pageInfo:IPageEvent;
	@Input() tick:TickDetails;
	@Output() lengthChange = new EventEmitter<number>();
	@Output() startIndexChange = new EventEmitter<number>();
	@ViewChild('mainTable',{static:false}) _table:MatTable<Option>;

	private _destroyed:boolean;
	private _isSingleClick:boolean;
	init:boolean;
	options: Option[];
	pageContent: Option[]=[];
	get price(){ return this.tick.last; }
	selectedOption:Option|null=null;
	@Output() selectionChange = new EventEmitter<Option>();
	setPrices = false;
	subscriptions = new Map<number,TickObservable>();
}