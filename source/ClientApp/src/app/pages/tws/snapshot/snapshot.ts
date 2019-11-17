import { Component, AfterViewInit, ViewChild, Inject } from '@angular/core';
//import { CommonModule  } from '@angular/common';
import { MatTabChangeEvent } from '@angular/material';
import {MatSnackBar} from '@angular/material';
import { TwsService } from '../../../services/tws/tws.service';
import { IProfile } from '../../../services/profile/IProfile';
import { Tick } from '../../../services/tws/Tick';
import * as ib2 from '../../../proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbRequests from '../../../proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;
import * as IbResults from '../../../proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;


class Settings
{
	previousSymbols:string[]=[];
	selectedIndex:number=0;
}

class SymbolSettings
{
}

@Component({ selector: 'snapshot', styleUrls: ['snapshot.css'], templateUrl: './snapshot.html' })
export class SnapshotComponent implements AfterViewInit
{
	//find out how a global setting is set to determine ib server.
	//connect to the global server here.
	//subscribe to events here.
	constructor( private twsService : TwsService, private snackBar: MatSnackBar, @Inject('IProfile') private profileService: IProfile )//, private twsService: TwsService
	{
		console.log( 'SnapshotComponent::SnapshotComponent' );
	}
	
	ngAfterViewInit():void
	{
		this.profileService.get<Settings>( SnapshotComponent.profileKey ).subscribe(
		{
			next: value => 
			{
				this.settings = value || new Settings();
				this.setSymbol( this.settings.previousSymbols.length ? this.settings.previousSymbols[0] : "SPY" );
			},
			error: e =>{console.log(e)}
		});
	}
	onContractDetails = ( details: Results.IContractDetails ):void =>
	{
		this.details = details;
		this.holding = new Tick();
		const ticks = [Requests.ETickList.Inventory, Requests.ETickList.PlPrice];
		this.holding.reqId = this.twsService.reqMktData( this.contract.Id, this.holding, ticks, false );

		if( this.settings.previousSymbols.length==0 || this.symbol!=this.settings.previousSymbols[0] )
		{
			var values:string[] = [];
			const symbol = details.Contract.Symbol;
			values.push( symbol );
			this.settings.previousSymbols.forEach( previous=>{ if(symbol!=previous)values.push(previous); } );
			this.settings.previousSymbols = values;
			this.profileService.put<Settings>( SnapshotComponent.profileKey, this.settings );
		}
	}

	onGenericTick( reqId:number, type:Results.ETickType, value:number ):void
	{}
	onPriceTick( reqId:number, type:Results.ETickType, price:number, attributes:Results.ITickAttrib ):void
	{}
	onSizeTick( reqId:number, type:Results.ETickType, size:number ):void
	{}
	onStringTick( reqId:number, type:Results.ETickType, value:string ):void
	{}
	onEndTick(reqId:number):void
	{}

	onError = ( error: Results.IError ):void =>
	{ 
		const message = `${error.Code} - ${error.Message}`;
		console.log( message );
		this.snackBar.open( message, '', {duration: 2000} );
	};

	get primaryName():string{ return this.details ? `${this.details.LongName}` : ''; }//{ return this.details ? `${this.contract.Symbol} - ${this.details.LongName}` : ''; }
	get symbol():string{ return this.contract ? this.contract.Symbol : ''; }
	setSymbol( symbol:string )
	{
		if( symbol )
		{
			var contract = new IB.Contract();
			contract.Symbol = symbol;
			contract.SecType = "STK";
			contract.Exchange = "SMART";
			contract.Currency = "USD";
			this.twsService.reqContractDetails( contract ).subscribe( {next: value=>{this.onContractDetails(value);}, error: e=>{this.onError(e);} });
			this.profileService.get<SymbolSettings>( `${SnapshotComponent.profileKey}.${symbol}` ).subscribe(
			{
				next: symbolSettings => 
				{
					this.symbolSettings = symbolSettings || new SymbolSettings();
				},
				error: e =>{ console.log(e); }

			});
		}
		else
			this.details = null;
	}
	onTabChange( event:MatTabChangeEvent )
	{
		if( this.settings.selectedIndex!=event.index )
		{
			this.settings.selectedIndex = event.index;
			this.profileService.put<Settings>( SnapshotComponent.profileKey, this.settings );
		}
	}

	get contract():IB.IContract{ return this.details ? this.details.Contract : null; }
	get previousSymbols(){ return this.settings ? this.settings.previousSymbols : [];}
	details: Results.IContractDetails;
	holding: Tick;
	get symbolSettings(){ if(!this._symbolSettings)this._symbolSettings = new SymbolSettings(); return this._symbolSettings;} set symbolSettings(value){this._symbolSettings=value;} _symbolSettings:SymbolSettings;
	private settings:Settings;
	private static profileKey="SnapshotComponent";
	@ViewChild( 'tabs', {static: false} ) tabs;
	@ViewChild('optionTabs', {static: false} ) optionTabs;
}
