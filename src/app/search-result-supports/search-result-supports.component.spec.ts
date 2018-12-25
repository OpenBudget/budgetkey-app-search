import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultSupportsComponent } from './search-result-supports.component';

describe('SearchResultSupportsComponent', () => {
  let component: SearchResultSupportsComponent;
  let fixture: ComponentFixture<SearchResultSupportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultSupportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultSupportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
