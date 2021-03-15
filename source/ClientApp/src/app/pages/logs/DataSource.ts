import { MatTable } from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import { TraceEntry } from './TraceEntry';
import { Subject } from 'rxjs';
import {EventEmitter} from '@angular/core';

import * as AppFromServer from 'jde-cpp/FromServer';
import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;

export class DataSource
{
	constructor( private pageSize:number=10 )
	{
	}
	connect( table:MatTable<TraceEntry> )
	{
		if( !this.observable )
		{
			this.observable = new Subject<TraceEntry[]>();
			setTimeout( ()=>{this.setPage();}, 1 );
		}
		return this.observable;
	}
	disconnect()
	{
		//console.log( "disconnect" );
		this.data.length=0;
	}
	setPage( start=-1, pageSize=0 )
	{
		if( pageSize>0 )
			this.pageSize=pageSize;
		if( start==-1 )
			start = Math.max( this.data.length-this.pageSize, 0 );
		this.page = Math.floor( start/this.pageSize );
		if( start!=-1 )
			start = this.page*this.pageSize;
		let values = new Array<TraceEntry>();
		var end = Math.min( start+this.pageSize, this.data.length );
		for( let i=start; i<end; ++i )
			values.push( this.data[i] );
		if( this.observable )
			this.observable.next( values );
	}
	push( entry:TraceEntry )
	{
		entry.index = this.allData.length;
		this.allData.push( entry );
		if( !entry.hidden )
			this.data.push( entry );
		if( this.autoScroll )
			this.setPage();
	}
	clear()
	{
		this.data.length=0;
		this.setPage();
	}
	sort( options:Sort )
	{
		if( !options || !options.active || options.direction === '' )
			return;

		const values = this.data.slice();
		const multiplier = options.direction === 'asc' ? 1 : -1;
		let data = values.sort((a, b) =>
		{
			let lessThan = false;
			if( options.active=='date' )
				lessThan = a.time<b.time;
			else if( options.active=='level' )
				lessThan = a.level<b.level;
			else if( options.active=='message' )
				lessThan = a.message<b.message;
			else if( options.active=='file' )
				lessThan = a.file<b.file;
			else if( options.active=='function' )
				lessThan = a.functionName<b.functionName;
			else
				console.error( `unknown sort'${options.active}'` );
			return (lessThan ? -1 : 1)*multiplier;
		});
		let i=-1;
		for( let row of data )
			row.index = ++i;

		this.data = data;
		this.setPage();
	}
	select( dataIndex:number )
	{
		var visibleIndex = 0;
		for( ;visibleIndex<this.data.length; ++visibleIndex )
		{
			if( this.data[visibleIndex].index==dataIndex )
				break;
		}
		let page = this.page = Math.floor( visibleIndex/this.pageSize );
		let start = page*this.pageSize;
		let values = new Array<TraceEntry>();
		const end = Math.min( start+this.pageSize, this.data.length );
		for( let i=start; i<end; ++i )
			values.push( this.data[i] );
		if( this.observable )
			this.observable.next( values );
	}
	filterData( messageIds:number[], filter2:string, index:number, level:FromServer.ELogLevel )
	{
		const filter = filter2 ? filter2.trim().toLowerCase() : null;
		let visibleData:TraceEntry[] = [];
		let haveIndex = index==-1;
		let pastIndex = false;
		let selectedIndex = -1;
		let visibleIndex = 0;
		for( let entry of this.allData )
		{
			if( !haveIndex && !pastIndex )
				pastIndex = entry.index==index;
			entry.hidden = messageIds.indexOf(entry.messageId)!=-1;
			if( !entry.hidden && entry.level>=level && (filter==null || entry.message.toLowerCase().indexOf(filter)!=-1) )
			{
				++visibleIndex;
				if( !haveIndex && pastIndex )
				{
					selectedIndex = visibleIndex;
					haveIndex = true;
				}
				visibleData.push( entry );
			}
		}
		this.data = visibleData;
		this.setPage( selectedIndex );
	}
	applyFilter( filter:string, hiddenIds:number[] )
	{
		let visibleData:TraceEntry[] = [];
		for( let entry of this.allData )
		{
			entry.hidden = hiddenIds.indexOf(entry.messageId)!=-1;
			if( !entry.hidden && entry.message.toLowerCase().indexOf(filter)!=-1 )
				visibleData.push( entry );
		}
		this.data = visibleData;
		this.setPage();
	}
	autoScroll:boolean=true;
	get paused(){return this._paused;} set paused(value){this._paused=value;}_paused=false;
	get length():number{return this.data.length;}
	get page(){return this._page;} set page(value){this._page=value;this.onPageChange.emit(value);} _page:number; onPageChange= new EventEmitter<number>();
	//get filter(){return _filter;} set filter( value){_filter=value; applyFilter(value);} string _filter;
	observable:Subject<object>;
	data:TraceEntry[] = [];
	allData:TraceEntry[] = [];
}
