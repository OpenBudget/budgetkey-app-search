import 'karma-test-shim';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineMenuComponent } from './timeline-menu.component';

describe('TimelineMenuComponent', () => {
  let component: TimelineMenuComponent;
  let fixture: ComponentFixture<TimelineMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
});
