import { CommonModule } from '@angular/common';
import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TwsService } from '../../../services/tws.service';
import { TickEx } from '../../../services/Tick';

import * as ib2 from 'jde-cpp/ib'; import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import * as myBlockly2 from 'jde-cpp/blockly'; import Blockly = myBlockly2.Jde.Blockly.Proto;

export class ConfirmationData
{
	order:Results.IOpenOrder
	stop:number|null;
	stopLimit:number|null;
	block:Blockly.IFunction|null;
}
@Component( {templateUrl: 'confirmation.html', styleUrls:["transact.css"]} )
export class ConfirmationDialog
{
	constructor( public dialogRef:MatDialogRef<ConfirmationDialog>, @Inject(MAT_DIALOG_DATA) public data:ConfirmationData, private tws : TwsService )
	{
		//console.log( JSON.stringify(data) );
		//this.error = { requestId:12, code:451, message:"The following order \"ID:6978\" value estimate of 106,260.00 USD exceeds the Total Value Limit of 100,000 USD. Restriction is specified in Precautionary Settings of Global Configuration/Presets."};
		this.tws.reqContractSingle( this.contract ).then( (x)=>this.detail = x ).catch( (e)=>console.log(e.Message) );
		let s = this.tws.reqPositions( this.order.account );
		s.subscribe({ next:value=>
		{
			if( !value || value.contract.id==this.contract.id )
			{
				this.position = value ? value.position : 0;
				this.tws.cancelPositions( s );
				s = null;
			}
		} });
	}
	ExchangeName( id:IB.Exchanges )
	{
		return IB.Exchanges[id];
	}

	CurrencyName( id:IB.Currencies )
	{
		return IB.Currencies[id];
	}
	onCancelClick():void{ this.dialogRef.close( null ); }
	onSubmitClick()
	{
		this.order.whatIf = false;
		this.order.id = 0;
		const subscription = this.tws.placeOrder( this.contract, this.order, this.data.stop, this.data.stopLimit, this.data.block?.id );//TODO something with subscription.
		subscription.subscribe2(
		{
			error: e=>this.error=e,
			status: x=>this.dialogRef.close( null ),
			open: x=>this.dialogRef.close( null ),
			state: x=>this.dialogRef.close( null ),
			complete: ()=>this.dialogRef.close( null )
/*			status: x:Results.IOrderStatus=>this.dialogRef.close(null),
			open: x:Results.IOpenOrder=>this.dialogRef.close(null),
			state:x:Results.IOrderState=>this.dialogRef.close(null),
			error: err: any=>this.dialogRef.close( null )*/
		} );
	}
	get amount():number{ return this.order.quantity*this.order.limit*Math.max(this.contract.multiplier,1); }
	get backgroundColor():string
	{
		const red = this.isBuy ? 0 : 255;
		const green = this.isBuy ? 255 : 0;
		const prefix = `rgba(${red},${green},0,`;
		return `linear-gradient(to right, ${prefix}255),${prefix}0))`;
	}
	get contract(){ return this.status.contract; }
	get description()
	{
		const suffix = this.contract.securityType==IB.SecurityType.Option ? TickEx.descriptionOption( this.contract.symbol, this.contract.expiration, this.contract.strike, this.contract.right==IB.SecurityRight.Call) : this.detail ? this.detail.longName : '';
		return `${this.contract.symbol} - ${suffix}`;
	}
	detail:Results.IContractDetail;
	get isBuy(){return this.order.isBuy;}
	get order(){ return this.status.order; }
	get orderQuantity(){ return this.order.quantity*(this.isBuy ? 1 : -1); }
	get orderType(){ return IB.EOrderType[this.order.type]; }
	get state(){ return this.status.state; }
	get status(){ return this.data.order; }
	position:number|null=null;
	get timeInForce(){ return this.order.timeInForce==IB.ETimeInForce.DayTif ? "Day" : IB.ETimeInForce[this.order.timeInForce]; }
	get errorMessage(){ return `(${this.error.code}) - ${this.error.message}`; }
	submitting:boolean;
	error:Results.IError;
}