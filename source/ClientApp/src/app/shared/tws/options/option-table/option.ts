
import { TickEx, Tick } from 'jde-tws';
import { TwsService } from 'jde-tws';
import{ TickObservable } from 'jde-tws'
import { MarketUtilities } from 'jde-tws';

import * as ib2 from 'dist/jde-tws-assets/src/assets/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbResults from 'dist/jde-tws-assets/src/assets/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { attr } from 'highcharts';

/*TickEx+option*/
export class OptionStrike
{
	constructor( public call:Option, public put:Option ){}
	get strike():number{ return this.call ? this.call.strike : this.put?.strike; }
	get expiration():number{ return this.call ? this.call.expiration : this.put?.expiration; }
}
export class Option extends TickEx
{
	constructor( _contract:IB.IContract, public option:Results.IOption, bid?, ask?, last?, volume? ) //, public index:number
	{
		super( _contract, null );
		this.ask = ask;
		this.bid = bid;
		this.last = last;
		this.volume = volume;
	}

	price( type:Results.ETickType, price:number, attributes:Results.ITickAttrib ):void
	{
		if( price!=-1 )
			super.price( type, price, attributes );
	}
	size( type:Results.ETickType, size:number ):void
	{
		if( MarketUtilities.isMarketOpen2(IB.Exchanges.Smart, IB.SecurityType.Option) )
			super.size( type, size );
	}
	get oi():number{ return this.option.openInterest;}
	get oiChange():number{ return this.option.oiChange; }
	get value():number{ return (!this.last || this.last<this.bid || this.last>this.ask ? (this.ask+this.bid)/2 : this.last)*this.oi; }
	get previousValue():number{ return (this.oi-this.oiChange)*this.option.previousPrice; }
	//get description(){ return Option.getDescription(this.expiration, this.strike, this.isCall); }
}
