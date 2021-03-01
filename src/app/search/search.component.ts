import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { THEME_TOKEN, LANG_TOKEN, SearchBarType } from 'budgetkey-ng2-components';

import { SearchParams } from '../model';
import { TimeRanges } from '../time-ranges';
import { SearchState } from '../search-state/search-state';
import { AuthService } from 'budgetkey-ng2-auth';
import { filter, first, switchMap } from 'rxjs/operators';


const gtag: any = window['gtag'];


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  @Input() bare = false;

  // SearchManager
  searchState: SearchState;

  // Component state
  public subscriptionProperties: any = {};
  public subscriptionUrlParams: string;
  isSearching = false;

  // Timeline selection
  private periods: any[];

  // Tabs selection
  public docTypes: any[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthService,
    @Inject(THEME_TOKEN) private theme: any,
    @Inject(LANG_TOKEN) private lang: string
  ) {
    this.searchState = new SearchState(<SearchBarType[]>theme.searchBarConfig);
    this.periods = (new TimeRanges()).periods;
    this.docTypes = this.theme.searchBarConfig;
    this.searchState.searchContext = theme.searchContext;
    this.lang = lang;
  }

  ngOnInit() {
    this.auth.getUser().pipe(
      filter((x) => x !== null),
      first(),
      switchMap((user) => {
        return this.searchState.searchQueue;
      })
    ).subscribe((sp: SearchParams) => {
      if (!sp) {
        return;
      }
      // const term = sp.defaultTerm ? '' : sp.term;
      if (sp.period.value === 'custom_range') {
        this.subscriptionUrlParams = `range=${sp.period.value}&from=${sp.period.start}&to=${sp.period.end}`;
      } else if (sp.period.value) {
        this.subscriptionUrlParams = `range=${sp.period.value}`;
      }
      if (this.lang) {
        this.subscriptionUrlParams += `&lang=${this.lang}`;
      }
      if (this.theme.themeId) {
        this.subscriptionUrlParams += `&theme=${this.theme.themeId}`;
      }
      if (sp.docType.filterMenu) {
        for (const filterMenu of sp.docType.filterMenu) {
          this.subscriptionUrlParams += '&' + filterMenu.id + '=' + filterMenu.selected.id;
        }
      }
      let url = `${this.route.snapshot.routeConfig.path}?q=${sp.term || ''}&dd=${sp.docType.id}&${this.subscriptionUrlParams}`;
      const locationSearch = window.location.search;
      if (locationSearch && locationSearch.length > 1) {
        const searchParams = new URLSearchParams(locationSearch.substring(1));
        for (const f of ['subscribe', 'jwt']) {
          if (searchParams.has(f)) {
            url += `&${f}=${searchParams.get(f)}`;
          }
        }
      }
      this.location.replaceState(url);
      this.updateSubscriptionProperties(sp);

      if (sp.offset === 0) {
        if (gtag) {
          gtag('event', 'search',
               { search_term: sp.term,
                 kinds: sp.docType.id });
        }
      }
    });

    // Handle the URL query params
    this.route.queryParams
      .subscribe((params: Params) => {

        // Time range
        const customPeriod = this.periods[ this.periods.length - 1];
        customPeriod.start = params['from'] || customPeriod.start;
        customPeriod.end = params['to'] || customPeriod.end;

        const timeRange = params['range'] || 'all';
        for (const p of this.periods) {
          if (p.value === timeRange) {
            this.searchState.period = p;
            break;
          }
        }

        // Term
        if (params['q']) {
          this.searchState.term = params['q'];
        }
        if (params['dd']) {
          for (const dt of this.docTypes) {
            if (dt.id === params['dd']) {
              this.searchState.docType = dt;
              break;
            }
          }
        }

        // Filters
        if (this.searchState.docType.filterMenu) {
          for (const filterMenu of this.searchState.docType.filterMenu) {
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
        this.searchState.start();

        return null;
      });
  }

  //// UI HELPERS

  onTermChanged(term: string) {
    this.searchState.term = term;
  }

  onDocTypeSelected(docType: any) {
    this.searchState.docType = docType;
  }

  periodChangeSearch(period: any) {
    this.searchState.period = period;
  }

  onSearchFilterMenuChange() {
    this.searchState.initiateSearch();
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
