/**
 * Created by adam on 18/12/2016.
 */
import {Component, Input, OnInit} from '@angular/core';
import {DocResultEntry} from "./SearchResults";

@Component({
    moduleId: module.id,
    selector: 'search-result-budget',
    template: require('./search_result_budget.component.html!text'),
})

export class SearchResultBudgetComponent implements OnInit {

  @Input() item: DocResultEntry;

  details: string;

  constructor() {}

  ngOnInit() {
    this.details = "לורם איפסום " + this.item.source.title;
  }

}

@Component({
  moduleId: module.id,
  selector: 'search-result-changes',
  template: require('./search_result_changes.component.html!text'),
})

export class SearchResultChangesComponent implements OnInit {

  @Input() item: DocResultEntry;

  details: string;

  constructor() {}

  ngOnInit() {
    this.details = "לורם איפסום " + this.item.source.title;
  }

}

@Component({
  moduleId: module.id,
  selector: 'search-result-exemption',
  template: require('./search_result_exemption.component.html!text'),
})

export class SearchResultExemptionComponent implements OnInit {

  @Input() item: DocResultEntry;

  details: string;

  constructor() {}

  ngOnInit() {
    this.details = "לורם איפסום " + this.item.source.title;
  }

}
