/**
 * Created by adam on 18/12/2016.
 */
import { Component, OnInit} from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { BehaviorSubject }           from 'rxjs/BehaviorSubject';

import { SearchService }     from './search.service'
import { SearchResults, DocResultEntry}     from './SearchResults'

@Component({
    moduleId: module.id,
    selector: 'budget-search',
    template: require('./search.component.html!text'),
    styles: [ require('./search.component.css!text') ],
    providers: [SearchService]
})
export class SearchComponent implements OnInit {
  
  resultCount: {total: number;
                entities: number;
                exemption: number;
                budget: number;
                supports: number;
                changes: number;}
  private displayDocs: string = 'all';
  // resultCount: Object;
  searchResults: Observable<SearchResults>;
  private budgetDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private changeDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private exemptionDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private supportsDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private entitiesDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) {
    // for (let key in this.resultCount){
    //   console.log(key);
      // this.resultCount[key]= 0
    // }
    this.resultCount = { total:0,   
                       entities: 0,
                       exemption: 0, 
                       budget: 0,
                       supports : 0,
                       changes: 0}
  }

  
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  doRequest(term: string) {
    console.log(term);
    if (term) {
      return this.searchService.search(term);
    } else {
      return Observable.of<SearchResults>(null);
    }
  }

  ngOnInit() {
    this.searchResults = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => this.doRequest(term))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<SearchResults>(null);
      });
    this.searchResults.subscribe((results) => {
        console.log('DASDASDAS', results);
        
        if (results){
          this.resultCount.total = 0;
            for (let key in results){
              if (key){
                var tmpResults = results[key];
                var tmpDocs = key+'Docs';
                this.resultCount.total += Number(tmpResults.total_overall);
                this.resultCount[key] = Number(tmpResults.total_overall);
                this[tmpDocs].next(tmpResults.docs)
              }
            }
          }
          console.log(this.resultCount);
      });
    this.search('חינוך');
  }

}
