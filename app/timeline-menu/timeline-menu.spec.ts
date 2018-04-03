import 'karma-test-shim';
import { async } from '@angular/core/testing';
import { TimelineMenu, TimelineMenuRange } from './timeline-menu';

describe('TimelineMenu Class', () => {
  let timelineMenu: TimelineMenu;
  let timelineMenuRange: any[];

  let options: any[];
  let periods: any[];

  beforeEach(async(() => {
    timelineMenu = new TimelineMenu();
    periods = Object.keys(timelineMenu.periods);

    timelineMenuRange = Object.keys(TimelineMenuRange);
    options = timelineMenuRange.slice(timelineMenuRange.length / 2);
  }));

  beforeEach(() => {
  });

  it('formatDate should return well formated string date, plus MIN_DATE & MAX_DATE are correct Dates', () => {
    let minDate = timelineMenu.MIN_DATE;
    let maxDate = timelineMenu.MAX_DATE;

    expect(timelineMenu.formatDate(minDate).length).toEqual('xx-xx-xxxx'.length);
    expect(timelineMenu.formatDate(maxDate).length).toEqual('xx-xx-xxxx'.length);
  });

  it('enum options and data periods should be equal to each other', () => {
    expect(periods).toEqual(options);
  });

  it('periods and options are should be created and should be not null', () => {
    expect(periods).toBeTruthy();
    expect(options).toBeTruthy();
  });

});
