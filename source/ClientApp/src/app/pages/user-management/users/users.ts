import { Component, AfterViewInit, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Sort} from '@angular/material/sort';
import { IProfile, IErrorService} from 'jde-framework'

//import * as um2 from 'src/app/proto/UserManagement'; import UM = um2.Jde.UM;
import { ComponentPageTitle } from 'jde-material-site';
import { IGraphQL } from 'src/app/services/IGraphQL';


@Component( {selector: 'users', styleUrls: ['users.css'], templateUrl: './users.html'} )
export class UserComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private componentPageTitle:ComponentPageTitle, @Inject('IGraphQL') private graphQL: IGraphQL, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnInit()
	{
		this.componentPageTitle.title = this.componentPageTitle.title ? this.componentPageTitle.title+" | Users" : "Users";
	};

	ngOnDestroy()
	{
//		this.profile.save();
	}

	ngAfterViewInit():void
	{
//		this.profile.load().then( ()=>{this.load();} );
	}
	load()
	{
		//let users:UM.IUser[] = [];
		this.graphQL.Query( 'query{ authenticators{ id name }, users{ id name target description authenticatorId attributes created updated deleted } }' ).then( (data:any)=>
		{
			for( var x of data.authenticators )
				this.authenticators.set( x.id, x.name );
			this.users = data.users;
			this.viewPromise = Promise.resolve(true);
		}).catch( (e)=>console.error(e) );

	}
	displayedColumns:string[] = ["name","target","description","authenticator"];
	viewPromise:Promise<boolean>;
	users:[];
	authenticators = new Map<number,string>();
}

class PageSettings
{
	assign( value:PageSettings ){ this.sort = value.sort; }
	sort:Sort = {active: "id", direction: "asc"};
}
