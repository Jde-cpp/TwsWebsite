import {Component} from '@angular/core';
import { SortDirection } from '@angular/material/sort';

@Component({selector: 'header-col', templateUrl: './header-col.html', styleUrls:['./header-col.scss']})
export class HeaderCol
{
	sort()
	{

	}
	get className():string
	{
		return this.name[0].toLowerCase()+this.name.substring(1)+"-h";
	}
	name:string;
	sortedDir:SortDirection;
}
