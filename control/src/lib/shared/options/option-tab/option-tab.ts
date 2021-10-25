import { Component, AfterViewInit, Input, Inject, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatRadioChange} from '@angular/material/radio'
import { Subject, Observable, Subscription, forkJoin, CompletionObserver } from 'rxjs';
import {IErrorService} from 'jde-framework'
import { IProfile } from 'jde-framework';
import { TwsService } from '../../../services/tws.service';
import { TickDetails } from '../../../services/Tick';
import { PageEvent } from 'jde-framework'
import { Option } from '../../../shared/options/option-table/option'
import {OptionEntryDialog} from '../../../shared/dialogs/option-entry/option-entry'
import {Settings,JoinSettings} from 'jde-framework'

import * as ib2 from 'jde-cpp/ib'; import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import { MarketUtilities } from 	'../../../utilities/marketUtilities';
import { Day, DateUtilities } from 'jde-framework';
import { Sort } from '@angular/material/sort';

export class PageSettings
{
	assign( value:any )
	{
		if( value.tableLength!=undefined )
			this.tableLength = value.tableLength;
	}
	tableLength:number=12;
	sort:Sort;
};


class SymbolSettings
{
	assign( value:SymbolSettings )
	{
		this.type = value.type;
		this.expiration = value.expiration;
	}
	type:IB.SecurityRight=IB.SecurityRight.Put;
	expiration:Day;
	midPrice:number;
}

@Component({ selector: 'option-tab', /*styleUrls: ['optionTable.component.css'],*/ templateUrl: './option-tab.html' })
export class OptionTabComponent implements OnInit, AfterViewInit, OnDestroy
{
	constructor( private dialog : MatDialog, private tws : TwsService, @Inject('IErrorService') private cnsl: IErrorService, @Inject('IProfile') private profile: IProfile )
	{

	}
	ngOnInit()
	{
		this.tabSubscription = this.tabEvents.subscribe( {next: value=>
		{
			this.isActive = this.index==value;
		}} );
	}
	ngOnDestroy()
	{
		this.settingsContainer.save();
	}
	ngAfterViewInit()
	{
		this.run();
	}
	run = ():void =>
	{
		var contractId = this.contract ? this.contract.id : 0;
		if( !this.isActive || !contractId )
			return;
		this.settingsContainer.reset( contractId.toString() );
		JoinSettings( this.pageSettings, this.settingsContainer ).then( ()=>
		{
			this.tws.reqOptionParams( contractId ).then( ( params:Results.IExchangeContracts ) =>
			{
				this.strikes = params.strikes;
				this.expirationDisplays = [];
				this.expirations = [];
				const today = DateUtilities.toDays( new Date() );
				for( let expiration of params.expirations )
				{
					this.expirations.push( expiration );
					this.expirationDisplays.push( `${MarketUtilities.optionDayDisplay(expiration)}(${expiration-today} days)` );
				}
				this.viewPromise = Promise.resolve(true);
			}).catch( (e)=>{ console.error(e); this.cnsl.error(`Could not retrieve Options '${e.message}'.`, e); } );
		} );
	}
	changeType = (event:MatRadioChange):void=>
	{
		console.log( `changeType - ${this.optionType==IB.SecurityRight.Call ? "Calls" : this.optionType==IB.SecurityRight.Put ? "Puts" : "Calls-Puts" }` );
}
	onOptionsLengthChange( length:number )
	{
		this.lengthChange.next( length );
	}
	onOptionsStartIndexChange( indexMidPrice:[number,number] )
	{
		let [index,midPrice] = indexMidPrice;
		this.midPrice=midPrice;
		this.startIndexChange.next( index );
	}
	onSelectionChange( option:Option )
	{
		this.selectedOption = option;
	}
	onPaginator( event:PageEvent )
	{
		this.tableLength = event.pageLength;
		this.pageEvents.next( event );
	}

	onTransactClick( buy:boolean )
	{
		const dialogRef = this.dialog.open(OptionEntryDialog, {
			width: '600px',
			data: { option: this.selectedOption, isBuy: buy, expirations: this.expirations, underlying: this.tick.detail }
		});
		dialogRef.afterClosed().subscribe(result =>
		{
			// if( result && this.settings.limit!=result.limit )
			// {
			// 	this.settings.limit = result.limit;
			// 	this.subscribe( this.applicationId, this.level );
			// }
		});
	}
	expirationIndexChange( index )
	{
		this.settings.expiration = index==0 ? 0 : this.expirations[index];
		this.settingsContainer.save();
	}
	static _id=0;
	id:number;
	set isActive(value:boolean){ /*if( */this._isActive=value;/* )this.run();*/} get isActive(){return this._isActive;} private _isActive: boolean=true;
	@Input() index:number;
	@Input() set tick(value){ this._tick=value; } get tick(){return this._tick;} _tick: TickDetails;
	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;

	get optionType(){return this.settings.type;} set optionType(x){ if( x!=this.settings.type ){ this.settings.type=x; this.settingsContainer.save();} }; 
	set optionTypeString(x){ this.optionType=+x; } get optionTypeString(){ return this.optionType.toString(); }
	lengthChange: Subject<number> = new Subject<number>();
	startIndexChange: Subject<number> = new Subject<number>();
	pageEvents = new Subject<PageEvent>();
	get contract(){ return this.detail?.contract; }
	get detail(){ return this.tick?.detail; }
	get expiration():Day{ return this.expirations && this.expirationSelectedIndex<this.expirations.length ? this.expirations[this.expirationSelectedIndex] : 0; }
	expirationDisplays : string[];
	expirations : Day[];
	get expirationSelectedIndex(){ return this.settings.expiration && this.expirations ? Math.max(0, this.expirations.indexOf(this.settings.expiration)) : 0; }
	set expirationSelectedIndex(value){ this.settings.expiration = value ? this.expirations[value] : undefined; }
	get midPrice():number{ return this.settingsContainer.value.midPrice ?? this.tick.last; } set midPrice(x:number){ if( this.midPrice!=x ){this.settingsContainer.value.midPrice = x; this.settingsContainer.save();} }
	selectedOption:Option=null;
	settingsContainer:Settings<SymbolSettings> = new Settings<SymbolSettings>( SymbolSettings, 'OptnTabCmpnnt.', this.profile );
	get settings(){ return /*this.settingsContainer ?*/ this.settingsContainer.value/* : null*/;}
	get tableLength(){ return this.pageSettings.value.tableLength; } set tableLength(x){ if( x && this.pageSettings.value.tableLength!=x ){this.pageSettings.value.tableLength=x; this.pageSettings.save();} }
	pageSettings = new Settings<PageSettings>( PageSettings, 'OptnTabCmpnnt', this.profile );
	strikes:number[];
	viewPromise:Promise<boolean>;
}