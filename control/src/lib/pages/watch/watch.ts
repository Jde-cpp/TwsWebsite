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
	};

	ngOnDestroy()
	{
		this.profile.save();
	}

	async ngAfterViewInit()
	{
		try
		{
			await this.profile.loadedPromise;
			this.names = await this.tws.watchs();
			this.names.push( "" );
			this.viewPromise = Promise.resolve( true );
		}
		catch( e )
		{
			this.cnsle.error( e["message"], e );
		}
	}
	names:string[];
	profile = new Settings<PageSettings>( PageSettings, "WatchComponent", this.profileService );
	viewPromise:Promise<boolean>;
}

class PageSettings
{
	assign( value:PageSettings ){ this.sort = value.sort; }
	sort:Sort = {active: "id", direction: "asc"};
}
