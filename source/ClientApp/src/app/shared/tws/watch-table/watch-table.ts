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
//xChange doesn't work.
//?Volume doesn't work.
//xTake out inventory.
//?Resize columns.
//xAdd row selection.
//xAdd portfolio shares.
//add insert/delete.
//add stripes
//-----
//Save.
//Cut, copy, paste
@Component({selector: 'watch-table', templateUrl: './watch-table.html', styleUrls:['./watch-table.scss']})
export class WatchTableComponent implements OnInit, AfterViewInit
{
	constructor( private tws : TwsService, @Inject('IErrorService') private cnsle: IErrorService, private componentFactoryResolver:ComponentFactoryResolver )
	{}
	ngOnInit(){ }
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
		this.tws.reqSymbolDetails( symbol ).then( (detail)=>
		{
			let existing = this.findContract( detail.contract.id );
			if( !existing )
			{
				this.setRowDetail( row, detail );
				if( this.indexOf( row.rowId )==this.rows.length-1 )
					this.addRow();
			}
		}).catch( (e)=> console.log(e.toString()) );//`${symbol} return ${e.details.length} records.`)
	}
	lineAdd()
	{
		this.addRow( );
		let previous:WatchRowComponent;
		for( let row of this.rows )
		{
			let instance = row.instance;
			const set = previous!=undefined;
			if( set )
				instance.set( previous.shares, previous.tick );
			if( set || instance.rowId==this.selected.rowId )
				previous = instance;
		}
		this.selected.clear();
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
		var details = new Map<number,Results.IContractDetails>();
		var ids = [];
		this.file.securities.forEach( (entry)=>{ if( entry.contractId ) ids.push(entry.contractId); } );
		let subscribe = ()=>
		{
			if( this.file.securities.length )
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
			}
			else
				this.addRow();
				//this.ticks.push( null );
			this.viewPromise = Promise.resolve( true );//<boolean>( (resolve) => {this.resolve = resolve;} )
//			this.resolve();
		};
		if( ids.length )
		{
			this.tws.reqContractDetailsMulti( ids ).subscribe(
			{
				next: value=>{ details.set( value.contract.id, value ); },
				complete: ()=>{ subscribe(); },
				error: e=>{ this.cnsle.error(e.message, e); }
			});
		}
		else
			subscribe();
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
	@Input() isPortfolio:boolean;
//	private resolve: Function;
	subscriptions = new Map<number,TickObservable>();
	//ticks:TickDetails[] = [];
	viewPromise:Promise<boolean>;
	findContract( id:number ):WatchRowComponent
	{
		return this.rows.find( (ref)=>{return ref.instance.contractId==id;} )?.instance;
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
		instance.onInitPassed = false;
		instance.selfRef = instance;
		instance.rowId = this.index++;
		instance.parent = this;
		component.changeDetectorRef.detectChanges();
		this.rows.push( component );
		return instance;
	}
	remove(index: number)
	{
		//https://stackoverflow.com/questions/44939878/dynamically-adding-and-removing-components-in-angular
		//if( this.container.length < 1 )
		//	return;

		//let componentRef = this.components[index];
		//let instance = componentRef.instance;
		//let vcrIndex: number = this.container.indexOf( componentRef )

		// removing component from container
		this.container.remove( index );

		this.rows.splice( index, 1 );// = this.components.filter( x => x.instance.index !== index );
  }
	index:number=0;
	rows = new Array<ComponentRef<WatchRowComponent>>();
	set selected(x){if(this._selected)this._selected.selected = false; this._selected=x;} _selected:WatchRowComponent;
	@ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
}