import { Inject, Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostBinding, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

//import { TwsService } from '../../services/tws.service';
import { TwsService } from '../../services/tws.service';
import { IProfile } from 'jde-framework';
import {IErrorService} from 'jde-framework'
import {Settings} from 'jde-framework'
import {PageSettings} from './PageSettings'

import * as IbResults from 'jde-cpp/results';
import Results = IbResults.Jde.Markets.Proto.Results;

@Component( {selector: 'snapshot.main-content.mat-drawer-container', styleUrls: ['snapshot.css'], templateUrl: './snapshot.html'} )
export class SnapshotComponent implements OnInit, AfterViewInit, OnDestroy
{
	constructor( private tws:TwsService, private change: ChangeDetectorRef, private element : ElementRef, private snackBar: MatSnackBar, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnInit():void
	{}
	ngAfterViewInit():void
	{
		this.profile2.loadedPromise.then( ()=>
		{
			this.tws.reqIds( this.previousContractIds ).then( (results)=>
			{
				this.details = [];
				for( var details of results )
				{
					if( details.length==1 )
						this.details.push( details[0] );
					else if( details.length>1 )
						console.error( `{details.detail[0].contract.symbol} has {details.detail.length} contracts` );
					else
						console.error( `contract returned zero contracts.` );
				}
				this.selected.setValue( this.settings.selectedIndex );
				this.viewPromise = Promise.resolve( true );
			}).catch( e=>this.cnsle.error("Could not connect", e) );
		});
		this.selected.valueChanges.subscribe( value=>
		{
			if( this.settings.selectedIndex != value )
			{
			    this.settings.selectedIndex = value;
			    this.profile2.save();
			}
		});
	}
	ngOnDestroy()
	{
		this.settings.selectedIndex = this.selected.value;
		this.profile2.save();
	}
	onSymbol( detail:Results.IContractDetail )
	{
		let index = this.previousContractIds.indexOf( detail.contract.id );
		if( index==-1 )
		{
			this.details.unshift( detail );
			this.previousContractIds.unshift( detail.contract.id );
			this.selected.setValue( 0 );
			this.profile2.save();
			setTimeout( ()=> this.symbolTabs.selectedIndex = 0, 0 );
		}
		//this.tabEvents.next( index );
		// console.log( `symbolIndexChanged( ${index} )` );
		// this.settings.selectedIndex = index;
		// if( this.symbolTabIndex.value!=index )
		// 	this.symbolTabIndex.setValue( index );
		// this.profile.save();
		// //this.profileService.put<Settings>( SnapshotComponent.profileKey, this.settings );
		// this.setSymbol( this.previousSymbols[index] );
	}
	onTabChange( e )
	{
		this.selected.setValue( e );
	}
	get previousContractIds(){ return this.settings.previousContractIds; }
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
	details:Results.IContractDetail[];
	selected = new FormControl(0);
	get selectedIndex(){ return this.selected.value; }
	profile2:Settings<PageSettings> = new Settings<PageSettings>( PageSettings, "SnapshotComponent", this.profileService );
	get settings():PageSettings{ return this.profile2 ? this.profile2.value : null; }


	@ViewChild( 'symbolTabs', {static: false} ) symbolTabs;
	//@ViewChild('optionTabs', {static: false} ) optionTabs;
	//@ViewChild(MatTabGroup) tabGroup: MatTabGroup;
	viewPromise:Promise<boolean>;
}