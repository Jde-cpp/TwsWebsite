import { Component, EventEmitter, Input, Output, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { IProfile } from 'jde-framework';
import { TwsService } from 'jde-tws';
import { TickDetails } from 'jde-tws';

//import * as ib2 from 'dist/jde-tws-assets/src/assets/proto/ib'; import IB = ib2.Jde.Markets.Proto;
//import * as ib2 from '../proto/ib';  import IB = ib2.Jde.Markets.Proto;
import * as ib2 from 'jde-cpp/ib';  import IB = ib2.Jde.Markets.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;
import { MarketUtilities } from 'jde-tws';
import { DateUtilities } from 'jde-framework';

export class Fundamentals
{
	constructor( public values:{[k: string]: number} )
	{}
	get( key:string ):number|null{ return this.values ? this.values[key] : null; }
	get marketCap():number|null{ return this.get("MKTCAP")*1000000; };
	private get nPrice():number|null{ return this.get("NPRICE"); };
	get averageVolume():number|null{ return -1; }
	get low52Week():number|null{ return this.get("NLOW"); }
	get high52Week():number|null{ return this.get("NHIG"); }
	get beta():number|null{ return this.get("BETA"); }

	//dividends
	get yield():number|null{ return this.get("YIELD"); }
	get exDividendDate():Date|null{ return this.values?.DIV_NEXT_DAY ? DateUtilities.fromDays(this.values?.DIV_NEXT_DAY) : null; }
	get dividendPayableDate():Date|null{ return null; }
	get dividendNextYear():number|null{ return this.get("DIV_NEXT_YEAR"); }
	get dividendNext():number|null{ return this.get("DIV_NEXT"); }
	get avgDividend5Years():number|null{ return this.get("ADIV5YAVG"); }//Average of the Annual Dividends Per Share for the last 5 years.
	get payoutRatio():number|null{ return this.get("TTMPAYRAT"); }
	get dividendYield5YrAvg():number|null{ return this.get("YLD5YAVG"); }//
	get dividendGrowthRate():number|null{ return this.get("DIVGRPCT"); }//3 years whenever 4 years of dividends are available.
	get dividendRate():number|null{ return this.get("IAD"); }//his value is the total of the expected dividend payments over the next twelve months

	get nextEarningsDate():number|null{ return null; }

	get eps():number|null{ return this.get("TTMEPSXCLX"); }//EPS exc. extr. items
	get peExcludingExtraordinaryItems():number|null{ return this.get("PEEXCLXOR"); }//P/E excluding extraordinary items over the last four interim periods
	get cfps():number|null{ return this.get("ACFSHR"); }//cash flow per share.


	//assets
	get cashSTInvestments():number|null{ return this.get("​QCASH"); } //ST Cash+Investments
	get capitalExpendituresFy():number|null{ return this.get("ASCEX"); } //FY
	get capitalExpenditures():number|null{ return this.get("QSCEX"); }
	get tangibleValuePerShare():number|null{ return this.get("QTANBVPS"); }
	get investingCashFlows():number|null{ return this.get("ASICF"); }
	get inventoryTurnover():number|null{ return this.get("TTMINVTURN"); }
	get totalAssets():number|null{ return this.get("QTA"); }
	get currentAssetsMRY():number|null{ return this.get("AATCA"); }
	get currentAssets():number|null{ return this.get("QATCA"); }//current assets - MRQ
	get receivablesTurnover():number|null{ return this.get("TTMRECTURN"); }//TTM Revenue/Average Accounts Receivables. Average Receivables is calculated by adding the Accounts Receivables for the 5 most recent quarters and dividing by 5.

	//Liabilities
	get netDebt():number|null{ return this.get("NetDebt_I"); } //short term debt, and notes payables, Long Term debt, minority	interest, and preferred equity minus the total cash and equivalents and short term investments
	get netIssuanceOfDebt():number|null{ return this.get("QFPRD"); }
	get totalCurrentLiabilitiesMRY():number|null{ return this.get("ALTCL"); }
	get currentLiabilities():number|null{ return this.get("QLTCL"); }
	get notesPayableSTDebt():number|null{ return this.get("QLSTD"); }//Notes payable/short term debt for the most recent interim period
	get netDebtIssuance():number|null{ return this.get("AFPRD"); }//Net issuance of debt for the most recent fiscal year
	get notesPayableSTDebtMry():number|null{ return this.get("ALSTD"); }//Notes payable/short term debt for the most recent fiscal year
	get totalLiabilities():number|null{ return this.get("QTL"); }
	get ltDebt():number|null{ return this.get("QTOTLTD"); }//sum of all Long Term Debt and Capitalized Lease Obligations for the most recent interim period.

	//balance sheet
	get currentRatio():number|null{ return this.get("QCURRATIO"); } //Current Assets/Current Liabilities.
	get quickRatio():number|null{ return this.get("QQUICKRATI"); }//[Cash+Short Term Investments+AR]/Current Liabilities
	get ltDebtToEquity():number|null{ return this.get("QLTD2EQ"); }//LT Debt/Equity
	get debtEquityRatio():number|null{ return this.get("QTOTD2EQ"); }//Debt/Equity for the most recent interim period

	//Revenue
	get revenuePerShare():number|null{ return this.get("TTMREVPS"); }
	get revenue():number|null{ return this.get("TTMREV"); } //revenue for the most recent TTM period
	get revenuChangeTtm():number|null{ return this.get("TTMREVCHG"); }
	get revenueGrowthRate():number|null{ return this.get("REVTRENDGR"); }//Five Year Revenue Growth Rate is the annual compounded growth rate of Revenues over the last 5 years
	get revenueChangeYoY():number|null{ return this.get("REVCHNGYR"); }//This value is calculated as the most recent interim period Sales minus the Sales for the same interim period 1 year ago divided by the Sales for the same interim period one year ago, multiplied by 100.

	//earnings
	get operatingIncome():number|null{ return this.get("QSOPI"); }
	get operatingInconeMRY():number|null{ return this.get("ASOPI"); }//MRY=most recent year
	get incomeNormalized():number|null{ return this.get("ANIACNORM"); }//annual amount accruing to common shareholders for dividends and re-tained earnings excluding the impact of all unusual/one-time/special charges items.
	get ebitMRY():number|null{ return this.get("AEBIT"); }
	get EbitdTtm():number|null{ return this.get("TTMEBITD"); }
	get Ebitd():number|null{ return this.get("QEBITDA"); }//Mrq
	get earningsBeforeTaxes():number|null{ return this.get("TTMEBT"); }
	get earningsBeforeTaxesNormalizedFY():number|null{ return this.get("AEBTNORM"); }
	get epsExcludingExtraordinary():number|null{ return this.get("AEPSXCLXOR"); }//EPS excluding extraordinary items - MRY
	get epsNormalized():number|null{ return this.get("AEPSNORM"); }
	get epsGrowthRate():number|null{ return this.get("EPSTRENDGR"); }
	get freeCashFlowPerShare():number|null{ return this.get("TTMFCFSHR"); }
	get analystForcast():number|null{ return this.get("AFEEPSNTM"); }//Analyst Forecast of EPS - N12
	get epsChange():number|null{ return this.get("TTMEPSCHG"); }//This is the percent change in the TTM EPS as compared to the same TTM period one year ago.
	get returnOnAverageAssets():number|null{ return this.get("TTMROAPCT"); }//Income After Taxes TTM/Average Total Assets
	get netIncomeAvailableToCommon():number|null{ return this.get("TTMNIAC"); }
	get returnOnAssets():number|null{ return this.get("AROAPCT"); }//his value is calculated as the Income After Taxes for the most recent fiscal year divided by the Average Total Assets, expressed as a percentage. Average Total Assets is the average of the Total Assets at the beginning and the end of the year.
	get returnOnInvestment():number|null{ return this.get("TTMROIPCT"); }//This value is the trailing twelve month Income After Taxes divided by the average Total Long Term Debt, Other Long Term Liabilities and Shareholders Equity, expressed as a percentage.
	get returnOnInvestmentMry():number|null{ return this.get("AROIPCT"); }//This value is the annual Income After Taxes divided by the average Total Long Term Debt, Other Long Term Liabilities, and Shareholders Equity, expressed as a percentage.
	get ebitMrq():number|null{ return this.get("QEBIT"); }
	get peNoralized():number|null{ return this.get("APENORM"); }//Price/ annual normalized eps.
	get epsChangeYoY():number|null{ return this.get("EPSCHNGYR"); }//Most recent interim period EPS minus the EPS for the same interim period 1 year ago divided by the EPS for the same interim period one year ago, multiplied by 100.

	//margin
	get profitMarginPercent():number|null{ return this.get("TTMNPMGN"); }
	get operatingMargin():number|null{ return this.get("TTMOPMGN"); }//revenues after operating expenses.
	get pretaxMarginTtm():number|null{ return this.get("TTMPTMGN"); }
	get pretaxMarginMry():number|null{ return this.get("APTMGNPCT"); }

	get grossMargin():number|null{ return this.get("TTMGROSMGN"); }//percent of revenue left after paying all direct production expenses.

	get priceToCashFlowTtm():number|null{ return this.get("TTMPRCFPS"); }
	get priceToFreeCashFlowPerShare():number|null{ return this.get("TTMPRFCFPS"); }
	get enterpriseValueToEbitda():number|null{ return this.get("EV2EBITDA_Cur"); }

	get freeCashFlow():number|null{ return this.get("TTMFCF"); }
	get cashFromOperationsMry():number|null{ return this.get("AOTLO"); }
	get cashFromOperations():number|null{ return this.get("QOTLO"); }//Cash from operating activities - MRQ
	get financingCashFlowItemsMry():number|null{ return this.get("ASFCF"); }//MRY
	get financingCashFlowItems():number|null{ return this.get("QSFCF"); }
	get investingCashFlowItems():number|null{ return this.get("QSICF"); }

	//shares
	get sharesOutstanding():number|null{ return this.marketCap/this.nPrice; }
	get netStockIssuanceMry():number|null{ return this.get("AFPSS"); }
	get netStockIssuance():number|null{ return this.get("QFPSS"); } //Net issuance of stock for the most recent interim period
	get cashFlowPerShare():number|null{ return this.get("TTMCFSHR"); }
	get cashPerShare():number|null{ return this.get("QCSHPS"); }//Total Cash plus Short Term Investments divided by the Shares Outstanding at the end of the most recent interim period
	get revenuePerShareMry():number|null{ return this.get("AREVPS"); }//Revenue for the most recent fiscal year divided by the Average Diluted Shares Outstanding.


	get returnOnEquity():number|null{ return this.get("TTMROEPCT"); }//Return on average equity % Income /Common Equity

	//per employee
	get niPerEmployee():number|null{ return this.get("TTMNIPEREM"); }//TTM
	get revenuePerEmployee():number|null{ return this.get("TTMREVPERE"); }
	//price
	get price13Week():number|null{ return this.get("PR13WKPCT"); }
	get relativeSnPPrice():number|null{ return this.get("PRYTDPCTR"); }//Relative (S&P500) price percent change - YTD
	get priceToBook():number|null{ return this.get("PRICE2BK"); }
	get priceToCashFlow():number|null{ return this.get("QPRCFPS"); }//
	get frac52Wk():number|null{ return this.get("Frac52Wk"); }//(Last - 52 week low) / (52 week high - 52 week low).
	get price4WeekPctChange():number|null{ return this.get("PR4WKPCT"); }//Price - 4 week price percent change
	get priceToTangibleBook():number|null{ return this.get("PR2TANBK"); }
	get priceToRevenuesTtm():number|null{ return this.get("TTMPR2REV"); }
	get priceToRevenues():number|null{ return this.get("QPR2REV"); } //current Price divided by the Sales Per Share for MRQ or announcement.

	get priceChange52Weeks():number|null{ return this.get("PR52WKPCT"); }
	get priceChange1Week():number|null{ return this.get("PR1WKPCT"); }//percentage change in the company's stock price over the last week.

	//Interest
	get netInterestCoverage():number|null{ return this.get("TTMINTCOV"); } //EBIT/interest
	get interestExpense():number|null{ return this.get("QSINN"); }//Operating and Non-Operating Interest Expense for the most recent interim period.
	get interestExpenseMry():number|null{ return this.get("ASINN"); }//e Total Operating and Non-Operating Interest Expense for the most recent fiscal year.


	get commonEquity():number|null{ return this.get("QTOTCE"); }
	get currentEnterpriseValue():number|null{ return this.get("EV_Cur"); }//Market Capitalization and Net Debt.
	get bookValue():number|null{ return this.get("QBVPS"); }

	get lastAvailableDate():number|null{ return this.get("LATESTADATE"); }//Date when the ratio data was last updated

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