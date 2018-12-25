import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultBaseComponent } from './search-result-base.component';

describe('SearchResultBaseComponent', () => {
  let component: SearchResultBaseComponent;
  let fixture: ComponentFixture<SearchResultBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
