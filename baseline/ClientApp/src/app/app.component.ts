import {Component, ViewEncapsulation} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({selector: 'app-root',templateUrl: './app.component.html',styleUrls: ['./app.component.scss'],encapsulation: ViewEncapsulation.None})
export class AppComponent
{
	constructor( router: Router ) 
	{
		let previousRoute = router.routerState.snapshot.url;

    	router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((data: NavigationEnd) => 
		{
			resetScrollPosition();
			previousRoute = data.urlAfterRedirects;
		});
	}
}

function resetScrollPosition() 
{
	if( typeof document === 'object' && document )
	{
		const sidenavContent = document.querySelector('.mat-drawer-content');
		if (sidenavContent)
			sidenavContent.scrollTop = 0;
	}
}
