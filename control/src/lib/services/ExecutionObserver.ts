import { Subject,Observable,NextObserver,CompletionObserver,Subscription } from 'rxjs';


// <reference path="dist/jde-tws-assets/src/assets/proto/ ib.d.ts" />
// <reference path="dist/jde-tws-assets/src/assets/proto/ ib.js" />
// <reference path="dist/jde-tws-assets/src/assets/proto/results.d.ts" />
//import * as ib2 from 'dist/jde-tws-assets/src/assets/proto/ib';  import IB = ib2.Jde.Markets.Proto;
import * as ib2 from 'jde-cpp/ib';  import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
// import * as ib2 from '../proto/ib';  import IB = ib2.Jde.Markets.Proto;
// import * as IbResults from '../proto/results'; import Results = IbResults.Jde.Markets.Proto.Results;

export interface ITradeCommon
{
	orderId?:number;
	accountNumber?:string;
	time?:number;
	side?:string;
	shares?:number;
	price?:number;
	execId?:string;
	contract?:IB.IContract;
	commission?:number;
}

//https://stackoverflow.com/questions/46151594/how-to-handle-progress-update-using-reactivex-observables-subjects
export interface IExecutionObserver extends CompletionObserver<Results.IExecution>
{
	execution:( type:Results.IExecution )=>void;
	commissionReport:( type:Results.ICommissionReport )=>void;
}

export class ExecutionObservable extends Observable<Results.IExecution>
{
	subscribe2( observer?: IExecutionObserver ): Subscription
	{
		return this.subscribe( observer );
	}
}

export class ExecutionSubject extends Subject<Results.IExecution> implements IExecutionObserver
{
	subscribe2( observer?: IExecutionObserver ): Subscription
	{
		this._observers.push( observer );
		return this.subscribe( observer );
	}
	execution( type:Results.IExecution ){ this._observers.forEach(observer=>{observer.execution(type);}) };
	commissionReport( type:Results.ICommissionReport ){ this._observers.forEach(observer=>{observer.commissionReport(type);}) };
	override complete(){ this._observers.forEach( observer=>{observer.complete();} ) };
	private _observers:IExecutionObserver[]=[];
}