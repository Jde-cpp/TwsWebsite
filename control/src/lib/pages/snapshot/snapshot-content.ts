import { AfterViewInit, ElementRef, EventEmitter, Inject, Input, Component, OnInit, OnDestroy, Output,  ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTabChangeEvent} from '@angular/material/tabs';
import { Subject } from 'rxjs';

import theme from 'highcharts/themes/dark-unica';
import * as Highcharts from 'highcharts/highstock';
import { DateUtilities, MathUtilities, IAssignable, IErrorService, IProfile, ProtoUtilities, Settings, StatResult} from 'jde-framework'

import {ConfigurationData,ConfigurationDialog} from './configuration'
import {Fundamentals } from './fundamentals/fundamentals'
import {PageSettings} from './PageSettings'
import { TransactDoModal } from '../../shared/dialogs/transact/transact'
import { TwsService } from '../../services/tws.service';
import { TickObservable } from '../../services/ITickObserver';
import { TickDetails } from '../../services/Tick';
import { MarketUtilities } from 	'../../utilities/marketUtilities';

import * as ib2 from 'jde-cpp/ib';  import IB = ib2.Jde.Markets.Proto;
import * as IbRequests from 'jde-cpp/requests';  import Requests = IbRequests.Jde.Markets.Proto.Requests;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;

export class SymbolSettings implements IAssignable<SymbolSettings>
{
	assign( value:SymbolSettings )
	{
	//	this.shortInterest = value.shortInterest;
	//	this.shortInterestDate=value.shortInterestDate;
		this.tabIndex = value.tabIndex;
	}
	//shortInterest:number;shortInterestDate:Date;
	tabIndex:number;
}

