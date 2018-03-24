import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'timeline',
  template: require('./timeline.component.html'),
  styles: [require('./timeline.component.css')]
})
export class TimelineComponent implements OnInit {
  private selectedPeriod: any;

  @Input() menuRange: string;
  @Input() startRange: string;
  @Input() endRange: string;
  @Output() onPeriodChangeSearch = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  onPeriodChangeTimeline(newPeriod: any) {
    this.selectedPeriod = newPeriod;
    this.onPeriodChangeSearch.emit(this.selectedPeriod);
  }
}
