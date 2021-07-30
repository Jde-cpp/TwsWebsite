import { DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TwsAuthService, TwsService} from 'jde-tws';
import {BlocklyViewerComponent} from 'jde-blockly';
import {BlocklyCategoryList} from 'jde-blockly';
import {BlocklySidenav} from 'jde-blockly'

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

import {NavBarModule} from 'jde-material';
import {ThemePickerModule} from 'jde-material';
import {StyleManager} from 'jde-material';

import{ UserComponent } from 'jde-framework';

import{ LogsComponent } from 'jde-framework';
import{ GraphQLComponent } from 'jde-framework';
import{ GraphQLDetailComponent } from 'jde-framework';

import{ UserEntryDialog } from 'jde-framework';
import { AppComponent } from './app.component';

import {OrderComponent} from 'jde-tws'
import {PortfolioComponent} from 'jde-tws';
import { SnapshotComponent, WatchComponent } from 'jde-tws';
import {TradeComponent} from 'jde-tws'

import {LocalStorageProfile} from 'jde-framework'
import {DefaultErrorService } from 'jde-framework'

import {CanActivateComponentSidenav} from 'jde-material';
import {ThemeStorage} from 'jde-material';
import { ComponentCategoryList } from 'jde-material';
import { ComponentSidenav } from 'projects/jde-material/src/lib/pages/component-sidenav/component-sidenav';
//import { TwitterComponent } from './test/twitter/twitter';


//Testing:
import {MatExpansionModule} from '@angular/material/expansion';


const routes: Routes =
[
	{ path: '', component: SnapshotComponent, pathMatch: 'full', data: {} },
	{ path: 'portfolio', component: PortfolioComponent },
	{ path: 'snapshot', component: SnapshotComponent },
	{ path: 'trades', component: TradeComponent },
	{ path: 'orders', component: OrderComponent },
//	{ path: 'twitter', component: TwitterComponent },
	{ path: 'watch', component: WatchComponent },
	{
		path: 'blockly',
		component: BlocklySidenav,
		children :
		[
			{ path: ':id', component: BlocklyViewerComponent },
			{ path: '', component: BlocklyCategoryList }
		]
	},
	{
		path: 'settings',
		component: ComponentSidenav,
		data: { name: "Settings" },
		children :
		[
			{ path: 'logs', component: LogsComponent, data: { name: "Logs", summary: "View Application Logs" } },
			{ path: 'accounts/:id', component: GraphQLDetailComponent },
			{ path: 'accounts', component: GraphQLComponent, data: { name: "Accounts", summary: "View/Modify IB Accounts", display:"description", showAdd: false } },
			{ path: 'users', component: UserComponent, data: { name: "Users", summary: "View/Modify Users" } },
			{ path: 'roles/:id', component: GraphQLDetailComponent },
			{ path: 'roles', component: GraphQLComponent, data: { name: "Roles", summary: "View/Modify Roles" } },
			{ path: 'groups/:id', component: GraphQLDetailComponent },
			{ path: 'groups', component: GraphQLComponent, data: { name: "Groups", summary: "View/Modify Groups" } },
			{ path: '', component: ComponentCategoryList, data: { name: "Settings", summary: "Site Settings" } }
		]
	}
];

@NgModule({
	declarations: [
		AppComponent//, TwitterComponent
	/*	, ComponentCategoryList,
		BlocklyCategoryList,BlocklyViewerComponent,PortfolioComponent,OrderComponent, SnapshotComponent, SnapshotContentComponent, FundamentalsComponent, SummaryComponent, TradeComponent, WatchComponent, WatchContentComponent, WatchTableComponent,
		PaginatorComponent,
		CandlestickComponent,
		InvestorsComponent,
		SeverityPickerComponent,
		UserComponent, UserEntryDialog, LogsComponent, GraphQLComponent, GraphQLDetailComponent, GraphQLProperties, GraphQLTable, GraphQLLinkComponent, LinkSelectComponent, DateRangeComponent,*/
	],
  	imports: [
	  BrowserModule, RouterModule.forRoot( routes, {enableTracing: false} ), BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
	 MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatMenuModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatToolbarModule, MatPaginatorModule, MatDatepickerModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
	 NavBarModule,
	 ThemePickerModule,
	 MatExpansionModule,
	//  SnapshotComponent, PortfolioComponent, SnapshotComponent, TradeComponent, OrderComponent, WatchComponent, BlocklySidenav, BlocklyViewerComponent
  ],
  /*entryComponents: [TransactDialog, RollDialog, OptionEntryDialog, UserEntryDialog],*/
  providers: [
		{provide: 'IProfile', useClass: LocalStorageProfile},
		{provide: 'IErrorService', useClass: DefaultErrorService},
		{provide: 'IAuth', useClass: TwsAuthService},
		{provide: 'IGraphQL', useClass: TwsService},
		CanActivateComponentSidenav, StyleManager, ThemeStorage, DecimalPipe
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
