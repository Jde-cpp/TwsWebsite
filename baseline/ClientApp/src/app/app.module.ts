import { DecimalPipe } from '@angular/common';
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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';

import {NavBarModule} from 'jde-material-site';
import {ThemePickerModule} from 'jde-material-site';
import {StyleManager} from 'jde-material-site';

import {TwsAuthService, TwsService} from 'jde-tws';

//import{ NewsComponent } from 'jde-tws';
import{ UserComponent } from './pages/user-management/users/users';
import{ GraphQLComponent } from './pages/GraphQL/graph-ql-component';
import{ GraphQLDetailComponent } from './pages/GraphQL/detail/graph-ql-detail';
import{ GraphQLProperties } from './pages/GraphQL/properties/properties';
import{ GraphQLLinkComponent } from  './pages/GraphQL/links/links';
import{ GraphQLTable } from  './pages/GraphQL/table/table';

import{ UserEntryDialog } from './pages/user-management/users/dialog/user-dialog';
import{ CandlestickComponent } from 'jde-tws';
import {SelectDialog} from './pages/GraphQL/select-dialog/select-dialog';
/*
import{ OptionTableComponent } from 'jde-tws';
import{ OptionTabComponent } from 'jde-tws';
import {SmallChartComponent} from 'jde-tws';
import {SummaryComponent} from 'jde-tws';
import {WatchTableComponent} from 'jde-tws';
import {WatchRowComponent} from 'jde-tws';

import {ConfirmationDialog} from 'jde-tws'
//import {OptionEntryDialog} from 'jde-tws';
import {RollDialog} from 'jde-tws'
import {TransactDialog} from 'jde-tws'
*/
import {DateRangeComponent} from 'jde-framework'
import {LinkSelectComponent} from 'jde-framework'
import {PaginatorComponent} from 'jde-framework';

import { AppComponent } from './app.component';

//import {QuantityComponent} from 'jde-tws'
//import {ConfigurationDialog} from 'jde-tws'
import {OrderComponent} from 'jde-tws'
import {PortfolioComponent} from 'jde-tws';
import {SnapshotComponent, SnapshotContentComponent, FundamentalsComponent } from 'jde-tws';
import {TradeComponent} from 'jde-tws'
import {WatchComponent} from 'jde-tws'

import {BlocklyViewerComponent} from 'jde-blockly';
import {BlocklyCategoryList} from 'jde-blockly';
import {BlocklySidenav} from 'jde-blockly'
import {LocalStorageProfile} from 'jde-framework'
import {DefaultErrorService } from 'jde-framework'

import {CanActivateComponentSidenav} from 'jde-material-site';
import {ThemeStorage} from 'jde-material-site';
import { ComponentCategoryList } from 'jde-material-site';
import { ComponentSidenav } from 'projects/jde-material-site/src/lib/pages/component-sidenav/component-sidenav';

const routes: Routes =
[
	{ path: '', component: SnapshotComponent, pathMatch: 'full', data: {} },
	{ path: 'portfolio', component: PortfolioComponent },
	{ path: 'snapshot', component: SnapshotComponent },
	{ path: 'trades', component: TradeComponent },
	{ path: 'orders', component: OrderComponent },
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
			{ path: 'accounts/:id', component: GraphQLDetailComponent },
			{ path: 'accounts', component: GraphQLComponent, data: { name: "Accounts", summary: "View/Modify IB Accounts", display:"description" } },
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
		AppComponent, ComponentCategoryList,
		BlocklyCategoryList,BlocklyViewerComponent,PortfolioComponent,OrderComponent, SnapshotComponent, SnapshotContentComponent, FundamentalsComponent,TradeComponent,WatchComponent,
		PaginatorComponent,
		CandlestickComponent,
		UserComponent, UserEntryDialog, SelectDialog, GraphQLComponent, GraphQLDetailComponent, GraphQLProperties, GraphQLTable, GraphQLLinkComponent, LinkSelectComponent, DateRangeComponent,
	],
  	imports: [
	  BrowserModule, RouterModule.forRoot( routes, {enableTracing: false} ), BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
	 MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatMenuModule, MatIconModule, MatInputModule, MatNativeDateModule, MatExpansionModule, MatRadioModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatToolbarModule, MatDatepickerModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
	 NavBarModule, ThemePickerModule
  ],
  entryComponents: [/*TransactDialog, RollDialog, OptionEntryDialog,*/ UserEntryDialog, SelectDialog],
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
