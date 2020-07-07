import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TickEx } from 'src/app/services/tws/Tick';
import { TwsService } from 'src/app/services/tws/tws.service';
import * as IbResults from 'src/app/proto/results';
import Results = IbResults.Jde.Markets.Proto.Results;

export class Data
{
	details:Results.IContractDetails;
	tick:TickEx;
	isBuy:boolean;
	quantity: number;
	showStop: boolean;
}
@Component( {templateUrl: 'confirmation.html'} )  //, styleUrls:["confirmation.css"]
export class ConfirmationDialog
{
	constructor( public dialogRef:MatDialogRef<ConfirmationDialog>, @Inject(MAT_DIALOG_DATA) public data:Data, private twsService : TwsService )
	{
	}
}