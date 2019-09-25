import assert from 'assert';
import { parseTextPlaceholder } from '../src/index';

describe('#string.js', () => {
  describe('#parseTextPlaceholder()', () => {
    it(`parseTextPlaceholder('Hello, {name}!', { name: 'Nicolas' }) should return 'Hello, Nicolas!'`, () => {
      assert.strictEqual(parseTextPlaceholder('Hello, {name}!', { name: 'Nicolas' }), 'Hello, Nicolas!');
    });

    it(`parseTextPlaceholder('Hello, {name}!', { name: 'Nicolas' }, true)
          should return 'Hello, Nicolas!' and the data: { name: 'Nicolas' } will change to {}`, () => {

      const data = { name: 'Nicolas' };

      assert.strictEqual(parseTextPlaceholder('Hello, {name}!', data, true), 'Hello, Nicolas!');
      assert.deepStrictEqual(data, {});

    });
  });
});
