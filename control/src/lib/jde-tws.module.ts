import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DateRangeModule, LinkSelectModule } from 'jde-framework';

import {InvestorsComponent} from './pages/Edgar/investors';
import {OrderComponent} from './pages/orders/orders';
import { PortfolioComponent } from './pages/portfolio/portfolio';
import { FundamentalsComponent } from './pages/snapshot/fundamentals/fundamentals';
import { NewsComponent } from './pages/snapshot/news/news';
import { RedditComponent } from './pages/snapshot/reddit/reddit';
import { TwitterComponent } from './pages/snapshot/twitter/twitter';
import { SnapshotComponent } from './pages/snapshot/snapshot';
import { SnapshotContentComponent } from './pages/snapshot/snapshot-content';
import { ConfigurationDialog } from './pages/snapshot/configuration';
import { TradeComponent } from './pages/trades/trades';
import { WatchComponent } from './pages/watch/watch';
import { WatchContentComponent } from './pages/watch/watch-content';

import { CandlestickComponent } from './shared/highcharts/candlestick'
import { OptionTabComponent } from './shared/options/option-tab/option-tab'
import { SummaryComponent } from './shared/summary/summary';
import { OptionTableComponent } from './shared/options/option-table/option-table'
import { WatchTableComponent } from './shared/watch-table/watch-table';
import { WatchRowComponent } from './shared/watch-table/watch-row/watch-row';
import { RollDialog } from './shared/dialogs/roll/roll-dialog';
import { ConfirmationDialog } from './shared/dialogs/transact/confirmation';
import { OptionEntryDialog } from './shared/dialogs/option-entry/option-entry';
import { TransactDialog } from './shared/dialogs/transact/transact';
import {QuantityComponent} from './shared/widgets/quantity/quantity'


@NgModule(
{
	  declarations: [
		InvestorsComponent,OrderComponent, PortfolioComponent, TradeComponent, SummaryComponent, WatchComponent,
		SnapshotComponent, SnapshotContentComponent, ConfigurationDialog, FundamentalsComponent, NewsComponent,RedditComponent,TwitterComponent, CandlestickComponent, OptionTabComponent,
		RollDialog, ConfirmationDialog,OptionEntryDialog,TransactDialog,QuantityComponent, WatchContentComponent,
		OptionTableComponent, WatchTableComponent, WatchRowComponent],
	imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule,
		MatButtonModule, MatAutocompleteModule,MatDialogModule,MatIconModule,MatInputModule,MatExpansionModule,MatFormFieldModule,MatMenuModule,MatNativeDateModule,MatSelectModule,MatTableModule,MatTabsModule,MatToolbarModule,BrowserAnimationsModule,
		DateRangeModule, LinkSelectModule],
	entryComponents: [],
	exports: [OrderComponent, PortfolioComponent, TradeComponent, WatchComponent,
		SnapshotComponent//,SnapshotContentComponent
	],
	providers: []
})
export class JdeTwsModule { }
