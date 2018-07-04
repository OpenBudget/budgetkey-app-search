import {Component, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {FilterMenu} from 'budgetkey-ng2-components';


@Component({
  selector: 'search-filter-menu-bar',
  template: require('./search_filter_menu_bar.component.html'),
  styles: [require('./search_filter_menu_bar.component.css')],
  encapsulation: ViewEncapsulation.None,
})
export class SearchFilterMenuBarComponent {
  @Input() menus: FilterMenu[];
  @Output() selected = new EventEmitter();

  constructor() {}

  onSelected(menu: FilterMenu) {
    this.selected.emit(menu);
  }
}
