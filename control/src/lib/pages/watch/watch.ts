import { Component, AfterViewInit, OnInit, OnDestroy, Inject } from '@angular/core';
import {Sort} from '@angular/material/sort';
import {IErrorService} from 'jde-framework'
import { IProfile } from 'jde-framework';
import { TwsService } from '../../services/tws.service';
import { Settings } from 'jde-framework'
import { ComponentPageTitle } from 'jde-material';

@Component( {selector: 'watch.main-content.mat-drawer-container', styleUrls: ['watch.css'], templateUrl: './watch.html'} )
export class WatchComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private tws : TwsService, private componentPageTitle:ComponentPageTitle, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnInit()
	{
		this.componentPageTitle.title = this.componentPageTitle.title ? this.componentPageTitle.title+" | Watch" : "Watch";
		this.watchPromise = new Promise<boolean>( (resolve) => {this.resolve = resolve;} );
	};

	ngOnDestroy()
	{
		this.profile.save();
	}

	ngAfterViewInit():void
	{
		this.profile.loadedPromise.then( (value)=>
		{
			this.tws.watchs().then( (names)=>
			{
				names.push( "" );
				this.names = names;
				this.resolve( true );
			} ).catch( (e)=>{this.cnsle.error(e.message, e); });
		});
	}
	names:string[];
	names2:string[];
	profile = new Settings<PageSettings>( PageSettings, "WatchComponent", this.profileService );
	private resolve: Function|null = null;
	watchPromise:Promise<boolean>;
}

class PageSettings
{
	assign( value:PageSettings ){ this.sort = value.sort; }
	sort:Sort = {active: "id", direction: "asc"};
}
