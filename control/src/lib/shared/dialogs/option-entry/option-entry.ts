import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TickObservable } from '../../../services/ITickObserver';
import { TickEx } from '../../../services/Tick';

import { TwsService } from '../../../services/tws.service';
import {ConfirmationDialog} from '../transact/confirmation'
import { MarketUtilities } from '../../../utilities/marketUtilities';
import { BlocklyService } from '../../../services/blockly.service';

import * as IbResults from 'jde-cpp/results';  import Results = IbResults.Jde.Markets.Proto.Results;
import * as ib2 from 'jde-cpp/ib';  import IB = ib2.Jde.Markets.Proto;
import * as IbRequests from 'jde-cpp/requests'; import Requests = IbRequests.Jde.Markets.Proto.Requests;
import * as myBlockly2 from 'jde-cpp/blockly'; import Blockly = myBlockly2.Jde.Blockly.Proto;

export class OptionEntryData
{
	isBuy:boolean;
	option:TickEx;
	expirations: number[];
	underlying:Results.IContractDetail;
}
@Component( { templateUrl: 'option-entry.html', styleUrls:["option-entry.css"]} )
export class OptionEntryDialog implements OnDestroy, OnInit
{
	constructor( public dialogRef:MatDialogRef<OptionEntryDialog>, @Inject(MAT_DIALOG_DATA) public data:OptionEntryData, private tws : TwsService, private dialog : MatDialog, private blockly: BlocklyService )
	{
		this.option = data.option;
		this.isBuy = data.isBuy;
		for( let expiration of data.expirations )
			this.expirations.set( expiration, MarketUtilities.optionDayDisplay(expiration) );
		this.limit = data.isBuy ? this.bid : this.ask;
		this.underlying = data.underlying;
		this.setStrikes( this.expiration, this.option.strike, this.option.isCall );
	}
	async ngOnInit()
	{
		try
		{
			this.blocks = await this.blockly.loadEnabled();
		}
		catch( e )
		{
			console.error( e );
		}
	}
	ngOnDestroy()
	{
		this.subscription = null;
	}

