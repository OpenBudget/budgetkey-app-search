import 'karma-test-shim';
import { async } from '@angular/core/testing';
import { TimeRanges } from './time-ranges';

describe('TimelineMenu Class', () => {
  let timelineMenu: TimeRanges;

  let periods: any[];

  beforeEach(async(() => {
    timelineMenu = new TimeRanges();
    periods = timelineMenu.periods;
  }));

  it('formatDate should return well formated string date, plus MIN_DATE & MAX_DATE are correct Dates', () => {
    let minDate = timelineMenu.MIN_DATE;
    let maxDate = timelineMenu.MAX_DATE;
    let dateFmt = timelineMenu.DATE_FMT;

    expect(minDate.format(dateFmt).length).toEqual('xx-xx-xxxx'.length);
    expect(maxDate.format(dateFmt).length).toEqual('xx-xx-xxxx'.length);
  });

  it('periods and options are should be created and should be not null', () => {
    expect(periods).toBeTruthy();
  });

});
