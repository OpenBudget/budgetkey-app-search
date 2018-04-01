import 'karma-test-shim';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TimelineComponent } from './timeline.component';
import { TimelineMenuComponent } from '../timeline-menu/timeline-menu.component';
import { TimelineScaleComponent } from '../timeline-scale/timeline-scale.component';
import { HttpModule } from '@angular/http';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule ],
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

  it('should emit onPeriodChangeSearch event', (done: any) => {
    let timelineComponent = new TimelineComponent();

    timelineComponent.onPeriodChangeSearch.subscribe((s: any) => {
      expect(s).toEqual({ greeting: 'hello' });
      done();
    });

    timelineComponent.onPeriodChangeTimeline({ greeting: 'hello' });
  });

});
