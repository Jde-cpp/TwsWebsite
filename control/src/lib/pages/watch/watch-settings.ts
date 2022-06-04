import { Component, AfterViewInit, Input, OnInit, OnDestroy, Inject } from '@angular/core';
//import {Title} from "@angular/platform-browser";
import {ComponentPageTitle} from 'jde-material';
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
	constructor( private route: ActivatedRoute, private titleService:ComponentPageTitle, @Inject('IProfile') private profileService: IProfile )//, @Inject('IErrorService') private cnsle: IErrorService
	{
		titleService.title = `${this.name} | Settings`;
	}

	async ngAfterViewInit()
	{
		let self = this;
		this.profile = new Settings<PageSettings>( PageSettings, this.name ? WatchContentComponent.profileKey+"."+this.name : WatchContentComponent.profileKey, this.profileService );
		await this.profile.loadedPromise;
		self.setColumns();
		self.viewPromise = this.profile.loadedPromise;
	}
	private setColumns()
	{
		this.#shown = this.settings.columns.map( (i)=>Columns[i] );
		this.#hidden.length = 0;
		for( let c in Columns )
		{
			if( isNaN(Number(c)) && !this.shown.includes(c.toString()) )
				this.#hidden.push(c);
		}
	}
	addToList( event: CdkDragDrop<string[]> )
	{
		let change = event.previousContainer !== event.container; const toHidden = event.container.id=="hiddenDiv";
		if( !change && !toHidden && event.previousIndex!=event.currentIndex )
		{
			moveItemInArray( event.container.data, event.previousIndex, event.currentIndex );
			change = true;
		}
		else if( change )
		{
			if( toHidden )
				this.#shown.splice( event.previousIndex, 1 );
			else
				transferArrayItem( event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex );
		}
		if( change )
		{
			this.settings.columns = this.shown.map( (i)=>Columns[i] );
			this.profile.save();
			this.setColumns();
		}
	}
	get backUrl():string{ return this.route.snapshot.url[0].path; }
	get hidden():string[]{ return this.#hidden } #hidden = [];
	get shown():string[]{ return this.#shown; } #shown:string[];
	get hasDefaultLayout(){ return this.settings.hasDefaultLayout; } set hasDefaultLayout(x){ this.settings.hasDefaultLayout=x; this.profile.save(); }
	get hasShares(){ return this.settings.hasShares; } set hasShares(x){ this.settings.hasShares=x; this.profile.save(); }
	get name():string{ return this.route.snapshot.url[1].path; }

	profile:Settings<PageSettings>;
	get settings(){ return this.profile.value; }
	viewPromise:Promise<boolean>;
}