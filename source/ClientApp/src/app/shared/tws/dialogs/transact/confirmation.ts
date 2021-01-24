import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TwsService } from 'jde-tws';
import { TickEx } from 'jde-tws';
//import * as ib2 from 'dist/jde-tws-assets/src/assets/proto/ib'; import IB = ib2.Jde.Markets.Proto;
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
		this.tws.reqContractSingle( this.contract ).then( (x)=>this.detail = x ).catch( (e)=>console.log(e.Message) );
		let subscription = this.tws.reqPositions( this.order.account );
		subscription.subscribe(
		{
			next:value=>
			{
				if( !value || value.contract.id==this.contract.id )
				{
					this.position = value ? value.position : 0;
					this.tws.cancelPositions( subscription );
					subscription = null;
				}
			}
		});
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
		this.dialogRef.close( null );
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
	submitting:boolean;
}