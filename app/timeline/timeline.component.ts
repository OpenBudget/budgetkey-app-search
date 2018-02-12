import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timeline',
  template: require('./timeline.component.html'),
  styles: [require('./timeline.component.css')]
})
export class TimelineComponent implements OnInit {
  private selectedPeriod: any;

  @Output() onPeriodChangeSearch = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onPeriodChangeTimeline(newPeriod: any) {
    this.selectedPeriod = newPeriod;
    this.onPeriodChangeSearch.emit(this.selectedPeriod);
  }

}
