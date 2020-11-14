import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as myBlockly2 from 'src/app/proto/blockly'; import Proto = myBlockly2.Jde.Blockly.Proto;


import * as ib2 from 'src/app/proto/ib';
import IB = ib2.Jde.Markets.Proto;

@Component( { templateUrl: 'blockly-edit-dialog.html', styleUrls:["blockly-edit-dialog.scss"]} )
export class BlocklyEditDialog
{
	constructor( public dialogRef:MatDialogRef<BlocklyEditDialog>, @Inject(MAT_DIALOG_DATA) public item:Proto.IFunction )
	{
		this._title = item.id ? `Edit Function '${item.name}'` : 'Add new function';
	}
	onCancelClick(): void{ this.dialogRef.close(null); }
	onSaveClick():void{ this.dialogRef.close(this.item); }

	get title(){ return this._title} _title:string;
}