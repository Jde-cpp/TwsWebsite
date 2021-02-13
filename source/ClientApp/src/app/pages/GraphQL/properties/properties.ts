import {Component, Inject, Input, Output, AfterViewInit, EventEmitter} from '@angular/core';
import { IGraphQL } from 'jde-framework';

@Component( { selector: 'graph-ql-properties', templateUrl: 'properties.html'} )
export class GraphQLProperties implements AfterViewInit
{
	constructor( @Inject('IGraphQL') private graphQL: IGraphQL )
	{}
	ngAfterViewInit():void
	{
		this.viewPromise = Promise.resolve( true );
	}
	originalOrder = ( a, b )=> {return 0;}
	onSubmitClick():void
	{
		const update = this.original.id!=null;
		let idString = update ? `"id":${this.original.id},` : "";
		let output = update ? "" : "{id}";
		let cmd = update ? "update" : "create";
		let input:any = update ? {} : {...this.clone};
		if( update )
		{
			for( var m in this.original )
			{
				if( this.clone.get(m)!==undefined && this.original[m]!=this.clone.get(m) )
					input[m] = this.clone.get(m);
			}
		}
		else
			input.id = undefined;

		if( Object.keys(input).length )
		{
			var ql = `{ mutation { ${cmd}${this.type}( ${idString} "input": ${JSON.stringify(input)} )${output} } }`;
			this.graphQL.query( ql ).then( (x)=>
			{
				for( let m in input )this.original[m] = input[m];
				if( !update )
					this.clone.set( "id", this.original.id = x.id );

				this.save.emit( this.original );
			}).catch( (e)=>
			{
				debugger;
				console.log( e.toString() );
			}).finally( ()=>this.saving=false );
		}
	}
	saving=false;
	@Output() save = new EventEmitter<any>();
	clone = new Map<string,any>();
	@Input() set original(x)
	{
		this._original = x;
		let add = (m)=>this.clone.set( m, x[m] ?? '' );
		add( "name" );
		add( "target" );
		for( let m in x )
		{
			if( x[m]===undefined && ["id", "created", "attributes", "updated", "deleted", "description"].indexOf(m)==-1 )
				this.clone.set( m, x[m] );
		}
		add( "description" );
		for( var [key,value] of this.clone )
			console.log( `${key}=${value}` );
	} get original(){return this._original; } _original:any;
	@Input() type:string;
	viewPromise:Promise<boolean>;
}