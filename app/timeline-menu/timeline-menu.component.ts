import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimelineMenu, TimelineMenuRange } from './timeline-menu';

@Component({
  selector: 'timeline-menu',
  template: require('./timeline-menu.component.html'),
  styles: [require('./timeline-menu.component.css')],
})

export class TimelineMenuComponent implements OnInit {

  private options: any[];
  private selectedPeriod: any;
  private periods: any[];
  private timelineMenu: TimelineMenu;

  @Input() menuRange: string;
  @Input() startRange: string;
  @Input() endRange: string;
  @Output() onPeriodChangeTimeline = new EventEmitter();

  constructor() {
    this.timelineMenu = new TimelineMenu();
    this.periods = this.timelineMenu.periods;

    let options = Object.keys(TimelineMenuRange);
    this.options = options.slice(options.length / 2);
  }

  ngOnInit() {
    let period = this.timelineMenu.periods[this.menuRange];

    // init the start and the end dates if they are not supplied in url
    if (TimelineMenuRange[this.menuRange] === TimelineMenuRange.custom_range) {
        period.start = this.startRange ? this.startRange : period.start;
        period.end = this.endRange ? this.endRange : period.end;
    }

    this.onPeriodChange(period);
  }

  onPeriodChange(newPeriod: any) {
    this.selectedPeriod = newPeriod;
    this.onPeriodChangeTimeline.emit(newPeriod);
  }
}
