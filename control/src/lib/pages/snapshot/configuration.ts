import {Component, Inject} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {PageSettings} from './PageSettings'
import {SymbolSettings} from './snapshot-content'
import {Settings} from 'jde-framework'

export class ConfigurationData
{
	symbolSettings:Settings<SymbolSettings>;
	pageSettings:Settings<PageSettings>;
}
@Component( {templateUrl: 'configuration.html'} )
export class ConfigurationDialog
{
	constructor( public dialogRef:MatDialogRef<ConfigurationDialog>, @Inject(MAT_DIALOG_DATA) public data:ConfigurationData )
	{
		this.delay = new FormControl( data.pageSettings.value.delay );
		this.shortInterest = new FormControl( data.symbolSettings.value.shortInterest );
		this.shortInterest = new FormControl( data.symbolSettings.value.shortInterestDate );
	}
	submit()
	{
		this.data.pageSettings.value.delay = this.delay.value;
		this.data.pageSettings.save();

		this.data.symbolSettings.value.shortInterest = this.shortInterest.value;
		this.data.symbolSettings.value.shortInterestDate = this.shortInterest.value;
		this.data.symbolSettings.save();
		this.dialogRef.close( null );
	}
	onCancelClick()
	{
		this.dialogRef.close( null );
	}
	delay:FormControl;
	shortInterest:FormControl;
	date:FormControl;
	submitting=false;
}
