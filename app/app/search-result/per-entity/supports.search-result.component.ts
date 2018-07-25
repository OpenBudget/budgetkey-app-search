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
  tag () {
    return 'תמיכה תקציבית';
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

  label() {
    return 'סוג התמיכה:';
  }

  description() {
    return this.d['request_type'];
  }

  periodDetails() {
    let lastYear = this.d['last_payment_year'];
    if (!lastYear || lastYear === this.d['year_requested']) {
      return 'שנת תמיכה: ' + this.d['year_requested'];
    } else {
      return 'תקופת תמיכה: ' + this.d['year_requested'] + ' - ' + lastYear;
    }
  }

  lastPayment() {
    return this.d['payments'][this.d['payments'].length - 1];
  }
}
