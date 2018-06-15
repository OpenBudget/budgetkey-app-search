/**
 * Created by adam on 18/12/2016.
 */
import { Component } from '@angular/core';
import { BaseSearchResultComponent } from './base.search-result.component';

// generic Component
@Component({
  selector: 'search-result-contractspending',
  template: require('./spending.search-result.component.html')
})
export class ContractSpendingSearchResultComponent extends BaseSearchResultComponent {
  tag () {
    return 'התקשרות';
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
    let r = 'תקופת ההתקשרות ';
    if (this.d['order_date']) {
      r += this.d['order_date'] + ' - ';
      if (this.d['end_date']) {
        r += this.d['end_date'];
      } else if (this.d['contract_is_active']) {
        r += 'התקשרות פעילה';
      } else {
        r += 'התקשרות לא פעילה';
      }
    } else if (this.d['contract_is_active']) {
      r += 'התקשרות פעילה';
    } else {
      r += 'התקשרות לא פעילה';
    }
    return r;
  }
}
