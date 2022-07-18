import { Component, EventEmitter, Input, Output, Inject, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import Long from "long";
import { IErrorService, IProfile } from 'jde-framework';
import { TwsService } from '../../../services/tws.service';
import { TickDetails } from '../../../services/Tick';
import {Settings} from 'jde-framework'


import * as IBResults from 'jde-cpp/results'; import Results = IBResults.Jde.Markets.Proto.Results;

declare const twttr;

class TwitterSettings
{
	assign( value:TwitterSettings )
	{}
}
class Tweet
{
	constructor( private server:Results.ITweet )
	{}
	get authorId():Long{ return <Long>this.server.authorId; }
	author:Results.ITweetAuthor;
	get likesPerMinute():number{ return this.server.like/(new Date().getTime()-this.server.createdAt); }
	get display():string{ return this.server.text; }
	get id():string{ return this.server.id.toString(); }
	get imgSrc(){ return this.author?.profileUrl; }
	get likes(){ return this.server.like>1000 ? `${Math.round(this.server.like/1000)}k` : `${this.server.like}`; }
	get url(){ return "https://twitter.com/anyuser/status/"+this.id; }
}

@Component({ selector: 'twitter', styleUrls: ['twitter.scss'], templateUrl: './twitter.html', encapsulation: ViewEncapsulation.None })
export class TwitterComponent implements OnInit, AfterViewInit, OnDestroy
{
	constructor( private tws:TwsService, @Inject('IProfile') private profileService:IProfile, @Inject('IErrorService') private cnsl: IErrorService )
	{}
	ngOnInit()
	{
		console.log( "TwitterComponent::ngOnInit" );
		//this.tabSubscription = this.tabEvents.subscribe( {next: value=>{this.isActive = this.index==value;}} );
	}
	async ngAfterViewInit()
	{
		console.log( "TwitterComponent::ngAfterViewInit" );
		if( !TwitterComponent.settings )
		{
			TwitterComponent.settings = new Settings<TwitterSettings>( TwitterSettings, `TwitterSettings`, this.profileService );
			await TwitterComponent.settings.loadedPromise;
		}
		let [tweets,authorPromise] = this.tws.tweets( this.symbol )

		tweets.subscribe(
		{
			next: ( tweets:Results.ITweets ) =>
			{
				if( tweets.values.length>300 )
				{
					debugger;
					tweets.values.length = 300;
				}
				for( const t of tweets.values )
					this.collection.push( new Tweet(t) );
				this.viewPromise = Promise.resolve( true );
			},
			complete: ()=>this.collection.sort( (a, b)=>a.likesPerMinute-b.likesPerMinute ),
			error: (e)=>this.cnsl.error( e.message )
		} );
		let authors = await authorPromise;

		this.collection.forEach( (t)=>t.author=authors.values.find((a)=>!t.authorId.compare(a.id)) );
	}
	ngOnDestroy()
	{
		TwitterComponent.settings.save();
	}
	async block( e:PointerEvent, x:Tweet )
	{
		e.stopPropagation();
		debugger;
	//	let txt = '<a href="https://www.reddit.com/user/';
	//	let suffix = article.content.substring( article.content.indexOf(txt)+txt.length );
		await this.tws.twitterBlock( x.authorId );
	//	this.values.splice( this.values.indexOf(article), 1 );
	}
	openGroup( articleId )
	{
		setTimeout( ()=>twttr.widgets.load(), 500 );
	}

	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
	@Input() index:number;
	@Input() tick:TickDetails;
	get symbol(){return this.tick.contract.symbol;}
	collection = new Array<Tweet>();
	isActive:boolean;
	static settings:Settings<TwitterSettings>;
	viewPromise:Promise<boolean>;
}