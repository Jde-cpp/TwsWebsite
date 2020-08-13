import {Component, Inject, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TickEx } from '../../../../services/tws/Tick';
import{ TickObservable } from 'src/app/services/tws/ITickObserver'
import { TwsService } from '../../../../services/tws/tws.service';
import { Option } from 'src/app/shared/tws/options/option-table/option'
import * as IbResults from '../../../../proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import * as IbRequests from '../../../../proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;

export class Data
{
	isBuy:boolean;
	option:TickEx;
	expirations: number[];
	//underlying: TickEx;
	underlying:Results.IContractDetails;
	//strikes:number[];
}
@Component( { templateUrl: 'option-entry.html', styleUrls:["option-entry.css"]} )
export class OptionEntryDialog implements OnDestroy
{
	constructor( public dialogRef:MatDialogRef<OptionEntryDialog>, @Inject(MAT_DIALOG_DATA) public data:Data, private tws : TwsService )
	{
		this.option = data.option;
		this.isBuy = data.isBuy;
		for( let expiration of data.expirations )
			this.expirations.set( expiration, MarketUtilities.optionDisplayFromDays(expiration) );
		this.limit = data.isBuy ? this.bid : this.ask;
		this.underlying = data.underlying;
		this.setStrikes( this.expiration, this.option.strike, this.option.isCall );
		//this.bidSize = this.option.bidSize || 0;
		//this.bid = this.option.bid;
		//this.ask = this.option.ask;
		//this.askSize = this.option.askSize || 0;
		//this.tick = this.option.underlying;
		//this.expirationDay = DateUtilities.toDays( this.option.expiration );
		//this.strike = this.option.strike;
		//this.isCall = this.option.isCall;
		// if( this.limit==-1 )
		// 	this.limit = this.tick.last;
		//const delta = Math.round( (this.limit *.01)*100 )/100 * (data.isBuy ? -1 : 1);
		//this.stop = this.limit+delta;
		//this.stopLimit = this.stop+delta;
	}

	ngOnDestroy()
	{
		this.subscription = null;
	}

	setStrikes( expiration:number, strike:number, isCall:boolean )
	{
		this.strikes.clear();
		if( this.option && (this.option.strike!=strike || this.option.expiration!=expiration) )
			this.option = null;
		if( this.option )
			this.strikes.set( this.strike, [this.option.isCall ? this.option.contractId : null, !this.option.isCall ? this.option.contractId : null ] );
		let tempStrikes = new Map<number,[number,number]>();
		let contract:IB.IContract = { exchange: IB.Exchanges.Smart, securityType: IB.SecurityType.Option, right: isCall ? IB.SecurityRight.Call : IB.SecurityRight.Put, expiration: expiration, symbol: this.underlying.contract.symbol };
		this.tws.reqContractDetails( contract ).subscribe(
		{
			next: value=>
			{
				let callPut:[number,number] = tempStrikes.has(value.contract.strike) ? tempStrikes.get( value.contract.strike ) : [0,0];
				if( value.contract.right==IB.SecurityRight.Call )
					callPut = [value.contract.id, callPut[1]];
				else if( value.contract.right==IB.SecurityRight.Put )
					callPut = [callPut[0], value.contract.id];
				tempStrikes.set( value.contract.strike, callPut );
			},
			complete: ()=>
			{
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
				let contract = new IB.Contract( {id:this.strikes.get(strike)[isCall ? 0 : 1], strike: strike, expiration: expiration, right: isCall ? IB.SecurityRight.Call : IB.SecurityRight.Put} );
				this.option = new TickEx( contract, null );

				//option:Results.IOption, public expiration:number, public isCall:boolean
			},
			error: e=>{console.log(e.Message);}
		});
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
	onExpirationChange( expiration:number )
	{
		this.setStrikes( expiration, this.strike, this.isCall );
		this.updateTicker( expiration, this.strike );
	}
	onStrikeChange( strike:number )
	{
		this.updateTicker( this.expiration, strike );
	}
	onSubmitClick():void
	{
		this.tws.placeOrder( this.data.option.contract, {isBuy:this.isBuy, quantity: this.quantity, limit: this.limit, transmit: false}, this.stop, this.stopLimit ).subscribe2(
		{
			status: ( value:Results.IOrderStatus )=>{ console.log( `status='${value}'` ); },
			open: ( value:Results.IOpenOrder )=>{ console.log( `open='${value}'` ); },
			complete: ()=>{ console.log( `status=complete` ); },
			error: (e)=>{ console.error( `error=${e.message}` ); }
		});
	}
	updateTicker( expiration:number, strike:number )
	{
		this.subscription = this.tws.reqMktData( this.strikes[this.strike][this.isCall ? 0 : 1], [Requests.ETickList.PlPrice], false );
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
	get description(){ return `${this.option.display} - ${this.underlying.longName}`; }
	expirations = new Map<number,string>();
	//get expirationDay(){ return this._expirationDay;} set expirationDay(value){ this._expirationDay=value; } private _expirationDay:number;
	get expiration(){ return this.option && this.option.expiration || 0; }
	get isBuy(){return this._isBuy!="Sell";} set isBuy(value){ if( this.isBuy!=value ){ this.limit = value ? this.bid : this.ask; this._isBuy=value ? "Buy" : "Sell";} } _isBuy:string;
	get isCall(){ return this.option.isCall; }
	limit:number;
	get optionTypeName(){ return this.isCall ? "Call" : "Put"; }
	quantity:number=1;
//	get strike(){ return this._strike;} set strike(value){ this._strike=value; } private _strike:number;
	get strike(){ return this.option.strike;}
	strikes = new Map<number,[number,number]>();
	stop:number;
	stopLimit:number;
	underlying:Results.IContractDetails;
	//get underlyingSymbol(){return this.underlying.contract.symbol;}
	get option():TickEx{ return this._option}; set option(value){ if(!value) this.subscription=null; this._option = value; } _option:TickEx;
	get subscription(){return this._subscription;} set subscription(value){ if( this.subscription ) this.tws.cancelMktData( new Map<number,TickObservable>( [[0,this.subscription]]).values() ); this._subscription=value;} _subscription:TickObservable;
	private _submitting=false;
}