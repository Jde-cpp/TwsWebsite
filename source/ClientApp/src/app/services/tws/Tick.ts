import {ITickObserver} from './ITickObserver'

import * as ib2 from '../../proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbResults from '../../proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { MarketUtilities } from 'src/app/utilities/marketUtilities';

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
		else if( type!=Results.ETickType.MARK_PRICE)
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
		else
			console.log( `onSizeTick( '${type.toString()}', '${size}')` );
	}
	string( type:Results.ETickType, value:string ):void
	{
		if( type==45 )
			this.lastTime = new Date( parseInt(value)*1000 );
		else if( type!=32 && type!=33 && type!=84 )//bid/ask/last exchange
			console.log( `onStringTick( '${type.toString()}', '${value}')` );
	}
	onEndTick():void
	{
		//console.log( `onEndTick( '${reqId}' )` );
	}
	complete():void
	{
		this.completed = true;
	}
	ask:number; askSize:number;
	bid:number; bidSize:number;
	completed:boolean=false;
	close:number;
	get currentPrice(){ return this.last>=this.bid && this.last<=this.ask ? this.last : (this.ask+this.bid)/2; }
	halted:boolean;
	high:number;
	lastTime: Date;
	low:number;
	open:number;
	last:number; lastSize:number;
	shortableAvailable:number;
	volume:number;
}
/*Tick + Contract Info*/
export class TickEx extends Tick
{
	constructor( private _contract:IB.IContract )
	{
		super();
	}

	get contract():IB.IContract{ return this._contract; }
	//get marketValue():number{return this.last*this.position;}
	get contractId(){ return this.contract.id; }
	get display():string{var contract = this.contract; return this.isOption ? `${contract.symbol} ${MarketUtilities.optionDisplayFromDays(contract.expiration)} ${contract.strike} ${contract.right}` : contract.symbol; }
	get expiration():number{ return this.contract.expiration; }
	get isCall(){ return this.contract.right=="C" || this.contract.right=="CALL" }
	get isOption(){ return this.contract.securityType=="OPT"; }
	get oi():number{ return this.option ? this.option.openInterest : 0;}
	get oiChange():number{ return this.option ? this.option.openInterest : 0; }
	option:Results.IOption;
	get strike():number{ return this.option.strike; }
	get change():number{return this.close>0 ? this.last-this.close : 0;}
}
