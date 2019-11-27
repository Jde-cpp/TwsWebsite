import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject,Observable } from 'rxjs';//,of
import { promise } from 'protractor';
import { resolve } from 'q';
//import * as requests from '../proto/requests';

import * as ib2 from '../../proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbRequests from '../../proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;
import * as IbResults from '../../proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;


type ResolveGeneric = (any) => void;
type ClientId = number;
interface IDeferred
{
	resolveGeneric:ResolveGeneric;
	reject:  (reason?: any) => void;
}

class Deferred<T> implements IDeferred
{
	constructor()
	{
		this.promise = new Promise<T>( (resolve, reject) =>{ this.resolve = resolve; this.reject = reject; } );
	}
	promise: Promise<T>;
	resolve: (value?: T | PromiseLike<T>) => void;
	resolveGeneric: ResolveGeneric = function(value?:any)
	{
		this.resolve( value );
	};
	reject:  (reason?: any) => void;
}

export interface ITicker
{
	onGenericTick( reqId:number, type:Results.ETickType, value:number ):void;
	onPriceTick( reqId:number, type:Results.ETickType, price:number, attributes:Results.ITickAttrib ):void;
	onSizeTick( reqId:number, type:Results.ETickType, size:number ):void;
	onStringTick( reqId:number, type:Results.ETickType, value:string ):void;
	onEndTick(reqId:number):void;
}


