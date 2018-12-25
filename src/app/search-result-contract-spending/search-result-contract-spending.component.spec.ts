import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultContractSpendingComponent } from './search-result-contract-spending.component';

describe('SearchResultContractSpendingComponent', () => {
  let component: SearchResultContractSpendingComponent;
  let fixture: ComponentFixture<SearchResultContractSpendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultContractSpendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultContractSpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
