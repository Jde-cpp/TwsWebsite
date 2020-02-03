import * as ib2 from '../../proto/ib';

import IB = ib2.Jde.Markets.Proto;
import * as IbResults from '../../proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;

export interface ITicker
{
	onGenericTick( type:Results.ETickType, value:number ):void;
	onPriceTick( type:Results.ETickType, price:number, attributes:Results.ITickAttrib ):void;
	onSizeTick( type:Results.ETickType, size:number ):void;
	onStringTick( type:Results.ETickType, value:string ):void;
	onEndTick():void;
}

export class Tick implements ITicker
{
	constructor()
	{
		//this.reqId = reqId;
	}
	onGenericTick( type:Results.ETickType, value:number ):void
	{
		if( type==49 )
			this.halted = value!=0;
		else
			console.log( `onGenericTick( '${Results.ETickType[type]}', '${value}')` );
	}
	onPriceTick( type:Results.ETickType, price:number, attributes:Results.ITickAttrib ):void
	{
		if( type==Results.ETickType.ClosePrice )
			this.close = price;
		else if( type==Results.ETickType.BidPrice )
			this.bid = price;
		else if( type==Results.ETickType.AskPrice )
			this.ask = price;
		else if( type==Results.ETickType.LastPrice )
			this.price = price;
		else if( type==Results.ETickType.High )
			this.high = price;
		else if( type==Results.ETickType.Low )
			this.low = price;
		else if( type==Results.ETickType.OpenTick )
			this.open = price;
		else if( type!=Results.ETickType.MARK_PRICE)
			console.log( `onPriceTick( '${type.toString()}', '${price}') - not handled` );
	}
	onSizeTick( type:Results.ETickType, size:number ):void
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
	onStringTick( type:Results.ETickType, value:string ):void
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

	ask:number; askSize:number;
	bid:number; bidSize:number;
	halted:boolean;
	high:number;
	low:number;
	contract:IB.IContract;
	get marketValue():number{return this.price*this.position;}
	open:number;
	position:number;
	price:number; lastSize:number;
	averageCost:number;
	realizedPN: number;
	accountNumber:string;
	close:number;
	shortableAvailable:number;
	volume:number;
	lastTime: Date;
	get change():number{return this.close>0 ? this.price-this.close : 0;}
}
