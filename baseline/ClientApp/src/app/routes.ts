//import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TradeComponent} from './pages/tws/trades/trades.component';
import {PortfolioComponent} from './pages/tws/portfolio/portfolio';
import {SnapshotComponent} from './pages/tws/snapshot/snapshot';

export const routes: Routes =
[
	{path: '', component: PortfolioComponent, pathMatch: 'full', data: {}},
	{path: 'portfolio', component: PortfolioComponent},
	{path: 'snapshot', component: SnapshotComponent},
	{path: 'trades', component: TradeComponent},
	{path: '**', redirectTo: ''}
];
