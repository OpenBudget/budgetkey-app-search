import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FilterMenu, FilterOption} from 'budgetkey-ng2-components';

// generic Component
@Component({
  selector: 'search-filter-menu',
  template: require('./search_filter_menu.component.html'),
  styles: [require('./search_filter_menu.component.css')]
})
export class SearchFilterMenuComponent {
  @Input() menu: FilterMenu;
  @Output() selected = new EventEmitter();

  constructor() {}

  set selectedOption(option: FilterOption) {
    this.menu.selected = option;
    this.selected.emit(option);
  }

  get selectedOption(): FilterOption {
    return this.menu.selected;
  }
}
