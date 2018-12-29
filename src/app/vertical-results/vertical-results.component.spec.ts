import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalResultsComponent } from './vertical-results.component';

describe('VerticalResultsComponent', () => {
  let component: VerticalResultsComponent;
  let fixture: ComponentFixture<VerticalResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
