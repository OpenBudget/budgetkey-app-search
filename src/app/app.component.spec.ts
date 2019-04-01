import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BudgetKeyCommonModule } from 'budgetkey-ng2-components';
import { BudgetkeyNg2AuthModule } from 'budgetkey-ng2-auth';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { appRoutes, AppModule } from './app.module';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './api.service';
import { SearchComponent } from './search/search.component';
import { SearchFilterMenuComponent } from './search-filter-menu/search-filter-menu.component';
import { SearchFilterMenuBarComponent } from './search-filter-menu-bar/search-filter-menu-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { TimelineMenuComponent } from './timeline-menu/timeline-menu.component';
import { SearchTagComponent } from './search-tag/search-tag.component';
import { VerticalResultsComponent } from './vertical-results/vertical-results.component';
import { HorizontalResultsComponent } from './horizontal-results/horizontal-results.component';
import { SearchModeSelectorComponent } from './search-mode-selector/search-mode-selector.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
        ),
        HttpClientModule,
        BudgetkeyNg2AuthModule,
        BudgetKeyCommonModule,
      ],
      declarations: [
        AppComponent,
        SearchComponent,
        SearchFilterMenuComponent,
        SearchFilterMenuBarComponent,
        SearchResultComponent,
        SearchTagComponent,
        VerticalResultsComponent,
        HorizontalResultsComponent,
        SearchModeSelectorComponent,
        TimelineMenuComponent
      ],
      providers: [
        SearchService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
