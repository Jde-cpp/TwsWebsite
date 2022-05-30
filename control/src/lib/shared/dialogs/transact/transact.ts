import {Component, Inject,AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProfile } from 'jde-framework';
import { TickEx } from '../../../services/Tick';
import { TwsService } from '../../../services/tws.service';
import { MarketUtilities } from '../../../utilities/marketUtilities';
import {ConfirmationDialog} from './confirmation'
import {Settings, IAssignable} from 'jde-framework'
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import * as ib2 from 'jde-cpp/ib'; import IB = ib2.Jde.Markets.Proto;

export class TransactDialogData
{
	detail:Results.IContractDetail;
	tick:TickEx;
	isBuy:boolean;
	quantity: number;
	showStop: boolean;
	allAccounts:Map<string,string>;
	settingsContainer:Settings<DialogSettings>;
}

export async function TransactDoModal( dialog : MatDialog, profile: IProfile, tws : TwsService, detail:Results.IContractDetail, tick:TickEx, isBuy:boolean, quantity: number=null, showStop:boolean=true )
{
	const settingsContainer = new Settings<DialogSettings>( DialogSettings, "TransactDialog", profile );
	await settingsContainer.loadedPromise;
	const numbers = await tws.reqManagedAccts();
	let allAccounts = new Map<string,string>();
	for( const account in numbers )
		allAccounts.set( account, numbers[account] );
	const dialogRef = dialog.open(TransactDialog, {
		width: '600px', autoFocus: false,
		data: { detail: detail, tick: tick, isBuy: isBuy, quantity: quantity, showStop: showStop, allAccounts: allAccounts, settingsContainer: settingsContainer }
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

@Component( {templateUrl: 'transact.html', styleUrls:["transact.css"]} )
export class TransactDialog implements AfterViewInit
{
	constructor( public dialogRef:MatDialogRef<TransactDialog>, @Inject(MAT_DIALOG_DATA) public data:TransactDialogData, private tws : TwsService, private dialog : MatDialog )
	{
		this.quantity2 = data.quantity || 100;
		this.isBuy = data.isBuy;
		this.showStop = data.showStop!=false;
		if( data.tick )
		{
			this.tick = data.tick;
			this.limit = data.isBuy ? data.tick.bid : data.tick.ask;
			this.detail = data.detail;
			this.isLiquid = MarketUtilities.isLiquid( this.detail );
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
	reqPosition():void
	{
		this.position = null;
		let s = this.tws.reqPositions( this.selectedAccount );
		s.subscribe({ next:value=>
		{
			if( !value || value.contract.id==this.detail.contract.id )
			{
				this.position = value ? value.position : 0;
				this.tws.cancelPositions( s );
				s = null;
			}
		} });
	}
	onSubmitClick():void
	{
		const subscription = this.tws.placeOrder( this.data.tick.contract, {isBuy:this.isBuy, quantity: this.quantity2, limit: this.limit, transmit: true, whatIf: true, account: this.selectedAccount, usePriceMngmntAlgrthm: 1, outsideRth: this.outsideRth}, this.stop, this.stopLimit );
		let initial:Results.IOpenOrder;
		let shown = false;
		subscription.subscribe2(
		{
			status: ( value:IB.IOrderStatus )=>{ console.log( `status='${value}'` ); },
			state: (x:Results.IOrderState )=>{ console.log( `state='${x}'` ); },
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
	get description(){ return `${this.detail.contract.symbol} - ${this.detail.longName}`; }
	//get description(){ var pos = this.position==null ? "" : ` Position=${this.position}`;  return `${this.detail.contract.symbol} - ${this.detail.longName}${pos}`; }
	get quantityDescription(){ return `Quantity${this.position==null ? "" : " "+this.position}`; }
	detail:Results.IContractDetail;

	get ask(){return this.tick.ask || 0;}
	get askSize(){return this.tick.askSize || 0;}
	get bid(){return this.tick && this.tick.bid || 0;}
	get bidSize(){return this.tick.bidSize || 0;}

	get isBuy(){return this._isBuy!="Sell";} set isBuy(value){this._isBuy=value ? "Buy" : "Sell";} _isBuy:string;
	isLiquid:boolean;
	outsideRth:boolean=false;
	quantity2:number;
	limit:number;
	get selectedAccount()
	{
		let account = this.settingsContainer.value.selectedAccount;
		if( !account && this.allAccounts.size==1 )
			account = this.allAccounts.keys().next().value;
		if( account && this.position===undefined )
			this.reqPosition();
		return account;
	} set selectedAccount(v)
	{
		if( this.selectedAccount!=v )
		{
			this.position = undefined;
			this.settingsContainer.value.selectedAccount=v;
			this.settingsContainer.save();
		}
		if( this.position===undefined )
			this.reqPosition();
	}
	get settingsContainer(){ return this.data.settingsContainer;}
	showStop:boolean;
	get stop(){ return this.showStop ? this.#stop : 0; } set stop(value){ this.#stop = Math.round(value*100)/100; } #stop:number;
	get stopLimit(){ return this.showStop ? this.#stopLimit : 0; } set stopLimit(value){ this.#stopLimit = Math.round(value*100)/100; } #stopLimit:number;
	position:number;
	tick:TickEx;
	submitting=false;
}

class DialogSettings implements IAssignable<DialogSettings>
{
	assign( value:DialogSettings )
	{
		this.selectedAccount = value.selectedAccount;
	}
	selectedAccount:string;
}