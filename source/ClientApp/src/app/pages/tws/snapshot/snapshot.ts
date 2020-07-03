import { Inject, Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostBinding, ChangeDetectorRef } from '@angular/core';
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
	previousSymbols:string[]=[];
	selectedIndex:number=0;
}

@Component( {selector: 'snapshot', styleUrls: ['snapshot.css'], templateUrl: './snapshot.html', styles: [`:host {'class': 'mat-drawer-container'}`]} )
export class SnapshotComponent implements OnInit, AfterViewInit
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
				setTimeout( ()=>//screws up the selected tab.
				{
/*					if( this.symbolTabs.selectedIndex != this.settings.selectedIndex )
						this.symbolTabs.selectedIndex = this.settings.selectedIndex;
					else
						this.symbolIndexChanged( this.settings.selectedIndex );
*/
				//	this.tabEvents.next( this.tabs ? this.tabs.selectedIndex : 0 );

					// this.symbolTabs.selectedIndex = this.settings.selectedIndex;
					// this.tabEvents.next( this.tabs ? this.tabs.selectedIndex : 0 );
				});
			},
			error: e =>{console.log(e)}
		});
	}

/*	symbolIndexChanged( index )
	{
		console.log( `symbolIndexChanged( ${index} )` );
		this.settings.selectedIndex = index;
		if( this.symbolTabIndex.value!=index )
			this.symbolTabIndex.setValue( index );
		this.settingsContainer.save();
		//this.profileService.put<Settings>( SnapshotComponent.profileKey, this.settings );
		this.setSymbol( this.previousSymbols[index] );
	}
	*/
	get previousSymbols()
	{
	    return this.settings.previousSymbols;
	} set previousSymbols(value)
	{
	    if( this.settings )
	        this.settings.previousSymbols = value;
	}
	//contractEvents = new Subject<TickEx>();

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
	settingsContainer:Settings<PageSettings> = new Settings<PageSettings>( PageSettings, "SnapshotComponent", this.profileService );
	get settings():PageSettings{ return this.settingsContainer ? this.settingsContainer.value : null; }


	@ViewChild( 'symbolTabs', {static: false} ) symbolTabs;
	//@ViewChild('optionTabs', {static: false} ) optionTabs;
	//@ViewChild(MatTabGroup) tabGroup: MatTabGroup;
	//symbolTabIndex = new FormControl(0);
}
