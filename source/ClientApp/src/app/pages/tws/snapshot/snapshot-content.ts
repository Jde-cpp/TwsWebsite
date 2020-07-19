import { AfterViewInit, ElementRef, EventEmitter, Inject, Input, Component, OnInit, OnDestroy, Output,  ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTabChangeEvent} from '@angular/material/tabs';
import { Subject } from 'rxjs';
import theme from 'highcharts/themes/dark-unica';
import * as Highcharts from 'highcharts/highstock';
import {ConfigurationData,ConfigurationDialog} from './configuration'
import {Fundamentals } from './fundamentals'
import {PageSettings} from './snapshot'
import { TransactDoModal } from '../../../shared/tws/dialogs/transact/transact'
//import {IChartSettings} from 'src/app/shared/tws/highcharts/candlestick'

import {IErrorService} from 		'src/app/services/error/IErrorService'
import { IProfile } from 			'src/app/services/profile/IProfile';
import { TwsService, Bar } from 	'src/app/services/tws/tws.service';
import{ TickObservable } from 	'src/app/services/tws/ITickObserver'
import { TickEx } from 				'src/app/services/tws/Tick';
import {DateUtilities} from 		'src/app/utilities/dateUtilities'
import { MarketUtilities } from 	'src/app/utilities/marketUtilities';
import {MathUtilities, StatResult} from  'src/app/utilities/mathUtilities';
import { ProtoUtilities } from 'src/app/utilities/protoUtilities';
import {Settings, IAssignable} from 'src/app/utilities/settings'

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbRequests from 'src/app/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;

export class SymbolSettings implements IAssignable<SymbolSettings>
{
	assign( value:SymbolSettings )
	{
		this.shortInterest = value.shortInterest;
		this.shortInterestDate=value.shortInterestDate;
		this.tabIndex = value.tabIndex;
	}
	//chartSettings:IChartSettings = {	start: new Date(Date.now()-1000*60*60*24*7), zoomHours:24, barSize: Requests.BarSize.Minute30 };
	shortInterest:number;shortInterestDate:Date;
	tabIndex:number;
}

