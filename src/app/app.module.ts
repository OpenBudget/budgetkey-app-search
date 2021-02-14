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
import { TimelineMenuComponent } from './timeline-menu/timeline-menu.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VerticalResultsComponent } from './vertical-results/vertical-results.component';
import { SearchModeSelectorComponent } from './search-mode-selector/search-mode-selector.component';
import { HorizontalResultsComponent } from './horizontal-results/horizontal-results.component';
import { SearchTagComponent } from './search-tag/search-tag.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BarePageComponent } from './bare-page/bare-page.component';
import { BareSearchBarComponent } from './bare-search-bar/bare-search-bar.component';

export const appRoutes: Routes = [
  { path: 'bare', component: BarePageComponent },
  { path: '', component: MainPageComponent },
];

declare let BUDGETKEY_NG2_COMPONENTS_THEME: any;
declare const BUDGETKEY_THEME_ID: any;
declare const BUDGETKEY_LANG: any;

export const LANG = typeof(BUDGETKEY_LANG) === 'undefined' ? 'he' : BUDGETKEY_LANG;

const providers: any[] = [
  getAuthServiceConfigProvider('https://next.obudget.org'),
  {provide: THEME_ID_TOKEN, useValue: typeof(BUDGETKEY_THEME_ID) === 'undefined' ? null : BUDGETKEY_THEME_ID},
  {provide: LANG_TOKEN, useValue: LANG}
];

if (typeof(BUDGETKEY_NG2_COMPONENTS_THEME) !== 'undefined') {
  BUDGETKEY_NG2_COMPONENTS_THEME = Object.assign({}, BUDGETKEY_NG2_COMPONENTS_THEME);
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
    TimelineMenuComponent,
    VerticalResultsComponent,
    SearchModeSelectorComponent,
    HorizontalResultsComponent,
    SearchTagComponent,
    MainPageComponent,
    BarePageComponent,
    BareSearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    BudgetkeyNg2AuthModule,
    BudgetKeyCommonModule,
  ],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
