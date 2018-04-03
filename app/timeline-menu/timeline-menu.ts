export class TimelineMenu {

  MIN_DATE = new Date('1900-1-1');
  MAX_DATE = new Date('2100-12-31');
  periods: any;

  constructor() {
    this.periods = this.initPeriods();
  }

  formatDate(date: Date): string {
    return date.toISOString().substr(0, date.toISOString().indexOf('T'));
  }

  private initPeriods() {
    let now = new Date();
    let startLastWeek = new Date(new Date().setDate(now.getDate() - 7));
    let startLastMonth = new Date(new Date().setDate(now.getMonth() - 1));
    let startLastYear = new Date(Date.UTC(now.getFullYear(), 0, 1));
    let startLastDecade = new Date(Date.UTC(now.getFullYear() - 10, 0, 1));
    let endPreDecade = new Date(Date.UTC(now.getFullYear() - 10, 0, 1));
    let startCustomRange = new Date(new Date().setDate(now.getDate() - 7));

    const periods = {
      last_week: {
        'title': '7 ימים אחרונים',
        'value': TimelineMenuRange[TimelineMenuRange.last_week],
        'start': this.formatDate(startLastWeek), 'end': this.formatDate(now)
      },
      last_month: {
        'title': '30 ימים אחרונים',
        'value': TimelineMenuRange[TimelineMenuRange.last_month],
        'start': this.formatDate(startLastMonth), 'end': this.formatDate(now)
      },
      last_year: {
        'title': 'השנה',
        'value': TimelineMenuRange[TimelineMenuRange.last_year],
        'start': this.formatDate(startLastYear), 'end': this.formatDate(now)
      },
      last_decade: {
        'title': 'בעשור האחרון',
        'value': TimelineMenuRange[TimelineMenuRange.last_decade],
        'start': this.formatDate(startLastDecade), 'end': this.formatDate(now)
      },
      pre_decade: {
        'title': 'מלפני עשור ויותר',
        'value': TimelineMenuRange[TimelineMenuRange.pre_decade],
        'start': this.formatDate(this.MIN_DATE), 'end': this.formatDate(endPreDecade)
      },
      custom_range: {
        'title': 'טווח תאריכים לבחירתך',
        'value': TimelineMenuRange[TimelineMenuRange.custom_range],
        'start': this.formatDate(startCustomRange), 'end': this.formatDate(now)
      }
    };
    return periods;
  }
}

export enum TimelineMenuRange {
  last_week,
  last_month,
  last_year,
  last_decade,
  pre_decade,
  custom_range
}
