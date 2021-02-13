import {Component, Inject, OnDestroy} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGraphQL } from 'jde-framework';
import {IUser} from '../users'

@Component( { templateUrl: 'user-dialog.html'} )
export class UserEntryDialog implements OnDestroy
{
	constructor( public dialogRef:MatDialogRef<UserEntryDialog>, @Inject('IGraphQL') private graphQL: IGraphQL, @Inject(MAT_DIALOG_DATA) public data:{user:IUser,authenticators:Map<number,string>} )
	{
		this.authenticators = data.authenticators;
		//this.user = { ...data.user };
		this.user = data.user ? { ...data.user } : { id:0, name:"", target:"", authenticatorId:this.authenticators[0], attributes:0, created:new Date() };
	}

	ngOnDestroy()
	{}
	onCancelClick = ()=>this.dialogRef.close( null );
	onSubmitClick():void
	{
		const update = this.data.user!=null;
		let idString = update ? `"id":${this.data.user.id},` : "";
		let output = update ? "" : "{id}";
		let cmd = update ? "update" : "create";
		let input:any = update ? {} : {...this.user};
		if( update )
		{
			for( var m in this.user )
			{
				if( m!='id' && this.user[m]!=this.data.user[m] )
					input[m] = this.user[m];
			}
		}
		else
			input.id = undefined;

		if( Object.keys(input).length )
		{
			var ql = `{ mutation { ${cmd}User( ${idString} "input": ${JSON.stringify(input)} )${output} } }`;
			this.graphQL.query( ql ).then( ()=>this.dialogRef.close(this.user) ).catch( (e)=>console.log(e.toString()) ).finally( ()=>this.saving=false );
		}
		else
			this.dialogRef.close( null );

	}
	get description(){ return this.user.id ? `Edit ${this.user.name}` : `Create ${this.user.name ?? "user"}` };

	user:IUser;
	authenticators:Map<number,string>
	saving:false;
}