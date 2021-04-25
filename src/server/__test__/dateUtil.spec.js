import {getDaysFromNow, padZero} from '../dateUtil';

describe("dateUtil", () => {
  test('getDaysFromNow()', () => {
    const today = new Date();
    expect(getDaysFromNow(today)).toEqual(0);
  });

  test('padZero()', () => {
    expect(padZero(3)).toEqual('03');
    expect(padZero(25)).toEqual('25');
  });
});