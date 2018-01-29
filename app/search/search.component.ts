/**
 * Created by adam on 18/12/2016.
 */
import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import { SearchService }     from '../_service/search.service';
import { DownloadService } from '../_service/download.service';
import { SearchResults, DocResultEntry, SearchResultsCounter} from '../_model/SearchResults';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HostListener } from '../../node_modules/@angular/core/src/metadata/directives';
import { Http } from '@angular/http';

type SearchParams = {term: string, displayDocs: string, offset: number};

@Component({
  selector: 'budget-search',
  template: require('./search.component.html'),
  styles: [require('./search.component.css')],
  providers: [SearchService, DownloadService]
})
export class SearchComponent implements OnInit {

  private searchTerms: Subject<SearchParams>;
  private searchResults: Observable<SearchResults>;
  private term: string = '';
  private allDocs: BehaviorSubject<DocResultEntry[]>;
  private allResults: any;
  private resultTotal: number;
  private resultTotalCount: SearchResultsCounter;
  private displayDocs: string; // category
  private pageSize: number; // how many records to load for each scroll
  private bump: boolean;
  private headerBottomBorder: boolean;
  private isSearching: boolean;
  private isErrorInLastSearch: boolean;

  constructor(
    private searchService: SearchService,
    private downloadService: DownloadService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private http: Http
  ) {}

  ngOnInit() {
    this.searchTerms = new Subject<SearchParams>();
    this.allDocs = new BehaviorSubject<DocResultEntry[]>([]);

    this.displayDocs = null;
    this.bump = false;

    this.resetState('all');

    this.pageSize = 10;

    this.headerBottomBorder = false;
    this.isSearching = false;
    this.isErrorInLastSearch = false;
    // ^ moved from constructor ^

    this.searchResults = this.searchTerms // open a stream
      .debounceTime(300)        // wait for 300ms pause in events
      // .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap((sp: SearchParams) => {
        if (sp.term) {
          this.location.replaceState(`/?q=${sp.term}&dd=${sp.displayDocs}`);
        } else {
          this.location.replaceState(`/?q=&dd=${sp.displayDocs}`);
        }
        return this.doRequest(sp);
      })
      .catch(error => {
        this.isSearching = false;
        this.isErrorInLastSearch = true;
        this.displayDocs = null;
        console.log('Error while searching:', error);
        return Observable.of<SearchResults>(null);
      });
    this.searchResults.subscribe((results) => {
      this.isSearching = false;
      this.processResults(results);
    });

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['q']) {
          this.doRequest({term: params['q'], displayDocs: 'all', offset: 0})
            .subscribe((results) => {
              this.processResults(results);
            });
          this.term = params['q'];
          if (params['dd']) {
            this.displayDocs = params['dd'];
          } else {
            this.displayDocs = 'all';
          }
          this.search(this.term);
        }
        return null;
      });
  }

  /**
   * Push a search term into the observable stream.
   */
  search(term: string): void { // keyUp()
    if (this.term !== term) { // initiate a new search
      this.term = term;
      this.displayDocs = null;
      this.resetState('all');
    } else {
      this.searchTerms.next({term: term, displayDocs: this.displayDocs, offset: this.allResults.length});
    }
  }

  /**
   * Converts the current stack of results (allDocs) 
   * from json to csv 
   * and opens a download popup for the user
   */
  download(term: string): void {
    this.downloadService.exportAsCsv(term + '.csv', this.allDocs);
  }

  /**
   * doRequest()
   * the main method of the component
   * posts a new query
   */
  doRequest(sp: SearchParams): Observable<SearchResults> {
    if (sp.term) {
      this.isSearching = true;
      this.isErrorInLastSearch = false;
      return this.searchService.search(sp.term, this.pageSize, sp.offset, sp.displayDocs.split(','));
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
    if (results) {
      if (results.displayDocs === 'all') {
        this.resultTotal = 0;
        for (let key in results.search_counts) {
          if (key) {
            let tmpResults = results.search_counts[key];
            this.resultTotal += tmpResults.total_overall;
            this.resultTotalCount[key] = tmpResults.total_overall;
          }
        }
      }
      this.allResults = this.allResults.slice(0, results.offset);
      this.allResults.push(...results.search_results);
    } else {
      this.resetState(null);
      this.resetState('all');
    }
    this.allDocs.next(this.allResults);

  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.innerHeight * 1.7 + window.scrollY) >= document.body.scrollHeight) {
      // Scrolled to bottom
      if (!this.bump) {
        this.bump = true;
        this.fetchMore();
      }
    } else {
      if (this.bump) {
        this.bump = false;
      }
    }

  }

  /**
   * fetchMore()
   * when scrolling, appends more results to the list
   * @param {number} term
   */
  fetchMore(): void {
    this.headerBottomBorder = true;
    this.isSearching = true;
    this.searchTerms.next({term: this.term, displayDocs: this.displayDocs, offset: this.allResults.length});
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

  resetState(requestedDocTypes: string) {
    if (requestedDocTypes !== this.displayDocs) {
      this.displayDocs = requestedDocTypes;
      this.allResults = [];
      if (requestedDocTypes === 'all') {
        this.resultTotal = 0;
        this.resultTotalCount = new SearchResultsCounter();
      }
      if (this.displayDocs && this.term) {
        this.isSearching = true;
        this.searchTerms.next({term: this.term, displayDocs: this.displayDocs, offset: 0});
      }
    }
  }

  switchTab($event: any, requestedDocTypes: string) {
    $event.stopPropagation();
    $event.preventDefault();

    this.resetState(requestedDocTypes);
  }
}
