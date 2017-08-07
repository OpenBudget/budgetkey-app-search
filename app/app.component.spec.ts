import 'karma-test-shim';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
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

describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        HttpModule,
        BudgetKeyCommonModule,
        AppRoutingModule,
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
        Highlighter
      ],
      providers: [
        SearchService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined() );
});
