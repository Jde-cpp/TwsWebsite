import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import { ComponentPageTitle } from 'src/app/pages/material-site/page-title/page-title';
import {SvgViewerModule} from 'src/app/shared/material-site/svg-viewer/svg-viewer';
import {Observable, combineLatest, Subscription} from 'rxjs';
import {NavigationFocusModule} from 'src/app/shared/material-site/navigation-focus/navigation-focus';
import { BlocklyEditDialog } from './edit-dialog/blockly-edit-dialog';
import * as myBlockly2 from 'src/app/proto/blockly'; import Proto = myBlockly2.Jde.Blockly.Proto;
import { BlocklyService } from 'src/app/services/blockly/blockly.service';

// let DocItems =
// {
// 	getItems( section:string ): DocItem[]{ return this.values; },
// 	getItemById( id: string, section: string): DocItem | undefined{ console.error("item==null"); return null; },
// 	values: [  {id: '_add', name: 'add', summary: 'Add new function.', packageName: 'blockly', examples: []} ]
// };


@Component({ selector: 'blockly-category-list', templateUrl: './blockly-category-list.html', styleUrls: ['./blockly-category-list.scss'] })
export class BlocklyCategoryList implements OnInit, OnDestroy
{
	constructor( public _blocklyPageTitle: ComponentPageTitle, private _route: ActivatedRoute, private blockly: BlocklyService, private dialog : MatDialog, private router:Router )
	{
		console.log( "BlocklyCategoryList" );
	}

	ngOnInit()
	{
		this.blockly.loadAll().then( (functions)=>{this.functions=functions; this.viewPromise = Promise.resolve(true);} );
		// this.params = combineLatest( this._route.pathFromRoot.map(route => route.params), Object.assign );
		// this.routeParamSubscription = this.params.subscribe(params =>
		// {
		// 	const sectionName = params['section'];
		// 	//const section = SECTIONS[sectionName];
		// 	this._blocklyPageTitle.title = "Blockly";
		// 	this.categoryListSummary = "Blockly Routines";
		// });
  	}

  	ngOnDestroy()
  	{
    	// if (this.routeParamSubscription)
      // 	this.routeParamSubscription.unsubscribe();
	}
	showDialog( fnctn:Proto.IFunction )
	{
		const edit = fnctn.id?.length>0;
		const dialogRef = this.dialog.open( BlocklyEditDialog,
		{
			width: '500px',
			height: '350px',
			data: fnctn
		});
		dialogRef.afterClosed().subscribe( result =>
		{
			const index = this.functions.functions.findIndex( (x)=>x.name.toLowerCase()==result.name.toLowerCase() );
			if( result && result.name?.length && ((edit && index>-1) || (!edit && index==-1)) )
			{
				result.id = result.name.replace(/\s+/g, '-').toLowerCase();
				this.blockly.save( result ).then( ()=>
				{
					if( !edit )
						this.router.navigate( [`/blockly/${result.id}`] );
					else
						console.log( `saved function properties ${result.name}.` );
					//navigate, setup side view, make sure properties & delete (with confirmation) works

				});
				console.log( result );
			}
		});
	}
	add()
	{
		this.showDialog( {} );
		//no xml :(
	}
	edit( fnctn:Proto.IFunction )
	{
		this.showDialog( fnctn );
	}
	delete( fnctn:Proto.IFunction )
	{
		this.blockly.delete( fnctn.id );
	}
	functions:Proto.IFunctions;
	//params: Observable<Params>;
	//routeParamSubscription: Subscription;
	categoryListSummary = "Blockly Routines";
	viewPromise:Promise<boolean>;
}

@NgModule({
  imports: [CommonModule, SvgViewerModule, MatButtonModule, MatCardModule, MatDialogModule,MatFormFieldModule, MatIconModule, MatInputModule, RouterModule, NavigationFocusModule],
  exports: [BlocklyCategoryList],
  declarations: [BlocklyCategoryList],
  providers: [],
})
export class BlocklyCategoryListModule { }
