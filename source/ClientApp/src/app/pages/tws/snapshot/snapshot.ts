import { Inject, Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostBinding, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTabGroup} from '@angular/material/tabs';
import { Subject } from 'rxjs';
//import { TwsService, Bar } from 'src/app/services/tws/tws.service';
import { IProfile } from 'src/app/services/profile/IProfile';
import {IErrorService} from 'src/app/services/error/IErrorService'
import { MarketUtilities } from 'src/app/utilities/marketUtilities';
import {Settings, IAssignable} from 'src/app/utilities/settings'

import { NgAnalyzeModulesHost } from '@angular/compiler';
//import * as Highcharts from 'highcharts';


class PageSettings implements IAssignable<PageSettings>
{
	assign( value:PageSettings )
	{
		this.previousSymbols.length=0;
		for( const i of value.previousSymbols )
			this.previousSymbols.push( i );
		this.selectedIndex = value.selectedIndex;
	}
	previousSymbols:string[]=["SPY"];
	selectedIndex:number=0;
}

@Component( {selector: 'snapshot', styleUrls: ['snapshot.css'], templateUrl: './snapshot.html', styles: [`:host {'class': 'mat-drawer-container'}`]} )
export class SnapshotComponent implements OnInit, AfterViewInit, OnDestroy
{
	@HostBinding('class.mat-drawer-container') public highlighted: boolean = true;
	constructor( private change: ChangeDetectorRef, private element : ElementRef, private snackBar: MatSnackBar, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{
		//console.log( 'SnapshotComponent::SnapshotComponent' );
//		throw 'SnapshotComponent::SnapshotComponent';
	}

	ngOnInit():void
	{}
	ngAfterViewInit():void
	{
		this.settingsContainer.load().subscribe(
		{
			complete: ()=>
			{
				if( this.settings.selectedIndex!=0 )
				{
					const symbol = this.settings.previousSymbols[this.settings.selectedIndex];
					this.previousSymbols.splice( this.settings.selectedIndex, 1 );
					this.previousSymbols.unshift( symbol );
					this.settings.selectedIndex = 0;
					this.settingsContainer.save();
				}
				//this.previousSymbols[0] = "SHOP";
				//this.settingsContainer.save();
				if( this.symbolTabs.selectedIndex != this.settings.selectedIndex )
					this.symbolTabs.selectedIndex = this.settings.selectedIndex;
				setTimeout( ()=>{});//screws up the selected tab.
			},
			error: e =>{console.log(e)}
		});
	}
	ngOnDestroy()
	{
		this.settings.selectedIndex = this.selected.value;
		this.settingsContainer.save();
	}
	onIndexChange(newIndex)
	{
		this.settings.selectedIndex = newIndex;
	}
	onSymbol( symbol:string )
	{
		console.log( symbol );
		let index = this.previousSymbols.indexOf( symbol );
		if( index==-1 )
		{
			this.previousSymbols.unshift( symbol );
			this.selected.setValue( 0 );
			if( this.symbolTabs.selectedIndex )
				this.symbolTabs.selectedIndex = 0;
		}
		//this.tabEvents.next( index );
		// console.log( `symbolIndexChanged( ${index} )` );
		// this.settings.selectedIndex = index;
		// if( this.symbolTabIndex.value!=index )
		// 	this.symbolTabIndex.setValue( index );
		// this.settingsContainer.save();
		// //this.profileService.put<Settings>( SnapshotComponent.profileKey, this.settings );
		// this.setSymbol( this.previousSymbols[index] );
	}
	get previousSymbols(){ return this.settings.previousSymbols;}
	// } set previousSymbols(value)
	// {
	//     if( this.settings )
	//         this.settings.previousSymbols = value;
	// }
	//tabEvents = new Subject<boolean>();

/*	get barSettings(){ return this.symbolSettings.barSettings; } set barSettings( value:IBarSettings )
	{
		this.symbolSettings.barSettings = value;
		this.profileService.put<SymbolSettings>( `${SnapshotComponent.profileKey}.${this.symbol}`, this.symbolSettings );
	}*/
/*	get previousSettings(){ return this.symbolSettings.previousSettings; } set previousSettings( value:ITradeResultSettings )
	{
		this.symbolSettings.previousSettings = value;
		this.profileService.put<SymbolSettings>( `${SnapshotComponent.profileKey}.${this.symbol}`, this.symbolSettings );
	}*/
//	get treeSettings(){ return this.symbolSettings.treeSettings; } set treeSettings( value:ITreeSettings ){this.symbolSettings.treeSettings = value;this.profileService.put<SymbolSettings>( `${SnapshotComponent.profileKey}.${this.symbol}`, this.symbolSettings );}
	selected = new FormControl(0);
	settingsContainer:Settings<PageSettings> = new Settings<PageSettings>( PageSettings, "SnapshotComponent", this.profileService );
	get settings():PageSettings{ return this.settingsContainer ? this.settingsContainer.value : null; }


	@ViewChild( 'symbolTabs', {static: false} ) symbolTabs;
	//@ViewChild('optionTabs', {static: false} ) optionTabs;
	//@ViewChild(MatTabGroup) tabGroup: MatTabGroup;
	//symbolTabIndex = new FormControl(0);
}
