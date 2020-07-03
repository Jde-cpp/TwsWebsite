import { Component, EventEmitter, Input, Output, Inject, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatRadioChange} from '@angular/material/radio'
import { Subject, Observable, Subscription } from 'rxjs';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { IProfile } from 'src/app/services/profile/IProfile';
import { TwsService } from 'src/app/services/tws/tws.service';
import { TickEx } from 'src/app/services/tws/Tick';
import { PageEvent } from 'src/app/shared/framework/paginator/paginator'
import { Option } from 'src/app/shared/tws/options/option-table/option'
import {OptionEntryDialog} from 'src/app/shared/tws/dialogs/option-entry/option-entry'
import {Settings} from 'src/app/utilities/settings'

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { Day } from 'src/app/utilities/dateUtilities';

/*
class PageSettings
{
	pageSize:number=12;
}
*/

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
		this.contractSubscription = this.contractEvents.subscribe( {next: value=>
		{
			this.holding=value;
		}} );
		this.tabSubscription = this.tabEvents.subscribe( {next: value=>
		{
			this.isActive = this.index==value;
		}} );
	}
	ngOnDestroy()
	{
		this.contractSubscription.unsubscribe();
		this.settingsContainer.save();
	}
	run = ():void =>
	{
		if( !this.isActive || !this.contractId )
			return;
		this.settingsContainer.reset( this.contractId.toString() );
		this.settingsContainer.load().subscribe(
		{
			complete: ()=>
			{
				this.tws.reqOptionParams( this.contractId ).subscribe(
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
					error:  e=>{ console.error(e); this.cnsl.error("Could not connect to Tws.", e); }
				} );
			},
			error:  e=>{ console.error(e); }
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
		//this.optionsLength = length;
	}
	onSelectionChange( option:Option )
	{
		this.selectedOption = option;
	}
	onPaginator( event:PageEvent )
	{
		this.pageEvents.next( event );
	}

	onTransactClick( buy:boolean )
	{
		const dialogRef = this.dialog.open(OptionEntryDialog, {
			width: '600px',
			data: { option: this.selectedOption, isBuy: buy, expirations: this.expirations, underlying: this.holding }
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
		console.log( `expirationIndexChange( ${index} )` );
		this.settings.expiration = index==0 ? 0 : this.expirations[index];
		this.settingsContainer.save();
	}
	static _id=0;
	id:number;
	set isActive(value:boolean){ if( this._isActive=value )this.run();} get isActive(){return this._isActive;} private _isActive: boolean;
	@Input() index:number;
	@Input() symbol:string;
	set holding(value)
	{
		var prev = this.contractId;
		this._holding=value;
		if( prev!=this.contractId )
			this.run();
	} get holding(){return this._holding;} _holding: TickEx;
	@Input() contractEvents:Observable<TickEx>; private contractSubscription:Subscription;
	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
	@Input() optionType:string="2";
	lengthChange: Subject<number> = new Subject<number>();
	pageEvents = new Subject<PageEvent>();
	get contractId(){ return this.holding ? this.holding.contract.id : 0; }
	expirationDisplays : string[];
	expirations : number[];
	get expirationSelectedIndex(){ return this.settings.expiration ? Math.max(0, this.expirations.indexOf(this.settings.expiration)) : 0; }
	set expirationSelectedIndex(value){ this.settings.expiration= value ? this.expirations[value] : 0; }
	selectedOption:Option=null;
	settingsContainer:Settings<SymbolSettings> = new Settings<SymbolSettings>( SymbolSettings, 'OptnTabCmpnnt.', this.profile );
	get settings(){ return this.settingsContainer ? this.settingsContainer.value : null;}
	strikes:number[];
	//private static settingsPage:PageSettings=null;  private static PageSettingsKey="OptionTabComponent";
}
