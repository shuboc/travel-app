import {parseDate} from '../parseDate';

describe("parseDate", () => {

  test('parseDate()', () => {
    const date = new Date();
    date.setFullYear(2021);
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    expect(parseDate('2021-01-01')).toEqual(date);
  });
});