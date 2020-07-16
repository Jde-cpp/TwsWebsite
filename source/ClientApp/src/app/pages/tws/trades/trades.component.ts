import { Component, AfterViewInit, OnInit, OnDestroy, Inject } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { TwsService } from 'src/app/services/tws/tws.service';
import { IProfile } from 'src/app/services/profile/IProfile';
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import {DataSource} from './DataSource'
import { FormControl } from '@angular/forms';
import { ComponentPageTitle } from '../../material-site/page-title/page-title';
import {IErrorService} from '../../../services/error/IErrorService'
import { Day, DateUtilities } from 'src/app/utilities/dateUtilities';

@Component( {selector: 'trades', styleUrls: ['trades.component.css'], templateUrl: './trades.component.html'} )
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
		this.profileService.put<Settings>( TradeComponent.profileKey, this.settings );
	}

	ngAfterViewInit():void
	{
		this.profileService.get<Settings>( TradeComponent.profileKey ).subscribe(
		{
			next: value =>
			{
				if( value )
					this.settings = value;
				this.load();
			},
			error: e =>{console.log(e);}
		});
	}
	load()
	{
		this.tws.flexExecutions( "act", DateUtilities.fromDays(this.start), DateUtilities.fromDays(this.end) ).subscribe(
		{
			next:	flex =>{ this.data = new DataSource( flex, this.settings.sort ); },
			error:  e=>{console.error(e); this.cnsle.error(e,null); }
		});
	}
	sortData(sort:Sort)
	{
		this.data.sort( sort );
		this.sort = sort;
	}
	get end():Day{ const time:Date = this._end.value; return DateUtilities.toDays( new Date(time.getTime()-time.getTimezoneOffset()*60000));} set end(day:Day){ const time=DateUtilities.fromDays(day); this._end.setValue( new Date(time.getTime()+time.getTimezoneOffset()*60000)); } _end = new FormControl();
	get start():Day{ const time:Date = this._start.value; return DateUtilities.toDays( new Date(time.getTime()-time.getTimezoneOffset()*60000));} set start(day:Day){ const time=DateUtilities.fromDays(day); this._start.setValue( new Date(time.getTime()+time.getTimezoneOffset()*60000)); } _start = new FormControl();
	private data:DataSource;
	private static profileKey="TradeComponent";
	settings:Settings={ sort:{active: "openTime", direction: "asc"} };
	get sort():Sort{ return this.settings.sort; } set sort(value){this.settings.sort = value;}
	displayedColumns:string[] = ["symbol","shares", "openTime", "closeTime", "return_", "openPrice", "closePrice", "commissions"];//"openLongPrediction", "openShortPrediction", "closeLongPrediction", "closeShortPrediction",
}

class Settings
{
	sort:Sort;
}
