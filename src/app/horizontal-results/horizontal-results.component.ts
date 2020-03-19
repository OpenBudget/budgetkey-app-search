import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchBarType } from 'budgetkey-ng2-components';
import { SearchState, mergeFilters } from '../search-state/search-state';
import { SearchService } from '../api.service';
import { SearchManager, SearchOutcome } from '../search-manager/search-manager';
import { SearchParams, SearchResults } from '../model';
import { take, skip, switchMap } from 'rxjs/operators';

@Component({
  selector: 'horizontal-results',
  templateUrl: './horizontal-results.component.html',
  styleUrls: ['./horizontal-results.component.less']
})
export class HorizontalResultsComponent implements OnInit {

  @Input() docType: SearchBarType;
  @Input() state: SearchState;
  @Input() anySearching: boolean;
  @Output() searching = new EventEmitter<boolean>();
  @Output() clicked = new EventEmitter<boolean>();

  searchManager: SearchManager;
  lastOutcome: SearchOutcome;
  docTypes: SearchBarType[];
  gotMore = false;

  constructor(
    private searchService: SearchService,
  ) { }

  ngOnInit() {
    this.docTypes = [this.docType];
    this.docType['score'] = 0;
    if (this.docType.filterMenu && this.docType.filterMenu.length > 0) {
      for (const option of this.docType.filterMenu[0].options) {
        this.docTypes.push(Object.assign({}, this.docType, {
          id: option.id,
          display: option.display,
          filters: mergeFilters(this.docType.filters, option.filters)
        }));
      }
    }
    this.state.searchQueue
        .pipe(
          switchMap((sp) => {
            return this.searchService.search({
              docType: this.docTypes[0],
              offset: 0,
              pageSize: 1,
              term: sp.term,
              period: null,
              filters: this.docType.filters,
              ordering: sp.term ? null : this.docType.ordering
            });
          })
        ).subscribe((sr) => {
          if (sr && sr.search_results && sr.search_results.length > 0) {
            this.docType['score'] = sr.search_results[0].score;
          }
        });

    this.searchManager = new SearchManager(
      this.searchService,
      this.state,
      this.docTypes,
      1000,
      (sp: SearchParams) => {
        if (sp.offset === 0) {
          const ret = new SearchParams(sp);
          ret.docType = this.docType;
          ret.filters = this.docType.filters;
          ret.period = null;
          return ret;
        }
        return sp;
      }
    );

    this.searchManager.searchResults.subscribe((outcome) => {
      this.lastOutcome = outcome;
      this.searching.emit(outcome.isSearching);
    });
  }

  shouldShow() {
    return this.docType.id !== 'all' &&
           this.lastOutcome &&
           !this.lastOutcome.isSearching &&
           !this.lastOutcome.isErrorInLastSearch &&
           !this.anySearching &&
           this.searchManager.last &&
           this.searchManager.last.docType.amount &&
           this.searchManager.last.docType['score'] > 0;
  }

  scrollHandler(event) {
    const target = event.target;
    if (target.scrollLeft < 100) {
      if (!this.gotMore) {
        this.gotMore = true;
        this.searchManager.getMore();
        this.searchManager.searchResults.pipe(take(2), skip(1)).subscribe(() => {
          this.gotMore = false;
        });
      }
    }
  }

  titleClicked() {
    this.clicked.emit(true);
  }

  optionClicked(selected) {
    for (const option of this.docType.filterMenu[0].options) {
      if (option.id === selected.id) {
        this.docType.filterMenu[0].selected = option;
        break;
      }
    }
    this.clicked.emit(true);
  }

}
