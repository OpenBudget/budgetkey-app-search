/**
 * Created by adam on 18/12/2016.
 */
import {Component, Input, OnInit} from '@angular/core';
import {DocResultEntry} from "../_model/SearchResults";
import {Highlighter} from "../highlighter/search.highlighter";

@Component({
    moduleId: module.id,
    selector: 'search-result-budget',
    providers: [Highlighter],
    template: require('./search_result_budget.component.html!text'),
})

export class SearchResultBudgetComponent implements OnInit {

  @Input() item: DocResultEntry;

  details: string;
  changePerc: number;
  link: string;

  // Vars for Highlight component
  titleText: string;
  indexesToHighlight: number[];
  titleTextMatch: boolean;

  constructor() {}

  ngOnInit() {
    this.details = "לורם איפסום " || this.item.source.title;
    this.changePerc = this.item.source.net_revised*100 / this.item.source.net_allocated;
    this.link = "http://www.obudget.org/#budget/"+this.item.source.code.slice(2,10) +"/"+
                this.item.source.year +"/main";

    this.titleTextMatch = this.verifyTitleMatch();
    this.titleText = this.item.source.title;
    if (this.titleTextMatch){
      this.indexesToHighlight = this.item.highlight.title[0];
    }
  }

  verifyTitleMatch(){
    if (this.item.highlight != undefined && this.item.highlight.title != undefined && this.item.highlight.title[0].length == 2){
      return true;
    } else {
      return false;
    }
  }
}

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

  // Vars for Highlight component
  titleText: string;
  indexesToHighlight: number[];
  titleTextMatch: boolean;

  constructor() {}

  ngOnInit() {
    debugger;
    this.details = "לורם איפסום " || this.item.source.title;
    var parts = this.item.source.date.split('/');
    this.date = new Date(parts[2],parts[1]-1,parts[0]); 

    this.titleTextMatch = true;
    this.titleText = this.item.source.title;
    if (this.titleTextMatch){
      this.indexesToHighlight = this.item.highlight.title[0];
    }
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
  entity_link: string;
  valid_link: boolean;

  constructor() {}

  ngOnInit() {
    this.details = "לורם איפסום " || this.item.source.title;
    this.entity_link = "http://www.obudget.org/#entity/"+this.item.source.entity_id  +"/2017/main" ;
    this.valid_link = this.item.source.entity_id !== null ? true : false;
                      

  }

}

@Component({
  moduleId: module.id,
  selector: 'search-result-procurement',
  template: require('./search_result_procurement.component.html!text'),
})

export class SearchResultProcurementComponent implements OnInit {

  @Input() item: DocResultEntry;

  details: string;

  constructor() {}

  ngOnInit() {
    this.details = "לורם איפסום " || this.item.source.title;
  }

}

@Component({
  moduleId: module.id,
  selector: 'search-result-supports',
  template: require('./search_result_supports.component.html!text'),
})

export class SearchResultSupportsComponent implements OnInit {

  @Input() item: DocResultEntry;

  details: string;
  link: string;
  entity_link:  string;
  constructor() {}

  ngOnInit() {
    this.details = "לורם איפסום " || this.item.source.title;
    this.link = "http://www.obudget.org/#budget/"+this.item.source.code.slice(2,10) +"/"+
                this.item.source.year +"/main";
    this.entity_link =  "http://www.obudget.org/#entity/"+this.item.source.entity_id  +"/2017/main";
  }

}

@Component({
  moduleId: module.id,
  selector: 'search-result-entities',
  template: require('./search_result_entities.component.html!text'),
})

export class SearchResultEntitiesComponent implements OnInit {

  @Input() item: DocResultEntry;

  details: string;
  link: string;

  constructor() {}

  ngOnInit() {
    this.details = "לורם איפסום " || this.item.source.title;
    this.link = "http://www.obudget.org/#entity/"+this.item.source.id  +"/2017/main";
  }

}
