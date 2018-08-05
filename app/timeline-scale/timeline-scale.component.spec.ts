import 'karma-test-shim';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineScaleComponent } from './timeline-scale.component';

let data = require('./timeline-scale.data.json').timeline;

describe('TimelineScaleComponent', () => {
  let component: TimelineScaleComponent;
  let fixture: ComponentFixture<TimelineScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineScaleComponent);
    component = fixture.componentInstance;
    component.timeline = [];
    fixture.detectChanges();
    component.timeline = data;
    component.ngOnChanges();
  });

  it('coeficient should be between 0 and 1', () => {
    expect(component['coefficient']).toBeGreaterThan(0);
    expect(component['coefficient']).toBeLessThan(1);
  });

});
