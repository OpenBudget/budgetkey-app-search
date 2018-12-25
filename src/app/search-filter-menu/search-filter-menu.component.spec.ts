import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterMenuComponent } from './search-filter-menu.component';

describe('SearchFilterMenuComponent', () => {
  let component: SearchFilterMenuComponent;
  let fixture: ComponentFixture<SearchFilterMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFilterMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
