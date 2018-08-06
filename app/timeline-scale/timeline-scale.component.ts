import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'timeline-scale',
  template: require('./timeline-scale.component.html'),
  styles: [
    require('./timeline-scale.component.css')
  ]
})

export class TimelineScaleComponent implements OnChanges {

  @Input() timeline: any;
  private coefficient = 0;

  constructor() {}

  ngOnChanges() {
    let maxValue = 0;
    if (this.timeline) {
      this.timeline.forEach((item: any) => {
        maxValue = item[1] > (maxValue || 0) ? item[1] : maxValue;
      });
      this.coefficient = 100.0 / maxValue;
    }
  }

}
