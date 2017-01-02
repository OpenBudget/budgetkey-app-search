/**
 * Created by adam on 18/12/2016.
 */
import {Component, Input, OnInit} from '@angular/core';
import {DocResultEntry} from "./SearchResults";

@Component({
    moduleId: module.id,
    selector: 'search-result-budget',
    template: require('./search_result_budget.component.html!text'),
    styles: [`
        .item {
            background: white;
            margin: 2px 20px;
            padding: 4px 10px;
        }

        .header {
            display: block;
            width: 100%;
        }

        .code {
            color: #999;
            font-size: 1em;
        }

        .title {
            font-weight: bold;
            color: #000;
            font-size: 1.5em;
        }

        .amount {
        }

        .details {
            display: block;
            width: 100%;
            color: #999;
        }
     `
    ]
})
export class SearchResultBudgetComponent implements OnInit {

  @Input() item: DocResultEntry;

  details: string;

  constructor() {}

  ngOnInit() {
    this.details = "לורם איפסום " + this.item.source.title;
  }

}
