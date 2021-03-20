import { Inject, Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostBinding, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { TwsService } from '../../services/tws.service';
import { IProfile } from 'jde-framework';
import {IErrorService} from 'jde-framework'
import {Settings, IAssignable} from 'jde-framework'

import * as IbResults from 'jde-cpp/results';
import Results = IbResults.Jde.Markets.Proto.Results;

export class PageSettings implements IAssignable<PageSettings>
{
	assign( value:PageSettings )
	{
		this.previousContractIds.length=0;
		for( const i of value.previousContractIds )
			this.previousContractIds.push( i );
	//	this.selectedIndex = value.selectedIndex;
		this.delay = value.delay;
	}
	previousContractIds:number[]=[756733];
	selectedIndex:number=0;
	delay:number=0;
}

@Component( {selector: 'snapshot', styleUrls: ['snapshot.css'], templateUrl: './snapshot.html', styles: [`:host {'class': 'mat-drawer-container'}`]} )
export class SnapshotComponent implements OnInit, AfterViewInit, OnDestroy
{
	@HostBinding('class.mat-drawer-container') public highlighted: boolean = true;
	constructor( private tws:TwsService, private change: ChangeDetectorRef, private element : ElementRef, private snackBar: MatSnackBar, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{
		//console.log( 'SnapshotComponent::SnapshotComponent' );
//		throw 'SnapshotComponent::SnapshotComponent';
	}

	ngOnInit():void
	{}
	ngAfterViewInit():void
	{
		this.profile.loadedPromise.then( ()=>
		{
			//this.settings.previousContractIds = [756733];
			this.tws.reqIds( this.previousContractIds ).then( (results)=>
			{
				//results.map( details=> details.detail.length==1 ? holding.marketValuePrevious ).reduce( (total,mv)=>total+(mv || 0), 0 );
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
				this.viewPromise = Promise.resolve(true);
			});
		});
		this.selected.valueChanges.subscribe( value=>
		{
			/*if( this.settings.selectedIndex != value )
			{
			    this.settings.selectedIndex = value;
			    this.profile.save();
			}*/
		});
	}
	ngOnDestroy()
	{
		this.settings.selectedIndex = this.selected.value;
		this.profile.save();
	}
	onSymbol( detail:Results.IContractDetail )
	{
		//console.log( contractId );
		let index = this.previousContractIds.indexOf( detail.contract.id );
		if( index==-1 )
		{
			this.details.unshift( detail );
			this.previousContractIds.unshift( detail.contract.id );
			this.selected.setValue( 0 );
			this.profile.save();
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
	profile:Settings<PageSettings> = new Settings<PageSettings>( PageSettings, "SnapshotComponent", this.profileService );
	get settings():PageSettings{ return this.profile ? this.profile.value : null; }


	@ViewChild( 'symbolTabs', {static: false} ) symbolTabs;
	//@ViewChild('optionTabs', {static: false} ) optionTabs;
	//@ViewChild(MatTabGroup) tabGroup: MatTabGroup;
	viewPromise:Promise<boolean>;
}
