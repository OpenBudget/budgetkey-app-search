import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalResultsComponent } from './horizontal-results.component';

describe('HorizontalResultsComponent', () => {
  let component: HorizontalResultsComponent;
  let fixture: ComponentFixture<HorizontalResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
