import { Component, ViewEncapsulation } from '@angular/core';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss'], encapsulation: ViewEncapsulation.None})
export class AppComponent
{
	title = 'WebSite';
	//authenticate=true;
}

function __classPrivateFieldSet(receiver, privateMap, value)
{
	if (!privateMap.has(receiver))
		 throw new TypeError("attempted to set private field on non-instance");
	privateMap.set(receiver, value);
	return value;
};
function __classPrivateFieldGet(receiver, privateMap)
{
	if (!privateMap.has(receiver))
		 throw new TypeError("attempted to get private field on non-instance");

	return privateMap.get(receiver);
};