import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject,Observable,of } from 'rxjs';
//import {ProtoUtilities} from '../../../utilities/protoUtilities'
import * as AppFromServer from 'jde-cpp/FromServer'; import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;
import * as AppFromClient from 'jde-cpp/FromClient';
import FromClient = AppFromClient.Jde.ApplicationServer.Web.FromClient;

type StatusSubscription = (statuses:FromServer.IStatuses) => void;
//type LogsSubscription = (logs:FromServer.ITraces) => void;

@Injectable( {providedIn: 'root'} )
export class AppService
{
//	request<T>( requestType:Requests.ERequests ):Promise<T>{ return this.connection.request<T>(requestType); }
	get():Observable<FromServer.IApplication[]>
	{
		if( this.applications.length )
			return of( this.applications ); //eventStream.next(  );

		var eventStream = new Subject<FromServer.IApplication[]>();
		this.applicationSubjects.push( eventStream );
		if( this.applicationSubjects.length==1 )
			this.sendRequest( FromClient.ERequest.Applications );
		return eventStream;
	};
	statuses():Observable<FromServer.IStatuses>
	{
		var eventStream = new Subject<FromServer.IStatuses>();
		this.statusSubscriptions.push( eventStream );
		if( this.statusSubscriptions.length==1 )
			this.sendRequest( FromClient.ERequest.Statuses );

		return eventStream;
	}
	statusUnsubscribe( subscription:Observable<FromServer.IStatuses> )
	{
		const index = this.statusSubscriptions.indexOf( <Subject<FromServer.IStatuses>>subscription );
		if( index>-1 )
			this.statusSubscriptions.splice( index, 1 );
		if( !this.statusSubscriptions.length )
			this.sendRequest( FromClient.ERequest.Statuses | FromClient.ERequest.Negate );
	};

	logs( applicationId:number, value:FromServer.ELogLevel, start:Date, limit:number ):Observable<[number,FromServer.ITraceMessage]>
	{
		let subscriptions = this.logsSubscriptions.get( applicationId );
		if( !subscriptions )
			this.logsSubscriptions.set( applicationId, subscriptions=[] );

		let minLevel = FromServer.ELogLevel.None;
		for( const [level, _] of subscriptions )
			minLevel = Math.min( minLevel, level );
		let callback = new Subject<[number,FromServer.ITraceMessage]>();
		subscriptions.push( [value, callback] );
		if( value<minLevel )
		{
			var request = new FromClient.RequestLogs(); request.Value = value; request.ApplicationId = applicationId; request.Start = start ? start.getTime()/1000 : 0; request.Limit = limit;
			var msg = new FromClient.MessageUnion(); msg.RequestLogs=request;
			console.log( `AppService::RequestLogs applicationId='${applicationId}', level='${value}', date='${start ? start.toISOString() : "null"}'` );
			this.send( msg );//todo set new structure to ApplicationId, fix server.
		}
		return callback;
	}
	logsUnsubscribe( instanceId:number, callback:Observable<[number,FromServer.ITraceMessage]> )
	{
		let subscriptions = this.logsSubscriptions.get( instanceId );
		if( !subscriptions )
		{
			console.warn( `no log callbacks to unsubscribe ${instanceId}` );
			return;
		}

		let index = -1; let removedLevel = FromServer.ELogLevel.None;
		let minLevel = FromServer.ELogLevel.None;
		for( let i = 0; i<subscriptions.length; ++i )
		{
			var [level,currentCallback] = subscriptions[i];
			if( callback==currentCallback )
			{
				index = i;
				level = removedLevel;
			}
			else
				minLevel = Math.min( level, minLevel );
		}
		if( index>-1 )
			subscriptions.splice( index, 1 );
		if( subscriptions.length==0 )
		{
			this.logsSubscriptions.delete( instanceId );
			console.log( `Unsubscribe from logs for application ${instanceId}` );
			this.request( instanceId, -3 ); //FromClient.ERequest.Logs | FromClient.ERequest.Negate
		}
		else if( minLevel>removedLevel )
		{
			var request = new FromClient.RequestLogs(); request.Value = minLevel; request.InstanceId = instanceId;
			var msg = new FromClient.MessageUnion(); msg.RequestLogs=request;
			this.send( msg );
		}
	};

	updateLogLevel( instanceId:number, clientLevel:FromServer.ELogLevel, dbLevel:FromServer.ELogLevel )
	{
		var request = new FromClient.LogValues(); request.InstanceId = instanceId; request.ClientValue = clientLevel; request.DbValue = dbLevel;
		var msg = new FromClient.MessageUnion(); msg.LogValues=request;
		this.send( msg );
	}
	requestStrings( requests:FromClient.IRequestStrings ):Observable<[number,FromServer.IApplicationString]>
	{
		let message = new FromClient.MessageUnion();
		message.RequestStrings = requests;
		let callback = new Subject<[number,FromServer.IApplicationString]>();
		for( let request of requests.Values )
			this.stringRequests.set( request, callback );
		console.log( `AppService::requestStrings count='${requests.Values.length}'` );
		this.send( message );
		return callback;
	}
	request( instanceId:number, value:number )
	{
		var request = new FromClient.RequestId(); request.Value = value; request.InstanceId = instanceId;
		var msg = new FromClient.MessageUnion(); msg.RequestId=request;
		this.send( msg );
	}