@Component( {selector: 'snapshot-content', styleUrls: ['snapshot.css'], templateUrl: './snapshot-content.html'} )
export class SnapshotContentComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private change: ChangeDetectorRef, private dialog : MatDialog, private element : ElementRef, private tws : TwsService, private snackBar: MatSnackBar, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{
		//console.log( 'SnapshotComponent::SnapshotComponent' );
//		throw 'SnapshotComponent::SnapshotComponent';
	}
	ngOnInit()
	{
		const symbol = this._symbol;
		this.settingsSymbolContainer = new Settings<SymbolSettings>(SymbolSettings, `SnapshotComponent.${symbol}`, this.profileService );
		// var contract = new IB.Contract();
		// contract.symbol = symbol;
		// contract.securityType = "STK";
		// contract.exchange = "SMART";
		// contract.currency = "USD";
		let contract = { 'symbol': symbol, securityType: "STK", exchange: "SMART", currency: "USD" };
		this.settingsSymbolContainer.load().subscribe({ complete:()=>{this.tws.reqContractDetails( contract ).subscribe( {next: value=>{this.onContractDetails(value);}, error: e=>{this.onError(e);} });} });

	}
	ngAfterViewInit():void
	{
		this.tabEvents.next( this.tabs ? this.tabs.selectedIndex : 0 );
	}
	ngOnDestroy()
	{
		if( this.subscription )
			this.tws.cancelMktData( new Map<number,TickObservable>( [[0,this.subscription]]).values() );
	}

	setSymbol( symbol:string )
	{
		if( symbol && symbol!=this.symbol )
			this.symbolEvent.next( symbol );
	}
	onConfigurationClick()
	{
		var data:ConfigurationData = { symbolSettings: this.settingsSymbolContainer, pageSettings: this.pageSettings }
		const dialogRef = this.dialog.open( ConfigurationDialog, {width: '600px', data: data} );
	}
	onContractDetails = ( details: Results.IContractDetails ):void =>
	{
		this.details = details;
		const isMarketOpen = MarketUtilities.isMarketOpen( this.details );
		let tick = this.tick = new TickEx( details.contract, isMarketOpen );
		//this.contractEvents.next( tick );
		this.tws.reqFundamentals( details.contract.id ).subscribe( {next: value=>
		{
			this.fundamentals = new Fundamentals( value );
		//	console.log( this.symbolSettings.shortInterest/this.fundamentals.sharesOutstanding );
		}} );
		const now = new Date();
	/*	if( this.symbol=="TSLA" )
			this.setShortInterest( 13958518, new Date(2020,6,30) );
		if( this.symbol=="SPY" )//https://www.wsj.com/market-data/quotes/etf/US/ARCX/SPY
			this.setShortInterest( 193700000, new Date(2020,6,30) );
		*/
		var previousDay = DateUtilities.toDays( MarketUtilities.previousTradingDate(now, details.tradingHours[0]) );
		this.tws.reqPreviousDay( [this.contract.id] ).subscribe(
		{
			next: ( bar:Results.IDaySummary ) =>
			{
				if( isMarketOpen && bar.day>previousDay )
				{
					tick.high = bar.high;
					tick.low = bar.low;
					tick.open = bar.open;
				}
				else if( isMarketOpen || bar.day==previousDay )
					tick.close = bar.close;
				else if( bar.day>previousDay )
				{
					tick.high = bar.high;//!isMarketOpen && day>previousDay
					tick.low = bar.low;

					tick.bid = bar.bid;
					tick.ask = bar.ask;
					tick.volume = ProtoUtilities.toNumber( bar.volume );
					tick.last = ProtoUtilities.toNumber( bar.close );
				}
			},
			complete:()=>
			{
				if( !tick.close )
					console.log( `No previous day close for '${details.contract.symbol}'` );
				this.showChart();
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
				if( !this.tick.close )
					this.tick.close = bar.close;
				else
				{
					this.tick.last = bar.close;
					//this.tick.close = bar.Close-bar.Open;
					this.tick.low = bar.low;
					this.tick.high = bar.high;
					this.tick.volume = <number>bar.volume;
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
		this.subscription.subscribe2( this.tick );
/*		if( this.symbol!=this.previousSymbols[0] )
		{
			var values:string[] = [];
			const symbol = details.contract.symbol;
			values.push( symbol );
			this.previousSymbols.forEach( previous=>{ if(symbol!=previous)values.push(previous); } );
			this.previousSymbols = values;
			this.settingsContainer.save();
			//this.profileService.put<Settings>( SnapshotComponent.profileKey, this.settings );
		}*/
	}
	onTransactClick( buy:boolean )
	{
		TransactDoModal( this.dialog, this.profileService, this.tws, this.details, this.tick, buy );
/*		const dialogRef = this.dialog.open(TransactDialog, {
			width: '600px', autoFocus: false,
			data: { details: this.details, tick: this.tick, isBuy: buy }
		});
		dialogRef.afterClosed().subscribe(result =>
		{
			// if( result && this.settings.limit!=result.limit )
			// {
			// 	this.settings.limit = result.limit;
			// 	this.subscribe( this.applicationId, this.level );
			// }
		});*/
	}
	setShortInterest( value, date )
	{
		console.log( `setShortInterest = ${value}` );
		this.settingsSymbol.shortInterest = value;
		this.settingsSymbol.shortInterestDate = date;
		this.settingsSymbolContainer.save();
	}

	showChart()
	{
		let tws = this.tws, cnsle = this.cnsle, contract = this.contract, dayBars = [];
		let endTime = DateUtilities.endOfDay( MarketUtilities.currentTradingDate( new Date(), MarketUtilities.contractHours(this.details.tradingHours)) );
		tws.reqHistoricalData( contract, DateUtilities.endOfDay(MarketUtilities.previousTradingDate()), 100, Requests.BarSize.Day, Requests.Display.Trades, true, false ).subscribe(
		{
			next: ( bar:Bar ) =>
			{
				dayBars.push( (bar.close-bar.open)/bar.open );
			},
			complete:()=>
			{
				let bars = [];
				var beginningOfDay = DateUtilities.beginningOfDay(endTime);
				var openTime = this.tick.open || MarketUtilities.isMarketOpen(this.details) ? null : beginningOfDay.getTime()+9.5*60*60000+DateUtilities.easternTimezoneOffset*60000;
				tws.reqHistoricalData( contract, endTime, 1, Requests.BarSize.Minute3, Requests.Display.Trades, false, false ).subscribe(
				{
					next: ( bar:Bar ) =>
					{
						const time = bar.time.getTime();
						if( time==openTime )
							this.tick.open = bar.open;
						bars.push( [time, bar.wap] );
					},
					complete: ()=>
					{
						this.showChart2( bars, MathUtilities.Statistics(dayBars, true) );
					},
					error:  e=>{ console.error(e); cnsle.error("Could not connect to Tws.", e); }
				});
			},
			error:  e=>{ console.error(e); cnsle.error("Could not connect to Tws.", e); }
		});
	}
	showChart2( bars, statResult:StatResult )
	{
		const tradingHours = MarketUtilities.contractHours( this.details.tradingHours ), now = new Date();
		const currentDate = MarketUtilities.currentTradingDate( now, tradingHours );
		//console.log( currentDate );
		//var offset = MarketUtilities.getTimezoneOffset( this.contract.primaryExchange );
		const range=23400000/*6.5 hours*/, regularEnd = new Date(currentDate);

		const liquidHours = MarketUtilities.contractHours( this.details.liquidHours )
		//const startTrading = now.getTime()<contractHours.start*1000 ? MarketUtilities.startTrading( currentDate, this.contract ) : contractHours.start;
		const isMarketOpen = MarketUtilities.isMarketOpen( this.details );
		const liquidStart = isMarketOpen ? liquidHours.start*1000 : null;
		//maxDate = new Date(currentDate)
		const endTrading = isMarketOpen ? tradingHours.end*1000 : MarketUtilities.endLiquid( DateUtilities.endOfDay(currentDate), this.details.contract ).getTime();
		//const endLiquid =  isMarketOpen ? new Date(liquidHours.end*1000) : MarketUtilities.endLiquid( currentDate, this.details.contract );
		const minDate = isMarketOpen ? tradingHours.start*1000 : endTrading-range;
		//minDate.setHours( 4.0 ); maxDate.setHours( 19.0 ); liquidStart.setHours( 9 ); liquidStart.setMinutes( 30 );
		let getMinMax = ()=>
		{
			const min = Math.max( minDate, Math.min(now.getTime(),endTrading)-range );  //23400=60*60*6.5
			const max = Math.min( min+range, endTrading );  //23400=60*60*6.5
			return [min,max];
		};
		let [minTime, maxTime] = getMinMax();
		let minValue=Number.MAX_VALUE; let maxValue=Number.MIN_VALUE;
		let minIndex=0, maxIndex = 0;
		for( let bar of bars )
    	{
			if( bar[0]<minTime )
				++minIndex;
			else if( bar[0]>maxTime )
				break;
			++maxIndex;
		}
		if( maxIndex==bars.length )
			bars.push( [maxTime, null] );
		bars = bars.slice( minIndex, maxIndex );

		for( let bar of bars )
		{
			minValue = Math.min( bar[1], minValue );
			maxValue = Math.max( bar[1], maxValue );
		}
		//minValue = 1180;
		const showLarge = false;
		let tick = this.tick;
		let series:Highcharts.SeriesLineOptions =
		{
			name: 'Quotes',
			data: bars,
			type: "line",
			enableMouseTracking:showLarge,
			color: tick.currentPrice>tick.close ? "green" : "red"
		};
		const plotLine = minTime>liquidStart ? regularEnd.getTime() : liquidStart;
		//let yAxisLength = Math.sqrt( statResult.variance )*tick.open/8;
		const midpoint = (maxValue+minValue)/2;
		let yAxisLength = (maxValue-minValue)/2;
		//while( minValue<midpoint-yAxisLength || maxValue>midpoint+yAxisLength )
		//	yAxisLength*=2;

		//console.log( `min: ${midpoint-yAxisLength}, max: ${midpoint+yAxisLength}, time=${new Date(minTime)}->${new Date(maxTime)} range=${range}` );
		theme( Highcharts );
		//console.log( `plotline=${new Date(plotLine)}` );
		let height = showLarge ? "470px" : "74px";
		let width = showLarge ? null : 240;
		let options:Highcharts.Options =
		{
			chart:
			{
				margin: 0,
				marginTop: -35,
				height: height,
				width: width,
				events:
				{
					load: !isMarketOpen ? null : function ()
					{
						var series:Highcharts.Series = this.series[0];
						setInterval(function ()
						{
							const data = series.data, length = series.data.length;
							let value = length>1 ? data[length-2].y : null;
							var time = length>1 ? data[length-2].x : (new Date()).getTime();
							if( value && tick.currentPrice && (value!=tick.currentPrice || time<(new Date()).getTime()-60000) )
							{
								data[length-1].update( {x:(new Date()).getTime(), y:tick.currentPrice} );
								let [min, max] = getMinMax();
								series.addPoint( [max, null], true, false );
								//series.addPoint( [x, y], true, true );
							}
						}, 5000);
					}
				}
			},
			credits: {enabled:false},
			exporting: { enabled: false },
			navigator: {enabled: showLarge },
			scrollbar: {enabled: false },
			series: [series],
			time: { useUTC: false },
			yAxis: {labels:{enabled:showLarge}, visible:true, min: midpoint-yAxisLength, max: midpoint+yAxisLength, maxRange: yAxisLength*2, range: yAxisLength*2, plotLines:[{color: 'green', width: 2, dashStyle: 'ShortDash', value: tick.close}] },
			xAxis: {labels:{enabled:showLarge}, visible:true,  ordinal: false, min: minTime, max: maxTime, maxRange: range, minRange:range, plotLines:[{color: '#FF0000', width: 2, value: plotLine}]},
			rangeSelector: { selected: 0, inputEnabled: false, buttonTheme: {visibility: 'hidden'}, labelStyle: {visibility: 'hidden'} }
		};
		Highcharts.stockChart( showLarge ? 'chart2' : 'chart', options );
	}
	onError = ( error: Results.IError ):void =>
	{
		const message = `${error.code} - ${error.message}`;
		console.log( message );
		this.snackBar.open( message, '', {duration: 2000} );
	};
	onTabChange( event:MatTabChangeEvent )
	{
		if( this.settingsSymbol.tabIndex!=event.index )
		{
			//this.symbolTabIndex.setValue( event );
			//this.settings.selectedIndex = event.index;
			//this.profileService.put<Settings>( SnapshotComponent.profileKey, this.settings );
			this.settingsSymbolContainer.save();
			this.tabEvents.next( event.index );
		}
	}

	get contract():IB.IContract{ return this.details ? this.details.contract : null; }
	//get chartSettings(){ return this.settingsSymbol.chartSettings; }
	details: Results.IContractDetails;
	fundamentals:Fundamentals;
	get primaryName():string{ return this.details ? `${this.details.longName}` : ''; }//{ return this.details ? `${this.contract.Symbol} - ${this.details.LongName}` : ''; }
	settingsSymbolContainer:Settings<SymbolSettings>;
	get settingsSymbol():SymbolSettings{ return this.settingsSymbolContainer.value; }
	@Input() pageSettings:Settings<PageSettings>;
	@Input() set symbol(value){ this._symbol=value; } get symbol():string{ return this.contract ? this.contract.symbol : ''; } private _symbol;
	@Output() symbolEvent = new EventEmitter<string>();
	subscription:TickObservable;
	tabEvents = new Subject<number>();
	@ViewChild( 'tabs', {static: false} ) tabs;
	tick: TickEx;
	get volumeDisplay()
	{
		var display = null;
		if( this.tick )
		{
			var volume = this.tick.volume*100;
			let divisor = 1;  let fixedPlaces = 0; let suffix = "";
			let calc = ( amount:number, sffx:string ):boolean=>
			{
				if( volume>amount )
					divisor = amount;
				if( divisor!=1 )
				{
					fixedPlaces =  volume>amount*10 ? volume>amount*100 ? 0 : 1 : 2;
					suffix = sffx;
				}
				return divisor!=1;
			};

			calc( 1_000_000, "M" ) || calc( 1_000, "K" );
			volume/=divisor;
			display = (fixedPlaces==0 ? volume.toString() : (volume).toFixed(fixedPlaces))+suffix;
		}
		return display;
	}
}