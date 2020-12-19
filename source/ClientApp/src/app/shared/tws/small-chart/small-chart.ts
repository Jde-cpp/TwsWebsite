import { Inject, Input, Component } from '@angular/core';
import theme from 'highcharts/themes/dark-unica';
import * as Highcharts from 'highcharts/highstock';
import {IErrorService} from 		'jde-framework'
import { TwsService } from 	'jde-tws';
import { TickDetails } from 				'jde-tws';
import {DateUtilities} from 		'jde-framework'
import { MarketUtilities } from 	'jde-tws';
import {MathUtilities, StatResult} from  'jde-framework';

import * as ib2 from 'dist/jde-tws-assets/src/assets/proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbRequests from 'dist/jde-tws-assets/src/assets/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;
import * as IbResults from 'dist/jde-tws-assets/src/assets/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;

@Component( {selector: 'small-chart', templateUrl: './small-chart.html'} )
export class SmallChartComponent //implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private tws : TwsService, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	showChart()
	{
		let tws = this.tws, cnsle = this.cnsle, contract = this.detail.contract, dayBars = [];
		let endTime = DateUtilities.endOfDay( DateUtilities.fromDays(MarketUtilities.currentTradingDay( new Date(), MarketUtilities.contractHours(this.detail.tradingHours))) );
		tws.reqHistoricalData( contract, DateUtilities.fromDays(MarketUtilities.previousTradingDate(), true), 100, Requests.BarSize.Day, Requests.Display.Trades, true, false ).then( (dayBars)=>
		{
			let returns = dayBars.map( (bar)=>{ return (bar.close-bar.open)/bar.open;} );
			var beginningOfDay = DateUtilities.beginningOfDay(endTime);
			var openTime = this.tick.open || MarketUtilities.isMarketOpen(this.detail) ? null : beginningOfDay.getTime()+9.5*60*60000+DateUtilities.easternTimezoneOffset*60000;
			tws.reqHistoricalData( contract, endTime, 1, Requests.BarSize.Minute3, Requests.Display.Trades, false, false ).then( (bars)=>
			{
				const openBar = bars.find( bar=>bar.time.getTime()>=openTime );
				if( openBar )
					this.tick.open = openBar.open;
				this.showChart2( bars, MathUtilities.Statistics(returns, true) );
			}).catch( (e)=>{ console.error(e); cnsle.error("Could not connect to Tws.", e); });
		}).catch( (e)=>{ console.error(e); cnsle.error("Could not connect to Tws.", e); });
	}
	showChart2( bars, statResult:StatResult )
	{
		const tradingHours = MarketUtilities.contractHours( this.detail.tradingHours ), now = new Date();
		const currentDate = MarketUtilities.currentTradingDay( now, tradingHours );
		//console.log( currentDate );
		//var offset = MarketUtilities.getTimezoneOffset( this.contract.primaryExchange );
		const range=23400000/*6.5 hours*/, regularEnd = new Date(currentDate);

		const liquidHours = MarketUtilities.contractHours( this.detail.liquidHours )
		//const startTrading = now.getTime()<contractHours.start*1000 ? MarketUtilities.startTrading( currentDate, this.contract ) : contractHours.start;
		const isMarketOpen = MarketUtilities.isMarketOpen( this.detail );
		const liquidStart = isMarketOpen ? liquidHours.start*1000 : null;
		//maxDate = new Date(currentDate)
		const endTrading = isMarketOpen ? tradingHours.end*1000 : MarketUtilities.endLiquid( DateUtilities.endOfDay(DateUtilities.fromDays(currentDate)), this.detail.contract ).getTime();
		//const endLiquid =  isMarketOpen ? new Date(liquidHours.end*1000) : MarketUtilities.endLiquid( currentDate, this.detail.contract );
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
		Highcharts.stockChart( showLarge ? 'chart2' : 'chart', options );
	}
	get contract(){return this.detail.contract;}
	get detail():Results.IContractDetail{ return this.tick.detail; }// private _details:Results.IContractDetails;
	@Input() set tick(value:TickDetails){ this._tick = value; if( value ) this.showChart(); } get tick():TickDetails{ return this._tick; } private _tick:TickDetails;
}
