import { Component } from '@angular/core';
import { SearchResultBaseComponent } from '../search-result-base/search-result-base.component';

import * as _ from 'lodash';

@Component({
  selector: 'search-result-budget',
  templateUrl: './search-result-budget.component.html',
  styleUrls: ['./search-result-budget.component.less']
})
export class SearchResultBudgetComponent extends SearchResultBaseComponent {

  func_cls() {
    try {
      return JSON.parse(this.d['func_cls_json'][0]);
    } catch (e) {
      console.log('WTF with ', this.d['func_cls_json']);
      return 'x';
    }
  }

  top_children() {
    if (!this.d['children']) {
      return null;
    }
    let ret = _.map(
      _.sortBy(this.d['children'],
               (c) => -c['net_revised']),
      (c) => c['title']
    ).slice(0, 3).join(', ');
    if (this.d['children'].length > 3) {
      ret += ' ועוד';
    }
    return ret;
  }
}
