/**
 * Created by adam on 18/12/2016.
 */
import { Component, Input, OnInit } from '@angular/core';
import { DocResultEntry } from '../_model/SearchResults';
import { KIND_PARAMETERS } from './kind_parameters';
import { GENERIC_ITEM_BASE_URL } from '../_config/config';
let _ = require('lodash');


// generic Component
@Component({
  selector: 'search-result',
  template: require('./search_result.component.html'),
})
export class SearchResultComponent implements OnInit {
  @Input() item: DocResultEntry;
  @Input() kind: string;
  parameters: any;
  genericItemBaseUrl: any = GENERIC_ITEM_BASE_URL;

  constructor() { }
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
}
