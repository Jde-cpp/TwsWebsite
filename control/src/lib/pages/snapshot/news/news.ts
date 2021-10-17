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
	get class(){ return ""; }
	get date(){ return new Date( this.goog.publicationDate*1000 ); }
	disabled:boolean=true;
	get display():string
	{
		var dateDisplay = DateUtilities.display( this.date );
		let header = this.header.endsWith( ` - ${this.goog.source}` ) ? this.header.substr( 0, this.header.length-this.goog.source.length-3 ) : this.header;
		//let template = document.createElement('template');
		//template.innerHTML = this.goog.description.trim();
		//let anchor = template.content.firstChild  as HTMLAnchorElement;
		//let span = <any>document.createElement('span');// as HTMLSpanElement;
		//let span = `<span onclick="window.open('${anchor.href}', '_blank')">${anchor.innerText}</span>`
		//span.innerText = anchor.innerText;
		//span["onclick"] = `window.open('${anchor.href} ', '_blank');`
		//anchor.setAttribute( "style", "text-decoration: none;" );
		//anchor["class"] = "directLink";
		//anchor["className"] = "directLink";
		let s = `${dateDisplay} - ${header}`;
		return s;
	}
	get header(){ return this.goog.title; }
	get imgSrc():string
	{
		//let url = `${this.goog.sourceUrl}/favicon.ico`;
		let url = `http://www.google.com/s2/favicons?domain=${this.goog.sourceUrl}`;
		if( this.goog.sourceUrl=="https://seekingalpha.com" )
			url = `${this.goog.sourceUrl}/samw/favicon.ico`;
		else if( this.goog.sourceUrl=="https://www.bloomberg.com" )
			url = "https://assets.bwbx.io/s3/javelin/public/hub/images/favicon-black-63fe5249d3.png";
		else if( this.goog.sourceUrl=="https://www.investmentnews.com" )
			url = "https://s32566.pcdn.co/wp-content/themes/pbc/src/images/favicons/favicon-32x32.png";
		else if( this.goog.sourceUrl=="https://www.etfstream.com" )
			url = "https://www.etfstream.com/images/cropped-ETFStream-02-32x32.png";
		else if( this.goog.sourceUrl=="https://www.financialexpress.com" )
			url = "https://images.financialexpress.com/2021/02/FE-favicon-32x32.png";
		else if( this.goog.sourceUrl=="https://www.investors.com" )
			url = "https://www.google.com/s2/favicons?domain=newhome.investors.com";
		else if( this.goog.sourceUrl=="https://www.fxstreet.com" )
			url = "https://staticcontent.fxstreet.com/website/static-html/favicon.ico";
		return url;
	}
	get link():string{ return this.goog.link; }
}
class TwsArticle extends Article
{
	constructor( private ib:Results.IHistoricalNews ){ super(); }
	article:string;
	get class(){ return this.ib.providerCode; }
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
	content:string;
	get id(){ return this.ib.articleId; }
	get header()
	{
		let start = this.ib.headline.indexOf('}')+1;
		if( this.ib.headline[start]=='!' )
			++start;
		return this.ib.headline.substr( start );
	}
	get link():string{ return ""; }
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