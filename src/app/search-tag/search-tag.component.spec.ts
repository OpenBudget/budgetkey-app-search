import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTagComponent } from './search-tag.component';

describe('SearchTagComponent', () => {
  let component: SearchTagComponent;
  let fixture: ComponentFixture<SearchTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
