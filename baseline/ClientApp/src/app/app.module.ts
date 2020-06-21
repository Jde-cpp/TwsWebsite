import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
//import {MatDialogModule} from '@angular/material/dialog';
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
import {SummaryComponent} from './shared/tws/summary/summary';

import {TransactDialog} from './shared/tws/dialogs/transact/transact'
import {RollDialog} from './shared/tws/dialogs/roll/roll-dialog'
import {OptionEntryDialog} from './shared/tws/dialogs/option-entry/option-entry';

import {QuantityComponent} from './shared/tws/widgets/quantity/quantity'

import {routes} from './routes';
import { AppComponent } from './app.component';

import {PortfolioComponent} from './pages/tws/portfolio/portfolio';
import {SnapshotComponent} from './pages/tws/snapshot/snapshot';
import {TradeComponent} from './pages/tws/trades/trades.component'

import {CookieProfile} from './services/profile/cookieProfile.service'
import {DefaultErrorService } from './services/error/DefaultError.service'

import {CanActivateComponentSidenav} from './pages/material-site/component-sidenav/component-sidenav-can-load-guard';
import {ThemeStorage} from './shared/material-site/theme-picker/theme-storage/theme-storage';


@NgModule({
  declarations: [
	 AppComponent,
	 PortfolioComponent,SnapshotComponent,TradeComponent,
	 PaginatorComponent,
	 CandlestickComponent, OptionTableComponent, OptionTabComponent, SummaryComponent,
	 TransactDialog, RollDialog, OptionEntryDialog,
	 QuantityComponent],
  imports: [
	 BrowserModule, RouterModule.forRoot(routes), BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
	 MatAutocompleteModule,MatButtonModule, MatFormFieldModule,MatMenuModule, MatIconModule,MatInputModule,MatNativeDateModule, MatRadioModule, MatTableModule, MatTabsModule, MatChipsModule, MatToolbarModule,MatDatepickerModule, MatSelectModule,MatSnackBarModule, MatSortModule,
	 NavBarModule, ThemePickerModule
  ],
  entryComponents: [TransactDialog, RollDialog, OptionEntryDialog],
  providers: [
		{provide: 'IProfile', useClass: CookieProfile},
		{provide: 'IErrorService', useClass: DefaultErrorService},
		CanActivateComponentSidenav, StyleManager, ThemeStorage
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
