/**
 * Created by adam on 18/12/2016.
 */
import { Component } from '@angular/core';
import { BaseSearchResultComponent } from './base.search-result.component';

import * as _ from 'lodash';

// generic Component
@Component({
  selector: 'search-result-entities',
  template: require('./entities.search-result.component.html'),
})
export class EntitiesSearchResultComponent extends BaseSearchResultComponent {

  amount() {
    if (this.theme_id === 'socialmap' && this.d['details']['yearly_turnover']) {
      return this.d['details']['yearly_turnover'];
    }
    return this.d['received_amount'];
  }


  amount_description() {
    if (this.theme_id === 'socialmap' && this.d['details']['yearly_turnover']) {
      if (this.d['details']['last_report_year']) {
        return 'מחזור כספי שנתי<br/>לשנת ' + this.d['details']['last_report_year'];
      } else {
        return 'מחזור כספי שנתי<br/>לשנת הדיווח האחרונה';
      }
    }
    return 'כספי מדינה שקיבל ב-3<br/>השנים האחרונות';
  }

}
