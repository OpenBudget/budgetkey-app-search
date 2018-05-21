/**
 * Created by adam on 18/12/2016.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {SearchFilter, FilterOption} from '../_model/SearchFilters';
import {FilterService} from '../_service/filter.service';
import {ISubscription} from 'rxjs/Subscription';
let _ = require('lodash');

// generic Component
@Component({
  selector: 'search-filter',
  template: require('./search_filter.component.html'),
  styles: [require('./search_filter.component.css')]
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  selectedFilter: SearchFilter;
  subscribeFilter$: ISubscription;

  constructor(private filterService: FilterService) {
  }

  ngOnInit() {
    this.subscribeFilter$ = this.filterService.filterSelectedSource$.subscribe((filter: SearchFilter) => {
        this.selectedFilter = filter ? JSON.parse(JSON.stringify(filter)) : null;
    });
  }

  ngOnDestroy() {
    this.subscribeFilter$.unsubscribe();
  }

  optionSelected(value: string) {
    let index: number = _.findIndex(this.selectedFilter.options, (option: FilterOption) => {
      return option.value === value;
    });
    this.selectedFilter.options[index].selected = true;
    this.filterService.nextFilterQuery(this.selectedFilter);
  }
}
