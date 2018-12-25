import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject, from, of, BehaviorSubject } from 'rxjs';

import { THEME_TOKEN, LANG_TOKEN, SearchBarType } from 'budgetkey-ng2-components';

import { SearchService } from '../api.service';
import { SearchResults, SearchParams, DocResultEntry} from '../model';
import { debounceTime, switchMap, mergeMap } from 'rxjs/operators';
import { TimeRanges } from '../time-ranges';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  // Search request and response pipeline
  private searchTerms: Subject<SearchParams>;
  private searchResults: Observable<SearchResults>;

  // Component state
  private subscriptionProperties: any = {};
  private subscriptionUrlParams: string;

  private term = '';
  private selectedPeriod: any;
  private selectedDocType: SearchBarType;

  // Results and stats
  private allResults: any = [];
  private allDocs = new BehaviorSubject<DocResultEntry[]>([]);

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

  // @ViewChild('timeline') timeline: TimelineComponent;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject(THEME_TOKEN) private theme: any,
    @Inject(LANG_TOKEN) private lang: string
  ) {
    this.periods = (new TimeRanges()).periods;
    this.docTypes = this.theme.searchBarConfig;
    this.selectedDocType = this.docTypes[0];
    this.lang = lang;
  }

  ngOnInit() {

    this.searchTerms = new Subject<SearchParams>();

    // Connect the search pipeline
    this.searchResults = <Observable<SearchResults>>(this.searchTerms) // open a stream
      .pipe(
        debounceTime(300),           // wait for 300ms pause in events
        switchMap((sp: SearchParams) => {

          let url;
          const term = sp.defaultTerm ? '' : sp.term;
          if (sp.timeRange === 'custom_range') {
            this.subscriptionUrlParams = `range=${sp.timeRange}&from=${sp.startRange}&to=${sp.endRange}`;
          } else if (sp.timeRange) {
            this.subscriptionUrlParams = `range=${sp.timeRange}`;
          }
          if (this.theme.themeId) {
            this.subscriptionUrlParams += `&theme=${this.theme.themeId}`;
          }
          if (this.lang) {
            this.subscriptionUrlParams += `&lang=${this.lang}`;
          }
          if (this.selectedDocType.filterMenu) {
            for (const filterMenu of this.selectedDocType.filterMenu) {
              sp.filters = Object.assign({}, sp.filters, filterMenu.selected.filters || {});
              this.subscriptionUrlParams += '&' + filterMenu.id + '=' + filterMenu.selected.id;
            }
          }
          url = `/?q=${term || ''}&dd=${sp.displayDocs}&${this.subscriptionUrlParams}`;
          this.location.replaceState(url);
          this.updateSubscriptionProperties(sp);
          console.log('doRequest', sp);
          return this.doRequest(sp);
        }),
        mergeMap((x) => x)
      );
    this.searchResults.subscribe(
      (results) => {
        console.log('got results', results);
        if (this.processResults(results)) {
          this.isSearching = false;
        }
      },
      (error) => {
        this.isSearching = false;
        this.isErrorInLastSearch = true;
        console.log('Error while searching:', error);
        return of<SearchResults>(null);
      }
    );

    // Handle the URL query params
    this.route.queryParams
      .subscribe((params: Params) => {

        console.log('queryParams', params);

        // Time range
        const customPeriod = this.periods[ this.periods.length - 1];
        customPeriod.start = params['from'] || customPeriod.start;
        customPeriod.end = params['to'] || customPeriod.end;

        const timeRange = params['range'] || 'last_decade';
        for (const p of this.periods) {
          if (p.value === timeRange) {
            this.selectedPeriod = p;
            break;
          }
        }

        // Term
        if (params['q']) {
          this.term = params['q'];
        }
        if (params['dd']) {
          for (const dt of this.docTypes) {
            if (dt.id === params['dd']) {
              this.selectedDocType = dt;
              break;
            }
          }
        }

        // Filters
        if (this.selectedDocType.filterMenu) {
          for (const filterMenu of this.selectedDocType.filterMenu) {
            if (params[filterMenu.id]) {
              for (const option of filterMenu.options) {
                if (params[filterMenu.id] === option.id) {
                  filterMenu.selected = option;
                  break;
                }
              }
            }
            if (!filterMenu.selected) {
              filterMenu.selected = filterMenu.options[0];
            }
          }
        }

        console.log('doNext', this.term);
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
    console.log('searchTerms next');
    this.searchTerms.next({
      term: term,
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
      filters: this.selectedDocType.filters || {}
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
      const search = this.searchService.search(sp);
      const count = this.searchService.count(
        sp.term,
        sp.startRange,
        sp.endRange,
        this.docTypes.filter((dt: any) => dt !== this.selectedDocType)
      );
      const calls = [search, count];
      // if (!this.theme.themeId) {
        // let timeline = this.searchService.timeline(sp);
        // calls.push(timeline);
      // }
      console.log('from calls', calls);
      return from(calls);
    } else {
      this.isSearching = false;
      return of<any>([{offset: 0, search_results: []}]);
    }
  }

  /**
   * processResults()
   * creates adds the current results to allResults
   */
  processResults(results: SearchResults): boolean {
    let ret = false;
    console.log('processResults', results);
    if (results) {
      if (results.search_counts) {
        for (let key of Object.keys(results.search_counts)) {
          const count = results.search_counts[key].total_overall;
          if (key === '_current') {
            key = results.params.displayDocs;
          }
          for (const dt of this.docTypes) {
            if (dt.id === key) {
              dt.amount = count;
              break;
            }
          }
        }
      }
      if (results.search_results) {
        this.allResults = this.allResults.slice(0, results.offset);
        this.allResults.push(...results.search_results);
        this.allDocs.next(this.allResults);
        ret = true;
      }
      // if (results.timeline) {
      //   this.timeline = results.timeline;
      // }
    }
    return ret;
  }

  //// UI HELPERS

  getStatusText() {
    if (this.isSearching) {
      return 'טוען&hellip;';
    } else if (this.isErrorInLastSearch) {
      return 'אירעה שגיאה בחיפוש, נסו שוב';
    } else if (this.allResults.length === 0) {
      if (this.term) {
        return 'אין תוצאות';
      } else {
        if (this.theme.sampleSearches) {
            return '<b>חיפושים לדוגמה:</b> ' + this.theme.sampleSearches.join(', ') + '&hellip;';
        } else {
          return 'שורת החיפוש ריקה. בצעו חיפוש כלשהו';
        }
      }
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
      if (docType.filterMenu) {
        for (const filterMenu of docType.filterMenu) {
          if (!filterMenu.selected) {
            filterMenu.selected = filterMenu.options[0];
          }
        }
      }
      this.allResults = [];
      this.doNext(this.term, this.allResults.length);
    }
  }

  periodChangeSearch(period: any) {
    if (period !== this.selectedPeriod) {
      this.selectedPeriod = period;
      this.allResults = [];
      this.doNext(this.term, this.allResults.length);
    }
  }

  onSearchFilterMenuChange() {
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
  updateSubscriptionProperties(sp: SearchParams) {
    // Update subscription properties
    this.subscriptionProperties = Object.assign({}, sp);
    this.subscriptionProperties.kind = 'search';
    delete this.subscriptionProperties['offset'];
    delete this.subscriptionProperties['pageSize'];
  }
}
