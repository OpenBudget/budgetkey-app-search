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
  startRange = '1992-01-01';
  endRange   = '2019-01-01'; // TODO convert to generic

  constructor(private http: Http) {}
  /**
   * search()
   *
   * @param {string} term      - new search term
   * @param {Number} pageSize  - how many records to return
   * @param {Number} pageNumber - how many pages to skip?
   * @param {Array<string>} kindsList - category to query - specific or all
   * @returns {Observable<SearchResults>}
   */

  search(term: string, pageSize: number, pageNumber: number, kindsList: Array<string> ): Observable<SearchResults> {
    let startTime: Date = new Date(); // update time-stamp
    let joinedkinds = kindsList.join(',');
    if (pageNumber == 0) {
      gtag('event', 'search', {'search_term': term, 'kinds': joinedkinds});
    }
    return this.http
      .get(`${URL}/${joinedkinds}/${term}/${this.startRange}/${this.endRange}/${pageSize}/${pageNumber}`)
      .map((r: Response) => {
          let endTime = new Date();
          console.log('req time: ', (endTime.getTime()  - startTime.getTime()) / 1000, 'sec');
          let ret: SearchResults = r.json();
          ret.term = term;
          ret.displayDocs = joinedkinds;
          ret.offset = pageSize * pageNumber;
          return ret;
      });
  }

}
