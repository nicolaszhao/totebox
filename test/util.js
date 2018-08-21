import assert from 'assert';
import { deepAssign } from '../src/util';

describe('#util.js', () => {
  describe('#deepAssign()', () => {
    it(`deepAssign({}, { a: 1, b: 2 }) should return { a: 1, b: 2 }`, () => {

      assert.deepStrictEqual(
        deepAssign({}, { a: 1, b: 2 }),
        { a: 1, b: 2 }
      );
    });

    it(`deepAssign({ a: 1, b: { b1: 1 }, c: [1, 2, 3] }, { a: 2, b: { b2: 2 }, c: [5, 4], d: 3 })
          should return { a: 2, b: { b1: 1, b2: 2 }, c: [5, 4, 3], d: 3 }`, () => {

      assert.deepStrictEqual(
        deepAssign({ a: 1, b: { b1: 1 }, c: [1, 2, 3] }, { a: 2, b: { b2: 2 }, c: [5, 4], d: 3 }),
        { a: 2, b: { b1: 1, b2: 2 }, c: [5, 4, 3], d: 3 }
      );
    });

    it(`deepAssign({ a: 1, b: { b1: 1 }}, null, undefined)
          should return { a: 1, b: { b1: 1 }`, () => {

      assert.deepStrictEqual(
        deepAssign({ a: 1, b: { b1: 1 }}, null, undefined),
        { a: 1, b: { b1: 1 } }
      );
    });
  });
});
