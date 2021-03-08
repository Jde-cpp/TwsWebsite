import {Component, AfterViewInit, Inject, OnDestroy} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Field, FieldKind, IErrorService, IGraphQL, Table } from 'jde-framework';
import { GraphQLTable } from '../table/table';
import { Sort } from '@angular/material/sort';

interface Item
{
	id:number;
	name:string;
	description?:string;
}

@Component( {templateUrl: 'select-dialog.html'} )
export class SelectDialog implements OnDestroy, AfterViewInit
{
	constructor( public dialogRef:MatDialogRef<SelectDialog>, @Inject(MAT_DIALOG_DATA) public data:{selectedIds:number[], /*columns:string[],*/ schema:Table, mutation:string, linkTo:number, linkToField:string, title:string,isChildren:boolean,includeDeleted:boolean,subToField:string, subTo:number}, @Inject('IGraphQL') private graphQL: IGraphQL, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngAfterViewInit():void
	{
		let items = GraphQLTable.query( this.graphQL, this.schema, this.queryType, false, this.isFlags );
		this.displayedColumns = items.displayedColumns;
		this.query = items.query
		this.graphQL.query( items.query ).then( (results:any)=>
		{
			let items = results[this.schema.objectCollectionName];
			this.dataSource = new MatTableDataSource<Item>( items );
			const member = this.isFlags ? "name" : "id"; //TODO fix member logic.
			this.selections = new SelectionModel<Item>( true, items.filter((x)=>this.data.selectedIds.includes(x[member])) );
			this.viewPromise = Promise.resolve( true );
		} ).catch( (e)=>console.error(e.toString()) );

// 		var selectFields:string[] = [];
// //		if( !columns )
// //		{

// 			//let columns = [ "id", "name" ];
// 			//if( this.schema.fields )
// 			//	this.columns.push( ...this.data.columns );
// //		}
// 		debugger;
// 		let columns = this.schema.nonListFields.map( (f)=>f.type.underlyingKind==FieldKind.OBJECT ? `${f.name}{name}` : f.name );

// 		var filter = 'null';
// 		if( this.isFlags )
// 			filter = "{id: {ne: 0}}";
// 		else if( this.schema.fields.find((x)=>x.name=="deleted") )
// 			filter = "{deleted: {eq:null}}";
// 		this.graphQL.query( `query{ ${this.query}(filter: ${filter}) {${columns.join(" ")}} }` ).then( (results:any)=>
// 		{
// 			debugger;
// 			let items = results[this.query];
// 			this.dataSource = new MatTableDataSource<Item>( items );
// 			const member = this.isFlags ? "name" : "id"; //TODO fix member logic.
// 			this.selection = new SelectionModel<Item>( true, items.filter((x)=>this.data.selectedIds.includes(x[member])) );
// 			this.viewPromise = Promise.resolve( true );
// 		} ).catch( (e)=>console.error(e.toString()) );
//		this.viewPromise = Promise.resolve( true );
	}

	ngOnDestroy()
	{}
	checkboxLabel( row?: Item ): string
	{
		return row
			? `${this.selections.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`
			: `${this.isAllSelected() ? 'select' : 'deselect'} all`;
	}
	onCancelClick = ()=>this.dialogRef.close( null );
	onSubmitClick():void
	{
		var queries = [];
		if( this.isFlags )
		{
			let names = [];
			for( let item of this.dataSource.data.filter((x)=>this.selections.isSelected(x)) )
				names.push( item.name );
			//{ mutation{ updateRolePermission("roleId": 9, "permissionId": 1, "input":{"query{ rights(filter: {id: {ne: 0}}) {id name} }": ["Administer","Read","Write"]} ) } }
			//{ mutation{ updateRolePermission("roleId":{}, "permissionId":{}, "input":{"rights": ["Administer", "Write"]}) } }" );
			if( names.length!=this.data.selectedIds.length && names.sort().join()!==this.data.selectedIds.sort().join() )
				queries.push( `{ mutation{ update${this.data.mutation}("${this.data.linkToField}": ${this.data.linkTo}, "${this.data.subToField}": ${this.data.subTo}, "input":{"${this.queryType}": ["${names.join('","')}"]} ) } }` );
		}
		else
		{
			for( let item of this.dataSource.data )
			{
				const selected = this.selections.isSelected( item );
				let op;
				if( selected )
				{
					if( !this.data.selectedIds.includes(item.id) )
						op = "add";
				}
				else if( this.data.selectedIds.includes(item.id) )
					op = "remove";
				if( op )
				{
					var childId = this.data.isChildren ? item.id : this.data.linkTo;
					var parentId = this.data.isChildren ? this.data.linkTo : item.id;
					queries.push( `{ mutation{ ${op}${this.data.mutation}("input":{ "${this.data.linkToField}": ${this.data.linkTo}, "${this.fkField}": ${item.id}} ) } }` );
				}
			}
		}
		if( queries.length )
		{
			let index=0;
			queries.forEach( (ql)=>
			{
				this.graphQL.query( ql ).then( (x)=>
				{
//					console.log( `index=${index+1}==${queries.length}` );
					if( ++index==queries.length )
						this.dialogRef.close( queries.length );
				} ).catch( (e)=>{ this.cnsle.error("Save failed."); console.error(e.message); this.saving = false;} );
			} );
		}
		else
		{
			console.log( "nothing to save" );
			this.onCancelClick();
		}
	}

	//columns = new Array<string>();
	isAllSelected = ()=>this.selections.selected.length==this.dataSource.data.length;
	displayedColumns:Field[] = [];//(){ if( !this._displayedColumns ){this._displayedColumns=this.columns.filter( (x)=>x!="id" ); this._displayedColumns.unshift("select");} return this._displayedColumns; } _displayedColumns:string[];
	get isFlags(){ return this.data.includeDeleted; }
	get title(){ return this.data.title; }
	get fkField(){ return this.queryType.substr(0, this.queryType.length-1)+"Id"; }
	sort:Sort = { active:"name", direction: 'asc' };
	//dataSource:MatTableDataSource<Item>;
	items:[];
	get schema(){ return this.data.schema; }
	get queryType(){ return this.schema.subType?.objectCollectionName ?? this.schema.objectCollectionName; }
	query:string;
	saving:false;
	dataSource:MatTableDataSource<any>;
	selections:SelectionModel<any>;//add to inputs for table.

	viewPromise:Promise<boolean>;
}