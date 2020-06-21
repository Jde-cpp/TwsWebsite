
export class Fundamentals
{
	constructor()
	{}
	set values(value:{ [k: string]: number } ){this._values=value;} private _values:{ [k: string]: number };
	get( key:string ):number|null{ return this._values ? this._values[key] : null; }
	get sharesOutstanding():number|null{ return this.marketCap/this.nPrice; }
	private get marketCap():number|null{ return this.get("MKTCAP")*1000000; };
	private get nPrice():number|null{ return this.get("NPRICE"); };
}
