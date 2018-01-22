import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { SearchService } from './_service/search.service';
import { SearchComponent } from './search/search.component';

import { BudgetKeyCommonModule, THEME_TOKEN as NG_COMPONENTS_THEME_TOKEN } from 'budgetkey-ng2-components';
import { SearchResultComponent } from './search_result/search_result.component';


import { AppRoutingModule } from './app-routing.module';

import { OpaqueToken } from '@angular/core';

let defaultTheme = {
  // TODO: add default theme values
};

const THEME_TOKEN = new OpaqueToken('Theme Config');
declare const BUDGETKEY_NG2_COMPONENTS_THEME: any;
declare const BUDGETKEY_APP_SEARCH_THEME: any;

declare const authServerUrl: any;

let providers: any[] = [
  SearchService,
  {provide: THEME_TOKEN, useValue: typeof(BUDGETKEY_APP_SEARCH_THEME) === 'undefined' ? defaultTheme : BUDGETKEY_APP_SEARCH_THEME}
];
if (typeof(BUDGETKEY_NG2_COMPONENTS_THEME) !== 'undefined') {
  providers.push({provide: NG_COMPONENTS_THEME_TOKEN, useValue: BUDGETKEY_NG2_COMPONENTS_THEME});
}

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    BudgetKeyCommonModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultComponent
  ],
  providers: providers,
  bootstrap: [ AppComponent ]
})
export class AppModule { }
