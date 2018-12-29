import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { URL } from './config';
import { SearchResults, SearchParams } from './model';
import { SearchBarType } from 'budgetkey-ng2-components';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private cache: any = window['CACHE'] || {};

  constructor(private http: HttpClient) {}

  search(sp: SearchParams): Observable<SearchResults> {
    const startTime: Date = new Date(); // update time-stamp
    const joinedKinds = sp.docType.types.join(',');

    let url = `${URL}/${joinedKinds}`;
    url += `?size=${sp.pageSize}&offset=${sp.offset}`;
    if (sp.term) {
      url += `&q=${encodeURIComponent(sp.term)}`;
    }
    if (sp.period) {
      url += `&from_date=${sp.period.start}&to_date=${sp.period.end}`;
    }
    if (sp.filters) {
      const filters = JSON.stringify(sp.filters).slice(1, -1);
      url += '&filter=' + encodeURIComponent(filters);
    }
    if (sp.ordering) {
      url += `&order=${sp.ordering}`;
    }

    if (this.cache[url]) {
      const ret = this.cache[url];
      ret.params = sp;
      console.log('HIT!');
      return of(this.cache[url]);
    }

    return this.http
      .get(url)
      .pipe(
          map((r: any) => {
              const endTime = new Date();
              console.log('req search time: ', (endTime.getTime()  - startTime.getTime()) / 1000, 'sec');
              const ret = <SearchResults>r;
              this.cache[url] = ret;
              console.log(Object.keys(this.cache));
              ret.params = sp;
              return ret;
          })
      );
  }

  count(sp: SearchParams, types: SearchBarType[]): Observable<SearchResults> {
    const startTime: Date = new Date(); // update time-stamp
    let url = `${URL}/count`;

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
    if (sp.term) {
      url += `&q=${encodeURIComponent(sp.term)}`;
    }
    if (sp.period && sp.period.value !== 'all') {
      url += `&from_date=${sp.period.start}&to_date=${sp.period.end}`;
    }

    if (this.cache[url]) {
      const ret = this.cache[url];
      ret.params = sp;
      console.log('HIT!');
      return of(this.cache[url]);
    }

    return this.http
      .get(url)
      .pipe(
        map((r: any) => {
          const endTime = new Date();
          console.log('req count time: ', (endTime.getTime()  - startTime.getTime()) / 1000, 'sec');
          const ret = <SearchResults>r;
          this.cache[url] = ret;
          window['cache'] = this.cache;
          ret.params = sp;
          return ret;
        })
      );
  }

  // timeline(sp: SearchParams): Observable<any> {

  //   const joinedkinds = sp.displayDocsTypes.join(',');
  //   const startTime: Date = new Date(); // update time-stamp
  //   let url = `${URL}/timeline/${joinedkinds}/${encodeURIComponent(sp.term)}/${sp.startRange}/${sp.endRange}`;
  //   if (sp.filters) {
  //     const filter = JSON.stringify(sp.filters);
  //     url += '?filter=' + encodeURIComponent(filter);
  //   }
  //   return this.http
  //     .get(url)
  //     .pipe(
  //       map((r: any) => {
  //         const endTime = new Date();
  //         console.log('req count time: ', (endTime.getTime()  - startTime.getTime()) / 1000, 'sec');
  //         return r;
  //       })
  //     );
  // }

}
