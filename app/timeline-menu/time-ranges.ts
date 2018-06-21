import * as moment from 'moment';


export class TimeRanges {

  MIN_DATE = moment('1900-01-02');
  MAX_DATE = moment('2100-12-31');
  DATE_FMT = 'YYYY-MM-DD';
  periods: any[];

  constructor() {
    this.periods = this.initPeriods();
  }

  formatDate(date: Date): string {
    return date.toISOString().substr(0, date.toISOString().indexOf('T'));
  }

  private initPeriods() {
    let fmt = this.DATE_FMT;
    // let now = moment().format(fmt);
    let theFuture = moment().add(10, 'years').format(fmt);
    let startLastWeek = moment().subtract(1, 'weeks').format(fmt);
    let startLastMonth = moment().subtract(1, 'months').format(fmt);
    let startLastYear = moment().subtract(1, 'years').format(fmt);
    let startLastDecade = moment().subtract(10, 'years').format(fmt);
    let thePast = moment().subtract(30, 'years').format(fmt);
    // let startCustomRange = startLastMonth;

    const periods = [
      {
        'title': '7 הימים האחרונים',
        'value': 'last_week',
        'start': startLastWeek, 'end': theFuture
      },
      {
        'title': '30 הימים האחרונים',
        'value': 'last_month',
        'start': startLastMonth, 'end': theFuture
      },
      {
        'title': 'השנה האחרונה',
        'value': 'last_year',
        'start': startLastYear, 'end': theFuture
      },
      {
        'title': 'העשור האחרון',
        'value': 'last_decade',
        'start': startLastDecade, 'end': theFuture
      },
      {
        'title': 'הכל',
        'value': 'all',
        'start': thePast, 'end': theFuture
      },
      // {
      //   'title': 'טווח התאריכים',
      //   'value': 'custom_range',
      //   'start': startCustomRange, 'end': now
      // }
    ];
    return periods;
  }
}
