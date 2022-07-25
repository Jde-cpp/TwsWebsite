import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';

import {ComponentHeaderModule} from 'jde-material';
import {NavBarModule} from 'jde-material';
import {ThemePickerModule} from 'jde-material';
import {StyleManager} from 'jde-material';

import{ Applications } from 'jde-framework';
import{ LogsComponent } from 'jde-framework';
import{ GraphQLComponent } from 'jde-framework';
import{ GraphQLDetailComponent } from 'jde-framework';

import {BlocklyViewerComponent} from 'jde-blockly';
import {BlocklyCategoryList} from 'jde-blockly';
import {BlocklySidenav} from 'jde-blockly'

import { AppComponent } from './app.component';

import {TwsService} from 'jde-tws';
import {OrderComponent} from 'jde-tws';
import {PortfolioComponent} from 'jde-tws';
import { WatchComponent } from 'jde-tws';
import { WatchSettings } from 'jde-tws';
import {TradeComponent} from 'jde-tws'

import {LocalStorageProfile} from 'jde-framework'
import {DefaultErrorService } from 'jde-framework'

import {CanActivateComponentSidenav} from 'jde-material';
import {ThemeStorage} from 'jde-material';
import { ComponentCategoryList } from 'jde-material';
import { ComponentSidenav } from 'jde-material';
import { DisabledAuthService } from 'jde-material';

import { SnapshotComponent } from 'jde-tws';

const routes: Routes =
[
	{ path: '', component: SnapshotComponent, pathMatch: 'full', data: {} },
	{ path: 'portfolio', component: PortfolioComponent },
	{ path: 'snapshot', component: SnapshotComponent },
	{ path: 'trades', component: TradeComponent },
	{ path: 'orders', component: OrderComponent },
	{
		path: 'watch/:id/settings',
		component: WatchSettings,
	},
	{
		path: 'watch',
		component: WatchComponent
	},
/*	{
		path: 'blockly',
		component: BlocklySidenav,
		children :
		[
			{ path: ':id', component: BlocklyViewerComponent },
			{ path: '', component: BlocklyCategoryList }
		]
	},*/
	{
		path: 'settings',
		component: ComponentSidenav,
		data: { name: "Settings" },
		children :
		[
			//{ path: 'applications', component: Applications, data: { name: "Applications", summary: "View Applications" } },
			//{ path: 'logs', component: LogsComponent, data: { name: "Logs", summary: "View Application Logs" } },
			{ path: 'accounts/:id', component: GraphQLDetailComponent },
			{ path: 'accounts', component: GraphQLComponent, data: { name: "Accounts", summary: "View/Modify IB Accounts", display:"description", showAdd: false } },
			{ path: 'users/:id', component: GraphQLDetailComponent },
			{ path: 'users', component: GraphQLComponent, data: { name: "Users", summary: "View/Modify Users" } },
			{ path: 'roles/:id', component: GraphQLDetailComponent },
			{ path: 'roles', component: GraphQLComponent, data: { name: "Roles", summary: "View/Modify Roles" } },
			{ path: 'groups/:id', component: GraphQLDetailComponent },
			{ path: 'groups', component: GraphQLComponent, data: { name: "Groups", summary: "View/Modify Groups" } },
			{ path: '', component: ComponentCategoryList, data: { name: "Settings", summary: "Site Settings" } }
		]
	}
];

@NgModule({
	declarations: [AppComponent],
  	imports: [
		CommonModule, BrowserModule, RouterModule.forRoot( routes, {enableTracing: false} ), BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
	 MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatMenuModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatToolbarModule, MatPaginatorModule, MatDatepickerModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
	 ComponentHeaderModule, NavBarModule, ThemePickerModule
	 //MatExpansionModule,
	  /*SnapshotComponent, PortfolioComponent, SnapshotComponent, TradeComponent, OrderComponent, WatchComponent,*/
	  //BlocklySidenav, BlocklyViewerComponent
  ],
  /*entryComponents: [TransactDialog, RollDialog, OptionEntryDialog, UserEntryDialog],*/
  providers: [
		{provide: 'IProfile', useClass: LocalStorageProfile},
		{provide: 'IErrorService', useClass: DefaultErrorService},
		{provide: 'IAuth', useClass: DisabledAuthService},
		{provide: 'IGraphQL', useClass: TwsService},
		CanActivateComponentSidenav, StyleManager, ThemeStorage, DecimalPipe
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
