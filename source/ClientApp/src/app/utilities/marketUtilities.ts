import { DateUtilities } from './dateUtilities';

export class MarketUtilities
{
	static isHoliday( value:Date )
	{
		let isHoliday = [0,6].includes( value.getUTCDay() );
		if( !isHoliday )
		{
			if( value.getUTCFullYear()==2020 )
			{
				isHoliday = (value.getUTCMonth()==3 && value.getUTCDate()==10);
			}
		}
		return isHoliday;
	}
	static previousTradingDay( value:Date|null=null )
	{
		let copy = value ? new Date(value) : new Date();
		copy.setDate( copy.getDate()-1 );
		while( MarketUtilities.isHoliday(copy) )
			copy.setDate( copy.getDate()-1 );
		return DateUtilities.endOfDay( copy );
	}
	static nextTradingDay( value:Date|null=null )
	{
		let copy = value ? new Date( value ) : new Date();
		if( copy.getUTCDay()==0 )
			copy.setDate( copy.getDate()+1 );
		else if( copy.getUTCDay()==6 )
			copy.setDate( copy.getDate()+2 );
		//TODO get holidays
		return copy;
	}
	static isMarketOpen( exchange:string, secType:string )
	{
		const etString = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
		const et = new Date( etString );
		return !MarketUtilities.isHoliday( et )
			&& ( secType=="STK" ? et.getHours()>3 && et.getHours()<19 : (et.getHours()==9 && et.getMinutes()>29) || (et.getHours()>9 && et.getHours()<16) );
	}
	static isPreOpening( exchange:string, secType:string )
	{
		const etString = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
		const et = new Date( etString );
		return !MarketUtilities.isHoliday( et )
			&& secType=="STK" && et.getHours()>3 && ( et.getHours()<9 || (et.getHours()==9 && et.getMinutes()<30) );
	}
	static optionDisplayFromDays( expirationDays:number ):string
	{
		return MarketUtilities.optionDisplay( DateUtilities.fromDays(expirationDays) );
	}
	static optionDisplay( expiration:Date ):string
	{
		const now = new Date();
		var result:string;
		const month = expiration.toLocaleString( 'default', {month: 'short'} );
		if( expiration.getTime()-now.getTime()<6*24*60*60*1000 )
			result = "Friday";
		else if( expiration.getDate()>14 && expiration.getDate()<22 )
		{
			if( expiration.getFullYear()==now.getFullYear() || (expiration.getFullYear()==now.getFullYear()+1 && expiration.getMonth()<now.getMonth()) )
				result = month;
			else
				result = `${expiration.getFullYear()-2000}-${month}`;
		}
		else
			result = `${month}-${expiration.getDate()}`;
		return result;
	}
}