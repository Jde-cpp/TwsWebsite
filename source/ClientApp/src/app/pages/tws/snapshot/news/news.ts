import { Component, EventEmitter, Input, Output, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatRadioChange} from '@angular/material/radio'
import { Subject, Observable, Subscription, forkJoin, CompletionObserver } from 'rxjs';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { IProfile } from 'src/app/services/profile/IProfile';
import { TwsService } from 'src/app/services/tws/tws.service';
import { TickEx, TickDetails } from 'src/app/services/tws/Tick';
import { IPageEvent } from 'src/app/shared/framework/paginator/paginator'
import { Option } from 'src/app/shared/tws/options/option-table/option'
import {OptionEntryDialog} from 'src/app/shared/tws/dialogs/option-entry/option-entry'
import {Settings,JoinSettings} from 'src/app/utilities/settings'

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { Day, DateUtilities } from 'src/app/utilities/dateUtilities';

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
		var dateDisplay = DateUtilities.display( this.ib.time );
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

	//articles = new Map<string,Results.INewsArticle>();
	collection=new Array<Article>();
	isActive:boolean;
	static settings:Settings<NewsSettings>;
	viewPromise:Promise<boolean>;

	//pageSettings = new Settings<PageSettings>( PageSettings, 'OptnTabCmpnnt', this.profile );
}