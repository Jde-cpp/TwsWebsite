import {Component,NgModule,NgZone,OnDestroy,OnInit,ViewChild,ViewEncapsulation} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {ActivatedRoute, Params, RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ComponentHeaderModule} from 'src/app/pages/material-site/component-page-header/component-page-header';
import {FooterModule} from 'src/app/shared/material-site/footer/footer';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {BreakpointObserver} from '@angular/cdk/layout';
import { BlocklyCategoryList, BlocklyCategoryListModule } from '../category-list/blockly-category-list';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SvgViewerModule} from 'src/app/shared/material-site/svg-viewer/svg-viewer';
import {MatDrawerToggleResult} from '@angular/material/sidenav/drawer';
import {MatListModule} from '@angular/material/list';
import {NavigationFocusModule} from 'src/app/shared/material-site/navigation-focus/navigation-focus';
import {NavigationFocusService} from 'src/app/shared/material-site/navigation-focus/navigation-focus.service';
import { BlocklyViewerComponent } from '../../viewer/blockly-viewer';
import { ComponentPageTitle } from 'src/app/pages/material-site/page-title/page-title';
import * as myBlockly2 from 'src/app/proto/blockly'; import Proto = myBlockly2.Jde.Blockly.Proto;
import { BlocklyService } from 'src/app/services/blockly/blockly.service';
import { BlocklyNav } from '../nav/blockly-nav';
import {BlocklyEditDialog} from '../category-list/edit-dialog/blockly-edit-dialog'
 // These constants are used by the ComponentSidenav for orchestrating the MatSidenav in a responsive
 // way. This includes hiding the sidenav, defaulting it to open, changing the mode from over to
 // side, determining the size of the top gap, and whether the sidenav is fixed in the viewport.
 // The values were determined through the combination of Material Design breakpoints and careful
 // testing of the application across a range of common device widths (360px+).
 // These breakpoint values need to stay in sync with the related Sass variables in
 // src/styles/_constants.scss.
 const EXTRA_SMALL_WIDTH_BREAKPOINT = 720;
 const SMALL_WIDTH_BREAKPOINT = 939;

 /*let DocItems =
 {
	 getItems( section:string ): DocItem[]{ return this.values; },
	 getItemById( id: string, section: string): DocItem | undefined{ console.error("item==null"); return null; },
	 values: [  {id: '_add', name: 'add', summary: 'Add new function.', packageName: 'blockly', examples: []} ]
 };*/

 @Component({ selector: 'blockly-sidenav', templateUrl: './blockly-sidenav.html', styleUrls: ['./blockly-sidenav.scss'], encapsulation: ViewEncapsulation.None} )
 export class BlocklySidenav implements OnInit, OnDestroy
 {
	constructor( private _route: ActivatedRoute, private componentPageTitle:ComponentPageTitle, private _navigationFocusService: NavigationFocusService, zone: NgZone, breakpoints: BreakpointObserver, private blockly: BlocklyService )
	{
	  this.isExtraScreenSmall = breakpoints.observe(`(max-width: ${EXTRA_SMALL_WIDTH_BREAKPOINT}px)`).pipe( map(breakpoint => breakpoint.matches) );
	  this.isScreenSmall = breakpoints.observe( `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)` ).pipe( map(breakpoint => breakpoint.matches) );
	  this.componentPageTitle.title = "Blockly";
	}

	ngOnInit()
	{
		//this.blockly.loadAll().then( (functions)=>{this.functions=functions; this.viewPromise = Promise.resolve(true);} );

		this.params = combineLatest( this._route.pathFromRoot.map(route => route.params), Object.assign );
	  	this.subscriptions.add( this._navigationFocusService.navigationEndEvents.pipe(map(() => this.isScreenSmall)).subscribe((shouldCloseSideNav) =>
		{
			if( shouldCloseSideNav && this.sidenav )
				this.sidenav.close();
		}));
	}

	ngOnDestroy(){ this.subscriptions.unsubscribe(); }
	toggleSidenav(sidenav: MatSidenav): Promise<MatDrawerToggleResult> { return sidenav.toggle(); }

	//functions:Proto.IFunctions;
	params: Observable<Params>;
	isExtraScreenSmall: Observable<boolean>;
	isScreenSmall: Observable<boolean>;
	@ViewChild(MatSidenav) sidenav: MatSidenav;
	private subscriptions = new Subscription();
//	viewPromise:Promise<boolean>;
}
const routes: Routes =
[{
	path : '',
	component : BlocklySidenav,
	children : [
		{path : '', redirectTo : 'categories', pathMatch : 'full'},
		{path : 'component/:id', redirectTo : ':id', pathMatch : 'full'},
		{path : 'category/:id', redirectTo : '/categories/:id', pathMatch : 'full'},
		{
			path : 'categories',
			children : [{path : '', component: BlocklyCategoryList}],
		},
		{
			path : ':id',
			component : BlocklyViewerComponent/*,
		 	children : [
				 {path : '', redirectTo : 'overview', pathMatch : 'full'},
				 {path : 'overview', component : ComponentOverview, pathMatch : 'full'},
				 {path : 'api', component : ComponentApi, pathMatch : 'full'},
				 {path : 'examples', component : ComponentExamples, pathMatch : 'full'},
				 {path : '**', redirectTo : 'overview'},
			 ],*/
		 }
	 ]
 }];
 @NgModule({
	imports: [MatSidenavModule,MatListModule,RouterModule,CommonModule,BlocklyCategoryListModule,ComponentHeaderModule,FooterModule,FormsModule,HttpClientModule,CdkAccordionModule,MatCheckboxModule,MatDialogModule,MatFormFieldModule,MatIconModule,MatInputModule,MatSidenavModule,SvgViewerModule,RouterModule.forChild( routes ),NavigationFocusModule],
	exports: [BlocklySidenav],
	declarations: [BlocklySidenav, BlocklyNav, BlocklyEditDialog],
	entryComponents: [BlocklyEditDialog],
	providers: [],
 })
 export class BlocklySidenavModule {}
