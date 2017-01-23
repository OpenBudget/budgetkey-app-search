/**
 * Created by adam on 18/12/2016.
 */
import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { BehaviorSubject }           from 'rxjs/BehaviorSubject';

import { SearchService }     from './search.service'
import { SearchResults, DocResultEntry }     from './SearchResults'

@Component({
    moduleId: module.id,
    selector: 'budget-search',
    template: require('./search.component.html!text'),
    styles: [ require('./search.component.css!text') ],
    providers: [SearchService]
})
export class SearchComponent implements OnInit {

  searchResults: Observable<SearchResults>;
  private budgetDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private changeDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private exemptionDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private supportsDocs = new BehaviorSubject<DocResultEntry[]>([]);
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  doRequest(term: string) {
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
        console.log('DASDSADAS', results);

        if (results && results.budget) {
          this.budgetDocs.next(results.budget.docs);
        }
        if (results && results.changes) {
          this.changeDocs.next(results.changes.docs);
        }
        if (results && results.exemption) {
          this.exemptionDocs.next(results.exemption.docs);
        }
        if (results && results.supports) {
          this.supportsDocs.next(results.supports.docs);
        }

      });
    this.search('חינוך');
  }

}