export type ErrorCallback = (error: Results.IError)=>any;
export type JsonCallback<T> = ( reqId: number, result:T ) => any;
type EndCallback = (reqId: number) => any;
type AccountUpdateCallback = (accountUpdate: Results.IAccountUpdate) => any;
type AccountUpdateMultiCallback = (accountUpdate: Results.IAccountUpdateMulti)=>any;
type AccountUpdateType = [Observable<Results.IAccountUpdate>,Observable<Results.IPortfolioUpdate>];
//type HistoricalCallback = (reqId:number, bars: Results.IBar[]) => any;
type ContractDetailsCallback = (details: Results.IContractDetails)=>any;
type OptionSummaryCallback = (optionValues: Results.IOptionValues) => any;
class Connection
{
	constructor()
	{
		console.log( 'Connection::Connection' );
		this.socket = webSocket<protobuf.Buffer>( {url: 'ws://localhost:6811', deserializer: msg => this.onMessage(msg), serializer: msg=>msg, binaryType:"arraybuffer"} );
		//this.socket.binary(true);
		this.socket.subscribe(
			( msg ) => this.addMessage( msg ),
			( err ) => this.error( err ),
			() => this.socketComplete()
		);
	}
	sendTick( reqId:number, func:(ticker:ITicker)=>void ):void
	{
		var ticker = this.marketDataCallbacks.get( reqId );
		if( ticker )
			func( ticker );
		else
			console.trace( `Could not find request id '${reqId}' for ticker/` );
	}
	onMessage( event:MessageEvent ):protobuf.Buffer
	{
		var bytearray = new Uint8Array( event.data );//new Uint8Array( event.data );
		const transmission = Results.Transmission.decode( bytearray );
		for( const message of transmission.Messages )
		{
			if( message.TickPrice )
				this.sendTick( message.TickPrice.RequestId, (ticker:ITicker)=>ticker.onPriceTick(message.TickPrice.RequestId, message.TickPrice.TickType, message.TickPrice.Price, message.TickPrice.Attributes) );
			else if( message.TickGeneric )
				this.sendTick( message.TickGeneric.RequestId, (ticker:ITicker)=>ticker.onGenericTick(message.TickGeneric.RequestId, message.TickGeneric.TickType, message.TickGeneric.Value) );
			else if( message.TickSize )
				this.sendTick( message.TickSize.RequestId, (ticker:ITicker)=>ticker.onSizeTick(message.TickSize.RequestId, message.TickSize.TickType, message.TickSize.Size) );
			else if( message.TickString )
				this.sendTick( message.TickString.RequestId, (ticker:ITicker)=>ticker.onStringTick(message.TickString.RequestId, message.TickString.TickType, message.TickString.Value) );
			else if( message.AccountList )
			{
				TwsService.accounts = message.AccountList.Numbers;
				if( this.reqManagedAcctsPromise )
					this.reqManagedAcctsPromise.resolve( TwsService.accounts );
			}
			else if( message.AccountUpdateMulti )
			{
				const reqId = message.AccountUpdateMulti.RequestId;
				const callback = this.accountUpdateMultiCallbacks.get( reqId );
				if( callback )
					callback[0]( message.AccountUpdateMulti );
				else
					console.error( `no callbacks for accountUpdate accountNumber='${message.AccountUpdateMulti.Account}', reqId='${reqId}'` );//todo stop request.
			}
			else if( message.AccountUpdate )
			{
				const accountNumber = message.AccountUpdate.Account;
				if( this.accountUpdateCallbacks.has(accountNumber) )
				{
					for( const callback of this.accountUpdateCallbacks.get(accountNumber) )
						callback[0].next( message.AccountUpdate );
				}
				else
					console.error( `no callbacks for accountUpdate accountNumber='${accountNumber}'` );//todo stop request.
			}
			else if( message.PortfolioUpdate )
			{
				const accountNumber = message.PortfolioUpdate.AccountNumber;
				if( this.accountUpdateCallbacks.has(accountNumber) )
				{
					for( const callback of this.accountUpdateCallbacks.get(accountNumber) )
						callback[1].next( message.PortfolioUpdate );
				}
				else
					console.error( `no callbacks for portfolioUpdate accountNumber='${accountNumber}'` );//todo stop request.
			}
			else if( message.ContractDetails )
			{
				const id = message.ContractDetails.RequestId;
				let callback = this.contractCallbacks.get( id );
				if( callback )
					callback.next( message.ContractDetails );
				else
					console.error( `no callbacks for ContractDetails reqId='${id}'` );
				// else
				// {
				// 	callback = this.contractCallbacks.get( id );
				// 	if( callback )
				// 		callback.next( message.ContractDetails );
				// 	else
				// 		console.error( `no callbacks for ContractDetails reqId='${id}'` );
				// }
			}
			else if( message.Options )
				this.handleReceive( message.Options, this.optionSummaryCallbacks, "options" );
			else if( message.HistoricalData )
				this.handleHistoricalData( message.HistoricalData );
			else if( message.Error )
				this.handleError( message.Error );
			else if( message.Message )
			{
				var id = message.Message.Type;
				if( id==Results.EResults.Accept )
					this.sessionId = message.Message.IntValue;
				else if( id==Results.EResults.PositionMultiEnd )
					this.handlePositionMultiEnd( message.Message.IntValue );
				else if( id==Results.EResults.TickSnapshotEnd )
					this.sendTick( message.Message.IntValue, (ticker:ITicker)=>ticker.onEndTick(message.Message.IntValue) );
				else if( id==Results.EResults.MultiEnd )
					this.complete( this.contractCallbacks, message.Message.IntValue );
				else
					console.error( "unknown message id:  "+id );
			}
			else if( message.Flex )
				this.handleReceive( message.Flex, this.flexCallbacks, "flex" );
			else if( message.StringResult )
			{
				console.error( "message.StringResult not implemented" );
/*				if( message.StringResult.Type==Results.EResults.HistorianData || message.StringResult.Type==Results.EResults.TwitterData )
				{
					const deferred = this.callbacks.get( message.StringResult.RequestId );
					if( deferred )
						deferred.resolveGeneric( JSON.parse(message.StringResult.Value) );
					else
						console.error( `no callbacks for '${message.StringResult.Type}' reqId='${message.StringResult.RequestId}'` );//todo stop request.
				}*/
			}
			else
				console.error( "unknown message type" );
		}
		//var tokens = msg.data.split( '\0' );
		return bytearray;
	}
	handleReceive( data, callbacks, what:string )
	{
		const id = data.RequestId;
		const callback = callbacks.get( id );
		if( callback )
			callback.next( data );
		else
			console.error( `no callbacks for '${what}' reqId='${id}'` );//todo stop request.
	}
	handleHistoricalData( data:Results.IHistoricalData )
	{
		const id = data.RequestId;
		let callback = this.historicalCallbacks.get( id );
		if( callback )
		{
			for( let bar of data.Bars )
				callback.next( bar );
			callback.complete();
		}
		else
			console.error( `no callbacks for historicalData reqId='${id}'` );
	}
	static errorIfPresent( id:number, map, error:Results.IError ):boolean
	{
		const x = map.get( id );
		var isPresent = x!=null;
		if( isPresent )
			x.error( error );
		return isPresent;
	}
	handleError( error:Results.IError )
	{
		const id = error.RequestId;
//		var errorCallback;
		if( !Connection.errorIfPresent(id, this.contractCallbacks, error) )
		{
			console.error( `error code='${error.Code}' message='${error.Message}'` );//todo stop request.
		}
	}

