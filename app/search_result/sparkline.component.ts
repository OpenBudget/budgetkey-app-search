import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sparkline',
    template: `
      <div>
        <nvd3 [options]="options" [data]="data"></nvd3>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.4/nv.d3.min.css"/>
      </div>
    `
})

export class SparklineComponent implements OnInit {
  @Input() dataPoints: [{ x: number, y: number }];

  options: any;
  data: any;

  ngOnInit() {
    this.options = {
      chart: {
        type: 'lineChart',
        height: 20,
        width: 100,
        margin : {
          top: 5,
          right: 0,
          bottom: 0,
          left: 0
        },
        x: (d: any) => d.x,
        y: (d: any) => d.y,
        useInteractiveGuideline: true,
        showLegend: false,
        showXAxis: false,
        showYAxis: false,
      }
    };

    this.data = [
      {
        values: this.dataPoints,
        key: 'תקציב',
        color: '#2ca02c'
      }
    ];
  }
}
