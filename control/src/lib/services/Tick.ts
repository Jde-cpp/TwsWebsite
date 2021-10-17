import {ITickObserver} from './ITickObserver'

import { MarketUtilities } from '../utilities/marketUtilities';
import { TwsService } from './tws.service';
import { Day } from 'jde-framework';
import { ProtoUtilities } from 'jde-framework';

import * as ib2 from 'jde-cpp/ib';  import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;

export class Tick implements ITickObserver
{
	constructor( public isMarketOpen:boolean )
	{
		this.object_id=Tick._id++;
		this.errorValue = { requestId:0, code: 0, message:null };
	}
	error( e:any ){ this.errorValue.code=e.code; this.errorValue.requestId=e.requestId; this.errorValue.message=e.message; }
	generic( type:Results.ETickType, value:number ):void
	{
		if( type==Results.ETickType.Halted )
			this.halted = value!=0;
		else if( type==Results.ETickType.OptionHistoricalVol )
			this.volatilityHistorical = value;
		else if( type==Results.ETickType.OptionImpliedVol )
			this.volatilityImplied = value;
		else if( type!=Results.ETickType.SHORTABLE )
			console.log( `onGenericTick( '${Results.ETickType[type]}', '${value}')` );
	}
	price( type:Results.ETickType, price:number, attributes:Results.ITickAttrib ):void
	{
		if( type==Results.ETickType.ClosePrice )
		{
			if( this.isMarketOpen )
				this.close = price;
			else
				this.last = price;//for options.
		}
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
		else if( type==Results.ETickType.MarkPrice )
			this.markPrice = price;
		else if( type<Results.ETickType.Low13Week && type>Results.ETickType.High52Week )
			console.log( `onPriceTick( '${Results.ETickType[type]}', '${price}') - not handled` );
		let now = Date.now();
		if( this.delay && now>this.nextUpdate )
		{
			this.nextUpdate = now+this.delay;
			this._askSizeDelay = this._askSize;
			this._askDelay = this._ask;
			this._bidSizeDelay = this._bidSize;
			this._bidDelay = this._bid;
			this._lastDelay = this._last;
		}
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
		else if( type!=Results.ETickType.LastTimestamp )
			console.log( `onSizeTick( '${Results.ETickType[type]}', '${size}')` );
	}
	string( type:Results.ETickType, value:string ):void
	{
		if( type==45 )
			this.lastTime = new Date( parseInt(value)*1000 );
		else if( type!=32 && type!=33 && type!=84 && type!=48 )//bid/ask/last exchange/RT_VOLUME
			console.log( `onStringTick( '${Results.ETickType[type]}', '${value.substr(0,120)}')` );
	}
	onEndTick():void
	{
	}
	complete():void
	{
		this.completed = true;
	}
	optionCalculation( type:Results.ETickType, priceBased:boolean, impliedVolatility:number, delta:number, optionPrice:number, pvDividend:number, gamma:number, vega:number, theta:number, underlyingPrice:number ):void
	{
		this._optionCalc.set( type, {priceBased:priceBased, impliedVolatility:impliedVolatility, delta:delta, optionPrice:optionPrice, pvDividend:pvDividend, gamma:gamma, vega:vega, theta:theta, underlyingPrice:underlyingPrice} );
	}

