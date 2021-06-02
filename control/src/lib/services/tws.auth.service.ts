import { Injectable } from '@angular/core';
import { IAuth } from 'jde-material';
import { Observable, Subject } from 'rxjs';
import { TwsService } from './tws.service';
//declare var require: any;
//var googleOptions = require('dist/jde-tws-assets/src/assets/google-auth.json');
declare const gapi: any;
@Injectable()
export class TwsAuthService implements IAuth
{
	constructor( private tws: TwsService )
	{}

	enabled():boolean{ return true; }
	subscribe():Observable<void>{ return this.subject.asObservable(); };
	login( token )
	{
		this.tws.googleLogin( token ).then( ()=> {this._loggedIn=true; console.log("googleLogin returned success."); this.subject.next();} ).catch( (e)=>{this._loggedIn=false; this.subject.error(e);} );
	}
	get loggedIn(){return this._loggedIn;} private _loggedIn=false;
	private subject = new Subject<void>();
}