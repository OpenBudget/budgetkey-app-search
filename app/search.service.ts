/**
 * Created by adam on 18/12/2016.
 */
import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {join} from "lodash";

import {URL} from "./config";
import {SearchResults} from "./SearchResults";


@Injectable()
export class SearchService {
  startTime = '1992-01-01';
  endTime = '2019-01-01';

  
  private time : Date;

  constructor(private http : Http) {
      this.time = new Date();

  }

  search(term: string, pageSize: Number, kinds: Array<string> ): Observable<SearchResults> {
    this.time = new Date();
    let joinedkinds = join(kinds, ',');
    return this.http
      .get(`${URL}/${joinedkinds}/${term}/${this.startTime}/${this.endTime}/${pageSize}/0`)
      .map((r: Response) => {
        var new_time = new Date();
        console.log('req time: ', (new_time.getTime()  - this.time.getTime())/1000, 'sec');
        return r.json() as SearchResults;
           })
      .catch((e, _) => {
        console.log('Failed to perform request', e);
        return Observable.of<SearchResults>(null);
      });
  }

}
