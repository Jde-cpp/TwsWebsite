import { OnDestroy, Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';//,of
import { TwsService, Bar } from '../../../services/tws/tws.service';
import { IProfile } from '../../../services/profile/IProfile';
import {TickObservable} from '../../../services/tws/ITickObserver'
import {Holding, TermHoldingSummary} from './holding'

import * as ib from '../../../proto/ib';
import IB = ib.Jde.Markets.Proto;
import * as IbResults from '../../../proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbRequests from '../../../proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;
import { subscribeOn } from 'rxjs/operators';
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { ProtoUtilities } from 'src/app/utilities/protoUtilities';

class Settings
{
	selectedAccounts:string[]=[];
}

@Component({selector: 'portfolio',styleUrls: ['portfolio.component.css'],templateUrl: './portfolio.component.html'})
export class PortfolioComponent implements AfterViewInit, OnDestroy
{
	constructor( private twsService : TwsService, @Inject('IProfile') private profileService: IProfile )
	{}

	ngAfterViewInit():void
	{
		this.profileService.get<Settings>( PortfolioComponent.profileKey ).subscribe(
		{
			next: value =>{ this.settings = value; this.onSettingsLoaded(); },
			error: e =>{ console.log(e); this.onSettingsLoaded(); }
		});
	}

	ngOnDestroy()
	{
		if( this.requests )
			this.twsService.accountUpdatesUnsubscribe( this.requests );
		if( this.mktDataSubscriptions.size )
			this.twsService.cancelMktData( this.mktDataSubscriptions );//TickObservable[]=[];
	}

	onSettingsLoaded()
	{
		this.twsService.reqManagedAccts().subscribe( (numbers)=>
		{
			this.allAccounts.clear();
			for( let account in numbers )
				this.allAccounts.set( account, numbers[account] );
			this.selectedAccounts = this.settings.selectedAccounts.length ? this.settings.selectedAccounts.slice() : [ ...this.allAccounts.keys() ];
			for( var accountId of this.selectedAccounts )
				this.subscribe( accountId );
		});
	}
	subscribe( accountId:string )
	{
		var callbacks = this.twsService.reqAccountUpdates( accountId );
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

				this.twsService.accountUpdateUnsubscribe( accountId, this.requests.get(accountId) );
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
		if( accountUpdate.Key=="CashBalance" )
			this.cash.set( accountUpdate.Account, +accountUpdate.Value );

		console.log( `onAccountUpdate [${accountUpdate.Account}]${accountUpdate.Key}=${accountUpdate.Value}`  );
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
		const contract = value.Contract;
		console.log( `onPortfolioUpdate[${value.AccountNumber}]${contract.symbol}x${value.Position}=${value.MarketValue}` );
		const contractId = contract.id;
		if( !this.holdings.some( (holding, i) =>
		{
			const found = holding.contract.id==value.Contract.id;
			if( found )
			{
				let summary = holding.isLong ? this.long : this.short;
				summary.update( holding, value );
				holding.set( value );
			}
			return found;
		}) )
		{
			//this.twsService.reqContractDetails( contract ).subscribe( {next: contract2=>{
			const barSize = contract.secType=="OPT" ? Requests.BarSize.Hour : Requests.BarSize.Day;

			const holding = new Holding( value );
			(holding.isLong ? this.long : this.short).add( holding );
			this.holdings.push( holding );
			this._table.renderRows();
			if( this.mktDataSubscriptions.has(contractId) )
				console.error( `this.mktDataSubscriptions.has(${contractId})` );//should never be here, because not in holdings
			else
			{
				var isMarketOpen = MarketUtilities.isMarketOpen( contract.primaryExchange, contract.secType );
				if( isMarketOpen )
				{
					let subscription = this.twsService.reqMktData( contractId, [Requests.ETickList.CreditmanMarkPrice, Requests.ETickList.RTVolume], false );
					this.mktDataSubscriptions.set( contractId, subscription );
					subscription.subscribe2(
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
						string:( type:Results.ETickType, value:string )=>{ /*holding.onStringTick(type, value);*/ },
						complete: ()=>{ console.log("reqMktData::complete") }
					});
				}
				var dayCount = isMarketOpen ? 1 : 2;
				const current = MarketUtilities.previousTradingDay();
				this.twsService.reqHistoricalData( contract, current, dayCount, barSize, Requests.Display.Ask, true, false ).subscribe(
				{
					next: ( bar:Bar ) =>{ holding[ !isMarketOpen && bar.time.getUTCDay()==current.getUTCDay() ? "current" : "previousDay" ].ask = bar.close; },
					complete:()=>{},
					error: e=>{console.error(e);}
				});
				this.twsService.reqHistoricalData( contract, current, dayCount, barSize, Requests.Display.Bid, true, false ).subscribe(
				{
					next: ( bar:Bar ) =>{ holding[ !isMarketOpen && bar.time.getUTCDay()==current.getUTCDay() ? "current" : "previousDay" ].bid =  bar.close; },
					complete:()=>{},
					error: e=>{console.error(e);}
				});
				this.twsService.reqHistoricalData( contract, current, dayCount, barSize, Requests.Display.Trades, true, false ).subscribe(
				{
					next: ( bar:Bar ) =>
					{
						const currentDay = bar.time.getUTCDay()==current.getUTCDay();
						if( !isMarketOpen )
							holding.volume += bar.volume;
						//console.log( `Trades ${new Date(bar.Time*1000)} ${bar.Volume} - ${bar.Close}` );
						holding[ !isMarketOpen && currentDay ? "current" : "previousDay" ].last = bar.close;
					},
					complete:()=>{},
					error: e=>{console.error(e);}
				});
			}
		}
	};

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
	trade( event:MouseEvent ):void
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
	holdings: Holding[] = new Array<Holding>();
	long:TermHoldingSummary=new TermHoldingSummary();
	short:TermHoldingSummary=new TermHoldingSummary();
	connected = false;
	selectedAccounts: string[];
	allAccounts=new Map<string,string>(); //{ [k: string]: string };
	get totalCash():number{ let sum=0; for( let value of this.cash.values() ) sum+=value; return sum; }
	cash=new Map<string,number>();
	mktDataSubscriptions = new Map<number,TickObservable>();
	requests = new Map <string, [Observable<Results.IAccountUpdate>,Observable<Results.IPortfolioUpdate>]>();
	displayedColumns : string[] = [ 'profit', 'symbol', 'position', 'marketValue', 'averagePrice', 'volume', 'last', 'change', 'menu' ];

	@ViewChild('mainTable',{static: false}) _table:MatTable<Holding>;
	@ViewChild('accountButtons',{static: false}) accountButtons;
	get settings(){return this._settings || (this.settings=new Settings());} set settings(value){ this._settings = value;} private _settings:Settings;
	private static profileKey="PortfolioComponent";
	//public objectKeys = Object.keys;
//	private twsService : TwsService;
}
