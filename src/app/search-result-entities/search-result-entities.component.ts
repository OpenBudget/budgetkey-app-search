
import { Component } from '@angular/core';
import * as _ from 'lodash';
import { SearchResultBaseComponent } from '../search-result-base/search-result-base.component';

@Component({
  selector: 'search-result-entities',
  templateUrl: './search-result-entities.component.html',
  styleUrls: ['./search-result-entities.component.less']
})
export class SearchResultEntitiesComponent extends SearchResultBaseComponent {

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
