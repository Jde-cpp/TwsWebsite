import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tick } from '../../../../services/tws/Tick';
import { TwsService } from '../../../../services/tws/tws.service';
import * as IbResults from '../../../../proto/results';
import { Holding } from 'src/app/pages/tws/portfolio/holding';

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

export class Data
{
	holding: Holding;
}
@Component( { templateUrl: 'roll-dialog.html', styleUrls:["roll-dialog.css"]} )
export class RollDialog
{
	constructor( public dialogRef:MatDialogRef<RollDialog>, @Inject(MAT_DIALOG_DATA) public data:Data, private twsService : TwsService )
	{
/*		this.quantity = 100;
		this._submitting = false;
		this.limit = data.isBuy ? data.tick.bid : data.tick.ask;
		if( this.limit==-1 )
			this.limit = data.tick.price;
		const delta = Math.round( (this.limit *.01)*100 )/100 * (data.isBuy ? -1 : 1);
		this.stop = this.limit+delta;
		this.stopLimit = this.stop+delta;*/
	}

	onCancelClick(): void
	{
	  this.dialogRef.close( null );
	}

	onSubmitClick():void
	{
		//this.twsService.placeOrder( this.data.details.Contract, {isBuy:this.isBuy, quantity: this.quantity, limit: this.limit, transmit: true}, this.stop, this.stopLimit );
	}

	get contract(){ return this.holding.contract; }
	get holding(){ return this.data.holding; }
	get isBuy(){return true;}
	get isCall(){ return this.contract.right==IB.SecurityRight.Call; }
	get startExpiration(){ return this.contract.expiration+1; }
	get strike(){ return this.contract.strike; }
/*	quantity:number;
	limit:number;
	stop:number;
	stopLimit:number;

	private _submitting=false;*/
}