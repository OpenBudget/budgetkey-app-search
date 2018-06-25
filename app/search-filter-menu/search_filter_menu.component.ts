import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SearchFilter} from '../_model/SearchFilters';

// generic Component
@Component({
  selector: 'search-filter-menu',
  template: require('./search_filter_menu.component.html'),
  styles: [require('./search_filter_menu.component.css')]
})
export class SearchFilterComponentMenu {
  @Input() filters: SearchFilter[];
  @Output() onSearchFilterChange = new EventEmitter();

  constructor() {}

  onFilterChange(newFilter: SearchFilter) {
    this.onSearchFilterChange.emit(newFilter);
  }
}
