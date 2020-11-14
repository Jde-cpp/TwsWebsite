import { Injectable, Inject } from '@angular/core';
import { TwsService } from '../tws/tws.service';

import * as myBlockly2 from 'src/app/proto/blockly'; import Proto = myBlockly2.Jde.Blockly.Proto;
import { Observable, Subject } from 'rxjs';

@Injectable( {providedIn: 'root'} )
export class BlocklyService
{
	constructor( private tws: TwsService )
	{}
	subscribe():Observable<Proto.IFunctions>{ return this.change; }

	private send<T>( msg:Proto.IRequestUnion, result:(x:Proto.ResultUnion)=>T ):Promise<T>
	{
		return new Promise<T>( (resolve,reject)=>
		{
			let bytes = Proto.RequestUnion.encode( msg ).finish();
			this.tws.blockly( bytes ).then( (bytes:Uint8Array)=>
			{
				var value = Proto.ResultUnion.decode( bytes );
				if( result )
					resolve( result(value) );
				else
					resolve();
			}).catch( (e)=>reject(e) );
		});
	}
	save( fnctn:Proto.IFunction ):Promise<void>
	{
		console.log( `BlocklyService.save( '${fnctn.id}' )` );
		return this.send<void>( {save:fnctn}, (_)=>
		{
			if( BlocklyService.functions )//TODO find out what happened to it.
			{
				let i = BlocklyService.functions.functions.findIndex( (x)=>x.id==fnctn.id );
				if( i!=-1 )
					BlocklyService.functions.functions[i] = fnctn;
			}
		});
	};
	delete( id:string ):Promise<void>
	{
		console.log( `BlocklyService.delete( '${id}' )` );
		return this.send<void>( {deleteId:id}, (_)=>
		{
			let i = BlocklyService.functions.functions.findIndex( (x)=>x.id==id );
			if( i!=-1 )
			{
				BlocklyService.functions.functions.splice( i, 1 );
				this.change.next( BlocklyService.functions );
			}
		});
	};

	loadAll():Promise<Proto.IFunctions>
	{
		return new Promise<Proto.IFunctions>( (resolve, reject)=>
		{
			if( BlocklyService.functions )
				resolve( BlocklyService.functions );
			else
			{
				this.send<Proto.IFunctions>( {loadId:""}, (x)=>{return x.functions;} ).then( (functions)=>
				{
					BlocklyService.functions = functions;
					resolve( functions );
				}).catch( (e)=>reject(e) );
			}
		});
	}
	load( id:string ):Promise<Proto.IFunction>
	{
		return this.send<Proto.IFunction>( {loadId:id}, (x)=>{return x.function;} );
	}

	change = new Subject<Proto.IFunctions>();
	private static functions:Proto.IFunctions;
}