import {Component,EventEmitter,OnInit,Input,Output, OnDestroy} from '@angular/core';
//import { ThemePalette } from '@angular/material';
//import * as AppFromServer from '../../../proto/appFromServer';
//import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;
import { Observable, Subscription } from 'rxjs';
//import {Observable} from 'rxjs';
//import { emit } from 'cluster';


export class PageEvent
{
	constructor(){this.startIndex=0; this.pageSize=50;}
	//length: number;
	//pageIndex: number;
	startIndex:number;
	pageSize: number;
	//previousPageIndex: number;
}

@Component({ selector: 'paginator', templateUrl: './paginator.html' })
export class PaginatorComponent implements OnInit, OnDestroy
{
	ngOnInit()
	{
		this.lengthChangeSubscription = this.lengthChange.subscribe( (value)=>this.length = value );

	}
	ngOnDestroy()
	{
		this.lengthChangeSubscription.unsubscribe();
	}
	onSelectionChange(  )
	{}

	firstPage(){ this.startIndex = 0; }
	prevPage(){ this.startIndex = this.startIndex-this.pageSize; }
	prevItem(){ --this.startIndex; }
	nextItem(){ ++this.startIndex; }
	nextPage(){ this.startIndex = this.startIndex+this.pageSize; }
	lastPage(){ this.startIndex = this.length-this.length%this.pageSize; }

	//@Input() color: ThemePalette;
	//get disabled(){ return this._disabled; }
	//set disabled(value){this._disabled=value;} _disabled: boolean=false;
	@Input() hidePageSize: boolean;
	@Input() lengthChange:Observable<number>;//
	private lengthChangeSubscription: Subscription;
	set length(value){ if(!value) value=0; if( value!=this.length ){ this._length=value; this.startIndex=this.startIndex;} } get length(){return this._length;} _length: number=0; //The length of the total number of items that are being paginated.
	@Input() set pageIndex( value ){ this.startIndex = value*this.pageSize; } get pageIndex(){return this.startIndex/this.length; }
	@Input() set pageSize(value){ if( value!=this.pageSize ){ this._pageSize=value; this.startIndex=this.startIndex;} } get pageSize(){return this._pageSize;} _pageSize:number=50;
	//@Input() pageSizeOptions: number[];
	@Input() showFirstLastButtons: boolean=true;
	@Output() page = new EventEmitter<PageEvent>();
	//initialized: Observable<void>;

	set startIndex(value)
	{
		if( value>this.length-1 )
			value = this.pageSize-1;
		if( value<0 )
			value = 0;
		if( value!=this.startIndex )
		{
			this._startIndex = value;
			if( this.page )
				this.page.next( {startIndex:this.startIndex, pageSize:this.pageSize} );
		}
	}
	get startIndex(){return this._startIndex}; _startIndex:number=0;
	get endIndex(){ return Math.min(this.startIndex+this.pageSize, this.length-1); }
	get onFirstPage(){ return this.startIndex==0; }
	get onLastPage(){ return this.endIndex==this.length-1; }
}

