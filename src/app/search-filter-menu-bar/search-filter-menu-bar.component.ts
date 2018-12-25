import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {FilterMenu} from 'budgetkey-ng2-components';

@Component({
  selector: 'search-filter-menu-bar',
  templateUrl: './search-filter-menu-bar.component.html',
  styleUrls: ['./search-filter-menu-bar.component.less']
})
export class SearchFilterMenuBarComponent {
  @Input() menus: FilterMenu[];
  @Output() selected = new EventEmitter();

  constructor() {}

  onSelected(menu: FilterMenu) {
    this.selected.emit(menu);
  }
}

