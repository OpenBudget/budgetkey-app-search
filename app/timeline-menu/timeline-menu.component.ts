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

    if (TimelineMenuRange[this.menuRange] === TimelineMenuRange.custom_range) {
      period.start = this.startRange || this.timelineMenu.formatedMinDate();
      period.end = this.endRange || this.timelineMenu.formatedMaxDate();
    }

    this.onPeriodChange(period);
  }

  onPeriodChange(newPeriod: any) {
    this.selectedPeriod = newPeriod;
    this.onPeriodChangeTimeline.emit(this.selectedPeriod);
  }
}
