import { IProfile } from 'src/app/services/profile/IProfile';
import { Subject, Observable } from 'rxjs';

export interface IAssignable<TUnderlying>
{
	assign( other:TUnderlying );
}
export class Settings<TUnderlying extends IAssignable<TUnderlying>>
{
	constructor( private type: new()=>TUnderlying, private key:string, private profile:IProfile  )
	{
		this.value = new this.type;
	}
	load():Observable<TUnderlying>
	{
		var callback = new Subject<TUnderlying>();
		this.profile.get<TUnderlying>( this.key ).subscribe(
		{
			next: value=>
			{
				if( value )
				{
					this.value.assign( value );
					if( !this.original )
						this.original = new this.type;
					this.original.assign( value );
				}
				else
					this.original = null;
				callback.complete();
			},
			error: e=>{ console.error( e ); callback.error( e ); }
		});
		return callback;
	}
	reset( suffix:string )
	{
		this.value = new this.type;
		const index = this.key.lastIndexOf( '.' );
		if( index!=-1 )
			this.key = `${this.key.substr(0,index)}.${suffix}`;
	}
	save()
	{
		const settings = JSON.stringify( this.value );
		const originalSettings = this.original ? JSON.stringify( this.original ) : this.defaultJson;
		const isDefault = settings==this.defaultJson;
		if( originalSettings!=settings )
		{
			this.profile.putJson( this.key, isDefault ? null : settings );
			if( !this.original )
				this.original = new this.type;
			else if( isDefault )
				this.original = null;
			if( this.original )
				this.original.assign( this.value );
		}
		else if( isDefault )
			this.original = null;
	}
	get value(){return this._value;} set value(value)
	{
		this._value=value;
	} private _value:TUnderlying;
	get defaultJson():string{ return this._defaultJson || (this._defaultJson=JSON.stringify(new this.type));} _defaultJson:string;
	private get original(){ return this._original;} private set original(value)
	{
		this._original=value;
	} _original:TUnderlying;
}