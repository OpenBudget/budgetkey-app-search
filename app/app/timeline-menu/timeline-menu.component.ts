import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'timeline-menu',
  template: require('./timeline-menu.component.html'),
  styles: [require('./timeline-menu.component.css')],
})

export class TimelineMenuComponent {

  @Input() periods: any[];
  @Input() selectedPeriod: any;
  @Output() onPeriodChangeSearch = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  onPeriodChange(newPeriod: any) {
    this.onPeriodChangeSearch.emit(newPeriod);
  }
}
