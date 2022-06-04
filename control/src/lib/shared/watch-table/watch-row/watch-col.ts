import { DecimalPipe } from '@angular/common';
import {Component} from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { WatchRowComponent } from './watch-row';

@Component({templateUrl: './watch-col.html', styleUrls:['./watch-col.scss']})
export class WatchCol
{
	constructor( private decimalPipe: DecimalPipe ){}
	get className():string
	{
		return this.parent || this.number!==undefined ? "size" : this.propertyName;
	}
	isEditing:boolean;
	get isSimple(){ return this.name!="Change"; }
	name:string;
	parent:WatchRowComponent;
	get propertyName():string{ return this.name[0].toLowerCase()+this.name.substring(1); }
	get value()
	{
		if( this.parent )
		{
			return this.decimalPipe.transform(this.parent.tick[this.propertyName], '1.2-2')
			//return ;
		}
		else if( this.number!==undefined )
			return this.number.toString();
		else
			return this.number ? this.number.toString() : this.#value;
	}; set value( x ){ this.#value=x }; #value:string;
	number:number;
}
