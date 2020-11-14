//import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CanActivateComponentSidenav} from './pages/material-site/component-sidenav/component-sidenav-can-load-guard';
import {OrderComponent} from './pages/tws/orders/orders';
import {PortfolioComponent} from './pages/tws/portfolio/portfolio';
import {SnapshotComponent} from './pages/tws/snapshot/snapshot';
import {TradeComponent} from './pages/tws/trades/trades';
import {WatchComponent} from './pages/tws/watch/watch';

export const routes: Routes =
[
	{path: '', component: SnapshotComponent, pathMatch: 'full', data: {}},
	{path: 'portfolio', component: PortfolioComponent},
	{path: 'snapshot', component: SnapshotComponent},
	{path: 'trades', component: TradeComponent},
	{path: 'orders', component: OrderComponent},
	{path: 'watch', component: WatchComponent},
	{
		path: 'blockly',
		loadChildren: () => import('./pages/tws/blockly/index/sidenav/blockly-sidenav').then(m => m.BlocklySidenavModule)
	},
	{
	  path: ':section',
	  canActivate: [CanActivateComponentSidenav],
	  loadChildren: () => import('./pages/material-site/component-sidenav/component-sidenav').then(m => m.ComponentSidenavModule)
	},
	{path: '**', redirectTo: ''}
];
