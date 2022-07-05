import { DecimalPipe } from '@angular/common';
import {Component, ElementRef, ViewChild} from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { WatchRow } from '../watch-row';

export abstract class Column
{
	get className():string
	{
		return this.parent || this.number!==undefined ? "size" : this.propertyName;
	}
	get isSimple(){ return !["Change", "Range", "Ath"].includes( this.name ); }
	name:string;
	parent:WatchRow;
	get percent()
	{
		// | number: '1.1-1'
		let value, format;
		if( this?.parent?.tick )//not blank line.
		{
			format = '1.0-0';
			if( this.propertyName=="change" )
			{
				value = this.parent.tick?.change/this.parent.tick?.close*100;
				format = '1.1-1';
			}
			else if( this.propertyName=="ath" )
				value = this.parent.tick.currentPrice/this.parent[this.propertyName]*100;
		}
		return value ? this.decimalPipe.transform( value, format ) : value;
	}
	get propertyName():string{ return this.name[0].toLowerCase()+this.name.substring(1); }
	get tick(){ return this.parent?.tick; }
	get value()
	{
		let value;
		if( this?.parent?.tick )//not blank line.
		{
			var format = ["volume", "market"].includes( this.propertyName ) || this.propertyName.endsWith( "Size" ) ? "1.0-0" : "1.2-2";
			if( ["atl","ath", "yearLow", "yearHigh", "ma100", "pwl"].includes(this.propertyName) )
				value = this.decimalPipe.transform( this.parent[this.propertyName], format );
			else if( this.propertyName=="pnl" )
				value = this.decimalPipe.transform( (this.parent.tick.currentPrice-this.parent.avgPrice)*this.parent.shares, format );
			else if( this.propertyName=="market" )
				value = this.decimalPipe.transform( this.parent.tick["currentPrice"]*this.parent.shares, format );
			else
			{
				var name = this.propertyName=="last" ? "currentPrice" : this.propertyName;
				value = this.decimalPipe.transform( this.parent.tick[name], format );
			}
		}
		else if( this.number!==undefined )
			value = this.number.toString();
		else
			value = this.number ? this.number.toString() : this.#value;
		return value;
	}; set value( x ){ this.#value=x; } #value:string;
	number:number;
	abstract get decimalPipe();
}
@Component({templateUrl: './watch-col.html', styleUrls:['./watch-col.scss']})
export class WatchCol extends Column
{
	constructor( private _decimalPipe: DecimalPipe ){super();}
	get decimalPipe(){ return this._decimalPipe; }
}

abstract class WatchEditCol extends Column
{
	edit( e:PointerEvent )
	{
		debugger;
		if( ["Symbol", "AvgPrice"].includes(this.name) )
		{
			this.isEditing = true;
			setTimeout( ()=>
			{
				this.editElement.nativeElement.focus();
				this.editElement.nativeElement.select();
			},0);
		}
	}
	enterClick( x )
	{
		debugger;
	}
	blur( x )
	{
		debugger;
		this.isEditing = false;
	}
	abstract get editElement():ElementRef;
	abstract get isEditing():boolean; abstract set isEditing(x:boolean);
}

@Component({templateUrl: './watch-num-col.html', styleUrls:['./watch-col.scss']})
//@Component({templateUrl: './watch-col.html', styleUrls:['./watch-col.scss']})
export class WatchNumCol extends WatchEditCol
{
	constructor( private _decimalPipe: DecimalPipe )
	{super();}
	get decimalPipe(){ return this._decimalPipe; }
	get editElement():ElementRef{return this._editElement;}; @ViewChild("editElement") _editElement;
	get isEditing():boolean{return this.#isEditing;}  set isEditing(x:boolean){this.#isEditing=x;}  #isEditing:boolean=false;
}