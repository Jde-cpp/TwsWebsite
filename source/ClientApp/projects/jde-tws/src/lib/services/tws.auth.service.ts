import { Injectable } from '@angular/core';
import { IAuth } from 'jde-material-site';
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
	login( token )
	{
		this.tws.googleLogin( token );
	}
/*		init( button:HTMLElement ):void
	{
		this.googleInit( button );
	}

public googleInit( button:HTMLElement ):void
	{
		if( this.auth2 )
			return;
		gapi.load('auth2', () =>
		{
			debugger;
			//this.auth2 = gapi.auth2.init( googleOptions );
			this.auth2 = gapi.auth2.getAuthInstance();
			//for( let member in googleOptions )
			//	this.auth2[member] = googleOptions[member];

			if( button )
				this.attachSignin( button );
			else
				console.error("no login button");
		});
	 }
	 public attachSignin( button:HTMLElement )
	 {
		this.auth2.attachClickHandler( button, {},(googleUser) =>
		{
			debugger;
			let profile = googleUser.getBasicProfile();
			console.log( 'Token || ' + googleUser.getAuthResponse().id_token );
			console.log( 'ID: ' + profile.getId() );
			console.log( 'Name: ' + profile.getName() );
			console.log( 'Image URL: ' + profile.getImageUrl() );
			console.log( 'Email: ' + profile.getEmail() );
		},
		(error) =>
		{
			debugger;
			alert( JSON.stringify(error, undefined, 2) );
		});
	}
	public auth2: any;
	*/
}