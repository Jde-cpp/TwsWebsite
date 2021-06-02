import { DecimalPipe } from '@angular/common';
import { DateUtilities, Day } from 'jde-framework';

import * as ib2 from 'jde-cpp/ib';  import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;


export type Symbol = string;
export type ContractPK = number;

export class MarketUtilities
{
	static isDateHoliday( value:Date )
	{
		let isHoliday = [0,6].includes( value.getUTCDay() );
		if( !isHoliday )
		{
			if( value.getUTCFullYear()==2021 )
			{
				isHoliday = (value.getUTCMonth()==0 && (value.getUTCDate()==1 || value.getUTCDate()==18) )
					|| (value.getUTCMonth()==1 && value.getUTCDate()==15)
					|| (value.getUTCMonth()==3 && value.getUTCDate()==2)
					|| ( value.getUTCMonth()==4 && value.getUTCDate()==31 )
					|| ( value.getUTCMonth()==6 && value.getUTCDate()==5 )
					|| ( value.getUTCMonth()==8 && value.getUTCDate()==6 )
					|| ( value.getUTCMonth()==10 && value.getUTCDate()==25 )
					|| ( value.getUTCMonth()==11 && value.getUTCDate()==24 );
			}
		}
		return isHoliday;
	}
	static isHoliday( day:Day, contract?:IB.IContract )
	{
		const mod = day%7;
		return mod==2 || mod==3 || [18645,18673,18719,18778,18813,18876,18956,18985].indexOf(day)!=-1;
	}
	static isExchangeHoliday( day:Day, exchange:IB.Exchanges )
	{
		return MarketUtilities.isHoliday( day );
	}

	static previousTradingDate( value:Date|null=null, tradingHours:Results.IContractHours=null ):Day
	{
		let previous = value ? new Date(value) : new Date();
		if( tradingHours && previous.getTime()/1000<tradingHours.start )
			previous.setDate( previous.getDate()-1 );
		while( MarketUtilities.isDateHoliday(previous) )
			previous.setDate( previous.getDate()-1 );
		do
			previous.setDate( previous.getDate()-1 );
		while( MarketUtilities.isDateHoliday(previous) );
		return DateUtilities.toDays( previous );
	}
	static previousByType( exchange:IB.Exchanges, secType:IB.SecurityType, reference?:Day ):Day
	{
		let day = reference;
		if( !day )
		{
			let now = new Date();
			day = DateUtilities.toDays( now );
			if( !MarketUtilities.isMarketOpen2(exchange, secType, now) )
				--day;
		}
		while( MarketUtilities.isExchangeHoliday(day, exchange) )
			--day;
		do
			--day;
		while( MarketUtilities.isExchangeHoliday(day, exchange) );
		return day;
	}
	static previous( contract:IB.IContract, reference?:Day ):Day
	{
		let day = reference;
		if( !day )
		{
			let now = new Date();
			day = DateUtilities.toDays( now );
			if( !MarketUtilities.isMarketOpen2(contract.exchange, contract.securityType, now) )
				--day;
		}
		while( MarketUtilities.isHoliday(day, contract) )
			--day;
		do
			--day;
		while( MarketUtilities.isHoliday(day, contract) );
		return day;
	}
	static previousTradingDay( reference?:Day ):Day
	{
		let day = reference ?? DateUtilities.toDays( new Date() );
		while( MarketUtilities.isHoliday(day) )
			--day;
		do
			--day;
		while( MarketUtilities.isHoliday(day) );
		return day;
	}

	static nextTradingDate( value:Date|null=null ):Day
	{
		let copy = value ? new Date( value ) : new Date();
		do
			copy.setDate( copy.getDate()+1 );
		while( MarketUtilities.isDateHoliday(copy) );
		return DateUtilities.toDays( copy );
	}
	static nextTradingDay( value?:Day ):Day
	{
		let day = value ?? DateUtilities.toDays( new Date(value) );
		do
			++day;
		while( MarketUtilities.isHoliday(day) );
		return day;
	}
	static currentTradingDay( value:Date|null=null, tradingHours:Results.IContractHours=null ):Day
	{
		const day = MarketUtilities.nextTradingDay( MarketUtilities.previousTradingDate(value, tradingHours) );
		return day;
	}

	static isMarketOpen2( exchange:IB.Exchanges, secType:IB.SecurityType, date:Date=new Date() )
	{
		const etString = date.toLocaleString( "en-US", {timeZone: "America/New_York"} );
		const et = new Date( etString );
		return !MarketUtilities.isDateHoliday( et )
			&& ( secType==IB.SecurityType.Stock ? et.getHours()>3 && et.getHours()<19 : (et.getHours()==9 && et.getMinutes()>29) || (et.getHours()>9 && et.getHours()<16) );
	}
	static isMarketOpen( details:Results.IContractDetail )
	{
		return details.tradingHours
			? MarketUtilities.contractHours(details.tradingHours)?.start*1000 < new Date().getTime()
			: MarketUtilities.isMarketOpen2( details.contract.primaryExchange, details.contract.securityType );
	}

