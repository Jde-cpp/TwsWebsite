
export class MarketUtilities
{
	static previousTradingDay( value:Date|null=null )
	{
		let copy = value ? new Date(value) : new Date(); 
		copy.setDate( copy.getDate()-1 );
		if( copy.getDay()==0 ) 
			copy.setDate( copy.getDate()-2 );
		else if( copy.getDay()==6 ) 
			copy.setDate( copy.getDate()-1 );
		//TODO get holidays
		return copy;
	}
	static nextTradingDay( value:Date|null=null )
	{
		let copy = value ? new Date( value ) : new Date(); 
		if( copy.getDay()==0 ) 
			copy.setDate( copy.getDate()+1 );
		else if( copy.getDay()==6 ) 
			copy.setDate( copy.getDate()+2 );
		//TODO get holidays
		return copy;
	}
}