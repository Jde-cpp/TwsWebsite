import { Component, AfterViewInit, Inject, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import {FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, Subscription, forkJoin, CompletionObserver } from 'rxjs';
import {SeriesCandlestickOptions,SeriesColumnOptions} from "highcharts";
import * as Highstock from "highcharts/highstock";
import * as Highcharts from "highcharts";
import { TickEx } from 'src/app/services/tws/Tick';

import {IErrorService} from 'src/app/services/error/IErrorService'
import { IProfile } from 'src/app/services/profile/IProfile';
import { TwsService, Bar } from 	'src/app/services/tws/tws.service';
//import {Highcharts} from 'highcharts/es-modules/parts/Globals.js'
//import * as Highcharts from 'highcharts'
import { Day, DateUtilities } from 'src/app/utilities/dateUtilities';
import {Settings,JoinSettings, IAssignable} from 'src/app/utilities/settings'

import * as ib2 from 'src/app/proto/ib'; import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'src/app/proto/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbRequests from 'src/app/proto/requests'; import Requests = IbRequests.Jde.Markets.Proto.Requests; import BarSize = Requests.BarSize;
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { LinkSelectOptions } from '../../framework/link-select/link-select';

@Component({ selector: 'candlestick', styleUrls: ['candlestick.css'], templateUrl: './candlestick.html' })
export class CandlestickComponent implements AfterViewInit, OnDestroy
{
	constructor( private http: HttpClient, private tws : TwsService, @Inject('IErrorService') private cnsl: IErrorService, @Inject('IProfile') private profile: IProfile )
	{}
	ngAfterViewInit():void
	{
		this.addTheme();
		this.tabSubscription = this.tabEvents.subscribe( {next: value=>{this.indexParentTab = value; this.run();}} );
		this.settingsContainer = new Settings<ChartSettings>( ChartSettings, `Candlestick.${this.contract.symbol}`, this.profile );
		this.settingsContainer.loadedPromise.then( ()=>{this.run();} );
	}
	ngOnDestroy()
	{
		if( this.tick )
		    this.settingsContainer.save();
		this.tabSubscription.unsubscribe();
		this.tabSubscription = null;
	}

	run = ():void =>
	{
		if( !this.isActive )
			return;

		console.log( `candlestick.start=${this.start}` );
		var end = this.end || MarketUtilities.currentTradingDay();
		var days = this.start ? end-this.start : 1;
		if( days>5 )
			days = Math.round( days*5/7 );
		let bars:Bar[] = [];
		this.tws.reqHistoricalData( this.contract, DateUtilities.endOfDay(DateUtilities.fromDays(end)), days, this.settingsContainer.value.candleSticks.selected, Requests.Display.Trades, true, false ).subscribe(
		{
			next: ( bar:Bar ) =>{ bars.push( bar ); },
			complete:()=>{ this.onHistoricalData(bars); },
			error:  e=>{console.error(e);}
		});
	}
	onHistoricalData = ( bars: Bar[] ):void=>
	{
		var ohlc = [], volume = [];
	//	var groupingUnits = [['week', [1]], ['month',[1, 2, 3, 4, 6]]];
		bars.forEach( bar=>
		{
			//var time = new Date( (<number>bar.time)*1000);
			//console.log( `${time} - ${bar.open} ${bar.low} ${bar.high} ${bar.close}` );
			let milliseconds = bar.time.getTime();
			ohlc.push( [milliseconds, bar.open, bar.high, bar.low, bar.close] );
			volume.push( [milliseconds,bar.volume] );
		});
		let series:Highstock.SeriesOptionsType[] = [ <SeriesCandlestickOptions>{type: 'candlestick',name: this.contract.symbol, data: ohlc, color:"red", upColor:"green" } ];//, dataGrouping: { units: groupingUnits }
		let yAxis:Highstock.YAxisOptions[] = [{ labels: {align: 'right', x: -3 }, title:{text: ''}, height: this.settings.showVolume ? '60%' : '100%', lineWidth: 2, resize: {enabled: true } } ];
		if( this.settings.showVolume )
		{
			series.push( <SeriesColumnOptions>{type: 'column',name: 'Volume',data: volume,yAxis: 1} );//,dataGrouping: { units: groupingUnits }
			yAxis.push( {labels: { align: 'right', x: -3 }, title: {text: 'Volume'}, top: '65%', height: '35%', offset: 0, lineWidth: 2} );
		}
		Highstock.stockChart('container',
		{
			rangeSelector: {enabled:false},
			yAxis: yAxis,
			tooltip: {split: true },
			series:  series
		});
	}
	addTheme():void
	{
		Highcharts.createElement('link', {href: 'https://fonts.googleapis.com/css?family=Unica+One', rel: 'stylesheet', type: 'text/css'}, null, document.getElementsByTagName('head')[0]);
		var theme =
		{
			colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
			chart:
			{
				 backgroundColor:{linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },stops: [[0, '#2a2a2b'],[1, '#3e3e40']]},
				 style: {fontFamily: '\'Unica One\', sans-serif'},
				 plotBorderColor: '#606063'
			},
			title: {
				 style: {
					  color: '#E0E0E3',
					  textTransform: 'uppercase',
					  fontSize: '20px'
				 }
			},
			subtitle: {
				 style: {
					  color: '#E0E0E3',
					  textTransform: 'uppercase'
				 }
			},
			xAxis: {
				 gridLineColor: '#707073',
				 labels: {
					  style: {
							color: '#E0E0E3'
					  }
				 },
				 lineColor: '#707073',
				 minorGridLineColor: '#505053',
				 tickColor: '#707073',
				 title: {
					  style: {
							color: '#A0A0A3'

					  }
				 }
			},
			yAxis: {
				 gridLineColor: '#707073',
				 labels: {
					  style: {
							color: '#E0E0E3'
					  }
				 },
				 lineColor: '#707073',
				 minorGridLineColor: '#505053',
				 tickColor: '#707073',
				 tickWidth: 1,
				 title: {
					  style: {
							color: '#A0A0A3'
					  }
				 }
			},
			tooltip: {
				 backgroundColor: 'rgba(0, 0, 0, 0.85)',
				 style: {
					  color: '#F0F0F0'
				 }
			},
			plotOptions: {
				 series: {
					  dataLabels: {
							color: '#B0B0B3'
					  },
					  marker: {
							lineColor: '#333'
					  }
				 },
				 boxplot: {
					  fillColor: '#505053'
				 },
				 candlestick: {
					  lineColor: 'white'
				 },
				 errorbar: {
					  color: 'white'
				 }
			},
			legend: {
				 itemStyle: {
					  color: '#E0E0E3'
				 },
				 itemHoverStyle: {
					  color: '#FFF'
				 },
				 itemHiddenStyle: {
					  color: '#606063'
				 }
			},
			credits: {
				 style: {
					  color: '#666'
				 }
			},
			labels: {
				 style: {
					  color: '#707073'
				 }
			},

			drilldown: {
				 activeAxisLabelStyle: {
					  color: '#F0F0F3'
				 },
				 activeDataLabelStyle: {
					  color: '#F0F0F3'
				 }
			},

			navigation: {
				 buttonOptions: {
					  symbolStroke: '#DDDDDD',
					  theme: {
							fill: '#505053'
					  }
				 }
			},

			// scroll charts
			rangeSelector: {
				 buttonTheme: {
					  fill: '#505053',
					  stroke: '#000000',
					  style: {
							color: '#CCC'
					  },
					  states: {
							hover: {
								 fill: '#707073',
								 stroke: '#000000',
								 style: {
									  color: 'white'
								 }
							},
							select: {
								 fill: '#000003',
								 stroke: '#000000',
								 style: {
									  color: 'white'
								 }
							}
					  }
				 },
				 inputBoxBorderColor: '#505053',
				 inputStyle: {
					  backgroundColor: '#333',
					  color: 'silver'
				 },
				 labelStyle: {
					  color: 'silver'
				 }
			},

			navigator: {
				 handles: {
					  backgroundColor: '#666',
					  borderColor: '#AAA'
				 },
				 outlineColor: '#CCC',
				 maskFill: 'rgba(255,255,255,0.1)',
				 series: {
					  color: '#7798BF',
					  lineColor: '#A6C7ED'
				 },
				 xAxis: {
					  gridLineColor: '#505053'
				 }
			},

			scrollbar: {
				 barBackgroundColor: '#808083',
				 barBorderColor: '#808083',
				 buttonArrowColor: '#CCC',
				 buttonBackgroundColor: '#606063',
				 buttonBorderColor: '#606063',
				 rifleColor: '#FFF',
				 trackBackgroundColor: '#404043',
				 trackBorderColor: '#404043'
			},

			// special colors for some of the
			legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
			background2: '#505053',
			dataLabelsColor: '#B0B0B3',
			textColor: '#C0C0C0',
			contrastTextColor: '#F0F0F3',
			maskColor: 'rgba(255,255,255,0.3)'
	  };

	  // Apply the theme
	  //Highcharts.setOptions(theme);
	}
	setGrouping(value:number):void
	{

	}
	candleStickChange( _:BarSize )
	{
		console.log( `value=${this.settingsContainer.value.candleSticks.selected}` );
		this.settingsContainer.save();
		this.run();
	}
	loaded:boolean;
	get contract(){return this.tick.contract;}
	set start( value:Day ){ this.settingsContainer.value.dayCount = this.endDate-value;this.run();} get start():Day{ return this.endDate-this.settingsContainer.value.dayCount; }
	set end(value:Day){ this.settingsContainer.value.end = value;this.run();} get end():Day|null{ return this.settingsContainer.value.end; }
	get endDate():Day{ return this.settingsContainer.value.end || MarketUtilities.currentTradingDay(); }
	set zoomHours(value:number){this._zoomHours=value;this.run();} get zoomHours(){return this._zoomHours;} private _zoomHours: number;
	//set barSize(value){this._barSize=value;this.run();} get barSize(){return this._barSize;} private _barSize: Requests.BarSize=Requests.BarSize.Minute;
	get settings(){ return this.settingsContainer.value; }
	settingsContainer:Settings<ChartSettings>;
	get isActive(){return this.index==this.indexParentTab && this.tick && this.settingsContainer.isLoaded;}
	get candleSticks(){ return this.settingsContainer.value.candleSticks; }
	@Input() index:number; indexParentTab:number;
	@Input() set tick(value){ this._tick=value; } get tick(){return this._tick;} _tick: TickEx;
	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
}

export class ChartSettings implements IAssignable<ChartSettings>
{
	assign( other:ChartSettings ){ this.dayCount=other.dayCount ?? 7; this.end=other.end; this.zoomHours=other.zoomHours; this.candleSticks.assign(other.candleSticks); }

//	barSize: Requests.BarSize = Requests.BarSize.Minute30;
	candleSticks = new LinkSelectOptions<BarSize>( new Map([[BarSize.Minute, '1 min'],[BarSize.Minute2, '2 min'],[BarSize.Minute3, '3 min'], [BarSize.Minute15, '15 min'], [BarSize.Minute30, '30 min'], [BarSize.Hour, 'Hour'], [BarSize.Week, 'Week'], [BarSize.Month, 'Month'], [BarSize.Month3, '3 Months'], [BarSize.Year, 'year']]), 3 );
	dayCount:number = 7;
	end: Day | null=null;
	showVolume:boolean=false;
	zoomHours: number=24;
	//barStart?:Date|null;
	//barEnd?:Date|null;
}
