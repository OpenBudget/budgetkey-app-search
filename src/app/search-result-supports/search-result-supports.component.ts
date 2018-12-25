import { Component, OnInit } from '@angular/core';
import { SearchResultBaseComponent } from '../search-result-base/search-result-base.component';

@Component({
  selector: 'search-result-supports',
  templateUrl: '../search-result-base/search-result-spending.component.html',
  styleUrls: ['./search-result-supports.component.less']
})
export class SearchResultSupportsComponent extends SearchResultBaseComponent {
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
