import { Inject, Component, AfterViewInit, ViewChild, ElementRef, HostBinding } from '@angular/core';
//import { CommonModule  } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {MatTabChangeEvent} from '@angular/material/tabs';
import { TransactDialog } from '../../../shared/tws/dialogs/transact/transact'
import {MatSnackBar} from '@angular/material/snack-bar';
//import { LoggingService } from '../../../services/logging.service';
import { TwsService, Bar } from 'src/app/services/tws/tws.service';
import { TickEx } from 'src/app/services/tws/Tick';
import{ TickObservable } from 'src/app/services/tws/ITickObserver'
import { IProfile } from 'src/app/services/profile/IProfile';
//import {IBarSettings} from '../../shared/bar-table/bar-table'
//import {ITradeResultSettings} from '../../shared/previous-runs/previous-runs'
//import {ITreeSettings} from '../../shared/decision-trees/decision-trees'
import {IChartSettings} from 'src/app/shared/tws/highcharts/candlestick'
import {IErrorService} from 'src/app/services/error/IErrorService'

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbRequests from 'src/app/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;


class Settings
{
	previousSymbols:string[]=[];
	selectedIndex:number=0;
}

class SymbolSettings
{
	chartSettings:IChartSettings = {	start: new Date(Date.now()-1000*60*60*24*7), zoomHours:24, barSize: Requests.BarSize.Minute30 };
	//barSettings:IBarSettings = { start:null, end:null, sort:{active: "time", direction: "asc"} };
//	tradeResultSettings:ITradeResultSettings = { sort:{active: "openTime", direction: "desc"} };
	//previousSettings:ITradeResultSettings = { sort:{active: "openTime", direction: "desc"} };
	//treeSettings:ITreeSettings = { sort:{active: "minute", direction: "desc"} };
}

@Component( {selector: 'snapshot', styleUrls: ['snapshot.css'], templateUrl: './snapshot.html', styles: [`:host {'class': 'mat-drawer-container'}`]} )
export class SnapshotComponent implements AfterViewInit
{
	@HostBinding('class.mat-drawer-container') public highlighted: boolean = true;

