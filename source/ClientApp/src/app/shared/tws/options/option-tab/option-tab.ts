import { Component, EventEmitter, Input, Output, Inject, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatRadioChange} from '@angular/material/radio'
import { Subject, Observable, Subscription, forkJoin, CompletionObserver } from 'rxjs';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { IProfile } from 'src/app/services/profile/IProfile';
import { TwsService } from 'src/app/services/tws/tws.service';
import { TickEx } from 'src/app/services/tws/Tick';
import { IPageEvent } from 'src/app/shared/framework/paginator/paginator'
import { Option } from 'src/app/shared/tws/options/option-table/option'
import {OptionEntryDialog} from 'src/app/shared/tws/dialogs/option-entry/option-entry'
import {Settings,JoinSettings} from 'src/app/utilities/settings'

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { Day, DateUtilities } from 'src/app/utilities/dateUtilities';


class PageSettings implements IPageEvent
{
	assign( value:any )
	{
		if( value.pageSize!=undefined )
			this.pageSize = value.pageSize;
		if( value.startIndex!=undefined )
			this.startIndex = value.startIndex;
	}
	pageSize:number=12;
	startIndex:number=0;
};


class SymbolSettings
{
	assign( value:SymbolSettings )
	{
		this.type = value.type;
		this.expiration = value.expiration;
	}
	type:number=1;
	expiration:Day=0;
}

@Component({ selector: 'option-tab', /*styleUrls: ['optionTable.component.css'],*/ templateUrl: './option-tab.html' })
export class OptionTabComponent implements OnInit, OnDestroy
{
	constructor( private dialog : MatDialog, private tws : TwsService, @Inject('IErrorService') private cnsl: IErrorService, @Inject('IProfile') private profile: IProfile )
	{
	/*	if( !OptionTabComponent.settingsPage )
		{
			OptionTabComponent.settingsPage  = new PageSettings();
			this.profile.get<PageSettings>( OptionTabComponent.PageSettingsKey ).subscribe(
			{
				next: value =>{ if( value ) this.pageSize = value.pageSize; },
				error: e =>{console.log(e)}
			}
		}*/
	}
	ngOnInit()
	{
	/*	this.contractSubscription = this.contractEvents.subscribe( {next: value=>
		{
			this.holding=value;
		}} );
		*/
		this.tabSubscription = this.tabEvents.subscribe( {next: value=>
		{
			this.isActive = this.index==value;
		}} );
		//this.run();
	}
	ngOnDestroy()
	{
		//this.contractSubscription.unsubscribe();
		this.settingsContainer.save();
		this.pageSettings.save();
	}
	run = ():void =>
	{
		var contractId = this.contract ? this.contract.id : 0;
		if( !this.isActive || !contractId )
			return;
		this.settingsContainer.reset( contractId.toString() );
		JoinSettings( this.pageSettings, this.settingsContainer ).subscribe(
		{
			complete: ()=>
			{
				this.tws.reqOptionParams( contractId ).subscribe(
				{
					next: ( params:Results.IOptionParams ) =>
					{
						if( params.exchange!="SMART" )
							return;
						this.strikes = params.strikes;
						this.expirationDisplays = [];
						this.expirations = [];
						for( let expiration of params.expirations )
						{
							this.expirations.push( expiration );
							this.expirationDisplays.push( MarketUtilities.optionDisplayFromDays(expiration) );
						}
					},
					error:  e=>{ console.error(e); this.cnsl.error(`Could not retrieve Options '${e.message}'.`, e); }
				} );
			},
			error:  e=>{ debugger;console.error(e); }
		} );
	}
	changeType = (event:MatRadioChange):void=>
	{
	//	console.log( `changeType - ${this.optionType=="1" ? "Calls" : this.optionType=="2" ? "Puts" : "Calls-Puts" }` );
		this.settings.type==+this.optionType;
		this.settingsContainer.save();
}
	onOptionsLengthChange( length:number )
	{
		this.lengthChange.next( length );
		//this.optionsLength = length;
	}
	onSelectionChange( option:Option )
	{
		this.selectedOption = option;
	}
	onPaginator( event:IPageEvent )
	{
		this.pageInfo = event;
		this.pageEvents.next( event );
		this.pageSettings.save();
	}

	onTransactClick( buy:boolean )
	{
		this.tws.reqContractDetails( this.tick.contract ).subscribe(
		{
			next: details=>
			{
				const dialogRef = this.dialog.open(OptionEntryDialog, {
					width: '600px',
					data: { option: this.selectedOption, isBuy: buy, expirations: this.expirations, underlying: details }
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
		});
	}
	expirationIndexChange( index )
	{
		//console.log( `expirationIndexChange( ${index} )` );
		this.settings.expiration = index==0 ? 0 : this.expirations[index];
		this.settingsContainer.save();
	}
	static _id=0;
	id:number;
	set isActive(value:boolean){ if( this._isActive=value )this.run();} get isActive(){return this._isActive;} private _isActive: boolean;
	@Input() index:number;
	//@Input() symbol:string;
	@Input() set tick(value){ if( this._tick=value ) this.run(); } get tick(){return this._tick;} _tick: TickEx;
	//@Input() contractEvents:Observable<TickEx>; private contractSubscription:Subscription;
	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
	optionType:string="2";
	lengthChange: Subject<number> = new Subject<number>();
	//get pageSize(){ return this.pageSettings.value.pageSize; }
	pageEvents = new Subject<IPageEvent>();
	get pageInfo():IPageEvent{ return this.pageSettings.value; } set pageInfo(value:IPageEvent){ this.pageSettings.value.assign(value); }
	get contract(){ return this.tick ? this.tick.contract : null; }
	get expiration():Day{ return this.expirations && this.expirationSelectedIndex<this.expirations.length ? this.expirations[this.expirationSelectedIndex] : 0; }
	expirationDisplays : string[];
	expirations : Day[];
	get expirationSelectedIndex(){ return this.settings.expiration && this.expirations ? Math.max(0, this.expirations.indexOf(this.settings.expiration)) : 0; }
	set expirationSelectedIndex(value){ this.settings.expiration= value ? this.expirations[value] : 0; }
	selectedOption:Option=null;
	settingsContainer:Settings<SymbolSettings> = new Settings<SymbolSettings>( SymbolSettings, 'OptnTabCmpnnt.', this.profile );
	get settings(){ return this.settingsContainer ? this.settingsContainer.value : null;}
	pageSettings = new Settings<PageSettings>( PageSettings, 'OptnTabCmpnnt', this.profile );
	strikes:number[];
}
