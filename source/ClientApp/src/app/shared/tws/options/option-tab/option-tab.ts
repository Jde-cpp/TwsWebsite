import { Component, AfterViewInit, Input, Inject, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatRadioChange} from '@angular/material/radio'
import { Subject, Observable, Subscription, forkJoin, CompletionObserver } from 'rxjs';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { IProfile } from 'src/app/services/profile/IProfile';
import { TwsService } from 'src/app/services/tws/tws.service';
import { TickDetails } from 'src/app/services/tws/Tick';
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
	expiration:Day;
	midPrice:number;
}

@Component({ selector: 'option-tab', /*styleUrls: ['optionTable.component.css'],*/ templateUrl: './option-tab.html' })
export class OptionTabComponent implements OnInit, AfterViewInit, OnDestroy
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
		this.tabSubscription = this.tabEvents.subscribe( {next: value=>
		{
			this.isActive = this.index==value;
		}} );
	}
	ngOnDestroy()
	{
		this.settingsContainer.save();
		this.pageSettings.save();
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
				for( let expiration of params.expirations )
				{
					this.expirations.push( expiration );
					this.expirationDisplays.push( MarketUtilities.optionDisplayFromDays(expiration) );
				}
				this.viewPromise = Promise.resolve(true);
			}).catch( (e)=>{ console.error(e); this.cnsl.error(`Could not retrieve Options '${e.message}'.`, e); } );
		} );
	}
	changeType = (event:MatRadioChange):void=>
	{
		console.log( `changeType - ${this.optionType=="1" ? "Calls" : this.optionType=="2" ? "Puts" : "Calls-Puts" }` );
		this.settings.type==+this.optionType;
		this.settingsContainer.save();
}
	onOptionsLengthChange( length:number )
	{
		this.lengthChange.next( length );
	}
	onOptionsStartIndexChange( index:number )
	{
		console.log( `OptionTab::onOptionsStartIndexChange( ${index} )` );
		this.startIndexChange.next( index );
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
		this.tws.reqContractSingle( this.tick.contract ).then( (detail)=>
		{
			const dialogRef = this.dialog.open(OptionEntryDialog, {
				width: '600px',
				data: { option: this.selectedOption, isBuy: buy, expirations: this.expirations, underlying: detail }
			});
			dialogRef.afterClosed().subscribe(result =>
			{
				// if( result && this.settings.limit!=result.limit )
				// {
				// 	this.settings.limit = result.limit;
				// 	this.subscribe( this.applicationId, this.level );
				// }
			});
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
	set isActive(value:boolean){ /*if( */this._isActive=value;/* )this.run();*/} get isActive(){return this._isActive;} private _isActive: boolean=true;
	@Input() index:number;
	//@Input() symbol:string;
	@Input() set tick(value){ this._tick=value; } get tick(){return this._tick;} _tick: TickDetails;
	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
	optionType:string="2";
	lengthChange: Subject<number> = new Subject<number>();
	startIndexChange: Subject<number> = new Subject<number>();
	//get pageSize(){ return this.pageSettings.value.pageSize; }
	pageEvents = new Subject<IPageEvent>();
	get pageInfo():IPageEvent{ return this.pageSettings.value; } set pageInfo(value:IPageEvent){ this.pageSettings.value.assign(value); }
	get contract(){ return this.detail?.contract; }
	get detail(){ return this.tick?.detail; }
	get expiration():Day
	{
		const value = this.expirations && this.expirationSelectedIndex<this.expirations.length ? this.expirations[this.expirationSelectedIndex] : 0;
		console.log( `expiration=${value}` );
		return  value;
	}
	expirationDisplays : string[];
	expirations : Day[];
	get expirationSelectedIndex(){ return this.settings.expiration && this.expirations ? Math.max(0, this.expirations.indexOf(this.settings.expiration)) : 0; }
	set expirationSelectedIndex(value){ this.settings.expiration = value ? this.expirations[value] : undefined; }
	get midPrice():number{ return this.settingsContainer.value.midPrice ?? this.tick.last; }
	selectedOption:Option=null;
	settingsContainer:Settings<SymbolSettings> = new Settings<SymbolSettings>( SymbolSettings, 'OptnTabCmpnnt.', this.profile );
	get settings(){ return this.settingsContainer ? this.settingsContainer.value : null;}
	pageSettings = new Settings<PageSettings>( PageSettings, 'OptnTabCmpnnt', this.profile );
	strikes:number[];
	viewPromise:Promise<boolean>;
}