	handlePositionMultiEnd( reqId:number )
	{
		var callback = this.accountUpdateMultiCallbacks.get( reqId );
		if( callback )
		{
			if( callback[1] )
				callback[1]( reqId );
		}
		else 
			console.error( "unknown accountUpdateCallbacks request:  "+reqId );
	}
	complete( map, reqId:number )
	{
		var callback = map.get( reqId );
		if( callback )
		{
			callback.complete();
			map.delete( reqId );
		}
		else
			console.error( "unknown complete request:  "+reqId );
	}
	
	addMessage( msg ):void
	{
		//this.loggingService.log( msg );
		//this.loggingService. 
	}
	error( err ):void
	{
		this.sessionId = null;
		console.error( err );
	}
	socketComplete():void
	{
		console.log( 'complete' );
	}
	send<T>( request:T ):void
	{
		var transmission = new Requests.RequestTransmission(); transmission.Messages.push( request );
		var writer = Requests.RequestTransmission.encode( transmission );
		this.socket.next( writer.finish() );//'17\0'+'1\0'
	}
	reqManagedAccts(): Promise<Array<string>>
	{
		if( !this.reqManagedAcctsPromise )
		{
			this.reqManagedAcctsPromise = new Deferred<Array<string>>();
			var param = new Requests.GenericRequest(); param.Type = Requests.ERequests.ManagedAccounts;
			var msg = new Requests.RequestUnion(); msg.GenericRequest = param;
			this.send( msg );
		}
		return this.reqManagedAcctsPromise.promise;
	}

