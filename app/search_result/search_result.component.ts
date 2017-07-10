/**
 * Created by adam on 18/12/2016.
 */
import { Component, Input, OnInit } from '@angular/core';
import { DocResultEntry } from '../_model/SearchResults';
let _ = require('lodash');
import { Highlighter } from '../highlighter/search.highlighter';

// budget Component
@Component({
  moduleId: module.id,
  selector: 'search-result-budget',
  providers: [Highlighter],
  template: require('./search_result_budget.component.html!text'),
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

  // Vars for Highlight component
  titleText: string;
  indexesToHighlight: number[];
  isTitleTextMatched: boolean;

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
    this.isTitleTextMatched = this.verifyTitleMatch();
    this.titleText = this.item.source.title;
    if (this.isTitleTextMatched) {
      this.indexesToHighlight = this.item.highlight.title[0];
    }
  }

  verifyTitleMatch() {
    if (this.item.highlight !== undefined && this.item.highlight.title !== undefined && this.item.highlight.title[0].length === 2) {
      return true;
    } else {
      return false;
    }
  }
}

// Changes Component
@Component({
  moduleId: module.id,
  selector: 'search-result-changes',
  providers: [Highlighter],
  template: require('./search_result_changes.component.html!text'),
})
export class SearchResultChangesComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  date: Date;

  constructor() { }
  ngOnInit() {
    this.details = 'לורם איפסום ' || this.item.source.title;
    let parts = this.item.source.date.split('/');
    this.date = new Date(parts[2], parts[1] - 1, parts[0]);
  }

}

// exemption Component
@Component({
  moduleId: module.id,
  selector: 'search-result-exemption',
  template: require('./search_result_exemption.component.html!text'),
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
    this.valid_link = this.item.source.entity_id !== null ? true : false;
  }
}

function isHighlightValid(highlightArray: number[]) {
  return (_.size(highlightArray) === 2);
}

function attrToParams(item: object, attr: string) {
  let highlightIndexes = _.get(item, ['highlight', attr, 0]),
    areIndexesValid = isHighlightValid(highlightIndexes);
  return {
    titleText: _.get(item, ['source', attr]),
    isTitleTextMatched: areIndexesValid,
    indexesToHighlight: areIndexesValid ? highlightIndexes : null
  };
}

function searchResultsTemplateParams(item: object) {
  let titleAttrs = ['entity_name', 'supplier_name'];
  return _.merge({
    details: 'לורם איפסום ' || _.get(item, ['source', 'title'])
  },
    titleAttrs.
      map(_.partial(attrToParams, item)).
      filter(_.property('isTitleTextMatched'))[0]
  );
}

// procurement Component
@Component({
  moduleId: module.id,
  selector: 'search-result-procurement',
  template: require('./search_result_procurement.component.html!text'),
})
export class SearchResultProcurementComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;

  // Vars for Highlight component
  titleText: string;
  indexesToHighlight: number[];
  isTitleTextMatched: boolean;

  constructor() { }

  ngOnInit() {
    _.assign(this, searchResultsTemplateParams(this.item));
  }

}

// supports Component
@Component({
  moduleId: module.id,
  selector: 'search-result-supports',
  template: require('./search_result_supports.component.html!text'),
})
export class SearchResultSupportsComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  link: string;
  entity_link: string;

  constructor() { }
  ngOnInit() {
    this.details = 'לורם איפסום ' || this.item.source.title;
    this.link = 'http://www.obudget.org/#budget/' + this.item.source.code.slice(2, 10) + '/' +
      this.item.source.year + '/main';
    this.entity_link = 'http://www.obudget.org/#entity/' + this.item.source.entity_id + '/2017/main';
  }

}

// entities Component
@Component({
  moduleId: module.id,
  selector: 'search-result-entities',
  template: require('./search_result_entities.component.html!text'),
})
export class SearchResultEntitiesComponent implements OnInit {
  @Input() item: DocResultEntry;
  details: string;
  link: string;

  // Vars for Highlight component
  titleText: string;
  indexesToHighlight: number[];
  isTitleTextMatched: boolean;

  constructor() { }
  ngOnInit() {

    this.details = 'לורם איפסום ' || this.item.source.title;
    this.link = 'http://www.obudget.org/#entity/' + this.item.source.id + '/2017/main';

    this.isTitleTextMatched = this.verifyTitleMatch();
    this.titleText = this.item.source.name;
    if (this.isTitleTextMatched) {
      this.indexesToHighlight = this.item.highlight.name[0];
    }
  }

  verifyTitleMatch() {
    if (this.item.highlight !== undefined && this.item.highlight.name !== undefined && this.item.highlight.name[0].length === 2) {
      return true;
    } else {
      return false;
    }
  }
}
