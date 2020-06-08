import {Component,EventEmitter,Input,Output} from '@angular/core';
import * as AppFromServer from '../../../proto/appFromServer';
import FromServer = AppFromServer.Jde.ApplicationServer.Web.FromServer;


@Component({ selector: 'severity-picker', templateUrl: './severity-picker.html' })
export class SeverityPickerComponent
{
	onSelectionChange( value:FromServer.ELogLevel )
	{
		if( this.level!=value )
		{
			this.level=value;
			this.levelChange.emit( value );
		}
	}
	@Input() level:FromServer.ELogLevel; @Output() levelChange = new EventEmitter<FromServer.ELogLevel>();
	@Input() isSelect:boolean=true;

	options:LogOption[]=[{name:'Trace',value:FromServer.ELogLevel.Trace},{name:'Debug',value:FromServer.ELogLevel.Debug}, {name:'Info',value:FromServer.ELogLevel.Information},{name:'Warning',value:FromServer.ELogLevel.Warning},{name:'Error',value:FromServer.ELogLevel.Error},{name:'Critical',value:FromServer.ELogLevel.Critical},{name:'None',value:FromServer.ELogLevel.None}];
}

interface LogOption
{
	name:string;
	value:FromServer.ELogLevel;
}
