import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URL } from './config';
import { SearchResults, SearchParams } from './model';
import { SearchBarType } from 'budgetkey-ng2-components';

const gtag: any = window['gtag'];

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  search(sp: SearchParams): Observable<SearchResults> {
    const startTime: Date = new Date(); // update time-stamp
    const joinedkinds = sp.displayDocsTypes.join(',');
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
      .pipe(
        map((r: any) => {
          const endTime = new Date();
          console.log('req search time: ', (endTime.getTime()  - startTime.getTime()) / 1000, 'sec');
          const ret = <SearchResults>r;
          ret.term = sp.term;
          ret.displayDocs = joinedkinds;
          ret.offset = sp.offset;
          ret.pageSize = sp.pageSize;
          ret.params = sp;
          return ret;
        })
      );
  }

  count(term: string, startRange: string, endRange: string,
        types: SearchBarType[]): Observable<SearchResults> {
    const startTime: Date = new Date(); // update time-stamp
    let url = `${URL}/count/${encodeURIComponent(term)}/${startRange}/${endRange}`;
    const config = types
      .map((t: SearchBarType) => {
        return {
          id: t.id,
          doc_types: t.types,
          filters: t.filters || {}
        };
    });
    const config_param = JSON.stringify(config);
    url += '?config=' + encodeURIComponent(config_param);
    return this.http
      .get(url)
      .pipe(
        map((r: any) => {
          const endTime = new Date();
          console.log('req count time: ', (endTime.getTime()  - startTime.getTime()) / 1000, 'sec');
          const ret = <SearchResults>r;
          ret.term = term;
          return ret;
        })
      );
  }

  timeline(sp: SearchParams): Observable<any> {

    const joinedkinds = sp.displayDocsTypes.join(',');
    const startTime: Date = new Date(); // update time-stamp
    let url = `${URL}/timeline/${joinedkinds}/${encodeURIComponent(sp.term)}/${sp.startRange}/${sp.endRange}`;
    if (sp.filters) {
      const filter = JSON.stringify(sp.filters);
      url += '?filter=' + encodeURIComponent(filter);
    }
    return this.http
      .get(url)
      .pipe(
        map((r: any) => {
          const endTime = new Date();
          console.log('req count time: ', (endTime.getTime()  - startTime.getTime()) / 1000, 'sec');
          return r;
        })
      );
  }

}
