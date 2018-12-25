import { Component } from '@angular/core';
import { SearchResultBaseComponent } from '../search-result-base/search-result-base.component';


@Component({
  selector: 'search-result-tenders',
  templateUrl: '../search-result-base/search-result-spending.component.html',
  styleUrls: ['./search-result-tenders.component.less']
})
export class SearchResultTendersComponent extends SearchResultBaseComponent {
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
