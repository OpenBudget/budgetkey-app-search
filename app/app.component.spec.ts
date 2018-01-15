import 'karma-test-shim';
import './rxjs-extensions';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { SearchService } from './_service/search.service';
import { SearchComponent } from './search/search.component';

import { BudgetKeyCommonModule } from 'budgetkey-ng2-components';
import { SearchResultComponent } from './search_result/search_result.component';
import {APP_BASE_HREF} from '../node_modules/@angular/common/src/location/location_strategy';


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
        SearchResultComponent
      ],
      providers: [
        SearchService,
        {provide: APP_BASE_HREF, useValue : '/' }
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
