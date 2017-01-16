import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {HttpModule} from "@angular/http";
import {SearchService} from "./search.service";
import {BudgetSearchComponent} from "./budget_search.component";

import { BudgetKeyCommonModule } from 'budgetkey-ng2-components';
import {SearchResultBudgetComponent} from "./search_result_budget.component";
import {SearchResultChangesComponent} from "./search_result_changes.component";

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    BudgetKeyCommonModule
  ],
  declarations: [
    AppComponent,
    BudgetSearchComponent,
    SearchResultBudgetComponent,
    SearchResultChangesComponent
  ],
  providers: [
    SearchService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
