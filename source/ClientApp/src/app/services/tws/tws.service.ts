import { Injectable, Inject } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject,Observable, of, throwError } from 'rxjs';
import{ TickSubject, TickObservable } from './ITickObserver'
import {Order,OrderSubject,OrderObservable} from './IOrderObserver'
import {IErrorService} from '../error/IErrorService'


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
	constructor( private cnsl: IErrorService )
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
	onMessage( event:MessageEvent ):protobuf.Buffer
	{
		var bytearray = new Uint8Array( event.data );//new Uint8Array( event.data );
		const transmission = Results.Transmission.decode( bytearray );
		for( const message of transmission.messages )
		{
			if( message.tickPrice )
			{
				const callback = this.marketDataCallbacks.get( message.tickPrice.RequestId );
				if( callback )
					callback.price( message.tickPrice.TickType, message.tickPrice.Price, message.tickPrice.Attributes );
				else
					console.error( `no callbacks for tickPrice reqId='${message.tickPrice.RequestId}'` );//todo stop request.
			}
			else if( message.tickGeneric )
			{
				const callback = this.marketDataCallbacks.get( message.tickGeneric.RequestId );
				if( callback )
					callback.generic( message.tickGeneric.TickType, message.tickGeneric.Value );
				else
					console.error( `no callbacks for tickGeneric reqId='${message.tickGeneric.RequestId}'` );//todo stop request.
			}
			else if( message.tickSize )
			{
				const callback = this.marketDataCallbacks.get( message.tickSize.RequestId );
				if( callback )
					callback.size( message.tickSize.TickType, message.tickSize.Size );
				else
					console.error( `no callbacks for tickSize reqId='${message.tickSize.RequestId}'` );//todo stop request.
			}
			else if( message.tickString )
			{
				const callback = this.marketDataCallbacks.get( message.tickString.RequestId );
				if( callback )
					callback.string( message.tickString.TickType, message.tickString.Value );
				else
					console.error( `no callbacks for tickString reqId='${message.tickString.RequestId}'` );//todo stop request.
			}
			else if( message.orderStatus || message.openOrder )
			{
				var id = message.orderStatus ? message.orderStatus.clientId : message.openOrder.order.clientId;
				const original = this.orders.get( id );
				if( original )
				{
					if( original.callback )
					{
						if( message.orderStatus )
							original.callback.status( message.orderStatus );
						else if( message.openOrder )
							original.callback.open( message.openOrder );
					}
					if( message.orderStatus )
					{
						const display = original.setStatus( message.orderStatus );
						if( display.length )
							this.cnsl.info( display );
					}
				}
				if( this.openOrders.length )
				{
					for( let callback of this.openOrders )
					{
						if( message.orderStatus )
							callback.status( message.orderStatus );
						else if( message.openOrder )
							callback.open( message.openOrder );
					}
				}
				else if( !original )
					console.error( `no record of order status reqId='${id}'` );//todo stop request.
			}
			else if( message.accountList )
			{
				TwsService.accounts = message.accountList.Numbers;
				if( this.reqManagedAcctsPromise )
					this.reqManagedAcctsPromise.next( TwsService.accounts );
				this.reqManagedAcctsPromise = null;
			}
			else if( message.accountUpdateMulti )
			{
				const reqId = message.accountUpdateMulti.RequestId;
				const callback = this.accountUpdateMultiCallbacks.get( reqId );
				if( callback )
					callback[0]( message.accountUpdateMulti );
				else
					console.error( `no callbacks for accountUpdate accountNumber='${message.accountUpdateMulti.Account}', reqId='${reqId}'` );//todo stop request.
			}
			else if( message.accountUpdate )
			{
				const accountNumber = message.accountUpdate.Account;
				if( this.accountUpdateCallbacks.has(accountNumber) )
				{
					for( const callback of this.accountUpdateCallbacks.get(accountNumber) )
						callback[0].next( message.accountUpdate );
				}
				else
					console.error( `no callbacks for accountUpdate accountNumber='${accountNumber}'` );//todo stop request.
			}
			else if( message.portfolioUpdate )
			{
				const accountNumber = message.portfolioUpdate.AccountNumber;
				if( this.accountUpdateCallbacks.has(accountNumber) )
				{
					for( const callback of this.accountUpdateCallbacks.get(accountNumber) )
						callback[1].next( message.portfolioUpdate );
				}
				else
					console.error( `no callbacks for portfolioUpdate accountNumber='${accountNumber}'` );//todo stop request.
			}
			else if( message.contractDetails )
			{
				const id = message.contractDetails.RequestId;
				let callback = this.contractCallbacks.get( id );
				if( callback )
					callback.next( message.contractDetails );
				else
					console.error( `no callbacks for ContractDetails reqId='${id}'` );
			}
			else if( message.options )
				this.handleReceive( message.options, this.optionSummaryCallbacks, "options" );
			else if( message.historicalData )
				this.handleHistoricalData( message.historicalData );
			else if( message.error )
				this.handleError( message.error );
			else if( message.message )
			{
				var typeId = message.message.type;
				if( typeId==Results.EResults.Accept )
					this.sessionId = message.message.intValue;
				else if( typeId==Results.EResults.PositionMultiEnd )
					this.handlePositionMultiEnd( message.message.intValue );
				else if( typeId==Results.EResults.TickSnapshotEnd )
				{
					const callback = this.marketDataCallbacks.get( message.message.intValue );
					if( callback )
						callback.complete();
					else
						console.error( `no callbacks for TickPrice reqId='${message.message.intValue}'` );
				}
				else if( typeId==Results.EResults.MultiEnd )
					this.complete( this.contractCallbacks, message.message.intValue );
				else
					console.error( "unknown message id:  "+id );
			}
			else if( message.flex )
				this.handleReceive( message.flex, this.flexCallbacks, "flex" );
			else if( message.stringResult )
			{
				console.error( "message.stringResult not implemented" );
/*				if( message.StringResult.Type==Results.EResults.HistorianData || message.StringResult.Type==Results.EResults.TwitterData )
				{
					const deferred = this.callbacks.get( message.StringResult.RequestId );
					if( deferred )
						deferred.resolveGeneric( JSON.parse(message.StringResult.Value) );
					else
						console.error( `no callbacks for '${message.StringResult.Type}' reqId='${message.StringResult.RequestId}'` );//todo stop request.
				}*/
			}
			else if( message.type )
			{
				if( message.type==Results.EResults.OpenOrderEnd )
				{
					for( let callback of this.openOrders )
						callback.complete();
					this.openOrders.length = 0;
				}
			}
			else
				console.error( `unknown message type:  '${(<Results.MessageUnion>message).Value}'` );
		}
		//var tokens = msg.data.split( '\0' );
		return bytearray;
	}
	handleReceive( data, callbacks, what:string )
	{
		const callback = callbacks.get( data.id );
		if( callback )
			callback.next( data );
		else
			console.error( `no callbacks for '${what}' reqId='${data.id}'` );//todo stop request.
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
	handleConnectionError( err )
	{
		for( let [_, callback] of this.flexCallbacks.entries() )
		{
			callback.error( "Connection to Tws Websocket failed." );
			callback.complete();
		}
		this.flexCallbacks.clear();
	}
	handleError( error:Results.IError )
	{
		const id = error.RequestId;
		if( !Connection.errorIfPresent(id, this.contractCallbacks, error) )
		{
			if( this.orders.has(id) )
			{
				if( this.orders.get(id).callback )
					this.orders.get(id).callback.error( error );
				else
					this.cnsl.error( error.Message, error );
			}
			else
			{
				console.error( `error code='${error.Code}' message='${error.Message}'` );//todo stop request.
				this.cnsl.error( error.Message, error );
			}
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
		this.cnsl.error( "No longer connected to TWS.", err );
		console.error( err );
		this.handleConnectionError( err );
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
	reqManagedAccts(): Observable<string[]>
	{
		if( !this.reqManagedAcctsPromise )
		{
			this.reqManagedAcctsPromise = new Subject<string[]>();
			this.send( new Requests.RequestUnion({"genericRequests": {"type": Requests.ERequests.ManagedAccounts}}) );
		}
		return this.reqManagedAcctsPromise;
	}

	reqMktData( contractId:number, tickList:Requests.ETickList[], snapshot:boolean ):TickObservable
	{
		var id = this.getRequestId();
		var param = new Requests.RequestMrkDataSmart( {"RequestId": id, "ContractId": contractId, "TickList": tickList, "Snapshot": snapshot } );
		var msg = new Requests.RequestUnion(); msg.MrkDataSmart = param;
		this.send( msg );
		var callback = new TickSubject();
		this.marketDataCallbacks.set( id, callback );
		return callback;
	}
	cancelMktData( subscriptions:TickObservable[] ):void
	{
		let ids:number[] = [];
		for( let subscription of subscriptions )
		{
			let matched = [...this.marketDataCallbacks].find( ([key, val]) => val==subscription );
			if( matched.length )
			{
				ids.push( matched[0] );
				this.marketDataCallbacks.delete( matched[0] );
			}
			else
				console.log( "could not find reqMktData subscription." );
		}
		if( ids.length )
		{
			console.log( `cancelMktData( ${ids.join(",")} )` );
			var msg = new Requests.RequestUnion( {genericRequests:{"type": Requests.ERequests.CancelMarketData, "ids": ids}} );
			this.send( msg );
		}
	}
	reqHistoricalData( contract:IB.IContract, date:Date, days:number, barSize:Requests.BarSize, display:Requests.Display, useRth:boolean, keepUpToDate:boolean ):Observable<Results.IBar>
	{
		var id = this.getRequestId();
		var param = new Requests.RequestHistoricalData( {"RequestId": id, "Contract": contract, "Days":days, "BarSize":barSize, "Display":display, "UseRth":useRth, "KeepUpToDate":keepUpToDate, "Date": date.getTime() / 1000} );
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
		var msg = new Requests.RequestUnion( {"contractDetails":param} ); //msg.ContractDetails = param;
		this.contractCallbacks.set( id, callback );
		this.send( msg );
		return callback;
	}
	reqContractDetailsMulti( contractIds:number[] ):Observable<Results.IContractDetails>
	{
		if( !this.socket )
			return throwError( 'Not connected to Tws' );
		var callback = new Subject<Results.IContractDetails>();
		var id = this.getRequestId();
		var param = new Requests.RequestContractDetails( {"RequestId": id} );
		for( let id of contractIds )
			param.Contracts.push( new IB.Contract({"Id": id, "SecType": "STK", "Exchange": "SMART", "Currency": "USD"}) );

		var msg = new Requests.RequestUnion( {"contractDetails":param} ); //msg.ContractDetails = param;
		this.contractCallbacks.set( id, callback );
		console.log( `reqContractDetailsMulti( count=${contractIds.length} )` );
		this.send( msg );
		return callback;
	}
	optionSummary( contractId:number, isCall:boolean, callback:OptionSummaryCallback, date:Date, error?:ErrorCallback ):number
	{
		var id = this.getRequestId();
		var msg = new Requests.RequestUnion(); msg.options = new Requests.RequestOptions( {"id": id, "contractId": contractId, "isCall": isCall ? 1 : 0, "date": date ? date.getTime() / 1000 : 0} );
		this.optionSummaryCallbacks.set( id, [callback,error] );
		this.send( msg );
		return id;
	}
	request<T>( requestType:Requests.ERequests ):Promise<T>
	{
		const id = this.getRequestId();

		let deferred = new Deferred<T>();
		this.callbacks.set( id, deferred );
		let msg = new Requests.RequestUnion(); msg.genericRequests = new Requests.GenericRequests( { "type": requestType, "ids": [id] } );
		this.send( msg );
		return deferred.promise;
	}
	reqAccountUpdatesMulti( number:string, callback: AccountUpdateMultiCallback, endCallback:  (accountNumber:number)=>any ):void
	{
		var id = this.getRequestId();
		var param = new Requests.RequestAccountUpdatesMulti( {"accountNumber": number, "id": id} );
		var msg = new Requests.RequestUnion(); msg.accountUpdatesMulti = param;
		this.send( msg );
		this.accountUpdateMultiCallbacks.set( id, [callback,endCallback] );
	}

	reqAccountUpdates( number: string ):AccountUpdateType
	{
		var param = new Requests.RequestAccountUpdates( {"subscribe": true, "accountNumber": number} );
		var msg = new Requests.RequestUnion(); msg.accountUpdates = param;
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
				var param = new Requests.RequestAccountUpdates( {"subscribe": false, "accountNumber": number} );
				var msg = new Requests.RequestUnion(); msg.accountUpdates = param;
				transmission.Messages.push( msg );
			}
			var writer = Requests.RequestTransmission.encode( transmission );
			this.socket.next( writer.finish() );
			console.log( `accountUnsubscribe from '${unsubscribe.join()}'` );
		}
	}
	flexExecutions( account:string, start:Date, end:Date ):Observable<Results.Flex>
	{
		const id = this.getRequestId();
//		const param = new Requests.FlexExecutions( {"id":id, "accountNumber": account, "start": start.getTime() / 1000, "end": end.getTime() / 1000} );
		let msg = new Requests.RequestUnion( {"flexExecutions": {"id":id, "accountNumber": account, "start": start.getTime() / 1000, "end": end.getTime() / 1000}} );
		this.send( msg );

		let callback = new Subject<Results.Flex>();
		this.flexCallbacks.set( id, callback );
		return callback;
	}
	placeOrder( contract:IB.IContract, order:IB.IOrder ):OrderObservable
	{
		const id = this.getRequestId();
		let msg = new Requests.RequestUnion();
		msg.placeOrder = new Requests.PlaceOrder( {"id":id, "contract": contract, "order": order} );
		this.send( msg );

		let callback = new OrderSubject();
		this.orders.set( id, new Order(contract, order, callback) );
		return callback;
	}

	reqOpenOrders():OrderObservable
	{
		this.send( new Requests.RequestUnion({"genericRequests": {"type": Requests.ERequests.RequestOpenOrders}}) );
		let callback = new OrderSubject();
		this.openOrders.push( callback );
		return callback;
	}
	reqAllOpenOrders():OrderObservable
	{
		this.send( new Requests.RequestUnion({"genericRequests": {"type": Requests.ERequests.RequestAllOpenOrders}}) );
		let callback = new OrderSubject();
		this.openOrders.push( callback );
		return callback;
	}


	getRequestId():number{ return ++this.requestId;} private requestId:number=0;
	private socket:WebSocketSubject<protobuf.Buffer>;
	private sessionId:number|Long|null;

	private reqManagedAcctsPromise:Subject<string[]>;
	//private portfolioUpdateCallbacks = new Map<string,PortfolioUpdateCallback>();
	private accountUpdateCallbacks = new Map <string, Array<[Subject<Results.IAccountUpdate>,Subject<Results.IPortfolioUpdate>]>>();
	private accountUpdateMultiCallbacks = new Map<number, [AccountUpdateCallback, EndCallback]>();
	private marketDataCallbacks = new Map<number, TickSubject>();
	private historicalCallbacks = new Map<number, Subject<Results.IBar>>();
	private contractCallbacks = new Map<number, Subject<Results.IContractDetails>>();
	//private contractMultiCallbacks = new Map<number, Subject<Results.IContractDetails>>();
	private optionSummaryCallbacks = new Map<number, [OptionSummaryCallback, ErrorCallback]>();
	private callbacks = new Map<number,IDeferred>();
	private flexCallbacks = new Map<number,Subject<Results.Flex>>();
	private orders = new Map<number,Order>();
	private openOrders:OrderSubject[] = [];
}

