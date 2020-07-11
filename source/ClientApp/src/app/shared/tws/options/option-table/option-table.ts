import { Component, AfterViewInit, OnInit, ViewChild, Input, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { TwsService, Bar } from 'src/app/services/tws/tws.service';
import{ TickObservable } from 'src/app/services/tws/ITickObserver'
import { Tick, TickEx } from 'src/app/services/tws/Tick';
import {Option} from './option';
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { IPageEvent } from 'src/app/shared/framework/paginator/paginator'
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { DateUtilities } from 'src/app/utilities/dateUtilities';

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbRequests from 'src/app/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;

enum OptionType{Call=1,Put=2,Combined=3}

@Component({ selector: 'option-table', styleUrls: ['option-table.css'], templateUrl: './option-table.html' })
export class OptionTableComponent implements OnInit, OnDestroy
{
	constructor( private tws : TwsService, @Inject('IErrorService') private cnsl: IErrorService )
	{}
	ngOnInit()
	{
		this.pageSubscription = this.pageEvents.subscribe( {next: value=>{this.pageInfo=value;this.setPageContent();}} );
		this.run();
	}
	ngOnDestroy()
	{
		this.pageSubscription.unsubscribe();
		this.tws.cancelMktData( this.subscriptions.values() );
	}
	run():void
	{
		if( !this.contract )
			return;
		if( this.options && this.options.length!=0 )
			this.lengthChange.emit( 0 );
		this.options = new Array<Option>();
		this.tws.optionSummary( this.contract.id, this.optionType, this.startExpiration, this.endExpiration, this.startStrike, this.endStrike ).subscribe(
		{
			next: ( values:Results.IOptionValues ) =>
			{
				let index = 0;
				const dayValue = values.day;
				for( let day of values.optionDays )
				{
					for( let option of day.values )
					{
						//_contract:IB.IContract, option:Results.IOption, public expiration:number, public isCall:boolean/*, public underlying:TickEx*/
						var optionContract = new IB.Contract( this.contract );
						optionContract.localSymbol = null;
						optionContract.expiration = day.expirationDays;
						optionContract.securityType = "OPT";
						optionContract.right = day.isCall ? "CALL" : "PUT";
						optionContract.strike = option.strike;
						optionContract.id = option.id;
						var value = new Option( optionContract, option );//, index++
						//value.oi = option.openInterest;
						//value.oiChange = option.oiChange;
						this.options.push( value );
					}
				}
				if( this.options.length!=0 )
					this.lengthChange.emit( this.options.length );
				this.setPageContent();
			},
			error:  e=>{ console.error(e); this.cnsl.error("Could not connect to Tws.", e); }
		} );
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
		this.pageContent = new Array<Option>();
		let foundSelected = !this.selectedOption;
		const marketOpen = MarketUtilities.isMarketOpen2( "", "OPT" );
		//for( var i=this.pageInfo.startIndex; i<Math.min(this.pageInfo.startIndex+this.pageInfo.pageSize, this.options.length); ++i )
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
			if( MarketUtilities.isMarketOpen2(option.contract.exchange, option.contract.securityType) )
			{
				var subscription = this.tws.reqMktData( option.contractId, [Requests.ETickList.PlPrice], false );
				this.subscriptions.set( option.contractId, subscription );
				subscription.subscribe2( option );
			}
			//Should be call to RequsetPrevOptionValues
			// if( !MarketUtilities.isMarketOpen("", "OPT") )
			// {
			// 	var contract = {"id":option.contractId};
			// 	var current = MarketUtilities.previousTradingDay();
			// 	this.tws.reqHistoricalData( contract, current, 1, Requests.BarSize.Hour, Requests.Display.Ask, true, false ).subscribe(
			// 	{
			// 		next: ( bar:Bar ) =>{ option.bid=bar.close; },
			// 		error: e=>{console.error(e);}
			// 	});
			// 	this.tws.reqHistoricalData( contract, current, 1, Requests.BarSize.Hour, Requests.Display.Bid, true, false ).subscribe(
			// 	{
			// 		next: ( bar:Bar ) =>{ option.ask = bar.close; },
			// 		error: e=>{console.error(e);}
			// 	});
			// 	this.tws.reqHistoricalData( contract, current, 1, Requests.BarSize.Hour, Requests.Display.Trades, true, false ).subscribe(
			// 	{
			// 		next: ( bar:Bar ) =>{ option.volume = bar.volume; },
			// 		error: e=>{console.error(e);}
			// 	});
			// }
		}
		if( !foundSelected )
		    this.selectedOption = null;
		//if( this._table._data )
		    this._table.renderRows();
		//else
		 //   console.log('no data');
	}

	cellClick( row:Option )
	{
		this.isSingleClick = true;
		setTimeout( ()=>
		{
			if( this.isSingleClick )
			{
				const index = 0;//+row.index;
				this.selectedOption = this.selectedOption == row ? null : row;
				this.selectionChange.emit( this.selectedOption );
			}
		},250);
	}
	cellDblClick( row:Option )
	{
		this.isSingleClick = false;
		const index = 0;//+row.index;
		if( this.selectedOption!=row )
			this.selectedOption = row;
//		this.dialog.open( DetailsDialog, {width: '600px', data: row} );
	}

	@Input() set contract(value){ this._contract=value; } get contract(){return this._contract;} private _contract:IB.IContract;//():IB.IContract{ return /*this.holding ? this.holding.contract :*/ null; }
	//get contractId(){ return this.contract ? this.contract.id : 0; }
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
	//@Input() holding: TickEx;
	@Input() startExpiration:number;
	@Input() endExpiration:number;
	@Input() startStrike:number;
	@Input() endStrike:number;
	@Input() pageEvents:Observable<IPageEvent>; private pageSubscription:Subscription;
	private isSingleClick:boolean;
	@Output() lengthChange = new EventEmitter<number>();
	@ViewChild('mainTable',{static:false}) _table:MatTable<Option>;

	init:boolean;
//	exposure:number;
//	oi:number;
	options: Option[];
	pageContent: Option[]=[];
	@Input() pageInfo:IPageEvent;
//	value:number;
	private selectedOption:Option|null=null;
	@Output() selectionChange = new EventEmitter<Option>();
	subscriptions = new Map<number,TickObservable>();
}
