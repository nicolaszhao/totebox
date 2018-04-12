import assert from 'assert';
import { timeParser } from '../src/time';

describe('#time.js', () => {
  describe('#timeParser()', () => {

    it(`timeParser(100000000000) 
          should return ["3年", "2月", "1天", "10小时", "46分钟", "34秒"]`, () => {
      assert.deepEqual(timeParser(100000000000), ['3年', '2月', '1天', '10小时', '46分钟', '34秒']);
    });

    it(`timeParser(100000000000, ["Y", "M", "W", "D", "H", "MM", "S"]) 
          should return ["3Y", "2M", "1D", "10H", "46MM", "34S"])`, () => {
      assert.deepEqual(
        timeParser(100000000000, ['Y', 'M', 'W', 'D', 'H', 'MM', 'S']),
        ['3Y', '2M', '1D', '10H', '46MM', '34S']
      );
    });
  });
});
