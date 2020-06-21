import { Component, EventEmitter, Input, Output, Inject, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatRadioChange} from '@angular/material/radio'
import { Subject, Observable, Subscription } from 'rxjs';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { TwsService } from 'src/app/services/tws/tws.service';
import { TickEx } from 'src/app/services/tws/Tick';
import { PageEvent } from 'src/app/shared/framework/paginator/paginator'
import { Option } from 'src/app/shared/tws/options/option-table/option'
import {OptionEntryDialog} from 'src/app/shared/tws/dialogs/option-entry/option-entry'

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
//import { DateUtilities } from 'src/app/utilities/dateUtilities';

@Component({ selector: 'option-tab', /*styleUrls: ['optionTable.component.css'],*/ templateUrl: './option-tab.html' })
export class OptionTabComponent implements OnInit, OnDestroy
{
	constructor( private dialog : MatDialog, private tws : TwsService, @Inject('IErrorService') private cnsl: IErrorService )
	{}
	ngOnInit()
	{
		this.contractSubscription = this.contractEvents.subscribe( {next: value=>{this.holding=value;this.run();}} );
	}
	ngOnDestroy()
	{
		this.contractSubscription.unsubscribe();
	}
	run = ():void =>
	{
		if( !this.isActive || !this.contractId )
            return;
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
	}
	changeType = (event:MatRadioChange):void=>
	{
		console.log( `${this.optionType} - ${event}` );
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

	@Input() set isActive(value:boolean){ if( this._isActive=value )this.run();} get isActive(){return this._isActive;} private _isActive: boolean;
	set holding(value){ var prev = this.contractId; this._holding=value; if(  prev!=this.contractId ) this.run();} get holding(){return this._holding;} _holding: TickEx;
	@Input() contractEvents:Observable<TickEx>; private contractSubscription:Subscription;
	@Input() optionType:string="2";
	lengthChange: Subject<number> = new Subject<number>();
	pageEvents = new Subject<PageEvent>();
	get contractId(){ return this.holding ? this.holding.contract.id : 0; }
	expirationDisplays : string[];
	expirations : number[];
	selectedOption:Option=null;
	strikes:number[];
}
