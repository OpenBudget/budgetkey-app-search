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
import { SearchResultBudgetComponent } from './search-result-budget/search-result-budget.component';
import { SearchResultContractSpendingComponent } from './search-result-contract-spending/search-result-contract-spending.component';
import { SearchResultEntitiesComponent } from './search-result-entities/search-result-entities.component';
import { SearchResultReportsComponent } from './search-result-reports/search-result-reports.component';
import { SearchResultSupportsComponent } from './search-result-supports/search-result-supports.component';
import { SearchResultTendersComponent } from './search-result-tenders/search-result-tenders.component';
import { TimelineMenuComponent } from './timeline-menu/timeline-menu.component';

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
        SearchResultBudgetComponent,
        SearchResultContractSpendingComponent,
        SearchResultEntitiesComponent,
        SearchResultReportsComponent,
        SearchResultSupportsComponent,
        SearchResultTendersComponent,
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
