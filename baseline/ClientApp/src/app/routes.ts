//import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CanActivateComponentSidenav} from 'jde-material-site';
import {OrderComponent} from '../../projects/jde-tws/src/lib/pages/orders/orders';
import {PortfolioComponent} from '../../projects/jde-tws/src/lib/pages/portfolio/portfolio';
import {SnapshotComponent} from '../../projects/jde-tws/src/lib/pages/snapshot/snapshot';
import {TradeComponent} from '../../projects/jde-tws/src/lib/pages/trades/trades';
import {WatchComponent} from '../../projects/jde-tws/src/lib/pages/watch/watch';

export const routes: Routes =
[
	{path: '', component: SnapshotComponent, pathMatch: 'full', data: {}},
	{path: 'portfolio', component: PortfolioComponent},
	{path: 'snapshot', component: SnapshotComponent},
	{path: 'trades', component: TradeComponent},
	{path: 'orders', component: OrderComponent},
	{path: 'watch', component: WatchComponent},
/*	{
		path: 'blockly',
		loadChildren: () => import('jde-blockly/blockly-sidenav').then(m => m.BlocklySidenavModule)
	},
	{
	  path: ':section',
	  canActivate: [CanActivateComponentSidenav],
	  loadChildren: () => import('./pages/material-site/component-sidenav/component-sidenav').then(m => m.ComponentSidenavModule)
	},*/
	{path: '**', redirectTo: ''}
];
