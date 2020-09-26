import { DateUtilities, Day } from './dateUtilities';
import { DecimalPipe } from '@angular/common';

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;

export class MarketUtilities
{
	static isDateHoliday( value:Date )
	{
		let isHoliday = [0,6].includes( value.getUTCDay() );
		if( !isHoliday )
		{
			if( value.getUTCFullYear()==2020 )
			{
				isHoliday = /*(value.getUTCMonth()==3 && value.getUTCDate()==10)
					||*/ ( value.getUTCMonth()==6 && value.getUTCDate()==3 )
					|| ( value.getUTCMonth()==8 && value.getUTCDate()==7 )
					|| ( value.getUTCMonth()==10 && value.getUTCDate()==26 )
					|| ( value.getUTCMonth()==11 && value.getUTCDate()==25 );
			}
		}
		return isHoliday;
	}
	static isHoliday( day:Day, contract?:IB.IContract )
	{
		const mod = day%7;
		return mod==2 || mod==3 || [18512,18592,18621].indexOf(day)!=-1;
	}

	static previousTradingDate( value:Date|null=null, tradingHours:Results.IContractHours=null ):Date
	{
		let copy = value ? new Date(value) : new Date();
		if( tradingHours && copy.getTime()/1000<tradingHours.start )
			copy.setDate( copy.getDate()-1 );
		while( MarketUtilities.isDateHoliday(copy) )
			copy.setDate( copy.getDate()-1 );
		do
			copy.setDate( copy.getDate()-1 );
		while( MarketUtilities.isDateHoliday(copy) );
		return DateUtilities.beginningOfDay( copy );
	}
	static previous( contract:IB.IContract, reference?:Day ):Day
	{
		let day = reference;
		if( !day )
		{
			let now = new Date();
			day = DateUtilities.toDays( now );
			if( !this.isMarketOpen2(contract.exchange, contract.securityType, now) )
				--day;
		}
		while( MarketUtilities.isHoliday(day, contract) )
			--day;
		do
			--day;
		while( MarketUtilities.isHoliday(day, contract) );
		return day;
	}
	static previousTradingDay( reference?:Day, tradingHours?:Results.IContractHours ):Day
	{
		let day = 0;
		if( tradingHours )
			day = DateUtilities.toDays( this.previousTradingDate(reference ? DateUtilities.fromDays(reference) : new Date(), tradingHours) );
		else
		{
			day = reference ?? DateUtilities.toDays( new Date() );
			while( MarketUtilities.isHoliday(day) )
				--day;
			do
				--day;
			while( MarketUtilities.isHoliday(day) );
		}
		return day;
	}

	static nextTradingDate( value:Date|null=null ):Date
	{
		let copy = value ? new Date( value ) : new Date();
		do
			copy.setDate( copy.getDate()+1 );
		while( MarketUtilities.isDateHoliday(copy) );
		return DateUtilities.beginningOfDay( copy );
	}
	static nextTradingDay( value?:Day ):Day
	{
		let day = value ?? DateUtilities.toDays( new Date(value) );
		do
			++day;
		while( MarketUtilities.isHoliday(day) );
		return day;
	}
	static currentTradingDate( value:Date|null=null, tradingHours:Results.IContractHours=null ):Date
	{
		const day = MarketUtilities.nextTradingDate( MarketUtilities.previousTradingDate(value, tradingHours) );
		return day;
	}
	static currentTradingDay( now?:Day, tradingHours?:Results.IContractHours ):Day
	{
		return MarketUtilities.nextTradingDay( MarketUtilities.previousTradingDay(now, tradingHours) );
	}

	static isMarketOpen2( exchange:IB.Exchanges, secType:IB.SecurityType, date:Date=new Date() )
	{
		const etString = date.toLocaleString( "en-US", {timeZone: "America/New_York"} );
		const et = new Date( etString );
		return !MarketUtilities.isDateHoliday( et )
			&& ( secType==IB.SecurityType.Stock ? et.getHours()>3 && et.getHours()<19 : (et.getHours()==9 && et.getMinutes()>29) || (et.getHours()>9 && et.getHours()<16) );
	}
	static isMarketOpen( details:Results.IContractDetails )
	{
		return MarketUtilities.contractHours(details.tradingHours).start*1000 < new Date().getTime();
/*		var now = new Date().getTime()/1000;
		for( let openClose of details.tradingHours )
		{
			if( openClose.end )
				return now>openClose.start && now<openClose.end;
		}
		return false;*/
	}

	static isLiquid( details:Results.IContractDetails )
	{
		return MarketUtilities.contractHours(details.liquidHours).start*1000 < new Date().getTime();
	/*		var now = new Date().getTime()/1000;
		for( let openClose of details.tradingHours )
		{
			if( openClose.end )
				return now>openClose.start && now<openClose.end;
		}
		return false;*/
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
		const liquid = this.endTrading( date, contract );
		if( contract.securityType==IB.SecurityType.Stock )
			liquid.setHours( 16 );
		return liquid;
	}

	static get DefaultCurrency(){ return IB.Currencies.UsDollar; }
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

		return 19*60+DateUtilities.easternTimezoneOffset;
	}
	static isPreOpening( exchange:string, secType:string )
	{
		const etString = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
		const et = new Date( etString );
		return !MarketUtilities.isDateHoliday( et )
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