import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {HttpModule} from "@angular/http";
import {SearchService} from "./_service/search.service";
import {SearchComponent} from "./search/search.component";

import { BudgetKeyCommonModule } from 'budgetkey-ng2-components';
import {SearchResultBudgetComponent} from "./search_result/search_result.component";
import {SearchResultChangesComponent} from "./search_result/search_result.component";
import {SearchResultExemptionComponent} from "./search_result/search_result.component";
import {SearchResultProcurementComponent} from "./search_result/search_result.component";
import {SearchResultSupportsComponent} from "./search_result/search_result.component";
import {SearchResultEntitiesComponent} from "./search_result/search_result.component";

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
    SearchResultProcurementComponent,
    SearchResultSupportsComponent,
    SearchResultEntitiesComponent
  ],
  providers: [
    SearchService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
