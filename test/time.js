import assert from 'assert';
import { timeParser } from '../src/time';

describe('#time.js', () => {
  describe('#timeParser()', () => {

    let time1 = 1000 * 60 * 60 * 24 * 7 * 4 * 12 * 2 + 1000 * 6;
    
    it(`timeParser(${time1}) 
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
        timeParser(time1), 
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

    it(`timeParser(${time2}, { startUnit: 'hours' }) 
          should return [
            { value: 3, unit: 'Hours' }, 
            { value: 2, unit: 'Minutes' },
            { value: 1, unit: 'Seconds' }
          ]`, () => {
      assert.deepEqual(
        timeParser(time2, { startUnit: 'hours' }), 
        [
          { value: 3, unit: 'Hours' }, 
          { value: 2, unit: 'Minutes' },
          { value: 1, unit: 'Seconds' }
        ]
      );
    });

    it(`timeParser(${time2}, { startUnit: 'hours', labels: { hours: '小时', minutes: '分钟', seconds: '秒' } }) 
          should return [
            { value: 3, unit: '小时' }, 
            { value: 2, unit: '分钟' },
            { value: 1, unit: '秒' }
          ]`, () => {
      assert.deepEqual(
        timeParser(time2, { startUnit: 'hours', labels: { hours: '小时', minutes: '分钟', seconds: '秒' } }), 
        [
          { value: 3, unit: '小时' }, 
          { value: 2, unit: '分钟' },
          { value: 1, unit: '秒' }
        ]
      );
    });
  });
});
