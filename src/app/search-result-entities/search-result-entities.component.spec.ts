import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultEntitiesComponent } from './search-result-entities.component';

describe('SearchResultEntitiesComponent', () => {
  let component: SearchResultEntitiesComponent;
  let fixture: ComponentFixture<SearchResultEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
