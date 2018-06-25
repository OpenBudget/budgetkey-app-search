import { Injectable } from '@angular/core';
import {SearchFilter, FilterOption} from '../_model/SearchFilters';
import {Observable, BehaviorSubject} from 'rxjs';
let _ = require('lodash');
let searchFiltersFromJson = require('../_config/filters.json');

@Injectable()
export class FilterService {

  private filterSelectedSource: BehaviorSubject<SearchFilter>;
  public filterSelectedSource$: Observable<SearchFilter>;
  public allFilters: SearchFilter[];

  constructor() {
    this.allFilters = searchFiltersFromJson;
    _.each(this.allFilters, (filter: SearchFilter) => {
      _.each(filter.options, (option: FilterOption) => {
        if (!option.selected) {
          option.selected = false;
        }
      });
    });

    this.filterSelectedSource = new BehaviorSubject<SearchFilter>(null);
    this.filterSelectedSource$ = this.filterSelectedSource.asObservable();
  }

  nextFilterQuery(filter: SearchFilter) {
    this.filterSelectedSource.next(filter);
  }

}
