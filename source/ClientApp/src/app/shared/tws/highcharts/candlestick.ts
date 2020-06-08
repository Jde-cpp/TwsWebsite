import { Component, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import {FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
//import { Tick } from '../../../types/Tick';
import { TwsService } from 'src/app/services/tws/tws.service';
//import {Highcharts} from 'highcharts/es-modules/parts/Globals.js'
//import * as Highcharts from 'highcharts'
import * as Highstock from "highcharts/highstock";
import * as Highcharts from "highcharts";
import {SeriesCandlestickOptions,SeriesColumnOptions} from "highcharts";

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbRequests from 'src/app/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;


@Component({ selector: 'candlestick', styleUrls: ['candlestick.css'], templateUrl: './candlestick.html' })
export class CandlestickComponent implements AfterViewInit
{
	constructor( private http: HttpClient, private twsService : TwsService )
	{}
	ngAfterViewInit():void
	{
		this.addTheme();
	}

	run = ( contract:IB.IContract ):void =>
	{
		if( this.contract!=contract )
			this._contract = contract;
		if( this.contract && !this.loaded && this.isActive )
		{
			var end = this.end.getTime() ? this.end : new Date( Date.now() );
			var days = this.start.getTime() ? Math.round((end.getTime()-this.start.getTime())/(1000*60*60*24)) : 1;
			if( days>5 )
				days = Math.round( days*5/7 );
			days = 1;
			let bars:Results.IBar[] = [];
			/*
			this.twsService.reqHistoricalData( this.contract, end, days, this.barSize, Requests.Display.Trades, true, false ).subscribe(
			{
				next: ( bar => {bars.push(bar);}),
				complete: ()=> {this.onHistoricalData(bars); },
				error:  e=>{console.error(e);}
			});*/
		}
	}
	onHistoricalData = ( bars: Results.IBar[] ):void=>
	{
		var ohlc = [], volume = [];
		var groupingUnits = [['week', [1]], ['month',[1, 2, 3, 4, 6]]];
		bars.forEach( bar=>
		{
			var time = new Date( (<number>bar.time)*1000);
			console.log( `${time} - ${bar.open} ${bar.low} ${bar.high} ${bar.close}` );
			let milliseconds = 1000*parseInt(bar.time.toString());
			ohlc.push( [milliseconds, bar.open, bar.high, bar.low, bar.close] );
			volume.push( [milliseconds,bar.volume] );
		});
		var options = <SeriesCandlestickOptions>{type: 'candlestick',name: 'AAPL', data: ohlc, dataGrouping: { units: groupingUnits } };
		var volumeOptions = <SeriesColumnOptions>{type: 'column',name: 'Volume',data: volume,yAxis: 1,dataGrouping: { units: groupingUnits }};
		Highstock.stockChart('container',
		{
			rangeSelector: {enabled:false},
			//title: {text: 'AAPL Historical'},
			yAxis: [{
				labels: {align: 'right', x: -3 },
				title:{text: 'OHLC'},
				height: '60%',
				lineWidth: 2,
				resize: {enabled: true }
			}, {
				labels: { align: 'right', x: -3 },
				title: {text: 'Volume'},
				top: '65%',
				height: '35%',
				offset: 0,
				lineWidth: 2
			}],
			  tooltip: {split: true },
			  series:  [options,volumeOptions]
			//series: [{type: 'candlestick', name: 'AAPL', data: ohlc, dataGrouping: { units: groupingUnits } },
			//			{type: 'column',name: 'Volume',data: volume,yAxis: 1,dataGrouping: { units: groupingUnits }}]
		});

		//$.getJSON('https://www.highcharts.com/samples/data/aapl-ohlcv.json', function (data)
/*		http.get( 'https://cors.io/?https://www.highcharts.com/samples/data/aapl-ohlcv.json').subscribe( (data)=>
		{
			var ohlc = [], volume = [], dataLength = data.length;
			var groupingUnits = [['week', [1]], ['month',[1, 2, 3, 4, 6]]];
			for( var i = 0; i < dataLength; i += 1 )
			{
				 ohlc.push([
					  data[i][0], // the date
					  data[i][1], // open
					  data[i][2], // high
					  data[i][3], // low
					  data[i][4]]); // close
				 volume.push([
					 data[i][0], // the date
					 data[i][5]]); // the volume
			}
			Highcharts.stockChart('container',
			{
				 rangeSelector: {selected: 1},
				 title: {text: 'AAPL Historical'},
				 yAxis: [{
					  labels: {align: 'right', x: -3 },
					  title:{text: 'OHLC'},
					  height: '60%',
					  lineWidth: 2,
					  resize: {enabled: true }
				 }, {
					  labels: { align: 'right', x: -3 },
					  title: {text: 'Volume'},
					  top: '65%',
					  height: '35%',
					  offset: 0,
					  lineWidth: 2
				 }],
	  			 tooltip: {split: true },
				 series: [{
					  type: 'candlestick',
					  name: 'AAPL',
					  data: ohlc,
					  dataGrouping: { units: groupingUnits }
				 }, {
					  type: 'column',
					  name: 'Volume',
					  data: volume,
					  yAxis: 1,
					  dataGrouping: { units: groupingUnits }
				 }]
			});
		});*/
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
	loaded:boolean;
	get settings():IChartSettings{ return {start: this.start, end: this.end, zoomHours: this.zoomHours, barSize: this.barSize, barStart: null, barEnd:null}; }	@Input()
	set settings( value:IChartSettings )
	{
		this.start = value.start; this.end = value.end;
		this.zoomHours = value.zoomHours;
		this.barSize = Requests.BarSize.Minute;//value.barSize;
	}@Output() settingsChange = new EventEmitter<IChartSettings>(); _settings:IChartSettings;
	@Input() set start(value:Date){this._start.setValue(value);this.run(this.contract);} get start():Date|null{return new Date( this._start.value );} _start = new FormControl();
	@Input() set end(value:Date){this._end.setValue(value);this.run(this.contract);} get end():Date|null{return new Date( this._end.value );} private _end = new FormControl();
	@Input() set zoomHours(value:number){this._zoomHours=value;this.run(this.contract);} get zoomHours(){return this._zoomHours;} private _zoomHours: number;
	@Input() set barSize(value){this._barSize=value;this.run(this.contract);} get barSize(){return this._barSize;} private _barSize: Requests.BarSize=Requests.BarSize.Minute;
	@Input() set isActive(value:boolean){this._isActive=value;this.run(this.contract);} get isActive(){return this._isActive;} private _isActive: boolean;
	@Input() set contract(value:IB.IContract){this.run(value);} get contract(){return this._contract;} private _contract: IB.IContract;
}

export class IChartSettings
{
	start: Date = new Date( Date.now()-1000*60*60*24*7 );
	end?: Date | null=null;
	zoomHours: number=24;
	barSize: Requests.BarSize = Requests.BarSize.Minute30;
	barStart?:Date|null;
	barEnd?:Date|null;
}
