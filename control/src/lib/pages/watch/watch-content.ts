import { Component, AfterViewInit, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import {IErrorService} from 'jde-framework'
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
	{
		this.componentPageTitle.title = this.componentPageTitle.title ? this.componentPageTitle.title+" | Watch" : "Watch";
	};

	ngOnDestroy()
	{}

	ngAfterViewInit():void
	{
		let onFile = ( file )=>
		{
			this.file = file;
			this.viewPromise = Promise.resolve(true);
		};
		if( this.name )
			this.tws.watch( this.name ).then( (file)=>{ onFile( file ); }).catch( (e)=>{this.cnsle.error( e.message, e ); });
		else
			onFile( new Watch.File() );
	}
	onSelectedChanged( details:Results.IContractDetailsResult|null|undefined ){ this.selection = details; }
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
	viewPromise:Promise<boolean>;
}