import { Injectable, Inject } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject,Observable, of, throwError } from 'rxjs';
import{ TickSubject, TickObservable } from './ITickObserver'
import {Order,OrderSubject,OrderObservable} from './IOrderObserver'
import {ExecutionObservable, ExecutionSubject} from './ExecutionObserver'
import {IErrorService} from '../error/IErrorService'
import { ProtoUtilities } from 'src/app/utilities/protoUtilities';


import * as ib2 from '../../proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbRequests from '../../proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;
import * as IbResults from '../../proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;


type ResolveGeneric = (any) => void;
type ClientId = number;
/*interface IDeferred
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
}*/

export interface Bar
{
	time:Date;
	high:number;
	low:number;
	open:number;
	close:number;
	wap:number;
	volume:number;
	count:number;
}

export interface ITicker
{
	onGenericTick( reqId:number, type:Results.ETickType, value:number ):void;
	onPriceTick( reqId:number, type:Results.ETickType, price:number, attributes:Results.ITickAttrib ):void;
	onSizeTick( reqId:number, type:Results.ETickType, size:number ):void;
	onStringTick( reqId:number, type:Results.ETickType, value:string ):void;
	complete(reqId:number):void;
}


export type ErrorCallback = (error: Results.IError)=>any;
export type JsonCallback<T> = ( reqId: number, result:T ) => any;
type EndCallback = (reqId: number) => any;
type AccountUpdateCallback = (accountUpdate: Results.IAccountUpdate) => any;
type AccountUpdateMultiCallback = (accountUpdate: Results.IAccountUpdateMulti)=>any;
type AccountUpdateType = [Observable<Results.IAccountUpdate>,Observable<Results.IPortfolioUpdate>];
type ContractDetailsCallback = (details: Results.IContractDetails)=>any;
class Connection
{
	constructor( private cnsl: IErrorService )
	{
		//console.log( 'Connection::Connection' );
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
		const bytearray = new Uint8Array( event.data );//new Uint8Array( event.data );
		const transmission = Results.Transmission.decode( bytearray );
		for( const message of transmission.messages )
		{
			if( message.tickPrice )
			{
				const callback = this.marketDataCallbacks.get( message.tickPrice.requestId );
				if( callback )
					callback.price( message.tickPrice.tickType, message.tickPrice.price, message.tickPrice.attributes );
				else
					console.error( `no callbacks for tickPrice reqId='${message.tickPrice.requestId}'` );//todo stop request.
			}
			else if( message.tickGeneric )
			{
				const callback = this.marketDataCallbacks.get( message.tickGeneric.requestId );
				if( callback )
					callback.generic( message.tickGeneric.tickType, message.tickGeneric.value );
				else
					console.error( `no callbacks for tickGeneric reqId='${message.tickGeneric.requestId}'` );//todo stop request.
			}
			else if( message.tickSize )
			{
				const callback = this.marketDataCallbacks.get( message.tickSize.requestId );
				if( callback )
					callback.size( message.tickSize.tickType, message.tickSize.size );
				else
					console.error( `no callbacks for tickSize reqId='${message.tickSize.requestId}'` );//todo stop request.
			}
			else if( message.tickString )
			{
				const callback = this.marketDataCallbacks.get( message.tickString.requestId );
				if( callback )
					callback.string( message.tickString.tickType, message.tickString.value );
				else
					console.error( `no callbacks for tickString reqId='${message.tickString.requestId}'` );//todo stop request.
			}
			else if( message.orderStatus || message.openOrder )
			{
				const isOrderStatus:boolean = message.orderStatus!=null;
				const orderId = isOrderStatus ? message.orderStatus.id : message.openOrder.order.id;
				const webId = isOrderStatus ? orderId : message.openOrder.webId;
				const original = this.orders.get( webId );
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
						if( display )
							this.cnsl.info( display );
					}
				}
				if( this.openOrders.length )
				{
					for( const callback of this.openOrders )
					{
						if( message.orderStatus )
							callback.status( message.orderStatus );
						else if( message.openOrder )
							callback.open( message.openOrder );
					}
				}
				else if( !original )
				{ debugger;	console.error( `(${webId}) No callbacks for ${isOrderStatus ? 'order status' : 'open order'}.` ); }
			}
			else if( message.accountList )
			{
				TwsService.accounts = message.accountList.values;
				if( this.reqManagedAcctsPromise )
					this.reqManagedAcctsPromise.next( TwsService.accounts );
				this.reqManagedAcctsPromise = null;
			}
			else if( message.accountUpdateMulti )
			{
				const reqId = message.accountUpdateMulti.requestId;
				const callback = this.accountUpdateMultiCallbacks.get( reqId );
				if( callback )
					callback[0]( message.accountUpdateMulti );
				else
					console.error( `no callbacks for accountUpdate accountNumber='${message.accountUpdateMulti.account}', reqId='${reqId}'` );//todo stop request.
			}
			else if( message.accountUpdate )
			{
				const accountNumber = message.accountUpdate.account;
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
				const accountNumber = message.portfolioUpdate.accountNumber;
				if( this.accountUpdateCallbacks.has(accountNumber) )
				{
					for( const callback of this.accountUpdateCallbacks.get(accountNumber) )
						callback[1].next( message.portfolioUpdate );
				}
				else
					console.error( `no callbacks for portfolioUpdate accountNumber='${accountNumber}'` );//todo stop request.
			}
			else if( message.commissionReport )
				this.executionCallbacks.forEach( (callback)=>callback.commissionReport(message.commissionReport) );
			else if( message.contractDetails )
			{
				const id = message.contractDetails.requestId;
				const callback = this.contractCallbacks.get( id );
				if( callback )
					callback.next( message.contractDetails );
				else
					console.error( `no callbacks for ContractDetails reqId='${id}'` );
			}
			else if( message.options )
				this.optionSummaryCallbacks.get( message.options.id ).next( message.options );
			else if( message.daySummary )
				this.previousDayCallbacks.get( message.daySummary.requestId ).next( message.daySummary );
			else if( message.fundamentals )
				this.handleFundamentals( message.fundamentals );
			else if( message.historicalData )
				this.handleHistoricalData( message.historicalData );
			else if( message.execution )
				this.executionCallbacks.get( message.execution.id )?.execution( message.execution );
			else if( message.optionParameters )
				this.optionParamCallbacks.get( message.optionParameters.underlyingContractId ).next( message.optionParameters );
			else if( message.error )
				this.handleError( message.error );
			else if( message.message )
			{
				const typeId = message.message.type;
				if( typeId==Results.EResults.Accept )
					this.sessionId = message.message.intValue;
				else if( typeId==Results.EResults.ExecutionDataEnd )
				{
					var callback = this.executionCallbacks.get( message.message.intValue );
					if( callback )
						callback.complete();
					else
						console.log( `no execution callback for '{message.message.intValue}'` );
					this.executionCallbacks.delete( message.message.intValue );
				}
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
				{
					if( !this.complete(this.contractCallbacks, message.message.intValue) )
						this.complete( this.previousDayCallbacks, message.message.intValue );
				}
				else
					console.error( "unknown message:  "+(<Results.MessageUnion>message).toJSON() );
			}
			else if( message.positionMulti )
				this.positionCallbacks.get( message.positionMulti.id )?.next( message.positionMulti );
			else if( message.flex )
				this.handleReceive( message.flex, this.flexCallbacks, "flex", true );
			else if( message.stringResult )
			{
				console.error( "message.stringResult not implemented" );
/*				if( message.StringResult.Type==Results.EResults.HistorianData || message.StringResult.Type==Results.EResults.TwitterData )
				{
					const deferred = this.callbacks.get( message.StringResult.requestId );
					if( deferred )
						deferred.resolveGeneric( JSON.parse(message.StringResult.Value) );
					else
						console.error( `no callbacks for '${message.StringResult.Type}' reqId='${message.StringResult.requestId}'` );//todo stop request.
				}*/
			}
			else if( message.type )
			{
				if( message.type==Results.EResults.OpenOrderEnd )
				{
					for( const callback of this.openOrders )
						callback.complete();
					//this.openOrders.length = 0;
				}
			}
			else
				console.error( `unknown message type:  '${(<Results.MessageUnion>message).Value}'` );
		}
		//const tokens = msg.data.split( '\0' );
		return bytearray;
	}
	handleReceive( data, callbacks, what:string, complete:boolean=false )
	{
		const callback = callbacks.get( data.id );
		if( callback )
		{
			callback.next( data );
			if( complete )
				callback.complete();
		}
		else
			console.error( `no callbacks for '${what}' reqId='${data.id}'` );//todo stop request.
	}

	handleHistoricalData( data:Results.IHistoricalData )
	{
		const id = data.requestId;
		const callback = this.historicalCallbacks.get( id );
		if( callback )
		{
			for( const bar of data.bars )
				callback.next( { time:new Date(bar.time*1000), high:ProtoUtilities.toNumber(bar.high), low:ProtoUtilities.toNumber(bar.low), open:ProtoUtilities.toNumber(bar.open), close:ProtoUtilities.toNumber(bar.close), wap:ProtoUtilities.toNumber(bar.wap), volume:ProtoUtilities.toNumber(bar.volume), count:ProtoUtilities.toNumber(bar.count)} );
			callback.complete();
		}
		else
			console.error( `no callbacks for historicalData reqId='${id}'` );
	}
	handleFundamentals( data:Results.IFundamentals )
	{
		const id = data.requestId;
		const callback = this.fundamentalCallbacks.get( id );
		if( callback )
		{
			callback[0]( data.values );
			this.fundamentalCallbacks.delete( id );
		}
		else
			console.error( `no callbacks for Fundamentals reqId='${id}'` );
	}
	static errorIfPresent( id:number, map, error:Results.IError ):boolean
	{
		const x = map.get( id );
		const isPresent = x!=null;
		if( isPresent )
			x.error( error );
		return isPresent;
	}
	handleConnectionError( err )
	{
		for( const [_, callback] of this.flexCallbacks.entries() )
		{
			callback.error( "Connection to Tws Websocket failed." );
			//callback.complete();
		}
		this.flexCallbacks.clear();
	}
	handleError( error:Results.IError )
	{
		debugger;
		const id = error.requestId;
		if( !Connection.errorIfPresent(id, this.contractCallbacks, error) )
		{
			if( this.orders.has(id) )
			{
				if( this.orders.get(id).callback )
					this.orders.get(id).callback.error( error );
				else
					this.cnsl.error( error.message, error );
			}
			else if( this.historicalCallbacks.has(id) )
			{
				this.historicalCallbacks.get( id ).error( error );
				//this.historicalCallbacks.get( id ).complete();
				this.historicalCallbacks.delete( id );
			}
			else if( this.optionParamCallbacks.has(id) )
			{
				this.optionParamCallbacks.get( id ).error( error );
				this.optionParamCallbacks.delete( id );
			}
			else if( this.previousDayCallbacks.has(id) )
			{
				this.previousDayCallbacks.get( id )?.error( error );
				this.previousDayCallbacks.delete( id );
			}
			else
			{
				console.error( `error code='${error.code}' message='${error.message}'` );//todo stop request.
				this.cnsl.error( error.message, error );
			}
		}
	}

	handlePositionMultiEnd( reqId:number )
	{
		const callback = this.accountUpdateMultiCallbacks.get( reqId );
		if( callback )
		{
			if( callback[1] )
				callback[1]( reqId );
		}
		else
		{
			const callback2 = this.positionCallbacks.get( reqId );
			if( callback2 )
				callback2.next( null );
			else if( callback2==null )
				this.positionCallbacks.delete( reqId );
			else
				console.error( "unknown PositionMultiEnd request:  "+reqId );
		}
	}
	complete( map, reqId:number )
	{
		const haveValue = map.has( reqId );
		if( haveValue )
		{
			map.get(reqId).complete();
			map.delete( reqId );
		}
		return haveValue;
	}

	addMessage( msg ):void
	{
		//this.loggingService.log( msg );
		//this.loggingService.
	}
	error( err ):void
	{
		debugger;
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
		const transmission = new Requests.RequestTransmission(); transmission.messages.push( request );
		const writer = Requests.RequestTransmission.encode( transmission );
		this.socket.next( writer.finish() );//'17\0'+'1\0'
	}
	reqManagedAccts(): Observable<{ [k: string]: string }>
	{
		if( !this.reqManagedAcctsPromise )
		{
			this.reqManagedAcctsPromise = new Subject<{ [k: string]: string }>();
			this.send( new Requests.RequestUnion({"genericRequests": {"type": Requests.ERequests.ManagedAccounts}}) );
		}
		return this.reqManagedAcctsPromise;
	}

	reqMktData( contractId:number, tickList:Requests.ETickList[], snapshot:boolean ):TickObservable
	{
		const id = this.getRequestId();
		console.log( `(${id})RequestMrkDataSmart( ${contractId}, [${tickList.join()}])` );
		const param = new Requests.RequestMrkDataSmart( {"id": id, "contractId": contractId, "tickList": tickList, "snapshot": snapshot } );
		const msg = new Requests.RequestUnion(); msg.marketDataSmart = param;
		this.send( msg );
		const callback = new TickSubject();
		this.marketDataCallbacks.set( id, callback );
		return callback;
	}
	cancelMktData( subscriptions:IterableIterator<TickObservable> ):void
	{
		const ids:number[] = [];
		for( const subscription of subscriptions )
		{
			const matched = [...this.marketDataCallbacks].find( ([key, val]) => val==subscription );
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
			const msg = new Requests.RequestUnion( {genericRequests:{"type": Requests.ERequests.CancelMarketData, "ids": ids}} );
			this.send( msg );
		}
	}
	cancelOrder(id:number):void
	{
		this.send( {genericRequests:{"type": Requests.ERequests.CancelOrder, "ids": [id]}} );
	}
	reqExecutions( query:Requests.IRequestExecutions ):ExecutionObservable
	{
		query.id = this.getRequestId();
		this.send( new Requests.RequestUnion({"requestExecutions": query}) );
		const callback = new ExecutionSubject();
		this.executionCallbacks.set( query.id, callback );
		return callback;
	}
	reqFundamentals( contractId:number ):Promise<{ [k: string]: number }>
	{
		const id = this.getRequestId();
		this.send( new Requests.RequestUnion({"genericRequests": {"requestId": id,"type": Requests.ERequests.RequestFundamentalData, "ids":[contractId]}}) );
		return new Promise<{ [k: string]: number }>( (resolve,reject)=>
		{
			this.fundamentalCallbacks.set( id, [resolve,reject] );
		});
	}
	reqHistoricalData( contract:IB.IContract, date:Date, days:number, barSize:Requests.BarSize, display:Requests.Display, useRth:boolean, keepUpToDate:boolean ):Observable<Bar>
	{
		const id = this.getRequestId();
		const param = new Requests.RequestHistoricalData( {"id": id, "contract": contract, "days":days, "barSize":barSize, "display":display, "useRth":useRth, "keepUpToDate":keepUpToDate, "date": date.getTime() / 1000} );
		const msg = new Requests.RequestUnion(); msg.historicalData = param;
		console.log( `(${id})RequestHistoricalData( '${contract.id} - end:${date} for ${days}D ${Requests.BarSize[barSize]} ${Requests.Display[display]} useRth:${useRth}, keepUpToDate:${keepUpToDate}` );
		this.send( msg );
		const callback = new Subject<Bar>();
		this.historicalCallbacks.set( id, callback );
		return callback;
	}
	reqContractDetails( contract:IB.IContract ):Observable<Results.IContractDetails>
	{
		const callback = new Subject<Results.IContractDetails>();
		const id = this.getRequestId();
		console.log( `reqContractDetails:  ${contract.symbol ? contract.symbol : contract.id}`)
		const param = new Requests.RequestContractDetails( {"id": id} ); param.contracts.push( contract );
		const msg = new Requests.RequestUnion( {"contractDetails":param} ); //msg.ContractDetails = param;
		this.contractCallbacks.set( id, callback );
		this.send( msg );
		return callback;
	}
	reqContractDetailsMulti( contractIds:number[] ):Observable<Results.IContractDetails>
	{
		if( !this.socket )
			return throwError( 'Not connected to Tws' );
		const callback = new Subject<Results.IContractDetails>();
		const id = this.getRequestId();
		const param = new Requests.RequestContractDetails( {"id": id} );
		for( const id of contractIds )
			param.contracts.push( new IB.Contract({"id": id, "securityType": "STK", "exchange": "SMART", "currency": "USD"}) );

		const msg = new Requests.RequestUnion( {"contractDetails":param} ); //msg.ContractDetails = param;
		this.contractCallbacks.set( id, callback );
		console.log( `reqContractDetailsMulti( count=${contractIds.length} )` );
		this.send( msg );
		return callback;
	}
	optionSummary( contractId:number, optionType:number, startExpiration:number, endExpiration:number, startStrike:number, endStrike:number ):Observable<Results.IOptionValues>
	{
		const id = this.getRequestId();
		//const a = new Requests.RequestOptions(); a.contractId = contractId; a.id=id; a.securityType=2;	a.day2=date;
		//this.send( {"options": a} );
		this.send( {"options": {"id": id, "contractId": contractId, "securityType": optionType, "startExpiration": startExpiration, "endExpiration": endExpiration, "startSrike": startStrike, "endStrike": endStrike }} );
		const callback = new Subject<Results.IOptionValues>();
		this.optionSummaryCallbacks.set( id, callback );
		return callback;
	}
