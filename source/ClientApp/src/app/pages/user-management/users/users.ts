import { Component, AfterViewInit, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Sort} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { IProfile, IErrorService, Settings} from 'jde-framework'
import { UserEntryDialog } from './dialog/user-dialog';

//import * as um2 from 'src/app/proto/UserManagement'; import UM = um2.Jde.UM;
import { ComponentPageTitle } from 'jde-material-site';
import { IGraphQL } from 'projects/jde-framework/src/lib/services/IGraphQL';

export interface IUser
{
	id:number;
	name:string;
	target:string;
	description?:string;
	authenticatorId:number;
	attributes:number;
	created:Date;
	updated?:Date;
	deleted?:Date;
}

@Component( {selector: 'users', styleUrls: ['users.css'], templateUrl: './users.html'} )
export class UserComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private dialog : MatDialog, private componentPageTitle:ComponentPageTitle, @Inject('IGraphQL') private graphQL: IGraphQL, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnInit()
	{
		this.componentPageTitle.title = this.componentPageTitle.title ? this.componentPageTitle.title+" | Users" : "Users";
	};

	ngOnDestroy()
	{
		this.profile.save();
	}
	ngAfterViewInit():void
	{
		this.profile.load().then( ()=>{this.load();} );
	}
	cellClick( row:IUser )
	{
		this.selection = this.selection == row ? null : row;
	}
	sortData( options:Sort )
	{
		const values = this.users.slice();
		const multiplier = options.direction === 'asc' ? 1 : -1;
		this.users = values.sort((a, b) =>
		{
			let lessThan = false;
			if( options.active=='name' ) lessThan = a.name<b.name;
			else if( options.active=='target' ) lessThan = a.target<b.target;
			else if( options.active=='description' ) lessThan = a.description<b.description;
			else if( options.active=='authenticator' ) lessThan = a.authenticatorId<b.authenticatorId;
			else
				throw `unknown sort:  '${options.active}'`;
			return (lessThan ? -1 : 1)*multiplier;
		});
		this._table.renderRows();
	}
	load()
	{
		this.graphQL.query( 'query{ authenticators{ id name }, users{ id name target description authenticatorId attributes created updated deleted } }' ).then( (data:any)=>
		{
			for( var x of data.authenticators )
				this.authenticators.set( x.id, x.name );
			this.users = data.users;
			this.viewPromise = Promise.resolve(true);
		}).catch( (e)=>console.error(e) );
	}

	edit()
	{
		if( this.selection.deleted )
			this.graphQL.query( `{ mutation { restoreUser("id":${this.selection.id}) } }` ).then( ()=>this.selection.deleted=null ).catch( (e)=>console.log(e) );
		else
			this.dialogOpen( this.selection );
	}
	insert(){ this.dialogOpen( null ); }

	dialogOpen( user:IUser )
	{
		const dialogRef = this.dialog.open( UserEntryDialog,
		{
			width: '600px',
			height: '450px',
			data: { user: user, authenticators: this.authenticators }
		});
		dialogRef.afterClosed().subscribe(result =>
		{
			if( result )
				this.load();
		});
	}
	delete()
	{
		const purge = this.selection.deleted!=null;
		const type = purge ? "purge" : "delete";
		const next = purge ? ()=>this.load() : ()=>this.selection.deleted = new Date();

		this.graphQL.query(`{ mutation { ${type}User(\"id\":${this.selection.id}) } }`).then( next ).catch( (e)=>{ console.error(e.toString()); } );
	}

	get haveSelection(){ return this.selection!==undefined; }
	selection:IUser|null|undefined;

	viewPromise:Promise<boolean> = Promise.resolve(true);
	displayedColumns:string[] = ["name","target","description","authenticator", "deleted"];
	@ViewChild('mainTable',{static: false}) _table:MatTable<IUser>;

	users:IUser[];
	authenticators = new Map<number,string>();
	profile = new Settings<PageSettings>( PageSettings, "UserComponent", this.profileService );
	get settings(){ return this.profile.value; }
	get sort(){ return this.settings.sort; }
	get showDeleted(){return this.settings.showDeleted;}
	toggleShowDeleted()
	{
		this.settings.showDeleted = !this.settings.showDeleted;
	}
}

class PageSettings
{
	assign( value:PageSettings ){ this.sort = value.sort; this.showDeleted = value.showDeleted; }
	sort:Sort = {active: "name", direction: "asc"};
	showDeleted:boolean = false;
}
