import {Component,EventEmitter, OnInit,Input,Output, Inject, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef, AfterViewInit} from '@angular/core';
import {SortDirection} from '@angular/material/sort';
import { Subject } from 'rxjs';

import { TickDetails } from '../../services/Tick';
import { TwsService } from '../../services/tws.service';
import { IErrorService,Settings } from 'jde-framework';
import { TickObservable } from '../../services/ITickObserver';
import { MarketUtilities } from '../../utilities/marketUtilities';

import * as ib2 from 'jde-cpp/ib'; import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbRequests from 'jde-cpp/requests'; import Requests = IbRequests.Jde.Markets.Proto.Requests;
import { WatchRowComponent } from './watch-row/watch-row';
import { Columns, PageSettings } from './../../pages/watch/watch-content'
import * as IbWatch from 'jde-cpp/watch'; import Watch = IbWatch.Jde.Markets.Proto.Watch;
import { IProfile } from 'jde-framework';

@Component({selector: 'watch-table', templateUrl: './watch-table.html', styleUrls:['./watch-table.scss']})
export class WatchTableComponent implements OnInit, AfterViewInit
{
	constructor( private tws : TwsService, @Inject('IErrorService') private cnsle: IErrorService, private componentFactoryResolver:ComponentFactoryResolver, @Inject('IProfile') private profileService: IProfile )
	{
	}
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
	onChangeShares( row:WatchRowComponent )
	{
		this.file.securities.find( (x)=>x.contractId=row.contractId ).shares = row.shares;
		this.tws.editWatch( this.file ).catch( (e)=>this.cnsle.error(e.message) );
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
	async setRowDetail( row:WatchRowComponent, detail:Results.IContractDetail )
	{
		row.tick = new TickDetails( detail );
		this.rowSubscribe( row );
	}
	async rowSubscribe( row:WatchRowComponent )
	{
		const detail = row.detail;
		const isMarketOpen = MarketUtilities.isMarketOpen( detail );
		const previousDay = MarketUtilities.previousTradingDate( new Date(), detail.tradingHours[0] );
		try
		{
			await row.tick.reqPrevious( this.tws, previousDay );
			const subscription = this.tws.reqMktData( detail.contract.id, [Requests.ETickList.Inventory, (isMarketOpen ? Requests.ETickList.PlPrice : Requests.ETickList.MiscStats)], false );
			subscription.subscribe2( row.tick );
			this.subscriptions.set( detail.contract.id, subscription );
		}
		catch( e )
		{
			console.log( e );
		}
	}
	async load()
	{
		this.viewPromise = Promise.resolve( true );
		const ids = this.file.securities.filter( (x)=>x.contractId ).map( (x)=>x.contractId );
		let contracts:Array<Results.IContractDetail[]>=null;
		if( ids.length )
		{
			try
			{
				contracts = await this.tws.reqIds( ids );
			}
			catch( e )
			{
				console.error( e["error"].message );
				contracts = e["results"];
			}
		}
		if( contracts && contracts.length )
		{
			let items = this.defaultLayout( contracts );
			this.addItems( items, true );
			//this.addRow();
			// if( this.settings.hasDefaultLayout && !this.sortActive )
			// {
			// 	for( let item of items )
			// 	{
			// 		const row = this.addRow();
			// 		if( !item )
			// 			continue;
			// 		row.shares = item.shares;
			// 		row.tick = item.tick;
			// 		this.rowSubscribe( row );
			// 	}
			// 	this.addRow();
			// }
			// else
			//	this.addItems( items, true );

			this.tws.averageVolume( ids ).subscribe(
			{
				next: (x)=>this.findContract( x.contractId ).volumeAverage = x.value,
				error:  e=>console.error( e )
			});
		}
		else
			setTimeout( ()=>this.addRow(), 0 );
	}

	defaultLayout( contracts?:Array<Results.IContractDetail[]> )
	{
		let items = new Array<Row>();
		for( const entry of this.file.securities )
		{
			let r:Row;
			if( entry.contractId )
			{
				let detail:Results.IContractDetail;
				if( contracts )
				{
					const details = contracts.find( (x)=>x.length && x[0].contract.id==entry.contractId );
					if( details && details.length==1 )
						r = { shares: entry.shares, tick: new TickDetails(details[0]) };
					else
						console.log( `reqIds returned contract with ${!details ? 0 : details.length} records` );
				}
				else
				{
					let i = this.rows.find( (r)=>r.instance.contractId==entry.contractId ).instance;
					r = { shares: i.shares, tick: i.tick };
				}
			}
			items.push( r );
		}
		return items;
	}
	addItems( items:Row[], subscribe?:boolean )
	{
		if( this.sortActive )
		{
			const multiplier = this.sortActive.direction=='desc' ? -1 : 1;
			items.sort( (a:Row,b:Row)=>
			{
				let lessThan;
				if( this.sortActive.active==Columns.Symbol )
					lessThan = a.tick.detail.contract.symbol<b.tick.detail.contract.symbol;
				else if( this.sortActive.active==Columns.Change )
					lessThan = a.tick.change/a.tick.last<b.tick.change/b.tick.last;
				else if( this.sortActive.active==Columns.Last )
					lessThan = a.tick.last<b.tick.last;
				else if( this.sortActive.active==Columns.Volume )
					lessThan = a.tick.volume<b.tick.volume;
				else if( this.sortActive.active==Columns.Range )
					lessThan = (a.tick.high-a.tick.low)/a.tick.last<(b.tick.high-b.tick.low)/b.tick.last;
				return (lessThan ? -1 : 1)*multiplier;
			} );
		}
		this.container.clear();
		this.index = 0;
		for( let item of items )
		{
			let instance = this.addRow();
			if( !item )
				continue;
			instance.set( item.shares, item.tick );
			if( subscribe )
				this.rowSubscribe( instance );
		}
		this.addRow();
	}
	sort( column:Columns )
	{
		const direction = this.sortActive?.active!=column || (!this.hasDefaultLayout && this.sortActive.direction=='desc')
			? 'asc'
			: 'desc';

		this.sortActive = this.hasDefaultLayout && this.sortActive && this.sortActive.active==column && this.sortActive.direction=='desc'
			? null
			: { active:column, direction: direction };
		let items:Row[] = this.sortActive
			? this.rows.filter( (r)=>r.instance.symbol ).map( (r)=>{ return {shares: r.instance.shares, tick: r.instance.tick} } )
			: this.defaultLayout();
		this.rows.length = 0;
		this.addItems( items );
	}

	viewable( columnId:string ):boolean
	{
		return columnId=="shares"
			? this.isPortfolio
			: this.settings.columns.includes( Columns[columnId] );
	}

	@Input() set file(x){ this.#file=x; } get file(){return this.#file;} #file:Watch.File;
	editEvents: Subject<number> = new Subject<number>();
	get editRow(){ return this._editRow; } set editRow(x){this._editRow=x; if( x!=-1 ) this.editEvents.next(x); }	_editRow:number = -1;
	get isPortfolio(){ return this.settings.hasShares; }
//	private resolve: Function;
	subscriptions = new Map<number,TickObservable>();
	//ticks:TickDetails[] = [];
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
		this.file.securities.splice( index, 1 );
		this.tws.editWatch( this.file );
		for( let i=index; i<this.rows.length; ++i )
			this.rows[i].instance.oddRow = i%2==1;
	}
	@Input() changeTable:Subject<string>;
	ColumnsType = Columns;
	get hasDefaultLayout(){ return this.settings.hasDefaultLayout; }
	index:number=0;
	@Input() set profile(x){ this.#profile=x; } get profile(){return this.#profile;} #profile:Settings<PageSettings>;
	rows = new Array<ComponentRef<WatchRowComponent>>();
	get settings(){ return this.profile.value; }
	get sortActive(){ return this.settings?.sort; } set sortActive(x){ this.settings.sort = x; this.profile.save(); }
	set selected(x){ const previous = this._selected; this._selected=x; if( previous ) previous.selected = false; this.selectedChanged.emit( x ? x.detail || null : undefined);} get selected(){return this._selected;} private _selected:WatchRowComponent;
	@Output() selectedChanged = new EventEmitter<Results.IContractDetail>();
	@ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
	viewPromise:Promise<boolean>;
}
class Row{shares: number; tick: TickDetails};