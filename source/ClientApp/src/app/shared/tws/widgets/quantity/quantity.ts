import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component( {selector: 'quantity',templateUrl: 'quantity.html'} )
export class QuantityComponent
{
	autoValues( quantity:number )
	{
		let values = [];
		for( let i=Math.max(this.min, quantity-5*this.step); values.length<10; ++i )
			values.push( i*this.step );
		return values;
	}
	initial:number|null=null;
	@Input() min:number=0;
	@Input() set step(value){if(typeof value=="string")this._step=+value; else this._step=value; } get step(){return this._step;} _step:number=1;
	@Output() valueChange = new EventEmitter<number>();
	@Input() set value(value)
	{ 
	    if(this._value!=null && this._value!=value) 
	        this.valueChange.emit(value); 
	    if( this.initial==null ) this.initial=value; this._value=value; } get value(){ return this._value;} _value:number|null=null;
	get options():number[]
	{
		let values:number[] = [];
		for( let i=Math.max(this.min, this.value-5*this.step); values.length<10; i+=this.step )
			values.push( i );
		if( this.initial!=null && values[0]<this.initial && values[9]>this.initial && values.indexOf(this.initial)==-1 )
		{
			values.push( this.initial );
			values.sort( (a,b)=>a-b );
		}
		return values;
	};
}