import { Subject,Observable,NextObserver,CompletionObserver,Subscription, PartialObserver, Subscriber } from 'rxjs';

//import * as ib2 from 'dist/jde-tws-assets/src/assets/proto/ib';  import IB = ib2.Jde.Markets.Proto;
import * as ib2 from 'jde-cpp/ib';  import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
// import * as ib2 from '../proto/ib';  import IB = ib2.Jde.Markets.Proto;
// import * as IbResults from '../proto/results'; import Results = IbResults.Jde.Markets.Proto.Results;

export class Order
{
	constructor( contract:IB.IContract, order:IB.IOrder, callback:OrderSubject )
	{
		this.contract = contract;
		this.order = order;
		this.callback = callback;
	}
	setStatus( status:Results.IOrderStatus ):string
	{
		let msg:string = null;
		if( !this.lastStatus || this.lastStatus.status!=status.status )
			msg = `${this.contract.symbol} - ${this.order.quantity}@${this.order.limit} - ${status.status}`;
		this.lastStatus = status;

		return msg;
	}
	lastStatus:Results.IOrderStatus;
	contract:IB.IContract;
	order:IB.IOrder;
	callback:OrderSubject;
}

export interface IOrderObserver extends CompletionObserver<number>
{
	status:( value:Results.IOrderStatus )=>void;
	open:( status:Results.IOpenOrder )=>void;
	//error:(msg:string)=>void;
	//complete:()=>void;

}

export class OrderObservable extends Observable<number>
{
	subscribe2( observer?: IOrderObserver ): Subscription
	{
		return this.subscribe( observer );
	}
}

export class OrderSubject extends Subject<number> implements IOrderObserver
{
	subscribe2( observer?: IOrderObserver ): Subscription
	{
		this._observers.push( observer );
		return this.subscribe( observer );
	}
	status( value:Results.IOrderStatus ):void{ this._observers.forEach(observer=>{observer.status(value);}); }
	open( value:Results.IOpenOrder ):void{ this._observers.forEach(observer=>{observer.open(value);}); }
	override complete():void{ this._observers.forEach( observer=>{observer.complete();} ); }
	override error(e:any):void{ this._observers.forEach( observer=>{observer.error(e);} ); }
	private _observers:IOrderObserver[]=[];
}