import { Component, AfterViewInit, OnInit, OnDestroy, Inject, ViewChild, Input } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { IProfile, IErrorService, Settings} from 'jde-framework'
import { TwsService } from 'jde-tws';
import { ComponentPageTitle } from 'jde-material-site';
import { Observable, Subscription } from 'rxjs';
import * as myBlockly2 from 'jde-cpp/edgar'; import Edgar = myBlockly2.Jde.Markets.Edgar.Proto;
import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;

@Component( {selector: 'investors', styleUrls: ['investors.css'], templateUrl: './investors.html'} )
export class InvestorsComponent implements AfterViewInit, OnInit, OnDestroy
{
	constructor( private tws : TwsService, private componentPageTitle:ComponentPageTitle, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnInit()
	{
		//this.componentPageTitle.title = this.componentPageTitle.title ? this.componentPageTitle.title+" | Investors" : "Investors";
		this.tabSubscription = this.tabEvents.subscribe( {next: value=>{this.isActive = this.index==value;}} );
	};

	ngOnDestroy()
	{
		this.profile.save();
	}
	ngAfterViewInit():void
	{
		this.profile.load().then( ()=>{this.load();} );
	}
	cellClick( row:Edgar.IInvestor )
	{
		this.selection = this.selection == row ? null : row;
	}
	sortData( options:Sort )
	{
		const values = this.investors.slice();
		const multiplier = options.direction === 'asc' ? 1 : -1;
		this.investors = values.sort((a, b) =>
		{
			let lessThan = false;
			if( options.active=='name' ) lessThan = a.name<b.name;
			else if( options.active=='shares' ) lessThan = a.shares<b.shares;
			else if( options.active=='marketValue' ) lessThan = a.marketValue<b.marketValue;
			else if( options.active=='pctOfPortfolio' ) lessThan = a.pctOfPortfolio<b.pctOfPortfolio;
			else
				throw `unknown sort:  '${options.active}'`;
			return (lessThan ? -1 : 1)*multiplier;
		});
		if( this._table )
			this._table.renderRows();
	}
	load()
	{
		//this.tws.investors( this.cik ).then( (investors)=>{ this.investors.push( new Investor(...investors.values, investors.companies) );} );
		//var f = /*this.cik ? ()=>this.tws.investors( this.cik ) : ()=>;
		this.tws.investors( this.detail.contract.id ).then( (investors)=>
		{
			console.log( `investors.values=${investors.values.length}` );
			investors.values.forEach( (i)=>this.investors.push(new Investor(i, investors.companies)) );
			this.sortData( this.settings.sort );
			this.viewPromise = Promise.resolve( true );
		} );
	}

	@Input() set detail(x){ this._detail=x; } get detail(){ return this._detail; } private _detail:Results.IContractDetail;
	@Input() index:number;
	investors = new Array<Investor>();
	isActive:boolean;
	selection:Edgar.IInvestor|null|undefined;
	@Input() tabEvents:Observable<number>; private tabSubscription:Subscription;
	viewPromise:Promise<boolean>;
	displayedColumns:string[] = ["name","shares","marketValue","change", "pctOfPortfolio"];
	@ViewChild('mainTable',{static: false}) _table:MatTable<Edgar.IInvestor>;
	profile = new Settings<PageSettings>( PageSettings, "Investors", this.profileService );
	get settings(){ return this.profile.value; }
	get sort(){ return this.settings.sort; }
}

class PageSettings
{
	assign( value:PageSettings ){ this.sort = value.sort; this.showDeleted = value.showDeleted; }
	sort:Sort = {active: "marketValue", direction: "desc"};
	showDeleted:boolean = false;
}
class Investor
{
	constructor( proto:Edgar.IInvestor, companies:Edgar.ICompany[] )
	{
		this.cik=proto.cik; this.current=proto.current; this.endPeriod = proto.endPeriod; this.previous=proto.previous;
		this.name = companies.find( (x)=>x.cik==proto.cik )?.name;
	}
	get shares():number{return this._shares ?? (this._shares=this.current.reduce( (sum, i) => sum + i.table.shares, 0 ));}; _shares:number|undefined;
	get sharesPrev():number{return this._sharesPrev ?? (this._sharesPrev=this.previous.reduce( (sum, i) => sum + i.table.shares, 0 ));}; _sharesPrev:number|undefined;
	get marketValue():number{return this._marketValue ?? (this._marketValue=this.current.reduce( (sum, i) => sum + i.table.value, 0 ));}; _marketValue:number|undefined;
	get pctOfPortfolio():number{return this._pctOfPortfolio ?? (this._pctOfPortfolio=this.current.reduce( (sum, i) => sum + i.percent, 0 ));}; _pctOfPortfolio:number|undefined;
	cik: number;
	name:string;
	endPeriod:number;
	current: Edgar.IInvestment[];
	previous: Edgar.IInvestment[];
}