	get ask(){return this.delay ? this._askDelay || this._ask : this._ask;} set ask(value)
	{
		if( this.isMarketOpen || value>0 )
		{
			this._ask = value>0 ? value : null;
			if( this._ask && this._ask<(this.low || this._ask+1) )
				this.low = this._ask;
		}
	} _ask:number|null; _askDelay:number|null;
	get askSize(){return this.delay ? this._askSizeDelay : this._askSize;} set askSize(value){this._askSize = value>0 ? value : null;} _askSize:number|null; _askSizeDelay:number|null;
	get bid(){return this.delay ? this._bidDelay || this._bid : this._bid;} set bid(value)
	{
		if( this.isMarketOpen || value>0 )
		{
			this._bid = value>0 ? value : null;
			if( this._bid && this._bid>(this.high || 0) )
				this.high = this._bid;
		}
	} _bid:number|null; _bidDelay:number|null;
	get bidSize(){return this.delay ? this._bidSizeDelay : this._bidSize;} set bidSize(value)
	{
		this._bidSize = value>0 ? value : null;} _bidSize:number|null; _bidSizeDelay:number|null;
	completed:boolean=false;
	get close(){return this._close;} set close(value)
	{
		this._close = value;
	} private _close:number;
	get delay():number{ return this.isMarketOpen ? null : null;} nextUpdate:number=Date.now();
	get currentPrice():number
	{
		let price = this.markPrice;
		if( this.last )
	        price = this.last>=this.bid && this.last<=this.ask ? this.last : (this.ask+this.bid)/2;
        return price;
	}
	errorValue:Results.IError;
	halted:boolean;
	high:number;
	lastTime: Date;
	low:number;
	markPrice:number;
	open:number;
	private _optionCalc = new Map<Results.ETickType,Results.IOptionCalculation>();
	get last()
	{
		return this.delay ? this._lastDelay || this._last : this._last;
	} set last(value)
	{
		this._last = value;
		if( this.isMarketOpen || value>0 )
		{
			this.high = Math.max( value, this.high );
			this.low = Math.min( value, this.low );
		}
	} _last:number; _lastDelay:number; lastSize:number;
	shortableAvailable:number;
	volatilityHistorical:number;
	volatilityImplied:number;
	get volume(){return this._volume;} set volume(value)
	{
		if( this.isMarketOpen || value>0 )
			this._volume = value>0 ? value : null;
	} _volume:number|null;
	volumeAverage:number;
	object_id; static _id=0;
}
/*Tick + Contract Info*/
export class TickEx extends Tick
{
	constructor( private _contract:IB.IContract, isMarketOpen:boolean )
	{
		super( _contract && (isMarketOpen ?? false) ? isMarketOpen : MarketUtilities.isMarketOpen2(_contract.exchange, _contract.securityType) );
		if( _contract )
		{
			if( !_contract.multiplier )
				_contract.multiplier = 1;
		}
	}
	setPreviousDay( bar:Results.IDaySummary ){ this.close = bar.close; }
	setDaySummary( bar:Results.IDaySummary, previousDay:Day )
	{
		if( this.isMarketOpen && bar.day>previousDay )
		{
			this.high = bar.high;
			this.low = bar.low;
			this.open = bar.open;
		}
		else
		{
			if( this.isMarketOpen || bar.day==previousDay )
			    this.setPreviousDay( bar );
			if( bar.day>previousDay || (this.contract.securityType==IB.SecurityType.Option && bar.day==previousDay && MarketUtilities.isMarketOpen2(this.contract.exchange, IB.SecurityType.Stock)) )
			{
				this.high = bar.high;//!isMarketOpen && day>previousDay
				this.low = bar.low;

				this.bid = bar.bid;
				this.ask = bar.ask;
				this.volume = ProtoUtilities.toNumber( bar.volume );
				this.last = ProtoUtilities.toNumber( bar.close );
			}
		}
	}
	reqPrevious( tws:TwsService, previousDay:Day ):Promise<void>
	{
		return new Promise<void>( (resolve,reject)=>
		{
			tws.reqPreviousDay( [this.contract.id] ).subscribe(
			{
				next: ( bar:Results.IDaySummary ) =>{ this.setDaySummary(bar, previousDay); },
				complete:()=>
				{
					if( !this.close )
						console.log( `No previous day close for '${this.contract.symbol}'` );
					resolve();
				},
				error: e=>{ console.error(e); reject(e); }
			});
		});
	}

	get contract():IB.IContract{ return this._contract; }
	get contractId(){ return this.contract.id; }
	get currentPrice():number{ return this.isOption ? super.currentPrice : this.last>=this.bid && this.last<=this.ask ? this.last : this.last<this.bid ? this.bid : this.ask; }

	static descriptionDetail( detail:Results.IContractDetail ){ return  this.descriptionOption(detail.contract.symbol, detail.contract.expiration, detail.contract.strike, detail.contract.right==IB.SecurityRight.Call); }
	static descriptionOption( symbol, expiration, strike, isCall ){ return `${symbol} ${MarketUtilities.optionDayDisplay(expiration)} ${strike} ${isCall ? "Call" : "Put"}` }
	get display():string{ return this.isOption ? TickEx.descriptionOption( this.contract.symbol, this.expiration, this.strike, this.isCall ) : this.contract.symbol;  }
	get expiration():number{ return this.contract.expiration; }
	get isCall(){ return this.contract.right==IB.SecurityRight.Call; }
	get isOption(){ return this.contract.securityType==IB.SecurityType.Option; }
	get oi():number{ return this.option ? this.option.openInterest : 0;}
	get oiChange():number{ return this.option ? this.option.openInterest : 0; }
	option:Results.IOption;
	get strike():number{ return this.contract.strike; }
	get change():number
	{
		var change  = this.close>0 ? this.currentPrice-this.close : 0;
		return change;
	}
}

export class TickDetails extends TickEx
{
	constructor( public detail:Results.IContractDetail )
	{
		super( detail.contract, MarketUtilities.isMarketOpen(detail) );
		if( !detail.contract.multiplier )
			detail.contract.multiplier = 1;
	}
	get contract():IB.IContract{ return this.detail.contract; }
}