	reqMktData( contractId:number, callback:ITicker, tickList:Requests.ETickList[], snapshot:boolean ):number
	{
		var id = this.getRequestId();
		var param = new Requests.RequestMrkDataSmart( {"RequestId": id, "ContractId": contractId, "TickList": tickList, "Snapshot": snapshot } );
		var msg = new Requests.RequestUnion(); msg.MrkDataSmart = param;
		this.send( msg );
		this.marketDataCallbacks.set( id, callback );
		return id;
	}
	reqHistoricalData( contract:IB.IContract, date:Date, days:number, barSize:Requests.BarSize, display:Requests.Display, useRth:boolean, keepUpToDate:boolean ):Observable<Results.IBar>
	{
		var id = this.getRequestId();
		var param = new Requests.RequestHistoricalData( {"RequestId": id, "Contract": contract, "Days":days, "BarSize":barSize, "Display":display, "UseRth":useRth, "KeepUpToDate":keepUpToDate, "Date": {"seconds": date.getTime() / 1000, "nanos": null}} );
		var msg = new Requests.RequestUnion(); msg.HistoricalData = param;
		this.send( msg );
		var callback = new Subject<Results.IBar>();
		this.historicalCallbacks.set( id, callback );
		return callback;
	}
	reqContractDetails( contract:IB.Contract ):Observable<Results.IContractDetails>
	{
		var callback = new Subject<Results.IContractDetails>();
		var id = this.getRequestId();
		console.log( `reqContractDetails:  ${contract.Symbol ? contract.Symbol : contract.Id}`)
		var param = new Requests.RequestContractDetails( {"RequestId": id} ); param.Contracts.push( contract );
		var msg = new Requests.RequestUnion( {"ContractDetails":param} ); //msg.ContractDetails = param;
		this.contractCallbacks.set( id, callback );
		this.send( msg );
		return callback;
	}
	reqContractDetailsMulti( contractIds:number[] ):Observable<Results.IContractDetails>
	{
		var callback = new Subject<Results.IContractDetails>();
		var id = this.getRequestId();
		var param = new Requests.RequestContractDetails( {"RequestId": id} );
		for( let id of contractIds )
			param.Contracts.push( new IB.Contract({"Id": id, "SecType": "STK", "Exchange": "SMART", "Currency": "USD"}) );

		var msg = new Requests.RequestUnion( {"ContractDetails":param} ); //msg.ContractDetails = param;
		this.contractCallbacks.set( id, callback );
		console.log( `reqContractDetailsMulti( count=${contractIds.length} )` );
		this.send( msg );
		return callback;
	}
	optionSummary( contractId:number, isCall:boolean, callback:OptionSummaryCallback, date:Date, error?:ErrorCallback ):number
	{
		var id = this.getRequestId();
		var timestamp = {"seconds": date ? date.getTime() / 1000 : 0, "nanos": null };
		var msg = new Requests.RequestUnion(); msg.Options = new Requests.RequestOptions( {"RequestId": id, "ContractId": contractId, "IsCall": isCall ? 1 : 0, "Date": timestamp } );
		this.optionSummaryCallbacks.set( id, [callback,error] );
		this.send( msg );
		return id;
	}
	request<T>( requestType:Requests.ERequests ):Promise<T>
	{ 
		const id = this.getRequestId();

		let deferred = new Deferred<T>();
		this.callbacks.set( id, deferred );
		let msg = new Requests.RequestUnion(); msg.GenericRequest = new Requests.GenericRequest( { "Type": requestType, "RequestId": id } );
		this.send( msg );
		return deferred.promise;
	}
	reqAccountUpdatesMulti( number:string, callback: AccountUpdateMultiCallback, endCallback:  (accountNumber:number)=>any ):void
	{
		var id = this.getRequestId();
		var param = new Requests.RequestAccountUpdatesMulti( {"AccountNumber": number, "RequestId": id} );
		var msg = new Requests.RequestUnion(); msg.AccountUpdatesMulti = param;
		this.send( msg );
		this.accountUpdateMultiCallbacks.set( id, [callback,endCallback] );
	}

	reqAccountUpdates( number: string ):AccountUpdateType
	{
		var param = new Requests.RequestAccountUpdates( {"Subscribe": true, "AccountNumber": number} );
		var msg = new Requests.RequestUnion(); msg.AccountUpdates = param;
		let callback:[Subject<Results.IAccountUpdate>,Subject<Results.IPortfolioUpdate>] = [new Subject<Results.IAccountUpdate>(),new Subject<Results.IPortfolioUpdate>()];
		var callbacks:Array<AccountUpdateType>;
		if( this.accountUpdateCallbacks.has(number) )
			callbacks = this.accountUpdateCallbacks.get( number );
		else
			this.accountUpdateCallbacks.set( number, callbacks=new Array<[Subject<Results.IAccountUpdate>,Subject<Results.IPortfolioUpdate>]>() );	
		callbacks.push( callback );
		this.send( msg );
		return callback;
	}
	accountUpdateUnsubscribe( requests:Map<string,AccountUpdateType> )
	{
		var unsubscribe = [];
		for( const [number,callback] of requests )
		{
			if( !this.accountUpdateCallbacks.has(number) ){ console.log( `accountUpdateCallbacks does not have '${number}'` ); 
				continue; }
			let callbacks = this.accountUpdateCallbacks.get( number );
			let index = callbacks.indexOf( <[Subject<Results.IAccountUpdate>,Subject<Results.IPortfolioUpdate>]>callback );
			if( index==-1 ){ console.log( `accountUpdateCallbacks does not have '${number}'` ); 
				continue; }
			callbacks.splice( index,1 );
			if( callbacks.length==0 )
				unsubscribe.push( number );
		}
		if( unsubscribe.length )
		{
			var transmission = new Requests.RequestTransmission(); 
			for( const number of unsubscribe )
			{
				var param = new Requests.RequestAccountUpdates( {"Subscribe": false, "AccountNumber": number} );
				var msg = new Requests.RequestUnion(); msg.AccountUpdates = param;
				transmission.Messages.push( msg );
			}
			var writer = Requests.RequestTransmission.encode( transmission );
			this.socket.next( writer.finish() );
			console.log( `accountUnsubscribe from '${unsubscribe.join()}'` );
		}
	}
	flexExecutions( account:string, date:Date ):Observable<Results.Flex>
	{

		const id = this.getRequestId();
		const param = new Requests.FlexExecutions( {"RequestId":id, "AccountNumber": account, "Date": date.getTime() / 1000} );
		let msg = new Requests.RequestUnion(); msg.FlexExecutions = param;
		this.send( msg );

		let callback = new Subject<Results.Flex>();
		this.flexCallbacks.set( id, callback );
		return callback;
	}

