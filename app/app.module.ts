import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { SearchService } from './_service/search.service';
import { SearchComponent } from './search/search.component';

import { BudgetKeyCommonModule, THEME_TOKEN as NG_COMPONENTS_THEME_TOKEN } from 'budgetkey-ng2-components';

import { SearchResultComponent,
         BudgetSearchResultComponent,
         EntitiesSearchResultComponent,
         TendersSearchResultComponent,
         ContractSpendingSearchResultComponent,
         SupportsSearchResultComponent,
        } from './search-result';

import { TimelineComponent } from './timeline/timeline.component';
import { TimelineMenuComponent } from './timeline-menu/timeline-menu.component';
import { TimelineScaleComponent } from './timeline-scale/timeline-scale.component';
import { SearchFilterMenuBarComponent,
         SearchFilterMenuComponent,
} from './search-filter';
import { AppRoutingModule } from './app-routing.module';

import { InjectionToken } from '@angular/core';
import { THEME_ID_TOKEN } from './_config/config';

import { LOCALE_ID } from '@angular/core';
let defaultTheme = {
  // TODO: add default theme values
};

const THEME_TOKEN = new InjectionToken('Theme Config');
declare const BUDGETKEY_NG2_COMPONENTS_THEME: any;
declare const BUDGETKEY_APP_SEARCH_THEME: any;
declare const BUDGETKEY_THEME_ID: any;

declare const authServerUrl: any;

let providers: any[] = [
  SearchService,
  {provide: THEME_TOKEN, useValue: typeof(BUDGETKEY_APP_SEARCH_THEME) === 'undefined' ? defaultTheme : BUDGETKEY_APP_SEARCH_THEME},
  {provide: THEME_ID_TOKEN, useValue: typeof(BUDGETKEY_THEME_ID) === 'undefined' ? null : BUDGETKEY_THEME_ID},
];
if (typeof(BUDGETKEY_NG2_COMPONENTS_THEME) !== 'undefined') {
  providers.push({provide: NG_COMPONENTS_THEME_TOKEN, useValue: BUDGETKEY_NG2_COMPONENTS_THEME});
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
