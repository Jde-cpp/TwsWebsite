import {Component, AfterViewInit, Inject, OnDestroy} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { IErrorService, IGraphQL } from 'jde-framework';


interface Item
{
	id:number;
	name:string;
	description:string;
}

@Component( {templateUrl: 'select-dialog.html'} )
export class SelectDialog implements OnDestroy, AfterViewInit
{
	constructor( public dialogRef:MatDialogRef<SelectDialog>, @Inject(MAT_DIALOG_DATA) public data:{selectedIds:number[], query:string, mutation:string, linkTo:number, title:string,isChildren:boolean}, @Inject('IGraphQL') private graphQL: IGraphQL, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngAfterViewInit():void
	{
		this.graphQL.query( `query{ ${this.data.query}(deleted: null) { id name description } }` ).then( (results:any)=>
		{
			let items = results[this.data.query];
			this.dataSource = new MatTableDataSource<Item>( items );
			this.selection = new SelectionModel<Item>( true, items.filter((x)=>this.data.selectedIds.includes(x.id)) );
			this.viewPromise = Promise.resolve( true );
		} );
	}

	ngOnDestroy()
	{}
	checkboxLabel( row?: Item ): string
	{
		return row
			? `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`
			: `${this.isAllSelected() ? 'select' : 'deselect'} all`;
	}
	onCancelClick = ()=>this.dialogRef.close( null );
	onSubmitClick():void
	{
		let selections = [];
		for( let item of this.dataSource.data )
		{
			const selected = this.selection.isSelected( item );
			var queries = [];
			let op;
			if( selected )
			{
				selections.push( item );
				if( !this.data.selectedIds.includes(item.id) )
					op = "add";
			}
			else if( this.data.selectedIds.includes(item.id) )
				op = "remove";
			if( op )
			{
				var childId = this.data.isChildren ? item.id : this.data.linkTo;
				var parentId = this.data.isChildren ? this.data.linkTo : item.id;
				queries.push( `{ mutation{ ${op}${this.data.query}("input":{ "childId": ${childId}, "parentId": ${parentId}} ) } }` );
			}
		}
		if( queries.length )
		{
			queries.forEach( (ql)=>
			{
				let index=0;
				this.graphQL.query( ql ).then( (x)=>
				{
					if( ++index==queries.length )
						this.dialogRef.close( selections );
				} ).catch( (e)=>this.cnsle.error(e) );
			} );
		}
		else
			this.onCancelClick();
	}
	isAllSelected = ()=>this.selection.selected.length==this.dataSource.data.length;
	displayedColumns = ["select", "name", "description"];
	get title(){ return this.data.title; }
	dataSource:MatTableDataSource<Item>;
	saving:false;
	selection:SelectionModel<Item>;
	viewPromise:Promise<boolean>;
}