import { OnDestroy, Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';//,of
import { TwsService, ITicker } from '../../../services/tws/tws.service';
import { IProfile } from '../../../services/profile/IProfile';

import * as ib from '../../../proto/ib';
import IB = ib.Jde.Markets.Proto;
import * as IbResults from '../../../proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbRequests from '../../../proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;

class Holding
{
	constructor( update:Results.IPortfolioUpdate )
	{
		this.set( update );
	}
	set( update:Results.IPortfolioUpdate )
	{
		this.contract = update.Contract;
		//if(this.contract.Symbol=="AI")
		//	console.log('here');
		this.position = update.Position;
		this.price = update.MarketPrice;
		this.averageCost = update.AverageCost;
		this.realizedPN = update.RealizedPnl;
		this.accountNumber = update.AccountNumber;
	}
	ask:number;
	bid:number;
	contract:IB.IContract;
	get marketValue():number{return this.price*this.position;}
	position:number;
	price:number;
	averageCost:number;
	realizedPN: number;
	accountNumber:string;
	shortInventory:number;
	close:number;
	get pnl():number
	{
		//if(this.contract.Symbol=="AI")
		//	console.log('here');
		return this.close>0 ? (this.price-this.close)*this.position : 0;}
	get change():number{return this.close>0 ? this.price-this.close : 0;}
}

class Settings
{
	selectedAccounts:string[]=[];
}

@Component({selector: 'portfolio',styleUrls: ['portfolio.component.css'],templateUrl: './portfolio.component.html'})
export class PortfolioComponent implements AfterViewInit, ITicker, OnDestroy
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
		this.twsService.accountUpdateUnsubscribe( this.requests );
//		this.profileService.put<Settings>( LogsComponent.profileKey, this.settings );
	}

	onSettingsLoaded()
	{
		this.twsService.reqManagedAccts().then( (numbers)=>
		{
			this.allAccounts = numbers;
			this.selectedAccounts = this.settings.selectedAccounts.length ? this.settings.selectedAccounts.filter( value => this.allAccounts.includes(value) ) : this.allAccounts.slice();
			for( var accountNumber of this.selectedAccounts )
			{
				var callbacks = this.twsService.reqAccountUpdates( accountNumber );
				this.requests.set( accountNumber, callbacks );
				callbacks[0].subscribe( {next:accountUpdate =>{this.onAccountUpdate(accountUpdate);}, error:  e=>{console.error(e);}} );
				callbacks[1].subscribe( {next:portfolioUpdate =>{this.onPortfolioUpdate(portfolioUpdate);}, error:  e=>{console.error(e);}} );
			}
		});
	}
	onAccountUpdate( accountUpdate: Results.IAccountUpdate ):void
	{
		console.log( `onAccountUpdate [${accountUpdate.Account}]${accountUpdate.Key}=${accountUpdate.Value}`  );
	}

	onHolding( reqId:number, fnctn:(holding:Holding)=>void ):void
	{
		let holding = this.requestsHoldings.get( reqId );
		if( holding )
			fnctn( holding );
		else
			console.log( `Could not find holding for request '${reqId}'`  );
	}

	onPortfolioUpdate = ( value: Results.IPortfolioUpdate ):void =>
	{
		var contract = value.Contract;
		console.log( `onPortfolioUpdate[${value.AccountNumber}]${contract.Symbol}x${value.Position}=${value.MarketValue}` );
		if( !this.holdings.some( (holding, i) =>
		{
			const found = holding.contract.Id==value.Contract.Id;
			if( found )
				holding.set( value );
			return found;
		}) )
		{
			const holding = new Holding( value )
			this.holdings.push( holding );
			this._table.renderRows();
			var contractId = holding.contract.Id;
			var id  = this.twsService.reqMktData( contractId, this, [Requests.ETickList.PlPrice], false );
			this.requestsHoldings.set( id, holding );
			console.log( `id='${id}', contractId='${contractId}' symbol='${contract.Symbol}'` );	
		}
	};

	onGenericTick( reqId:number, type:Results.ETickType, value:number ):void
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
	}
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
	requestsHoldings =  new Map<number,Holding>();
	holdings: Holding[] = new Array<Holding>();
	connected = false;
	selectedAccounts: string[];
	allAccounts: string[];
	requests = new Map <string, [Observable<Results.IAccountUpdate>,Observable<Results.IPortfolioUpdate>]>();
	displayedColumns : string[] = [ 'profit', 'symbol', 'position', 'marketValue', 'averagePrice', 'last', 'change', 'menu' ];

	@ViewChild('mainTable',{static: false}) _table:MatTable<Holding>;
	@ViewChild('accountButtons',{static: false}) accountButtons;
	get settings(){return this._settings || new Settings();} set settings(value){ this._settings = value;} private _settings:Settings;
	private static profileKey="PortfolioComponent";
//	private twsService : TwsService;
}