@Injectable( {providedIn: 'root'} )
export class TwsService
{
	constructor( @Inject('IErrorService') private cnsl: IErrorService )
	{}
	reqManagedAccts(): Observable<string[]>{ return TwsService.accounts ? of( TwsService.accounts ) : this.connection.reqManagedAccts(); }

	reqContractDetails( contract:IB.Contract ):Observable<Results.IContractDetails>{ return this.connection.reqContractDetails(contract); }
	reqContractDetailsMulti( contractIds:number[] ):Observable<Results.IContractDetails>{ return this.connection.reqContractDetailsMulti(contractIds); }
	reqAccountUpdates( accountNumber: string ):AccountUpdateType{ return this.connection.reqAccountUpdates( accountNumber ); }
	accountUpdateUnsubscribe( requests:Map<string,AccountUpdateType> ){ this.connection.accountUpdateUnsubscribe(requests); };
	reqMktData( contractId:number, ticks?:Requests.ETickList[], snapshot=true ):TickObservable{ return this.connection.reqMktData(contractId, ticks, snapshot); }
	cancelMktData( subscriptions:TickObservable[] ):void{ this.connection.cancelMktData(subscriptions); }
	reqHistoricalData( contract:IB.IContract, date:Date, days:number, barSize:Requests.BarSize, display:Requests.Display, useRth:boolean, keepUpToDate:boolean ):Observable<Results.IBar>{ return this.connection.reqHistoricalData(contract, date, days, barSize, display, useRth, keepUpToDate); }
	optionSummary( contractId:number, isCall:boolean, callback:OptionSummaryCallback, date:Date, error?:ErrorCallback ):number{ return this.connection.optionSummary(contractId, isCall, callback, date, error); }
	flexExecutions( account:string, start:Date, end:Date ):Observable<Results.Flex>{ return this.connection.flexExecutions(account, start, end); }
	request<T>( requestType:Requests.ERequests ):Promise<T>{ return this.connection.request<T>(requestType); }
	placeOrder( contract:IB.IContract, order:IB.IOrder ):OrderObservable{ return this.connection.placeOrder(contract, order); }
	reqOpenOrders():OrderObservable{ return this.connection.reqOpenOrders(); }
	reqAllOpenOrders():OrderObservable{ return this.connection.reqAllOpenOrders(); }


	static get accounts():Array<string>{return this._accounts;} static set accounts(value:Array<string>){this._accounts=value;} private static _accounts:Array<string>;
	private get connection():Connection{if( this._connection==null ) this._connection = new Connection( this.cnsl); return this._connection;} private _connection:Connection;
}
