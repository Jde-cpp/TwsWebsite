import { Component, AfterViewInit, Inject, Input, OnDestroy, EventEmitter, Output, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, Subscription, forkJoin, CompletionObserver } from 'rxjs';
import {SeriesCandlestickOptions,SeriesColumnOptions} from "highcharts";
import * as Highstock from "highcharts/highstock";
import { TickDetails, TickEx } from '../../services/Tick';

import {IErrorService} from 'jde-framework'
import { IProfile } from 'jde-framework';
import { TwsService, IBar } from '../../services/tws.service';
import { Day, DateUtilities } from 'jde-framework';
import {Settings, IAssignable} from 'jde-framework'

import * as ib2 from 'jde-cpp/ib'; import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbRequests from 'jde-cpp/requests'; import Requests = IbRequests.Jde.Markets.Proto.Requests; import BarSize = Requests.BarSize;
import { MarketUtilities } from '../../utilities/marketUtilities';
import { LinkSelectOptions } from 'jde-framework';
import { TimeFrame,DateRangeSettings } from 'jde-framework';

@Component({ selector: 'candlestick', styleUrls: ['candlestick.css'], templateUrl: './candlestick.html' })
export class CandlestickComponent implements OnInit, AfterViewInit, OnDestroy
{
	constructor( private http: HttpClient, private tws : TwsService, @Inject('IErrorService') private cnsl: IErrorService, @Inject('IProfile') private profile: IProfile )
	{}
	ngOnInit()
	{
		console.log( 'CandlestickComponent::NgOnInit' );
		this.tabSubscription = this.tabEvents.subscribe( {next: value=>
		{
			this.isActive = this.index==value;
		}} );
	}
	async ngAfterViewInit()
	{
		console.log( 'CandlestickComponent::ngAfterViewInit' );
		this.settingsContainer = new Settings<ChartSettings>( ChartSettings, `Candlestick.${this.contract.symbol}`, this.profile );
		await this.settingsContainer.loadedPromise;
		this.run();
	}
	ngOnDestroy()
	{
		console.log( 'CandlestickComponent::ngOnDestroy' );
		if( this.tick )
		    this.settingsContainer.save();
		this.tabSubscription.unsubscribe();
		this.tabSubscription = null;
	}

