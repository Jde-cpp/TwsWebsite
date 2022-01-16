import { Injectable, Inject } from '@angular/core';
import { TwsService } from './tws.service';

//import * as myBlockly2 from 'dist/jde-tws-assets/src/assets/proto/blockly'; import Proto = myBlockly2.Jde.Blockly.Proto;
//import * as myBlockly2 from '../proto/blockly'; import Proto = myBlockly2.Jde.Blockly.Proto;
import * as myBlockly2 from 'jde-cpp/blockly'; import Proto = myBlockly2.Jde.Blockly.Proto;

import { Observable, Subject } from 'rxjs';
//import { resolve } from 'dns';

@Injectable( {providedIn: 'root'} )
export class BlocklyService
{
	constructor( private tws: TwsService )
	{}

	subscribe():Observable<Proto.IFunctions>{ return this.change; }

	private send<T>( msg:Proto.IRequestUnion, result?:(x:Proto.ResultUnion)=>T ):Promise<T>
	{
		return new Promise<T>( async (resolve,reject)=>
		{
			let bytes = Proto.RequestUnion.encode( msg ).finish();
			try
			{
				bytes = await this.tws.blockly( bytes );
				var value = Proto.ResultUnion.decode( bytes );
				if( value.error )
					throw value.error;
				resolve( result ? result(value) : null );
			}
			catch( e )
			{
				reject( e );
			}
		});
	}
	loadEnabled():Promise<Proto.IFunction[]>
	{
		return new Promise<Proto.IFunction[]>( (resolve, reject)=>this.loadAll().then( (value)=>resolve(value.functions.filter(x=>x.enabled)) ).catch( (e)=>reject(e) ) );
	}
	loadAll():Promise<Proto.IFunctions>
	{
		return new Promise<Proto.IFunctions>( async (resolve, reject)=>
		{
			if( BlocklyService.functions )
				return resolve( BlocklyService.functions );
			if( BlocklyService.loadAllRequests )
				return BlocklyService.loadAllRequests.push( {resolve,reject} );
			BlocklyService.loadAllRequests = [ {resolve,reject} ];
			try
			{
				BlocklyService.functions = await this.send<Proto.IFunctions>( {}, (x)=>{return x.functions;} );
				BlocklyService.loadAllRequests.forEach( x => x.resolve(BlocklyService.functions) );
				BlocklyService.loadAllRequests = undefined;
			}
			catch( e ){ reject( e ); }
		});
	}
	load( id:string ):Promise<Proto.IFunction>
	{
		console.log( `blockly.load( '${id}' )` );
		return this.send<Proto.IFunction>( {idRequest:{type:Proto.ERequestType.Load, id:id}}, (x)=>{return x.function;} );
	}
	copy( fromId:string, to:Proto.IFunction ):Promise<void>
	{
		console.log( `BlocklyService.copy( '${fromId}'->'${to.id}' )` );
		return this.send<void>( {copy:{fromId:fromId, to:to}}, (_)=>
		{
			if( BlocklyService.functions )//TODO find out what happened to it.
			{
				let i = BlocklyService.functions.functions.findIndex( (x)=>x.id==to.id );
				if( i!=-1 )
					BlocklyService.functions.functions[i] = to;
				else
					BlocklyService.functions.functions.push( to );
			}
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

	private VoidReturn( id, type:Proto.ERequestType, innerResolve:(fnctn:Proto.IFunction, i?:number)=>void )
	{
		return new Promise<void>( (resolve, reject)=>
		{
			this.send<void>( {idRequest:{id:id, type:type}} ).then( ()=>
			{
				if( BlocklyService.functions )
				{
					let i = BlocklyService.functions.functions.findIndex( (x)=>x.id==id );
					if( i!=-1 )
						innerResolve( BlocklyService.functions.functions[i], i );
				}
				resolve();
			}).catch( (e)=>reject(e) );
		});
	}
	build( id:string ):Promise<void>
	{
		console.log( `BlocklyService.build( '${id}' )` );
		return this.VoidReturn( id, Proto.ERequestType.Build, (fnctn)=>fnctn.library=".dll" );
	}
	deleteBuild( id:string ):Promise<void>
	{
		console.log( `BlocklyService.build( '${id}' )` );
		return this.VoidReturn( id, Proto.ERequestType.DeleteBuild, (fnctn)=>fnctn.library=null );
	}
	delete( id:string ):Promise<void>
	{
		console.log( `BlocklyService.delete( '${id}' )` );
		return this.VoidReturn( id, Proto.ERequestType.Delete, (fnctn,i)=>BlocklyService.functions.functions.splice(i, 1) );
	}

	enable = ( id:string ):Promise<void>=>
	{
		console.log( `BlocklyService.enable( '${id}' )` );
		return this.VoidReturn( id, Proto.ERequestType.Enable, (fnctn)=>fnctn.enabled=true );
	}
	disable = ( id:string ):Promise<void>=>
	{
		console.log( `BlocklyService.disable( '${id}' )` );
		return this.VoidReturn( id, Proto.ERequestType.Disable, (fnctn)=>fnctn.enabled=false );
	}
	change = new Subject<Proto.IFunctions>();
	private static loadAllRequests?:{resolve: (value:Proto.IFunctions)=>void, reject:(reason: string)=>void}[]=null;
	private static functions:Proto.IFunctions=null;
}