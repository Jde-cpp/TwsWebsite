import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from './transact';
import { TickEx } from 'src/app/services/tws/Tick';
import { TwsService } from 'src/app/services/tws/tws.service';
import {Order,OrderSubject,OrderObservable} from 'src/app/services/tws/IOrderObserver'

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;

export class ConfirmationData
{
	transactData:Data;
	subscription:OrderObservable;
	order:Results.IOpenOrder
	stop:number|null;
	stopLimit:number|null;
}
@Component( {templateUrl: 'confirmation.html', styleUrls:["transact.css"]} )
export class ConfirmationDialog
{
	constructor( public dialogRef:MatDialogRef<ConfirmationDialog>, @Inject(MAT_DIALOG_DATA) public data:ConfirmationData, private tws : TwsService )
	{
		console.log( 'ConfirmationDialog' );
		this.tws.reqContractDetails(this.contract).subscribe( {next:details=>{this.details = details;}} );
		let subscription = this.tws.reqPositions( this.order.account );
		subscription.subscribe(
		{
			next:  value=>
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
	onCancelClick(): void
	{
	  this.dialogRef.close( null );
	  //console.log( JSON.stringify(this.order) );
	  //console.log( JSON.stringify(this.state) );
	}
	onSubmitClick()
	{
		this.order.whatIf = false;
		this.order.id = 0;
		const subscription = this.tws.placeOrder( this.contract, this.order, this.data.stop, this.data.stopLimit );
		this.dialogRef.close( null );
	}
	get backgroundColor():string
	{
		const red = this.isBuy ? 0 : 255;
		const green = this.isBuy ? 255 : 0;
		const prefix = `rgba(${red},${green},0,`;
		return `linear-gradient(to right, ${prefix}255),${prefix}0))`;
	}
	get contract(){ return this.status.contract;}
	get description(){ return /*this.option ? this.option.description :*/ `${this.contract.symbol} - ${this.details ? this.details.longName : ''}`; }
	details:Results.IContractDetails;
	get isBuy(){return this.order.isBuy;}
	get order(){ return this.status.order; }
	get orderQuantity(){ return this.order.quantity*(this.isBuy ? 1 : -1); }
	get orderType(){ return IB.EOrderType[this.order.type]; }
	//get orderDescription(){ return }
	get state(){ return this.status.state; }
	get status(){ return this.data.order; }
	position:number|null=null;
	get tick(){ return this.transactData.tick;}
	get timeInForce(){ return this.order.timeInForce==IB.ETimeInForce.DayTif ? "Day" : IB.ETimeInForce[this.order.timeInForce]; }
	get transactData(){ return this.data.transactData;}
}