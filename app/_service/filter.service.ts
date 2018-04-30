import { Injectable } from '@angular/core';
import {FilterOption, SearchFilter} from "../_model/SearchFilters";
import {BehaviorSubject, Observable} from "rxjs";
let _ = require('lodash');
let searchFiltersFromJson = require("../_config/filters.json");

@Injectable()
export class FilterService {

  private filterSelectedSource: BehaviorSubject<{[field: string]: FilterOption}>;
  public filterSelectedSource$:Observable<{[field: string]: FilterOption}>;
  public allFilters: SearchFilter[];

  constructor() {
    this.allFilters = searchFiltersFromJson;
    let initFilterList: {[field: string]: FilterOption} = {};
    _.each(searchFiltersFromJson, (filter: SearchFilter) => {
      initFilterList[filter.field] = filter.options[0];
    });
    this.filterSelectedSource = new BehaviorSubject(initFilterList);
    this.filterSelectedSource$ = this.filterSelectedSource.asObservable();
  }

  nextFilterQuery(filters: {[field: string]: FilterOption}) {
    this.filterSelectedSource.next(filters);
  }

}