/*	request<T>( requestType:Requests.ERequests ):Promise<T>
	{
		const id = this.getRequestId();

		const deferred = new Deferred<T>();
		this.callbacks.set( id, deferred );
		const msg = new Requests.RequestUnion(); msg.genericRequests = new Requests.GenericRequests( { "type": requestType, "ids": [id] } );
		this.send( msg );
		return deferred.promise;
	}*/
	reqAccountUpdatesMulti( number:string, callback: AccountUpdateMultiCallback, endCallback:  (accountNumber:number)=>any ):void
	{
		const id = this.getRequestId();
		const param = new Requests.RequestAccountUpdatesMulti( {"accountNumber": number, "id": id} );
		const msg = new Requests.RequestUnion(); msg.accountUpdatesMulti = param;
		this.send( msg );
		this.accountUpdateMultiCallbacks.set( id, [callback,endCallback] );
	}

	reqAccountUpdates( number: string ):AccountUpdateType
	{
		const param = new Requests.RequestAccountUpdates( {"subscribe": true, "accountNumber": number} );
		const msg = new Requests.RequestUnion(); msg.accountUpdates = param;
		const callback:[Subject<Results.IAccountUpdate>,Subject<Results.IPortfolioUpdate>] = [new Subject<Results.IAccountUpdate>(),new Subject<Results.IPortfolioUpdate>()];
		let callbacks:Array<AccountUpdateType>;
		if( this.accountUpdateCallbacks.has(number) )
			callbacks = this.accountUpdateCallbacks.get( number );
		else
			this.accountUpdateCallbacks.set( number, callbacks=new Array<[Subject<Results.IAccountUpdate>,Subject<Results.IPortfolioUpdate>]>() );
		callbacks.push( callback );
		this.send( msg );
		return callback;
	}
	reqPositions( accountNumber: string ):Subject<Results.IPositionMulti>
	{
		const id = this.getRequestId();
		console.log( `(${id})reqPositions( '${accountNumber}' )` );
		const callback = new Subject<Results.IPositionMulti>();
		this.positionCallbacks.set( id, callback );
		this.send( new Requests.RequestUnion({"requestPositions":{"id": id, "accountNumber": accountNumber}}) );
		return callback;
	}
	cancelPositions( subscription: Observable<Results.IPositionMulti> ):void
	{
		const matched = [...this.positionCallbacks].find( ([key, val]) => val==subscription );
		if( matched.length )
		{
			const id = matched[0];
			console.log( `(${id})cancelPositions()` );
			this.send( new Requests.RequestUnion({genericRequests:{"type": Requests.ERequests.CancelPositionsMulti, "ids": [id]}}) );
			this.positionCallbacks.set( id, null );
		}
		else
			console.error( "could not find position subscription." );
	}

	accountUpdateUnsubscribe( number, callback )
	{
		try
		{
			if( !this.accountUpdateCallbacks.has(number) )
				throw `accountUpdateCallbacks does not have '${number}'`;
			const callbacks = this.accountUpdateCallbacks.get( number );
			const index = callbacks.indexOf( <[Subject<Results.IAccountUpdate>,Subject<Results.IPortfolioUpdate>]>callback );
			if( index==-1 )
				throw `accountUpdateCallbacks does not have '${number}'`;
			callbacks.splice( index,1 );
			if( callbacks.length==0 )
			{
				const transmission = new Requests.RequestTransmission();
				const param = new Requests.RequestAccountUpdates( {"subscribe": false, "accountNumber": number} );
				const msg = new Requests.RequestUnion(); msg.accountUpdates = param;
				transmission.messages.push( msg );
				const writer = Requests.RequestTransmission.encode( transmission );
				this.socket.next( writer.finish() );
				console.log( `accountUnsubscribe from '${number}'` );
			}
		}
		catch( e )
		{
			console.log( e );
		}
	}
	accountUpdatesUnsubscribe( requests:Map<string,AccountUpdateType> )
	{
		for( const [number,callback] of requests )
			this.accountUpdateUnsubscribe( number, callback );
	}
	flexExecutions( account:string, start:Date, end:Date ):Observable<Results.Flex>
	{
		const id = this.getRequestId();
//		const param = new Requests.FlexExecutions( {"id":id, "accountNumber": account, "start": start.getTime() / 1000, "end": end.getTime() / 1000} );
		const msg = new Requests.RequestUnion( {"flexExecutions": {"id":id, "accountNumber": account, "start": start.getTime() / 1000, "end": end.getTime() / 1000}} );
		this.send( msg );

		const callback = new Subject<Results.Flex>();
		this.flexCallbacks.set( id, callback );
		return callback;
	}
	placeOrder( contract:IB.IContract, order:IB.IOrder, stop:number, stopLimit:number ):OrderObservable
	{
		const id = this.getRequestId();
		console.log( `(${id})placeOrder( ${contract.symbol}x${(order.isBuy ? 1 : -1)*order.quantity}@${order.limit} )` );
		this.send( new Requests.RequestUnion({placeOrder: {"id":id, "contract": contract, "order": order, stop:stop, stopLimit:stopLimit}}) );

		const callback = new OrderSubject();
		this.orders.set( id, new Order(contract, order, callback) );
		return callback;
	}

	reqOpenOrders():OrderObservable
	{
		this.send( new Requests.RequestUnion({"genericRequests": {"type": Requests.ERequests.RequestOpenOrders}}) );
		const callback = new OrderSubject();
		this.openOrders.push( callback );
		return callback;
	}
	reqAllOpenOrders():OrderObservable
	{
		this.send( new Requests.RequestUnion({"genericRequests": {"type": Requests.ERequests.RequestAllOpenOrders}}) );
		const callback = new OrderSubject();
		this.openOrders.push( callback );
		return callback;
	}
	reqOptionParams( id:number ):Observable<Results.IOptionParams>
	{
		this.send( new Requests.RequestUnion({"genericRequests": {"type": Requests.ERequests.RequestOptionParams, "ids": [id]}}) );
		const callback = new Subject<Results.IOptionParams>();
		this.optionParamCallbacks.set( id, callback );
		return callback;
	}
	reqPreviousDay( ids:number[] ):Observable<Results.IDaySummary>
	{
		const requestId = this.getRequestId();
		this.send( new Requests.RequestUnion({"genericRequests": {"requestId": requestId, "type": Requests.ERequests.RequsetPrevOptionValues, "ids": ids}}) );
		const callback = new Subject<Results.IDaySummary>();
		this.previousDayCallbacks.set( requestId, callback );
		return callback;
	}
	getRequestId():number{ return ++this.requestId;} private requestId:number=0;
	private socket:WebSocketSubject<protobuf.Buffer>;
	private sessionId:number|Long|null;

	private reqManagedAcctsPromise:Subject<{ [k: string]: string }>;
	//private portfolioUpdateCallbacks = new Map<string,PortfolioUpdateCallback>();
	private accountUpdateCallbacks = new Map <string, Array<[Subject<Results.IAccountUpdate>,Subject<Results.IPortfolioUpdate>]>>();
	private accountUpdateMultiCallbacks = new Map<number, [AccountUpdateCallback, EndCallback]>();
	private marketDataCallbacks = new Map<number, TickSubject>();
	private positionCallbacks = new Map<number,Subject<Results.IPositionMulti>>();
	private contractCallbacks = new Map<number, Subject<Results.IContractDetails>>();
	private executionCallbacks = new Map<number,ExecutionSubject>();
	private fundamentalCallbacks = new Map<number, [(x:{ [k: string]: number })=>void,(x:Results.IError)=>void]>(); //[({ [k: string]: number })=>void, (Results.IError)=>void]>();
	private historicalCallbacks = new Map<number, Subject<Bar>>();
	//private contractMultiCallbacks = new Map<number, Subject<Results.IContractDetails>>();
	private optionSummaryCallbacks  = new Map<number, Subject<Results.IOptionValues>>();
	//private callbacks = new Map<number,IDeferred>();
	private flexCallbacks = new Map<number,Subject<Results.Flex>>();
	private optionParamCallbacks = new Map<number, Subject<Results.IOptionParams>>();
	private previousDayCallbacks = new Map<number, Subject<Results.IDaySummary>>();
	private orders = new Map<number,Order>();
	private openOrders:OrderSubject[] = [];
}

