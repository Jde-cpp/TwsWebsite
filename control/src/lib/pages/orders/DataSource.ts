import {Sort} from '@angular/material/sort';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import {IOrderObserver, Order} from '../../services/IOrderObserver';
import {IData} from '../../shared/summary/summary'
import { TickEx } from '../../services/Tick';

export class OrderView extends TickEx //implements IOrderObserver
{
	constructor( public openOrder:Order )
	{
		super( openOrder.contract, null );
		//openOrder.callback.subscribe2( this );
	}
	get id(){ return this.openOrder.order.id; }
	get commission(){ return this.openOrder.state.commission; }
	get quantity(){ return this.openOrder.order.quantity; }
	get quantityDisplay(){ return (this.isBuy ? 1 : -1)*this.quantity; }
	set quantityNew(value){ this.#quantityNew = this.quantityDisplay==value ? null : value; } get quantityNew(){return this.#quantityNew;} #quantityNew:number|null=null;
	//get ask(){ return this.tick ? this.tick.ask : null; }
	//get bid(){ return this.tick ? this.tick.bid : null; }
	//get symbol(){ return this.openOrder.contract.symbol; }
	get isBuy(){ return this.openOrder.order.isBuy; }
	get isActive(){ return this.statusString!="Filled"; }
	//get last(){ return this.tick ? this.tick.price : null; }
	get limit(){ return this.openOrder.order.limit; }
	set limitNew(value){ this.#limitNew = this.quantityDisplay==value ? null : value; } get limitNew(){return this.#limitNew;} #limitNew:number|null=null;
	get statusString(){ return this.status?.status==Results.EOrderStatus.Cancelled ? "Canceled" : this.openOrder.state?.status; }
	//get startTime(){ return this.openOrder.order.activeStartTime; }
	//get stopTime(){ return this.openOrder.order.activeStopTime; }
	get status():Results.IOrderStatus{ return this.openOrder.lastStatus; }
}

export class MyDataSource implements IData, DataSource<OrderView>
{
	constructor( public sortOptions:Sort, public values:OrderView[] )
	{
	}
/*	next(  )
	{
		this.values.push( new OrderView(order) );
	}*/
	nextStatus( status:Results.IOrderStatus)
	{
		//this.values.find( app=>app.id==status.ApplicationId );
	}
	connect( table:CollectionViewer ): Observable<readonly OrderView[]>
	{
		if( !this.observable )
		{
			this.observable = new Subject<readonly OrderView[]>();
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
//	private values:OrderView[]=[];
	observable:Subject<readonly OrderView[]>;
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
