import { Inject, Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostBinding, ChangeDetectorRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTabGroup} from '@angular/material/tabs';
import {MatTabChangeEvent} from '@angular/material/tabs';
import { Subject } from 'rxjs';
import {Fundamentals } from './fundamentals'
import { TransactDialog } from '../../../shared/tws/dialogs/transact/transact'
import { TwsService, Bar } from 'src/app/services/tws/tws.service';
import { TickEx } from 'src/app/services/tws/Tick';
import{ TickObservable } from 'src/app/services/tws/ITickObserver'
import { IProfile } from 'src/app/services/profile/IProfile';
import {IChartSettings} from 'src/app/shared/tws/highcharts/candlestick'
import {IErrorService} from 'src/app/services/error/IErrorService'
import {DateUtilities} from 'src/app/utilities/dateUtilities'
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { ProtoUtilities } from 'src/app/utilities/protoUtilities';

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbRequests from 'src/app/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { NgAnalyzeModulesHost } from '@angular/compiler';


class Settings
{
	assign( value:Settings )
	{
		this.previousSymbols.length=0;
		for( const i of value.previousSymbols )
			this.previousSymbols.push( i );
		this.selectedIndex = value.selectedIndex;
	}
	previousSymbols:string[]=["SPY"];
	selectedIndex:number=0;
}

class SymbolSettings
{
	assign( value:SymbolSettings ){this.shortInterest = value.shortInterest; this.shortInterestDate=value.shortInterestDate;}
	chartSettings:IChartSettings = {	start: new Date(Date.now()-1000*60*60*24*7), zoomHours:24, barSize: Requests.BarSize.Minute30 };
	shortInterest:number;shortInterestDate:Date;
}

