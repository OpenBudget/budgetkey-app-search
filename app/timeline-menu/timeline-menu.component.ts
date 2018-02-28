import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimelineMenu, TimelineMenuRange } from './timeline-menu';

@Component({
  selector: 'timeline-menu',
  template: require('./timeline-menu.component.html'),
  styles: [require('./timeline-menu.component.css')],
})

export class TimelineMenuComponent implements OnInit {
  private periods: any[];
  private selectedPeriod: any;
  private timelineMenu: TimelineMenu;

  @Input() menuRange: string;
  @Input() startRange: string;
  @Input() endRange: string;
  @Output() onPeriodChangeTimeline = new EventEmitter<boolean>();

  constructor() {
    this.timelineMenu = new TimelineMenu();
    this.periods = this.timelineMenu.periods;
  }

  ngOnInit() {
    const period = this.timelineMenu.getPeriod(TimelineMenuRange[this.menuRange]);

    if (TimelineMenuRange[this.menuRange] === TimelineMenuRange.CustomRange) {
      period.start = this.startRange || this.timelineMenu.MIN_DATE.toISOString()
        .substr(0, this.timelineMenu.MIN_DATE.toISOString().indexOf('T'));
      period.end = this.endRange || this.timelineMenu.MAX_DATE.toISOString()
        .substr(0, this.timelineMenu.MAX_DATE.toISOString().indexOf('T'));
    }

    this.onPeriodChange(period);
  }

  onPeriodChange(newPeriod: any) {
    this.selectedPeriod = newPeriod;
    this.onPeriodChangeTimeline.emit(this.selectedPeriod);
  }
}
