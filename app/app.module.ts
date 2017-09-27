import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';

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
import { SearchResultPeopleComponent } from './search_result/search_result.component';

import { Highlighter } from './highlighter/search.highlighter';
import { SparklineComponent } from './search_result/sparkline.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    BudgetKeyCommonModule,
    AppRoutingModule,
    NvD3Module
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
    SearchResultPeopleComponent,
    Highlighter,
    SparklineComponent
  ],
  providers: [
    SearchService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
