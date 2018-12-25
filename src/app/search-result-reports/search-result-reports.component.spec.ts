import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultReportsComponent } from './search-result-reports.component';

describe('SearchResultReportsComponent', () => {
  let component: SearchResultReportsComponent;
  let fixture: ComponentFixture<SearchResultReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
