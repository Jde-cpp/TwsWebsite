import {Component,EventEmitter, OnInit,Input,Output, Inject, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef, AfterViewInit} from '@angular/core';
import { TickDetails } from '../../services/Tick';
import { TwsService } from '../../services/tws.service';
import { IErrorService, UserEntryDialog } from 'jde-framework';
import { TickObservable } from '../../services/ITickObserver';
import { MarketUtilities } from '../../utilities/marketUtilities';

import * as ib2 from 'jde-cpp/ib'; import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbRequests from 'jde-cpp/requests'; import Requests = IbRequests.Jde.Markets.Proto.Requests;
import { WatchRowComponent } from './watch-row/watch-row';
import { Subject } from 'rxjs';

import * as IbWatch from 'jde-cpp/watch'; import Watch = IbWatch.Jde.Markets.Proto.Watch;
import { IProfile } from 'jde-framework';

@Component({selector: 'watch-table.main-content.mat-drawer-container', templateUrl: './watch-table.html', styleUrls:['./watch-table.scss']})
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
		this.tws.reqSymbolSingle( symbol ).then( (result)=>
		{
			const detail = result;
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
				const detail = x["Jde.Markets.Proto.Results.IContractDetails"];
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
		let change = false;
		for( let i=0; i<this.file.securities.length; ++i )
		{
			const instance = this.rows[i].instance;
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
	setRowDetail( row:WatchRowComponent, detail:Results.IContractDetail )
	{
		row.tick = new TickDetails( detail );
		const isMarketOpen = MarketUtilities.isMarketOpen( detail );
		const previousDay = MarketUtilities.previousTradingDate( new Date(), detail.tradingHours[0] );
		row.tick.reqPrevious( this.tws, previousDay ).then( ()=>
		{
			const subscription = this.tws.reqMktData( detail.contract.id, [Requests.ETickList.Inventory, (isMarketOpen ? Requests.ETickList.PlPrice : Requests.ETickList.MiscStats)], false );
			subscription.subscribe2( row.tick );
			this.subscriptions.set( detail.contract.id, subscription );
		}).catch( (e)=>{ console.log(e); } );
	}
	load()
	{
		const finally_ = ()=>{ this.addRow(); this.viewPromise = Promise.resolve(true); };
		const ids = this.file.securities.filter( (x)=>x.contractId ).map( (x)=>x.contractId );
		if( ids.length )
		{
			const process = ( contracts:Array<Results.IContractDetail[]> )=>
			{
				for( const entry of this.file.securities )
				{
					const row = this.addRow();
					row.shares = entry.shares;
					const details = contracts.find( (x)=>x.length && x[0].contract.id==entry.contractId );
					if( details && details.length==1 )
						this.setRowDetail( row, details[0] );
					else
						console.log( `reqIds returned contract with ${!details ? 0 : details.length} records` );
				}
			}
			this.tws.reqIds( ids ).then( ( contracts:Array<Results.IContractDetail[]> )=>
			{
				process( contracts );
			}).catch( (obj)=>
			{
				console.error( obj.error.message );
				process( obj.results );
			}).finally( ()=>finally_() );
		}
		else
			finally_();
	}
	viewable( columnId:string ):boolean
	{
		return columnId=="shares" ? this.isPortfolio : columnId!='inventory';
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
		const instance = component.instance;
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
	set selected(x){ const previous = this._selected; this._selected=x; if( previous ) previous.selected = false; this.selectedChanged.emit( x ? x.detail || null : undefined);} get selected(){return this._selected;} private _selected:WatchRowComponent;
	@Output() selectedChanged = new EventEmitter<Results.IContractDetail>();
	@ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
}