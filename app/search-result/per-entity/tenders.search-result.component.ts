/**
 * Created by adam on 18/12/2016.
 */
import { Component } from '@angular/core';
import { BaseSearchResultComponent } from './base.search-result.component';

// generic Component
@Component({
  selector: 'search-result-tenders',
  template: require('./spending.search-result.component.html')
})
export class TendersSearchResultComponent extends BaseSearchResultComponent {
  tag() {
    return this.d['tender_type_he'];
  }

  tag2() {
    return this.d['simple_decision'];
  }

  title() {
    return this.d['description'];
  }

  publisher() {
    return this.d['publisher'];
  }

  supplier() {
    return this.d['awardees_text'];
  }

  volume() {
    return this.d['volume'] || this.d['contract_volume'];
  }

  label() {
    if (this.d['tender_type'] === 'exemptions') {
      return 'סיבת הפטור';
    }
  }

  description() {
    return this.d['regulation'];
  }

  periodDetails() {
    const r = [];
    if (this.d['tender_type'] === 'exemptions') {
      r.push('תקופת פטור');
      if (this.d['start_date']) {
        let rr = this.d['start_date'] + ' - ';
        if (this.d['end_date']) {
          rr += this.d['end_date'];
        }
        r.push(rr);
      }
    }
    return r;
  }
}
