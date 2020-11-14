import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Params} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as myBlockly2 from 'src/app/proto/blockly'; import Proto = myBlockly2.Jde.Blockly.Proto;
import { BlocklyService } from 'src/app/services/blockly/blockly.service';



 @Component( {selector: 'blockly-nav', templateUrl: './blockly-nav.html', animations: [ trigger('bodyExpansion', [state('collapsed', style({height: '0px', display: 'none'})), state('expanded', style({height: '*', display: 'block'})), transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)'))])] })
 export class BlocklyNav implements OnInit, OnDestroy
 {
	constructor( private blockly: BlocklyService, private cdr: ChangeDetectorRef )
	{}
	ngOnInit()
	{
		this.blockly.loadAll().then( (functions)=>
		{
			this.functions=functions;
			const observable = this.blockly.subscribe();
			var child = observable.subscribe( x =>
			{
				this.functions = x;
				//this.cdr.detectChanges();
			});
			this.subscriptions.add( child );

			this.viewPromise = Promise.resolve(true);
		} );
	}
	ngOnDestroy(){ this.subscriptions.unsubscribe(); }
	@Input() set params(x)
	{
		this._params=x;
		//x.subscribe( {next: (z)=>console.log(z.section)} );
	} get params(){return this._params;} private _params: Observable<Params>;
	currentItemId: string;
	functions:Proto.IFunctions;
	viewPromise:Promise<boolean>;
	private subscriptions = new Subscription();
}
