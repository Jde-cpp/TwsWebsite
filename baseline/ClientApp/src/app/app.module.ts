import { DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';

import {NavBarModule} from './shared/material-site/navbar';
import {ThemePickerModule} from './shared/material-site/theme-picker';
//import {ComponentPageTitle} from './pages/material-site/page-title/page-title';
import {StyleManager} from './shared/material-site/style-manager';

import {PaginatorComponent} from './shared/framework/paginator/paginator';

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

import {DateRangeComponent} from './shared/framework/date-range/date-range'
import {LinkSelectComponent} from './shared/framework/link-select/link-select'
import {QuantityComponent} from './shared/tws/widgets/quantity/quantity'

import {routes} from './routes';
import { AppComponent } from './app.component';

import {OrderComponent} from './pages/tws/orders/orders'
import {WatchComponent} from './pages/tws/watch/watch'
import {WatchContentComponent} from './pages/tws/watch/watch-content';
import {PortfolioComponent} from './pages/tws/portfolio/portfolio';
import {ConfigurationDialog} from './pages/tws/snapshot/configuration'
import {SnapshotComponent} from './pages/tws/snapshot/snapshot';
import {SnapshotContentComponent} from './pages/tws/snapshot/snapshot-content';
import {TradeComponent} from './pages/tws/trades/trades'

import {LocalStorageProfile} from './services/profile/localStorageProfile.service'
import {DefaultErrorService } from './services/error/DefaultError.service'

import {CanActivateComponentSidenav} from './pages/material-site/component-sidenav/component-sidenav-can-load-guard';
import {ThemeStorage} from './shared/material-site/theme-picker/theme-storage/theme-storage';



@NgModule({
  declarations: [
	 AppComponent,
	 OrderComponent,PortfolioComponent,ConfigurationDialog,WatchComponent, WatchContentComponent, SnapshotComponent,SnapshotContentComponent,TradeComponent,
	 PaginatorComponent,
	 CandlestickComponent, OptionTableComponent, OptionTabComponent, SmallChartComponent, SummaryComponent,
	 WatchTableComponent, WatchRowComponent,
	 ConfirmationDialog, OptionEntryDialog, RollDialog, TransactDialog,
	 LinkSelectComponent, DateRangeComponent, QuantityComponent],
  imports: [
	 BrowserModule, RouterModule.forRoot(routes), BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
	 MatAutocompleteModule,MatButtonModule, MatDialogModule, MatFormFieldModule,MatMenuModule, MatIconModule,MatInputModule,MatNativeDateModule, MatRadioModule, MatTableModule, MatTabsModule, MatCheckboxModule,MatChipsModule, MatToolbarModule,MatDatepickerModule, MatSelectModule,MatSnackBarModule, MatSortModule,
	 NavBarModule, ThemePickerModule
  ],
  entryComponents: [TransactDialog, RollDialog, OptionEntryDialog],
  providers: [
		{provide: 'IProfile', useClass: LocalStorageProfile},
		{provide: 'IErrorService', useClass: DefaultErrorService},
		CanActivateComponentSidenav, StyleManager, ThemeStorage, DecimalPipe
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
