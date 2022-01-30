import { Inject, Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostBinding, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { TwsService } from '../../services/tws.service';
import { IProfile, IErrorService, Settings } from 'jde-framework';
import { ComponentPageTitle } from 'jde-material';

import {PageSettings} from './PageSettings'

import * as IbResults from 'jde-cpp/results'; import Results = IbResults.Jde.Markets.Proto.Results;

@Component( {selector: 'snapshot.main-content.mat-drawer-container', styleUrls: ['snapshot.css'], templateUrl: './snapshot.html'} )
export class SnapshotComponent implements OnInit, AfterViewInit, OnDestroy
{
	constructor( private tws:TwsService, private componentPageTitle:ComponentPageTitle, private change: ChangeDetectorRef, private element : ElementRef, private snackBar: MatSnackBar, @Inject('IProfile') private profileService: IProfile, @Inject('IErrorService') private cnsle: IErrorService )
	{}

	ngOnInit():void
	{
	}
	async ngAfterViewInit()
	{
		await this.profile.loadedPromise;
		//console.log( `selectedContractId=${JSON.stringify(this.profile.value.selectedContractId)}` );
		this.selected.valueChanges.subscribe( index=>
		{
			var id = this.previousContractIds[index];//13977=xom, 51529211=GLD, 76792991=tsla, 756733=spy, 5794=clx
			if( this.settings.selectedContractId != id )
			{
				console.log( `SaveProfile - index=${index}, contractId=${id}, previous=${this.settings.selectedContractId}` );
				this.settings.selectedContractId = id;
				this.profile.save();
			}
		});
		try
		{
			const results = await this.tws.reqIds( this.previousContractIds );
			this.details = [];
			for( const id of this.previousContractIds )
			{
				const details = results.find( (x)=>x.length>0 && x[0].contract.id==id );
				if( details.length==1 )
					this.details.push( details[0] );
				else if( details.length!=1 )
					console.error( `{details.detail[0].contract.symbol} has {details.detail.length} contracts` );
			}
			const index = this.settings.selectedContractId ? this.previousContractIds.indexOf(this.settings.selectedContractId) : 0;
			console.log( `selected - index=${index}, contractId='${this.settings.selectedContractId}' ids=${this.previousContractIds}` );
			this.selected.setValue( index );
			this.componentPageTitle.title = this.details[index].contract.symbol;
			this.viewPromise = Promise.resolve( true );
		}
		catch( e )
		{
			this.cnsle.error( "Could not connect", e );
		}
	}
	ngOnDestroy()
	{
		//console.log( `selected=${this.previousContractIds[this.selected.value]} settings=${this.settings.selectedContractId}` );
		console.log( `save profile - contract=${this.settings.selectedContractId}` );
		this.profile.save();
	}
	onSymbol( detail:Results.IContractDetail )
	{
		let index = this.previousContractIds.indexOf( detail.contract.id );
		if( index==-1 )
		{
			this.details.unshift( detail );
			this.previousContractIds.unshift( detail.contract.id );
			this.selected.setValue( 0 );
			console.log( `save profile - contract=${this.settings.selectedContractId}` );
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
	//profile2:Settings<PageSettings> = new Settings<PageSettings>( PageSettings, "SnapshotComponent", this.profileService );
	get profile(){return this.#profile || (this.#profile=new Settings<PageSettings>(PageSettings, "SnapshotComponent", this.profileService));} #profile:Settings<PageSettings>;
	get settings():PageSettings{ return this.profile.value; }


	@ViewChild( 'symbolTabs', {static: false} ) symbolTabs;
	//@ViewChild('optionTabs', {static: false} ) optionTabs;
	//@ViewChild(MatTabGroup) tabGroup: MatTabGroup;
	viewPromise:Promise<boolean>;
}
