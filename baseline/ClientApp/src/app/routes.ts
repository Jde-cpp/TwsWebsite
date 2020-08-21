//import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderComponent} from './pages/tws/orders/orders';
import {PortfolioComponent} from './pages/tws/portfolio/portfolio';
import {SnapshotComponent} from './pages/tws/snapshot/snapshot';
import {TradeComponent} from './pages/tws/trades/trades';
import {WatchComponent} from './pages/tws/watch/watch';

export const routes: Routes =
[
	{path: '', component: PortfolioComponent, pathMatch: 'full', data: {}},
	{path: 'portfolio', component: PortfolioComponent},
	{path: 'snapshot', component: SnapshotComponent},
	{path: 'trades', component: TradeComponent},
	{path: 'orders', component: OrderComponent},
	{path: 'watch', component: WatchComponent},
	{path: '**', redirectTo: ''}
];
