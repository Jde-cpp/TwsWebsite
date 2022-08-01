import {Component} from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Columns } from '../../pages/watch/watch-content';
import {WatchTableComponent} from './watch-table'

@Component({selector: 'header-col', templateUrl: './header-col.html', styleUrls:['./header-col.scss']})
export class HeaderCol
{
	sort()
	{
		this.parent.sort( this.column );
		//Active = { active:this.column, direction:this.sortedDir=='asc' ? 'desc' : 'asc' };
	}
	get className():string
	{
		return this.name[0].toLowerCase()+this.name.substring(1)+"-h";
	}
	column:Columns;
	get name():string{ return Columns[this.column]; }
	parent:WatchTableComponent;
	get sortedDir():SortDirection
	{
		return this.parent.sortActive?.active==this.column ? this.parent.sortActive.direction : '';
	}
}