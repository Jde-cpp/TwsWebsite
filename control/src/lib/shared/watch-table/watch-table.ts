import {Component,EventEmitter, OnInit,Input,Output, Inject, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef, AfterViewInit} from '@angular/core';
import {SortDirection} from '@angular/material/sort';
import { Subject } from 'rxjs';

import { TickDetails } from '../../services/Tick';
import { TwsService } from '../../services/tws.service';
import { IErrorService,Settings } from 'jde-framework';
import { TickObservable } from '../../services/ITickObserver';
import { ContractPK, MarketUtilities } from '../../utilities/marketUtilities';

import * as ib2 from 'jde-cpp/ib'; import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import * as IbRequests from 'jde-cpp/requests'; import Requests = IbRequests.Jde.Markets.Proto.Requests;
import { WatchRow } from './watch-row/watch-row';
import { Columns, PageSettings } from './../../pages/watch/watch-content'
import * as IbWatch from 'jde-cpp/watch'; import Watch = IbWatch.Jde.Markets.Proto.Watch;
import { IProfile } from 'jde-framework';
import { HeaderCol } from './header-col';

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
	onChangeShares( row:WatchRow )
	{
		var i = this.file.securities.findIndex( (x)=>x.contractId==row.contractId );
		this.file.securities[i].shares = row.shares;
		this.editWatch();//172522644 -12
	}
	editWatch()
	{
		var symbols = [];
		for( var s of this.file.securities )
		{
			let i = this.rows.find( (x)=>x.instance.contractId==s.contractId ).instance.tick.contract.symbol;
			if( !symbols.includes(i) )
			{
				symbols.push( i );
				console.log( i );
			}
			else
				debugger;
		}
		debugger;
		this.tws.editWatch( this.file ).catch( (e)=>this.cnsle.error(e.message) );
	}
	onChangeAvgPrice( row:WatchRow, x:number )
	{
		this.file.securities.find( (x)=>x.contractId==row.contractId ).avgPrice = x;
		this.editWatch();
	}
	async onChangeSymbol( row:WatchRow, symbol:string )
	{
//		return new Promise<boolean>( (resolve)=>
//		{
			let success = false;
			try
			{
				const detail = await this.tws.reqSymbolSingle( symbol );
				const constractId = detail.contract.id;
				const existing = this.findContract( constractId ); if( existing ) throw { error:{message:`'${symbol}' already exists`} };
				success = true;
				this.setRowDetail( row, detail );
				const index = this.indexOf( row.rowId );
				while( this.file.securities.length<index )
					this.file.securities.push( null );
				if( this.file.securities.length==index )
					this.file.securities.push( {contractId: constractId} );
				else
					this.file.securities[index].contractId = constractId;
				this.editWatch();
				if( index==this.rows.length-1 )
					this.addRow();
			}
			catch( e )
			{
				this.cnsle.show( e["error"] );
			}
			return success;
//			resolve( !success );
//		} );
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
	lineAdd()/*:WatchRow*/
	{
		/*let newRow =*/ this.addRow();
		this.file.securities.push( new Watch.Entry() );
		let previous:[number,number,TickDetails];
		let change = false;
		for( let i=0; i<this.file.securities.length; ++i )
		{
			const instance = this.rows[i].instance;
			const original:[number,number,TickDetails] = [instance?.shares, instance?.avgPrice, instance?.tick];
			const set = previous!==undefined;
			if( set )
			{
				change = change || previous[1]!=null;
				instance.set( previous[0], previous[1], previous[2] );
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
			this.editWatch();
		//return newRow;
	}
	lineDelete()
	{
		this.remove( this.indexOf(this.selected.rowId) );
	}
	async setRowDetail( row:WatchRow, detail:Results.IContractDetail )
	{
		row.tick = new TickDetails( detail );
		this.rowSubscribe( row );
	}
	async rowSubscribe( row:WatchRow )
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
		this.addColumns();
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
						r = { shares: entry.shares, avgPrice: entry.avgPrice, tick: new TickDetails(details[0]) };
					else
						console.log( `reqIds returned contract with ${!details ? 0 : details.length} records` );
				}
				else
				{
					let i = this.rows.find( (r)=>r.instance.contractId==entry.contractId ).instance;
					r = { shares: i.shares, avgPrice: i.avgPrice, tick: i.tick };
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
		let contractIds = [];
		for( let item of items )
		{
			let instance = this.addRow();
			if( !item )
				continue;
			//console.log( `${item.tick.contract.symbol}` );
			instance.set( item.shares, item.avgPrice, item.tick );
			if( subscribe )
			{
				this.rowSubscribe( instance );
				contractIds.push( item.tick.contract.id );
			}
		}
		if( subscribe )
		{
			let stats:IB.Stats[]=[];
			if( this.settings.columns.includes(Columns.Ath) )
				stats.push( IB.Stats.Ath );
			if( this.settings.columns.includes(Columns.MA100) )
				stats.push( IB.Stats.MA100 );
			if( this.settings.columns.includes(Columns.Pwl) )
				stats.push( IB.Stats.Pwl );
			if( this.settings.columns.includes(Columns.YearHigh) )
				stats.push( IB.Stats.YearHigh );
			if( this.settings.columns.includes(Columns.YearLow) )
				stats.push( IB.Stats.YearLow );
			if( stats.length && contractIds.length )
			{
				this.tws.reqStats( contractIds, stats ).subscribe(
				{
					next: ( stats:Results.IContractStat[] ) =>
					{
						for( var stat of stats )
						{
							let i = this.rows.find( (r)=>r.instance.contractId==stat.contractId ).instance;
							if( stat.stat==IB.Stats.Atl ) i.atl = stat.value;
							else if( stat.stat==IB.Stats.AtlDay ) i.atlDay = stat.value;
							else if( stat.stat==IB.Stats.Ath ) i.ath = stat.value;
							else if( stat.stat==IB.Stats.AthDay ) i.athDay = stat.value;
							else if( stat.stat==IB.Stats.MA100 ) i.ma100 = stat.value;
							else if( stat.stat==IB.Stats.YearLow ) i.yearLow = stat.value;
							else if( stat.stat==IB.Stats.YearLowDay ) i.yearLowDay = stat.value;
							else if( stat.stat==IB.Stats.YearHigh ) i.yearHigh = stat.value;
							else if( stat.stat==IB.Stats.YearHighDay ) i.yearHighDay = stat.value;
							else if( stat.stat==IB.Stats.Pwl ) i.pwl = stat.value;
						}
					},
					error: (e)=>this.cnsle.error( `(${e.code})Request stats failed - ${e.message}` )
				});
			}
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
			? this.rows.filter( (r)=>r.instance.symbol ).map( (r)=>{ return {shares: r.instance.shares, avgPrice: r.instance.avgPrice, tick: r.instance.tick} } )
			: this.defaultLayout();
		this.rows.length = 0;
		this.addItems( items );
	}

	viewable( columnId:string ):boolean
	{
		return this.settings.columns.includes( Columns[columnId] );
	}

	@Input() set file(x){ this.#file=x; } get file(){return this.#file;} #file:Watch.File;
	editEvents: Subject<number> = new Subject<number>();
	get editRow(){ return this._editRow; } set editRow(x){this._editRow=x; if( x!=-1 ) this.editEvents.next(x); }	_editRow:number = -1;
	get isPortfolio(){ return this.settings.hasShares; }
//	private resolve: Function;
	subscriptions = new Map<number,TickObservable>();
	//ticks:TickDetails[] = [];
	findContract( contractId:number ):WatchRow
	{
		return this.rows.find( (ref)=>{return ref.instance.contractId==contractId;} )?.instance;
	}
	indexOf( rowId:number ):number
	{
		return this.rows.findIndex( (ref)=>{return ref.instance.rowId==rowId;} );
	}
	addColumns()
	{
		for( let c of this.settings.columns )
		{
			const r:ComponentRef<HeaderCol> = this.header.createComponent<HeaderCol>( HeaderCol );
			r.instance.column = c;
			r.instance.parent = this;
		}
	}
	addRow():WatchRow
	{
		// Create component dynamically inside the ng-template
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory( WatchRow );
		const component:ComponentRef<WatchRow> = this.container.createComponent( componentFactory );
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
		const contract = this.rows[index].instance.tick.contract;
		this.rows.splice( index, 1 );
		var fileIndex = this.file.securities.findIndex( (x)=>x.contractId==contract.id ); if( fileIndex==-1 ){ debugger; throw "fileIndex==-1"; }
		this.file.securities.splice( fileIndex, 1 );
		this.editWatch();
		for( let i=index; i<this.rows.length; ++i )
			this.rows[i].instance.oddRow = i%2==1;

	}
	@Input() changeTable:Subject<string>;
	ColumnsType = Columns;
	get hasDefaultLayout(){ return this.settings.hasDefaultLayout; }
	index:number=0;
	@Input() set profile(x){ this.#profile=x; } get profile(){return this.#profile;} #profile:Settings<PageSettings>;
	rows = new Array<ComponentRef<WatchRow>>();
	get settings(){ return this.profile.value; }
	get sortActive(){ return this.settings?.sort; } set sortActive(x){ this.settings.sort = x; this.profile.save(); }
	set selected(x){ const previous = this._selected; this._selected=x; if( previous ) previous.selected = false; this.selectedChanged.emit( x ? x.detail || null : undefined);} get selected(){return this._selected;} private _selected:WatchRow;
	@Output() selectedChanged = new EventEmitter<Results.IContractDetail>();
	@ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
	@ViewChild('header', {read: ViewContainerRef}) header: ViewContainerRef;
	viewPromise:Promise<boolean>;
}
class Row{shares: number; avgPrice:number; tick: TickDetails};