import assert from 'assert';
import { parseTime, formatTime } from '../src/index';





describe('time', () => {
  describe('#parseTime()', () => {

    const doIt = (value, option, result) => {
      it(
        `parseTime(${value}, '${option}') should return ${JSON.stringify(result)}`,
        () => {
          assert.deepStrictEqual(parseTime(value, option), result);
        }
      );
    };

    doIt(0, 'h', { hour: 0, minute: 0, second: 0 });
    doIt(1000, 'h', { hour: 0, minute: 0, second: 1 });
    doIt(1000 * 60 + 1000, 'h', { hour: 0, minute: 1, second: 1 });
    doIt(1000 * 60 + 1000 * 59, 'h', { hour: 0, minute: 1, second: 59 });
    doIt(1000 * 121, 'h', { hour: 0, minute: 2, second: 1 });
    doIt(
      1000 * 59 + 1000 * 60 * 59 + 1000 * 60 * 60,
      'h',
      { hour: 1, minute: 59, second: 59 }
    );
    doIt(
      1000 + 1000 * 60 + 1000 * 60 * 60 + 1000 * 60 * 60 * 24,
      'day',
      { day: 1, hour: 1, minute: 1, second: 1 }
    );

  });

  describe('#formatTime', () => {
    const time1 = 1000 + 1000 * 60 + 1000 * 60 * 60 + 1000 * 60 * 60 * 24 * 5;
    const result1 = '121:01:01';

    it(
      `formatTime(${time1}) should return ${result1}}`,
      () => {
        assert.strictEqual(formatTime(time1), result1);
      }
    );

    const time2 = 1000 * 60 * 2 + 1000 * 59;
    const result2 = '02:59';

    it(
      `formatTime(${time2}) should return ${result2}}`,
      () => {
        assert.strictEqual(formatTime(time2), result2);
      }
    );

    const time3 = 1000 * 60 * 2 + 1000 * 59 + 2000;
    const result3 = '03:01';

    it(
      `formatTime(${time3}) should return ${result3}}`,
      () => {
        assert.strictEqual(formatTime(time3), result3);
      }
    );
  });
});
