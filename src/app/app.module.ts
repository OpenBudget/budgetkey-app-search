import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BudgetKeyCommonModule, THEME_ID_TOKEN, LANG_TOKEN, THEME_TOKEN } from 'budgetkey-ng2-components';
import { BudgetkeyNg2AuthModule, getAuthServiceConfigProvider } from 'budgetkey-ng2-auth';
import { SearchComponent } from './search/search.component';
import { SearchFilterMenuComponent } from './search-filter-menu/search-filter-menu.component';
import { SearchFilterMenuBarComponent } from './search-filter-menu-bar/search-filter-menu-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchResultBudgetComponent } from './search-result-budget/search-result-budget.component';
import { SearchResultContractSpendingComponent } from './search-result-contract-spending/search-result-contract-spending.component';
import { SearchResultEntitiesComponent } from './search-result-entities/search-result-entities.component';
import { SearchResultReportsComponent } from './search-result-reports/search-result-reports.component';
import { SearchResultSupportsComponent } from './search-result-supports/search-result-supports.component';
import { SearchResultTendersComponent } from './search-result-tenders/search-result-tenders.component';
import { TimelineMenuComponent } from './timeline-menu/timeline-menu.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

export const appRoutes: Routes = [
  { path: '', component: SearchComponent },
];

declare let BUDGETKEY_NG2_COMPONENTS_THEME: any;
declare const BUDGETKEY_APP_SEARCH_THEME: any;
declare const BUDGETKEY_THEME_ID: any;
declare const BUDGETKEY_LANG: any;

export const LANG = typeof(BUDGETKEY_LANG) === 'undefined' ? 'he' : BUDGETKEY_LANG;

const providers: any[] = [
  getAuthServiceConfigProvider('https://next.obudget.org'),
  {provide: THEME_ID_TOKEN, useValue: typeof(BUDGETKEY_THEME_ID) === 'undefined' ? null : BUDGETKEY_THEME_ID},
  {provide: LANG_TOKEN, useValue: LANG}
];

if (typeof(BUDGETKEY_NG2_COMPONENTS_THEME) !== 'undefined') {
  if (typeof(BUDGETKEY_APP_SEARCH_THEME) !== 'undefined') {
    BUDGETKEY_NG2_COMPONENTS_THEME = Object.assign({}, BUDGETKEY_NG2_COMPONENTS_THEME, BUDGETKEY_APP_SEARCH_THEME);
  }
  providers.push({provide: THEME_TOKEN,
                  useValue: BUDGETKEY_NG2_COMPONENTS_THEME});
}


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchFilterMenuComponent,
    SearchFilterMenuBarComponent,
    SearchResultComponent,
    SearchResultBudgetComponent,
    SearchResultContractSpendingComponent,
    SearchResultEntitiesComponent,
    SearchResultReportsComponent,
    SearchResultSupportsComponent,
    SearchResultTendersComponent,
    TimelineMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    BudgetkeyNg2AuthModule,
    BudgetKeyCommonModule,
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
