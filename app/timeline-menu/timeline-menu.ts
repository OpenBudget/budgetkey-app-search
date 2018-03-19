let _ = require('lodash');

export enum TimelineMenuRange { last_week, last_month, last_year, last_decade, pre_decade, custom_range }

export class TimelineMenu {
  LIMIT_NUM = 8640000000000000;
  MIN_DATE = new Date(-this.LIMIT_NUM);
  MAX_DATE = new Date(this.LIMIT_NUM);
  periods = [
    { 'title': '7 ימים אחרונים', 'value': 'last_week', 'start': '', 'end': '' },
    { 'title': '30 ימים אחרונים', 'value': 'last_month', 'start': '', 'end': '' },
    { 'title': 'השנה', 'value': 'last_year', 'start': '', 'end': '' },
    { 'title': 'בעשור האחרון', 'value': 'last_decade', 'start': '', 'end': '' },
    { 'title': 'מלפני עשור ויותר', 'value': 'pre_decade', 'start': '', 'end': '' },
    { 'title': 'טווח תאריכים לבחירתך', 'value': 'custom_range', 'start': '', 'end': '' }
  ];

  constructor() {
    this.initPeriods();
  }

  getPeriod(range: TimelineMenuRange) {
    return _.find(this.periods, ['value', TimelineMenuRange[range]]);
  }

  formatDate(date: Date): string {
    return date.toISOString().substr(0, date.toISOString().indexOf('T'));
  }

  formatedMinDate(): string {
    return this.formatDate(this.MIN_DATE);
  }

  formatedMaxDate(): string {
    return this.formatDate(this.MAX_DATE);
  }

  private initPeriods(): any {
    let that = this;
    _.forEach(this.periods, function(value: any, key: any) {

      value.start = new Date();
      value.end = new Date();
      let range: number = +TimelineMenuRange[value.value];
      let now = new Date();

      switch (range) {
        case TimelineMenuRange.last_week:
          value.start.setDate(now.getDate() - 7);
          break;
        case TimelineMenuRange.last_month:
          value.start.setMonth(now.getMonth() - 1);
          break;
        case TimelineMenuRange.last_year:
          value.start = new Date(Date.UTC(now.getFullYear(), 0, 1));
          break;
        case TimelineMenuRange.last_decade:
          value.start = new Date(Date.UTC(now.getFullYear() - 10, 0, 1));
          break;
        case TimelineMenuRange.pre_decade:
          value.start = that.MIN_DATE;
          value.end = new Date(Date.UTC(now.getFullYear() - 10, 0, 1));
          break;
        case TimelineMenuRange.custom_range:
          value.start.setDate(now.getDate() - 7);
          break;
        default:
      }

      value.start = that.formatDate(value.start);
      value.end = that.formatDate(value.end);
    });
  }
}

