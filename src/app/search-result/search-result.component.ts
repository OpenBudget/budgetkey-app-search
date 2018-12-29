import { Component, Input, Inject, OnInit } from '@angular/core';

import { THEME_ID_TOKEN } from 'budgetkey-ng2-components';

import { DocResultEntry } from '../model';
import { KIND_PARAMETERS } from '../kind-parameters';


@Component({
  selector: 'search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less']
})
export class SearchResultComponent implements OnInit {

  @Input() item: DocResultEntry;
  @Input() index: number;
  @Input() kind: string;
  @Input() mobileView = false;

  public parameters: any;

  constructor(@Inject(THEME_ID_TOKEN) private theme_id: any) { }
  ngOnInit() {
    for (const parameters of KIND_PARAMETERS) {
      if (this.item.source.doc_id.startsWith(parameters.docType)) {
        this.parameters = parameters;
        break;
      }
    }
  }

  get_field(item: any, parts: string[]) {
    while (item && parts.length > 0) {
      const part = parts.shift();
      item = item[part];
    }
    return item;
  }

  get(field: string, default_value?: string) {
    if (field) {
      return this.get_field(this.item.source, field.split('.')) || default_value || '';
    }
    return default_value || '';
  }

  href(doc_id: string) {
    return 'http://next.obudget.org/i/' + doc_id + '?li=' + this.index + (this.theme_id ? '&theme=' + this.theme_id : '');
  }
}