@Injectable( {providedIn: 'root'} )
export class TwsService
{
	constructor( @Inject('IErrorService') private cnsl: IErrorService )
	{}
	reqManagedAccts(): Observable<{ [k: string]: string }>{ return TwsService.accounts ? of( TwsService.accounts ) : this.connection.reqManagedAccts(); }

	reqContractDetails( contract:IB.IContract ):Observable<Results.IContractDetails>{ return this.connection.reqContractDetails(contract); }
	reqContractDetailsMulti( contractIds:number[] ):Observable<Results.IContractDetails>{ return this.connection.reqContractDetailsMulti(contractIds); }
	reqAccountUpdates( accountNumber: string ):AccountUpdateType{ return this.connection.reqAccountUpdates( accountNumber ); }
	reqPositions( accountNumber: string ):Observable<Results.IPositionMulti>{ return this.connection.reqPositions( accountNumber ); }
	cancelPositions( subscription: Observable<Results.IPositionMulti> ):void{ return this.connection.cancelPositions( subscription ); }
	accountUpdatesUnsubscribe( requests:Map<string,AccountUpdateType> ){ this.connection.accountUpdatesUnsubscribe(requests); };
	accountUpdateUnsubscribe( accountId:string, request:AccountUpdateType ){ this.connection.accountUpdateUnsubscribe(accountId,request); };
	reqMktData( contractId:number, ticks?:Requests.ETickList[], snapshot=true ):TickObservable{ return this.connection.reqMktData(contractId, ticks, snapshot); }
	cancelMktData( subscriptions:IterableIterator<TickObservable> ):void{ this.connection.cancelMktData(subscriptions); }
	reqExecutions( query:Requests.IRequestExecutions=new Requests.RequestExecutions() ):ExecutionObservable{ return this.connection.reqExecutions( query ); }
	reqFundamentals( contractId:number ):Promise<{ [k: string]: number }>{ return this.connection.reqFundamentals( contractId ); }
	reqHistoricalData( contract:IB.IContract, date:Date, days:number, barSize:Requests.BarSize, display:Requests.Display, useRth:boolean, keepUpToDate:boolean ):Observable<Bar>{ return this.connection.reqHistoricalData(contract, date, days, barSize, display, useRth, keepUpToDate); }
	optionSummary( contractId:number, optionType:number, startExpiration:number, endExpiration:number, startStrike:number, endStrike:number ):Observable<Results.IOptionValues>{ return this.connection.optionSummary(contractId, optionType, startExpiration, endExpiration, startStrike, endStrike); }
	flexExecutions( account:string, start:Date, end:Date ):Observable<Results.Flex>{ return this.connection.flexExecutions(account, start, end); }
	//request<T>( requestType:Requests.ERequests ):Promise<T>{ return this.connection.request<T>(requestType); }
	placeOrder( contract:IB.IContract, order:IB.IOrder, stop:number, stopLimit:number ):OrderObservable{ return this.connection.placeOrder(contract, order, stop, stopLimit); }
	reqOpenOrders():OrderObservable{ return this.connection.reqOpenOrders(); }
	reqAllOpenOrders():OrderObservable{ return this.connection.reqAllOpenOrders(); }
	reqOptionParams(underlyingId:number):Observable<Results.IOptionParams>{ return this.connection.reqOptionParams(underlyingId); }
	reqPreviousDay(ids:number[]):Observable<Results.IDaySummary>{ return this.connection.reqPreviousDay(ids); }
	cancelOrder(id:number):void{ this.connection.cancelOrder( id ); }

	static get accounts():{ [k: string]: string }{return this._accounts;} static set accounts(value:{ [k: string]: string }){this._accounts=value;} private static _accounts:{ [k: string]: string };
	private get connection():Connection{if( this._connection==null ) this._connection = new Connection( this.cnsl); return this._connection;} private _connection:Connection;
}