@Component( {selector: 'snapshot', styleUrls: ['snapshot.css'], templateUrl: './snapshot.html', styles: [`:host {'class': 'mat-drawer-container'}`]} )
export class SnapshotComponent implements OnInit, AfterViewInit
{
	@HostBinding('class.mat-drawer-container') public highlighted: boolean = true;
	constructor( private change: ChangeDetectorRef, private dialog : MatDialog, private element : ElementRef, private tws : TwsService, private snackBar: MatSnackBar, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{
		console.log( 'SnapshotComponent::SnapshotComponent' );
	}

	ngOnInit():void
	{}
	ngAfterViewInit():void
	{
		this.profileService.get<Settings>( SnapshotComponent.profileKey ).subscribe(
		{
			next: value =>
			{
				if( value )
					this.settings = value;
//				this.symbolTabs.selectedIndex = this.settings.selectedIndex;
				setTimeout( ()=>
				{
					this.symbolTabs.selectedIndex = this.settings.selectedIndex;
					//this.symbolTabIndex.setValue( this.settings.selectedIndex );
//					this.change.markForCheck();
//					this.setSymbol( this.previousSymbols[this.settings.selectedIndex] );
				});

				//this.tabGroup.selectedIndex = this.settings.selectedIndex;

			},
			error: e =>{console.log(e)}
		});
	}
	ngOnDestroy()
	{
		if( this.subscription )
			this.tws.cancelMktData( new Map<number,TickObservable>( [[0,this.subscription]]).values() );
	}
	onContractDetails = ( details: Results.IContractDetails ):void =>
	{
		this.details = details;
		const isMarketOpen = TickEx.isMarketOpen = MarketUtilities.isMarketOpen( this.contract.primaryExchange, this.contract.securityType );
		let holding = this.holding = new TickEx( details.contract );
		this.contractEvents.next( holding );
		this.tws.reqFundamentals( details.contract.id ).subscribe( {next: value=>
		{
			this.fundamentals.values=value;
		//	console.log( this.symbolSettings.shortInterest/this.fundamentals.sharesOutstanding );
		}} );
		const now = new Date();
		//this.setShortInterest( 16089116, new Date(2020,4,29) );

		var previousDay = DateUtilities.toDays( MarketUtilities.previousTradingDay() );
		this.tws.reqPreviousDay( [this.contract.id] ).subscribe(
		{
			next: ( bar:Results.IDaySummary ) =>
			{
				if( isMarketOpen && bar.day>previousDay )
				{
					holding.high = bar.high;
					holding.low = bar.low;
					holding.open = bar.open;
				}
				else if( isMarketOpen || bar.day!=previousDay )
					holding.close = bar.close;
				else
				{
					holding.high = bar.high;//not market open day==previousDay
					holding.low = bar.low;//not market open day==previousDay

					holding.bid = bar.bid;
					holding.ask = bar.ask;
					holding.volume = ProtoUtilities.toNumber( bar.volume );
					holding.last = ProtoUtilities.toNumber( bar.close );
				}
			},
			complete:()=>
			{
				if( !holding.close )
					console.log( `No previous day close for '${details.contract.symbol}'` );
			},
			error: e=>
			{
				console.error(e);
			}
		});
	/*	var isPreOpening = MarketUtilities.isPreOpening( this.contract.primaryExchange, this.contract.securityType );
		this.tws.reqHistoricalData( this.contract, now, 1, Requests.BarSize.Day, Requests.Display.Trades, !isPreOpening, false ).subscribe(
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
				/*bars.push(bar);* /
			},
			complete: ()=> {},
			error:  e=>{ console.error(e); this.cnsle.error("Could not connect to Tws.", e); }
		});*/
		//}
		if( this.subscription )
			this.tws.cancelMktData( new Map<number,TickObservable>( [[0,this.subscription]]).values() );
		const ticks = [Requests.ETickList.Inventory, (isMarketOpen ? Requests.ETickList.PlPrice : Requests.ETickList.MiscStats)];
/*		if( isMarketOpen )
			ticks.push( Requests.ETickList.PlPrice );
		else*/

		this.subscription = this.tws.reqMktData( this.contract.id, ticks, false );
		this.subscription.subscribe2( this.holding );
		if( this.symbol!=this.previousSymbols[0] )
		{
			var values:string[] = [];
			const symbol = details.contract.symbol;
			values.push( symbol );
			this.previousSymbols.forEach( previous=>{ if(symbol!=previous)values.push(previous); } );
			this.previousSymbols = values;
			this.profileService.put<Settings>( SnapshotComponent.profileKey, this.settings );
		}
	}

	symbolIndexChanged( index )
	{
		console.log( `symbolIndexChanged( ${index} )` );
		this.settings.selectedIndex = index;
		this.symbolTabIndex.setValue( index );
		this.profileService.put<Settings>( SnapshotComponent.profileKey, this.settings );
		this.setSymbol( this.previousSymbols[index] );
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
	setShortInterest( value, date )
	{
		this.symbolSettings.shortInterest = value;
		this.symbolSettings.shortInterestDate = date;
		this.profileService.put<SymbolSettings>( `${SnapshotComponent.profileKey}.${this.symbol}`, this.symbolSettings );
	}
	setSymbol( symbol:string )
	{
		this.symbolSettings.assign( new SymbolSettings() );
		if( symbol )
		{
			var contract = new IB.Contract();
			contract.symbol = symbol;
			contract.securityType = "STK";
			contract.exchange = "SMART";
			contract.currency = "USD";
			this.tws.reqContractDetails( contract ).subscribe( {next: value=>{this.onContractDetails(value);}, error: e=>{this.onError(e);} });
			this.profileService.get<SymbolSettings>( `${SnapshotComponent.profileKey}.${symbol}` ).subscribe(
			{
				next: symbolSettings =>
				{
					if( symbolSettings )
						this.symbolSettings.assign( symbolSettings );
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
			//this.symbolTabIndex.setValue( event );
			//this.settings.selectedIndex = event.index;
			this.profileService.put<Settings>( SnapshotComponent.profileKey, this.settings );
		}
	}

	get contract():IB.IContract{ return this.details ? this.details.contract : null; }
	get previousSymbols()
	{
	    return this.settings ? this.settings.previousSymbols : ["SPY"];
	} set previousSymbols(value)
	{
	    if( this.settings )
	        this.settings.previousSymbols = value;
	}
	details: Results.IContractDetails;
	fundamentals=new Fundamentals();
	holding: TickEx;
	get primaryName():string{ return this.details ? `${this.details.longName}` : ''; }//{ return this.details ? `${this.contract.Symbol} - ${this.details.LongName}` : ''; }
	get symbol():string{ return this.contract ? this.contract.symbol : ''; }
	get symbolSettings(){ if(!this._symbolSettings)this._symbolSettings = new SymbolSettings(); return this._symbolSettings;} set symbolSettings(value){this._symbolSettings=value;} _symbolSettings:SymbolSettings;
	get chartSettings(){ return this.symbolSettings.chartSettings; }
	contractEvents = new Subject<TickEx>();

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
	get settings(){ return this._settings} set settings(value){ this.settings.assign(value); } private _settings:Settings = new Settings();

	private static profileKey="SnapshotComponent";
	@ViewChild( 'tabs', {static: false} ) tabs;
	@ViewChild( 'symbolTabs', {static: false} ) symbolTabs;
	@ViewChild('optionTabs', {static: false} ) optionTabs;
	//@ViewChild(MatTabGroup) tabGroup: MatTabGroup;
	symbolTabIndex = new FormControl(0);

}
