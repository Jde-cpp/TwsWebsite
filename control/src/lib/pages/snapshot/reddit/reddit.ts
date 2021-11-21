import { Component, EventEmitter, Input, Output, Inject, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { IProfile } from 'jde-framework';
import {Settings} from 'jde-framework'
import { TwsService } from '../../../services/tws.service';
import { TickDetails } from '../../../services/Tick';

import * as IBResults from 'jde-cpp/results'; import Results = IBResults.Jde.Markets.Proto.Results;

declare const twttr;

class RedditSettings
{
	assign( value:RedditSettings )
	{}
}
class Entry
{
	constructor( private server:Results.IReddit ){}

	get display(){ return this.server.title; }
	get content(){ return this.server.content; }
}

@Component({ selector: 'reddit', styleUrls: ['reddit.scss'], templateUrl: './reddit.html',encapsulation: ViewEncapsulation.None })
export class RedditComponent implements OnInit, AfterViewInit, OnDestroy
{
	constructor( private tws:TwsService, @Inject('IProfile') private profileService: IProfile )
	{}
	ngOnInit()
	{
		console.log( "RedditComponent::ngOnInit" );
		//this.tabSubscription = this.tabEvents.subscribe( {next: value=>{this.isActive = this.index==value;}} );
	}
	async ngAfterViewInit()
	{
		console.log( "RedditComponent::ngAfterViewInit" );
		if( !RedditComponent.settings )
		{
			RedditComponent.settings = new Settings<RedditSettings>( RedditSettings, `RedditSettings`, this.profileService );
			await RedditComponent.settings.loadedPromise;
		}
		let entries = await this.tws.reddit( this.symbol, "hot" );

		for( const e of entries.values )
			this.values.push( new Entry(e) );
		this.viewPromise = Promise.resolve( true );
	}
	ngOnDestroy()
	{
		RedditComponent.settings.save();
	}
	block( article:Entry )
	{
		let txt = '<a href="https://www.reddit.com/user/';
		let suffix = article.content.substr( article.content.indexOf(txt)+txt.length );
		this.tws.redditBlock( suffix.substr(0, suffix.indexOf('"')) );
	}

	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
	@Input() index:number;
	@Input() tick:TickDetails;
	get symbol(){ return this.tick.contract.symbol; }
	values = new Array<Entry>();
	isActive:boolean;
	static settings:Settings<RedditSettings>;
	viewPromise:Promise<boolean>;
}