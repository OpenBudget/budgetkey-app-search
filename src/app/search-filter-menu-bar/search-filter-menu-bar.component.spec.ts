import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterMenuBarComponent } from './search-filter-menu-bar.component';

describe('SearchFilterMenuBarComponent', () => {
  let component: SearchFilterMenuBarComponent;
  let fixture: ComponentFixture<SearchFilterMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFilterMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