	getRequestId():number{ return ++this.requestId;} private requestId:number=0;
	private socket:WebSocketSubject<protobuf.Buffer>;
	private sessionId:number|Long|null;

	private reqManagedAcctsPromise:Deferred<Array<string>>;
	//private portfolioUpdateCallbacks = new Map<string,PortfolioUpdateCallback>();
	private accountUpdateCallbacks = new Map <string, Array<[Subject<Results.IAccountUpdate>,Subject<Results.IPortfolioUpdate>]>>();
	private accountUpdateMultiCallbacks = new Map<number, [AccountUpdateCallback, EndCallback]>();
	private marketDataCallbacks = new Map<number, ITicker>();
	private historicalCallbacks = new Map<number, Subject<Results.IBar>>();
	private contractCallbacks = new Map<number, Subject<Results.IContractDetails>>();
	//private contractMultiCallbacks = new Map<number, Subject<Results.IContractDetails>>();
	private optionSummaryCallbacks = new Map<number, [OptionSummaryCallback, ErrorCallback]>();
	private callbacks = new Map<number,IDeferred>();
	private flexCallbacks = new Map<number,Subject<Results.Flex>>();
}

@Injectable( {providedIn: 'root'} )
export class TwsService
{
	reqManagedAccts(): Promise<Array<string>>
	{
		if( TwsService.accounts )
			return Promise.resolve( TwsService.accounts );

		return this.connection.reqManagedAccts();
	}

	reqContractDetails( contract:IB.Contract ):Observable<Results.IContractDetails>{ return this.connection.reqContractDetails(contract); }
	reqContractDetailsMulti( contractIds:number[] ):Observable<Results.IContractDetails>{ return this.connection.reqContractDetailsMulti(contractIds); }
	reqAccountUpdates( accountNumber: string ):AccountUpdateType{ return this.connection.reqAccountUpdates( accountNumber ); }
	accountUpdateUnsubscribe( requests:Map<string,AccountUpdateType> ){ this.connection.accountUpdateUnsubscribe(requests); };
	reqMktData( contractId:number, callback:ITicker, ticks?:Requests.ETickList[], snapshot=true ):number{ return this.connection.reqMktData(contractId, callback, ticks, snapshot); }
	reqHistoricalData( contract:IB.IContract, date:Date, days:number, barSize:Requests.BarSize, display:Requests.Display, useRth:boolean, keepUpToDate:boolean ):Observable<Results.IBar>{ return this.connection.reqHistoricalData(contract, date, days, barSize, display, useRth, keepUpToDate); }
	optionSummary( contractId:number, isCall:boolean, callback:OptionSummaryCallback, date:Date, error?:ErrorCallback ):number{ return this.connection.optionSummary(contractId, isCall, callback, date, error); }
	flexExecutions( account:string, date:Date ):Observable<Results.Flex>{ return this.connection.flexExecutions(account, date); }
	request<T>( requestType:Requests.ERequests ):Promise<T>{ return this.connection.request<T>(requestType); }

	static get accounts():Array<string>{return this._accounts;} static set accounts(value:Array<string>){this._accounts=value;} private static _accounts:Array<string>;
	private get connection():Connection{if( this._connection==null ) this._connection = new Connection(); return this._connection;} private _connection:Connection;
}
