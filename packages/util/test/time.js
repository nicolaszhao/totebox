import assert from 'assert';
import { timeParser } from '../src/time';

describe('#time.js', () => {
  describe('#timeParser()', () => {

    it(`timeParser()(0) 
          should return [
            { value: 0, unit: 'Years' }, 
            { value: 0, unit: 'Months' }, 
            { value: 0, unit: 'Weeks' }, 
            { value: 0, unit: 'Days' }, 
            { value: 0, unit: 'Hours' }, 
            { value: 0, unit: 'Minutes' },
            { value: 0, unit: 'Seconds' }
          ]`, () => {
      assert.deepEqual(
        timeParser()(0), 
        [
          { value: 0, unit: 'Years' }, 
          { value: 0, unit: 'Months' }, 
          { value: 0, unit: 'Weeks' }, 
          { value: 0, unit: 'Days' }, 
          { value: 0, unit: 'Hours' }, 
          { value: 0, unit: 'Minutes' },
          { value: 0, unit: 'Seconds' }
        ]
      );
    });

    let time1 = 1000 * 60 * 60 * 24 * 7 * 4 * 12 * 2 + 1000 * 6;
    
    it(`timeParser()(${time1}) 
          should return [
            { value: 2, unit: 'Years' }, 
            { value: 0, unit: 'Months' }, 
            { value: 0, unit: 'Weeks' }, 
            { value: 0, unit: 'Days' }, 
            { value: 0, unit: 'Hours' }, 
            { value: 0, unit: 'Minutes' },
            { value: 6, unit: 'Seconds' }
          ]`, () => {
      assert.deepEqual(
        timeParser()(time1), 
        [
          { value: 2, unit: 'Years' }, 
          { value: 0, unit: 'Months' }, 
          { value: 0, unit: 'Weeks' }, 
          { value: 0, unit: 'Days' }, 
          { value: 0, unit: 'Hours' }, 
          { value: 0, unit: 'Minutes' },
          { value: 6, unit: 'Seconds' }
        ]
      );
    });

    let time2 = 1000 * 60 * 60 * 3 + 1000 * 60 * 2 + 1000;

    it(`timeParser({ startUnit: 'hours' })(${time2}) 
          should return [
            { value: 3, unit: 'Hours' }, 
            { value: 2, unit: 'Minutes' },
            { value: 1, unit: 'Seconds' }
          ]`, () => {
      assert.deepEqual(
        timeParser({ startUnit: 'hours' })(time2), 
        [
          { value: 3, unit: 'Hours' }, 
          { value: 2, unit: 'Minutes' },
          { value: 1, unit: 'Seconds' }
        ]
      );
    });

    it(`timeParser({ startUnit: 'hours', units: { hours: '小时', minutes: '分钟', seconds: '秒' } })(${time2})
          should return [
            { value: 3, unit: '小时' }, 
            { value: 2, unit: '分钟' },
            { value: 1, unit: '秒' }
          ]`, () => {
      assert.deepEqual(
        timeParser({ startUnit: 'hours', units: { hours: '小时', minutes: '分钟', seconds: '秒' } })(time2), 
        [
          { value: 3, unit: '小时' }, 
          { value: 2, unit: '分钟' },
          { value: 1, unit: '秒' }
        ]
      );
    });

    let time3 = 120 * 1000;

    it(`timeParser({ startUnit: 'minutes' })(${time3})
        .map(val => ('' + val.value).padStart(2, 0))
        .join(':') 
          
        should return '02:00'`, () => {

      assert.deepEqual(
        timeParser({ startUnit: 'minutes' })(time3)
          .map(val => ('' + val.value).padStart(2, 0))
          .join(':'), 
        
        '02:00'
      );
    });
  });
});
