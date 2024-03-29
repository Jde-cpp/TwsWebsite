import {IAssignable} from 'jde-framework';

export class PageSettings implements IAssignable<PageSettings>
{
	assign( value:PageSettings )
	{
		this.previousContractIds.length=0;
		for( const i of value.previousContractIds )
			this.previousContractIds.push( i );
		this.selectedContractId = value.selectedContractId;
		this.delay = value.delay;
	}
	previousContractIds:number[]=[756733];
	selectedContractId:number=0;
	delay:number=0;
}