	run = async ():Promise<void> =>
	{
		console.log( `CandlestickComponent::run( ${DateUtilities.displayDay(this.settingsContainer.value.dateRange.start)}, ${DateUtilities.displayDay(this.settingsContainer.value.dateRange.end)} )` );
		let today = MarketUtilities.currentTradingDay( null, this.tick.detail.liquidHours[0] )
		const end = Math.min( this.end, today ) || today;
		const start = this.timeFrame ? end-this.timeFrame : this.start;
		var days = start ? end-start+1 : 1;
		if( days>5 )
			days = Math.round( days*5/7 );
		try
		{
			console.log( `reqHistoricalData( ${DateUtilities.displayDay(end)}, days=${days} )` );
			const bars = await this.tws.reqHistoricalData( this.contract, DateUtilities.endOfDay(DateUtilities.fromDays(end)), days, this.settingsContainer.value.candleSticks.selected, Requests.Display.Trades, true, false );
		 	this.onHistoricalData( bars );
		}
		catch( e )
		{
			debugger;
			this.cnsl.error( e["message"], e  );
		}
	}
	onHistoricalData = ( bars: IBar[] ):void=>
	{
		var ohlc = [], volume = [];
		bars.forEach( bar=>
		{
			let milliseconds = bar.time.getTime();
			ohlc.push( [milliseconds, bar.open, bar.high, bar.low, bar.close] );
			volume.push( [milliseconds,bar.volume] );
		});
		let series:Highstock.SeriesOptionsType[] = [ <SeriesCandlestickOptions>{type: 'candlestick',name: this.contract.symbol, data: ohlc, color:"red", upColor:"green" } ];//, dataGrouping: { units: groupingUnits }
		let yAxis:Highstock.YAxisOptions[] = [{ labels: {align: 'right', x: -3 }, title:{text: ''}, height: this.settings.showVolume ? '60%' : '100%', lineWidth: 2, resize: {enabled: true } } ];
		let xAxis:Highstock.XAxisOptions[] = [ {max: 2200}  ];
		//endOnTick: false, maxPadding: 2500,
		if( this.settings.showVolume )
		{
			series.push( <SeriesColumnOptions>{type: 'column',name: 'Volume',data: volume,yAxis: 1} );//,dataGrouping: { units: groupingUnits }
			yAxis.push( {labels: { align: 'right', x: -3 }, title: {text: 'Volume'}, top: '65%', height: '35%', offset: 0, lineWidth: 2} );
		}
		this.chart = Highstock.stockChart( 'container',
		{
			chart:
			{
				backgroundColor:{linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },stops: [[0, '#2a2a2b'],[1, '#3e3e40']]},
				style: {fontFamily: '\'Unica One\', sans-serif'},
				plotBorderColor: '#606063'
        	},
			rangeSelector: {enabled:false},
			xAxis: xAxis,
			yAxis: yAxis,
			tooltip: {split: true },
			series:  series,
			//pane: { size: '3000px' },
			time: {useUTC:false}
		});
	}
	zoomChange( value:number ):void
	{
		console.log( `value=${this.settingsContainer.value.zoom.selected}` );
		let min = null, max = null, end = DateUtilities.fromDays( this.end );
		switch( value )
		{
			case ZoomSize.Day: min = end.getTime()-24*60*60000; break;
			case ZoomSize.Week: min = end.getTime()-7*24*60*60000; break;
			case ZoomSize.Month: min = new Date(end.getUTCFullYear(), end.getUTCMonth()-1, end.getUTCDate()).getTime(); break;
			case ZoomSize.Quarter: min = new Date(end.getUTCFullYear(), end.getUTCMonth()-3, end.getUTCDate()).getTime(); break;
			case ZoomSize.HalfYear: min = new Date(end.getUTCFullYear(), end.getUTCMonth()-6, end.getUTCDate()).getTime(); break;
			case ZoomSize.Year: min = new Date(end.getUTCFullYear()-1, end.getUTCMonth(), end.getUTCDate()).getTime(); break;
		}
		let axis = this.chart["xAxis"][0];
		axis.setExtremes( min, max );
		this.chart["showResetZoom"]();
		this.settingsContainer.save();
	}
	candleStickChange( _:BarSize )
	{
		this.settingsContainer.save();
		this.run();
	}
	onDateRangeChange( x:DateRangeSettings )
	{
		const j = x.toJSON(); const s = JSON.stringify( j );
		if( s==JSON.stringify(this.settingsContainer.value.dateRange.toJSON()) )
			return;
		console.log( `onDateRangeChange( ${s} )` );
		this.settingsContainer.value.dateRange = x;
		this.settingsContainer.save();
		this.run();
	}
	loaded:boolean;
	get contract(){return this.tick.contract;}
	chart:Highstock.StockChart;
	get timeFrame():Day|null{ return this.settingsContainer.value.dateRange.timeFrame; }
	get start():Day|null{ return this.settingsContainer.value.dateRange.start; }
	get end():Day|null{ return this.settingsContainer.value.dateRange.end ?? this.settingsContainer.value.dateRange.max; }
	set zoomHours(value:number){this._zoomHours=value;this.run();} get zoomHours(){return this._zoomHours;} private _zoomHours: number;
	get settings(){ return this.settingsContainer.value; }
	settingsContainer:Settings<ChartSettings>;
	isActive:boolean;
	get candleSticks(){ return this.settingsContainer.value.candleSticks; }
	@Input() index:number; indexParentTab:number;
	@Input() set tick(value){ this.#tick=value; } get tick(){return this.#tick;} #tick: TickDetails;
	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
}

enum ZoomSize
{
	None=0,
	Day=1,
	Week=7,
	Month=31,
	Quarter=92,
	HalfYear=183,
	Year=366
}
export class ChartSettings implements IAssignable<ChartSettings>
{
	assign( other:ChartSettings ){ if( other.dateRange )this.dateRange.assign( other.dateRange ); if( other.zoom ) this.zoom.assign( other.zoom ); this.candleSticks.assign(other.candleSticks); }

	candleSticks = new LinkSelectOptions<BarSize>( new Map([[BarSize.Minute, '1 min'],[BarSize.Minute2, '2 min'],[BarSize.Minute3, '3 min'],[BarSize.Minute5, '5 min'], [BarSize.Minute15, '15 min'], [BarSize.Minute30, '30 min'], [BarSize.Hour, 'Hour'], [BarSize.Day, 'Day'], [BarSize.Week, 'Week'], [BarSize.Month, 'Month']]), 4 );
	dateRange:DateRangeSettings = new DateRangeSettings( TimeFrame.Week, MarketUtilities.currentTradingDay(), (x)=>{return !MarketUtilities.isHoliday(x);} );
	showVolume:boolean=false;
	zoom = new LinkSelectOptions<ZoomSize>( new Map([[ZoomSize.None, 'All'],[ZoomSize.Day, 'Day'],[ZoomSize.Week, 'Week'],[ZoomSize.Month, 'Month'],[ZoomSize.Quarter, 'Quarter'], [ZoomSize.HalfYear, '½ Year'], [ZoomSize.Year, 'Year']]), 3, (key,_)=>{return key<this.dateRange.dayCount && ( key==ZoomSize.None || key>ChartSettings.ToZoom(this.candleSticks.selected));} );
	static ToZoom(x:BarSize):ZoomSize{let y=ZoomSize.Day; if(x==BarSize.Day)y=ZoomSize.Day; else if(x==BarSize.Week)y=ZoomSize.Week; else if( x==BarSize.Year )y=ZoomSize.Year; return y; }
}