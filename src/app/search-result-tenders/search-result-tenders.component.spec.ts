import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultTendersComponent } from './search-result-tenders.component';

describe('SearchResultTendersComponent', () => {
  let component: SearchResultTendersComponent;
  let fixture: ComponentFixture<SearchResultTendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultTendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
