/**
 * Created by adam on 18/12/2016.
 */
import { Component, Input, OnInit } from '@angular/core';
import { DocResultEntry } from '../_model/SearchResults';
import { KIND_PARAMETERS } from './kind_parameters';
let _ = require('lodash');

const gtag: any = window['gtag'];


// generic Component
@Component({
  selector: 'search-result',
  template: require('./search_result.component.html'),
})
export class SearchResultComponent implements OnInit {
  @Input() item: DocResultEntry;
  @Input() kind: string;
  @Input() index: number;
  parameters: any;

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

  selected(doc_id: string, event: any) {
    let href = 'http://next.obudget.org/i/' + doc_id;
    if (gtag) {
      gtag('event', 'view_item', {
        'event_label': doc_id,
        'value': this.index,
        'event_callback': () => window.open(href, '_self')
      });  
    } else {
      window.open(href, '_self');
    }
    if (event.stopPropagation) {
      event.stopPropagation();
    }
  }
}
