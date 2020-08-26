import { OnDestroy, Component, AfterViewInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';//,of
import { TwsService, IBar } from 'src/app/services/tws/tws.service';
import { IProfile } from 'src/app/services/profile/IProfile';
import {TickObservable} from 'src/app/services/tws/ITickObserver'
import {Holding, TermHoldingSummary, Price} from './holding'
import {OptionEntryDialog} from 'src/app/shared/tws/dialogs/option-entry/option-entry'
import {TransactDialog} from 'src/app/shared/tws/dialogs/transact/transact'
import {DateUtilities} from 'src/app/utilities/dateUtilities'

import * as ib from 'src/app/proto/ib';
import IB = ib.Jde.Markets.Proto;
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbRequests from 'src/app/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;
import { subscribeOn } from 'rxjs/operators';
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { RollDialog } from 'src/app/shared/tws/dialogs/roll/roll-dialog';
import { ProtoUtilities } from 'src/app/utilities/protoUtilities';


class Settings
{
	selectedAccounts:string[]=[];
}

@Component({selector: 'portfolio',styleUrls: ['portfolio.scss'],templateUrl: './portfolio.html'})
export class PortfolioComponent implements AfterViewInit, OnDestroy
{
	constructor( private dialog : MatDialog, private tws : TwsService, @Inject('IProfile') private profileService: IProfile )
	{}

	ngAfterViewInit():void
	{
		this.profileService.get<Settings>( PortfolioComponent.profileKey ).then( (value)=>
		{
			this.settings = value; this.onSettingsLoaded();
		});
	}

	ngOnDestroy()
	{
		if( this.requests )
			this.tws.accountUpdatesUnsubscribe( this.requests );
		if( this.mktDataSubscriptions.size )
			this.tws.cancelMktData( this.mktDataSubscriptions.values() );//TickObservable[]=[];
	}

	onSettingsLoaded()
	{
		this.tws.reqManagedAccts().then( (numbers)=>
		{
			this.allAccounts.clear();
			for( let account in numbers )
				this.allAccounts.set( account, numbers[account] );
			this.selectedAccounts = this.settings.selectedAccounts.filter( accountId=>this.allAccounts.has(accountId) );
			if( !this.selectedAccounts.length )
				this.selectedAccounts = [ ...this.allAccounts.keys() ];
			for( var accountId of this.selectedAccounts )
				this.subscribe( accountId );
		});
	}
	subscribe( accountId:string )
	{
		var callbacks = this.tws.reqAccountUpdates( accountId );
		this.requests.set( accountId, callbacks );
		callbacks[0].subscribe( {next:accountUpdate =>{this.onAccountUpdate(accountUpdate);}, error:  e=>{console.error(e);}} );
		callbacks[1].subscribe( {next:portfolioUpdate =>{this.onPortfolioUpdate(portfolioUpdate);}, error:  e=>{console.error(e);}} );
	}
	accountChange( _:string )
	{
		const holdingCount = this.holdings.length;
		if( this.selectedAccounts.length>0 )
		{
			for( const [accountId, callbacks] of this.requests )
			{
				if( this.selectedAccounts.includes(accountId) )
					continue;

				this.tws.accountUpdateUnsubscribe( accountId, this.requests.get(accountId) );
				for( let i = 0; i < this.holdings.length; ++i )
				{
					if( this.holdings[i].accountNumber === accountId )
						this.holdings.splice( i--, 1 );
				}
			}
		}
		else
			this.selectedAccounts = [ ...this.allAccounts.keys() ];
		for( const accountId of this.selectedAccounts )
		{
			if( !this.requests.has(accountId) )
				this.subscribe( accountId );
		}
		if( holdingCount!=this.holdings.length )
			this._table.renderRows();
		this.settings.selectedAccounts = this.selectedAccounts.length==this.allAccounts.size ? [] : this.selectedAccounts;
		this.profileService.put<Settings>( PortfolioComponent.profileKey, this.settings );
	}
	onAccountUpdate( accountUpdate: Results.IAccountUpdate ):void
	{
		if( accountUpdate.key=="CashBalance" )
			this.cash.set( accountUpdate.account, +accountUpdate.value );

		//console.log( `onAccountUpdate [${accountUpdate.account}]${accountUpdate.key}=${accountUpdate.value}`  );
	}

/*	onHolding( reqId:number, fnctn:(holding:Holding)=>void ):void
	{
		let holding = this.requestsHoldings.get( reqId );
		if( holding )
			fnctn( holding );
		else
			console.log( `Could not find holding for request '${reqId}'`  );
	}*/

	onPortfolioUpdate = ( value: Results.IPortfolioUpdate ):void =>
	{
		const contract = value.contract;
		//console.log( `onPortfolioUpdate[${value.accountNumber}]${contract.symbol}x${value.position}=${value.marketValue}` );
		const contractId = contract.id;
		if( !this.holdings.some( (holding, i) =>
		{
			const found = holding.contract.id==contractId;
			if( found )
			{
				let summary = holding.isLong ? this.long : this.short;
				summary.update( holding, value );
				holding.set( value );
			}
			return found;
		}) )
		{
			//this.tws.reqContractDetails( contract ).subscribe( {next: contract2=>{
			const barSize:Requests.BarSize = contract.securityType==IB.SecurityType.Option ? Requests.BarSize.Hour : Requests.BarSize.Day;

			const holding = new Holding( value );
			(holding.isLong ? this.long : this.short).add( holding );
			this.holdings.push( holding );
			this._table.renderRows();
			if( this.mktDataSubscriptions.has(contractId) )
				console.error( `this.mktDataSubscriptions.has(${contractId})` );//should never be here, because not in holdings
			else
			{
				var isMarketOpen = MarketUtilities.isMarketOpen2( contract.primaryExchange, contract.securityType );
				if( isMarketOpen )
				{
					let subscription = this.tws.reqMktData( contractId, [Requests.ETickList.CreditmanMarkPrice, Requests.ETickList.RTVolume], false );
					this.mktDataSubscriptions.set( contractId, subscription );
					subscription.subscribe2( holding );
				}
				const day = MarketUtilities.previousTradingDay();
				this.loadPreviousDay( contract, isMarketOpen, holding, day );
			}
		}
	};
	loadPreviousDay( contract:IB.IContract, isMarketOpen:boolean, holding:Holding, day:number )
	{
//		if( contract.symbol=="AXE" )
//			console.log( `AXE day=${day}` );
		this.tws.reqPreviousDay( [contract.id] ).subscribe(
		{
			next: ( bar:Results.IDaySummary ) =>
			{
			//	if( contract.symbol=="ALGT" )
			//		console.log( `${contract.symbol} close=${bar.close}` );

				if( isMarketOpen || bar.day!=day )
					holding.previousDay = new Price( bar );
				else
				{
					holding.bid = bar.bid;
					holding.ask = bar.ask;
					holding.last = holding.close = ProtoUtilities.toNumber( bar.close );
				}
			},
			complete:()=>
			{
				if( !holding.previousDay.last )
				    console.log( `No previous day close for '${contract.symbol}'` );
			},
			error: e=>
			{
				if( e.code==322 )
					setTimeout( ()=> this.loadPreviousDay(contract,isMarketOpen,holding,day), 5000 );
				else
					console.error(e);
			}
		});
	}

/*	onGenericTick( reqId:number, type:Results.ETickType, value:number ):void
	{
		console.log( `onGenericTick( '${reqId}', '${type.toString()}', '${value}')` );
	}
	onPriceTick( reqId:number, type:Results.ETickType, price:number, attributes:Results.ITickAttrib ):void
	{
		this.onHolding( reqId, (holding:Holding)=>
		{
			if( type==Results.ETickType.ClosePrice )
				holding.close = price;
			else if( type==Results.ETickType.BidPrice )
				holding.bid = price;
			else if( type==Results.ETickType.AskPrice )
				holding.ask = price;
			else
				console.log( `onPriceTick( '${reqId}', '${type.toString()}', '${price}') - not handled` );
		});
	}
	onSizeTick( reqId:number, type:Results.ETickType, size:number ):void
	{
		if( type==Results.ETickType.SHORTABLE_SHARES )
			console.log( `onSizeTick( '${reqId}', '${type.toString()}', '${size}')` );
	}*/
	onStringTick( reqId:number, type:Results.ETickType, value:string ):void
	{
		console.log( `onStringTick( '${reqId}', '${type.toString()}', '${value}')` );
	}
	onEndTick( reqId:number ):void
	{
		console.log( `onEndTick( '${reqId}' )` );
	}
	trade( element, event:MouseEvent ):void
	{
/*		var button = <Button>event.currentTarget;
		if( button && button.innerText=="Help" )
		{
			var iframe = '<html><head><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="https://www.w3schools.com" style="height:calc(100% - 4px);width:calc(100% - 4px)"></iframe></html></body>';
			var win = window.open("","","width=600,height=480,toolbar=no,menubar=no,resizable=yes");
			win.document.write(iframe);
		}*/
		console.log( `trade( '${event.toString()}' )` );
	}
	roll( holding:Holding, event:MouseEvent ):void
	{
		console.log( `roll( '${event.toString()}' )` );
		const dialogRef = this.dialog.open(RollDialog,
		{
			width: '600px',
			data: { holding: holding }
		});
		dialogRef.afterClosed().subscribe(result =>
		{
			// if( result && this.settings.limit!=result.limit )
			// {
			// 	this.settings.limit = result.limit;
			// 	this.subscribe( this.applicationId, this.level );
			// }
		});

	}
	onTransactClick( buy:boolean )
	{
		if( this.selected.contract.securityType==IB.SecurityType.Option )
		{
			const dialogRef = this.dialog.open(OptionEntryDialog, { width: '600px', data: { option: this.selected, isBuy: buy, expirations: [], underlying: null } });
			dialogRef.afterClosed().subscribe(result =>
			{
				// if( result && this.settings.limit!=result.limit )
				// {
				// 	this.settings.limit = result.limit;
				// 	this.subscribe( this.applicationId, this.level );
				// }
			});
		}
		else
		{
			this.tws.reqContractDetails( this.selected.contract ).subscribe(
			{
				next: details=>
				{
					const dialogRef = this.dialog.open( TransactDialog, {width: '600px',	autoFocus: false, data: {tick: this.selected, isBuy: buy, quantity: this.selected.position, showStop: buy!=this.selected.position<0, details: details}} );
					dialogRef.afterClosed().subscribe(result =>
					{
						// if( result && this.settings.limit!=result.limit )
						// {
						// 	this.settings.limit = result.limit;
						// 	this.subscribe( this.applicationId, this.level );
						// }
					});
				}
			});
		}
	}
	close( element, event:MouseEvent ):void
	{
/*		var button = <Button>event.currentTarget;
		if( button && button.innerText=="Help" )
		{
			var iframe = '<html><head><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="https://www.w3schools.com" style="height:calc(100% - 4px);width:calc(100% - 4px)"></iframe></html></body>';
			var win = window.open("","","width=600,height=480,toolbar=no,menubar=no,resizable=yes");
			win.document.write(iframe);
		}*/
		console.log( `trade( '${event.toString()}' )` );
	}
	cellClick( row:Holding )
	{
		this.isSingleClick = true;
		setTimeout( ()=>
		{
			if( this.isSingleClick )
			{
				const index = 0;//+row.index;
				this.selected = this.selected == row ? null : row;
				//this.selectionChange.emit( this.selectedOption );
			}
		},250);
	}
	cellDblClick( row:Holding )
	{
		this.isSingleClick = false;
		const index = 0;//+row.index;
		if( this.selected!=row )
			this.selected = row;
//		this.dialog.open( DetailsDialog, {width: '600px', data: row} );
	}

	holdings: Holding[] = new Array<Holding>();
	long:TermHoldingSummary=new TermHoldingSummary();
	short:TermHoldingSummary=new TermHoldingSummary();
	connected = false;
	//get dailyReturn():number{ return this.pnl/this.valuePrevious; }
	selectedAccounts: string[];
	allAccounts=new Map<string,string>(); //{ [k: string]: string };
	get totalCash():number{ let sum=0; for( let value of this.cash.values() ) sum+=value; return sum; }
	cash=new Map<string,number>();
	get pnl():number{ return this.holdings.map( holding=>holding.pnl ).reduce( (total,pnl)=>total+(pnl || 0), 0 ); }
	get valuePrevious():number{ return this.holdings.map( holding=>holding.marketValuePrevious ).reduce( (total,mv)=>total+(mv || 0), 0 ); }
	get value():number{ return this.holdings.map( holding=>holding.marketValue ).reduce( (total,mv)=>total+mv, 0 )+this.totalCash; }
	private isSingleClick:boolean;
	mktDataSubscriptions = new Map<number,TickObservable>();
	requests = new Map <string, [Observable<Results.IAccountUpdate>,Observable<Results.IPortfolioUpdate>]>();
	private selected:Holding|null=null;

	displayedColumns : string[] = [ 'profit', 'symbol', 'position', 'marketValue', 'averagePrice', 'bidSize', 'bid', 'ask', 'askSize', 'volume', 'last', 'change' ];

	@ViewChild('mainTable',{static: false}) _table:MatTable<Holding>;
	@ViewChild('accountButtons',{static: false}) accountButtons;
	get settings(){return this._settings || (this.settings=new Settings());} set settings(value){ this._settings = value;} private _settings:Settings;
	private static profileKey="PortfolioComponent";
	//public objectKeys = Object.keys;
}
