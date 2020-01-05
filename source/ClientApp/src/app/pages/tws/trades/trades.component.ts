import { Component, AfterViewInit, OnInit, OnDestroy, Inject } from '@angular/core';
import { Sort } from '@angular/material';
import { TwsService } from 'src/app/services/tws/tws.service';
import { IProfile } from 'src/app/services/profile/IProfile';
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import {DataSource} from './DataSource'
import { FormControl } from '@angular/forms';
import { ComponentPageTitle } from '../../material-site/page-title/page-title';
import {IErrorService} from '../../../services/error/IErrorService'

@Component( {selector: 'trades', styleUrls: ['trades.component.css'], templateUrl: './trades.component.html'} )
export class TradeComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private tws : TwsService, private componentPageTitle:ComponentPageTitle, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnInit()
	{
		this.componentPageTitle.title = this.componentPageTitle.title ? this.componentPageTitle.title+" | Trades" : "Trades";
		this._end.setValue( MarketUtilities.previousTradingDay() );
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
		this.tws.flexExecutions( "act", MarketUtilities.previousTradingDay() ).subscribe(
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
	private get end():Date{ return new Date( this._end.value );} private set end(value:Date){this._end.setValue(value);} private _end = new FormControl();
	private get dayCount():number{ return this._dayCount; } private set dayCount(value:number)
	{
		if( this._dayCount!=value )
		{
			this._dayCount = +value;
			this.load();
		}
	} private _dayCount:number=1;
	private data:DataSource;
	private static profileKey="TradeComponent";
	settings:Settings={ sort:{active: "openTime", direction: "asc"} };
	get sort():Sort{ return this.settings.sort; } set sort(value){this.settings.sort = value;}
	displayedColumns:string[] = ["symbol","shares", "openTime", "closeTime", "return_", "openPrice", "closePrice"];//"openLongPrediction", "openShortPrediction", "closeLongPrediction", "closeShortPrediction",
}

class Settings
{
	sort:Sort;
}
