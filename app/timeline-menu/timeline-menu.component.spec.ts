import 'karma-test-shim';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TimelineMenuComponent } from './timeline-menu.component';
import { HttpModule } from '@angular/http';

describe('TimelineMenuComponent', () => {
  let component: TimelineMenuComponent;
  let fixture: ComponentFixture<TimelineMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule ],
      declarations: [ TimelineMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onPeriodChangeTimeline event', (done: any) => {
    let timelineMenuComponent = new TimelineMenuComponent();

    timelineMenuComponent.onPeriodChangeSearch.subscribe((s: any) => {
      expect(s).toEqual({ greeting: 'hello' });
      done();
    });

    timelineMenuComponent.onPeriodChange({ greeting: 'hello' });
  });

});
