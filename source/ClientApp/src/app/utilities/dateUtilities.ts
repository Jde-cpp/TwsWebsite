import { Injectable } from '@angular/core';

export type Day = number;
export type Minutes = number;

export class DateUtilities
{
	static endOfDay( value:Date|null=null ):Date
	{
		let copy = value ? new Date(value) : new Date();
		copy.setUTCHours( 23, 59, 59, 0 );
		return copy;
	}
	static beginningOfDay( value:Date|null=null )
	{
		let copy = value ? new Date( value ) : new Date();
		copy.setUTCHours( 0, 0, 0, 0 );
		return copy;
	}
	// //date control sends a local time date, but
	static fromDays( value:Day ):Date
	{
		var t = new Date(1970, 0, 1);
		t.setSeconds( value*24*60*60 );
		return t;
	}
	static toDays( value:Date ):Day
	{
		return Math.floor( value.getTime()/(24*60*60000) );
	}

	static get easternTimezoneOffset():Minutes//in Minutes
	{
		if( !DateUtilities._easternTimezoneOffset )
		{
			var usaTime = new Date().toLocaleString( "en-US", {timeZone: "America/New_York"} );
			DateUtilities._easternTimezoneOffset = new Date(usaTime).getTimezoneOffset();
		}
		return DateUtilities._easternTimezoneOffset;
	} private static _easternTimezoneOffset:Minutes=null;
}