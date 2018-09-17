import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { SearchService } from './_service/search.service';
import { SearchComponent } from './search/search.component';

import { BudgetKeyCommonModule, THEME_ID_TOKEN, THEME_TOKEN, LANG_TOKEN } from 'budgetkey-ng2-components';

import { SearchResultComponent,
         BudgetSearchResultComponent,
         EntitiesSearchResultComponent,
         TendersSearchResultComponent,
         ContractSpendingSearchResultComponent,
         SupportsSearchResultComponent,
         ReportsSearchResultComponent,
        } from './search-result';

import { TimelineComponent } from './timeline/timeline.component';
import { TimelineMenuComponent } from './timeline-menu/timeline-menu.component';
import { TimelineScaleComponent } from './timeline-scale/timeline-scale.component';
import { SearchFilterMenuBarComponent,
         SearchFilterMenuComponent,
} from './search-filter';

import { AppRoutingModule } from './app-routing.module';

let defaultLang = 'he';

declare let BUDGETKEY_NG2_COMPONENTS_THEME: any;
declare const BUDGETKEY_APP_SEARCH_THEME: any;
declare const BUDGETKEY_THEME_ID: any;
declare const BUDGETKEY_LANG: any;

let providers: any[] = [
  SearchService,
  {provide: THEME_ID_TOKEN, useValue: typeof(BUDGETKEY_THEME_ID) === 'undefined' ? null : BUDGETKEY_THEME_ID},
  {provide: LANG_TOKEN, useValue: typeof(BUDGETKEY_LANG) === 'undefined' ? defaultLang : BUDGETKEY_LANG}
];

if (typeof(BUDGETKEY_NG2_COMPONENTS_THEME) !== 'undefined') {
  if (typeof(BUDGETKEY_APP_SEARCH_THEME) !== 'undefined') {
    BUDGETKEY_NG2_COMPONENTS_THEME = Object.assign({}, BUDGETKEY_NG2_COMPONENTS_THEME, BUDGETKEY_APP_SEARCH_THEME);
  }
  providers.push({provide: THEME_TOKEN,
                  useValue: BUDGETKEY_NG2_COMPONENTS_THEME});
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BudgetKeyCommonModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SearchComponent,

    SearchResultComponent,
    BudgetSearchResultComponent,
    EntitiesSearchResultComponent,
    TendersSearchResultComponent,
    ContractSpendingSearchResultComponent,
    SupportsSearchResultComponent,
    ReportsSearchResultComponent,

    SearchFilterMenuBarComponent,
    SearchFilterMenuComponent,

    TimelineComponent,
    TimelineMenuComponent,
    TimelineScaleComponent
  ],
  providers: providers,
  bootstrap: [ AppComponent ]
})
export class AppModule { }
