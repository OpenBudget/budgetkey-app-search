/**
 * Created by adam on 18/12/2016.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import { DocResultEntry } from '../_model/SearchResults';
import * as Papa from 'papaparse';


@Injectable()
export class DownloadService {

  exportAsCsv(filename: string, allDocs: BehaviorSubject<DocResultEntry[]> ): void {
    let csvFile = '';
    let headers4type = {'budget': ['title', 'page_title', 'amounts_allocated', 'amounts_executed', 'amounts_revised', 'explanation',
                                   'explanation_source', 'nice-breadcrumbs', 'hierarchy'],
                        'entities': ['name', 'page_title', 'received_amount', 'address lines',
                                     'details', 'description', 'goal', 'government'],
                        'national-budget-changes': ['explanation', 'page_title', 'budget_code_title', 'amount'],
                        'supports': ['amount_total', 'entity_kind', 'entity_name', 'page_title', 'request_type', 'year_requested'],
                        'contract-spending': ['budget_code', 'budget_title', 'buyer_description', 'end_date', 'entity_id',
                                             'entity_kind', 'entity_name', 'executed', 'exemption_reason', 'explanation',
                                             'page_title', 'purchase_method', 'supplier_name']};

    let keys = [];
    for (let key of allDocs.value){
      keys.push(key.type);
    }
    let unique =  keys.filter((v, i, a) => a.indexOf(v) === i && v !== 'tenders');

    for (let key of unique){
      csvFile += '\n' + key + '\n';
      let headers = headers4type[key];
      let data_array = new Array();
      for (let entry of allDocs.value){
        if (entry.type === key) {
          let tmp = new Array();
          for (let h of headers){
            tmp.push(entry.source[h]);
          }
          data_array.push(tmp);
        }
      }
      data_array.push(new Array(headers.length).fill(null)); // adds an extra line between types
      csvFile += Papa.unparse({
        fields: headers,
        data: data_array});
    }

    let blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        let link = document.createElement('a');
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            let url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

}
