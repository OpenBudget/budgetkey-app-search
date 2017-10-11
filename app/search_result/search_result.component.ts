/**
 * Created by adam on 18/12/2016.
 */
import { Component, Input, OnInit } from '@angular/core';
import { DocResultEntry } from '../_model/SearchResults';
let _ = require('lodash');


let KIND_PARAMETERS = [
  {
    docType: 'org/company',
    label: 'חברה',
    labelField: 'details.type',
    mainNameField: 'name',
    secondaryNameField: 'id',
    amountField: 'amount_received',
    firstItemField: 'details.goal',
    firstItemLabel: 'מטרה',
    secondItemField: 'details.city',
    secondItemLabel: 'כתובת'
  },
  {
    docType: 'org/association',
    label: 'עמותה',
    labelField: 'details.type',
    mainNameField: 'name',
    secondaryNameField: 'id',
    amountField: 'amount_received',
    firstItemField: 'details.objective',
    firstItemLabel: 'מטרה',
    secondItemField: 'details.address',
    secondItemLabel: 'כתובת'
  },
  {
    docType: 'org',
    label: 'ארגון',
    labelField: 'details.type',
    mainNameField: 'name',
    secondaryNameField: 'id',
    amountField: 'amount_received',
  },
  {
    docType: 'budget',
    label: 'סעיף תקציבי',
    breadcrumbsField: 'hierarchy',
    categoryField: 'func_cls_title_1.0',
    mainNameField: 'title',
    secondaryNameField: 'code',
    amountField: 'net_allocated',
    firstItemField: 'econ_cls_title_1.0',
    firstItemLabel: 'מיון כלכלי'
  },
  {
    docType: 'supports',
    label: 'תמיכה ממשלתית',
    mainNameField: 'payments.0.support_title',
    fromField: 'payments.0.supporting_ministry',
    toField: 'recipient',
    amountField: 'amount_total',
    firstItemField: 'year_requested',
    firstItemLabel: 'שנת בקשה'
  },
  {
    docType: 'contract-spending',
    label: 'התקשרות',
    mainNameField: 'purpose',
    fromField: 'publisher.0',
    toField: 'supplier_name.0',
    amountField: 'volume',
    firstItemField: 'budget_title',
    firstItemLabel: 'מסעיף תקציבי'
  },
  {
    docType: 'tenders/exemptions',
    label: 'בקשת פטור ממכרז',
    mainNameField: 'regulation',
    secondaryNameField: 'decision',
    fromField: 'publisher',
    toField: 'supplier',
    amountField: 'volume',
    firstItemField: 'description',
    firstItemLabel: 'תאור'
  },
  {
    docType: 'tenders/office',
    label: 'מכרז משרדי',
    mainNameField: 'subjects',
    secondaryNameField: 'decision',
    fromField: 'publisher',
    toField: 'supplier',
    amountField: 'volume',
    firstItemField: 'description',
    firstItemLabel: 'תאור'
  },
  {
    docType: 'tenders/central',
    label: 'מכרז מרכזי',
    mainNameField: 'page_title',
    secondaryNameField: 'decision',
    amountField: 'volume',
    firstItemField: 'subjects',
    firstItemLabel: 'נושאים'
  },
  {
    docType: '',
    label: 'אחר?',
    mainNameField: 'doc_id',
  }
];

// generic Component
@Component({
  selector: 'search-result',
  template: require('./search_result.component.html'),
})
export class SearchResultComponent implements OnInit {
  @Input() item: DocResultEntry;
  @Input() kind: string;
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

  get(field: string) {
    if (field) {
      return _.get(this.item.source, field.split('.'));
    }
    return '';
  }
}
