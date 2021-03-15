//import { LogEntry } from "./LogEntry";
import { TraceEntry } from "./TraceEntry";

import * as AppFromClient from 'jde-cpp/FromClient'; import FromClient = AppFromClient.Jde.ApplicationServer.Web.FromClient;

export class ApplicationStrings
{
	constructor( public id:number )
	{}
	requests( entry:TraceEntry ):FromClient.RequestStrings
	{
		var requests = new FromClient.RequestStrings();
		if( !this.messages.has(entry.messageId) )
		{
			requests.Values.push( new FromClient.RequestString({"ApplicationId":this.id, "Value": entry.messageId, "Type":FromClient.EStringRequest.MessageString}) );
			this.messages.set( entry.messageId, null );
		}
		if( entry.fileId && !this.files.has(entry.fileId) )
		{
			requests.Values.push( new FromClient.RequestString({"ApplicationId":this.id, "Value": entry.fileId, "Type":FromClient.EStringRequest.File}) );
			this.files.set( entry.fileId, null );
		}
		if( entry.functionId && !this.functions.has(entry.functionId) )
		{
			requests.Values.push( new FromClient.RequestString({"ApplicationId":this.id, "Value": entry.functionId, "Type":FromClient.EStringRequest.Function}) );
			this.functions.set( entry.functionId, null );
		}
		if( entry.userId && !this.users.has(entry.userId) )
		{
			requests.Values.push( new FromClient.RequestString({"ApplicationId":this.id, "Value": entry.userId, "Type":FromClient.EStringRequest.User}) );
			this.users.set( entry.userId, null );
		}
		return requests;
	}

	set( type:FromClient.EStringRequest, id:number, value:string )
	{
		if( type==FromClient.EStringRequest.MessageString )
			this.messages.set( id, value );
		else if( type==FromClient.EStringRequest.File )
			this.files.set( id, value );
		else if( type==FromClient.EStringRequest.Function )
			this.functions.set( id, value );
		else if( type==FromClient.EStringRequest.User )
			this.users.set( id, value );
	}
	files:Map<number, string> = new Map<number, string>();
	functions:Map<number, string> = new Map<number, string>();
	messages:Map<number, string> = new Map<number, string>();
	users:Map<number, string> = new Map<number, string>();

	//static instances:Map<string,ApplicationString> = new Map<string,ApplicationString>();
}
/*
export class ApplicationInstance
{
	static parse( tokens:string[], startingIndex:number ):[ApplicationInstance, number]
	{
		var i = startingIndex;
		var app = new ApplicationInstance();
		app.id = parseInt( tokens[i++] );
		app.version = parseInt( tokens[i++] );
		var name = tokens[i++];
		app.application = Application.instances.get( name );
		if( !app.application )
		{
			app.application = new Application( name );
			Application.instances.set( name, app.application );
		}
		app.processId = parseInt( tokens[i++] );
		app.description = tokens[i++];
		app.hostName = tokens[i++];
		return [app,i];
	}
	parseStrings( tokens:string[], startingIndex:number ):number
	{
		let i = startingIndex;
		const typeCount = parseInt( tokens[i++] );
		for( let typeIndex=0; typeIndex<typeCount; ++typeIndex )
		{
			const type:LogEntry.EFields = parseInt( tokens[i++] );
			let map:Map<number,string> = null;
			switch( type )
			{
			case LogEntry.EFields.File:
				map = this.application.files;
				break;
			case LogEntry.EFields.Function:
				map = this.application.functions;
				break;
			case LogEntry.EFields.Message:
				map = this.application.messages;
				break;
			case LogEntry.EFields.Thread:
				map = this.threads;
				break;
			case LogEntry.EFields.User:
				map = this.application.users;
				break;
			default:
			 	throw new Error( 'type '+ (<number>type).toString()+' has not been implemented' );
			}
			const stringCount = parseInt( tokens[i++] );
			for( let stringIndex=0; stringIndex<stringCount; ++stringIndex )
			{
				const id = parseInt( tokens[i++] );
				const value = tokens[i++];
				map.set( id, value );
			}
		}
		return i;
	}
	id:number;
	application:Application;
	//Name:string;
	version:number;
	processId:number;
	description:string;
	hostName:string;
	threads:Map<number, string> = new Map<number, string>();
}
*/