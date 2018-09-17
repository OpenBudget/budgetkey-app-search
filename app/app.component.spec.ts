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
import { SearchResultComponent,
         BudgetSearchResultComponent,
         EntitiesSearchResultComponent,
         TendersSearchResultComponent,
         ContractSpendingSearchResultComponent,
         SupportsSearchResultComponent,
         ReportsSearchResultComponent,
        } from './search-result';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineMenuComponent } from './timeline-menu/timeline-menu.component';
import { TimelineScaleComponent } from './timeline-scale/timeline-scale.component';
import { SearchFilterMenuBarComponent,
         SearchFilterMenuComponent,
} from './search-filter';

import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';


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
        FormsModule
      ],
      declarations: [
        AppComponent,
        SearchComponent,

        SearchResultComponent,
        SearchFilterMenuBarComponent,
        SearchFilterMenuComponent,
        BudgetSearchResultComponent,
        EntitiesSearchResultComponent,
        TendersSearchResultComponent,
        ContractSpendingSearchResultComponent,
        SupportsSearchResultComponent,
        ReportsSearchResultComponent,

        TimelineComponent,
        TimelineMenuComponent,
        TimelineScaleComponent
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
