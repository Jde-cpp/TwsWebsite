import {Component, Inject,AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProfile } from 'src/app/services/profile/IProfile';
import { TickEx } from 'src/app/services/tws/Tick';
import { TwsService } from 'src/app/services/tws/tws.service';
import {ConfirmationDialog} from './confirmation'
import {Settings, IAssignable} from 'src/app/utilities/settings'
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;
import { MarketUtilities } from 'src/app/utilities/marketUtilities';

export class Data
{
	details:Results.IContractDetails;
	tick:TickEx;
	isBuy:boolean;
	quantity: number;
	showStop: boolean;
	allAccounts:Map<string,string>;
	settingsContainer:Settings<DialogSettings>;
}

export function TransactDoModal( dialog : MatDialog, profile: IProfile, tws : TwsService, details:Results.IContractDetails, tick:TickEx, isBuy:boolean, quantity: number=null, showStop:boolean=true )
{
	let settingsContainer = new Settings<DialogSettings>( DialogSettings, "TransactDialog", profile );
	settingsContainer.load().subscribe({ complete: ()=>
	{
		tws.reqManagedAccts().subscribe( (numbers)=>
		{
			let allAccounts = new Map<string,string>();
			for( let account in numbers )
				allAccounts.set( account, numbers[account] );
			const dialogRef = dialog.open(TransactDialog, {
				width: '600px', autoFocus: false,
				data: { details: details, tick: tick, isBuy: isBuy, quantity: quantity, showStop: showStop, allAccounts: allAccounts, settingsContainer: settingsContainer }
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
	} });

}

@Component( {templateUrl: 'transact.html', styleUrls:["transact.css"]} )
export class TransactDialog implements AfterViewInit
{
	constructor( public dialogRef:MatDialogRef<TransactDialog>, @Inject(MAT_DIALOG_DATA) public data:Data, private tws : TwsService, private dialog : MatDialog )
	{
		this.quantity = data.quantity || 100;
		//this._submitting = false;
		this.isBuy = data.isBuy;
		this.showStop = data.showStop!=false;
		if( data.tick )
		{
			this.tick = data.tick;
			this.limit = data.isBuy ? data.tick.bid : data.tick.ask;
			this.details = data.details;
			this.isLiquid = MarketUtilities.isLiquid( this.details );
			if( this.limit==-1 )
				this.limit = data.tick.last;
			const delta = Math.round( (this.limit *.01)*100 )/100 * (data.isBuy ? -1 : 1);
			this.stop = this.limit+delta;
			this.stopLimit = this.stop+delta;
		}
	}
	ngAfterViewInit():void
	{
	}
	onCancelClick(): void
	{
	  this.dialogRef.close( null );
	}

	onSubmitClick():void
	{
		const subscription = this.tws.placeOrder( this.data.tick.contract, {isBuy:this.isBuy, quantity: this.quantity, limit: this.limit, transmit: true, whatIf: true, account: this.selectedAccount, usePriceMngmntAlgrthm: 1, outsideRth: this.outsideRth}, this.stop, this.stopLimit );
		let initial:Results.IOpenOrder;
		let shown = false;
		subscription.subscribe2(
		{
			status: ( value:Results.IOrderStatus )=>{ console.log( `status='${value}'` ); },
			open: ( value:Results.IOpenOrder )=>
			{
				if( !initial && !value.state.equityWithLoanBefore )
					initial = value;//1st one doesn't have margin.
				else if( !shown )
				{
					shown = true;
					this.dialogRef.close( null );
					const dialogRef = this.dialog.open(ConfirmationDialog, {
						width: '600px', autoFocus: false,
						data: { transactData: this.data, subscription: subscription, order:value, stop: this.stop, stopLimit: this.stopLimit }
					});
				}
			},
			complete: ()=>{ console.log( `status=complete` ); },
			error: (e)=>{ debugger; console.error( `error=${e.message}` ); }
		});
	}
	get allAccounts(){ return this.data.allAccounts;}; //{ [k: string]: string };
	get backgroundColor():string
	{
		const red = this.isBuy ? 0 : 255;
		const green = this.isBuy ? 255 : 0;
		const prefix = `rgba(${red},${green},0,`;
		return `linear-gradient(to right, ${prefix}255),${prefix}0))`;
	}
	get description(){ return /*this.option ? this.option.description :*/ `${this.details.contract.symbol} - ${this.details.longName}`; }
	details:Results.IContractDetails;

	get ask(){return this.tick.ask || 0;}
	get askSize(){return this.tick.askSize || 0;}
	get bid(){return this.tick && this.tick.bid || 0;}
	get bidSize(){return this.tick.bidSize || 0;}

	get isBuy(){return this._isBuy!="Sell";} set isBuy(value){this._isBuy=value ? "Buy" : "Sell";} _isBuy:string;
	isLiquid:boolean;
	outsideRth:boolean=false;
	quantity:number;
	limit:number;
	get selectedAccount(){ return this.settingsContainer.value.selectedAccount; } set selectedAccount(v)
	{
		if( this.selectedAccount!=v )
		{
			this.settingsContainer.value.selectedAccount=v;
			this.settingsContainer.save();
		}
	}
	get settingsContainer(){ return this.data.settingsContainer;}
	showStop:boolean;
	get stop(){return this._stop;} set stop(value){this._stop = Math.round(value*100)/100;} private _stop:number;
	get stopLimit(){return this._stopLimit;} set stopLimit(value){this._stopLimit = Math.round(value*100)/100;} private _stopLimit:number;
	tick:TickEx;
	//option:Option;

	private _submitting=false;
}

class DialogSettings implements IAssignable<DialogSettings>
{
	assign( value:DialogSettings )
	{
		this.selectedAccount = value.selectedAccount;
	}
	selectedAccount:string;
}
