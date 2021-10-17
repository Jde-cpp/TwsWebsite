import { Subject,Observable,CompletionObserver,Subscription } from 'rxjs';
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;

//https://stackoverflow.com/questions/46151594/how-to-handle-progress-update-using-reactivex-observables-subjects
export interface ITickObserver extends CompletionObserver<number>
{
	generic:( type:Results.ETickType, value:number )=>void;
	price:( type:Results.ETickType, price:number, attributes:Results.ITickAttrib )=>void;
	size:( type:Results.ETickType, size:number )=>void;
	string:( type:Results.ETickType, value:string )=>void;
	optionCalculation( type:Results.ETickType, priceBased:boolean, impliedVolatility:number, delta:number, optionPrice:number, pvDividend:number, gamma:number, vega:number, theta:number, underlyingPrice:number );
	error:( err: any )=>void;
}

export class TickObservable extends Observable<number>
{
	subscribe2( observer?: ITickObserver ): Subscription
	{
		return this.subscribe( observer );
	}
}

export class TickSubject extends Subject<number> implements ITickObserver
{
	subscribe2( observer?: ITickObserver ): Subscription
	{
		this._observers.push( observer );
		return this.subscribe( observer );
	}
	generic( type:Results.ETickType, value:number ){ this._observers.forEach(observer=>{observer.generic(type, value);}) };
	price( type:Results.ETickType, price:number, attributes:Results.ITickAttrib )
	{
		this._observers.forEach(observer=>
		{
			let foo = observer;
			if( foo )
				foo.price( type, price, attributes );
		});
	}
	size( type:Results.ETickType, size:number ){ this._observers.forEach(observer=>{observer.size(type, size);}) };
	string( type:Results.ETickType, value:string ){ this._observers.forEach(observer=>{observer.string(type, value);}) };
	optionCalculation( type:Results.ETickType, priceBased:boolean, impliedVolatility:number, delta:number, optionPrice:number, pvDividend:number, gamma:number, vega:number, theta:number, underlyingPrice:number ){ this._observers.forEach(observer=>{observer.optionCalculation(type, priceBased, impliedVolatility, delta, optionPrice, pvDividend, gamma, vega, theta, underlyingPrice);}) };
	complete(){ this._observers.forEach( observer=>{observer.complete();} ) };
	private _observers:ITickObserver[]=[];
}