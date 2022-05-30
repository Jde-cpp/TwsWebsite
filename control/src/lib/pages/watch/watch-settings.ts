import { Component, AfterViewInit, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WatchContentComponent, PageSettings, Columns } from './watch-content'
import { Settings } from 'jde-framework'
import { IProfile } from 'jde-framework';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

/*
import {SortDirection} from '@angular/material/sort';

import { TwsService } from '../../services/tws.service';
import { ComponentPageTitle } from 'jde-material';

//import * as ib2 from 'dist/jde-tws-assets/src/assets/proto/ib'; import IB = ib2.Jde.Markets.Proto;
import * as ib2 from 'jde-cpp/ib';  import IB = ib2.Jde.Markets.Proto;

import * as IbRequests from 'jde-cpp/requests'; import Requests = IbRequests.Jde.Markets.Proto.Requests;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbWatch from 'jde-cpp/watch'; import Watch = IbWatch.Jde.Markets.Proto.Watch;
import { Subject } from 'rxjs';
*/

@Component( {selector: 'watch-settings.main-content.mat-drawer-container', templateUrl: './watch-settings.html', styleUrls: ['./watch-settings.scss']} )
export class WatchSettings implements AfterViewInit// , OnInit, OnDestroy
{
	constructor( private _route: ActivatedRoute, @Inject('IProfile') private profileService: IProfile )//, @Inject('IErrorService') private cnsle: IErrorService
	{}

	async ngAfterViewInit()
	{
		let self = this;
		this.profile = new Settings<PageSettings>( PageSettings, this.name ? WatchContentComponent.profileKey+"."+this.name : WatchContentComponent.profileKey, this.profileService );
		await this.profile.load();
		self.viewPromise = Promise.resolve(true);
	}

	addToList(event: CdkDragDrop<string[]>)
	{
		if( event.previousContainer === event.container )
			moveItemInArray( event.container.data, event.previousIndex, event.currentIndex );
		else
			transferArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex );
	}

	get hidden():string[]{ let y=[]; for( let c in Columns ) if( isNaN(Number(c)) && !this.shown.includes(c.toString()) ) y.push(c); return y; }
	get shown():string[]{ return this.settings.columns.map( (i)=>Columns[i] ); }
	get hasDefaultLayout():boolean{ return this.settings.hasDefaultLayout; }
	get hasShares():boolean{ return this.settings.hasShares; }
	get name():string
	{
		return this._route.snapshot.url[0].path;
	}
	profile:Settings<PageSettings>;
	get settings(){ return this.profile.value; }
	viewPromise:Promise<boolean>;
}