import { Component, AfterViewInit, OnInit, OnDestroy, Inject, ViewChild, Input, AfterContentInit, ContentChildren, QueryList, ContentChild } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router, RouterModule, Routes} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {Sort} from '@angular/material/sort';
import { MatColumnDef, MatHeaderRowDef, MatNoDataRow, MatRowDef, MatTable } from '@angular/material/table';
import { IProfile, IErrorService, Settings} from 'jde-framework'
import {StringUtils} from '../../../utilities/StringUtils'

import { ComponentPageTitle } from 'jde-material-site';
import { IGraphQL, Table, Field, FieldKind } from 'jde-framework';
import { filter } from 'rxjs/operators';
import { SelectDialog } from '../select-dialog/select-dialog';


@Component( { selector: 'graph-ql-links', templateUrl: 'links.html'} )
export class GraphQLLinkComponent implements OnDestroy, OnInit, AfterViewInit
{
	constructor( private route: ActivatedRoute, private router:Router, private dialog : MatDialog, private componentPageTitle:ComponentPageTitle, @Inject('IGraphQL') private graphQL: IGraphQL, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{
//		this.target = this.router.url.substring( this.router.url.lastIndexOf('/')+1 );
	}

	ngOnDestroy(){ this.profile.save(); }
	ngOnInit()
	{
		this.router.events.pipe( filter(e=>e instanceof NavigationEnd) ).subscribe( this.onNavigationEnd );
	}
	ngAfterViewInit():void
	{
		var id = this.router.url.substring( 0, this.router.url.lastIndexOf('/')+1 )+this.schema.objectReferenceName;
		this.profile = new Settings<PageSettings>( PageSettings, id, this.profileService );
		this.profile.load().then( ()=>
		{
			this.graphQL.mutations().then( (mutations)=>
			{
				const mutationA = `add${this.parentType}${this.schema.typeName}`;
				const mutationB = `add${this.schema.typeName}${this.parentType}`;
				const mutationC = `add${this.schema.typeName}`
				var mutation = mutations.find( (x)=>x.name==mutationA || x.name==mutationB || x.name==mutationC ); if( !mutation ) throw `could not find mutation ${mutationA}/${mutationB}`;
				this.mutation = mutation.name.substr( 3 );
				for( var field of this.schema.nonListFields.filter((x)=>x.displayed) )
				{
					//					this.table.addColumnDef( )
				}
				//this.displayedColumns = this.schema.fields.filter( (x)=>x.displayed ).map( (x)=>x.name );
				this.viewPromise = Promise.resolve( true );
			} );
		} );
	}
	onNavigationEnd =( val:NavigationEnd )=>
	{
	}
	edit( fieldName:string, element )
	{
		var field = this.schema.fields.find( (x)=>x.name==fieldName );
		this.graphQL.schema( [field.type.underlyingName] ).then( (x)=>
		{
			const dialogRef = this.dialog.open( SelectDialog,
			{
				width: '600px',
				height: '650px',
				data: { schema: x[0], selectedIds:element[fieldName], query:fieldName, mutation:this.mutation, linkTo:this.parent.id, linkToField: this.parentTypeField, subTo:element.id, subToField: this.schema.subType.idReferenceName, title:StringUtils.capitalize(fieldName), includeDeleted: true }
			});
			dialogRef.afterClosed().subscribe( result =>
			{
				if( result )
					this.load();
			});
		}).catch( (e)=>console.error(e) );
	}
	load()
	{
		this.viewPromise = null;
		const valueMember = this.schema.objectCollectionName;
		let ql = `query{ ${this.parentSelect}(filter:{ id:{eq:${this.parent.id}}}){ ${valueMember}{${this.schema.columns}} } }`;
		this.graphQL.query( ql ).then( (data:any)=>
		{
			this.parent[valueMember].length=0;
			data[this.parentSelect][valueMember].forEach( x => {this.parent[valueMember].push(x);} );
			this.viewPromise = Promise.resolve( true );
		} );
	}
	cellClick( row:any ){  this.selection = this.selection == row ? null : row; }
	addLink()
	{
		let show = (schema:Table)=>
		{
			let selectedIds = this.items.map( (x)=>x.id );
			const dialogRef = this.dialog.open( SelectDialog,
			{
				width: '600px',
				height: '650px',
				data: { selectedIds:selectedIds, schema:schema, mutation:this.mutation, linkTo:this.parent.id, linkToField: this.parentTypeField, title:`${this.parent.name} ${this.schema.display}` }
			});
			dialogRef.afterClosed().subscribe( result =>
			{
				if( result )
					this.load();
			});
		};
		if( this.schema.subType )
		{
			this.graphQL.schema( [this.schema.subType.typeName] ).then( (x)=>
			{
				show( x[0] );
			}).catch( (e)=>console.error(e) );
		}
		else
			show( this.schema );
	}
	removeLink()
	{//role permissions = this.schema.subType.objectReferenceName
		const ql = `{ mutation{ remove${this.mutation}("input":{ "${this.parentTypeField}": ${this.parent.id}, "${this.schema.subType.objectReferenceName}Id": ${this.selection.id}} ) } }`;
		this.graphQL.query( ql ).then( (x)=>
		{
			this.selection = null;
			this.load();
		} ).catch( (e)=>{this.cnsle.error(e);} );
	}

	get haveSelection():boolean{ return !!this.selection; }
	selection:any|null|undefined;
	@Input() schema:Table;
	@ViewChild(MatTable, {static: true}) table: MatTable<any>;
	get items(){ return this.parent[this.schema.objectCollectionName]; }
	@Input() parent:any;
	profile:Settings<PageSettings>;
	get sort(){return this.profile.value.sort; }
	get displayedColumns():Field[]{ return this.schema.fields.filter( (x)=>x.displayed && !["created", "updated", "deleted", "target"].includes(x.name) ); }
	get displayedColumnNames(){ return this.displayedColumns.map( (x)=>x.name ); };// = ["name","target","description","authenticator", "deleted"];
	get stringColumnNames(){ return this.displayedColumns.filter( (x)=>x.type.underlyingKind==FieldKind.SCALAR && x.type.underlyingName=="String" ).map( (x)=>x.name ); }
	get objectColumnNames(){ return this.displayedColumns.filter( (x)=>x.type.underlyingKind==FieldKind.OBJECT ).map( (x)=>x.name ); }
	get listColumnNames(){ return this.displayedColumns.filter( (x)=>x.type.underlyingKind==FieldKind.LIST ).map( (x)=>x.name ); }
	get dateColumnNames(){ return this.displayedColumns.filter( (x)=>x.type.underlyingName=="DateTime" ).map( (x)=>x.name ); }
	mutation:string;
	@Input() parentType:string;
	get parentSelect(){ return this.parentType.charAt(0).toLowerCase() + this.parentType.slice(1) }
	get parentTypeField(){ return this.parentSelect+"Id"; }
	viewPromise:Promise<boolean>;
	/*
	get fetchName():string{ return this.schema.jsonName; }
	name:string;
	data:any;
	get settings(){ return this.profile.value;}
	schema:Table;
	siblings: Subject<Map<string,string>> = new Subject<Map<string,string>>();
	tabs = new Array<Table>();
	target:string;
	get type():string{ return this.name.substr( 0, this.name.length-1 ); }
	*/
}

class PageSettings
{
	assign( value:PageSettings ){   }
	sort:Sort = {active: "name", direction: "asc"};
}
