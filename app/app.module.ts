import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { SearchService } from './_service/search.service';
import { SearchComponent } from './search/search.component';

import { BudgetKeyCommonModule } from 'budgetkey-ng2-components';
import { SearchResultComponent } from './search_result/search_result.component';


import { AppRoutingModule } from './app-routing.module';

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
  providers: [
    SearchService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
