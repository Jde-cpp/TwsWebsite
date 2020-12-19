import { Component, EventEmitter, Input, Output, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IProfile } from 'jde-framework';
import { TwsService } from 'jde-tws';
import { TickDetails } from 'jde-tws';
import {Settings} from 'jde-framework'

import * as IbResults from 'dist/jde-tws-assets/src/assets/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
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
		return `${dateDisplay} - ${this.ib.headline}`;
	}

	article:string;
//	articlePromise
	get articleLoad():Promise<string>
	{
		return new Promise( (resolve, reject)=>
		{
			this.tws.reqNewsArticle(this.ib.providerCode, this.ib.articleId).then( (article)=>
			{
				resolve( article.value );
			}).catch( (e)=>reject(e) );
		});
	}
}

@Component({ selector: 'news', /*styleUrls: ['optionTable.component.css'],*/ templateUrl: './news.html' })
export class NewsComponent implements OnInit, AfterViewInit, OnDestroy
{
	constructor( private tws:TwsService, @Inject('IProfile') private profileService: IProfile )
	{}
	ngOnInit()
	{
		this.tabSubscription = this.tabEvents.subscribe( {next: value=>{this.isActive = this.index==value;}} );
	}
	ngAfterViewInit()
	{
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
		//this.pageSettings.save();

	}
	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
	@Input() index:number;
	@Input() tick:TickDetails;

	collection=new Array<Article>();
	isActive:boolean;
	static settings:Settings<NewsSettings>;
	viewPromise:Promise<boolean>;
}