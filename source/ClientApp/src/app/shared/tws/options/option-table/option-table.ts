import { Component, AfterViewInit, OnInit, ViewChild, Input, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import {IErrorService} from 'jde-framework'
import { TwsService, IBar } from 'jde-tws';
import{ TickObservable } from 'jde-tws'
import { TickDetails } from 'jde-tws';
import {Option, OptionStrike} from './option';
import * as IbResults from 'dist/jde-tws-assets/src/assets/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { PageEvent } from 'jde-framework'
import { MarketUtilities } from 'jde-tws';
import { ProtoUtilities } from 'jde-framework';

import * as ib2 from 'dist/jde-tws-assets/src/assets/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbRequests from 'dist/jde-tws-assets/src/assets/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;
import { DateUtilities, Day } from 'jde-framework';
import { PageSettings } from '../option-tab/option-tab';
import { max } from 'rxjs/operators';

@Component({ selector: 'option-table', styleUrls: ['option-table.scss'], templateUrl: './option-table.html' })
export class OptionTableComponent implements OnInit, OnDestroy
{
	constructor( private tws : TwsService, @Inject('IErrorService') private cnsl: IErrorService )
	{}
	ngOnInit()
	{
		this._pageSubscription = this.pageEvents?.subscribe( {next: value=>
		{
			if( this.viewPromise && (this._startIndex!=value.startIndex || this.pageLength!=value.pageLength) )
			{
				this._startIndex=value.startIndex;
				this.pageLength=value.pageLength;
				this.setPageContent();
			}
		}});
		this.onChangeOptionType();
	}
	ngOnDestroy()
	{
		this.tws.cancelMktData( this.subscriptions.values() );
		this._pageSubscription?.unsubscribe();
	}
	onChangeOptionType():void
	{
		console.log( `OptionTable::onChangeOptionType( ${DateUtilities.fromDays(this.startExpiration)} )` );
		if( !this.contract )
			return;
		if( this.options && this.options.length!=0 )
			this.lengthChange.emit( 0 );
		this.options = new Array<OptionStrike>();
		this.pageContent.length = 0;
		const currentDay = MarketUtilities.currentTradingDay( new Date(), this.detail.liquidHours ? MarketUtilities.contractHours(this.detail.liquidHours) : null );
		this.tws.optionSummary( this.contract.id, this.optionType, this.startExpiration, this.endExpiration, this.startStrike, this.endStrike ).then( (values:Results.IOptionValues)=>
		{
			this.setPrices = values.day==currentDay;
			var calcMidOption = !this.sort || this.sort.active=="strike";
			let midOption;
			let contracts = new Map<Day,Map<number,[Option,Option]>>();
			for( let day of values.optionDays )
			{
				for( let option of day.values )
				{
					var optionContract = new IB.Contract( this.contract );
					optionContract.localSymbol = null;
					optionContract.expiration = day.expirationDays;
					optionContract.securityType = IB.SecurityType.Option;
					const isCall = day.isCall;
					optionContract.right = day.isCall ? IB.SecurityRight.Call : IB.SecurityRight.Put;
					optionContract.strike = option.strike;
					optionContract.id = option.id;
					var value = this.setPrices ? new Option( optionContract, option, option.bid, option.ask, option.last, option.volume ) : new Option( optionContract, option );//, index++
					if( calcMidOption && (!midOption || optionContract.strike-this.midPrice<optionContract.strike-midOption[1]) )
						midOption = [day.expirationDays, optionContract.strike];
					let strikes = contracts.get( day.expirationDays );
					if( !strikes )
						contracts.set( day.expirationDays, strikes = new Map<number,[Option,Option]>() );
					let existing = strikes.get( option.strike );
					strikes.set( option.strike, [isCall ? value : existing?.[0], !isCall ? value : existing?.[1]] );
				}
			}
			let midPrice, midIndex=0;
			contracts.forEach( (strikes,day)=>
			{
				strikes.forEach( (callPut,strike)=>
				{
					if( midOption )
					{
						if( midOption[0]==day && midOption[1]==strike )
						{
							midPrice = strike;
							midOption = undefined;
						}
						else
							++midIndex;
					}
					this.options.push( new OptionStrike(callPut[0],callPut[1]) );
				});
			});
			if( midIndex )
			{
				this.midPrice = midPrice;
				this.startIndex = Math.max( 0, midIndex-Math.round(this.pageLength/2) );
			}

			if( this.options.length!=0 )
				this.lengthChange.emit( this.options.length );

			if( this.sort && ((this.sort.active && this.sort.active!="strike") || this.sort.direction=='desc') )
				this.sortData( this.sort );
			else
				this.setPageContent();
			this.viewPromise = Promise.resolve( true );
		}).catch( (e)=>{debugger;console.error(e); this.cnsl.error("Error occurred.", e);} );
	}

	sortData( sort: Sort )
	{
		if( sort )
			this.sort = sort;
		else
			sort = this.sort;

    	const data = this.options.slice();
    	if( !sort.active || sort.direction === '' )
    	{
			this.options = data;
			return;
    	}
		const multiplier = sort.direction === 'asc' ? 1 : -1;
		const isCall = sort.active.startsWith( "call" );
		let field = sort.active=="strike" || sort.active=="expiration" ? sort.active : sort.active.substring( isCall ? 5 : 4 );
    	this.options = data.sort((aStrike, bStrike) =>
    	{
			let aValue = 0; let bValue = 0;
			const a = isCall ? aStrike.call : aStrike.put, b = isCall ? bStrike.call : bStrike.put;
		  	switch( field )
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
			case 'strike':
				aValue = a.strike; bValue = b.strike;
				break;
			case 'expiration':
				aValue = a.expiration; bValue = b.expiration;
				break;
			default:
				console.error( `unknown sort'${field}'` );
			}
			return (aValue<bValue ? -1 : 1)*multiplier;
		});
		this.setPageContent();
  	}
	setPageContent()
	{
		console.log( `OptionTable::setPageContent( ${DateUtilities.fromDays(this.startExpiration)} )` );
		this.pageContent.length = 0;
		let foundSelected = !this.selectedOption;
		const isSelectedCall = foundSelected || this.selectedOption.isCall;
		const marketOpen = MarketUtilities.isLiquid( this.detail );
		let cancelSubscriptions = new Map<number,TickObservable>(); let subscriptions = new Array<OptionStrike>();
		for( let i=0; i<this.options.length; ++i )
		{
			let strike = this.options[i];

			if( !foundSelected && (isSelectedCall ? strike.call : strike.put)==this.selectedOption )
				foundSelected = true;

			const displayed = i>=this.startIndex && i<this.startIndex+this.pageLength;
			if( displayed )
			{
				subscriptions.push( strike );
				this.pageContent.push( strike );
			}
			else
			{
				let cancel = ( contractId )=>
				{
					if( this.subscriptions.has(contractId) )
					{
						cancelSubscriptions.set( contractId, this.subscriptions.get(contractId) );
						this.subscriptions.delete( contractId );
					}
				};
				if( strike.call ) cancel( strike.call.contractId );
				if( strike.put ) cancel( strike.put.contractId );
			}
		}
		if( cancelSubscriptions.size )
			this.tws.cancelMktData( cancelSubscriptions.values() );
		const currentDay = MarketUtilities.currentTradingDay( new Date(), MarketUtilities.contractHours(this.detail.liquidHours) );
		for( let option of subscriptions )
		{
			if( this.pageContent.indexOf(option)==-1 )
				console.log( "error could not find." );
			var subscribe = ( option:Option )=>
			{
				if( marketOpen )
				{
					var subscription = this.tws.reqMktData( option.contractId, [Requests.ETickList.PlPrice, Requests.ETickList.MiscStats], false );
					this.subscriptions.set( option.contractId, subscription );
					subscription.subscribe2( option );
				}
				/*else*/ if( !this.setPrices )
				{
					this.tws.reqPreviousDay( [option.contractId] ).subscribe(
					{
						next: ( bar:Results.IDaySummary ) =>
						{
							if( bar.day==currentDay )//TODO find out why we are getting 2 days.
							{
								option.high = bar.high;//!isMarketOpen && day>previousDay
								option.low = bar.low;

								option.bid = bar.bid;
								option.ask = bar.ask;
								option.volume = ProtoUtilities.toNumber( bar.volume );
								option.last = ProtoUtilities.toNumber( bar.close );
							}
						},
						complete:()=>
						{
							if( !option.last )
								console.log( `No previous day close for '${MarketUtilities.optionDisplay(option.contract)}'` );
						},
						error: e=>{ if( e.code!=162 ) console.error( e ); }
					});
				}
			};
			if( (this.optionType & IB.SecurityRight.Call)!=0 && !this.subscriptions.has(option.call.contractId) ) subscribe( option.call );
			if( (this.optionType & IB.SecurityRight.Put)!=0 && !this.subscriptions.has(option.put.contractId) ) subscribe( option.put );
		}
		if( !foundSelected )
			 this.selectedOption = null;
		this._table.renderRows();
	}

	cellClick( row:OptionStrike, option:Option )
	{
		this._isSingleClick = true;
		setTimeout( ()=>
		{
			if( !this._isSingleClick )
				return;
			this.selectedOption = this.selectedOption == option ? null : option;
			this.selectionChange.emit( this.selectedOption );
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
			this._nextGreatestIndex = this.options.findIndex( (x)=>{return x.strike>price;} );
	} _nextGreatestIndex:number=-1;

	get contract():IB.IContract{return this.detail.contract;}
	get detail(){return this.tick.detail;}
	get displayedColumns() : string[]
	{
		var calls = [ 'call-oi', 'call-oiChange', 'call-volume', 'call-last', 'call-bid_size', 'call-bid', 'call-ask', 'call-ask_size'];
		var all = ['strike'];
		var puts = ['put-oi', 'put-oiChange', 'put-volume', 'put-last', 'put-bid_size', 'put-bid', 'put-ask', 'put-ask_size' ];
		var columns = this.optionType!=(IB.SecurityRight.Call | IB.SecurityRight.Put) ? all : [];
		if( (this.optionType & IB.SecurityRight.Call)!=0 ) columns.push( ...calls );
		if( this.optionType==3 ) columns.push( ...all );
		if( (this.optionType & IB.SecurityRight.Put)!=0 ) columns.push( ...puts );
		return columns;
	}
	@Input() set optionType( value )
	{
		const optionType = +value;
		if(  optionType!=this._optionType )
		{
			const isUndefined = this._optionType==undefined;
			this._optionType=optionType;
			if( !isUndefined )
				this.onChangeOptionType();
		}
	} get optionType(){ return this._optionType;} _optionType:IB.SecurityRight;
	@Input() midPrice:number;
	@Input() startExpiration:number;
	@Input() endExpiration:number;
	@Input() startStrike:number;
	@Input() endStrike:number;
	@Input() pageEvents:Observable<PageEvent>; private _pageSubscription:Subscription;
	@Input() set pageSettings(x){ this._pageSettings=x;} get pageSettings(){return this._pageSettings;} _pageSettings:PageSettings; //set pageSettings(x){ this.pageSettings; } get tableLength(){ return this.pageInfo.pageLength; }
	@Input() tick:TickDetails;
	get pageLength():number{ return this.pageSettings.tableLength; } set pageLength(x){ this.pageSettings.tableLength=x; }
	get volatilityHistorical():number{ return this.tick.volatilityHistorical; }
	get volatilityImplied(){ return this.tick.volatilityImplied; }
	stdDev( x:OptionStrike )
	{
		const days = x.expiration-MarketUtilities.currentTradingDay( null, this.tick.detail.tradingHours[0] )+1;
		const price = this.tick.last;
		const underlyingStdDev = this.volatilityHistorical/Math.pow(252/days, .5)*this.tick.last;
		const diff = Math.abs( price-x.strike );
		return diff/( underlyingStdDev/2 );
	}
	strikeBackground( x:OptionStrike )
	{
		const stdDev = Math.ceil( this.stdDev(x) );
		return stdDev>3 ? "inherit" : `rgba( 0, 0, 139, ${stdDev==1 ? 1 : stdDev==2 ? .67 : .33} )`;
	}


	@Output() lengthChange = new EventEmitter<number>();
	@Output() selectionChange = new EventEmitter<Option>();
	@Output() sortChange = new EventEmitter<Sort>();
	@Output() startIndexChange = new EventEmitter<[number,number]>();

	@ViewChild('mainTable',{static:false}) _table:MatTable<OptionStrike>;

	private _isSingleClick:boolean;
	init:boolean;
	options: OptionStrike[];
	pageContent: OptionStrike[]=[];
	get price(){ return this.tick.last; }
	selectedOption:Option|null=null;
	get startIndex(){ return this._startIndex; } set startIndex(x){ if( this._startIndex!=x ){ this._startIndex=x; this.startIndexChange.emit( [this._startIndex,this.midPrice] );} } private _startIndex:number;
	setPrices = false;
	get sort():Sort{ return this.pageSettings ? this.pageSettings.sort : {active: "expiration", direction: "asc"} } set sort(x){ let sort = this.sort; if(x.active!=(sort?.active || "strike") || x.direction!=(sort?.direction || "asc") ){this.pageSettings.sort=x; this.sortChange.emit(x);} }
	subscriptions = new Map<number,TickObservable>();
	viewPromise:Promise<boolean>;
}