import 'karma-test-shim';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TimelineComponent } from './timeline.component';
import { TimelineMenuComponent } from '../timeline-menu/timeline-menu.component';
import { TimelineScaleComponent } from '../timeline-scale/timeline-scale.component';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        TimelineComponent,
        TimelineMenuComponent,
        TimelineScaleComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
