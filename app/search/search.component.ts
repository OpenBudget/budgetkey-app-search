/**
 * Created by adam on 18/12/2016.
 */
import { Component, HostListener, ViewChild, Inject } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import { from }              from 'rxjs/observable/from';
import { SearchService }     from '../_service/search.service';
import { DownloadService } from '../_service/download.service';
import { SearchResults, DocResultEntry} from '../_model/SearchResults';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { TimelineComponent } from '../timeline/timeline.component';
import { TimeRanges } from '../timeline-menu/time-ranges';
import { SearchBarType } from 'budgetkey-ng2-components/src/components';

import { THEME_TOKEN as BUDGETKEY_NG2_COMPONENTS_THEME } from 'budgetkey-ng2-components';
import {SearchFilter} from '../_model/SearchFilters';
let allFilters = require('../_config/filters.json');

type SearchParams = {
  term: string,
  defaultTerm: boolean,
  timeRange: string,
  timeRangeDisplay: string,
  startRange: string,
  endRange: string,
  displayDocs: string,
  displayDocsDisplay: string,
  displayDocsTypes: string[],
  offset: number,
  pageSize: number,
  filters: any
};

@Component({
  selector: 'budget-search',
  template: require('./search.component.html'),
  styles: [require('./search.component.css')],
  providers: [SearchService, DownloadService]
})
export class SearchComponent {

  // Search request and response pipeline
  private searchTerms: Subject<SearchParams>;
  private searchResults: Observable<SearchResults>;

  // Component state
  private subscriptionProperties: any = {};
  private subscriptionUrlParams: string;

  private term: string = '';
  private selectedPeriod: any;
  private selectedDocType: SearchBarType;

  private filters: any = {};

  // Results and stats
  private allResults: any = [];

  // config
  private pageSize = 10; // how many records to load for each scroll

  // Timeline selection
  private periods: any[];

  // Tabs selection
  private docTypes: any[];

  private overScroll = false; // ??

  // Statue
  private isSearching = false;
  private isErrorInLastSearch = false;

  // For download
  private allDocs: BehaviorSubject<DocResultEntry[]>;

  private docTypeFilters: SearchFilter[];

  @ViewChild('timeline') timeline: TimelineComponent;

  constructor(
    private searchService: SearchService,
    private downloadService: DownloadService,
    private route: ActivatedRoute,
    private location: Location,

    @Inject(BUDGETKEY_NG2_COMPONENTS_THEME) private theme: any
  ) {
    this.periods = (new TimeRanges()).periods;
    this.docTypes = this.theme.searchBarConfig;
    this.selectedDocType = this.docTypes[0];
  }

