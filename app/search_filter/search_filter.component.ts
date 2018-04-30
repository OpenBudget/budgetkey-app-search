/**
 * Created by adam on 18/12/2016.
 */
import { Component, Input, OnInit, Inject } from '@angular/core';
import {SearchFilter, FilterOption} from "../_model/SearchFilters";
import {FilterService} from "../_service/filter.service";
let _ = require('lodash');

// generic Component
@Component({
  selector: 'search-filter',
  template: require('./search_filter.component.html'),
  styles: [require('./search_filter.component.css')]
})
export class SearchFilterComponent implements OnInit {
  allFilters: SearchFilter[];
  isFilterShown = false;
  @Input("initSelectedFilters") selectedFilters: {[field: string]: FilterOption};

  constructor(private filterService: FilterService) {
    this.allFilters = filterService.allFilters;
    if(!this.selectedFilters){
      this.selectedFilters = {};
    }
  }

  ngOnInit() {
    _.each(this.allFilters,(filter: SearchFilter)=>{
      _.remove(filter.options,(option:FilterOption)=>{
        return _.isEqual(this.selectedFilters[filter.field],option)
      });
      filter.options.unshift(this.selectedFilters[filter.field]);
    });
  }

  filterSelected(filter: {field: string, selectedOption: FilterOption}) {
    this.selectedFilters[filter.field] = filter.selectedOption;
    this.filterService.nextFilterQuery(this.selectedFilters);
  }
}
