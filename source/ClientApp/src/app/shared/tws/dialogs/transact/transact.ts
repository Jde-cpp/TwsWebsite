import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TickEx } from 'src/app/services/tws/Tick';
import { TwsService } from 'src/app/services/tws/tws.service';
//import { Option } from 'src/app/shared/options/option-table/option'
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

export class Data
{
	details:Results.IContractDetails;
	tick:TickEx;
	isBuy:boolean;
	quantity: number;
	showStop: boolean;
}
@Component( {templateUrl: 'transact.html', styleUrls:["transact.css"]} )
export class TransactDialog
{
	constructor( public dialogRef:MatDialogRef<TransactDialog>, @Inject(MAT_DIALOG_DATA) public data:Data, private twsService : TwsService )
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
			if( this.limit==-1 )
				this.limit = data.tick.last;
			const delta = Math.round( (this.limit *.01)*100 )/100 * (data.isBuy ? -1 : 1);
			this.stop = this.limit+delta;
			this.stopLimit = this.stop+delta;
		}
	}

	onCancelClick(): void
	{
	  this.dialogRef.close( null );
	}

	onSubmitClick():void
	{
		this.twsService.placeOrder( this.data.tick.contract, {isBuy:this.isBuy, quantity: this.quantity, limit: this.limit, transmit: false}, this.stop, this.stopLimit ).subscribe2(
		{
			status: ( value:Results.IOrderStatus )=>{ console.log( `status='${value}'` ); },
			open: ( value:Results.IOpenOrder )=>{ console.log( `open='${value}'` ); },
			complete: ()=>{ console.log( `status=complete` ); },
			error: (e)=>{ console.error( `error=${e.message}` ); }
		});
	}
	get backgroundColor():string
	{
		const red = this.isBuy ? 0 : 255;
		const green = this.isBuy ? 255 : 0;
		const prefix = `rgba(${red},${green},0,`;
		return `linear-gradient(to right, ${prefix}255),${prefix}0))`;
	}
	get description(){ return /*this.option ? this.option.description :*/ `${this.details.contract.symbol} - ${this.details.longName}`; }
	details:Results.IContractDetails;
	isBuy2:number=1;
	get isBuy(){return this._isBuy!="Sell";} set isBuy(value){this._isBuy=value ? "Buy" : "Sell";} _isBuy:string;
	quantity:number;
	limit:number;
	showStop:boolean;
	stop:number;
	stopLimit:number;
	tick:TickEx;
	////option fields
	//option:Option;

	private _submitting=false;
}