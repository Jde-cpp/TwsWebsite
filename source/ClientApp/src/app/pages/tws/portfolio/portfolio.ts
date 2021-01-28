import { OnDestroy, Component, AfterViewInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';//,of
import { TwsService } from 'jde-tws';
import { IProfile } from 'jde-framework';
import {TickObservable} from 'jde-tws'
import {Holding, TermHoldingSummary, Price} from './holding'
import {OptionEntryDialog} from 'src/app/shared/tws/dialogs/option-entry/option-entry'
import {TransactDoModal} from 'src/app/shared/tws/dialogs/transact/transact'

//import * as ib from 'dist/jde-tws-assets/src/assets/proto/ib'; import IB = ib.Jde.Markets.Proto;
import * as ib2 from 'jde-cpp/ib';  import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbRequests from 'jde-cpp/requests'; import Requests = IbRequests.Jde.Markets.Proto.Requests;
import { MarketUtilities, ContractPK } from 'jde-tws';
import { RollDialog } from 'src/app/shared/tws/dialogs/roll/roll-dialog';
import { TickDetails } from 'jde-tws';


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
		callbacks[1].subscribe( {next:x =>{ if(x) this.onPortfolioUpdate(x); else if( !this.viewPromise ) this.initialLoad();}, error:  e=>{console.error(e);}} );
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
	}

	onPortfolioUpdate = ( value: Results.IPortfolioUpdate ):void =>
	{
		const contract = value.contract;
		//console.log( `onPortfolioUpdate[${value.accountNumber}]${contract.symbol}x${value.position}=${value.marketValue}` );
		const contractId = contract.id;
		if( !this.holdings.some( (holding) =>
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
			const barSize:Requests.BarSize = contract.securityType==IB.SecurityType.Option ? Requests.BarSize.Hour : Requests.BarSize.Day;

			const holding = new Holding( value );
			(holding.isLong ? this.long : this.short).add( holding );
			this.holdings.push( holding );
			this._table.renderRows();
			if( this.mktDataSubscriptions.has(contractId) )
				console.error( `this.mktDataSubscriptions.has(${contractId})` );//should never be here, because not in holdings (option underlying?)
			else
			{
				var isMarketOpen = MarketUtilities.isMarketOpen2( contract.primaryExchange, contract.securityType );
				if( isMarketOpen )
				{
					let subscription = this.tws.reqMktData( contractId, [Requests.ETickList.CreditmanMarkPrice, Requests.ETickList.RTVolume], false );
					this.mktDataSubscriptions.set( contractId, subscription );
					subscription.subscribe2( holding );
				}
				if( this.viewPromise )
					this.loadPreviousDay( contract, isMarketOpen, holding, MarketUtilities.previous(contract) );
			}
		}
	};
	initialLoad()
	{
		this.tws.reqPreviousDay( this.holdings.map(x=>x.contract.id) ).subscribe(
		{
			next: ( bar:Results.IDaySummary ) =>
			{
				var holding = this.holdings.find( x=>x.contractId==bar.contractId );
				holding.setDaySummary( bar,  MarketUtilities.previous(holding.contract) );
			},
		});
		this.viewPromise = Promise.resolve( true );
	}
	loadPreviousDay( contract:IB.IContract, isMarketOpen:boolean, holding:Holding, day:number )
	{
//		if( contract.symbol=="AXE" )
//			console.log( `AXE day=${day}` );
		holding.reqPrevious( this.tws, day ).catch( (e)=>
		{
			if( e.code==322 )
				setTimeout( ()=> this.loadPreviousDay(contract,isMarketOpen,holding,day), 5000 );
		} );
	}

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
		console.log( `trade( '${event.toString()}' )` );
	}
	selectedUnderlying():Promise<Results.IContractDetail>
	{
		let underlyingId:ContractPK = this.selected.contract.underlyingId;
		let detailPromise:Promise<Results.IContractDetail>;
		if( underlyingId )
		{
			let underlyingTick = this.holdings.find( x=>x.contractId==underlyingId ) || this.underlying.get( underlyingId );
			if( underlyingTick && underlyingTick.detail.marketName )
				detailPromise = Promise.resolve( underlyingTick.detail );
		}
		return detailPromise ?? new Promise<Results.IContractDetail>( (resolve,reject)=>this.tws.reqSymbolSingle( this.selected.contract.symbol ).then( (detail)=>
		{
			this.selected.contract.underlyingId = detail.contract.id;
			resolve( detail );
		}).catch((e)=>reject(e)) );
	}
	roll()
	{
		/*let underlyingId:ContractPK = this.selected.contract.underlyingId;
		let detailPromise:Promise<Results.IContractDetail>;
		let underlyingTick:TickDetails;
		if( underlyingId )
		{
			underlyingTick = this.holdings.find( x=>x.contractId==underlyingId ) || this.underlying.get( underlyingId );
			if( underlyingTick && underlyingTick.detail.marketName )
				detailPromise = Promise.resolve( underlyingTick.detail );
		}
		if( !detailPromise )
			detailPromise = this.tws.reqSymbolSingle( this.selected.contract.symbol );*/
		this.selectedUnderlying().then( (underlyingDetail)=>
		{
			const underlyingId = underlyingDetail.contract.id;
			let holdingTick = this.holdings.find( x=>x.contractId==underlyingId );
			let underlyingTick:TickDetails;
			let subscription:TickObservable;
			if( !holdingTick )
			{
				underlyingTick = new TickDetails( underlyingDetail );
				subscription = this.tws.reqMktData( underlyingId, [Requests.ETickList.PlPrice,Requests.ETickList.MiscStats] );
				subscription.subscribe2( underlyingTick );
			}
			else if( !holdingTick.detail.longName )
				holdingTick.detail = underlyingDetail;

			const dialogRef = this.dialog.open( RollDialog,
			{
				width: '600px',
				height: '600px',
				data: { holding: this.selected, underlyingTick:holdingTick || underlyingTick }
			} );
			dialogRef.afterClosed().subscribe(result =>
			{
				if( subscription )
					this.tws.cancelMktDataSingle( subscription );
				// if( result && this.settings.limit!=result.limit )
				// {
				// 	this.settings.limit = result.limit;
				// 	this.subscribe( this.applicationId, this.level );
				// }
			});

		}).catch( (e)=>console.log( e?.error.message) );
	}
	onTransactClick( buy:boolean )
	{
		if( this.selectedIsOption )
		{
			this.selectedUnderlying().then( (detail)=>
			{
				const dialogRef = this.dialog.open(OptionEntryDialog, { width: '600px', data: { option: this.selected, isBuy: buy, expirations: [], underlying: detail } });
				dialogRef.afterClosed().subscribe(result =>
				{
					// if( result && this.settings.limit!=result.limit )
					// {
					// 	this.settings.limit = result.limit;
					// 	this.subscribe( this.applicationId, this.level );
					// }
				});
			});
		}
		else
		{
			this.tws.reqContractSingle( this.selected.contract ).then( (details)=>
			{
				TransactDoModal( this.dialog, this.profileService, this.tws, details, this.selected, buy, this.selected.position, false );

				//const dialogRef = this.dialog.open( TransactDialog, {width: '600px',	autoFocus: false, data: {tick: this.selected, isBuy: buy, quantity: this.selected.position, showStop: buy!=this.selected.position<0, details: details}} );
				//dialogRef.afterClosed().subscribe(result =>
				//{
					// if( result && this.settings.limit!=result.limit )
					// {
					// 	this.settings.limit = result.limit;
					// 	this.subscribe( this.applicationId, this.level );
					// }
				//});
			});
		}
	}
	close( element, event:MouseEvent ):void
	{
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

	holdings = new Array<Holding>();
	underlying = new Map<ContractPK,TickDetails>();
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
	selected:Holding|null=null;
	get selectedIsOption(){ return this.selected?.contract.securityType==IB.SecurityType.Option; }

	displayedColumns : string[] = [ 'profit', 'symbol', 'position', 'marketValue', 'averagePrice', 'bidSize', 'bid', 'ask', 'askSize', 'volume', 'last', 'change' ];

	@ViewChild('mainTable',{static: false}) _table:MatTable<Holding>;
	@ViewChild('accountButtons',{static: false}) accountButtons;
	get settings(){return this._settings || (this.settings=new Settings());} set settings(value){ this._settings = value;} private _settings:Settings;
	viewPromise:Promise<boolean>;
	private static profileKey="PortfolioComponent";
}
