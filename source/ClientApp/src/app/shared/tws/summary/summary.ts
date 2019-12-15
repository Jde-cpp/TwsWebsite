import {Component,EventEmitter,Input,Output} from '@angular/core';


@Component({selector: 'tws-summary', templateUrl: './summary.html', styleUrls:['./summary.css']})
export class SummaryComponent
{
	@Input() set data( value ){this._data=value ;} get data(){return this._data ? this._data : SummaryComponent.EmptyData;}_data:IData;
	get backgroundColor():string
	{ 
		const red = this.data.return_>1 ? 0 : 255;
		const green = this.data.return_>1 ? 255 : 0;
		const prefix = `rgba(${red},${green},0,`;
		return `linear-gradient(to right, ${prefix}.75) 0%,${prefix}1) 50%,${prefix}.75) 100%)`;
	}
	get borderColor():string{ return this.data.return_>0 ? "green" : "red"; }
	static EmptyData:IData = {count:0,positiveCount:0,negativeCount:0,gain:0,positiveGain:0,negativeGain:0,return_:0,isGain:true};
}

export interface IData
{
	count:number;
	positiveCount:number;
	negativeCount:number;
	gain:number;
	positiveGain:number;
	negativeGain:number;
	return_:number;
	isGain:boolean;
}