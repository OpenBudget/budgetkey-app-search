import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { SearchService } from './_service/search.service';
import { SearchComponent } from './search/search.component';

import { BudgetKeyCommonModule } from 'budgetkey-ng2-components';
import { SearchResultBudgetComponent } from './search_result/search_result.component';
import { SearchResultChangesComponent } from './search_result/search_result.component';
import { SearchResultExemptionComponent } from './search_result/search_result.component';
import { SearchResultProcurementComponent } from './search_result/search_result.component';
import { SearchResultSupportsComponent } from './search_result/search_result.component';
import { SearchResultEntitiesComponent } from './search_result/search_result.component';

import { Highlighter } from './highlighter/search.highlighter';

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
    SearchResultBudgetComponent,
    SearchResultChangesComponent,
    SearchResultExemptionComponent,
    SearchResultProcurementComponent,
    SearchResultSupportsComponent,
    SearchResultEntitiesComponent,
    Highlighter
  ],
  providers: [
    SearchService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
