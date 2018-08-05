import { Component, OnInit } from '@angular/core';
const data = require('./timeline-scale.data.json');

@Component({
  selector: 'timeline-scale',
  template: require('./timeline-scale.component.html'),
  styles: [require('./timeline-scale.component.css')]
})

export class TimelineScaleComponent implements OnInit {

  private timeline = data.timeline;
  private coeficient = 0;

  constructor() { }

  ngOnInit() {

    let maxValue = 0;
    this.timeline.forEach((item: any, index: any) => {
      maxValue = item[1] > (maxValue || 0) ? item[1] : maxValue;
    });

    this.coeficient = 100 / maxValue;
  }

}
