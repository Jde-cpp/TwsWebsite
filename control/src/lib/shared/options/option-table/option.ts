import * as ib2 from 'jde-cpp/ib'; import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;

import { TickEx } from '../../../services/Tick'
import { MarketUtilities } from 	'../../../utilities/marketUtilities';

/*TickEx+option*/
export class OptionStrike
{
	constructor( public call:Option, public put:Option ){}
	get strike():number{ return this.call ? this.call.strike : this.put?.strike; }
	get expiration():number{ return this.call ? this.call.expiration : this.put?.expiration; }
}
export class Option extends TickEx
{
	constructor( _contract:IB.IContract, public override option:Results.IOption, bid?, ask?, last?, volume? ) //, public index:number
	{
		super( _contract, null );
		this.ask = ask;
		this.bid = bid;
		this.last = last;
		this.volume = volume;
	}

	override price( type:Results.ETickType, price:number, attributes:Results.ITickAttrib ):void
	{
		if( price!=-1 )
			super.price( type, price, attributes );
	}
	override size( type:Results.ETickType, size:number ):void
	{
		if( MarketUtilities.isMarketOpen2(IB.Exchanges.Smart, IB.SecurityType.Option) )
			super.size( type, size );
	}
	override get oi():number{ return this.option.openInterest;}
	override get oiChange():number{ return this.option.oiChange; }
	get value():number{ return (!this.last || this.last<this.bid || this.last>this.ask ? (this.ask+this.bid)/2 : this.last)*this.oi; }
	get previousValue():number{ return (this.oi-this.oiChange)*this.option.previousPrice; }
	//get description(){ return Option.getDescription(this.expiration, this.strike, this.isCall); }
}
