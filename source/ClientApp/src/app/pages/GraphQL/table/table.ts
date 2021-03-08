import {Component, AfterViewInit, Inject, OnDestroy, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { Field, FieldKind, IErrorService, IGraphQL, Table } from 'jde-framework';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';


@Component( { selector: 'graph-ql-table', styleUrls: ['table.css'], templateUrl: 'table.html'} )
export class GraphQLTable implements OnInit, AfterViewInit, OnDestroy
{
	constructor( @Inject('IGraphQL') private graphQL: IGraphQL, @Inject('IErrorService') private cnsle: IErrorService )
	{}
	ngOnInit()
	{
		this.showDeletedSubscription = this.showDeletedEvents?.subscribe( (x)=>{this.showDeleted = x;} );
	}
	//public dialogRef:MatDialogRef<SelectDialog>, @Inject(MAT_DIALOG_DATA) public data:{selectedIds:number[], columns:string[], schema:Table, mutation:string, linkTo:number, linkToField:string, title:string,isChildren:boolean,includeDeleted:boolean,subToField:string, subTo:number},
	ngAfterViewInit():void
	{
		this.viewPromise = Promise.resolve( true );
/*		GraphQLTable.query( `query{ ${this.query}(filter: ${filter}) {${selectFields.join(" ")}} }` ).then( (results:any)=>
		{
			let items:any[] = results[this.query];
			this.dataSource = new MatTableDataSource<any>( items );
			const key = this.isFlags ? "name" : "id"; //TODO fix member logic.
			this.selections = new SelectionModel<any>( true, items.filter((x)=>this.selections.includes(x[key])) );
			this.viewPromise = Promise.resolve( true );
		} );*/
	}
	ngOnDestroy()
	{
		this.showDeletedSubscription?.unsubscribe();
	}
	static query( graphQL: IGraphQL, schema:Table, query: string, showExtra:boolean, isFlags:boolean ):{query:string, displayedColumns:Field[]}
	{
		var selectFields:string[] = [], displayedColumns=[];
		for( let field of schema.fields )
		{
			if( !showExtra && (field.type.kind==FieldKind.LIST || ["created", "updated", "deleted", "target"].includes(field.name)) )
				continue;
			if( field.type.underlyingKind==FieldKind.SCALAR )
			{
				displayedColumns.push( field );
				selectFields.push( field.name );
			}
			else if( field.type.underlyingKind==FieldKind.OBJECT )
			{
				displayedColumns.push( field );
				selectFields.push( `${field.name}{name}` );
			}
		}

		var filter = 'null';
		if( isFlags )
			filter = "{id: {ne: 0}}";
		else if( schema.fields.find((x)=>x.name=="deleted") )
			filter = "{deleted: {eq:null}}";
		return {query: `query{ ${query}(filter: ${filter}) {${selectFields.join(" ")}} }`, displayedColumns: displayedColumns };
		//return graphQL.query( `query{ ${query}(filter: ${filter}) {${selectFields.join(" ")}} }` );
	}
	checkboxLabel( row?: any ): string
	{
		return row
			? `${this.selections.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`
			: `${this.isAllSelected() ? 'select' : 'deselect'} all`;
	}
	masterToggle()
	{
		if( this.isAllSelected() )
			this.selections.deselect( ...this.dataSource.data );
		else
			this.selections.select( ...this.dataSource.data );
	}

	cellClick( row:any ){  this.selection = this.selection == row ? null : row; this.selectionChanged.emit( this.selection ); }
	isAllSelected(){ return this.selections.selected.length==this.dataSource.data.length; }

	@Input() dataSource:MatTableDataSource<any>;
	@Input() selections:SelectionModel<any>;
	@Input() displayedColumns:Field[]//{ return this.schema.fields.filter( (x)=>x.displayed ); }
	@Input() showDeleted:boolean;
	@Input() showDeletedEvents:Observable<boolean>; private showDeletedSubscription: Subscription;
	@Input() sort:Sort = { active:"name", direction: 'asc' };
	@Output() selectionChanged = new EventEmitter();


	get displayedColumnNames(){ return (this.selections ? ["select"] : []).concat( this.displayedColumns.filter((x)=>x.displayed).map((x)=>x.name) ); };
	get stringColumnNames(){ return this.displayedColumns.filter( (x)=>x.type.underlyingKind==FieldKind.SCALAR && x.type.underlyingName=="String" ).map( (x)=>x.name ); }
	get objectColumnNames(){ return this.displayedColumns.filter( (x)=>x.type.underlyingKind==FieldKind.OBJECT ).map( (x)=>x.name ); }
	get listColumnNames(){ return this.displayedColumns.filter( (x)=>x.type.underlyingKind==FieldKind.LIST ).map( (x)=>x.name ); }
	get dateColumnNames(){ return this.displayedColumns.filter( (x)=>x.type.underlyingName=="DateTime" ).map( (x)=>x.name ); }
	selection:any;

	viewPromise:Promise<boolean>;
}