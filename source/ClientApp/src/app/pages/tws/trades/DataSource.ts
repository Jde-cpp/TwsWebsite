import { MatTable } from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import { Subject } from 'rxjs';

import {IData} from 'src/app/shared/tws/summary/summary'
import {ITradeCommon} from 'jde-tws'

import {sum} from 'jde-framework'
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;

export class Trade
{
	constructor( params )
	{
		this.id = params.id ? params.id : 0;
		this.orderId = params.orderId ? params.orderId : 0;
		this.date = params.date ? params.date : 0;
		this.quantity = params.quantity ? params.quantity : 0;
		this.price = params.price ? params.price : 0;
		this.commission = params.commission ? params.commission : 0;
	}
	static fromTws( tws:Results.ITrade ):Trade{ return new Trade( {id:tws.id, orderId:tws.orderId,date:new Date(tws.time*1000),quantity:tws.shares,price:tws.price,commission:Math.abs(tws.commission)} ); }
	id: number;
	orderId:number;
	date: Date;
	quantity: number;
	price: number;
	commission: number;
}
export class TradeResult
{
	constructor( symbol:string, openTrade:Trade )
	{
		this.openTrades.push( openTrade );
		this.symbol = symbol;
	}
	apply( offset:Results.ITrade ):Trade|null
	{
		let remainder:Trade|null = null;
		if( Math.abs(this.offsetShares)==Math.abs(this.shares) )
			console.error( `shares=${this.shares}, adding offset ${offset.shares}` )
		if( offset.shares>0==this.first.quantity>0 )
			this.openTrades.push( Trade.fromTws(offset) );
		else
		{
			let trade = Trade.fromTws( offset );
			var remainingQuantity = Math.abs(this.shares)-Math.abs(this.offsetShares+offset.shares);
			if( remainingQuantity<0 )
			{
				trade.quantity-=remainingQuantity;
				remainder = new Trade( trade );
				remainder.quantity = (offset.shares>0 ? 1 : -1)*remainingQuantity;
				console.trace( "check this calc" );
			}
			if( !this.offsetTrades )
			this.offsetTrades = [];
			this.offsetTrades.push( trade );
		}
		return remainder;
	}
	symbol:string;
	get openTime():Date{ return this.first.date; }
	get gain():number{ return this.proceeds-this.cost; }
	get closeTime():Date|null{ return this.last ? this.last.date : null; }
	get openPrice():number{ return (this.isLong ? this.cost : this.proceeds)/Math.abs(this.shares); } //let sum=0; return this.openTrades.forEach( value=>sum+= ); }
	get closePrice():number{ const value = this.isLong ? this.proceeds : this.cost; return value==null ? null : value/Math.abs(this.shares);}
	get shares():number{ return sum( this.openTrades, (value)=>value.quantity ); }
	get offsetShares():number{ return this.offsetTrades ? sum( this.offsetTrades, a=>a.quantity ) : null; }
	get AbsShares():number{ return Math.abs(this.shares); }
	get isLong():boolean{ return this.shares>0; }
	get purchasePrice(){ return this.isLong ? this.openPrice : this.closePrice;}
	get salesPrice(){ return this.isLong ? this.closePrice : this.openPrice; }

	get cost():number{ let trades = this.isLong ? this.openTrades : this.offsetTrades; return trades ? sum(trades, (value)=>value.price* value.quantity+value.commission) : null; }
	get proceeds(){    let trades = this.isLong ? this.offsetTrades : this.openTrades; return trades ? sum(trades, (value)=>value.price*-value.quantity+value.commission) : null; }

	get salesCommissions(){    let trades = this.isLong ? this.offsetTrades : this.openTrades; return trades ? sum(trades, (a)=>a.commission) : null; }
	get purchaseCommissions(){ let trades = this.isLong ? this.openTrades : this.offsetTrades; return trades ? sum(trades, (a)=>a.commission) : null; }
	get commissions(){ return this.salesCommissions+this.purchaseCommissions; }
	get return_():number{ return this.proceeds==null || this.cost==null ? null : this.proceeds/this.cost; }


