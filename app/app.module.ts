import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {HttpModule} from "@angular/http";
import {SearchService} from "./search.service";
import {BudgetSearchComponent} from "./budget_search.component";

import { BudgetKeyCommonModule } from 'budgetkey-ng2-components';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    BudgetKeyCommonModule
  ],
  declarations: [
    AppComponent,
    BudgetSearchComponent,
  ],
  providers: [
    SearchService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