@Component( {selector: 'snapshot-content', styleUrls: ['snapshot.css'], templateUrl: './snapshot-content.html'} )
export class SnapshotContentComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private change: ChangeDetectorRef, private dialog : MatDialog, private element : ElementRef, private tws : TwsService, private snackBar: MatSnackBar, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnInit()
	{
		console.log( `(${this.detail && this.detail.contract ? this.detail.contract.symbol : 'null'})SnapshotContentComponent::ngOnInit` );
		this.settings = new Settings<SymbolSettings>( SymbolSettings, `SnapshotComponent.${this.detail.contract.symbol}`, this.profileService );
	}
	async ngAfterViewInit()
	{
		console.log( `(${this.detail.contract.symbol})SnapshotContentComponent::ngAfterViewInit` );
		const initialized = this.indexSelectedSymbol==this.index;
		console.log( `(${this.detail.contract.symbol})SnapshotContentComponent::run initialized=${initialized}` );
		if( !initialized )
			return;
		await this.settings.loadedPromise;
		await this.settingsLoaded();
	}
	ngOnDestroy()
	{
		if( this.subscription )
			this.tws.cancelMktDataSingle( this.subscription );
		this.settings.save();
	}

	setSymbol( symbol:string )
	{
		if( symbol && symbol!=this.detail.contract.symbol )
		{
			this.tws.reqSymbolSingle( symbol ).then( (result)=>
			{
				this.symbolEvent.next( result );
				this.symbolInput.nativeElement.value = this.detail.contract.symbol;
			}).catch( (e)=>console.log(e.error?.message) );
		}
	}
	onConfigurationClick()
	{
		var data:ConfigurationData = { symbolSettings: this.settings, pageSettings: this.pageSettings }
		this.dialog.open( ConfigurationDialog, {width: '600px', data: data} );
	}
	async settingsLoaded()
	{
		this.selectedTab.setValue( this.settings.value.tabIndex );
		let tick = this.tick = new TickDetails( this.detail );
		try
		{
			await this.tws.reqFundamentals( this.detail.contract.id ).then( value=>{this.fundamentals = new Fundamentals(value);} );
		}
		catch( e )
		{
			this.cnsle.error( "Loading fundamental data failed.", e );
			return;
		}
		this.loadedPromise = Promise.resolve( true );
		const now = new Date();
		var previousDay = MarketUtilities.previousTradingDate( now, MarketUtilities.contractHours(this.detail.tradingHours) );
		this.tws.reqPreviousDay( [this.contract.id] ).subscribe(
		{
			next: ( bar:Results.IDaySummary ) =>
			{
				if( tick.isMarketOpen && bar.day>previousDay )
				{
					tick.high = bar.high;
					tick.low = bar.low;
					tick.open = bar.open;
				}
				else if( tick.isMarketOpen || bar.day==previousDay )
					tick.close = bar.close;
				else if( bar.day>previousDay )
				{
					tick.high = bar.high;//!isMarketOpen && day>previousDay
					tick.low = bar.low;

					tick.bid = bar.bid;
					tick.ask = bar.ask;
					tick.volume = ProtoUtilities.toNumber( bar.volume );
					tick.last = ProtoUtilities.toNumber( bar.close );

					tick.open = bar.open;
				}
			},
			complete:()=>
			{
				if( !tick.close )
					console.log( `No previous day close for '${this.detail.contract.symbol}'` );
				this.showChart();
				this.tabEvents.next( this.tabs.selectedIndex ?? this.settings.value.tabIndex ?? 0 );
			},
			error: e=>
			{
				debugger;
				console.error(e);
			}
		});
		if( this.subscription )
			this.tws.cancelMktDataSingle( this.subscription );
		var ticks = [Requests.ETickList.Inventory, Requests.ETickList.HistoricalVolatility_, Requests.ETickList.ImpliedVolatility_, Requests.ETickList.PlPrice];
		if( !this.tick.isMarketOpen )
			ticks.push( Requests.ETickList.MiscStats );

		this.subscription = this.tws.reqMktData( this.contract.id, ticks, false );
		this.subscription.subscribe2( this.tick );
	}
	onTransactClick( buy:boolean )
	{
		TransactDoModal( this.dialog, this.profileService, this.tws, this.detail, this.tick, buy );
	}
	setShortInterest( value, date )
	{
		console.log( `setShortInterest = ${value}` );
		this.settings.save();
	}

	async showChart()
	{
		console.log( "showChart" );
		let tws = this.tws, cnsle = this.cnsle, contract = this.contract;
		let endTime = DateUtilities.endOfDay( DateUtilities.fromDays(MarketUtilities.currentTradingDay( new Date(), MarketUtilities.contractHours(this.detail.tradingHours))) );
		try
		{
			const dayBars = await tws.reqHistoricalData( contract, DateUtilities.endOfDay(DateUtilities.fromDays(MarketUtilities.previousTradingDay())), 100, Requests.BarSize.Day, Requests.Display.Trades, true, false );
			console.log( `dayBars.size=${dayBars.length}` );
			let returns = dayBars.map( (bar)=>{ return (bar.close-bar.open)/bar.open;} );
			const beginningOfDay = DateUtilities.beginningOfDay(endTime);
			const openTime = this.tick.open || MarketUtilities.isMarketOpen(this.detail) ? null : beginningOfDay.getTime()+9.5*60*60000+DateUtilities.easternTimezoneOffset()*60000;
			const bars = await tws.reqHistoricalData( contract, endTime, 1, Requests.BarSize.Minute3, Requests.Display.Trades, false, false );
			console.log( `bars.size=${dayBars.length}` );
			if( !bars.length )
				return;
			const openBar = bars.find( bar=>bar.time.getTime()>=openTime );
			if( openBar )
				this.tick.open = openBar.open;
			const first = bars[0];
			let minuteReturns = [ [first.time.getTime()-3*60, first.open] ];
			for( let bar of bars )
				minuteReturns.push( [bar.time.getTime(), bar.close] );
			setTimeout( () =>this.showChart2(minuteReturns, MathUtilities.Statistics(returns, true)), 500 );
		}
		catch( e )
		{
			console.error(e); cnsle.error("Could not connect to Tws.", e);
		}
	}
	showChart2( bars, statResult:StatResult )
	{
		const tradingHours = MarketUtilities.contractHours( this.detail.tradingHours ), now = new Date();
		const current = MarketUtilities.currentTradingDay( now, tradingHours );
		const range=23400000/*6.5 hours*/, regularEnd = DateUtilities.fromDays( current );

		const liquidHours = MarketUtilities.contractHours( this.detail.liquidHours )
		const isMarketOpen = MarketUtilities.isMarketOpen( this.detail );
		const liquidStart = isMarketOpen ? liquidHours.start*1000 : null;
		const endTrading = isMarketOpen ? tradingHours.end*1000 : MarketUtilities.endLiquid( DateUtilities.endOfDay(DateUtilities.fromDays(current)), this.detail.contract ).getTime();
		const minDate = isMarketOpen ? tradingHours.start*1000 : endTrading-range;
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
		const midpoint = (maxValue+minValue)/2;
		let yAxisLength = (maxValue-minValue)/2;
		theme( Highcharts );
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
						if( series.data )
						{
							setInterval(function ()
							{
								const data = series.data, length = series.data?.length;
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
		window.Highcharts = Highcharts;
		this._charts.push( Highcharts.stockChart(showLarge ? 'chart2' : 'chart', options) );
		console.log( `showChart2 finished` );
	}
	onError = ( error: Results.IError ):void =>
	{
		const message = `${error.code} - ${error.message}`;
		console.log( message );
		this.snackBar.open( message, '', {duration: 2000} );
	};
	onTabChange( e:MatTabChangeEvent )
	{
		console.log( "SnapshotContentComponent::onTabChange" );
		this.selectedTab.setValue( this.settings.value.tabIndex = e.index );
		this.settings.save();
	}
	_charts=[];
	get contract():IB.IContract{ return this.detail ? this.detail.contract : null; }
	fundamentals:Fundamentals;
	@Input() index:number;
	@Input() set indexSelectedSymbol(value){ this._indexSelectedSymbol=value; } get indexSelectedSymbol(){ return this._indexSelectedSymbol;} private _indexSelectedSymbol:number;
	@Input() set pageSettings(value){ this._pageSettings=value; } get pageSettings(){ return this._pageSettings;} private _pageSettings:Settings<PageSettings>;
	@Input() set detail(x){ this._detail=x; } get detail(){ return this._detail; } private _detail:Results.IContractDetail;

	loadedPromise:Promise<boolean>;
	get primaryName():string{ return this.detail ? `${this.detail.longName}` : ''; }

	selectedTab = new FormControl(0);
	settings:Settings<SymbolSettings>;
	subscription:TickObservable;
	@Output() symbolEvent = new EventEmitter<Results.IContractDetail>();
	get symbol():string{ return this.tick.contract.symbol; }
	@ViewChild('symbolInput', {static: false} ) symbolInput;
	tabEvents = new Subject<number>();
	@ViewChild( 'tabs', {static: false} ) tabs;
	tick: TickDetails;
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