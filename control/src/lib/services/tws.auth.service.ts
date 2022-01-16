import { Injectable } from '@angular/core';
import { IAuth } from 'jde-material';
import { TwsService } from './tws.service';

@Injectable()
export class TwsAuthService implements IAuth
{
	constructor( private tws: TwsService )
	{}

	enabled():boolean{ return true; }

	login( token?:string ):Promise<void>
	{
		let p:Promise<void>;
		if( this.enabled && !this.loggedIn )
		{
			p = new Promise<void>( (resolve, reject)=>
			{
				this.#promises.push( [resolve,reject] );
			} );
			if( this.#promises.length==1 )
			{
				this.tws.googleLogin( token ).then( ()=>
				{
					for( var promise of this.#promises )
						promise[0]();
				}).catch( (e)=>
				{
					for( var promise of this.#promises )
						promise[1]( e );
				} );
			}
			return p ?? Promise.resolve();
		}
		return this.enabled || this.loggedIn  ? Promise.resolve() :  new Promise<void>( async (resolve, reject)=>
		{
			try
			{
				await this.tws.googleLogin( token );
				this.#loggedIn=true;
				console.log("googleLogin returned success.");
				resolve();
			}
			catch( e )
			{
				reject( e );
			}
		} );
	}
	get loggedIn(){return this.#loggedIn;} #loggedIn=false;
	idToken:string;
	#promises:[()=>void,(x:any)=>void][]=[];
}