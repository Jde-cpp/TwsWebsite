import {ITickObserver} from './ITickObserver'

import * as ib2 from '../../proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbResults from '../../proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { BidiModule } from '@angular/cdk/bidi';

/*
export interface ITicker
{
	onGenericTick( type:Results.ETickType, value:number ):void;
	onPriceTick( type:Results.ETickType, price:number, attributes:Results.ITickAttrib ):void;
	onSizeTick( type:Results.ETickType, size:number ):void;
	onStringTick( type:Results.ETickType, value:string ):void;
	onEndTick():void;
}
*/
/*just ITickObserver*/
export class Tick implements ITickObserver
{
	generic( type:Results.ETickType, value:number ):void
	{
		if( type==49 )
			this.halted = value!=0;
		else
			console.log( `onGenericTick( '${Results.ETickType[type]}', '${value}')` );
	}
	price( type:Results.ETickType, price:number, attributes:Results.ITickAttrib ):void
	{
		if( type==Results.ETickType.ClosePrice )
			this.close = price;
		else if( type==Results.ETickType.BidPrice )
			this.bid = price;
		else if( type==Results.ETickType.AskPrice )
			this.ask = price;
		else if( type==Results.ETickType.LastPrice )
			this.last = price;
		else if( type==Results.ETickType.High )
			this.high = price;
		else if( type==Results.ETickType.Low )
			this.low = price;
		else if( type==Results.ETickType.OpenTick )
			this.open = price;
		else if( type!=Results.ETickType.MARK_PRICE || (type<Results.ETickType.Low13Week && type>Results.ETickType.High52Week) )
			console.log( `onPriceTick( '${type.toString()}', '${price}') - not handled` );
	}
	size( type:Results.ETickType, size:number ):void
	{
		if( type==Results.ETickType.SHORTABLE_SHARES )
			this.shortableAvailable = size;
		else if( type==Results.ETickType.BidSize )
			this.bidSize = size;
		else if( type==Results.ETickType.AskSize )
			this.askSize = size;
		else if( type==Results.ETickType.LastSize )
			this.lastSize = size;
		else if( type==Results.ETickType.Volume )
			this.volume = size;
		else if( type==Results.ETickType.AverageVolume )
			this.volumeAverage = size;
		else
			console.log( `onSizeTick( '${type.toString()}', '${size}')` );
	}
	string( type:Results.ETickType, value:string ):void
	{
		if( type==45 )
			this.lastTime = new Date( parseInt(value)*1000 );
		else if( type!=32 && type!=33 && type!=84 && type!=48 )//bid/ask/last exchange/RT_VOLUME
			console.log( `onStringTick( '${Results.ETickType[type]}', '${value}')` );
	}
	onEndTick():void
	{
		//console.log( `onEndTick( '${reqId}' )` );
	}
	complete():void
	{
		this.completed = true;
	}
	get ask(){return this._ask;} set ask(value)
	{
		if( TickEx.isMarketOpen || value>0 )
		{
			this._ask = value>0 ? value : null;
			if( this._ask && this._ask<this.low )
				this.low = this._ask;
		}
	} _ask:number|null;
	get askSize(){return this._askSize;} set askSize(value){this._askSize = value>0 ? value : null;} _askSize:number|null;
	get bid(){return this._bid;} set bid(value)
	{
		if( TickEx.isMarketOpen || value>0 )
		{
			this._bid = value>0 ? value : null;
			if( this._bid && this._bid>this.high )
				this.high = this._bid;
		}
	} _bid:number|null; bidSize:number;
	completed:boolean=false;
	close:number;
	get currentPrice():number{ return this.last>=this.bid && this.last<=this.ask ? this.last : (this.ask+this.bid)/2; }
	halted:boolean;
	high:number;
	lastTime: Date;
	low:number;
	open:number;
	last:number; lastSize:number;
	shortableAvailable:number;
	get volume(){return this._volume;} set volume(value)
	{
		if( TickEx.isMarketOpen || value>0 )
			this._volume = value>0 ? value : null;
	} _volume:number|null;
	volumeAverage:number;
	static isMarketOpen:boolean=true;
}
/*Tick + Contract Info*/
export class TickEx extends Tick
{
	constructor( private _contract:IB.IContract )
	{
		super();
		if( !_contract.multiplier )
			_contract.multiplier = 1;
	}

	get contract():IB.IContract{ return this._contract; }
	//get marketValue():number{return this.last*this.position;}
	get contractId(){ return this.contract.id; }
	get currentPrice():number{ return this.isOption ? super.currentPrice : this.last>=this.bid && this.last<=this.ask ? this.last : this.last<this.bid ? this.bid : this.ask; }
	get display():string{var contract = this.contract; return this.isOption ? `${contract.symbol} ${MarketUtilities.optionDisplayFromDays(contract.expiration)} ${contract.strike} ${contract.right}` : contract.symbol; }
	get expiration():number{ return this.contract.expiration; }
	get isCall(){ return this.contract.right=="C" || this.contract.right=="CALL" }
	get isOption(){ return this.contract.securityType=="OPT"; }
	get oi():number{ return this.option ? this.option.openInterest : 0;}
	get oiChange():number{ return this.option ? this.option.openInterest : 0; }
	option:Results.IOption;
	get strike():number{ return this.option.strike; }
	get change():number
	{
		//if( this.contract.symbol=="AAPL" )
		//	this._contract.multiplier = 1.0;
		return this.close>0 ? this.last-this.close : 0;
	}
}
