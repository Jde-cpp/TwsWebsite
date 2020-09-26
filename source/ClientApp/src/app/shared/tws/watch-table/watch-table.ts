import {Component,EventEmitter, OnInit,Input,Output, Inject, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef, AfterViewInit} from '@angular/core';
import { TickEx, TickDetails } from 'src/app/services/tws/Tick';
import { TwsService } from 'src/app/services/tws/tws.service';
import { IErrorService } from 'src/app/services/error/IErrorService';
import { TickObservable } from 'src/app/services/tws/ITickObserver';
import { MarketUtilities } from 'src/app/utilities/marketUtilities';

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;

import * as IbRequests from 'src/app/proto/requests';
import Requests = IbRequests.Jde.Markets.Proto.Requests;
import { WatchRowComponent } from './watch-row/watch-row';
import { Subject } from 'rxjs';

import * as IbWatch from 'src/app//proto/watch';
import Watch = IbWatch.Jde.Markets.Proto.Watch;
import { subscribeOn } from 'rxjs/operators';
import { DateUtilities } from 'src/app/utilities/dateUtilities';
import { IProfile } from 'src/app/services/profile/IProfile';
import { Tick } from 'highcharts';
import { toMap } from 'src/app/utilities/collections';

@Component({selector: 'watch-table', templateUrl: './watch-table.html', styleUrls:['./watch-table.scss']})
export class WatchTableComponent implements OnInit, AfterViewInit
{
	constructor( private tws : TwsService, @Inject('IErrorService') private cnsle: IErrorService, private componentFactoryResolver:ComponentFactoryResolver, @Inject('IProfile') private profileService: IProfile )
	{}
	ngOnInit()
	{
		this.changeTable.subscribe( this.onChangeTable );
	}
	ngAfterViewInit()
	{
		this.load();
	}
   onChangeEdit(i,event)
	{
		console.log( `onChangeEdit(${i},${event})` );
	}
	onChangeSymbol( row:WatchRowComponent, symbol:string )
	{
		this.tws.reqSymbol( symbol ).then( (details)=>
		{
			if( details.length!=1 )
			{
				console.warn( `(${symbol}) - returned '${details.length}' records.` );
				return;
			}
			const detail = details[0];
			const constractId = detail.contract.id;
			const existing = this.findContract( constractId );
			if( !existing )
			{
				this.setRowDetail( row, detail );
				const index = this.indexOf( row.rowId );
				while( this.file.securities.length<index )
					this.file.securities.push( null );
				if( this.file.securities.length==index )
					this.file.securities.push( {contractId: constractId} );
				else
					this.file.securities[index].contractId = constractId;
				this.tws.editWatch( this.file ).catch( (e)=>this.cnsle.error(e.message) );
				if( index==this.rows.length-1 )
					this.addRow();
			}
		}).catch( (e)=> console.log(e.error?.message) );//`${symbol} return ${e.details.length} records.`)
	}
	onChangeTable = ( x:string )=>
	{
		if( x=="insert" )
			this.lineAdd();
		else if( x=="delete" )
			this.lineDelete();
		else if( x=="cut" )
		{
			this.profileService.put( "clipboard", {"Jde.Markets.Proto.Results.IContractDetails": this.selected.detail} );
			this.lineDelete();
		}
		else if( x=="copy" )
			this.profileService.put( "clipboard", {"Jde.Markets.Proto.Results.IContractDetails": this.selected.detail} );
		else if( x=="paste" )
		{
			this.profileService.get( "clipboard" ).then( (x)=>
			{
				var detail = x["Jde.Markets.Proto.Results.IContractDetails"];
				if( detail )
				{
					this.lineAdd();
					this.setRowDetail( this.selected, detail );
				}
			});
		}
	}
	lineAdd()/*:WatchRowComponent*/
	{
		/*let newRow =*/ this.addRow();
		this.file.securities.push( new Watch.Entry() );
		let previous:[number,TickDetails];
		let i=0;
		let change = false;
		for( let i=0; i<this.file.securities.length; ++i )
		{
			let instance = this.rows[i].instance;
			const original:[number,TickDetails] = [instance?.shares, instance?.tick];
			const set = previous!==undefined;
			if( set )
			{
				change = change || previous[1]!=null;
				instance.set( previous[0], previous[1] );
				this.file.securities[i].contractId = instance.contractId;
				this.file.securities[i].shares = instance.shares;
			}
			const isSelected = instance.rowId==this.selected.rowId;
			if( set || isSelected )
				previous = original;
			if( isSelected )
			{
				this.selected.clear();
				this.file.securities[i].contractId = this.file.securities[i].shares = 0;
			}
		}
		this.selected.clear();
		if( change )
			this.tws.editWatch( this.file );
		//return newRow;
	}
	lineDelete()
	{
		this.remove( this.indexOf(this.selected.rowId) );
	}
	setRowDetail( row:WatchRowComponent, detail:Results.IContractDetails )
	{
		row.tick = new TickDetails( detail );
		const isMarketOpen = MarketUtilities.isMarketOpen( detail );
		var previousDay = DateUtilities.toDays( MarketUtilities.previousTradingDate(new Date(), detail.tradingHours[0]) );
		row.tick.reqPrevious( this.tws, previousDay ).then( ()=>
		{
			let subscription = this.tws.reqMktData( detail.contract.id, [Requests.ETickList.Inventory, (isMarketOpen ? Requests.ETickList.PlPrice : Requests.ETickList.MiscStats)], false );
			subscription.subscribe2( row.tick );
			this.subscriptions.set( detail.contract.id, subscription );
		}).catch( (e)=>{ console.log(e); } );
	}
	load()
	{
		var ids = [];
		this.file.securities.forEach( (entry)=>{ if( entry.contractId ) ids.push(entry.contractId); } );
		let subscribe = (details:Map<number,Results.IContractDetails>)=>
		{
			for( const entry of this.file.securities )
			{
				var row = this.addRow();
				row.shares = entry.shares;
				let detail = entry.contractId ? details.get( entry.contractId ) : null;
				if( detail )
					this.setRowDetail( row, detail );
				//else
				//	this.ticks.push( null );
			}
			this.addRow();
			this.viewPromise = Promise.resolve( true );//<boolean>( (resolve) => {this.resolve = resolve;} )
		};
		if( ids.length )
			this.tws.reqIds( ids ).then( (x)=>subscribe(toMap(x, (value)=>{return value.contract.id;})) ).catch( (e)=>this.cnsle.error(e.message, e) );
		else
			subscribe( new Map<number,Results.IContractDetails>() );
	}
	viewable( columnId:string ):boolean
	{
		let visible = columnId!='inventory';
		if( columnId=="shares" )
			visible = this.isPortfolio;
		return visible;
	}