	//find out how a global setting is set to determine ib server.
	//connect to the global server here.
	//subscribe to events here.
	constructor( private dialog : MatDialog, private element : ElementRef, private twsService : TwsService, private snackBar: MatSnackBar, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
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
				this.tabs.selectedIndex = this.settings.selectedIndex;
				this.setSymbol( this.settings.previousSymbols.length ? this.settings.previousSymbols[0] : "SPY" );
			},
			error: e =>{console.log(e)}
		});
	}
	ngOnDestroy()
	{
		if( this.subscription )
			this.twsService.cancelMktData( new Map<number,TickObservable>( [[0,this.subscription]]).values() );
	}
	onContractDetails = ( details: Results.IContractDetails ):void =>
	{
		this.details = details;
		this.holding = new TickEx( details.contract );
		const ticks = [Requests.ETickList.Inventory, Requests.ETickList.PlPrice];
		const now = new Date();
		if( now.getDay()==0 || now.getDay()==6 )
		{
			this.holding.close = null;
			this.twsService.reqHistoricalData( this.contract, now, 2, Requests.BarSize.Day, Requests.Display.Trades, true, false ).subscribe(
			{
				next: ( bar:Bar ) =>
				{
					if( !this.holding.close )
						this.holding.close = bar.close;
					else
					{
						this.holding.last = bar.close;
						//this.holding.close = bar.Close-bar.Open;
						this.holding.low = bar.low;
						this.holding.high = bar.high;
						this.holding.volume = <number>bar.volume;
					}
					/*bars.push(bar);*/
				},
				complete: ()=> {},
				error:  e=>{ console.error(e); this.cnsle.error("Could not connect to Tws.", e); }
			});
		}
		//else
		{
			if( this.subscription )
				this.twsService.cancelMktData( new Map<number,TickObservable>( [[0,this.subscription]]).values() );
			this.subscription = this.twsService.reqMktData( this.contract.id, ticks, false );
			this.subscription.subscribe2( this.holding );
/*			{
				generic:( type:Results.ETickType, value:number )=>{ this.holding.onGenericTick( type, value ); },
				price:( type:Results.ETickType, price:number, attributes:Results.ITickAttrib )=>{ this.holding.onPriceTick( type, price, attributes ); },
				size:( type:Results.ETickType, size:number )=>
				{
					if( type==Results.ETickType.SHORTABLE_SHARES )
						console.log( `(${details.Contract.symbol})shortable shares = ${size}` );
					this.holding.onSizeTick(type, size);
				},
				string:( type:Results.ETickType, value:string )=>{ this.holding.onStringTick(type, value); },
				complete: ()=>{ console.log("reqMktData::complete") }
			});*/
			if( this.settings.previousSymbols.length==0 || this.symbol!=this.settings.previousSymbols[0] )
			{
				var values:string[] = [];
				const symbol = details.contract.symbol;
				values.push( symbol );
				this.settings.previousSymbols.forEach( previous=>{ if(symbol!=previous)values.push(previous); } );
				this.settings.previousSymbols = values;
				this.profileService.put<Settings>( SnapshotComponent.profileKey, this.settings );
			}
		}
	}

	onError = ( error: Results.IError ):void =>
	{
		const message = `${error.code} - ${error.message}`;
		console.log( message );
		this.snackBar.open( message, '', {duration: 2000} );
	};

	onTransactClick( buy:boolean )
	{
		const dialogRef = this.dialog.open(TransactDialog, {
			width: '600px',
			data: { details: this.details, tick: this.holding, isBuy: buy }
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

	get primaryName():string{ return this.details ? `${this.details.longName}` : ''; }//{ return this.details ? `${this.contract.Symbol} - ${this.details.LongName}` : ''; }
	get symbol():string{ return this.contract ? this.contract.symbol : ''; }
	setSymbol( symbol:string )
	{
		if( symbol )
		{
			var contract = new IB.Contract();
			contract.symbol = symbol;
			contract.securityType = "STK";
			contract.exchange = "SMART";
			contract.currency = "USD";
			this.twsService.reqContractDetails( contract ).subscribe( {next: value=>{this.onContractDetails(value);}, error: e=>{this.onError(e);} });
/*			this.profileService.get<SymbolSettings>( `${SnapshotComponent.profileKey}.${symbol}` ).subscribe(
			{
				next: symbolSettings =>
				{
					if( symbolSettings )
					{
						var barSettings = symbolSettings.barSettings;
						if( typeof barSettings.start==="string" )
							barSettings.start = new Date( barSettings.start );
						if( typeof barSettings.end==="string" )
							barSettings.end = new Date( barSettings.end );
					}
					this.symbolSettings = symbolSettings || new SymbolSettings();
				},
				error: e =>{ console.log(e); }
			});*/
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

	get contract():IB.IContract{ return this.details ? this.details.contract : null; }
	get previousSymbols(){ return this.settings ? this.settings.previousSymbols : [];}
	details: Results.IContractDetails;
	holding: TickEx;
	get symbolSettings(){ if(!this._symbolSettings)this._symbolSettings = new SymbolSettings(); return this._symbolSettings;} set symbolSettings(value){this._symbolSettings=value;} _symbolSettings:SymbolSettings;
	get chartSettings(){ return this.symbolSettings.chartSettings; }
/*	get barSettings(){ return this.symbolSettings.barSettings; } set barSettings( value:IBarSettings )
	{
		this.symbolSettings.barSettings = value;
		this.profileService.put<SymbolSettings>( `${SnapshotComponent.profileKey}.${this.symbol}`, this.symbolSettings );
	}*/
/*	get previousSettings(){ return this.symbolSettings.previousSettings; } set previousSettings( value:ITradeResultSettings )
	{
		this.symbolSettings.previousSettings = value;
		this.profileService.put<SymbolSettings>( `${SnapshotComponent.profileKey}.${this.symbol}`, this.symbolSettings );
	}*/
	subscription:TickObservable;
//	get treeSettings(){ return this.symbolSettings.treeSettings; } set treeSettings( value:ITreeSettings ){this.symbolSettings.treeSettings = value;this.profileService.put<SymbolSettings>( `${SnapshotComponent.profileKey}.${this.symbol}`, this.symbolSettings );}
	private settings:Settings;
	private static profileKey="SnapshotComponent";
	@ViewChild( 'tabs', {static: false} ) tabs;
	@ViewChild('optionTabs', {static: false} ) optionTabs;
}
