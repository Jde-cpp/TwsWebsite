import { Component, EventEmitter, Input, Output, Inject, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatRadioChange} from '@angular/material/radio'
import { Subject, Observable, Subscription, forkJoin, CompletionObserver } from 'rxjs';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { IProfile } from 'src/app/services/profile/IProfile';
import { TwsService } from 'src/app/services/tws/tws.service';
import { TickEx } from 'src/app/services/tws/Tick';
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

//1 -

@Component({ selector: 'news', /*styleUrls: ['optionTable.component.css'],*/ templateUrl: './news.html' })
export class NewsComponent implements OnInit, OnDestroy
{
	ngOnInit()
	{
		this.tabSubscription = this.tabEvents.subscribe( {next: value=>{this.isActive = this.index==value;}} );
	}
	ngOnDestroy()
	{
		//this.pageSettings.save();
	}

	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
	@Input() index:number;

	isActive:boolean;
	//pageSettings = new Settings<PageSettings>( PageSettings, 'OptnTabCmpnnt', this.profile );
}