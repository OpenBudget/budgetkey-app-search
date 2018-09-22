/**
 * Created by adam on 18/12/2016.
 */
import { Component } from '@angular/core';
import { BaseSearchResultComponent } from './base.search-result.component';

// generic Component
@Component({
  selector: 'search-result-contract-spending',
  template: require('./spending.search-result.component.html')
})
export class ContractSpendingSearchResultComponent extends BaseSearchResultComponent {
  tag() {
    return 'התקשרות';
  }

  tag2() {
    return this.d['contract_is_active'] ? 'פעילה' : 'הסתיימה';
  }

  title() {
    return this.d['purpose'];
  }

  publisher() {
    return this.d['publisher_name'];
  }

  supplier() {
    return this.d['entity_name'] || this.d['supplier_name'][0];
  }

  volume() {
    return this.d['volume'] || this.d['contract_volume'];
  }

  label() {
    return 'אופן הרכש';
  }

  description() {
    return this.d['purchase_method'] && this.d['purchase_method'].length > 0 ? this.d['purchase_method'][0] : '';
  }

  periodDetails() {
    let r: string[] = [];
    if (this.d['order_date']) {
      r.push('תקופת ההתקשרות')
      let rr = this.d['order_date'] + ' - ';
      if (this.d['end_date']) {
        rr += this.d['end_date'];
      } else if (this.d['contract_is_active']) {
        rr += 'התקשרות פעילה';
      } else {
        rr += 'התקשרות לא פעילה';
      }
      r.push(rr);
    } else if (this.d['contract_is_active']) {
      r.push('התקשרות פעילה');
    } else {
      r.push('התקשרות לא פעילה');
    }
    return r;
  }
}
