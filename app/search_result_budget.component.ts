/**
 * Created by adam on 18/12/2016.
 */
import {Component, Input, OnInit} from '@angular/core';
import {DocResultEntry} from "./SearchResults";

@Component({
    moduleId: module.id,
    selector: 'search-result-budget',
    template: `
        <div class="row">
            <div class="item col-md-12">
              <span class="header row">
                  <span class="col-md-8">
                    <span class="code">{{item.source.code}}</span>
                    <span class="title">{{item.source.title}}</span>                  
                  </span>
                  <span class="col-md-4">
                    <span class="amount pull-left">
                        ₪{{item.source.net_allocated}}                    
                    </span>
                  </span>
                  <span class="details col-md-12">
                    {{ details }}
                  </span>
              </span>            
            </div>
        </div>
    `,
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
            font-weight: bold;
            color: #fc0;
            font-size: 1.1em;
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
    this.details = "לורם איפסום" + this.item.source.title;
  }

}
