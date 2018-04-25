import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'timeline',
  template: require('./timeline.component.html'),
  styles: [require('./timeline.component.css')]
})
export class TimelineComponent {
  @Input() periods: any[];
  @Input() selectedPeriod: any;
  @Output() onPeriodChangeSearch = new EventEmitter();

  constructor() { }

  onPeriodChangeTimeline(newPeriod: any) {
    this.onPeriodChangeSearch.emit(newPeriod);
  }
}
