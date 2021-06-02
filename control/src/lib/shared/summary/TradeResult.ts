/*
import {IData} from 'src/app/shared/tws/summary/summary'
import * as dts from 'src/app/proto/dts';
import Dts = dts.Jde.Markets.Proto;

import * as IbResults from 'dist/jde-tws-assets/src/assets/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import * as Ib from 'dist/jde-tws-assets/src/assets/proto/ib';
import IB = Ib.Jde.Markets.Proto;

import { Jde } from 'src/app/proto/FromServer';

abstract class Result
{
	constructor( public contract:IB.IContract )
	{}
	get absShares():number{ return Math.abs(this.shares); }
	abstract get cost():number;
	get gain():number{ return this.proceeds-this.cost; }
	get isLong():boolean{ return this.shares>0; }
	abstract get proceeds():number;
	get return_():number{ return this.proceeds/this.cost; }
	abstract get shares():number;
	get symbol():string{return this.contract.symbol;}
}
export class TradeResult extends Result
{
	constructor( contract:IB.IContract, public open:Dts.ITransaction, public close:Dts.ITransaction )
	{
		super( contract )
	}
	get openTime():Date{ return new Date( this.open.time*1000 ); }
	get closeTime():Date{  return new Date( this.close.time*1000 ); }
	get openPrice():number{ return this.open.ask; }
	get closePrice():number{ return this.close.ask; }
	get shares():number{ return this.open.shareCount; }
	get openLongPrediction():number{ return this.open.longReturnPrediction; }
	get openShortPrediction():number{ return this.open.shortReturnPrediction; }
	get closeLongPrediction():number{ return this.close.longReturnPrediction; }
	get closeShortPrediction():number{ return this.close.shortReturnPrediction; }
	get purchasePrice(){ return this.isLong ? this.openPrice : this.closePrice; }
	get salesPrice(){ return this.isLong ? this.closePrice : this.openPrice; }
	get proceeds(){ return this.salesPrice*this.absShares-this.commissions; }
	get cost():number{ return this.purchasePrice*this.absShares+this.commissions; }

	get commissions():number{ return Math.max( Math.abs(this.absShares)/100.0, 2.00)/2.00; }
}

class SideResult
{
	count:number=0;
	get return():number{ return this.gain/this.cost; }
	get gain():number{return this.proceeds-this.cost; }
	proceeds:number=0;
	cost:number=0;
}
export class GroupResult extends Result
{
	constructor( contract:IB.IContract, public values:TradeResult[] )
	{
		super( contract );
		for( let value of values )
		{
			this._shares+=value.shares;
			let side = value.isLong ? this.long : this.short;
			++side.count;
			side.proceeds += value.proceeds;
			side.cost += value.cost;
		}
	}
	get cost():number{ return this.long.cost+this.short.cost;}
	get proceeds():number{ return this.long.proceeds+this.short.proceeds; }
	get shares():number{return this._shares;} _shares:number=0;
	long:SideResult = new SideResult();
	short:SideResult = new SideResult();
}
*/