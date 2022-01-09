import { Component, AfterViewInit, OnInit, OnDestroy, Inject } from '@angular/core';
import {Sort} from '@angular/material/sort';

import { IProfile, TimeFrame } from 'jde-framework';
import {IErrorService} from 'jde-framework'
import {Settings, IAssignable} from 'jde-framework'
import { DateUtilities, Day } from 'jde-framework';
import { DateRangeSettings } from 'jde-framework';
import { ComponentPageTitle } from 'jde-material';
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;

import { DataSource } from './DataSource'
import { ITradeCommon } from '../../services/ExecutionObserver';
import { TwsService } from '../../services/tws.service';
import { MarketUtilities } from 	'../../utilities/marketUtilities';

@Component( {selector: 'trades.main-content.mat-drawer-container', styleUrls: ['trades.css'], templateUrl: './trades.html'} )
export class TradeComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private tws : TwsService, private componentPageTitle:ComponentPageTitle, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnInit()
	{
		this.componentPageTitle.title = this.componentPageTitle.title ? this.componentPageTitle.title+" | Trades" : "Trades";
	};

	ngOnDestroy()
	{
		this.settings.save();
	}

	ngAfterViewInit():void
	{
		this.settings.loadThen( this.load );
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
		if( this.start<currentTradingDay || today!=currentTradingDay )
		{
			const end = this.end ?? currentTradingDay;
			const start = this.start ?? end-this.dayCount;
			++requests;
			this.tws.flexExecutions( "act", DateUtilities.fromDays(start), DateUtilities.fromDays(end) ).subscribe(
			{
				next:	flex =>{ flexResult = flex },
				error:  e=>{ debugger;console.log(e); this.cnsle.error("Could not load executions.",e); },
				complete: ()=>{  --requests; if( !requests ) setDataSource();  },
			});
		}
	}
	sortData(sort:Sort)
	{
		this.data.sort( sort );
		this.sort = sort;
	}
	dateRangeChange( x:DateRangeSettings )
	{
		debugger;
		this.settings.value.dateRange.assign( x );
		this.load();
	}
	get dateRange():DateRangeSettings{ return this.settings.value.dateRange; }
	get start():Day{return this.dateRange.start; } //set start(x){this.dateRange.start=x; }
	get end():Day{return this.dateRange.end; } //set end(x){this.dateRange.end=x; }
	get dayCount():Day{ return this.dateRange.dayCount; }

	data:DataSource;
	settings:Settings<PageSettings> = new Settings<PageSettings>( PageSettings, "TradeComponent", this.profileService );
	get sort():Sort{ return this.settings.value.sort; } set sort(value){this.settings.value.sort = value;}
	displayedColumns:string[] = ["symbol","shares", "openTime", "closeTime", "return_", "openPrice", "closePrice", "commissions"];//"openLongPrediction", "openShortPrediction", "closeLongPrediction", "closeShortPrediction",
	viewPromise:Promise<boolean>;
}

class PageSettings implements IAssignable<PageSettings>
{
	assign(other){ this.sort=other.sort; this.dateRange.assign( other.dateRange ); }
	sort:Sort={ active: "closeTime", direction: 'desc' };
	dateRange:DateRangeSettings = new DateRangeSettings();
}