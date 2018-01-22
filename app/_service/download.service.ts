/**
 * Created by adam on 18/12/2016.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import { DocResultEntry } from '../_model/SearchResults';

@Injectable()
export class DownloadService {

  exportAsCsv(filename: string, allDocs: BehaviorSubject<DocResultEntry[]> ): void {
    let addTitle = function (type:string, hdrs: Array<string>){
      console.log(type);
      let title = type + '\n' + 'type';

      for (let h of hdrs){
        console.log(h);
        title += ',' + h;
      }
      return title + '\n';
    };
    // var processRow = function (row) {
    //     var finalVal = '';
    //     for (var j = 0; j < row.length; j++) {
    //         var innerValue = row[j] === null ? '' : row[j].toString();
    //         if (row[j] instanceof Date) {
    //             innerValue = row[j].toLocaleString();
    //         };
    //         var result = innerValue.replace(/"/g, '""');
    //         if (result.search(/("|,|\n)/g) >= 0)
    //             result = '"' + result + '"';
    //         if (j > 0)
    //             finalVal += ',';
    //         finalVal += result;
    //     }
    //     return finalVal + '\n';
    // };
    let csvFile = '';
    let headers4type = {'budget': ['title', 'page_title', 'amounts_allocated', 'amounts_executed', 'amounts_revised', 'explanation',
                                   'explanation_source', 'nice-breadcrumbs', 'hierarchy'],
                        'entities': ['name', 'page_title', 'received_amount', 'address lines',
                                     'details', 'description', 'goal', 'government'],
                        'nationalbudgetchanges': ['explanation', 'page_title', 'budget_code_title', 'amount'],
                        'supports': ['amount_total', 'entity_kind', 'entity_name', 'page_title', 'request_type', 'year_requested'], 
                        'contractspending': ['budget_code', 'budget_title', 'buyer_description', 'end_date', 'entity_id', 
                                             'entity_kind', 'entity_name', 'executed', 'exemption_reason', 'explanation',
                                             'page_title', 'purchase_method', 'supplier_name']};
    let keys = [];
    for (let key of allDocs.value){
      keys.push(key.type);
    }

    let unique =  keys.filter((v, i, a) => a.indexOf(v) === i && v !== 'tenders');
    console.log(unique);

    for (let key of unique){
      let headers = headers4type[key]
      csvFile += addTitle(key, headers); 
      for (let entry of allDocs.value){
        if (entry.type === key) {
          csvFile += key; 
          for (let h of headers){
            csvFile += ',' + entry.source[h]; 
          }
          csvFile += '\n'; 
        }
      }
      csvFile += '\n\n'; 
    }
    // var csvFile = '';
    // // for (var i = 0; i < rows.length; i++) {
    // //     csvFile += processRow(rows[i]);
    // // }
    // // csvFile += results
    let blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        let link = document.createElement('a');
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
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
