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
	get showSign(){ return this.name=="Pnl"; }
	name:string;
	parent:WatchRow;
	get percent()
	{
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
	get propertyName(){ return this.#propertyName ? this.#propertyName : this.name[0].toLowerCase()+this.name.substring(1); } set propertyName(x){this.#propertyName=x;} #propertyName:string;
	get tick(){ return this.parent?.tick; }
	get value()
	{
		let value;
		if( this.number!==undefined )
			value = this.number.toString();
		else if( this?.parent?.tick )//not blank line.
		{
			//console.log( this.propertyName );
			var format = ["volume", "market", "pnl"].includes( this.propertyName ) || this.propertyName.endsWith( "Size" ) ? "1.0-0" : "1.2-2";
			if( ["atl","ath", "yearLow", "yearHigh", "ma100", "pwl"].includes(this.propertyName) )
				value = this.decimalPipe.transform( this.parent[this.propertyName], format );
			else if( this.propertyName=="pnl" )
				value = this.decimalPipe.transform( (this.parent.tick.currentPrice-this.parent.tick.close)*this.parent.shares, format );
			else if( this.propertyName=="market" )
				value = this.decimalPipe.transform( this.parent.tick["currentPrice"]*this.parent.shares, format );
			else
			{
				var name = this.propertyName=="last" ? "currentPrice" : this.propertyName;
				value = this.decimalPipe.transform( this.parent.tick[name], format );
			}
		}
		else
			value = this.number ? this.number.toString() : this._value;
		return value;
	}; set value( x ){ this._value=x; } protected _value:string;
	number:number;
	get decimalPipe(){return null;}
}
@Component({templateUrl: './watch-col.html', styleUrls:['./watch-col.scss']})
export class WatchCol extends Column
{
	constructor( private _decimalPipe: DecimalPipe ){super();}
	override get decimalPipe(){ return this._decimalPipe; }
}
//@Component( {} )
abstract class WatchEditCol extends Column
{
	edit( e:PointerEvent )
	{
		if( ["Symbol", "AvgPrice", "Shares"].includes(this.name) )
		{
			this.isEditing = true;
			console.log( "${this.name}.isEditing = true;");
			setTimeout( ()=>
			{
				this.editElement.nativeElement.focus();
				this.editElement.nativeElement.select();
				console.log( "${this.name}.focus & select;");
			},0);
		}
	}
	enterClick( x )
	{
		debugger;
	}
	blur( x ){ this.isEditing = false; }
	abstract get editElement():ElementRef;
	//get editElement():ElementRef{return this._editElement;}; @ViewChild("editElement") _editElement;
	//abstract get isEditing():boolean; abstract set isEditing(x:boolean);
	get isEditing():boolean{return this.#isEditing;}  set isEditing(x:boolean){this.#isEditing=x;}  #isEditing:boolean=false;
}

@Component({templateUrl: './watch-string-col.html', styleUrls:['./watch-col.scss']})
export class WatchStringCol extends WatchEditCol
{
	constructor()
	{super();}

	override blur( x )
	{
		super.blur( x );
		if( this.name=="Symbol" )
			this.parent.symbol = x=='' ? null : x;
	}

	get editElement():ElementRef{return this._editElement;}; @ViewChild("editElement") _editElement;
	override get value(){ return this._value; } override set value( x ){ this._value=x; }
}

@Component({templateUrl: './watch-num-col.html', styleUrls:['./watch-col.scss']})
export class WatchNumCol extends WatchEditCol
{
	constructor( private _decimalPipe: DecimalPipe )
	{super();}

	override blur( x )
	{
		super.blur( x );
		if( this.name=="Shares" )
			this.parent.shares = +x;
		else if( this.name=="AvgPrice" )
			this.parent.avgPrice = +x;
	}

	override get decimalPipe(){ return this._decimalPipe; }
	get editElement():ElementRef{return this._editElement;}; @ViewChild("editElement") _editElement;
	//get isEditing():boolean{return this.#isEditing;}  set isEditing(x:boolean){this.#isEditing=x;}  #isEditing:boolean=false;
}