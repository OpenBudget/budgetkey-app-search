/**
 * Created by adam on 18/12/2016.
 */
import { Component, HostListener, Inject } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import { from }              from 'rxjs/observable/from';
import { SearchService }     from '../_service/search.service';
import { DownloadService } from '../_service/download.service';
import { SearchResults, DocResultEntry} from '../_model/SearchResults';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { TimeRanges } from '../timeline-menu/time-ranges';
import { SearchBarType } from 'budgetkey-ng2-components/src/components';

import { THEME_TOKEN, LANG_TOKEN } from 'budgetkey-ng2-components';
import { SearchParams } from '../_model/SearchParams';


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

  // Results and stats
  private allResults: any = [];
  private timeline: any[];

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

  // @ViewChild('timeline') timeline: TimelineComponent;

  constructor(
    private searchService: SearchService,
    private downloadService: DownloadService,
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
    this.allDocs = new BehaviorSubject<DocResultEntry[]>([]);

    // Connect the search pipeline
    this.searchResults = <Observable<SearchResults>>(this.searchTerms) // open a stream
      .debounceTime(300)           // wait for 300ms pause in events
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
        if (this.selectedDocType.filterMenu) {
          for (let filterMenu of this.selectedDocType.filterMenu) {
            sp.filters = Object.assign({}, sp.filters, filterMenu.selected.filters || {});
            this.subscriptionUrlParams += '&' + filterMenu.id + '=' + filterMenu.selected.id;
          }
        }
        url = `/?q=${term || ''}&dd=${sp.displayDocs}&${this.subscriptionUrlParams}&lang=${this.lang}`;
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
      if (this.processResults(results)) {
        this.isSearching = false;
      }
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
        if (params['dd']) {
          for (let dt of this.docTypes) {
            if (dt.id === params['dd']) {
              this.selectedDocType = dt;
              break;
            }
          }
        }

        // Filters
        if (this.selectedDocType.filterMenu) {
          for (let filterMenu of this.selectedDocType.filterMenu) {
            if (params[filterMenu.id]) {
              for (let option of filterMenu.options) {
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
      let search = this.searchService.search(sp);
      let count = this.searchService.count(
        sp.term,
        sp.startRange,
        sp.endRange,
        this.docTypes.filter((dt: any) => dt !== this.selectedDocType)
      );
      let calls = [search, count];
      // if (!this.theme.themeId) {
        // let timeline = this.searchService.timeline(sp);
        // calls.push(timeline);
      // }
      return from(calls);
    } else {
      this.isSearching = false;
      return Observable.of<any>([{offset: 0, search_results: []}]);
    }
  }

  /**
   * processResults()
   * creates adds the current results to allResults
   * @param {SearchResults} results - returned results from query
   */
  processResults(results: SearchResults): boolean {
    let ret = false;
    if (results) {
      if (results.search_counts) {
        for (let key of Object.keys(results.search_counts)) {
          let count = results.search_counts[key].total_overall;
          if (key === '_current') {
            key = results.params.displayDocs;
          }
          for (let dt of this.docTypes) {
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
      if (results.timeline) {
        this.timeline = results.timeline;
      }
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
        for (let filterMenu of docType.filterMenu) {
          if (!filterMenu.selected) {
            filterMenu.selected = filterMenu.options[0];
          }
        }
      }
      this.allResults = [];
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
