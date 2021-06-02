import { Component, AfterViewInit, OnInit, OnDestroy, Inject } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router, RouterModule, Routes} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {Sort} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { IProfile, IErrorService, Settings} from 'jde-framework'

import { ComponentPageTitle } from 'jde-material';
import { IGraphQL, Table, FieldKind } from 'projects/jde-framework/src/lib/services/IGraphQL';
import { CdkColumnDef } from '@angular/cdk/table';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MetaObject } from 'projects/jde-framework/src/lib/utilities/JsonUtils';

@Component( { templateUrl: 'graph-ql-detail.html'} )
export class GraphQLDetailComponent implements OnDestroy, OnInit
{
	constructor( private route: ActivatedRoute, private router:Router, private dialog : MatDialog, private componentPageTitle:ComponentPageTitle, @Inject('IGraphQL') private graphQL: IGraphQL, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{
		this.target = this.router.url.substring( this.router.url.lastIndexOf('/')+1 );
	}

	ngOnDestroy(){ this.profile.save(); }
	ngOnInit()
	{
		this.router.events.pipe( filter(e=>e instanceof NavigationEnd) ).subscribe( this.onNavigationEnd );
	}
	ngAfterViewInit():void
	{
		var grandParent = this.route.parent;
		var parentUrl = this.route.routeConfig.path.substr( 0, this.route.routeConfig.path.length-4 );
		var parent = grandParent.routeConfig.children.find( (x)=>x.path==parentUrl );
		this.name = parent.data.name;
		var display = parent.data?.display || "name";

		this.profile = new Settings<PageSettings>( PageSettings, `${this.type}-detail`, this.profileService );
		this.profile.load().then( ()=>
		{
			this.graphQL.schema( [this.type] ).then( (tables)=>
			{
				this.schema = tables[0];
				var columns = ["name", "target"];
				if( !columns.includes(display) )
					columns.push( display );
				let ql = `query{ ${this.schema.objectCollectionName}(deleted:null){${columns.join(" ")}} }`;
				this.graphQL.query( ql ).then( (data:any)=>
				{
					let results = data[this.schema.objectCollectionName];
					let siblings = new Map<string,string>();
					if( results )
					{
						var parent = this.route.url["value"][0].path;
						siblings.set( parent, parent.charAt(0).toUpperCase()+parent.slice(1) );
						results.forEach( x => siblings.set(x.target,x[display]) );
					}
					this.siblings.next( siblings );
					if( this.target!='$new' )
						this.load();
					else
						this.viewPromise = Promise.resolve( true );
				});
			});
		});
	}
	onNavigationEnd =( val:NavigationEnd )=>///settings
	{
		if( val.url.split('/').length==3 )
			return;
		console.log( `onNavigationEnd( ${val} )` );
		this.target = this.router.url.substring( this.router.url.lastIndexOf('/')+1 );//settings
		var grandParent = this.route.parent;
		var parentUrl = this.route.routeConfig.path.substr( 0, this.route.routeConfig.path.length-4 );//roles
		if( this.target==parentUrl )
			return;
		var parent = grandParent.routeConfig.children.find( (x)=>x.path==parentUrl );
		var paths = [this.target, parent.data.name];
		for( let x = grandParent; x.routeConfig?.data?.name; x = x.parent )
			paths.push( x.routeConfig.data.name );
		if( this.target=="users" || this.target=="roles" )
			debugger;
		if( paths[0].toUpperCase()==paths[2].toUpperCase() )
			return;
		this.componentPageTitle.title = paths.join( " | " );
		this.load();
	}
	load()
	{
		if( this.target=="settings" )
			debugger;
		let fetch = ( columns )=>
		{
			let ql = `query{ ${this.fetchName}(filter:{target:{ eq:"${this.target}"}}){ ${columns} } }`;
			this.graphQL.query( ql ).then( (data:any)=>
			{
				if( data==null )
					this.cnsle.error( `${this.target} not found` );
				else
					this.data = data[this.fetchName];
				this.viewPromise = Promise.resolve(true);
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
					if( table.typeName.startsWith(this.schema.typeName) )
						table.subType = new MetaObject( table.typeName.substring(this.schema.typeName.length) );
					else if( table.typeName.endsWith(this.schema.typeName) )
						table.subType = new MetaObject( table.typeName.substring(0, table.typeName.length-this.schema.typeName.length) );
					this.tabs.push( table );
					columns = columns.concat( ` ${table.objectCollectionName}{${table.columns}}` );
				}
				if( this.target=='$new' )
					this.viewPromise = Promise.resolve(true);
				else
					fetch( columns );//query {  role(target:"user_management") { id name attributes created deleted updated description target  groups{id name attributes created deleted updated description target } rolePermissions { rightId id name api{id name} }  }  }
			});
		}
		else
			fetch( columns );
	}
	onSave( newValue:any )
	{
		//this.data should already be updated.
		//for( let m in newValue )
		//	newValue
		//debugger;
	}
	get fetchName():string{ return this.schema.objectReferenceName; }
	name:string;
	data:any;
	get settings(){ return this.profile.value;}
	profile:Settings<PageSettings>;// = new Settings<PageSettings>( PageSettings, "UserComponent", this.profileService );
	schema:Table;
	siblings: Subject<Map<string,string>> = new Subject<Map<string,string>>();
	tabs = new Array<Table>();
	target:string;
	get type():string{ return this.name.substr( 0, this.name.length-1 ); }
	viewPromise:Promise<boolean>;
}

class PageSettings
{
	assign( value:PageSettings ){ this.tabIndex = value.tabIndex;  }
	tabIndex:number=0;
	//sort:Sort = {active: "name", direction: "asc"};
}
