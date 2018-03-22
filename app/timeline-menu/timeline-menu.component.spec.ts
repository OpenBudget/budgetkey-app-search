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
});
