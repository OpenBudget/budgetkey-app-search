import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SearchFilter, FilterOption} from '../_model/SearchFilters';

// generic Component
@Component({
  selector: 'search-filter',
  template: require('./search_filter.component.html'),
  styles: [require('./search_filter.component.css')]
})
export class SearchFilterComponent {
  @Input() filter: SearchFilter;
  @Output() onOptionFilterChange = new EventEmitter();

  constructor() {}

  onOptionSelected(selectedOption: FilterOption) {
    selectedOption.selected = !selectedOption.selected;
    this.onOptionFilterChange.emit(this.filter);
  }
}