	async setStrikes( expiration:number, strike:number, isCall:boolean )
	{
		this.strikes.clear();
		if( this.option && (this.option.strike!=strike || this.option.expiration!=expiration) )
			this.option = null;
		if( this.option )
			this.strikes.set( this.strike, [this.option.isCall ? this.option.contractId : null, !this.option.isCall ? this.option.contractId : null ] );
		let contract:IB.IContract = { exchange: IB.Exchanges.Smart, securityType: IB.SecurityType.Option, right: isCall ? IB.SecurityRight.Call : IB.SecurityRight.Put, expiration: expiration, symbol: this.underlying.contract.symbol };
		try
		{
			let details = await this.tws.reqContract( contract );
			let tempStrikes = new Map<number,[number,number]>();
			for( let detail of details )
			{
				let callPut:[number,number] = tempStrikes.has(detail.contract.strike) ? tempStrikes.get( detail.contract.strike ) : [0,0];
				if( detail.contract.right==IB.SecurityRight.Call )
					callPut = [detail.contract.id, callPut[1]];
				else if( detail.contract.right==IB.SecurityRight.Put )
					callPut = [callPut[0], detail.contract.id];
				tempStrikes.set( detail.contract.strike, callPut );
			}
			this.strikes = tempStrikes;
			if( this.option )
				return;
			if( !this.strikes.has(strike) )
			{
				for( let strike2 of this.strikes.keys() )
				{
					strike = strike2;
					if( strike2>strike )
						break;
				}
			}
			this.setOption( strike, expiration, isCall );
		}
		catch( e )
		{
			console.log( e["Message"] );
		}
	}
	setOption( strike, expiration, isCall )
	{
		let contract = new IB.Contract( {id:this.strikes.get(strike)[isCall ? 0 : 1], strike: strike, expiration: expiration, right: isCall ? IB.SecurityRight.Call : IB.SecurityRight.Put} );
		this.option = new TickEx( contract, null );
	}
	autoValues( quantity:number )
	{
		let values = [];
		for( let i=Math.max(1, quantity-5); values.length<10; ++i )
			values.push( i );
		return values;
	}
	autoAmount( value:number )
	{
		let values = [];
		const start = Math.max(0, value-.05);
		for( let i=0; i<10; ++i )
			values.push( (start+.01*(i+1)).toFixed(2) );
		return values;
	}
	onCancelClick(): void
	{
	  this.dialogRef.close( null );
	}
	onExpirationChange( i:number )
	{
		this.setStrikes( i, this.strike, this.isCall );
		this.updateTicker( i, this.strike );
	}
	onStrikeChange( strike:number )
	{
		this.updateTicker( this.expiration, strike );
	}
	onSubmitClick():void
	{
		const subscription = this.tws.placeOrder( this.data.option.contract, {isBuy:this.isBuy, quantity: this.quantity, limit: this.limit, transmit: true, whatIf: true}, this.stop, this.stopLimit );
		let initial:Results.IOpenOrder;let shown = false;
		subscription.subscribe2(
		{
			status: ( value:Results.IOrderStatus )=>{ debugger; console.log( `status='${value}'` ); },
			state: (x:Results.IOrderState )=>{ debugger; console.log( `status='${x}'` ); },
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
						data: { order:value, stop: this.stop, stopLimit: this.stopLimit, block:this.blockExecutingId ? this.blocks.find( (x)=>x.id==this.blockExecutingId ) : null }
					});
				}
			},
			complete: ()=>{ debugger; console.log( `status=complete` ); },
			error: (e)=>{ debugger; this.dialogRef.close( e ); console.error( `error=${e.message}` ); }
		});

	}
	updateTicker( expiration:number, strike:number )
	{
		const strikeValues = this.strikes.get( this.strike );
		this.subscription = this.tws.reqMktData( strikeValues[this.isCall ? 0 : 1], [Requests.ETickList.PlPrice], false );
		this.subscription.subscribe2( this.option );
	}
	get ask(){return this.option.ask || 0;}
	get askSize(){return this.option.askSize || 0;}
	get backgroundColor():string
	{
		const red = this.isBuy ? 0 : 255;
		const green = this.isBuy ? 255 : 0;
		const prefix = `rgba(${red},${green},0,`;
		return `linear-gradient(to right, ${prefix}255),${prefix}0))`;
	}
	get bid(){return this.option && this.option.bid || 0;}
	get bidSize(){return this.option.bidSize || 0;}
	get description(){ return this.option.display; }
	expirations = new Map<number,string>();
	get expiration(){ return this.option && this.option.expiration || 0; }
	get isBuy(){return this._isBuy!="Sell";} set isBuy(value){ if( this.isBuy!=value ){ this.limit = value ? this.bid : this.ask; this._isBuy=value ? "Buy" : "Sell";} } _isBuy:string;
	get isCall(){ return this.option.isCall; } set isCall(x){ this.setOption( this.strike, this.expiration, x ); }
	limit:number;
	get optionTypeName(){ return this.isCall ? "Call" : "Put"; }
	quantity:number=1;
	get strike(){ return this.option.strike;}
	strikes = new Map<number,[number,number]>();
	stop:number;
	stopLimit:number;
	underlying:Results.IContractDetail;
	get underlyingSymbol(){return this.underlying.contract.symbol;}
	get option():TickEx{ return this._option}; set option(value){ if(!value) this.subscription=null; this._option = value; } _option:TickEx;
	get subscription(){return this._subscription;} set subscription(value){ if( this.subscription ) this.tws.cancelMktDataSingle( this.subscription ); this._subscription=value;} _subscription:TickObservable;
	submitting=false;
	blockExecutingId:string;
	blocks:Blockly.IFunction[];
}