	custom( applicationId:number, value:Uint8Array ):Observable<Uint8Array>
	{
		var custom = new FromClient.Custom();
		custom.ApplicationId = applicationId;
		custom.RequestId = ++this._customRequestId;
		custom.Message = value;
		var msg = new FromClient.MessageUnion; msg.Custom=custom;
		let callback = new Subject<Uint8Array>();
		this.customCallbacks.set( custom.RequestId, callback );
		this.send( msg );

		return callback;
	}

	private sendRequest( value:FromClient.ERequest )
	{
		var request = new FromClient.Request(); request.Value = value;
		var msg = new FromClient.MessageUnion(); msg.Request=request;
		this.send( msg );

	}
	send<T>( request:T ):void
	{
		var transmission = new FromClient.Transmission(); transmission.Messages.push( request );
		var writer = FromClient.Transmission.encode( transmission );
		this.socket.next( writer.finish() );//'17\0'+'1\0'
	}

	private logsSubscriptions:Map<number,[FromServer.ELogLevel, Subject<[number,FromServer.ITraceMessage]>][]>= new Map<number,[FromServer.ELogLevel, Subject<[number,FromServer.ITraceMessage]>][]>();
	private addMessage( msg ):void{}
	private error( err ):void
	{
		this.sessionId = null;
		console.error( err );
		for( const subscription of this.statusSubscriptions )
			subscription.error( err );
		this.statusSubscriptions = [];
	}
	private complete():void
	{
		console.log( 'complete' );
		for( const subscription of this.statusSubscriptions )
			subscription.complete();
	}
	private get socket():WebSocketSubject<protobuf.Buffer>
	{
		//var myWorker = new SharedWorker("worker.js", { name : "mySharedWorker" });
		if( !this._socket )
		{
			//this._socket = localStorage.getItem( "app.service.socket" );
			if( !this._socket )
			{
				this._socket = webSocket<protobuf.Buffer>( {url: 'ws://localhost:1967', deserializer: msg => this.onMessage(msg), serializer: msg=>msg, binaryType:"arraybuffer"} );
				this._socket.subscribe( (msg) => this.addMessage(msg), (err) => this.error(err), () => this.complete() );
				//localStorage.setItem( "app.service.socket", this._socket );
			}
		}
		return this._socket;
	} private _socket:WebSocketSubject<protobuf.Buffer>;
	private sessionId:number;
	private onMessage( event:MessageEvent ):protobuf.Buffer
	{
		var bytearray = new Uint8Array( event.data );//new Uint8Array( event.data );
		try
		{
			const transmission = FromServer.Transmission.decode( bytearray );
			for( const message of transmission.Messages )
			{
				if( message.Traces )
				{
					const applicationId = message.Traces.ApplicationId;
					var subscriptions = this.logsSubscriptions.get( applicationId );
					if( !subscriptions )
						continue;//todo end subscription
					for( let trace of message.Traces.Values )
					{
						for( let [level,callback] of subscriptions )
						{
							if( trace.Level>=level )
								callback.next( [applicationId,trace] );
						}
					}
				}
				else if( message.Strings )
				{
					var applicationId = message.Strings.ApplicationId;
					for( var string of message.Strings.Values )
					{
						for( let [request,callback] of this.stringRequests )
						{
							if( request.ApplicationId==applicationId && request.Type==string.StringRequestType && request.Value==string.Id )
							{
								//console.log( `applicationId=${applicationId}, type=${string.StringRequestType}, value=${string.Id}, ${string.Value}` );
								callback.next( [applicationId,string] );
							}
						}
					}

				}
				else if( message.Statuses )
				{
					for( const callback of this.statusSubscriptions )
						callback.next( message.Statuses );
				}
				else if( message.Acknowledgement )
					this.sessionId = message.Acknowledgement.Id;
				else if( message.Applications )
				{
					this.applications.length=0;
					for( var application of message.Applications.Values )
						this.applications.push( application );
					for( let callback of this.applicationSubjects )
					{
						callback.next( this.applications );
						callback.complete();
					}
					this.applicationSubjects.length = 0;
				}
				else if( message.Custom )
				{
					var callback = this.customCallbacks.get( message.Custom.RequestId );
					if( callback )
						callback.next( message.Custom.Message );
					else
						console.error( `no callback for '${message.Custom.RequestId}'` );
				}
				else
					console.error( "unknown message type" );
			}
		}
		catch( e )
		{
			console.error( `error read ${bytearray.length} bytes`+e.toString() );
		}
		//var tokens = msg.data.split( '\0' );
		return bytearray;
	}
	private applications:FromServer.IApplication[]=[];
	private applicationSubjects:Subject<FromServer.IApplication[]>[]=[];
	private stringRequests:Map<FromClient.IRequestString,Subject<[number,FromServer.IApplicationString]>>= new Map<FromClient.IRequestString,Subject<[number,FromServer.IApplicationString]>>();
	private statusSubscriptions:Subject<FromServer.IStatuses>[]=[];
	private customCallbacks = new Map<number,Subject<Uint8Array>>();
	private _customRequestId:number=0;
}
