import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BudgetKeySearchBar, LANG_TOKEN, SearchBarType, THEME_TOKEN } from 'budgetkey-ng2-components';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-bare-page',
  templateUrl: './bare-page.component.html',
  styleUrls: ['./bare-page.component.less']
})
export class BarePageComponent implements OnInit {

  all: SearchBarType;

  @ViewChild('search') search: SearchComponent;

  constructor(
    @Inject(THEME_TOKEN) private theme: any,
    @Inject(LANG_TOKEN) private lang
  ) {
    this.all = theme.searchBarConfig[0];
  }

  ngOnInit() {
  }

  externalUrl() {
    return BudgetKeySearchBar['buildExternalUrl'](
      this.search.searchState.term || null,
      this.all,
      this.search.subscriptionUrlParams,
      this.theme, this.lang
    );
  }
}
