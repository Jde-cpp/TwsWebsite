import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatMenuModule,MatIconModule,MatInputModule,MatNativeDateModule} from '@angular/material'; //import {, MatPaginatorModule, MatProgressSpinnerModule, };
//import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {NavBarModule} from './shared/material-site/navbar';
import {ThemePickerModule} from './shared/material-site/theme-picker';
import {ComponentPageTitle} from './pages/material-site/page-title/page-title';
import {StyleManager} from './shared/material-site/style-manager';

import {SummaryComponent} from './shared/tws/summary/summary';

import {routes} from './routes';
import { AppComponent } from './app.component';

import {PortfolioComponent} from './pages/tws/portfolio/portfolio.component';
import {SnapshotComponent} from './pages/tws/snapshot/snapshot';
import {TradeComponent} from './pages/tws/trades/trades.component'

import {CookieProfile} from './services/profile/cookieProfile.service'
//import {TwsService} from './services/tws/tws.service'

@NgModule({
  declarations: [
	 AppComponent,
	 PortfolioComponent,SnapshotComponent,TradeComponent,
	 SummaryComponent
  ],
  imports: [
	 BrowserModule, RouterModule.forRoot(routes), BrowserAnimationsModule, FormsModule, ReactiveFormsModule,
	 MatMenuModule, MatIconModule,MatInputModule,MatNativeDateModule, MatTableModule, MatChipsModule, MatToolbarModule,MatDatepickerModule, MatSortModule,MatSnackBarModule,
	 NavBarModule, ThemePickerModule
  ],
  providers: [
	ComponentPageTitle,StyleManager, 
		{provide: 'IProfile', useClass: CookieProfile}
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
