/**
 * Created by adam on 18/12/2016.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { URL } from '../_config/config';  // 'http://next.obudget.org/search';
import { SearchResults } from '../_model/SearchResults';

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

  search(term: string, startRange: string, endRange: string, pageSize: number, offset: number,
    kindsList: Array<string> ): Observable<SearchResults> {
    let startTime: Date = new Date(); // update time-stamp
    let joinedkinds = kindsList.join(',');
    if (offset === 0) {
      if (gtag) {
        gtag('event', 'search', {'search_term': term, 'kinds': joinedkinds});
      }
    }
    return this.http
      .get(`${URL}/${joinedkinds}/${encodeURIComponent(term)}/${startRange}/${endRange}/${pageSize}/${offset}`)
      .map((r: Response) => {
          let endTime = new Date();
          console.log('req time: ', (endTime.getTime()  - startTime.getTime()) / 1000, 'sec');
          let ret: SearchResults = r.json();
          ret.term = term;
          ret.displayDocs = joinedkinds;
          ret.offset = offset;
          ret.pageSize = pageSize;
          return ret;
      });
  }
}
