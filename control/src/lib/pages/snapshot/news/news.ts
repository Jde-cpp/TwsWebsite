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

class Article
{
	constructor( private tws:TwsService, private ib:Results.IHistoricalNews )
	{}

	get display():string
	{
		var dateDisplay = DateUtilities.display( new Date(this.ib.time*1000) );
		return `${dateDisplay} - ${this.header}`;
	}
	article:string;
	articleLoad():Promise<string>
	{
		if( !this.viewPromise )
		{
			this.viewPromise = new Promise( async (resolve)=>
			{
				const article = await this.tws.reqNewsArticle( this.ib.providerCode, this.ib.articleId );
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
	viewPromise:Promise<string>;
	get id(){ return this.ib.articleId; }
	get header()
	{
		let start = this.ib.headline.indexOf('}')+1;
		if( this.ib.headline[start]=='!' )
			++start;
		return this.ib.headline.substr( start );
	}
}

@Component({ selector: 'news', /*styleUrls: ['optionTable.component.css'],*/ templateUrl: './news.html' })
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
	ngAfterViewInit()
	{
		console.log( "NewsComponent::ngAfterViewInit" );
		let request = ()=>
		{
			this.tws.reqHistoricalNews( this.tick.contractId, NewsComponent.settings.value.providers, 15 ).then( (collection)=>
			{
				collection.values.forEach( element => {this.collection.push(new Article(this.tws, element));} );
				this.viewPromise = Promise.resolve( true );
			});
		}
		if( NewsComponent.settings )
			request();
		else
		{
			NewsComponent.settings = new Settings<NewsSettings>( NewsSettings, `NewsSettings`, this.profileService );
			NewsComponent.settings.loadedPromise.then( ()=>
			{
				if( !NewsComponent.settings.value.providers )
				{
					this.tws.reqNewsProviders().then( (providers)=>
					{
						let keys = [] ;
						for( let provider in providers )
							keys.push( provider );
						NewsComponent.settings.value.providers=keys;
						request();
					});
				}
				else
					request();
			});
		}
	}
	ngOnDestroy()
	{
		NewsComponent.settings.save();

	}
	openGroup( articleId )
	{
		let a = this.collection.find( (x)=>x.id==articleId );
		a.articleLoad();
	}

	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
	@Input() index:number;
	@Input() tick:TickDetails;

	collection = new Array<Article>();
	isActive:boolean;
	static settings:Settings<NewsSettings>;
	viewPromise:Promise<boolean>;
}