import 'karma-test-shim';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineScaleComponent } from './timeline-scale.component';

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
    fixture.detectChanges();
  });

  it('coeficient should be between 0 and 1', () => {
    expect(component['coeficient']).toBeGreaterThan(0);
    expect(component['coeficient']).toBeLessThan(1);
  });

});
