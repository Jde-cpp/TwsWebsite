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
import {IAuth} from 'jde-material-site';

import {TwsAuthService} from 'jde-tws';

import{ FundamentalsComponent } from './pages/tws/snapshot/fundamentals/fundamentals';
import{ NewsComponent } from './pages/tws/snapshot/news/news';
import{ UserComponent } from './pages/user-management/users/users'
import{ CandlestickComponent } from './shared/tws/highcharts/candlestick';
import{ OptionTableComponent } from './shared/tws/options/option-table/option-table';
import{ OptionTabComponent } from './shared/tws/options/option-tab/option-tab';
import {SmallChartComponent} from './shared/tws/small-chart/small-chart';
import {SummaryComponent} from './shared/tws/summary/summary';
import {WatchTableComponent} from './shared/tws/watch-table/watch-table';
import {WatchRowComponent} from './shared/tws/watch-table/watch-row/watch-row';

import {ConfirmationDialog} from './shared/tws/dialogs/transact/confirmation'
import {OptionEntryDialog} from './shared/tws/dialogs/option-entry/option-entry';
import {RollDialog} from './shared/tws/dialogs/roll/roll-dialog'
import {TransactDialog} from './shared/tws/dialogs/transact/transact'

import {DateRangeComponent} from 'jde-framework'
import {LinkSelectComponent} from 'jde-framework'
import {PaginatorComponent} from 'jde-framework';

import {QuantityComponent} from './shared/tws/widgets/quantity/quantity'

import { AppComponent } from './app.component';


import {PortfolioComponent} from './pages/tws/portfolio/portfolio';
import {ConfigurationDialog} from './pages/tws/snapshot/configuration'
import {OrderComponent} from './pages/tws/orders/orders'
import {SnapshotComponent} from './pages/tws/snapshot/snapshot';
import {SnapshotContentComponent} from './pages/tws/snapshot/snapshot-content';
import {TradeComponent} from './pages/tws/trades/trades'
import {WatchComponent} from './pages/tws/watch/watch'
import {WatchContentComponent} from './pages/tws/watch/watch-content';
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
		path: 'users',
		component: ComponentSidenav,
		children :
		[
			{ path: 'users', component: UserComponent },
			// { path: 'roles', component: RoleComponent },
			// { path: 'groups', component: GroupComponent },
			{ path: '', component: ComponentCategoryList }
		]
	},
	// {
	// 	path: 'blockly',
	// 	loadChildren: () => import('dist/jde-blockly/lib/pages/index/sidenav/blockly-sidenav').then(m => m.BlocklySidenavModule)
	// },
	//{path: '', redirectTo: ''}
	//{ path: 'blockly/:id', component: BlocklyViewerComponent },
	// { path: 'blockly', component: BlocklyCategoryList },
	// { path: '', redirectTo: 'snapshot', pathMatch: 'full' },
];

@NgModule({
  declarations: [
	 AppComponent,
	 BlocklyCategoryList,BlocklyViewerComponent,PortfolioComponent,ConfigurationDialog,OrderComponent, SnapshotComponent,SnapshotContentComponent,TradeComponent,WatchComponent, WatchContentComponent,
	 PaginatorComponent,
	 FundamentalsComponent, NewsComponent, CandlestickComponent, OptionTableComponent, OptionTabComponent, SmallChartComponent, SummaryComponent,
	 WatchTableComponent, WatchRowComponent,
	 ConfirmationDialog, OptionEntryDialog, RollDialog, TransactDialog,
	 LinkSelectComponent, DateRangeComponent, QuantityComponent],
  imports: [
	 BrowserModule, RouterModule.forRoot( routes, {enableTracing: false} ), BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
	 MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatMenuModule, MatIconModule, MatInputModule, MatNativeDateModule, MatExpansionModule, MatRadioModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatToolbarModule, MatDatepickerModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
	 NavBarModule, ThemePickerModule
  ],
  entryComponents: [TransactDialog, RollDialog, OptionEntryDialog],
  providers: [
		{provide: 'IProfile', useClass: LocalStorageProfile},
		{provide: 'IErrorService', useClass: DefaultErrorService},
		{provide: 'IAuth', useClass: TwsAuthService},
		CanActivateComponentSidenav, StyleManager, ThemeStorage, DecimalPipe
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
