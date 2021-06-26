import { Component, EventEmitter, Input, Output, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
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
	constructor( private server:Results.IReddit )
	{}

	get display(){ return this.server.title; }
	get content(){ return this.server.content; }

	/*get authorId():Long{ return <Long>this.server.authorId; }
	author:Results.ITweetAuthor;
	get likesPerMinute():number{ return this.server.like/(new Date().getTime()-this.server.createdAt); }

	get id():string{ return this.server.id.toString(); }
	get imgSrc(){ return this.author?.profileUrl; }
	get likes(){ return this.server.like; }
	get url(){ return "https://reddit.com/anyuser/status/"+this.id; }*/
}

@Component({ selector: 'reddit', styleUrls: ['reddit.css'], templateUrl: './reddit.html' })
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
			this.collection.push( new Entry(e) );
		this.viewPromise = Promise.resolve( true );
	}
	ngOnDestroy()
	{
		RedditComponent.settings.save();
	}
	openGroup( articleId )
	{
		setTimeout( ()=>twttr.widgets.load(), 500 );
	}

	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
	@Input() index:number;
	@Input() tick:TickDetails;
	get symbol(){return this.tick.contract.symbol;}
	collection = new Array<Entry>();
	isActive:boolean;
	static settings:Settings<RedditSettings>;
	viewPromise:Promise<boolean>;
}