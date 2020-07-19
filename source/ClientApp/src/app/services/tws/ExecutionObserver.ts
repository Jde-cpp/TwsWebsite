import { Subject,Observable,NextObserver,CompletionObserver,Subscription } from 'rxjs';


import * as ib2 from '../../proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbResults from '../../proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;

export interface ITradeCommon
{
	orderId:number;
	accountNumber:string;
	time:number;
	side:string;
	shares:number;
	price:number;
	execId:string;
	contract:IB.Contract;
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
	complete(){ this._observers.forEach( observer=>{observer.complete();} ) };
	private _observers:IExecutionObserver[]=[];
}