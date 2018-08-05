/**
 * Created by adam on 18/12/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { URL } from '../_config/config';  // 'http://next.obudget.org/search';
import { SearchResults } from '../_model/SearchResults';
import { SearchBarType } from 'budgetkey-ng2-components/src/components';
import { SearchParams } from '../_model/SearchParams';

const gtag: any = window['gtag'];

@Injectable()
export class SearchService {

  constructor(private http: Http) {}
  /**
   * search()
   *
   * @param {string} term      - new search term
   * @param {string} startRange
   * @param {string} endRange
   * @param {Number} pageSize  - how many records to return
   * @param {Number} offset - how many records to skip?
   * @param {Array<string>} kindsList - category to query - specific or all
   * @returns {Observable<SearchResults>}
   */

  search(sp: SearchParams): Observable<SearchResults> {
    let startTime: Date = new Date(); // update time-stamp
    let joinedkinds = sp.displayDocsTypes.join(',');
    if (sp.offset === 0) {
      if (gtag) {
        gtag('event', 'search', {'search_term': sp.term, 'kinds': joinedkinds});
      }
    }

    let url = `${URL}/${joinedkinds}/${encodeURIComponent(sp.term)}/${sp.startRange}/${sp.endRange}/${sp.pageSize}/${sp.offset}`;
    if (sp.filters) {
      sp.filters = JSON.stringify(sp.filters).slice(1, -1);
      url += '?filter=' + encodeURIComponent(sp.filters);
    }
    return this.http
      .get(url)
      .map((r: Response) => {
          let endTime = new Date();
          console.log('req search time: ', (endTime.getTime()  - startTime.getTime()) / 1000, 'sec');
          let ret: SearchResults = r.json();
          ret.term = sp.term;
          ret.displayDocs = joinedkinds;
          ret.offset = sp.offset;
          ret.pageSize = sp.pageSize;
          ret.params = sp;
          return ret;
      });
  }

  count(term: string, startRange: string, endRange: string,
        types: SearchBarType[]): Observable<SearchResults> {
    let startTime: Date = new Date(); // update time-stamp
    let url = `${URL}/count/${encodeURIComponent(term)}/${startRange}/${endRange}`;
    let config = types
      .map((t: SearchBarType) => {
        return {
          id: t.id,
          doc_types: t.types,
          filters: t.filters || {}
        };
    });
    let config_param = JSON.stringify(config);
    url += '?config=' + encodeURIComponent(config_param);
    return this.http
      .get(url)
      .map((r: Response) => {
          let endTime = new Date();
          console.log('req count time: ', (endTime.getTime()  - startTime.getTime()) / 1000, 'sec');
          let ret: SearchResults = r.json();
          ret.term = term;
          return ret;
      });
  }

  timeline(sp: SearchParams): Observable<any> {

    let joinedkinds = sp.displayDocsTypes.join(',');
    let startTime: Date = new Date(); // update time-stamp
    let url = `${URL}/timeline/${joinedkinds}/${encodeURIComponent(sp.term)}/${sp.startRange}/${sp.endRange}`;
    if (sp.filters) {
      let filter = JSON.stringify(sp.filters);
      url += '?filter=' + encodeURIComponent(filter);
    }
    return this.http
      .get(url)
      .map((r: Response) => {
          let endTime = new Date();
          console.log('req count time: ', (endTime.getTime()  - startTime.getTime()) / 1000, 'sec');
          let ret: any = r.json();
          return ret;
      });
  }

}
