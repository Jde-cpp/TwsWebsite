
import { TickEx, Tick } from 'src/app/services/tws/Tick';
import { TwsService } from 'src/app/services/tws/tws.service';
import{ TickObservable } from 'src/app/services/tws/ITickObserver'
import { MarketUtilities } from 'src/app/utilities/marketUtilities';

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { attr } from 'highcharts';

/*TickEx+option*/
export class Option extends TickEx
{
	constructor( _contract:IB.IContract, public option:Results.IOption ) //, public index:number
	{
		super( _contract );
		this.ask = option.ask;
		this.bid = option.bid;
		this.last = option.last;
		this.volume = option.volume;
	}
	price( type:Results.ETickType, price:number, attributes:Results.ITickAttrib ):void
	{
		if( price!=-1 )
			super.price( type, price, attributes );
	}
	size( type:Results.ETickType, size:number ):void
	{
		if( MarketUtilities.isMarketOpen("SMART", "OPT") )
			super.size( type, size );
	}
/*	subscribe()
	{
		//if( MarketUtilities.isMarketOpen("", "OPT") )
		this.subscription = this.tws.reqMktData( this.contractId, [Requests.ETickList.PlPrice], false );
		this.subscription.subscribe2(
		{
			generic:( type:Results.ETickType, value:number )=>{ this.holding.onGenericTick( type, value ); },
			price:( type:Results.ETickType, price:number, attributes:Results.ITickAttrib )=>{ this.holding.onPriceTick( type, price, attributes ); },
			size:( type:Results.ETickType, size:number )=>{ this.holding.onSizeTick(type, size); },
			string:( type:Results.ETickType, value:string )=>{ this.holding.onStringTick(type, value); },
			complete: ()=>{ console.log("reqMktData::complete") }
		});
	}
	unsubscribe()
	{
		if( this.subscription )
			this.tws.cancelMktData( new Map<number,TickObservable>([[0,this.subscription]]) );
	}*/
	// askSize:number;
	// ask:number;
	// bid:number;
	// bidSize:number;
//	last:number;
	//volume:number;
	//subscription:TickObservable;
	//get change():number{ return (this.oi==0 ? 0 : this.value/this.oi)*this.oiChange; }
	//get contractId():number{ return this.option.id; }
	//get exposure():number{ return (this.isCall ? this.underlyingPrice*2-this.strike : this.strike)*this.oi; }
	get oi():number{ return this.option.openInterest;}
	get oiChange():number{ return this.option.oiChange; }
	//get underlyingPrice():number{ return this.underlying.last;}
	get strike():number{ return this.option.strike; }
	get value():number{ return (!this.last || this.last<this.bid || this.last>this.ask ? (this.ask+this.bid)/2 : this.last)*this.oi; }
	get previousValue():number{ return (this.oi-this.oiChange)*this.option.previousPrice; }
	get description():string{ return `${MarketUtilities.optionDisplayFromDays(this.expiration)} ${this.strike} ${this.isCall ? "Call" : "Put"}` }
	//${this.underlying.contract.symbol}
}
