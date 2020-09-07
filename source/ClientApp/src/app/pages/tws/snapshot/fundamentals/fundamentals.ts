import { Component, EventEmitter, Input, Output, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {MatRadioChange} from '@angular/material/radio'
import { Subject, Observable, Subscription, forkJoin, CompletionObserver } from 'rxjs';
import { IProfile } from 'src/app/services/profile/IProfile';
import { TwsService } from 'src/app/services/tws/tws.service';
import { TickEx, TickDetails } from 'src/app/services/tws/Tick';
import { IPageEvent } from 'src/app/shared/framework/paginator/paginator'
import { Option } from 'src/app/shared/tws/options/option-table/option'
import {OptionEntryDialog} from 'src/app/shared/tws/dialogs/option-entry/option-entry'
import {Settings,JoinSettings} from 'src/app/utilities/settings'

import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import { Day, DateUtilities } from 'src/app/utilities/dateUtilities';

export class Fundamentals
{
	constructor( public values:{[k: string]: number} )
	{}
	//set values(value:{ [k: string]: number } ){this._values=value;} private _values:{ [k: string]: number };
	get( key:string ):number|null{ return this.values ? this.values[key] : null; }
	get marketCap():number|null{ return this.get("MKTCAP")*1000000; };
	private get nPrice():number|null{ return this.get("NPRICE"); };
	get averageVolume():number|null{ return -1; }
	get low52Week():number|null{ return this.get("NLOW"); }
	get high52Week():number|null{ return this.get("NHIG"); }
	get beta():number|null{ return this.get("BETA"); }
	//get priceEarnings():number|null{ return this.nPrice/this.eps; }

	//get eps():number|null{ return this.get("EPS"); }

	//dividends
	get yield():number|null{ return this.get("YIELD"); }
	get exDividendDate():Date|null{ return DateUtilities.fromDays(this.get("DIV_NEXT_DAY")); }
	get dividendPayableDate():Date|null{ return null; }
	get dividendNextYear():number|null{ return this.get("DIV_NEXT_YEAR"); }
	get dividendNext():number|null{ return this.get("DIV_NEXT"); }
	get avgDividend5Years():number|null{ return this.get("ADIV5YAVG"); }//Average of the Annual Dividends Per Share for the last 5 years.
	get payoutRatio():number|null{ return this.get("TTMPAYRAT"); }


	get nextEarningsDate():number|null{ return -1; }

	get eps():number|null{ return this.get("TTMEPSXCLX"); }//EPS exc. extr. items
	get peExcludingExtraordinaryItems():number|null{ return this.get("PEEXCLXOR"); }//P/E excluding extraordinary items over the last four interim periods
	get cfps():number|null{ return this.get("ACFSHR"); }//cash flow per share.


	//assets
	get cashSTInvestments():number|null{ return this.get("​QCASH"); } //ST Cash+Investments
	get capitalExpenditures():number|null{ return this.get("ASCEX"); } //FY
	get tangibleValuePerShare():number|null{ return this.get("QTANBVPS"); }
	get investingCashFlows():number|null{ return this.get("ASICF"); }
	get inventoryTurnover():number|null{ return this.get("TTMINVTURN"); }

	//Liabilities
	get netDebt():number|null{ return this.get("NetDebt_I"); } //short term debt, and notes payables, Long Term debt, minority	interest, and preferred equity minus the total cash and equivalents and short term investments
	get netIssuanceOfDebt():number|null{ return this.get("QFPRD"); }

	//balance sheet
	get currentRatio():number|null{ return this.get("QCURRATIO"); } //Current Assets/Current Liabilities.
	//Revenue
	get revenuePerShare():number|null{ return this.get("TTMREVPS"); }
	get revenue():number|null{ return this.get("TTMREV"); } //revenue for the most recent TTM period

	//earnings
	get operatingIncome():number|null{ return this.get("QSOPI"); }
	get operatingInconeMRY():number|null{ return this.get("ASOPI"); }//MRY=most recent year
	get ebitMRY():number|null{ return this.get("AEBIT"); }
	get earningsBeforeTaxes():number|null{ return this.get("TTMEBT"); }
	get earningsBeforeTaxesNormalizedFY():number|null{ return this.get("AEBTNORM"); }
	get epsExcludingExtraordinary():number|null{ return this.get("AEPSXCLXOR"); }//EPS excluding extraordinary items - MRY
	get epsNormalized():number|null{ return this.get("AEPSNORM"); }
	get analystForcast():number|null{ return this.get("AFEEPSNTM"); }//Analyst Forecast of EPS - N12

	//margin
	get profitMarginPercent():number|null{ return this.get("TTMNPMGN"); }
	get operatingMargin():number|null{ return this.get("TTMOPMGN"); }//revenues after operating expenses.
	get pretaxMargin():number|null{ return this.get("TTMPTMGN"); }
	get grossMargin():number|null{ return this.get("TTMGROSMGN"); }//percent of revenue left after paying all direct production expenses.

	get priceToCashFlowTtm():number|null{ return this.get("TTMPRCFPS"); }
	get priceToFreeCashFlowPerShare():number|null{ return this.get("TTMPRFCFPS"); }
	get enterpriseValueToEbitda():number|null{ return this.get("EV2EBITDA_Cur"); }

	get freeCashFlow():number|null{ return this.get("TTMFCF"); }
	get cashFromOperatingActivities():number|null{ return this.get("AOTLO"); }

	//shares
	get sharesOutstanding():number|null{ return this.marketCap/this.nPrice; }
	get netIssuanceOfStock():number|null{ return this.get("AFPSS"); }


	get returnOnEquity():number|null{ return this.get("TTMROEPCT"); }//Return on average equity % Income /Common Equity

	//per employee
	get niPerEmployee():number|null{ return this.get("TTMNIPEREM"); }//TTM

	//price
	get price13Week():number|null{ return this.get("PR13WKPCT"); }
	get relativeSnPPrice():number|null{ return this.get("PRYTDPCTR"); }//Relative (S&P500) price percent change - YTD

	//Interest
	get netInterestCoverage():number|null{ return this.get("TTMINTCOV"); } //EBIT/interest
	get interestExpense():number|null{ return this.get("QSINN"); }//Operating and Non-Operating Interest Expense for the most recent interim period.
	get interestExpenseMry():number|null{ return this.get("ASINN"); }//e Total Operating and Non-Operating Interest Expense for the most recent fiscal year.


	get commonEquity():number|null{ return this.get("QTOTCE"); }
	get currentEnterpriseValue():number|null{ return this.get("EV_Cur"); }//Market Capitalization and Net Debt.
	get bookValue():number|null{ return this.get("QBVPS"); }


/*get niPerEmployee():number|null{ return this.get("QQUICKRATI"); }
get niPerEmployee():number|null{ return this.get("PRICE2BK"); }
get niPerEmployee():number|null{ return this.get("TTMFCFSHR"); }
get niPerEmployee():number|null{ return this.get("TTMEBITD"); }
get niPerEmployee():number|null{ return this.get("ASFCF"); }
get niPerEmployee():number|null{ return this.get("QPRCFPS"); }
get niPerEmployee():number|null{ return this.get("EPSTRENDGR"); }
get niPerEmployee():number|null{ return this.get("LATESTADATE"); }
get niPerEmployee():number|null{ return this.get("QLTD2EQ"); }
get niPerEmployee():number|null{ return this.get("TTMEPSCHG"); }
get niPerEmployee():number|null{ return this.get("YLD5YAVG"); }
get niPerEmployee():number|null{ return this.get("TTMREVCHG"); }
get niPerEmployee():number|null{ return this.get("Frac52Wk"); }
get niPerEmployee():number|null{ return this.get("PR4WKPCT"); }
get niPerEmployee():number|null{ return this.get("QTA"); }
get niPerEmployee():number|null{ return this.get("PR2TANBK"); }
get niPerEmployee():number|null{ return this.get("TTMROAPCT"); }
get niPerEmployee():number|null{ return this.get("QSFCF"); }
get niPerEmployee():number|null{ return this.get("TTMPR2REV"); }
get niPerEmployee():number|null{ return this.get("AATCA"); }
get niPerEmployee():number|null{ return this.get("PR52WKPCT"); }
get niPerEmployee():number|null{ return this.get("REVTRENDGR"); }
get niPerEmployee():number|null{ return this.get("APTMGNPCT"); }
get niPerEmployee():number|null{ return this.get("TTMCFSHR"); }
get niPerEmployee():number|null{ return this.get("ALTCL"); }
get niPerEmployee():number|null{ return this.get("QLTCL"); }
get niPerEmployee():number|null{ return this.get("DIVGRPCT"); }
get niPerEmployee():number|null{ return this.get("QLSTD"); }
get niPerEmployee():number|null{ return this.get("QCSHPS"); }
get niPerEmployee():number|null{ return this.get("QSICF"); }
get niPerEmployee():number|null{ return this.get("TTMNIAC"); }
get niPerEmployee():number|null{ return this.get("TTMROIPCT"); }
get niPerEmployee():number|null{ return this.get("AFPRD"); }
get niPerEmployee():number|null{ return this.get("AREVPS"); }
get niPerEmployee():number|null{ return this.get("IAD"); }
get niPerEmployee():number|null{ return this.get("TTMRECTURN"); }
get niPerEmployee():number|null{ return this.get("QEBIT"); }
get niPerEmployee():number|null{ return this.get("ALSTD"); }
get niPerEmployee():number|null{ return this.get("QTOTD2EQ"); }
get niPerEmployee():number|null{ return this.get("APENORM"); }
get niPerEmployee():number|null{ return this.get("PR1WKPCT"); }
get niPerEmployee():number|null{ return this.get("QOTLO"); }
get niPerEmployee():number|null{ return this.get("QPR2REV"); }
get niPerEmployee():number|null{ return this.get("QATCA"); }
get niPerEmployee():number|null{ return this.get("QFPSS"); }
get niPerEmployee():number|null{ return this.get("EPSCHNGYR"); }
get niPerEmployee():number|null{ return this.get("QTL"); }
get niPerEmployee():number|null{ return this.get("REVCHNGYR"); }
get niPerEmployee():number|null{ return this.get("ANIACNORM"); }
get niPerEmployee():number|null{ return this.get("TTMREVPERE"); }
get niPerEmployee():number|null{ return this.get("QSCEX"); }
get niPerEmployee():number|null{ return this.get("QEBITDA"); }
get niPerEmployee():number|null{ return this.get("AROIPCT"); }
get niPerEmployee():number|null{ return this.get("QTOTLTD"); }
get niPerEmployee():number|null{ return this.get("AROAPCT"); }
	*/

	//https://usermanual.wiki/Document/apireferenceguide.225602080/help
}

@Component({ selector: 'fundamentals', styleUrls: ['fundamentals.scss'], templateUrl: './fundamentals.html' })
export class FundamentalsComponent implements OnInit, AfterViewInit, OnDestroy
{
	constructor( private tws:TwsService, @Inject('IProfile') private profileService: IProfile, private decimalPipe: DecimalPipe )
	{}

	ngOnInit()
	{
		this.tabSubscription = this.tabEvents.subscribe( {next: value=>{this.isActive = this.index==value;}} );
	}
	ngAfterViewInit()
	{
	}
	ngOnDestroy()
	{
		for( let key of Object.keys(this._value.values) )
			console.log( `${key}=${this._value.values[key]}` );
	}

	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
	@Input() index:number;
	@Input() tick:TickDetails;
	@Input() set value(x){ this._value=x; if( x )this.viewPromise = Promise.resolve( true );} get value()
	{
		return this._value;
	} _value:Fundamentals;

	get open(){return this.tick.open;}
	get previousClose(){return this.tick.close;}
	get averageVolume(){ return this.value?.averageVolume;}
	get marketCapDisplay(){ return MarketUtilities.numberDisplay(this.value.marketCap, this.decimalPipe); }
	get sharesDisplay(){ return MarketUtilities.numberDisplay(this.value.sharesOutstanding, this.decimalPipe); }
	get priceEarnings(){ return this.tick.currentPrice/this.value.eps;}
	isActive:boolean;
	viewPromise:Promise<boolean>;
}