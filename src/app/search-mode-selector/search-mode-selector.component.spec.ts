import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchModeSelectorComponent } from './search-mode-selector.component';

describe('SearchModeSelectorComponent', () => {
  let component: SearchModeSelectorComponent;
  let fixture: ComponentFixture<SearchModeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchModeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchModeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
