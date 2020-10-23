import {Component,EventEmitter,Input,Output, Inject, OnDestroy, ViewChild, ElementRef, OnInit, AfterViewInit, HostBinding} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TickDetails } from 'src/app/services/tws/Tick';
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
import { Subject } from 'rxjs';
import { WatchTableComponent } from '../watch-table';


@Component({selector: 'watch-row', templateUrl: './watch-row.html', styleUrls:['./watch-row.scss', '../watch-table.scss']})
export class WatchRowComponent implements OnInit, AfterViewInit
{
	@HostBinding('class.watchRow') public hostClass:boolean=true;
	static i:number=0;
	index:number;
	constructor( private tws : TwsService, @Inject('IErrorService') private cnsle: IErrorService, private decimalPipe: DecimalPipe )
	{
		this.index = WatchRowComponent.i++;
		//console.log( `row( ${this.index} )` );
	}
	//class="watchRow"
	ngOnInit(){}
	ngAfterViewInit(){ this.viewPromise = Promise.resolve(true); }

	clear()
	{
		this.shares = this.tick = undefined;
	}
	set( shares:number, tick:TickDetails )
	{
		this.shares = shares;
		this.tick = tick;
	}
	viewable( columnId:string ):boolean
	{
		return this.parent.viewable( columnId );
	}
	//ngOnDestroy(){ this.unsubscribe(); }

	editColumn( columnId:string )
	{
		this.editItem = columnId;
		this.editEmitter.emit( columnId ? this.rowId : -1 );
		setTimeout( ()=>
		{
			if( columnId=="symbol" )
			{
				this.symbolInput.nativeElement.focus();
				//console.log( `focus ${this.index}` );
				this.symbolInput.nativeElement.select();
			}
		 },0);

	}
	isEditing( columnId:string ){ return this.editItem==columnId; }
	setSymbol( symbol:string )
	{
		this.editItem = null;
		if( (!symbol && !this.tick) || symbol==this.tick?.detail.contract.symbol )
			return;
		this.parent.onChangeSymbol( this, symbol );
	}

	setShares( x:number )
	{
		this.editItem = null;
		this.shares = x;
	}

	//this.tick = null;
/*		this.unsubscribe();
		let details:Results.IContractDetails[] = [];
		this.tws.reqContractDetails( {symbol: symbol} ).subscribe(
		{
			next: value=>{ details.push(value);},
			complete: ()=>
			{
				if( details.length==1 )
				{
					var item = details[0];
					this.tick = new TickDetails( item );
					this.subscribe();
				}
				else
					this.cnsle.error( `${symbol} return ${details.length} records.` );
			},
			error: e=>{ this.cnsle.error(e.message, e); }
		});
	}
	subscribe()
	{
		//TODO find out if market is closed then get historical info.
		this.unsubscribe();
		const isMarketOpen = MarketUtilities.isMarketOpen( this.detail );
		this.subscription = this.tws.reqMktData( this.detail.contract.id, [Requests.ETickList.Inventory, (isMarketOpen ? Requests.ETickList.PlPrice : Requests.ETickList.MiscStats)], false );
		this.subscription.subscribe2( this.tick );
	}
	unsubscribe(){ if( this.subscription ) this.tws.cancelMktDataSingle(this.subscription); }
*/
	get contractId():number{ return this.detail?.contract.id; }
	get detail():Results.IContractDetail{ return this.tick?.detail; }/*@Input() set detail(x){ this.tick = x ? new TickDetails(x) : null; }*/
	get displayChange():string{ const tick=this.tick; return tick ? `${this.decimalPipe.transform(tick.change, '1.2-2')}  (${this.decimalPipe.transform(tick?.change/tick?.close*100, '1.1-1')}%)` : null;}
	//get displayShort():string{ return this.fundamentals?.sharesOutstanding && this.settingsSymbol ? $ {this.decimalPipe.transform(this.settingsSymbol.shortInterest/this.fundamentals.sharesOutstanding*100, '1.1-1')}% : null; }
	get displayInventory():string{ return this.tick ? `${this.decimalPipe.transform(this.tick.shortableAvailable/1000, '1.0-0')}k` : null; }
	get displayVolume()
	{
		var display = null;
		if( this.tick )
		{
			var volume = this.tick.volume*100;
			let divisor = 1;  let fixedPlaces = 0; let suffix = "";
			let calc = ( amount:number, sffx:string ):boolean=>
			{
				if( volume>amount )
					divisor = amount;
				if( divisor!=1 )
				{
					fixedPlaces =  volume>amount*10 ? volume>amount*100 ? 0 : 1 : 2;
					suffix = sffx;
				}
				return divisor!=1;
			};

			calc( 1_000_000, "M" ) || calc( 1_000, "K" );
			volume/=divisor;
			display = (fixedPlaces==0 ? volume.toString() : (volume).toFixed(fixedPlaces))+suffix;
		}
		return display;
	}

	editEvents:Subject<number>;//@Input()
	editItem:string;
	editEmitter = new EventEmitter<number>();//@Output()

	oddRow:boolean;
	rowId:number;
	get shares(){return this._shares;} set shares(x)
	{
		this._shares=x;
	} _shares:number;
	showMenu=false;
	get symbol():string|null{ return this.tick?.detail.contract.symbol; }
	@ViewChild("symbolInput") symbolInput: ElementRef;
	set tick( x ){ this._tick = x; /*console.log( `(${this.index})tick= ${x ? x.contract.symbol : 'null'}` );if( this._tick ) this.subscribe(); else this.unsubscribe();*/ } get tick(){ return this._tick; } private _tick:TickDetails;
	get selected(){ return this._selected;} set selected( x )
	{
		if( x )
			this.parent.selected = this;
		else if( this.parent.selected?.rowId == this.rowId )
			this.parent.selected = null;
		this._selected = x;
	} _selected:boolean;
	parent:WatchTableComponent;
	viewPromise:Promise<boolean>=null;// = new Promise<void>( (resolve) => { this.resolve = resolve;} );
}