import assert from 'assert';
import { addQuerys, getQuerys, querys } from '../src/query';

describe('#query.js', () => {
  describe('#getQuerys()', () => {
    it(`getQuerys() should return null`, () => {
      assert.strictEqual(getQuerys(), null);
    });

    it(`getQuerys('http://localhost') => null`, () => {
      assert.strictEqual(getQuerys('http://localhost'), null);
    });

    it(`getQuerys('http://localhost/#hash') => null`, () => {
      assert.strictEqual(getQuerys('http://localhost/#hash'), null);
    });

    it(`getQuerys('http://localhost/?a') => { a: '' }`, () => {
      assert.deepStrictEqual(getQuerys('http://localhost/?a'), { a: '' });
    });

    it(`getQuerys('http://localhost/?a=1') => { a: 1 }`, () => {
      assert.deepStrictEqual(getQuerys('http://localhost/?a=1'), { a: 1 });
    });

    it(`getQuerys('http://localhost/?a=1&b=&c=3&d#hash') => { a: 1, b: '', c: 3, d: '' }`, () => {
      assert.deepStrictEqual(getQuerys('http://localhost/?a=1&b=&c=3&d#hash'), { a: 1, b: '', c: 3, d: '' });
    });

    it(`getQuerys('http://localhost/?a=%E5%AD%97%E7%AC%A6%E4%B8%B2') => { a: '字符串' }`, () => {
      assert.deepStrictEqual(getQuerys('http://localhost/?a=%E5%AD%97%E7%AC%A6%E4%B8%B2'), { a: '字符串' });
    });
  });

  describe('#addQuerys()', () => {
    it(`addQuerys() => ''`, () => {
      assert.strictEqual(addQuerys(), '');
    });

    it(`addQuerys('http://localhost') => 'http://localhost'`, () => {
      assert.strictEqual(addQuerys('http://localhost'), 'http://localhost');
    });

    it(`addQuerys('http://localhost', { a: 1 }) => 'http://localhost?a=1'`, () => {
      assert.strictEqual(addQuerys('http://localhost', { a: 1 }), 'http://localhost?a=1');
    });

    it(`addQuerys('http://localhost?a=1', { b: 2, c: 3 }) => 'http://localhost?a=1&b=2&c=3'`, () => {
      assert.strictEqual(addQuerys('http://localhost?a=1', { b: 2, c: 3 }), 'http://localhost?a=1&b=2&c=3');
    });

    it(`addQuerys('http://localhost?a=1&', { b: 2 }) => 'http://localhost?a=1&b=2'`, () => {
      assert.strictEqual(addQuerys('http://localhost?a=1&', { b: 2 }), 'http://localhost?a=1&b=2');
    });

    it(`addQuerys('http://localhost?&', { a: 1 }) => 'http://localhost?a=1'`, () => {
      assert.strictEqual(addQuerys('http://localhost?&', { a: 1 }), 'http://localhost?a=1');
    });

    it(
      `addQuerys('http://localhost?a=1', { b: '字符串' }) => 'http://localhost?a=1&b=%E5%AD%97%E7%AC%A6%E4%B8%B2'`, 
      () => {
        assert.strictEqual(
          addQuerys('http://localhost?a=1', { b: '字符串' }), 
          'http://localhost?a=1&b=%E5%AD%97%E7%AC%A6%E4%B8%B2'
        );
      }
    );
  });

  describe('#querys()', () => {
    it(`querys('http://localhost') => null`, () => {
      assert.strictEqual(querys('http://localhost'), null);
    });

    it(`querys('http://localhost?a=1&b=2&c=c') => { a: 1, b: 2, c: 'c' }`, () => {
      assert.deepStrictEqual(querys('http://localhost?a=1&b=2&c=c'), { a: 1, b: 2, c: 'c' });
    });

    it(`querys('http://localhost?a=1&b=2&c=c', { d: '尼古拉斯' }) => 'http://localhost?a=1&b=2&c=c&d=%E5%B0%BC%E5%8F%A4%E6%8B%89%E6%96%AF'`, () => {
      assert.strictEqual(querys('http://localhost?a=1&b=2&c=c', { d: '尼古拉斯' }), 'http://localhost?a=1&b=2&c=c&d=%E5%B0%BC%E5%8F%A4%E6%8B%89%E6%96%AF');
    });
  });
});
