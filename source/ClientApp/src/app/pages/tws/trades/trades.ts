import { Component, AfterViewInit, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Sort} from '@angular/material/sort';

import { TwsService } from 'src/app/services/tws/tws.service';
import { IProfile } from 'src/app/services/profile/IProfile';
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import {DataSource} from './DataSource'
import { ComponentPageTitle } from 'src/app/pages/material-site/page-title/page-title';
import {IErrorService} from 'src/app/services/error/IErrorService'
import {Settings, IAssignable} from 'src/app/utilities/settings'
import { DateUtilities, Day } from 'src/app/utilities/dateUtilities';

import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { ITradeCommon } from 'src/app/services/tws/ExecutionObserver';
import { DateRangeSettings } from 'src/app/shared/framework/date-range/date-range';

@Component( {selector: 'trades', styleUrls: ['trades.css'], templateUrl: './trades.html'} )
export class TradeComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private tws : TwsService, private componentPageTitle:ComponentPageTitle, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnInit()
	{
		this.componentPageTitle.title = this.componentPageTitle.title ? this.componentPageTitle.title+" | Trades" : "Trades";
		const today = DateUtilities.toDays( new Date() );
		const currentTradingDay = MarketUtilities.currentTradingDay();
		this.start = today>currentTradingDay ? currentTradingDay : MarketUtilities.previousTradingDay( today );
		this.end = today==currentTradingDay ? currentTradingDay : this.start;
	};

	ngOnDestroy()
	{
		this.settingsContainer.save();
	}

	ngAfterViewInit():void
	{
		this.settingsContainer.loadThen( this.load );
	}
	load = ()=>
	{
		const currentTradingDay = MarketUtilities.currentTradingDay();
		const today = DateUtilities.toDays( new Date() );
		let requests = 0, executions:ITradeCommon[] = [], flexResult;
		let setDataSource = ()=>
		{
			this.data = new DataSource( flexResult, executions, this.sort );
			this.viewPromise = Promise.resolve( true );
		};
		if( today==currentTradingDay )
		{
			++requests;
			this.tws.reqExecutions().subscribe2(
			{
				execution: (value:Results.IExecution)=>{ console.log( `${value.execId} price=${value.price}` ); executions.push(value); },
				commissionReport: ( value:Results.ICommissionReport )=>{ executions.find((x)=>{return x.execId==value.execId}).commission=value.commission; /*console.log( `${value.execId} commissions=${value.commission}` );*/ },
				error: (e)=>{ debugger;console.error( `error=${e.message}` ); },
				complete: ()=>{  --requests; if( !requests ) setDataSource();  },
			});
		}
		if( this.start<currentTradingDay )
		{
			++requests;
			this.tws.flexExecutions( "act", DateUtilities.fromDays(this.start), DateUtilities.fromDays(this.end) ).subscribe(
			{
				next:	flex =>{ flexResult = flex },
				error:  e=>{ debugger;console.error(e); this.cnsle.error(e,null); },
				complete: ()=>{  --requests; if( !requests ) setDataSource();  },
			});
		}
	}
	sortData(sort:Sort)
	{
		this.data.sort( sort );
		this.sort = sort;
	}
	//set start( value:Day ){ this._start = value;} get start():Day|null{ return this.settingsContainer.value.start; }
	//set end(value:Day){ this.settingsContainer.value.end = value;} get end():Day|null{ return this.settingsContainer.value.end; }
	dateRange:DateRangeSettings = new DateRangeSettings();
	get start():Day{return this.dateRange.start; } set start(x){this.dateRange.start=x; }
	get end():Day{return this.dateRange.end; } set end(x){this.dateRange.end=x; }

	data:DataSource;
	settingsContainer:Settings<PageSettings> = new Settings<PageSettings>( PageSettings, "TradeComponent", this.profileService );
	get sort():Sort{ return this.settingsContainer.value.sort; } set sort(value){this.settingsContainer.value.sort = value;}
	displayedColumns:string[] = ["symbol","shares", "openTime", "closeTime", "return_", "openPrice", "closePrice", "commissions"];//"openLongPrediction", "openShortPrediction", "closeLongPrediction", "closeShortPrediction",
	viewPromise:Promise<boolean>;
}

class PageSettings implements IAssignable<PageSettings>
{
	assign(other){this.sort=other.sort;}
	sort:Sort;
}
