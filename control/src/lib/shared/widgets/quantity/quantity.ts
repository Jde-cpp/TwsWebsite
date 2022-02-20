import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component( {selector: "quantity",templateUrl: "quantity.html"} )
export class QuantityComponent
{
	autoValues( quantity:number )
	{
		let values = [];
		for( let i=Math.max(this.min, quantity-5*this.step); values.length<10; ++i )
			values.push( i*this.step );
		return values;
	}
	onFocus( e )
	{
		this.focusChange.emit( true );
		e.target.select();
	}
	onFocusout( e )
	{
		this.focusChange.emit( false );
	}
	initial:number|null=null;
	@Input() min:number=0;
	@Input() set placeholder( value ){ this._placeholder = value; console.log(`placeholder=${value}`); } get placeholder(){return this._placeholder} private _placeholder:string="Quantity";
	@Input() set step(value){if(typeof value=="string")this._step=+value; else this._step=value; } get step(){return this._step;} _step:number=1;
	@Output() valueChange = new EventEmitter<number>();
	@Output() focusChange = new EventEmitter<boolean>();
	@Input() set value(value)
	{
		if(this._value!=null && this._value!=value)
		{
			this.valueChange.emit(value);
			//console.log( `value=${value}` );
		}
		if( this.initial==null ) this.initial=value; this._value=value;
	} get value(){ return this._value;} _value:number|null=null;
	get options():number[]
	{
		let values:number[] = [];
		for( let i=Math.max(this.min, this.value-5*this.step); values.length<10; i+=this.step )
		{
			if( this.step==.01 )
				i = Math.round( i*100 )/100;
			values.push( i );
		}
		if( this.initial!=null && values[0]<this.initial && values[9]>this.initial && values.indexOf(this.initial)==-1 )
		{
			values.push( this.initial );
			values.sort( (a,b)=>a-b );
		}
		return values;
	};
}