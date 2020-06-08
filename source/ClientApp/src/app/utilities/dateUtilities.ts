import { Injectable } from '@angular/core';

//@Injectable( {providedIn: 'root'} )
export class DateUtilities
{
	static endOfDay( value:Date|null=null )
	{
		let copy = value ? new Date(value) : new Date();
		copy.setHours( 23 ); copy.setMinutes( 59-copy.getTimezoneOffset() ); copy.setSeconds( 59 );
		return copy;
	}
	static beginningOfDay( value:Date|null=null )
	{
		let copy = value ? new Date( value ) : new Date();
		copy.setHours( 0 ); copy.setMinutes( 0+copy.getTimezoneOffset() ); copy.setSeconds( 0 );
		return copy;
	}
	// //date control sends a local time date, but
	static fromDays( value:number ):Date
	{
		var t = new Date(1970, 0, 1);
		t.setSeconds( value*24*60*60 );
		return t;
	}
	static toDays( value:Date ):number
	{
		return Math.floor( value.getTime()/(24*60*60000) );
	}
}