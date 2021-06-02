import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';

import {OrderComponent} from './pages/orders/orders';
import { PortfolioComponent } from './pages/portfolio/portfolio';
import { FundamentalsComponent } from './pages/snapshot/fundamentals/fundamentals';
import { SnapshotComponent } from './pages/snapshot/snapshot';
import { SnapshotContentComponent } from './pages/snapshot/snapshot-content';
import { ConfigurationDialog } from './pages/snapshot/configuration'
import { SummaryComponent } from './shared/summary/summary';
import { WatchComponent } from './pages/watch/watch';
import { WatchContentComponent } from './pages/watch/watch-content';
import { OptionTableComponent } from './shared/options/option-table/option-table'
import { WatchTableComponent } from './shared/watch-table/watch-table';
import { WatchRowComponent } from './shared/watch-table/watch-row/watch-row';
import { RollDialog } from './shared/dialogs/roll/roll-dialog';
import { ConfirmationDialog } from './shared/dialogs/transact/confirmation';
import { OptionEntryDialog } from './shared/dialogs/option-entry/option-entry';
import { TransactDialog } from './shared/dialogs/transact/transact';
import {QuantityComponent} from './shared/widgets/quantity/quantity'
import { TradeComponent } from './pages/trades/trades';


@NgModule(
{
	  declarations: [
		OrderComponent, PortfolioComponent, TradeComponent, SummaryComponent, WatchComponent,
		SnapshotComponent, SnapshotContentComponent, ConfigurationDialog, FundamentalsComponent,
		RollDialog, ConfirmationDialog,OptionEntryDialog,TransactDialog,QuantityComponent, WatchContentComponent,
		OptionTableComponent, WatchTableComponent, WatchRowComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule,
		MatButtonModule, MatAutocompleteModule,MatDialogModule,MatIconModule,MatInputModule,MatFormFieldModule,MatMenuModule,MatSelectModule,MatTableModule,MatToolbarModule],
	entryComponents: [OptionEntryDialog,TransactDialog],
	exports: [FundamentalsComponent, OrderComponent, PortfolioComponent, SnapshotComponent,SnapshotContentComponent, TradeComponent, WatchComponent],
	// , RollDialog,OptionEntryDialog
	providers: []
})
export class JdeTwsModule { }
