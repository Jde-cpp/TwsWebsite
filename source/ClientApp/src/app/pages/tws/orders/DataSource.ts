import { MatTable } from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { Subject } from 'rxjs';
import {IData} from 'src/app/shared/tws/summary/summary'
import {Tick} from 'src/app/services/tws/Tick'

export class Order
{
	constructor( public order:Results.IOpenOrder )
	{}
	get id(){ return this.order.order.id; }
	get commission(){ return this.order.state.commission; }
	get quantity(){ return this.order.order.quantity; }
	get ask(){ return this.tick ? this.tick.ask : null; }
	get bid(){ return this.tick ? this.tick.bid : null; }
	get symbol(){ return this.order.contract.symbol; }
	get isBuy(){ return this.order.order.isBuy; }
	get last(){ return this.tick ? this.tick.price : null; }
	get limit(){ return this.order.order.limit; }
	get statusString(){ return this.order.state.status; }
	get startTime(){ return this.order.order.activeStartTime; }
	get stopTime(){ return this.order.order.activeStopTime; }

	status:Results.IOrderStatus;
	tick:Tick;
}

export class DataSource implements IData
{
	constructor( public sortOptions:Sort, public values:Order[] )
	{
	}
/*	next(  )
	{
		this.values.push( new Order(order) );
	}*/
	nextStatus( status:Results.IOrderStatus)
	{
		//this.values.find( app=>app.id==status.ApplicationId );
	}
	connect( table:MatTable<Results.IOrderStatus> )
	{
		if( !this.observable )
		{
			this.observable = new Subject<Order[]>();
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
/*			if( options.active=='symbol' ) lessThan = a.symbol<b.symbol;
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
			else*/
				throw `unknown sort'${options.active}'`;
			return (lessThan ? -1 : 1)*multiplier;
		});
		this.setPage();
	}
//	private values:Order[]=[];
	observable:Subject<object>;
	get length():number{ return this.values ? this.values.length : 0; }
	contracts = new Map<number,Results.IContractDetails>();
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
