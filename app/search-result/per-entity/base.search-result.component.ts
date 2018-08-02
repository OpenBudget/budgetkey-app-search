/**
 * Created by adam on 18/12/2016.
 */
import { Component, Input, Inject } from '@angular/core';
import { DocResultEntry } from '../../_model/SearchResults';
import { THEME_ID_TOKEN } from 'budgetkey-ng2-components';

// generic Component
@Component({
})
export class BaseSearchResultComponent {
  @Input() item: DocResultEntry;
  @Input() kind: string;
  @Input() index: number;
  parameters: any;
  d: any;

  constructor(@Inject(THEME_ID_TOKEN) protected theme_id: any) { }

  href() {
    let doc_id = this.d['doc_id'];
    return 'http://next.obudget.org/i/' + doc_id + '?li=' + this.index + (this.theme_id ? '&theme=' + this.theme_id : '');
  }

  navigate() {
    window.location.href = this.href();
  }

  ngOnInit() {
    this.d = this.item.source || {};
  }

  format_number(x: number) {
    if (x) {
      let fracDigits = 0;
      if (x < 1000) {
        fracDigits = 2;
      }
      return '<span class="number">' +
                x.toLocaleString('en-US', {style: 'decimal',
                                           maximumFractionDigits: fracDigits}) +
             '</span>';
    } else {
      return '-';
    }
  }
}
