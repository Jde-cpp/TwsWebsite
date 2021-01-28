import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TickDetails } from 'jde-tws';
import { TwsService } from 'jde-tws';
import { Holding } from 'src/app/pages/tws/portfolio/holding';

import * as ib2 from 'jde-cpp/ib';
import IB = ib2.Jde.Markets.Proto;

//import * as IbResults from 'jde-cpp/results';
//import Results = IbResults.Jde.Markets.Proto.Results;

export class Data
{
	holding: Holding;
	underlyingTick:TickDetails;
}
@Component( { templateUrl: 'roll-dialog.html', styleUrls:["roll-dialog.css"]} )
export class RollDialog
{
	constructor( public dialogRef:MatDialogRef<RollDialog>, @Inject(MAT_DIALOG_DATA) public data:Data, private tws : TwsService )
	{
		this.viewPromise = Promise.resolve( true );
/*		const underlyingSet = ()=>
		{
		};
		if( this.contract.underlyingId )
			underlyingSet();
		else
		{
			this.tws.reqContractSingle( {id: this.contract.id} ).then( (details)=>
			{
				this.contract.underlyingId = details.underConId;
				underlyingSet();
			} );
		}
*/
		//this.tws.reqContractSingle( {id: this.contract.underlyingId} ).then( (underlying)=>{this.underlying = underlying;} );
/*		let contract = {id: this.contract.id, securityType: IB.SecurityType.Option, strike:this.strike };
		twsService.reqContract( contract ).subscribe(
		{
			next: value=>
			{
				this.subsequent.push( value );
			},
			complete: ()=>{},
			error: e=>{console.log(e.Message);}
		});*/
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
	//get underlying(){ return this._underlying; } _underlying:Results.IContractDetails;
	get underlyingContract(){ return {id:this.contract.underlyingId}; }
	viewPromise:Promise<boolean>;
	submitting=false;
	//get subsequent():Results.IContractDetails[] = [];
/*	quantity:number;
	limit:number;
	stop:number;
	stopLimit:number;

	*/
}