	@Input() set file(x){ this._file=x; } get file(){return this._file;} _file:Watch.File;
	editEvents: Subject<number> = new Subject<number>();
	get editRow(){ return this._editRow; } set editRow(x){this._editRow=x; if( x!=-1 ) this.editEvents.next(x); }	_editRow:number = -1;
	@Input() set isPortfolio(x)
	{
		this._isPortfolio=x;
	} get isPortfolio()
	{
		return this._isPortfolio;
	} _isPortfolio:boolean;
//	private resolve: Function;
	subscriptions = new Map<number,TickObservable>();
	//ticks:TickDetails[] = [];
	viewPromise:Promise<boolean>;
	findContract( contractId:number ):WatchRowComponent
	{
		return this.rows.find( (ref)=>{return ref.instance.contractId==contractId;} )?.instance;
	}
	indexOf( rowId:number ):number
	{
		return this.rows.findIndex( (ref)=>{return ref.instance.rowId==rowId;} );
	}
	addRow():WatchRowComponent
	{
		// Create component dynamically inside the ng-template
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory( WatchRowComponent );
		//this.container.clear();
		const component:ComponentRef<WatchRowComponent> = this.container.createComponent( componentFactory );
		let instance = component.instance;
		//instance.onInitPassed = false;
		//instance.selfRef = instance;
		instance.rowId = this.index++;
		instance.parent = this;
		instance.oddRow = this.rows.length%2==1;
		component.changeDetectorRef.detectChanges();
		this.rows.push( component );
		return instance;
	}
	//https://stackoverflow.com/questions/44939878/dynamically-adding-and-removing-components-in-angular
	remove( index: number )
	{
		this.container.remove( index );
		this.rows.splice( index, 1 );
		//if( this.file.securities.length>index ) should always be true?
			this.file.securities.splice( index, 1 );
			this.tws.editWatch( this.file );
		for( let i=index; i<this.rows.length; ++i )
			this.rows[i].instance.oddRow = i%2==1;
  }
  @Input() changeTable:Subject<string>;
	index:number=0;
	rows = new Array<ComponentRef<WatchRowComponent>>();
	set selected(x){ let previous = this._selected; this._selected=x; if( previous ) previous.selected = false; this.selectedChanged.emit( x ? x.detail || null : undefined);} get selected(){return this._selected;} private _selected:WatchRowComponent;
	@Output() selectedChanged = new EventEmitter<Results.IContractDetails>();
	@ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
}