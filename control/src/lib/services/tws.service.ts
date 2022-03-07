import { Injectable, Inject } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject,Observable, of, throwError } from 'rxjs';
import{ TickSubject, TickObservable } from './ITickObserver'
import {Order,OrderSubject,OrderObservable} from './IOrderObserver'
import {ExecutionObservable, ExecutionSubject} from './ExecutionObserver'
import { IErrorService, ProtoUtilities } from 'jde-framework';
import {ObservableUtilities} from '../utilities/ObservableUtilities';
import { Table, IGraphQL, Mutation, DateUtilities } from 'jde-framework';
import { ContractPK, MarketUtilities } from '../utilities/marketUtilities';

import * as ib2 from 'jde-cpp/ib'; import IB = ib2.Jde.Markets.Proto;
import * as IbRequests from 'jde-cpp/requests'; import Requests = IbRequests.Jde.Markets.Proto.Requests;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbWatch from 'jde-cpp/watch'; import Watch = IbWatch.Jde.Markets.Proto.Watch;
import * as Edgar2 from 'jde-cpp/edgar'; import Edgar = Edgar2.Jde.Markets.Edgar.Proto;
import { IAuth } from 'jde-material';

type StringMap = { [k: string]: string };
type Cik = number;
export interface IBar
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
type GetResult = (result:Results.IMessageUnion)=>any;//gets the result, null if not same message.
type Resolve = (x:any)=>void;
type IsComplete=(x:any)=>boolean;
type Reject = (x:Results.IError)=>void;
type TransformInput = (x:any)=>any;

export class RequestPromise
{
	constructor( public result:GetResult, public resolve:Resolve, public reject:Reject, public transformInput:TransformInput=null )
	{}
}

export class RequestObservable
{
	constructor( public result:GetResult, public next:Resolve, public complete:IsComplete, public reject:Reject, public transformInput:TransformInput=null )
	{}
};

