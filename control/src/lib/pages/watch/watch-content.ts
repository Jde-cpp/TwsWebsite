import { Component, AfterViewInit, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import {SortDirection} from '@angular/material/sort';
import {IErrorService,Settings} from 'jde-framework'
import { IProfile } from 'jde-framework';
import { TwsService } from '../../services/tws.service';
import { ComponentPageTitle } from 'jde-material';

//import * as ib2 from 'dist/jde-tws-assets/src/assets/proto/ib'; import IB = ib2.Jde.Markets.Proto;
import * as ib2 from 'jde-cpp/ib';  import IB = ib2.Jde.Markets.Proto;

import * as IbRequests from 'jde-cpp/requests'; import Requests = IbRequests.Jde.Markets.Proto.Requests;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbWatch from 'jde-cpp/watch'; import Watch = IbWatch.Jde.Markets.Proto.Watch;
import { Subject } from 'rxjs';


@Component( {selector: 'watch-content', styleUrls: ['watch.css'], templateUrl: './watch-content.html'} )
export class WatchContentComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private tws : TwsService, private componentPageTitle:ComponentPageTitle, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnInit()
	{}

	ngOnDestroy()
	{}

	async ngAfterViewInit()
	{
		let self = this;
		this.profile = new Settings<PageSettings>( PageSettings, this.name ? WatchContentComponent.profileKey+"."+this.name : WatchContentComponent.profileKey, this.profileService );
		await this.profile.load();
		if( !self.name )
			self.file = new Watch.File();
		else
		{
			try
			{
				self.file = await self.tws.watch( self.name );
			}
			catch( e ){ self.cnsle.error( e["message"], e );  }
		}
		console.log( `${self.file.name} - ${self.file.securities.length}` );
		self.viewPromise = Promise.resolve(true);
	}
	onSelectedChanged( details:Results.IContractDetailsResult|null|undefined ){ this.selection = details; }
	onConfigurationClick(){}
	save():Promise<void>{ return this.tws.editWatch( this.file ); }
	selection:Results.IContractDetailsResult|null|undefined;
	get canAdd(){ return this.selection!==undefined; }
	file:Watch.File;
	@Input() set name(x)
	{
		if( !this.file )
			this._name = x;
		else
		{
			this._name = undefined;
			const oldName = this.name;
			const save = x && this.file.name!=x;
			this.file.name=x;
			if( save )
			{
				this.save().catch( (e)=>{this.file.name = oldName;} );
			}
		}
	} get name():string{ return this.file?.name || this._name; } _name:string;
	get isPortfolio(){return this.file.isPortfolio;} set isPortfolio(x){this.file.isPortfolio=x;}
	changeTable: Subject<string> = new Subject();

	profile:Settings<PageSettings>;
	get settings(){ return this.profile.value; }
	static profileKey = "Watch";
	viewPromise:Promise<boolean>;
}

export enum Columns
{
	Symbol,
	BidSize,
	Bid,
	Ask,
	AskSize,
	Last,
	Change,
	Range,
	Volume,
	ATH,
	PWL,
	YearHigh,
	YearLow,
	MA100
}
export class Sort{ active:Columns;direction:SortDirection };
export class PageSettings
{
	assign( x:PageSettings ){ this.sort = x.sort; this.columns = x.columns; this.hasDefaultLayout=x.hasDefaultLayout; }
	sort:Sort=null;//{ active:null, direction:'' }
	columns:Columns[]=[ Columns.Symbol, Columns.BidSize, Columns.Bid, Columns.Ask, Columns.AskSize, Columns.Last, Columns.Change, Columns.Range, Columns.Volume ];
	hasDefaultLayout = true;
	hasShares = true;
}