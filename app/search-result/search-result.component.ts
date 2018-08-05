/**
 * Created by adam on 18/12/2016.
 */
import { Component, Input, Inject } from '@angular/core';
import { DocResultEntry } from '../_model/SearchResults';
import { KIND_PARAMETERS } from './kind-parameters';
import { THEME_ID_TOKEN } from 'budgetkey-ng2-components';
let _ = require('lodash');

// generic Component
@Component({
  selector: 'search-result',
  template: require('./search-result.component.html'),
})
export class SearchResultComponent {
  @Input() item: DocResultEntry;
  @Input() index: number;
  @Input() kind: string;
  public parameters: any;

  constructor(@Inject(THEME_ID_TOKEN) private theme_id: any) { }
  ngOnInit() {
    for (let parameters of KIND_PARAMETERS) {
      if (this.item.source.doc_id.startsWith(parameters.docType)) {
        this.parameters = parameters;
        break;
      }
    }
  }

  get(field: string, default_value?: string) {
    if (field) {
      return _.get(this.item.source, field.split('.')) || default_value || '';
    }
    return default_value || '';
  }

  href(doc_id: string) {
    return 'http://next.obudget.org/i/' + doc_id + '?li=' + this.index + (this.theme_id ? '&theme=' + this.theme_id : '');
  }
}
