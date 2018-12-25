import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'timeline-menu',
  templateUrl: './timeline-menu.component.html',
  styleUrls: ['./timeline-menu.component.less']
})
export class TimelineMenuComponent {

  @Input() periods: any[];
  @Input() selectedPeriod: any;
  @Output() periodChangeSearch = new EventEmitter();

  constructor() {}

  onPeriodChange(newPeriod: any) {
    this.periodChangeSearch.emit(newPeriod);
  }
}
