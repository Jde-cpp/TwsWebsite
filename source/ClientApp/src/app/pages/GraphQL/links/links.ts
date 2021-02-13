import { Component, AfterViewInit, OnInit, OnDestroy, Inject, ViewChild, Input } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router, RouterModule, Routes} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {Sort} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { IProfile, IErrorService, Settings} from 'jde-framework'

import { ComponentPageTitle } from 'jde-material-site';
import { IGraphQL, Table, FieldKind } from 'projects/jde-framework/src/lib/services/IGraphQL';
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
/*		var grandParent = this.route.parent;
		var parentUrl = this.route.routeConfig.path.substr( 0, this.route.routeConfig.path.length-4 );
		var parent = grandParent.routeConfig.children.find( (x)=>x.path==parentUrl );
		this.name = parent.data.name;
*/
		var id = this.router.url.substring( 0, this.router.url.lastIndexOf('/')+1 )+this.table.jsonName;
		this.profile = new Settings<PageSettings>( PageSettings, id, this.profileService );
		this.profile.load().then( ()=>
		{
			this.displayedColumns = this.table.fields.filter( (x)=>x.displayed ).map( (x)=>x.name );
			this.load();
		} );
/*		this.profile = new Settings<PageSettings>( PageSettings, `${this.type}-detail`, this.profileService );
		this.profile.load().then( ()=>
		{
			this.graphQL.schema( [this.type] ).then( (tables)=>
			{
				this.schema = tables[0];
				let ql = `query{ ${this.schema.plural}(deleted:null){name target} }`;
				this.graphQL.query( ql ).then( (data:any)=>
				{
					let results = data[this.schema.plural];
					let siblings = new Map<string,string>();
					if( results )
					{
						var parent = this.route.url["value"][0].path;
						siblings.set( parent, parent.charAt(0).toUpperCase()+parent.slice(1) );
						results.forEach( x => siblings.set(x.target,x.name) );
					}
					this.siblings.next( siblings );
					this.load();
				});
			});
		});
*/
	}
	onNavigationEnd =( val:NavigationEnd )=>
	{
/*		this.target = this.router.url.substring( this.router.url.lastIndexOf('/')+1 );
		var grandParent = this.route.parent;
		var parentUrl = this.route.routeConfig.path.substr( 0, this.route.routeConfig.path.length-4 );
		if( this.target==parentUrl )
			return;
		var parent = grandParent.routeConfig.children.find( (x)=>x.path==parentUrl );
		var paths = [this.target, parent.data.name];
		for( let x = grandParent; x.routeConfig?.data?.name; x = x.parent )
			paths.push( x.routeConfig.data.name );
		this.componentPageTitle.title = paths.join( " | " );
		this.load();
*/
	}
	load()
	{
		this.viewPromise = Promise.resolve(true);
/*		let fetch = ( columns )=>
		{
			let ql = `query{ ${this.fetchName}(target:"${this.target}"){ ${columns} } }`;
			this.graphQL.query( ql ).then( (data:any)=>
			{
				if( data==null )
					this.cnsle.error( `${this.target} not found` );
				else
					this.data = data[this.fetchName];

			}).catch( (e)=>console.error(e) );
		}
		this.tabs.length = 0;
		let columns = this.schema.columns;
		var lists = this.schema.listFields.map( (x)=>x.type.ofType.name );
		if( lists.length )
		{
			this.graphQL.schema( lists ).then( (tables)=>
			{
				for( let table of tables )
				{
					this.tabs.push( table )
					columns = columns.concat( ` ${table.plural}{${table.columns}}` );
				}
				fetch( columns );
			});
		}
		else
			fetch( columns );
*/
	}
	cellClick( row:any ){  this.selection = this.selection == row ? null : row; }
	addLink()
	{
		let selectedIds = this.items.map( (x)=>x.id );
		const dialogRef = this.dialog.open( SelectDialog,
		{
			width: '600px',
			height: '650px',
			data: { selectedIds:selectedIds, query:this.table.plural, mutation:`add${this.parentType}${this.table.name}`, linkTo:this.parent.id, title:this.table.display }
		});
		dialogRef.afterClosed().subscribe( result =>
		{
			if( result )
				this.load();
		});

		//selectedIds:number[], query:string, mutation:string, linkTo:number, title:string
	}
	removeLink()
	{

	}

	get haveSelection(){ return this.selection!==undefined; }
	selection:any|null|undefined;
	@Input() table:Table;
	get items(){ return this.parent[this.table.plural]; }
	@Input() parent:any;
	profile:Settings<PageSettings>;
	get sort(){return this.profile.value.sort; }
	displayedColumns:string[];// = ["name","target","description","authenticator", "deleted"];
	@Input() parentType:string;
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
