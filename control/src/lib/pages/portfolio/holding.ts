import { TickDetails } from '../../services/Tick';
import * as ib2 from 'jde-cpp/ib';  import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results';
import Results = IbResults.Jde.Markets.Proto.Results;

export class TermHoldingSummary
{
	add( value:Holding )
	{
		this.basis += value.basis;
		this.marketValue += value.marketValue;
	}
	update( previous:Holding, update:Results.IPortfolioUpdate )
	{
		let current = new Holding( update );
		this.basis = -previous.basis + current.basis;
		this.marketValue -previous.marketValue+current.marketValue;
		//this.allTimeIncome = this.marketValue-this.basis;
		//this.allTimeReturn = this.marketValue/this.basis-1.0;
	}
	basis:number=0;
	marketValue:number=0;

	dailyUnrealizedPnl:number=0;
	dailyRealizedPnl:number=0;
	dailyIncome:number=0;
	dailyReturn:number=0;

	allTimeUnrealizedPnl:number=0;
	allTimeRealizedPnl:number=0;
	get allTimeIncome():number{ return this.marketValue-this.basis;}
	get allTimeReturn():number{ return this.marketValue/this.basis-1.0;}
}
export class Price
{
	constructor( params=null )
	{
		if( !params )
			return;
		this.bid = params.bid || -1;
		this.ask = params.ask || -1;
		this.last = params.last || params.close || -1;
	}
	bid:number;
	ask:number;
	last:number;
	get price():number{ return this.bid<=0 || this.ask<=0 || (this.last>=this.bid && this.last<=this.ask) ? this.last : (this.bid+this.ask)/2; }
}
/*TickEx+Holding info*/
export class Holding extends TickDetails
{
	constructor( update:Results.IPortfolioUpdate )
	{
		super( {contract:update.contract} );
		this.set( update );
	}
	set( update:Results.IPortfolioUpdate )
	{
		//this.contract = update.contract;
		//if( this.contract.symbol=="ALGT" )
		//	console.log( `${this.contract.Symbol} - marketValue=${update.marketValue}` );
		this.position = update.position;
		this.marketValue = update.marketValue;
		this.averageCost = this.isOption ? Math.abs(Math.round(update.averageCost/(this.contract.multiplier)*100)/100) : update.averageCost;
		this.realizedPN = update.realizedPnl;
		this.accountNumber = update.accountNumber;
	}
	override setPreviousDay( bar:Results.IDaySummary ){ this.previousDay = new Price( bar ); }
	accountNumber:string;
	averageCost:number;
	get basis():number{ return this.averageCost*this.position; }
	override get last()
	{
		let v = super.last || this.previousDay?.last;
		return v==-1 ? (this.bid+this.ask)/2 : v;
	} override set last(value){ super.last = value; }
	//current:Price = new Price();
	previousDay:Price;// = new Price()
	//contract:IB.IContract;
	get marketValue():number
	{
		const primary = this.isOption ? this._marketValue : this.currentPrice*this.position;
		const secondary = this.isOption ? this.currentPrice*this.position*this.contract.multiplier : this._marketValue;
		return primary || secondary;
	} set marketValue( value )
	{
		//if( this.contract.symbol=="ALGT" )
		//	console.log( `${this.contract.symbol} - marketValue=${value}` );
	    this._marketValue = value;
	} _marketValue:number|null=null;
	position:number;
	realizedPN: number;


	//position:number;
	//averageCost:number;

	//accountNumber:string;
	//shortInventory:number;
	//volume:number=0;
	//get last():number{ return this.current.last || this.previousDay.last; }
	get isLong():boolean{ return this.position>0; }
	override get isOption():boolean{ return this.contract.securityType==IB.SecurityType.Option; }
	get pnl():number{ return this.change*this.position*this.contract.multiplier; }
	override get change():number//should be price change
	{
		if( this.contract.symbol=="XOM" )
			this.contract.multiplier = 1.0;

		//return this.marketValue/(this.position*this.contract.multiplier)-this.last;
		return this.last-this.previousDay?.last;
	}
	get pricePrevious(){ return this.previousDay?.last; }
	get marketValuePrevious(){ return this.pricePrevious*this.position*this.contract.multiplier; }
}
