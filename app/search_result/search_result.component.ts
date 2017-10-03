/**
 * Created by adam on 18/12/2016.
 */
import { Component, Input, OnInit } from '@angular/core';
import { DocResultEntry } from '../_model/SearchResults';
let _ = require('lodash');
// import { Highlighter } from '../highlighter/search.highlighter';

// budget Component
@Component({
  selector: 'search-result-budget',
  template: require('./search_result_budget.component.html'),
})
export class SearchResultBudgetComponent implements OnInit {
  static readonly categoriesByNumberOfDigits = {
    0: 'משרדים',
    2: 'שתי ספרות',
    4: 'ארבע ספרות',
    6: 'שש ספרות',
    8: 'שמונה ספרות',
    10: 'עשר ספרות'
  };

  @Input() item: DocResultEntry;
  details: string;
  changePerc: number;
  link: string;
  yearRange: string;
  category: string;
  title: string;

  constructor() { }
  ngOnInit() {
    let source = this.item.source;
    this.details = 'לורם איפסום ' || source.title;
    this.changePerc = source.net_revised * 100 / source.net_allocated;
    this.link = ['http://www.obudget.org/#budget/',
      source.code.slice(2, 10),
      '/',
      source.year,
      '/main'].join();
    this.yearRange = [_.get(_.keys(source.history), 0), source.year].join('-');
    this.category = SearchResultBudgetComponent.categoriesByNumberOfDigits[this.item.source.code.length - 2];
    this.title =  this.item.source.title !== undefined  ? this.item.source.title : '';
  }
}

// Changes Component
@Component({
  selector: 'search-result-changes',
  template: require('./search_result_changes.component.html'),
})
export class SearchResultChangesComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  date: Date;

  constructor() { }
  ngOnInit() {
    this.details = 'לורם איפסום ' || this.item.source.title;
  }

}

// exemption Component
@Component({
  selector: 'search-result-exemption',
  template: require('./search_result_exemption.component.html'),
})
export class SearchResultExemptionComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  entity_link: string;
  valid_link: boolean;

  constructor() { }
  ngOnInit() {
    this.details = 'לורם איפסום ' || this.item.source.title;
    this.entity_link = 'http://www.obudget.org/#entity/' + this.item.source.entity_id + '/2017/main';
    this.valid_link = this.item.source.entity_id !== null;
  }
}

// procurement Component
@Component({
  selector: 'search-result-procurement',
  template: require('./search_result_procurement.component.html'),
})
export class SearchResultProcurementComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;

  constructor() { }

  ngOnInit() {
  }

}

// supports Component
@Component({
  selector: 'search-result-supports',
  template: require('./search_result_supports.component.html'),
})
export class SearchResultSupportsComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  link: string;
  entity_link: string;

  constructor() { }
  ngOnInit() {
    this.details = 'לורם איפסום ' || this.item.source.title;
    this.link = 'http://www.obudget.org/#budget/' + this.item.source.budget_code.slice(2, 10) + '/' +
        this.item.source.year_requested + '/main';
    this.entity_link = 'http://www.obudget.org/#entity/' + this.item.source.entity_id + '/2017/main';
  }

}

// entities Component
@Component({
  selector: 'search-result-entities',
  template: require('./search_result_entities.component.html'),
})
export class SearchResultEntitiesComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  link: string;
  title: string;
  description: string;
  goals: string;
  objective: string;

  constructor() { }
  ngOnInit() {

    this.details = 'לורם איפסום ' || this.item.source.title;
    this.link = 'http://www.obudget.org/#entity/' + this.item.source.id + '/2017/main';
    this.title =  this.item.source.name !== undefined  ? this.item.source.name : '';
    this.description =  this.item.source.details.description !== undefined ? this.item.source.details.description : '--';
    this.goals = this.item.source.details.goal !== undefined ? this.item.source.details.goal : '--';
    this.objective = this.item.source.details.objective !== undefined ? this.item.source.details.objective : '--';

  }

}

// people Component
@Component({
  selector: 'search-result-people',
  template: require('./search_result_people.component.html'),
})
export class SearchResultPeopleComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  link: string;
  entity_link: string;

  constructor() { }
  ngOnInit() {
    // this.details = 'לורם איפסום ' || this.item.source.title;
    // this.link = 'http://www.obudget.org/#budget/' + this.item.source.budget_code.slice(2, 10) + '/' +
        // this.item.source.year_requested + '/main';
    // this.entity_link = 'http://www.obudget.org/#entity/' + this.item.source.entity_id + '/2017/main';
  }
}
