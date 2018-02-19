import { Component, OnInit, Output, EventEmitter } from '@angular/core';
let _ = require('lodash');
const TIMELINE_MENU_DATA = require('./timeline-menu.json');
import { SearchService } from '../_service/search.service';

@Component({
  selector: 'timeline-menu',
  template: require('./timeline-menu.component.html'),
  styles: [require('./timeline-menu.component.css')],
  providers: [SearchService]
})
export class TimelineMenuComponent implements OnInit {

  private periods: any[];
  private selectedPeriod: any;

  @Output() onPeriodChangeTimeline = new EventEmitter<boolean>();

  constructor(private searchService: SearchService) {
    this.periods = this.initMenuPeriods(TIMELINE_MENU_DATA);
    this.selectedPeriod = this.periods[0];
  }

  ngOnInit() {
    //  un-comment the next line for get results after page load
    //  this.onPeriodChange(this.selectedPeriod);
  }

  initMenuPeriods(menu: any[]): any {
    let minDate = this.searchService.MIN_DATE;
    return _.forEach(menu, function(value: any, key: any) {

      let now = new Date();
      value.start = new Date();
      value.end = new Date();

      switch (value.value) {
        case 'last_week':
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
        case 'pre_decade':
          value.start = new Date(minDate);
          value.end = new Date(Date.UTC(now.getFullYear() - 10, 0, 1));
          break;
        case 'custom_period':
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
