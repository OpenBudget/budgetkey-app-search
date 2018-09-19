/**
 * Created by adam on 18/12/2016.
 */
import { Component } from '@angular/core';
import { BaseSearchResultComponent } from './base.search-result.component';

// generic Component
@Component({
  selector: 'search-result-supports',
  template: require('./spending.search-result.component.html')
})
export class SupportsSearchResultComponent extends BaseSearchResultComponent {
  tag() {
    return 'תמיכה תקציבית';
  }

  tag2() {
    return this.d['request_type'] === 'א3' ? '3' + 'א' : this.d['request_type'];
  }

  title() {
    return this.lastPayment()['support_title'];
  }

  publisher() {
    return this.lastPayment()['supporting_ministry'];
  }

  supplier() {
    return this.d['entity_name'] || this.d['recipient'];
  }

  volume() {
    return this.d['amount_total'];
  }

  label() {}

  description() {}

  periodDetails() {
    let lastYear = this.d['last_payment_year'];
    if (!lastYear || lastYear === this.d['year_requested']) {
      return ['שנת תמיכה:', ''+this.d['year_requested']];
    } else {
      return ['תקופת תמיכה:', this.d['year_requested'] + ' - ' + lastYear];
    }
  }

  lastPayment() {
    return this.d['payments'][this.d['payments'].length - 1];
  }
}
