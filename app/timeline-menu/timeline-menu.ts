let _ = require('lodash');

export enum TimelineMenuRange { LastWeek, LastMonth, LastYear, LastDecade, PreDecade, CustomRange }

export class TimelineMenu {
  LIMIT_NUM = 8640000000000000;
  MIN_DATE = new Date(-this.LIMIT_NUM);
  MAX_DATE = new Date(this.LIMIT_NUM);
  periods = [
    { 'title': '7 ימים אחרונים', 'value': 'LastWeek', 'start': '', 'end': '' },
    { 'title': '30 ימים אחרונים', 'value': 'LastMonth', 'start': '', 'end': '' },
    { 'title': 'השנה', 'value': 'LastYear', 'start': '', 'end': '' },
    { 'title': 'בעשור האחרון', 'value': 'LastDecade', 'start': '', 'end': '' },
    { 'title': 'מלפני עשור ויותר', 'value': 'PreDecade', 'start': '', 'end': '' },
    { 'title': 'טווח תאריכים לבחירתך', 'value': 'CustomRange', 'start': '', 'end': '' }
  ];

  constructor() {
    this.initPeriods();
  }

  getPeriod(range: TimelineMenuRange) {
    return _.find(this.periods, ['value', TimelineMenuRange[range]]);
  }

  private initPeriods(): any {
    let that = this;
    _.forEach(this.periods, function(value: any, key: any) {

      value.start = new Date();
      value.end = new Date();
      let range: number = +TimelineMenuRange[value.value];
      let now = new Date();

      switch (range) {
        case TimelineMenuRange.LastWeek:
          value.start.setDate(now.getDate() - 7);
          break;
        case TimelineMenuRange.LastMonth:
          value.start.setMonth(now.getMonth() - 1);
          break;
        case TimelineMenuRange.LastYear:
          value.start = new Date(Date.UTC(now.getFullYear(), 0, 1));
          break;
        case TimelineMenuRange.LastDecade:
          value.start = new Date(Date.UTC(now.getFullYear() - 10, 0, 1));
          break;
        case TimelineMenuRange.PreDecade:
          value.start = that.MIN_DATE;
          value.end = new Date(Date.UTC(now.getFullYear() - 10, 0, 1));
          break;
        case TimelineMenuRange.CustomRange:
          value.start.setDate(now.getDate() - 7);
          break;
        default:
      }

      value.start = value.start.toISOString().substr(0, value.start.toISOString().indexOf('T'));
      value.end = value.end.toISOString().substr(0, value.end.toISOString().indexOf('T'));
    });
  }
}

