import { HostListener, Component, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
//import {MatOptionSelectionChange} from '@angular/material/select';
import { Observable } from 'rxjs';
import { TraceEntry } from './TraceEntry';
import { DataSource } from './DataSource';
import {Application} from '../../services/app/application';
import {AppService} from '../../services/app/app.service';
import {ApplicationStrings} from './Application';
import {LogSettings} from './Settings';
import { Settings } from 'jde-framework'
import { ComponentPageTitle } from 'jde-material-site';
import { IProfile } from 'jde-framework';
import {IErrorService} from 'jde-framework'
import { DateUtilities } from 'jde-framework';

import * as AppFromServer from 'jde-cpp/FromServer'; import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;

import * as AppFromClient from 'jde-cpp/FromClient';
import FromClient = AppFromClient.Jde.ApplicationServer.Web.FromClient;
import { FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { MatOptionSelectionChange } from '@angular/material/core';

// Move levels to combo.
// Add dates.
// Fix pause button.
// Comment out statuses
@Component({selector: 'logs',templateUrl: './logs.html',styleUrls: ['./logs.css']})
export class LogsComponent implements OnInit, OnDestroy
{
	constructor( public _componentPageTitle: ComponentPageTitle, private appService:AppService, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private errorService: IErrorService )
	{}

	ngOnInit()
	{
		this._componentPageTitle.title = "Logs";
		/*var beginningOfDay = DateUtilities.beginningOfDay( new Date() );
		beginningOfDay.setDate( beginningOfDay.getDate()-1 );
		//var yesterday = ;
		var start = beginningOfDay;
		this._start.setValue( start );*/
		this.data.onPageChange.subscribe( pageIndex=>this.pageIndex = pageIndex );
		this.settingsContainer.loadedPromise.then( ()=>
		{
			this.data.sort = this.settings.sort;
			this.appService.get().subscribe( applications =>
			{
				for( let app of applications )
				{
					this.applications.push( new Application(app) );
					this.applicationStrings.set( app.Id, new ApplicationStrings(app.Id) );
				}
				this.statusSubscription = this.appService.statuses();
				this.statusSubscription.subscribe( (statuses:FromServer.IStatuses) =>
				{
					for( const status of statuses.Values )
					{
						let found = this.applications.find( (existing)=>{return existing.id==status.ApplicationId;} );
						if( !found )
							console.error( `Could not find application '${status.ApplicationId}'` );
						else
							found.status = status;
					}
					//this.applicationId = 1;
					this.subscribe( this.applicationId, this.level );
					this.viewPromise = Promise.resolve( true );
				});
			});
		}).catch( (e)=>{console.log(e);} );
	}
	ngOnDestroy()
	{
		this.appService.statusUnsubscribe( this.statusSubscription );
		this.unsubscribe();
		this.settingsContainer.save();
	}


	onTraces = ( tuple:[number,FromServer.ITraceMessage] ):void =>
	{
		const applicationId = tuple[0];
		const trace =  tuple[1];
		//let status = this.applications.find( (app)=>{return app.id==trace.InstanceId;} );
		//if( !status )
		//	throw `no status for ${trace.InstanceId}`;
		var applicationStrings = this.applicationStrings.get( applicationId );
		let entry = new TraceEntry( trace, applicationStrings );
		var stringRequests = applicationStrings.requests( entry );
		if( stringRequests.Values.length>0 )
		{
			// for( let v of stringRequests.Values )
			// {
			// 	if( v.Value==4219300030 )
			// 		console.log( v.Value );
			// }

			this.appService.requestStrings( stringRequests ).subscribe( value =>{this.onStrings(value[0], value[1]);} );
		}

		entry.hidden = this.settings.hiddenMessages.indexOf(entry.messageId)!=-1;
		let data = stringRequests.Values.length>0 || this.buffer.length ? this.buffer : this.data;
		data.push( entry );
	}
	onStrings = ( applicationId:number, value:FromServer.IApplicationString ):void =>
	{
		//if( value.Id==4219300030 )
		//	console.log( value.Value );
		var applicationStrings = this.applicationStrings.get( applicationId );
		if( !applicationStrings )
			return;
		applicationStrings.set( <FromClient.EStringRequest>value.StringRequestType, value.Id, value.Value );
		let i=0;
		for( ; i<this.buffer.length; ++i )
		{
			let entry = this.buffer[i];
			const haveStrings = entry.message!=null && entry.file!=null && entry.functionName!=null;
			//haveStrings = entry.message!=null && entry.file!=null && entry.functionName!=null;
			if( haveStrings )
				this.data.push( entry );
			else
			{
				//console.log( `~(${entry.messageId}) haveStrings='${haveStrings}' message='${entry.message}' && ${entry.file} && ${entry.functionName} - ${entry.lineNumber}, buffer.length=${this.buffer.length-i}` );
				break;
			}
		}
		if( i>0 )
			this.buffer.splice( 0, i );
	//	if( !this.buffer.length )
	//		console.log( 'no buffer length' );
	}

	onChangeApplication( event:number )
	{
		//if( event.source.selected )
			this.subscribe( event, this.level );
	}
	subscribe( applicationId:number, level:FromServer.ELogLevel )
	{
		var subscription = { applicationId: applicationId, level: level, start:this.start, limit:this.limit };
		if( JSON.stringify(this.currentSubscription)!=JSON.stringify(subscription) )
		{
			//this.profileService.put<Settings>( LogsComponent.profileKey, this.settings );
			this.data.clear();
			this.unsubscribe();
			this.level = level;
			this.currentSubscription = subscription;
			this.settingsContainer.save();
			this.subscription = this.appService.logs( subscription.applicationId, subscription.level, subscription.start, subscription.limit );
			this.subscription.subscribe( traces => {this.onTraces(traces);} );
		}
	}

	unsubscribe()
	{
		if( this.subscription )
		{
			this.appService.logsUnsubscribe( this.currentSubscription.applicationId, this.subscription );
			this.subscription = null;
			this.currentSubscription = LogsComponent.DefaultSubscription;
		}
	}
	// @HostListener('window:scroll', ['$event'])
	// doSomething(event)
	// {
	// 	console.debug("Scroll Event", document.body.scrollTop );
	// 	console.debug("Scroll Event", window.pageYOffset );
	// }
	onLevelChange( logLevel:FromServer.ELogLevel )
	{
		this.subscribe( this.applicationId, logLevel );
	}
	//@ViewChild("table-body") configuration:ConfigureTableComponent;
	sortData(sort: Sort)
	{
		this.data.sortData( sort );
		this.sort = sort;
		this.settingsContainer.save();
  	}
	pageChangeEvent( event )
	{
		const offset = event.pageIndex * event.pageSize;
		this.selectedIndex = null;
		this.data.setPage( offset, event.pageSize );
	}
	cellClick( event, i )
	{
		const row = event.target.parentElement as Element;
		var index = +row.attributes["indx"].nodeValue;
		this.selectedIndex = index==this.selectedIndex ? null : index;
	}
	get selectedEntry():TraceEntry{return this.selectedIndex==null ? null : this.data.allData[this.selectedIndex]; }
	hideSelectedMessage()
	{
		this.settings.hiddenMessages.push( this.selectedEntry.messageId );
		this.filterData();
	}
	clearHiddenMessages()
	{
		this.settings.hiddenMessages.length=0;
		this.filterData();
	}
	filterData()
	{
		this.data.filterData( this.settings.hiddenMessages, this.filter, this.selectedEntry ? this.selectedEntry.index : -1, this.level );
	}
	navigateNext()
	{
		const messageId = this.selectedEntry.messageId;
		const index = this.selectedIndex;
		const size = this.data.allData.length;
		const stop = size+index;
		let foundIndex = index;
		for( let i=index+1; i!=stop; ++i )
		{
			const i2 = i<size ? i : i-size;
			if( this.data.allData[i2].messageId==messageId )
			{
				foundIndex = i2;
				break;
			}
		}
		if( foundIndex!=index )
		{
			this.selectedIndex = foundIndex;
			this.data.select( foundIndex );
		}
		else
			this.errorService.warn( "No other instances found." );
	}
	applyFilter( value:string )
	{
		this.filter = value;
		this.filterData();
	}
	get sort(){return this.settings.sort;} set sort(value){ this.data.sort = this.settings.sort = value;}
	settingsContainer:Settings<LogSettings> = new Settings<LogSettings>( LogSettings, "LogComponent", this.profileService );
	get settings(){ return this.settingsContainer.value;}


	//settings:Settings = new Settings();
	pageSize:number=23;
	pageIndex:number=0;
	data: DataSource = new DataSource( this.pageSize );
	get paused(){return this.data.paused;} set paused(value){this.data.paused=value;}
//	private socket:WebSocketSubject<string>;
	connected = false;
	displayedColumns : string[] = [ 'date', 'level', 'message', 'function', 'file', 'line' ];
	//configuration = { displayHeader:true }
	@ViewChild('mainTable',{static: false}) _table:MatTable<TraceEntry>;

	toLevel( level:FromServer.ELogLevel ):string{ return FromServer.ELogLevel[level]; }

	get applicationId(){ return this.settings.applicationId; } set applicationId(value){ this.settings.applicationId=value; }
	get start():Date{ return this._start.value; } set start(value:Date){ this._start.setValue(value); this.settings.start = value; } private _start = new FormControl();
	private filter:string; 	//get filter(){return _filter;} set filter(value){ this._filter = value.trim().toLowerCase(); }
	startChange( event: MatDatepickerInputEvent<Date> ){ this.subscribe( this.applicationId, this.level ); }
	private buffer:TraceEntry[] = [];
	static DefaultSubscription:ISubscription={ applicationId: 0, level:  FromServer.ELogLevel.None, start:null };
	private currentSubscription:ISubscription=LogsComponent.DefaultSubscription;//actual subscribtion
	private instanceId:number; //instance in dropdown
	private get level():FromServer.ELogLevel{ return this.settings.level; } private set level( value:FromServer.ELogLevel ){ this.settings.level=value; }
	private get limit():number{return this.settings.limit;} private set limit(value:number){ this.settings.limit = value; }
	private get application():Application|null{ return this.applications.find( (existing)=>{return existing.id==this.applicationId;} ); }
	private applications:Application[]=[];
	private subscription:Observable<[number,FromServer.ITraceMessage]>
	private applicationStrings:Map<number,ApplicationStrings> = new Map<number,ApplicationStrings>();
	private statusSubscription:Observable<FromServer.IStatuses>;
	//private static profileKey="logs";
	private selectedIndex:number|null=null;
	viewPromise:Promise<boolean>;
}

interface ISubscription{ applicationId:number, level:FromServer.ELogLevel, start:Date|null }