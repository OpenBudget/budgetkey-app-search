import { Component, OnInit, Output, EventEmitter } from '@angular/core';
let _ = require('lodash');
const timeline_menu = require('./timeline-menu.json');

@Component({
  selector: 'app-timeline-menu',
  template: require('./timeline-menu.component.html'),
  styles: [require('./timeline-menu.component.css')]
})
export class TimelineMenuComponent implements OnInit {

  private periods: any[];
  private selectedPeriod: any;

  @Output() onPeriodChangeTimeline = new EventEmitter<boolean>();

  constructor() {
    this.initMenuPeriods(timeline_menu);
    this.periods = timeline_menu;
    this.selectedPeriod = this.periods[0];
  }

  ngOnInit() {
    //  un-comment the next line for get results after page load
    //  this.onPeriodChange(this.selectedPeriod);
  }

  initMenuPeriods(menu: any[]): any {
    return _.forEach(menu, function(value: any, key: any) {

      let now = new Date();
      value.start = new Date();
      value.end = new Date();

      switch (value.value) {
        case 'last_weak':
          value.start.setDate(now.getDate() - 7);
          break;
        case 'last_month':
          value.start.setMonth(now.getMonth() - 1);
        break;
        case 'this_year':
          value.start = new Date(Date.UTC(now.getFullYear(), 0, 1));
          break;
        case 'last_decade':
          value.start = new Date(Date.UTC(now.getFullYear() - 10, 0, 1));
          break;
        case 'pre-decade':
          value.start = new Date(-8640000000000000);
          value.end = new Date(Date.UTC(now.getFullYear() - 10, 0, 1));
          break;
        case 'custom-period':
          break;
        default:
      }

      value.start = value.start.toISOString().substr(0, value.start.toISOString().indexOf('T'));
      value.end = value.end.toISOString().substr(0, value.end.toISOString().indexOf('T'));
    });
  }

  onPeriodChange(newPeriod: any) {
    this.selectedPeriod = newPeriod;
    this.onPeriodChangeTimeline.emit(this.selectedPeriod);
  }
}
