import { Component, EventEmitter, Input, Output, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IProfile } from 'jde-framework';
import { TwsService } from '../../../services/tws.service';
import { TickDetails } from '../../../services/Tick';
import {Settings} from 'jde-framework'

import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import { DateUtilities } from 'jde-framework';


class NewsSettings
{
	assign( value:NewsSettings )
	{
		this.providers = value.providers;
	}
	providers:string[];
}
abstract class Article
{
	abstract readonly id:string;
	abstract readonly article:string;
	get class():string{return "";}
	abstract readonly date:Date;
	abstract readonly disabled:boolean;
	abstract readonly display:string;
	abstract readonly header:string;
	abstract readonly source:string;
	get imgSrc():string{return "";}
	abstract readonly link:string;
	abstract articleLoad( tws:TwsService ):Promise<string>;
	content:string;
	viewPromise:Promise<string>;
}
class GoogleArticle extends Article
{
	constructor( private goog:Results.IGoogleNews ){ super(); }
	articleLoad( tws:TwsService ):Promise<string>
	{
		this.content = this.goog.description;
		return this.viewPromise = Promise.resolve( this.goog.description );
	}

	get id(){ return this.goog.link; }
	get article():string{ return this.goog.description; }
	override get class(){ return ""; }
	get date(){ return new Date( this.goog.publicationDate*1000 ); }
	get source()
	{
		const base = this.goog.sourceUrl.substring( this.goog.sourceUrl.indexOf("//")+2 );
		const parts = base.split( '.' );
		return parts.length>2 ? parts[1] : parts[0];

	}
	disabled:boolean=true;
	get display():string
	{
		var dateDisplay = DateUtilities.display( this.date );
		let header = this.header.endsWith( ` - ${this.goog.source}` ) ? this.header.substr( 0, this.header.length-this.goog.source.length-3 ) : this.header;
		let s = `${dateDisplay} - ${header}`;
		return s;
	}
	get header(){ return this.goog.title; }
	override get imgSrc():string
	{
		let url = `http://www.google.com/s2/favicons?domain=${this.goog.sourceUrl}`;
		return url;
	}
	get link():string{ return this.goog.link; }
}
class TwsArticle extends Article
{
	constructor( private ib:Results.IHistoricalNews ){ super(); }
	article:string;
	override get class(){ return this.ib.providerCode; }
	get date(){ return new Date(this.ib.time*1000); }
	readonly disabled:boolean=false;
	get display():string
	{
		var dateDisplay = DateUtilities.display( this.date );
		return `${dateDisplay} - ${this.header}`;
	}
	articleLoad( tws:TwsService ):Promise<string>
	{
		if( !this.viewPromise )
		{
			this.viewPromise = new Promise( async (resolve)=>
			{
				const article = await tws.reqNewsArticle( this.ib.providerCode, this.ib.articleId );
				if( article.isText )
				{
					var value = article.value;
					console.log( this.header );
					console.log( value );
					if( value.startsWith(this.header) )
						value = value.substr( this.header.length );
					if( value.startsWith("&#10;") )
						value = value.substr( 5 );
					this.content = value.split( "&#10;" ).join( "<br/>" );
				}
				else
					this.content = article.value;

				resolve( this.content );
			});
		}
		return this.viewPromise;
	}
	override content:string;
	get id(){ return this.ib.articleId; }
	get header()
	{
		let start = this.ib.headline.indexOf('}')+1;
		if( this.ib.headline[start]=='!' )
			++start;
		return this.ib.headline.substr( start );
	}
	get link():string{ return ""; }
	get source(){ return this.ib.providerCode; }
}

@Component({ selector: 'news', styleUrls: ['news.scss'], templateUrl: './news.html' })
export class NewsComponent implements OnInit, AfterViewInit, OnDestroy
{
	constructor( private tws:TwsService, @Inject('IProfile') private profileService: IProfile )
	{
	}
	ngOnInit()
	{
		console.log( "NewsComponent::ngOnInit" );
		this.tabSubscription = this.tabEvents.subscribe( {next: value=>{this.isActive = this.index==value;}} );
	}
	async ngAfterViewInit()
	{
		console.log( "NewsComponent::ngAfterViewInit" );
		if( !NewsComponent.settings )
		{
			NewsComponent.settings = new Settings<NewsSettings>( NewsSettings, `NewsSettings`, this.profileService );
				await NewsComponent.settings.loadedPromise;
		}
		const providers = await this.tws.reqNewsProviders();
		let keys = [];
		for( const p in providers )
			keys.push( p );
		const articles = await this.tws.news( this.tick.contractId, keys, 15 );
		articles.historical.forEach( element => {this.collection.push(new TwsArticle(element));} );
		articles.google.forEach( n=>{this.collection.push(new GoogleArticle(n));} );
		this.collection.sort( (a,b)=>b.date.getTime()-a.date.getTime() );
		this.viewPromise = Promise.resolve( true );
	}
	ngOnDestroy()
	{
		NewsComponent.settings.save();

	}
	openGroup( articleId )
	{
		let a = this.collection.find( (x)=>x.id==articleId );
		a.articleLoad( this.tws );
	}

	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
	@Input() index:number;
	@Input() tick:TickDetails;

	collection = new Array<Article>();
	isActive:boolean;
	static settings:Settings<NewsSettings>;
	viewPromise:Promise<boolean>;
}