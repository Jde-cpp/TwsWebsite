import { Component, AfterViewInit, ViewChild, OnInit, OnDestroy, Inject } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { FormControl } from '@angular/forms';
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
		this.componentPageTitle.title = "Watch";
	};

	ngOnDestroy()
	{
		this.profile.save();
	}

	async ngAfterViewInit()
	{
		this.selected.valueChanges.subscribe( index=>
		{
			const n = this.names[index];
			if( this.settings.selectedName != n )
			{
				console.log( `SaveProfile - index=${index}, name=${n}, previous=${this.settings.selectedName}` );
				this.settings.selectedName = n;
				this.profile.save();
			}
		});

		try
		{
			await this.profile.loadedPromise;
			console.log( `Profile - selected=${this.settings.selectedName}` );
			let saved = await this.tws.watchs();
			for( let name of this.settings.names.filter( (n)=>saved.includes(n)) )
				this.names.push( name );
			for( let name of saved.filter((n)=>!this.settings.names.includes(n)) )
				this.names.push( name );
			this.names.push( "" );
			this.selected.setValue( Math.max(0, this.names.indexOf(this.settings.selectedName)) );
			this.viewPromise = Promise.resolve( true );
		}
		catch( e )
		{
			this.cnsle.error( e["message"], e );
		}
	}
	onTabChange( e )
	{
		this.selected.setValue( e );
	}
	names:string[]=[];
	profile = new Settings<PageSettings>( PageSettings, "WatchComponent", this.profileService );
	selected = new FormControl( 0 );
	get settings():PageSettings{ return this.profile.value; }
	@ViewChild( 'watchTabs', {static: false} ) watchTabs;
	get selectedIndex(){ return this.selected.value; }
	viewPromise:Promise<boolean>;
}

class PageSettings
{
	assign( x:PageSettings ){ this.sort = x.sort; this.names=x.names; this.selectedName=x.selectedName; }
	sort:Sort = {active: "id", direction: "asc"};
	names:string[]=[];
	selectedName:string;
}