import assert from 'assert';
import { timeParser } from '../src/time';

describe('#time.js', () => {
  describe('#timeParser()', () => {

    it(`timeParser(100000000000) 
          should return [{ value: 3, unit: '年' }, { value: 2, unit: '月' }, { value: 1, unit: '天' }, { value: 10, unit: '小时' }, { value: 46, unit: '分钟' }, { value: 34, unit: '秒' }]`, () => {
      assert.deepEqual(
        timeParser(100000000000), 
        [
          { value: 3, unit: '年' }, 
          { value: 2, unit: '月' }, 
          { value: 1, unit: '天' }, 
          { value: 10, unit: '小时' }, 
          { value: 46, unit: '分钟' }, 
          { value: 34, unit: '秒' }
        ]
      );
    });

    it(`timeParser(100000000000, ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"]) 
          should return [{ value: 3, unit: 'Years' }, { value: 2, unit: 'Months' }, { value: 1, unit: 'Days' }, { value: 10, unit: 'Hours' }, { value: 46, unit: 'Minutes' }, { value: 34, unit: 'Seconds' }])`, () => {
      assert.deepEqual(
        timeParser(100000000000, ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds']),
        [
          { value: 3, unit: 'Years' }, 
          { value: 2, unit: 'Months' }, 
          { value: 1, unit: 'Days' }, 
          { value: 10, unit: 'Hours' }, 
          { value: 46, unit: 'Minutes'}, 
          { value: 34, unit: 'Seconds' }
        ]
      );
    });
  });
});
