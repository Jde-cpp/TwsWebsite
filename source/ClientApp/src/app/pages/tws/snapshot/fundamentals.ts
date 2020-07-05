
export class Fundamentals
{
	constructor( private values:{[k: string]: number} )
	{}
	//set values(value:{ [k: string]: number } ){this._values=value;} private _values:{ [k: string]: number };
	get( key:string ):number|null{ return this.values ? this.values[key] : null; }
	get sharesOutstanding():number|null{ return this.marketCap/this.nPrice; }
	private get marketCap():number|null{ return this.get("MKTCAP")*1000000; };
	private get nPrice():number|null{ return this.get("NPRICE"); };
}
