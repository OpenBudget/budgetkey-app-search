/**
 * Created by adam on 18/12/2016.
 */
import {Component, OnInit}  from '@angular/core';
import {Observable}        from 'rxjs/Observable';
import {Subject}           from 'rxjs/Subject';
import {BehaviorSubject}   from 'rxjs/BehaviorSubject';
import {SearchService}     from '../_service/search.service';
import {SearchResults, DocResultEntry, SearchResultsCounter} from '../_model/SearchResults';

@Component({
  selector: 'budget-search',
  template: require('./search.component.html'),
  styles: [require('./search.component.css')],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  private searchTerms: Subject<string>;
  private searchResults: Observable<SearchResults>;
  private term: string;
  private allDocs: BehaviorSubject<DocResultEntry[]>;
  private allResults: any;
  private resultTotal: number;
  private resultTotalCount: SearchResultsCounter;
  private resultCurrentCount: SearchResultsCounter;
  private displayDocs: string; // category
  private currentDocs: string; // category
  private pageSize: number; // how many records to load for each scroll
  private skip: number;  // how many records to skip from recently fetched query (when appending to the list)
  private fetchFlag: boolean;
  private resultRenew: boolean; //
  private headerBottomBorder: boolean;
  private isSearching: boolean;
  private isErrorInLastSearch: boolean;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchTerms = new Subject<string>();
    this.allDocs = new BehaviorSubject<DocResultEntry[]>([]);
    this.allResults = [];
    this.resultTotal = 0;
    this.resultTotalCount = new SearchResultsCounter();
    this.resultCurrentCount = new SearchResultsCounter();
    this.displayDocs = 'all';
    this.currentDocs = 'all';
    this.pageSize = 10;
    this.skip = -10;
    this.fetchFlag = true;
    this.resultRenew = false;
    this.allResults = [];
    this.headerBottomBorder = false;
    this.isSearching = false;
    this.isErrorInLastSearch = false;
    // ^ moved from constructor ^

    this.searchResults = this.searchTerms // open a stream
      .debounceTime(300)        // wait for 300ms pause in events
      // .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(() => this.doRequest())
      .catch(error => {
        this.isSearching = false;
        this.isErrorInLastSearch = true;
        console.log('Error while searching:', error);
        return Observable.of<SearchResults>(null);
      });
    this.searchResults.subscribe((results) => {
      this.isSearching = false;
      this.processResults(results);
    });
    this.search('חינוך'); // a default search query, to get things started..
  }

  /**
   * Push a search term into the observable stream.
   */
  search(term: string): void { // keyUp()
    this.isSearching = true;
    if (this.term !== term) { // initiate a new search
      this.pageSize = 10;
      this.skip = -10;
      this.resultRenew = true;
      this.fetchFlag = true;
      this.term = term;
      this.searchTerms.next(term);
      this.allResults = [];

    } else {
      this.resultRenew = false;
      this.term = term;
      this.searchTerms.next(term);
    }
  }

  /**
   * doRequest()
   * the main method of the component
   * posts a new query
   */

  doRequest(): Observable<SearchResults> {
    this.currentDocs = this.displayDocs;

    let maxRecords = 0;
    if (this.resultRenew) {
      maxRecords = 11;
    } else if (this.displayDocs === 'all') {
      let result_arr = this.resultTotalCount;
      let count_arr = Object.keys(result_arr)
        .map(key => {
          return result_arr[key];
        });
      maxRecords = Math.max(...count_arr, 21);
    } else {// if specific category is selected - maxRecords is the totalCount of that category(currentDocs)
      maxRecords = this.resultTotalCount[this.currentDocs];
    }

    if (this.pageSize + this.skip < maxRecords) {
      this.skip += this.pageSize;
    } else if (this.pageSize + this.skip < maxRecords && maxRecords !== 0) {
      this.skip = maxRecords - this.pageSize;
    } else {
      return Observable.of<SearchResults>(null);
    }

    let category = this.currentDocs;
    if (this.resultRenew) {
      category = 'all';
    } else if (category === 'contractspending') {
      category = 'contract-spending';
    } else if (category === 'nationalbudgetchanges') {
      category = 'national-budget-changes';
    }

    if (this.term) {
      this.isSearching = true;
      this.isErrorInLastSearch = false;
      return this.searchService.search(this.term, this.pageSize, this.skip, [category]);
    } else {
      this.isSearching = false;
      return Observable.of<SearchResults>(null);
    }
  }

  /**
   * processResults()
   * creates adds the current results to allResults
   * @param {SearchResults} results - returned results from query
   */
  processResults(results: SearchResults): void {
    console.log('results: ', results);
    if (results) {
      if (this.resultRenew) {
        this.resultTotal = 0;
      }
      for (let key in results.search_counts) {
        let tmpResults = results.search_counts[key];
        console.log(key, tmpResults.total_overall);
        if (this.resultRenew) {
          this.resultTotal += tmpResults.total_overall;
          this.resultTotalCount[key] = tmpResults.total_overall;
        }
      }
      this.allResults.push(...results.search_results);
      this.allDocs.next(this.allResults);
      this.fetchFlag = true;
      this.resultRenew = false;
    } else {
      this.fetchFlag = false;
    }
  }

  /**
   * fetchMore()
   * when scrolling, appends more results to the list
   * @param {number} term
   */
  fetchMore(term: number): void {
    const div = document.body.getElementsByClassName('search_body')[0];
    this.headerBottomBorder = true;
    const cur = div.scrollTop;
    const divHeight = div.scrollHeight;
    if (this.currentDocs !== this.displayDocs) {
      this.currentDocs = this.displayDocs;
      this.fetchFlag = true;
    }
    if (cur > 0.3 * divHeight && this.fetchFlag) {
      this.fetchFlag = false;
      // this.pageSize += 10;
      this.searchTerms.next(this.term);
      console.log(this.allDocs.value.length);
    }
  }

  getStatusText() {
    if (this.isSearching) {
      return 'טוען...';
    } else if (this.isErrorInLastSearch) {
      return 'אירעה שגיאה בחיפוש, נסה שוב';
    } else if (this.allResults.length === 0) {
      return this.term ? 'אין תוצאות' : 'שורת החיפוש ריקה. בצע חיפוש כלשהו';
    }

    return '';
  }
}
