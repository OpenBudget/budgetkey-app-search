import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {HttpModule} from "@angular/http";
import {SearchService} from "./search.service";
import {SearchComponent} from "./search.component";

import { BudgetKeyCommonModule } from 'budgetkey-ng2-components';
import {SearchResultBudgetComponent} from "./search_result.component";
import {SearchResultChangesComponent} from "./search_result.component";
import {SearchResultExemptionComponent} from "./search_result.component";
import {SearchResultsupportsComponent} from "./search_result.component";

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    BudgetKeyCommonModule
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultBudgetComponent,
    SearchResultChangesComponent,
    SearchResultExemptionComponent,
    SearchResultsupportsComponent
  ],
  providers: [
    SearchService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