  ngOnInit() {

    this.searchTerms = new Subject<SearchParams>();
    this.allDocs = new BehaviorSubject<DocResultEntry[]>([]);

    // Connect the search pipeline
    this.searchResults = <Observable<SearchResults>>(this.searchTerms // open a stream
      .debounceTime(300)    )    // wait for 300ms pause in events
      // .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap((sp: SearchParams) => {

        let url;
        let term = sp.defaultTerm ? '' : sp.term;
        if (sp.timeRange === 'custom_range') {
          this.subscriptionUrlParams = `range=${sp.timeRange}&from=${sp.startRange}&to=${sp.endRange}`;
        } else if (sp.timeRange) {
          this.subscriptionUrlParams = `range=${sp.timeRange}`;
        }
        if (this.theme.themeId) {
          this.subscriptionUrlParams += `&theme=${this.theme.themeId}`;
        }
        if (this.docTypeFilters) {
          this.subscriptionUrlParams += '&filters=' + sp.filters;
        }
        url = `/?q=${term || ''}&dd=${sp.displayDocs}&${this.subscriptionUrlParams}`;
        this.location.replaceState(url);

        this.updateSubscriptionProperties(sp);
        // return this.doRequest(sp);
        return this.doRequest(sp);
      })
      .mergeMap((x: any) => {
        return x;
      })
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

    // Handle the URL query params
    this.route.queryParams
      .subscribe((params: Params) => {

        // Time range
        let customPeriod = this.periods[ this.periods.length - 1];
        customPeriod.start = params['from'] || customPeriod.start;
        customPeriod.end = params['to'] || customPeriod.end;

        let timeRange = params['range'] || 'last_decade';
        for (let p of this.periods) {
          if (p.value === timeRange) {
            this.selectedPeriod = p;
            break;
          }
        }

        // Term
        if (params['q']) {
          this.term = params['q'];
        }
        if (params['f']) {
          this.docTypeFilters = <SearchFilter[]>JSON.parse(params['f']);
        }
        if (params['dd']) {
          for (let dt of this.docTypes) {
            if (dt.id === params['dd']) {
              this.selectedDocType = dt;
              break;
            }
          }
        }

        // Filters
        this.filters = {};
        if (params['filters']) {
          try {
            this.filters = JSON.parse(params['filters']);
          } catch (e) {
            console.log('Failed to parse filters param', params['filters']);
          }
        }

        this.doNext(this.term, 0);

        return null;
      });
  }


  //// SEARCH PIPELINE

  // Push search request to pipeline
  doNext(term: string, offset: number) {
    let defaultTerm = false;
    if (!term && this.selectedDocType.defaultTerm) {
      term = this.selectedDocType.defaultTerm;
      defaultTerm = true;
    }
    this.searchTerms.next({
      term: term,
      filters: JSON.stringify(this.docTypeFilters),
      startRange: this.selectedPeriod.start,
      endRange: this.selectedPeriod.end,
      displayDocs: this.selectedDocType.id,
      displayDocsDisplay: this.selectedDocType.name,
      displayDocsTypes: this.selectedDocType.types,
      timeRange: this.selectedPeriod.value,
      timeRangeDisplay: this.selectedPeriod.title,
      offset: offset,
      pageSize: this.pageSize,
      defaultTerm: defaultTerm,
      filters: Object.assign({}, this.selectedDocType.filters, this.filters)
    });
  }

  /**
   * doRequest()
   * the main method of the component
   * posts a new query
   */
  doRequest(sp: SearchParams): Observable<any> {
    // Do actual request
    if (sp.term) {
      this.isSearching = true;
      this.isErrorInLastSearch = false;
      let search = this.searchService.search(
        sp.term,
        sp.startRange,
        sp.endRange,
        sp.pageSize,
        sp.offset,
        sp.displayDocsTypes,
        sp.filters
      );
      let count = this.searchService.count(
        sp.term,
        sp.startRange,
        sp.endRange,
        this.docTypes
      );
      return from([search, count]);
    } else {
      this.isSearching = false;
      return Observable.of<any>([]);
    }
  }

  /**
   * processResults()
   * creates adds the current results to allResults
   * @param {SearchResults} results - returned results from query
   */
  processResults(results: SearchResults): void {
    if (results) {
      if (results.search_counts) {
        for (let dt of this.docTypes) {
          dt.amount = 0;
        }
        for (let key of Object.keys(results.search_counts)) {
          let count = results.search_counts[key].total_overall;
          for (let dt of this.docTypes) {
            if (dt.id === key) {
              dt.amount += count;
            }
          }
        }
      } else {
        this.allResults = this.allResults.slice(0, results.offset);
        this.allResults.push(...results.search_results);
        this.allDocs.next(this.allResults);
      }
    }
  }

  //// UI HELPERS

  getStatusText() {
    if (this.isSearching) {
      return 'טוען...';
    } else if (this.isErrorInLastSearch) {
      return 'אירעה שגיאה בחיפוש, נסו שוב';
    } else if (this.allResults.length === 0) {
      return this.term ? 'אין תוצאות' : 'שורת החיפוש ריקה. בצעו חיפוש כלשהו';
    }

    return '';
  }

  //// EVENT HANDLERS

  onTermChanged(term: string) {
    if (this.term !== term) { // initiate a new search
      this.term = term;
      this.allResults = [];
      this.doNext(term, this.allResults.length);
    }
  }

  onDocTypeSelected(docType: any) {
    if (docType !== this.selectedDocType) {
      this.selectedDocType = docType;
      this.allResults = [];
      this.docTypeFilters = allFilters[this.selectedDocType.id] ? allFilters[this.selectedDocType.id].filters : [];
      this.doNext(this.term, this.allResults.length);
    }
  }

  onPeriodChangeSearch(period: any) {
    if (period !== this.selectedPeriod) {
      this.selectedPeriod = period;
      this.allResults = [];
      this.doNext(this.term, this.allResults.length);
    }
  }

  onSearchFilterMenuChange(selectedFilter: SearchFilter) {
    this.allResults = [];
    this.doNext(this.term, this.allResults.length);
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.innerHeight * 1.7 + window.scrollY) >= document.body.scrollHeight) {
      // Scrolled to bottom
      if (!this.overScroll) {
        this.overScroll = true;
        this.doNext(this.term, this.allResults.length);
      }
    } else {
      this.overScroll = false;
    }
  }

  //// MISCELLANEOUS

  /**
   * Converts the current stack of results (allDocs)
   * from json to csv
   * and opens a download popup for the user
   */
  download(term: string): void {
    this.downloadService.exportAsCsv(term + '.csv', this.allDocs);
  }

  updateSubscriptionProperties(sp: SearchParams) {
    // Update subscription properties
    this.subscriptionProperties = Object.assign({}, sp);
    this.subscriptionProperties.kind = 'search';
    delete this.subscriptionProperties['offset'];
    delete this.subscriptionProperties['pageSize'];
  }
}
