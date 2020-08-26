import { Component, AfterViewInit, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Sort} from '@angular/material/sort';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { IProfile } from 'src/app/services/profile/IProfile';
import { TwsService } from 'src/app/services/tws/tws.service';
import {TickObservable} from 'src/app/services/tws/ITickObserver'
import { OrderObservable } from 'src/app/services/tws/IOrderObserver';
import {DateUtilities} from 		'src/app/utilities/dateUtilities'
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { ProtoUtilities } from 'src/app/utilities/protoUtilities';
import { Settings } from 'src/app/utilities/settings'
import {DataSource,Order} from './DataSource'
import { ComponentPageTitle } from '../../material-site/page-title/page-title';

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbRequests from 'src/app/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;

import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbWatch from 'src/app//proto/watch';
import Watch = IbWatch.Jde.Markets.Proto.Watch;


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
//			this.resolve();
//			console.log('resolved');
		};
		if( this.name )
		{
			this.tws.watch( this.name ).then( (file)=>
			{
				onFile( file );
	/*			var results = new Map<number,Results.IContractDetails>();
				var ids = file.securities.map( (entry)=>{ return entry.contractId; } );
				this.tws.reqContractDetailsMulti( ids ).subscribe(
				{
					next: value=>{ results.set( value.contract.id, value ); },
					complete: ()=>
					{
						for( const entry of file.securities )
							this.details.push( entry.contractId ? results.get(entry.contractId) : null );
						if( this.details.length==0 )
							this.details.push( null );
						this.resolve();
					},
					error: e=>{ this.cnsle.error(e.message, e); }
				});*/
			}).catch( (e)=>
			{
				this.cnsle.error( e.message, e );
			});
		}
		else
			onFile( new Watch.File() );
	}
	onSelectedChanged( details:Results.IContractDetails|null|undefined )
	{
		this.selection = details;
	}
	save():Promise<void>
	{
		return this.tws.editWatch( this.file );
	}
	selection:Results.IContractDetails|null|undefined;
	get canAdd(){ return this.selection!==undefined; }
	file:Watch.File;
	@Input() set name(x)
	{
		if( !this.file )
			this._name = x;
		else
		{
			this._name = undefined;
			const oldName = name;
			const save = x && this.file.name!=x;
			this.file.name=x;
			if( save )
			{
				this.save().catch( (e)=>
				{
					this.file.name = oldName;
				});
			}
		}
	} get name():string{ return this.file?.name || this._name; } _name:string;
	get isPortfolio()
	{
		return this.file.isPortfolio;
	} set isPortfolio(x)
	{
		this.file.isPortfolio=x;
	}
	viewPromise:Promise<boolean>;
}