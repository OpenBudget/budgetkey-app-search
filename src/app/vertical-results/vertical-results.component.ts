import { Component, OnInit, Input, Inject, HostListener, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SearchState } from '../search-state/search-state';
import { SearchManager, SearchOutcome } from '../search-manager/search-manager';
import { SearchBarType, THEME_TOKEN } from 'budgetkey-ng2-components';
import { SearchService } from '../api.service';
import { take, skip } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'vertical-results',
  templateUrl: './vertical-results.component.html',
  styleUrls: ['./vertical-results.component.less']
})
export class VerticalResultsComponent implements OnInit, OnDestroy {

  @Input() state: SearchState;
  @Input() bare = false;
  @Output() searching = new EventEmitter<boolean>();

  searchManager: SearchManager;

  // Autofetch control
  gotMore = false;
  lastOutcome: SearchOutcome;
  more: Subscription;

  constructor(
    private searchService: SearchService,
    @Inject(THEME_TOKEN) private theme: any,
  ) {
  }

  ngOnInit() {
    this.searchManager = new SearchManager(
      this.searchService,
      this.state,
      <SearchBarType[]>this.theme.searchBarConfig,
      300
    );

    this.searchManager.searchResults.subscribe((outcome) => {
      this.lastOutcome = outcome;
      this.searching.emit(outcome.isSearching);
    });

    this.more = fromEvent(window, 'scroll').subscribe(() => {
      if (window.innerHeight + window.pageYOffset + 300 > window.document.body.scrollHeight) {
        if (!this.gotMore) {
          this.gotMore = true;
          this.searchManager.getMore();
          this.searchManager.searchResults.pipe(take(2), skip(1)).subscribe(() => {
            this.gotMore = false;
          });
        }
      }
    });
  }

  ngOnDestroy() {
    this.more.unsubscribe();
  }

  getStatusText() {
    if (this.lastOutcome.isSearching) {
      return 'טוען&hellip;';
    } else if (this.lastOutcome.isErrorInLastSearch) {
      return 'אירעה שגיאה בחיפוש, נסו שוב';
    } else if (this.searchManager.allResults.length === 0) {
      if (this.state.term) {
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


}