	static isLiquid( details:Results.IContractDetail )
	{
		return details.liquidHours
			? MarketUtilities.contractHours(details.liquidHours).start*1000 < new Date().getTime()
			: MarketUtilities.isMarketOpen2( details.contract.primaryExchange, IB.SecurityType.Option );
	}


	static contractHours( tradingHours:Results.IContractHours[] ):Results.IContractHours
	{
		var now = new Date().getTime()/1000;
		let i=0
		for( ; i<tradingHours.length && now>=(tradingHours[i].end || now); ++i );
		return i<tradingHours.length ? tradingHours[i] : null;
	}
	static startTrading( date:Date, contract:IB.IContract ):Date
	{
		const exchange = contract.exchange;
		if( exchange!=IB.Exchanges.Nasdaq && exchange!=IB.Exchanges.Nyse )
			console.error( `need to implement exchange '${exchange}` );

		const etString = date.toLocaleString( "en-US", {timeZone: "America/New_York"} );
		const et = new Date( etString );
		et.setHours( contract.securityType==IB.SecurityType.Stock ? 3 : 9.5 );
		return et;
	}
	static endTrading( date:Date, contract:IB.IContract ):Date
	{
		const exchange = contract.primaryExchange;
		if( exchange!=IB.Exchanges.Nasdaq && exchange!=IB.Exchanges.Nyse && exchange!=IB.Exchanges.Arca )
			console.error( `need to implement exchange '${exchange}` );

		const etString = date.toLocaleString( "en-US", {timeZone: "America/New_York"} );
		const et = new Date( etString );
		et.setHours( contract.securityType==IB.SecurityType.Stock ? 20 : 4, 0, 0, 0 );
		return et;
	}
	static endLiquid( date:Date, contract:IB.IContract ):Date
	{
		const liquid = MarketUtilities.endTrading( date, contract );
		if( contract.securityType==IB.SecurityType.Stock )
			liquid.setHours( 16 );
		return liquid;
	}

	static DefaultCurrency(){ return IB.Currencies.UsDollar; }
/*	static startTrading( details:Results.IContractDetails )
	{
		var now = new Date().getTime()/1000;
		let i=0
		for( ; i<details.tradingHours.length && now>(details.tradingHours[i].end || now); ++i );
		return i<details.tradingHours.length ? details.tradingHours[i].start*1000 : null;
	}
	static endTrading( details:Results.IContractDetails )
	{
		var now = new Date().getTime()/1000;
		let i=0
		for( ; i<details.tradingHours.length && now>(details.tradingHours[i].end || now); ++i );
		return i<details.tradingHours.length ? details.tradingHours[i].start*1000 : null;
	}
*/
	static getTimezoneOffset( exchange:string )
	{
		if( exchange!="Nasdaq" && exchange!="Nyse" )
			console.error( `need to implement exchange '${exchange}` );
		return DateUtilities.easternTimezoneOffset;
	}
	static getExtendedHoursEnd( exchange:string, secType:string )
	{
		if( exchange!="Nasdaq" && exchange!="Nyse" )
			console.error( `need to implement exchange '${exchange}` );

		return 19*60+DateUtilities.easternTimezoneOffset();
	}
	static isPreOpening( exchange:string, secType:string )
	{
		const etString = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
		const et = new Date( etString );
		return !MarketUtilities.isDateHoliday( et )
			&& secType=="STK" && et.getHours()>3 && ( et.getHours()<9 || (et.getHours()==9 && et.getMinutes()<30) );
	}

	static optionDayDisplay( expirationDays:Day ):string{ return MarketUtilities.optionDateDisplay(DateUtilities.fromDays(expirationDays)); }
	static optionDateDisplay( expiration:Date ):string
	{
		const now = new Date();
		var result:string;
		const month = expiration.toLocaleString( 'default', {month: 'short'} );
		if( expiration.getTime()-now.getTime()<6*24*60*60*1000 )
			result = DateUtilities.dayOfWeek( expiration );
		else if( expiration.getDate()>14 && expiration.getDate()<22 && expiration.getUTCDay()==5 )
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

	static optionDisplay( contract?:IB.IContract ):string{ return `${contract.symbol}(${MarketUtilities.optionDayDisplay(contract.expiration)})@${contract.strike}`; }
//, '1.2-2'
	static numberDisplay( value:number, decimalPipe: DecimalPipe ):string//TODO move to pipe
	{
		let divisor = 1;  let fixedPlaces = 0; let suffix = "";
		let calc = ( amount:number, sffx:string ):boolean=>
		{
			if( value>amount )
				divisor = amount;
			if( divisor!=1 )
			{
				fixedPlaces =  value>amount*10 ? value>amount*100 ? 0 : 1 : 2;
				suffix = sffx;
			}
			return divisor!=1;
		};

		calc( 1_000_000_000, "B" ) || calc( 1_000_000, "M" ) || calc( 1_000, "K" );
		value/=divisor;
		const display = `${decimalPipe.transform(value, `1.${fixedPlaces}-${fixedPlaces}`)}${suffix}`; //${fixedPlaces==0 ? Math.round(value) : (value).toFixed(fixedPlaces)}suffix`;
		return display;
	}
}