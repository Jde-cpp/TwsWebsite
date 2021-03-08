import {Component, Inject, Input, Output, AfterViewInit, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGraphQL } from 'jde-framework';

@Component( { selector: 'graph-ql-properties', templateUrl: 'properties.html'} )
export class GraphQLProperties implements AfterViewInit
{
	constructor( private route: ActivatedRoute, private router:Router, @Inject('IGraphQL') private graphQL: IGraphQL )
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
		for( var m in this.original )
		{
			if( this.clone.get(m)!==undefined && this.original[m]!=this.clone.get(m) )
				input[m] = this.clone.get(m);
			//if( this.clone[m]!==undefined && this.original[m]!=this.clone[m] )
			//	input[m] = this.clone[m];
		}
		//for( var key in this.clone )
		for( var [key,value] of this.clone )//previously no description, now description.
		{
			if( this.original[key]===undefined )
				input[key] = this.clone.get(key); //this.clone[key];
		}

		if( Object.keys(input).length )
		{
			var ql = `{ mutation { ${cmd}${this.type}( ${idString} "input": ${JSON.stringify(input)} )${output} } }`;
			this.graphQL.query( ql ).then( (x)=>
			{
				if( update && this.original.target==this.clone["target"] )
				{
					for( let m in input )
						this.original[m] = input[m];
					this.save.emit( this.original );
				}
				else
					this.router.navigate([`../${input.target ?? this.original.target}`], { relativeTo: this.route });
			}).catch( (e)=>
			{
				debugger;
				console.log( e.toString() );
			}).finally( ()=>this.saving=false );
		}
	}
	saving=false;
	@Output() save = new EventEmitter<any>();
	clone = new Map<string,any>();//good but tabs don't work.
	//clone = {};
	@Input() set original(x)
	{
		this._original = x ?? {};
		let add = (m)=>this.clone.set( m, this._original[m] ?? '' );//this.clone[m] = this._original[m] ?? '';
		add( "name" );
		add( "target" );
		for( let m in x )
		{
			if( x[m]===undefined && ["id", "created", "attributes", "updated", "deleted", "description"].indexOf(m)==-1 )
			this.clone.set( m, x[m] ); //this.clone[m] = x[m];
		}
		add( "description" );
//		for( var [key,value] of this.clone )
//			console.log( `${key}=${value}` );
	} get original(){return this._original; } _original:any;
	@Input() type:string;
	viewPromise:Promise<boolean>;
}