	private get first():Trade{ return this.openTrades[0]; }
	private get last():Trade{ return this.offsetTrades ? this.offsetTrades[this.offsetTrades.length-1] : null; }
	openTrades:Trade[]=[];
	offsetTrades:Trade[];
}

export class DataSource implements IData
{
	constructor( flex:Results.Flex, executions:ITradeCommon[], sortOptions:Sort )
	{
		var contractTrades = new Map<number,TradeResult>();
		let proceeds = 0; let cost = 0;
		let add = ( trade:ITradeCommon )=>
		{
			const contractId = trade.contract.id;
			let open = contractTrades.get( contractId );
			if( !open )
				contractTrades.set( contractId, new TradeResult(trade.contract.symbol, Trade.fromTws(trade)) );
			else
			{
				let remainder = open.apply( trade );
				if( Math.abs(open.shares)==Math.abs(open.offsetShares) )
				{
					this.values.push( open );
					proceeds+=open.proceeds;
					cost+=open.cost;
					if( open.return_>1 )
					{
						++this.positiveCount;
						this.positiveGain+=open.gain;
					}
					else
					{
						++this.negativeCount;
						this.negativeGain+=-open.gain;
					}
					if( remainder )
						contractTrades.set( contractId, new TradeResult(trade.contract.symbol, remainder) );
					else
						contractTrades.delete( contractId );
				}
			}
		};
		for( const trade of executions )
			add( <ITradeCommon>trade );
        if( flex )
        {
		    for( const trade of flex.trades )
			    add( <ITradeCommon>trade );
		}
		for( let [contractId,result] of contractTrades )
			this.values.push( result );

		this.return_ = proceeds/cost;
		this.sort( sortOptions );
	}

	connect( table:MatTable<TradeResult> )
	{
		if( !this.observable )
		{
			this.observable = new Subject<TradeResult[]>();
			if( this.values.length )
				setTimeout( ()=>{this.setPage();}, 1 );
		}
		return this.observable;
	}
	disconnect()
	{
		this.values = null;
	}
	setPage()
	{
		if( this.observable )
		{
			this.observable.next( this.values );
			//for( let value of this.values )

		}
	}
	sort( options:Sort )
	{
		if( !options || !options.active || options.direction === '' )
			return;

		const values = this.values.slice();
		const multiplier = options.direction === 'asc' ? 1 : -1;
		this.values = values.sort((a, b) =>
		{
			let lessThan = false;
			if( options.active=='symbol' ) lessThan = a.symbol<b.symbol;
			else if( options.active=='shares' ) lessThan = a.shares<b.shares;
			else if( options.active=='openTime' ) lessThan = a.openTime<b.openTime;
			else if( options.active=='closeTime' ) lessThan = a.closeTime<b.closeTime;
			//else if( options.active=='openLongPrediction' ) lessThan = a.openLongPrediction<b.openLongPrediction;
			//else if( options.active=='openShortPrediction' ) lessThan = a.openShortPrediction<b.openShortPrediction;
			//else if( options.active=='closeLongPrediction' ) lessThan = a.closeLongPrediction<b.closeLongPrediction;
			//else if( options.active=='closeShortPrediction' ) lessThan = a.closeShortPrediction<b.closeShortPrediction;
			else if( options.active=='return_' ) lessThan = a.return_<b.return_;
			else if( options.active=='openPrice' ) lessThan = a.openPrice<b.openPrice;
			else if( options.active=='closePrice' ) lessThan = a.closePrice<b.closePrice;
			else if( options.active=='commissions' ) lessThan = a.commissions<b.commissions;
			else
				throw `unknown sort'${options.active}'`;
			return (lessThan ? -1 : 1)*multiplier;
		});
		this.setPage();
	}
	private values:TradeResult[]=[];
	observable:Subject<object>;
	get length():number{ return this.values ? this.values.length : 0; }
	contracts = new Map<number,Results.IContractDetailsResult>();
	get count():number{return this.values.length;}
	get tradeCount():number{return this.count;}
	positiveCount:number=0;
	negativeCount:number=0;
	get gain():number{return this.positiveGain-this.negativeGain;}
	positiveGain:number=0;
	negativeGain:number=0;
	return_:number=0;
	get isGain():boolean{ return this.return_>=0.0;}
}