export type ErrorCallback = (error: Results.IError)=>any;
export type JsonCallback<T> = ( reqId: number, result:T ) => any;
type EndCallback = (reqId: number) => any;
type AccountUpdateCallback = (accountUpdate: Results.IAccountUpdate) => any;
type AccountUpdateMultiCallback = (accountUpdate: Results.IAccountUpdateMulti)=>any;
type AccountUpdateType = [Observable<Results.IAccountUpdate>,Observable<Results.IPortfolioUpdate>];
class Connection
{
	constructor( private cnsl: IErrorService )
	{
		this.socket = webSocket<protobuf.Buffer>( {url: 'ws://localhost:6812', deserializer: msg => this.onMessage(msg), serializer: msg=>msg, binaryType:"arraybuffer"} );
		this.socket.subscribe(
			( msg ) => this.addMessage( msg ),
			( err ) => this.error( err ),
			() => this.socketComplete()
		);
	}
	onMessage( event:MessageEvent ):protobuf.Buffer
	{
		const bytearray = new Uint8Array( event.data );
		const transmission = Results.Transmission.decode( bytearray );
		for( const message of <Results.MessageUnion[]>transmission.messages )
		{
			try
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
					{
						callback.generic( message.tickGeneric.tickType, message.tickGeneric.value );
					}
					else
						console.error( `no callbacks for tickGeneric reqId='${message.tickGeneric.requestId}'` );//todo stop request.
				}
				else if( message.tickSize )
				{
					const callback = this.marketDataCallbacks.get( message.tickSize.requestId );
					if( callback )
						callback.size( message.tickSize.tickType, message.tickSize.size );
					else
					{
						console.error( `no callbacks for tickSize reqId='${message.tickSize.requestId}'` );
						this.cancelMarketData( [message.tickSize.requestId] );
					}
				}
				else if( message.tickString )
				{
					const callback = this.marketDataCallbacks.get( message.tickString.requestId );
					if( callback )
						callback.string( message.tickString.tickType, message.tickString.value );
					else
						console.log( `no callbacks for tickString reqId='${message.tickString.requestId}'` );//todo stop request.
				}
				else if( message.optionCalculation )
				{
					const x = message.optionCalculation;
					const callback = this.marketDataCallbacks.get( x.requestId );
					if( callback )
						callback.optionCalculation( x.tickType, x.priceBased, x.impliedVolatility, x.delta, x.optionPrice, x.pvDividend, x.gamma, x.vega, x.theta, x.underlyingPrice )
					else
						this.cancelMarketData( [x.requestId], `(${x.requestId})no callbacks for optionCalculation` );
				}
				else if( message.orderUpdate )
				{
					let p = this.orders.get( message.orderUpdate.status.orderId );
					console.log( `(${message.orderUpdate.status.orderId}) order update existing=${p ? true : false}` );
					if( p )
					{
						p.setStatus( message.orderUpdate.status );
						p.state = message.orderUpdate.state;
					}
					else
						this.addOrder( message.orderUpdate );
				}
				else if( message.orderStatus || message.openOrder )
				{
					const isOrderStatus:boolean = message.orderStatus!=null;
					const orderId = isOrderStatus ? message.orderStatus.id : message.openOrder.order.id;
					let original:Order;
					if( message.openOrder.requestId && message.openOrder.requestId!=orderId )//result from placeOrder.
					{
						original = this.orders.get( message.openOrder.requestId );
						this.orders.set( orderId, original );
						this.orders.delete( message.openOrder.requestId );
					}
					else
						original = this.orders.get( orderId );
					if( original )
					{
						if( original.callback )
						{
							if( message.orderStatus )
								original.callback.status( message.orderStatus );
							else if( message.openOrder )
								original.callback.open( message.openOrder );
						}
						if( isOrderStatus )
						{
							const display = original.setStatus( message.orderStatus );
							if( display )
								console.info( display );
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
						console.error( `(${orderId}) No callbacks for ${isOrderStatus ? 'order status' : 'open order'}.` );
				}
				else if( message.stringMap )
				{
					var result = message.stringMap.result;
					console.log( `${Results.EResults[result]} = ${Object.keys(message.stringMap.values).length} records` )
					let promises = this.stringMapPromises.get( message.stringMap.result );
					if( promises )
					{
						for( let promise of promises )
							promise[0]( message.stringMap.values );
					}
					else
						console.log( `no listener for stringmap ${Results[message.stringMap.result]}` );
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
						callback.next( message.contractDetails.details );
					else if( this.callbacks.has(id) )
					{
						this.callbacks.get( id ).resolve( message.contractDetails.details );
						//this.callbacks.delete( id );MultiEnd
					}
				}
				else if( message.options )
					this.optionSummaryCallbacks.get( message.options.id )[0]( message.options );
				else if( message.daySummary )
				{
					const x = message.daySummary;
					if( this.log.results ) console.log( `(${x.requestId}) ${DateUtilities.displayDay(x.day)} - ${x.open} ${x.low}-${x.high} ${x.close}`)
					const c = this.previousDayCallbacks.get( x.requestId );
					if( c )
						c.next( x );
					else
						console.error( `(${x.requestId})Could not find previousDayCallbacks.` );
				}
				else if( message.fundamentals )
					this.handleFundamentals( message.fundamentals );
				else if( message.execution )
					this.executionCallbacks.get( message.execution.id )?.execution( message.execution );
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
						const id = message.message.intValue;
						if( !this.complete( this.contractCallbacks, id, "contractCallbacks" )
							&& !this.complete( this.previousDayCallbacks, message.message.intValue, "previousDayCallbacks") )
						{
							if( this.fundamentalCallbacks.has(id) )
								this.fundamentalCallbacks.delete( id ); //MultiEnd
							else if( this.callbacks.has(id) )
								this.callbacks.delete( id );
							else
								console.log( `(${message.message.intValue})no callbacks for MultiEnd` );
						}
					}
					else if( typeId==Results.EResults.AccountDownloadEnd )
					{
						const accountNumber = message.message.stringValue;
						if( this.accountUpdateCallbacks.has(accountNumber) )
						{
							for( const callback of this.accountUpdateCallbacks.get(accountNumber) )
								callback[1].next( null );//message.portfolioUpdate
						}
						else
							console.error( `no callbacks for portfolioUpdate accountNumber='${accountNumber}'` );//todo stop request.
					}
					else if( message.message.intValue && this.callbacks.has(message.message.intValue) )
					{
						this.callbacks.get( message.message.intValue ).resolve( true );
						this.callbacks.delete( message.message.intValue );
					}
					else if( typeId==Results.EResults.Authentication )
					{
						if( message.message.stringValue )
						{
							this.callbacks.get( +message.message.stringValue ).reject( {requestId: +message.message.stringValue, code: -1, message: "Could not authenticate"} );
							this.callbacks.delete( +message.message.stringValue );
						}
					}
					else
					{
						debugger;
						console.error( "unknown message:  "+message.toJSON() );
					}
				}
				else if( message.positionMulti )
					this.positionCallbacks.get( message.positionMulti.id )?.next( message.positionMulti );
				else if( message.flex )
					this.handleReceive( message.flex, this.flexCallbacks, "flex", true );
				else if( message.stringResult )
				{
					const r = message.stringResult;
					var id =r.id;
					if( this.callbacks.has(id) )
					{
						//if( message.type==Results.EResults.Query )
						console.log( `(${r.id})${Results.EResults[r.type]} c=${r.value.length}` );
						let x =  this.callbacks.get( id );
						x.resolve( x.transformInput(r) );
						this.callbacks.delete( id );
					}
					else
						console.error( "message.stringResult not implemented" );
				}
				else if( message.type )
				{
					if( message.type==Results.EResults.OpenOrderEnd )
					{
						for( const callback of this.openOrders )
							callback.complete();
					}
				}
				else
				{
					let found = false;
					for( let [id,requestPromise] of this.callbacks )
					{
						let messageValue = requestPromise.result ? requestPromise.result( message ) : null;
						found = messageValue && messageValue["requestId"]==id;
						if( !found )
							continue;
						if( message.orders )
						{
							console.log( `(${message.orders.requestId}) message.orders` );
							for( const o of message.orders.orders )
							{
								const original = this.orders.get( o.order.id );
								if( original )
									original.state = o.state;
								else
									this.orders.set( o.order.id, new Order(o.contract, o.order, o.state) );
							}
							messageValue = [...this.orders.values()];
						}
						if( this.log.results ) console.log( `(${id})Results=${messageValue.constructor.name}` );
						requestPromise.resolve( requestPromise.transformInput ? requestPromise.transformInput(messageValue) : messageValue );
						//complete?
						this.callbacks.delete( id );
						break;
					}
					if( !found )
					{
						for( let [id,observer] of this.observers )
						{
							const messageValue = observer.result( message );
							found = messageValue && messageValue["requestId"]==id;
							if( !found )
								continue;

							if( observer.complete(messageValue) )
								this.observers.delete( id );
							else
								observer.next( observer.transformInput ? observer.transformInput(messageValue) : messageValue );
							break;
						}
					}
					if( !found )
						console.error( `unknown message:  ${JSON.stringify( message[message.Value] )}` );
				}
			}
			catch( e )
			{
				console.error( e );
			}
		}
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

	async addOrder( u:Results.IOrderUpdate )
	{
		let o = await this.reqOrder( u.status.orderId );
	}
	async reqOrder( id:number )
	{
		const o = await this.sendGenericPromise<Results.IOpenOrder>( Requests.ERequests.Order, id, (m)=>m.openOrder, null );
		this.orders.set( id, new Order( o.contract, o.order) );
	}
	handleFundamentals( data:Results.IFundamentals )
	{
		const id = data.requestId;
		const callback = this.fundamentalCallbacks.get( id );
		if( callback )
		{
			console.log( `${id} fundamentals( length=${Object.keys(data.values).length} )`)
			callback[0]( data.values );
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
			callback.error( "Connection to Tws Websocket failed." );
		this.flexCallbacks.clear();
		for( const [requestId, callback] of this.callbacks.entries() )
			callback.reject( {requestId: requestId, code:-1, message:"Connection to Tws Websocket failed."} );
	}

	checkRequestType( typeRequests:Map<number, RequestPromise>, id:number, e:Results.IError ):boolean
	{
		const handled = typeRequests.has( id );
		if( handled )
		{
			if( typeRequests.get( id ).reject )
				typeRequests.get( id ).reject( e );
			else
			{
				console.log( `(${id})${e.message}` )
				this.cnsl.error( e.message );
			}
			typeRequests.delete( id );
		}
		return handled;
	}

	handleError( error:Results.IError )
	{
		//debugger;
		const id = error.requestId;
		console.log( `(${id})${error.code} - ${error.message}` );
		if( Connection.errorIfPresent(id, this.contractCallbacks, error) )
			()=>{};//noop
		else if( this.orders.has(id) )
		{
			if( this.orders.get(id).callback )
				this.orders.get(id).callback.error( error );
			else
				console.error( error.message, error );
		}
		else if( this.previousDayCallbacks.has(id) )
		{
			this.previousDayCallbacks.get( id )?.error( error );
			console.log( `(${id}) - removing previousDayCallbacks` );
			this.previousDayCallbacks.delete( id );
		}
		else if( this.generalCallbacks.has(id) )
		{
			this.generalCallbacks.get( id )[1]( error );
			this.generalCallbacks.delete( id );
		}
		else if( this.fundamentalCallbacks.has(id) )
		{
			this.fundamentalCallbacks.get( id )[1]( error );
			//this.fundamentalCallbacks.delete( id ); MultiEnd
		}
		else if( this.observers.has(id) )
		{
			this.observers.get( id ).reject( error );
			this.observers.delete( id );
		}
		else if( this.marketDataCallbacks.has(id) )
		{
			const callback = this.marketDataCallbacks.get( id );
			callback.error( error );
			this.marketDataCallbacks.delete( id );
		}
		else if( this.flexCallbacks.get(id) )
		{
			const callback = this.flexCallbacks.get( id );
			callback.error( error );
			this.flexCallbacks.delete( id );
		}
		else
		{
			var requestsTypes:Map<number, RequestPromise>[] = [ this.callbacks, this.optionParamCallbacks ];
			let handled = false;
			for( let i=0; i<requestsTypes.length && !handled; ++i )
				handled = this.checkRequestType( requestsTypes[i], id, error );
			if( !handled )
				console.error( `error code='${error.code}' message='${error.message}'` );//todo stop request.
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
	complete( map, id:number, what )
	{
		const haveValue = map.has( id );
		if( haveValue )
		{
			let x = map.get( id );
			x.complete();
			map.delete( id ); //console.log( `(${id}) deleted ${what}` );
		}
		return haveValue;
	}

	addMessage( msg ):void
	{
	}
	error( err ):void
	{
	//	debugger;
		this.sessionId = null;
		console.log( "No longer connected to TWS.", err );
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
	private stringMapPromise( request:Requests.ERequests, result:Results.EResults):Promise<StringMap>
	{
		console.log( `${Requests.ERequests[request]}()` );
		let promises = this.stringMapPromises.get( result );
		if( !promises )
			this.stringMapPromises.set( result, promises = new Array<[(x:StringMap)=>void,(x:Results.IError)=>void]>() );

		this.send( new Requests.RequestUnion({genericRequests: {type: request}}) );
		return this.sessionId!==null ? new Promise<StringMap>( (resolve,reject)=>{ promises.push( [resolve,reject] ); }) : Promise.reject( "no longer connected" );
	}

	reqManagedAccts(): Promise<StringMap>{  return this.stringMapPromise(Requests.ERequests.ManagedAccounts, Results.EResults.ManagedAccounts); }
	reqNewsProviders():Promise<StringMap>{ return this.stringMapPromise(Requests.ERequests.ReqNewsProviders, Results.EResults.NewsProviders); }

	reqMktData( contractId:number, tickList:Requests.ETickList[], snapshot:boolean ):TickObservable
	{
		const id = contractId; //this.getRequestId()
		console.log( `(${id})reqMktData( [${tickList.join()}] )` );
		const param = new Requests.RequestMrkDataSmart( {id: id, contractId: contractId, tickList: tickList, snapshot: snapshot} );
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
			if( matched )
			{
				ids.push( matched[0] );
				this.marketDataCallbacks.delete( matched[0] );
			}
			else
				console.log( "could not find reqMktData subscription." );
		}
		if( ids.length )
			this.cancelMarketData( ids );
	}
	averageVolume( contractIds:number[] ):Observable<Results.ContractValue>
	{
		const id = this.getRequestId();
		console.log( `(${id})averageVolume( ${contractIds.join(",")} )` );
		const msg = new Requests.RequestUnion( {genericRequests:{id: id, type: Requests.ERequests.AverageVolume, ids: contractIds}} );
		const callback = new Subject<Results.ContractValue>();
//		let complete = contractIds.length==1 ? ()=>true : (v)=>!v.contractId;
		var observable = new RequestObservable( (m)=>m.contractValue, (v:Results.ContractValue)=>callback.next(v), (v)=>
		{
			const c = contractIds.length==1 || !v.contractId;
			if( c && v.contractId )
				callback.next( v );
			if( c )
				callback.complete();
			return c;
		}, (e)=>callback.error(e) );
		this.observers.set( id, observable );
		this.send( msg );
		return callback;
	}
	private cancelMarketData( ids:number[], error:string=null )
	{
		if( error )
			console.error( error );
		else
			console.log( `cancelMktData( ${ids.join(",")} )` );
		const msg = new Requests.RequestUnion( {genericRequests:{type: Requests.ERequests.CancelMarketData, ids: ids}} );
		this.send( msg );
	}
	cancelOrder(id:number):void
	{
		this.send( {genericRequests:{type: Requests.ERequests.CancelOrder, ids: [id]}} );
	}
	reqExecutions( query:Requests.IRequestExecutions ):ExecutionObservable
	{
		query.id = this.getRequestId();
		this.send( new Requests.RequestUnion({requestExecutions: query}) );
		const callback = new ExecutionSubject();
		this.executionCallbacks.set( query.id, callback );
		return callback;
	}
	reqFundamentals( contractId:number ):Promise<{ [k: string]: number }>
	{
		const id = this.getRequestId();
		this.send( new Requests.RequestUnion({genericRequests: {id: id,type: Requests.ERequests.RequestFundamentalData, ids:[contractId]}}) );
		console.log( `(${id})reqFundamentals( '${contractId}' )` );
		return new Promise<{ [k: string]: number }>( (resolve,reject)=>
		{
			this.fundamentalCallbacks.set( id, [resolve,reject] );
		});
	}
	reqHistoricalData( contract:IB.IContract, date:Date, days:number, barSize:Requests.BarSize, display:Requests.Display, useRth:boolean, keepUpToDate:boolean ):Promise<IBar[]>
	{
		const id = this.getRequestId();
		console.log( `(${id})RequestHistoricalData( '${contract.id} - end:${date} for ${days}D ${Requests.BarSize[barSize]} ${Requests.Display[display]} useRth:${useRth}, keepUpToDate:${keepUpToDate}` );
		let toBars = ( ib:Results.IHistoricalData )=>
		{
			let myBars:IBar[] = [];
			for( const bar of ib.bars )
				myBars.push( { time:new Date(bar.time*1000), high:ProtoUtilities.toNumber(bar.high), low:ProtoUtilities.toNumber(bar.low), open:ProtoUtilities.toNumber(bar.open), close:ProtoUtilities.toNumber(bar.close), wap:ProtoUtilities.toNumber(bar.wap), volume:ProtoUtilities.toNumber(bar.volume), count:ProtoUtilities.toNumber(bar.count)} );
			return myBars;
		}
		return this.sendPromise<Requests.IRequestHistoricalData,IBar[]>( "historicalData", {id: id, contract: contract, days:days, barSize:barSize, display:display, useRth:useRth, keepUpToDate:keepUpToDate, date: date.getTime() / 1000}, (result)=>result.historicalData, toBars );
	}
	news( contractId, providerCodes:string[], totalResults:number, start:Date, end:Date ):Promise<Results.NewsCollection>
	{
		const id = this.getRequestId();
		console.log( `(${id})news( ${contractId}, [${providerCodes.join()}] )` );
		const variable = { id:id, contractId:contractId, providerCodes:providerCodes, totalResults: totalResults, start: start ? start.getTime() : 0, end: end ? end.getTime() : 0 };
		return this.sendPromise<Requests.IHistoricalNewsRequest,Results.NewsCollection>( "historicalNewsRequest", variable, (x)=>x.news, null );
	}
	reqNewsArticle( providerCode:string, articleId:string ):Promise<Results.NewsArticle>
	{
		const id = this.getRequestId();
		console.log( `(${id})reqNewsArticle( ${providerCode}, ${articleId} )` );
		const variable = { id:id, providerCode:providerCode, articleId: articleId };
		return this.sendPromise<Requests.INewsArticleRequest,Results.NewsArticle>( "newsArticleRequest", variable, (x)=>x.newsArticle, null );
	}
	reqContractDetails( c:IB.IContract ):Promise<Results.IContractDetail[]>
	{
		const id = this.getRequestId();
		if( c.securityType==IB.SecurityType.Option )
			console.log( `(${id})reqContractDetails:  ${c.symbol}[${IB.SecurityRight[c.right]}] - ${DateUtilities.displayDay(c.expiration)}` );
		else
			console.log( `(${id})reqContractDetails:  ${c.symbol ? c.symbol : c.id}` );
		const variable = { id: id, contracts: [c] };
		return this.sendPromise<Requests.IRequestContractDetails,Results.IContractDetail[]>( "contractDetails", variable, (x)=>x.contractDetails!=null, null );
	}
	reqContractDetailsMulti( contractIds:number[] ):Observable<Results.IContractDetail[]>
	{
		if( !this.socket || this.sessionId===null )
			return throwError( 'Not connected to Tws' );
		const callback = new Subject<Results.IContractDetail[]>();
		const id = this.getRequestId();
		const param = new Requests.RequestContractDetails( {id: id} );
		for( const id of contractIds )
			param.contracts.push( new IB.Contract({id: id, securityType: IB.SecurityType.Stock, exchange: IB.Exchanges.Smart, currency: IB.Currencies.UsDollar}) );

		const msg = new Requests.RequestUnion( {contractDetails:param} ); //msg.ContractDetails = param;
		this.contractCallbacks.set( id, callback );
		console.log( `(${id})reqContractDetailsMulti( ${contractIds.join()} )` );
		this.send( msg );
		return callback;
	}
	optionSummary( contractId:number, optionType:number, startExpiration:number, endExpiration:number, startStrike:number, endStrike:number ):Promise<Results.IOptionValues>
	{
		const id = this.getRequestId();
		if( this.log.requests ) console.log( `(${id})optionSummary( ${contractId}, ${optionType}, ${startExpiration}, ${endExpiration}, ${startStrike}, ${endStrike} )` );
		this.send( {options: {id: id, contractId: contractId, securityType: optionType, startExpiration: startExpiration, endExpiration: endExpiration, startSrike: startStrike, endStrike: endStrike }} );
		return new Promise<Results.IOptionValues>( (resolve,reject)=>
		{
			this.optionSummaryCallbacks.set( id, [resolve, reject] );
		});
	}
	reqAccountUpdatesMulti( number:string, callback: AccountUpdateMultiCallback, endCallback:  (accountNumber:number)=>any ):void
	{
		const id = this.getRequestId();
		const param = new Requests.RequestAccountUpdatesMulti( {accountNumber: number, id: id} );
		const msg = new Requests.RequestUnion(); msg.accountUpdatesMulti = param;
		this.send( msg );
		this.accountUpdateMultiCallbacks.set( id, [callback,endCallback] );
	}

	reqAccountUpdates( number: string ):AccountUpdateType
	{
		const param = new Requests.RequestAccountUpdates( {subscribe: true, accountNumber: number} );
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
		this.send( new Requests.RequestUnion({requestPositions:{id: id, accountNumber: accountNumber}}) );
		return callback;
	}
	cancelPositions( subscription: Observable<Results.IPositionMulti> ):void
	{
		const matched = [...this.positionCallbacks].find( ([key, val]) => val==subscription );
		if( matched.length )
		{
			const id = matched[0];
			console.log( `(${id})cancelPositions()` );
			this.send( new Requests.RequestUnion({genericRequests:{type: Requests.ERequests.CancelPositionsMulti, ids: [id]}}) );
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
				const param = new Requests.RequestAccountUpdates( {subscribe: false, accountNumber: number} );
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
		console.log( `(${id})flexExecutions( '${account}', '${DateUtilities.display(start)}', '${DateUtilities.display(end)}' )` );
		const msg = new Requests.RequestUnion( {flexExecutions: {id:id, accountNumber: account, start: start.getTime() / 1000, end: end.getTime() / 1000}} );
		this.send( msg );

		const callback = new Subject<Results.Flex>();
		this.flexCallbacks.set( id, callback );
		return callback;
	}
	tweets( symbol:string ):[Observable<Results.ITweets>,Promise<Results.ITweetAuthors>]
	{
		const id = this.getRequestId();
		console.debug( `(${id})tweets( '${symbol}' )` );
		const msg = new Requests.RequestUnion( {stringRequest: {id: id, name: symbol, type: Requests.ERequests.Tweets}} );
		this.send( msg );

		const callback = new Subject<Results.ITweets>();
		var observable = new RequestObservable( (m)=>m.tweets, (t)=>callback.next(t), (t:Results.ITweets)=>
		{
			const c = t.earliestTime!=0;
			if( c )
				callback.next( t );
			return c;
		}, (e)=>callback.error(e) );
		this.observers.set( id, observable );
		const promise = new Promise<Results.ITweetAuthors>( (resolve,reject)=>{this.callbacks.set( id, new RequestPromise((m)=>m.tweetAuthors, resolve, reject));} );
		return [callback,promise];
	}
	placeOrder( contract:IB.IContract, order:IB.IOrder, stop:number, stopLimit:number, blockId:string ):OrderObservable
	{
		const id = this.getRequestId();
		console.log( `(${id})placeOrder( ${contract.symbol}x${(order.isBuy ? 1 : -1)*order.quantity}@${order.limit} )` );
		this.send( new Requests.RequestUnion({placeOrder: {id:id, contract: contract, order: order, stop:stop, stopLimit:stopLimit, blockId:blockId}}) );

		let o = new Order( contract, order );
		this.orders.set( id, o );
		return o.callback;
	}
	reddit( symbol, sort ):Promise<Results.IRedditEntries>{ return this.sendPromise( "reddit", {id:this.getRequestId(), symbol:symbol, sort:sort}, (m)=>m.reddit ); }
	redditBlock( user ):Promise<void>
	{
		return this.sendStringPromise( user, Requests.ERequests.RedditBlock );
	}
	twitterBlock( id:Long ):Promise<void>
	{
		return this.sendGenericPromise<void>( Requests.ERequests.TwitterBlock, id, (m)=>m.message, null );
	}
	reqOpenOrders():OrderObservable
	{
		this.send( new Requests.RequestUnion({genericRequests: {type: Requests.ERequests.RequestOpenOrders}}) );
		const callback = new OrderSubject();
		this.openOrders.push( callback );
		return callback;
	}

	reqAllOpenOrders():Promise<Order[]>
	{
		return this.sendGenericPromise<Order[]>( Requests.ERequests.RequestAllOpenOrders, null, (m)=>m.orders, null );//~~~
	}

	reqOptionParams( underlyingId:number ):Promise<Results.IExchangeContracts>
	{
		return this.sendGenericPromise<Results.IExchangeContracts>( Requests.ERequests.RequestOptionParams, underlyingId, (msg)=>msg.optionExchanges, (optionExchanges)=>optionExchanges.exchanges.length ? optionExchanges.exchanges[0] : null );
	}

	reqPreviousDay( ids:number[] ):Observable<Results.IDaySummary>
	{
		const requestId = this.getRequestId();
		if( this.log.requests ) console.log( `(${requestId})reqPreviousDay( ${ids.join()} )` );
		this.send( new Requests.RequestUnion({genericRequests: {id: requestId, type: Requests.ERequests.RequsetPrevOptionValues, ids: ids}}) );
		const callback = new Subject<Results.IDaySummary>();
		this.previousDayCallbacks.set( requestId, callback );
		this.previousDayCallbacks.set( 9999, null );
		return callback;
	}

	sendPromise<TInput,TResult>( param:string, value:TInput, result:GetResult, transformInput?:TransformInput ):Promise<TResult>
	{
		this.send( new Requests.RequestUnion( <Requests.IRequestUnion>{[param]: value}) );
		return new Promise<TResult>( ( resolve, reject )=>
		{
			this.callbacks.set( value["id"], new RequestPromise(result, resolve, reject, transformInput) );//todo also do a proper rejection
		});
	}

	blockly( bytes:Uint8Array, what:string ):Promise<Uint8Array>
	{
		const id = this.getRequestId();
		console.log( `(${id})${what}` );
		return this.sendPromise<Requests.ICustom,Uint8Array>( "blockly", {id: id, message: bytes}, (result:Results.IMessageUnion)=>result.custom, (x:Results.Custom)=>x.message );
	}

	sendGenericPromise<TResult>( type:Requests.ERequests, itemId:number|Long, result:GetResult, transform:TransformInput ):Promise<TResult>
	{
		const id = this.getRequestId();
		console.log( `(${id})${Requests.ERequests[type]}( ${itemId} )` );
		return this.sendPromise<Requests.IGenericRequest,TResult>( "genericRequest", {id: id, type: type, itemId: itemId}, result, transform );
	}
	sendGenericArrayPromise<TResult>( type:Requests.ERequests, ids:number[], result:GetResult, transform:TransformInput ):Promise<TResult>
	{
		const id = this.getRequestId();
		console.log( `(${id})${Requests.ERequests[type]}(${ids.join()})` );
		return this.sendPromise<Requests.IGenericRequests,TResult>( "genericRequests", {id: id, type: type, ids: ids}, result, transform );
	}
	sendStringPromise<TResult>( name:string, q:Requests.ERequests, result:GetResult=null, transform:TransformInput=null ):Promise<TResult>
	{
		const id = this.getRequestId()
		console.log( `(${id})${Requests.ERequests[q]}( ${name} )` );
		return this.sendPromise<Requests.IStringRequest,TResult>( "stringRequest", {id: id, type: q, name: name}, result, transform );
	}
	static transformStringList( result:Results.IStringList ){ return result.values; }
	watchs():Promise<string[]>{ return this.sendGenericArrayPromise<string[]>( Requests.ERequests.WatchLists, [], (result)=>result.stringList, Connection.transformStringList); };
	portfolios():Promise<string[]>{ return this.sendGenericArrayPromise<string[]>(Requests.ERequests.Portfolios, [], (result)=>result.stringList, Connection.transformStringList); };
	watch( name:string ):Promise<Watch.File>{ return this.sendStringPromise<Watch.File>(name, Requests.ERequests.WatchList, (result:Results.IMessageUnion)=>result.watchList, (wl:Results.IWatchList)=>wl.file ); };
	deleteWatch( name:string ):Promise<void>{ return this.sendStringPromise<void>( name, Requests.ERequests.DeleteWatchList ); };
	editWatch( file:Watch.File ):Promise<void>{ console.log( `editWatch( ${file.name} )` ); return this.sendPromise<Requests.IEditWatchListRequest,void>("editWatchList", {id: this.getRequestId(), file: file}, null, null); };
	googleLogin( token:string ):Promise<void>{ console.log( `(${this.requestId+1})googleLogin( ${token.length} )` ); return this.sendStringPromise<void>( token, Requests.ERequests.GoogleLogin); };
	query<T>( ql: string ):Promise<T>
	{
		return this.sendStringPromise<T>( ql, Requests.ERequests.Query, (result:Results.IMessageUnion)=>result.stringResult, (rslt:Results.IStringResult)=>rslt.value.length ? JSON.parse(rslt.value).data : null );
	}
	investors( id:ContractPK ):Promise<Edgar.IInvestors>
	{
		return this.sendGenericArrayPromise<Edgar.IInvestors>( Requests.ERequests.Investors, [id], (result)=>result.investors, (x:Edgar.IInvestors)=>x );
	}
	filings( cik:Cik ):Promise<Edgar.Filing[]>
	{
		return this.sendGenericArrayPromise<Edgar.Filing[]>( Requests.ERequests.Filings, [cik], (result)=>result.filings, (x:Edgar.IFilings)=>x.values );
	}

	getRequestId():number{ return ++this.requestId;} private requestId:number=0;
	private socket:WebSocketSubject<protobuf.Buffer>;
	private sessionId:number|Long|null;

	private stringMapPromises = new Map<Results.EResults,Array<[(x:StringMap)=>void,(x:Results.IError)=>void]>>();
	private accountUpdateCallbacks = new Map <string, Array<[Subject<Results.IAccountUpdate>,Subject<Results.IPortfolioUpdate>]>>();
	private accountUpdateMultiCallbacks = new Map<number, [AccountUpdateCallback, EndCallback]>();
	private marketDataCallbacks = new Map<number, TickSubject>();
	private positionCallbacks = new Map<number,Subject<Results.IPositionMulti>>();
	private contractCallbacks = new Map<number, Subject<Results.IContractDetail[]>>();
	private executionCallbacks = new Map<number,ExecutionSubject>();
	private fundamentalCallbacks = new Map<number, [(x:{ [k: string]: number })=>void,(x:Results.IError)=>void]>(); //[({ [k: string]: number })=>void, (Results.IError)=>void]>();
	private generalCallbacks = new Map<number, [(x:any)=>void,(x:Results.IError)=>void]>();
	private optionSummaryCallbacks = new Map<number, [(x:Results.IOptionValues)=>void, (x:Results.IError)=>void]>();

	private flexCallbacks = new Map<number,Subject<Results.Flex>>();
	private callbacks = new Map<number, RequestPromise>();
	private observers = new Map<number,RequestObservable>();
	private optionParamCallbacks = new Map<number, RequestPromise>();
	private previousDayCallbacks = new Map<number, Subject<Results.IDaySummary>>();
	private orders = new Map<number,Order>();
	private openOrders:OrderSubject[] = [];
	private log = { requests:false, results:false };
}

@Injectable( {providedIn: 'root'} )
export class TwsService implements IGraphQL
{
	constructor( @Inject('IAuth') public authorizationService:IAuth, @Inject('IErrorService') private cnsl: IErrorService )
	{}

	async reqManagedAccts():Promise<StringMap>
	{
		if( !TwsService.accounts )
		{
			await this.authorizationService.login();
			// if( !this.authorizationService.loggedIn )
			// {
			// 	if( !this.authorizationService.enabled() )
			// 		await this.googleLogin( "" );
			// 	else
			// 		await this.authorizationService.subscribe().toPromise();
			// }
			const accounts = await this.connection.reqManagedAccts();
			TwsService.accounts = accounts;
		}
		return TwsService.accounts;
	}
	reqNewsProviders():Promise<StringMap>{ return new Promise<StringMap>( (resolve, reject)=>{ if( TwsService.newsProviders ) resolve( TwsService.newsProviders ); else this.connection.reqNewsProviders().then( (x)=>{TwsService.newsProviders=x; resolve(x);} ).catch( (e)=>{reject(e);}); });}
	news( contractId, providerCodes:string[], totalResults:number, start:Date=null, end:Date=null ):Promise<Results.NewsCollection>{ return this.connection.news(contractId, providerCodes, totalResults, start, end); }
	reqNewsArticle( providerCode:string, articleId:string ):Promise<Results.NewsArticle>{ return this.connection.reqNewsArticle(providerCode, articleId); }

	reqContract( contract:IB.IContract ):Promise<Results.IContractDetail[]>{ return this.connection.reqContractDetails(contract); }
	reqContractSingle( contract:IB.IContract ):Promise<Results.IContractDetail>{ return new Promise<Results.IContractDetail>( (resolve,reject)=>this.reqContract(contract).then( (results)=>{if( results.length==1 )resolve( results[0] ); else reject( {results: results, error:null} ); }).catch( (e)=>reject(e) )); } //TODO make new call to return single or error.
	reqIds( contractIds:number[] ):Promise<Results.IContractDetail[][]>{ return ObservableUtilities.toPromise<Results.IContractDetail[]>( ()=>this.connection.reqContractDetailsMulti(contractIds), false ); }
	reqSymbol( symbol:string ):Promise<Results.IContractDetail[]>{ return this.reqContract({symbol: symbol}); }
	reqSymbolSingle( symbol:string ):Promise<Results.IContractDetail>
	{
		return new Promise<Results.IContractDetail>( (resolve,reject)=>this.reqSymbol(symbol).then( (x)=>
		{
			for( let i=0; i<x.length; )
			{
				if( x[i].contract.currency!=MarketUtilities.DefaultCurrency() )
					 x.splice( i, 1 );
				else
					++i;
			}
			if( x.length==1 )
				resolve( x[0] );
			else
				reject( {error:{message:`'${symbol} returned ${x.length} records.`, values:x}} );
		}).catch((e)=>reject(e)) );
	}

	reqAccountUpdates( accountNumber: string ):AccountUpdateType{ return this.connection.reqAccountUpdates( accountNumber ); }
	reqPositions( accountNumber: string ):Observable<Results.IPositionMulti>{ return this.connection.reqPositions( accountNumber ); }
	cancelPositions( subscription: Observable<Results.IPositionMulti> ):void{ return this.connection.cancelPositions( subscription ); }
	accountUpdatesUnsubscribe( requests:Map<string,AccountUpdateType> ){ this.connection.accountUpdatesUnsubscribe(requests); };
	accountUpdateUnsubscribe( accountId:string, request:AccountUpdateType ){ this.connection.accountUpdateUnsubscribe(accountId,request); };
	averageVolume( contractIds:number[] ):Observable<Results.ContractValue>{ return this.connection.averageVolume(contractIds); };
	blockly( bytes:Uint8Array, what:string ):Promise<Uint8Array>{ return this.connection.blockly(bytes, what); }
	reqMktData( contractId:number, ticks?:Requests.ETickList[], snapshot=true ):TickObservable{ return this.connection.reqMktData(contractId, ticks, snapshot); }
	cancelMktData( subscriptions:IterableIterator<TickObservable> ):void{ this.connection.cancelMktData(subscriptions); }
	cancelMktDataSingle( x:TickObservable ):void{ new Map<number,TickObservable>( [[0,x]]).values(); }
	investors( id:ContractPK ):Promise<Edgar.IInvestors>{ return this.connection.investors(id); }
	filings( cik:Cik ):Promise<Edgar.Filing[]>{ return this.connection.filings(cik); }
	reqExecutions( query:Requests.IRequestExecutions=new Requests.RequestExecutions() ):ExecutionObservable{ return this.connection.reqExecutions( query ); }
	reqFundamentals( contractId:number ):Promise<{ [k:string]: number }>{ return this.connection.reqFundamentals( contractId ); }
	reqHistoricalData( contract:IB.IContract, date:Date, days:number, barSize:Requests.BarSize, display:Requests.Display, useRth:boolean, keepUpToDate:boolean ):Promise<IBar[]>{ return this.connection.reqHistoricalData(contract, date, days, barSize, display, useRth, keepUpToDate); }

	optionSummary( contractId:number, optionType:number, startExpiration:number, endExpiration:number, startStrike:number, endStrike:number ):Promise<Results.IOptionValues>{ return this.connection.optionSummary(contractId, optionType, startExpiration, endExpiration, startStrike, endStrike); }

	flexExecutions( account:string, start:Date, end:Date ):Observable<Results.Flex>{ return this.connection.flexExecutions(account, start, end); }
	placeOrder( contract:IB.IContract, order:IB.IOrder, stop:number, stopLimit:number, blockId?:string ):OrderObservable{ return this.connection.placeOrder(contract, order, stop, stopLimit, blockId); }
	reddit( symbol, sort ):Promise<Results.IRedditEntries>{ return this.connection.reddit( symbol, sort ); }
	redditBlock( user ):Promise<void>{ return this.connection.redditBlock( user ); }
	reqOpenOrders():OrderObservable{ return this.connection.reqOpenOrders(); }
	reqAllOpenOrders():Promise<Order[]>{ return this.connection.reqAllOpenOrders(); }
	reqOptionParams(underlyingId:number):Promise<Results.IExchangeContracts>{ return this.connection.reqOptionParams(underlyingId); }
	reqPreviousDay(ids:number[]):Observable<Results.IDaySummary>{ return this.connection.reqPreviousDay(ids); }
	cancelOrder(id:number):void{ this.connection.cancelOrder( id ); }

	tweets( symbol:string ):[Observable<Results.ITweets>,Promise<Results.ITweetAuthors>]{ return this.connection.tweets( symbol ); }
	twitterBlock( id:Long ):Promise<void>{ return this.connection.twitterBlock( id ); }
	watchs():Promise<string[]>{ return this.connection.watchs(); };
	portfolios():Promise<string[]>{ return this.connection.portfolios(); };
	watch( name:string ):Promise<Watch.File>{ return this.connection.watch(name); };
	deleteWatch( name:string ):Promise<void>{ return this.connection.deleteWatch(name); };
	editWatch( file:Watch.File ):Promise<void>{ return this.connection.editWatch(file); };
	googleLogin( token:string ):Promise<void>{ return this.connection.googleLogin(token); };

	query( ql: string ):Promise<any>{ return this.connection.query( ql ); }
	schema( names:string[] ):Promise<Table[]>
	{
		return new Promise<Table[]>( (resolve, reject)=>
		{
			let results = new Array<Table>();
			let query =  new Array<string>();
			names.forEach( (x)=>{ if( TwsService.tables.has(x) ) results.push(TwsService.tables.get(x)); else query.push(x); } );
			if( !query.length )
				resolve( results );
			else
			{
				for( let name of query )
				{
					let ql = `{ __type(name: "${name}") { fields { name type { name kind ofType{name kind} } } } }`;
					this.query( ql ).then( ( data:any )=>
					{
						let table = new Table( data.__type );
						TwsService.tables.set( name, table );
						if( results.push( table )==names.length )
							resolve( results );
					}).catch( (e)=>reject(e) );
				}
			}
		});
	}
	mutations():Promise<Mutation[]>
	{
		return new Promise<Mutation[]>( (resolve, reject)=>
		{
			if( TwsService.mutations )
				resolve( TwsService.mutations );
			else
			{
				let ql = `query{__schema{mutationType{name fields { name args { name defaultValue type { name } } } } }`;
				this.query( ql ).then( ( data:any )=>
				{
					TwsService.mutations = data.__schema.fields;
					resolve( TwsService.mutations );
				}).catch( (e)=>reject(e) );
			}
		});
	}

	private static tables = new Map<string,Table>();
	private static mutations:Array<Mutation>;
	private static accounts:StringMap;
	private static newsProviders:StringMap;
	private get connection():Connection{if( this._connection==null ) this._connection = new Connection( this.cnsl ); return this._connection;} private _connection:Connection;
}