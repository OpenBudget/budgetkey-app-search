/**
 * Created by adam on 18/12/2016.
 */
import {Component, Input, OnInit} from '@angular/core';
import {DocResultEntry} from "./SearchResults";

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
