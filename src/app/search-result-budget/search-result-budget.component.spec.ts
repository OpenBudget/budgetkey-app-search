import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultBudgetComponent } from './search-result-budget.component';

describe('SearchResultBudgetComponent', () => {
  let component: SearchResultBudgetComponent;
  let fixture: ComponentFixture<SearchResultBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
