import {getDaysFromNow, padZero, parseDate} from '../dateUtil';

describe("dateUtil", () => {
  test('getDaysFromNow()', () => {
    const today = new Date();
    expect(getDaysFromNow(today)).toEqual(0);
  });

  test('padZero()', () => {
    expect(padZero(3)).toEqual('03');
    expect(padZero(25)).toEqual('25');
  });

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