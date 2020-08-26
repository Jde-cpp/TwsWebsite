import { Component, AfterViewInit, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Sort} from '@angular/material/sort';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { IProfile } from 'src/app/services/profile/IProfile';
import { TwsService } from 'src/app/services/tws/tws.service';
import {TickObservable} from 'src/app/services/tws/ITickObserver'
import { OrderObservable } from 'src/app/services/tws/IOrderObserver';
import {DateUtilities} from 		'src/app/utilities/dateUtilities'
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { ProtoUtilities } from 'src/app/utilities/protoUtilities';
import { Settings } from 'src/app/utilities/settings'
import {DataSource,Order} from './DataSource'
import { ComponentPageTitle } from '../../material-site/page-title/page-title';

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbRequests from 'src/app/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;

import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
//import { Data } from 'src/app/shared/tws/summary/summary';

@Component( {selector: 'watch', styleUrls: ['watch.css'], templateUrl: './watch.html'} )
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
