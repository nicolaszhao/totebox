import assert from 'assert';
import Query from '../src/index';

describe('Query()', () => {
  const chineseName = '赵不寒';
  let url = `https//nicolaszhao.com/?name=nicolas&age=28&chinese=${encodeURIComponent(chineseName)}#home`;
  let result = { name: "nicolas", age: 28, chinese: chineseName };

  describe('#query.values()', () => {
    it(
      `Query('${url}').values()
      should return ${JSON.stringify(result)}`,
      () => {
        assert.deepStrictEqual(Query(url).values(), result);
      }
    );

    it(
      `equivalent url call Query('${url}') 2 times
      the values should equal`,
      () => {
        assert.deepStrictEqual(Query(url).values(), Query(url).values());
      }
    );

    const noSearchUrl = url.replace(/\?.*$/, '');

    it(
      `no search, Query('${noSearchUrl}').values()
      should return "{}"`,
      () => {
        assert.deepStrictEqual(Query(noSearchUrl).values(), {});
      }
    );

    const emptyValueUrl = noSearchUrl + '?name=';

    it(
      `missing query value, Query('${emptyValueUrl}').values()
      should return "{name: ''}"`,
      () => {
        assert.deepStrictEqual(Query(emptyValueUrl).values(), { name: '' });
      }
    );

    const boolValueUrl = noSearchUrl + '?ok=true';

    it(
      `boolean query value, Query('${boolValueUrl}').values()
      should return "{ok: true}"`,
      () => {
        assert.deepStrictEqual(Query(boolValueUrl).values(), { ok: true });
      }
    );

    const numberValueUrl = noSearchUrl + '?ok=0';

    it(
      `number query value, Query('${numberValueUrl}').values()
      should return "{ok: 0}"`,
      () => {
        assert.deepStrictEqual(Query(numberValueUrl).values(), { ok: 0 });
      }
    );

    it(
      `missing param, Query().values()
      should return empty object: "{}"`,
      () => {
        assert.deepStrictEqual(Query().values(), {});
      }
    );

    it(
      `empty url, Query('').values()
      should return empty object: "{}"`,
      () => {
        assert.deepStrictEqual(Query('').values(), {});
      }
    );
  });

  describe('#query.add()', () => {
    const countryValues = { country: '中国' };

    it(
      `Query('${url}').add(${JSON.stringify(countryValues)}),
      the values should return ${JSON.stringify({ ...result, ...countryValues, })}`,
      () => {
        assert.deepStrictEqual(
          Query(url).add(countryValues).values(),
          { ...result, ...countryValues, },
        );
      }
    );

    const nameValues = { name: 'nicolaszhao' };

    it(
      `equivalent name query, Query('${url}').add(${JSON.stringify(nameValues)}),
      the values should return ${JSON.stringify({ ...result, ...nameValues, })}`,
      () => {
        assert.deepStrictEqual(
          Query(url).add(nameValues).values(),
          { ...result, ...nameValues, },
        );
      }
    );

    it(
      `missing param, Query('${url}').add()
      the values should return ${JSON.stringify(result)}`,
      () => {
        assert.deepStrictEqual(
          Query(url).add().values(),
          result,
        );
      }
    );

    const noSearchUrl = url.replace(/\?.*$/, '');

    it(
      `no search, Query('${noSearchUrl}').add(${JSON.stringify(nameValues)})
      the values should return ${JSON.stringify(nameValues)}`,
      () => {
        assert.deepStrictEqual(
          Query(noSearchUrl).add(nameValues).values(),
          nameValues,
        );
      }
    );
  });

  describe('#query.remove()', () => {
    const { chinese, ...chineseOtherQuerys } = result;
    const chineseQuerys = 'chinese';

    it(
      `Query('${url}').remove('${chineseQuerys}')
      the values should return ${JSON.stringify(chineseOtherQuerys)}`,
      () => {
        assert.deepStrictEqual(
          Query(url).remove(chineseQuerys).values(),
          chineseOtherQuerys,
        );
      }
    );

    const remaining = { name: 'nicolas' };
    const removedQuerys = ['chinese', 'age'];

    it(
      `Query('${url}').remove(${JSON.stringify(removedQuerys)})
      the values should return ${JSON.stringify(remaining)}`,
      () => {
        assert.deepStrictEqual(
          Query(url).remove(removedQuerys).values(),
          remaining,
        );
      }
    );

    it(
      `missing param, Query('${url}').remove()
      the values should return ${JSON.stringify(result)}`,
      () => {
        assert.deepStrictEqual(
          Query(url).remove().values(),
          result,
        );
      }
    );
  });

  describe('#query.has()', () => {
    it(
      `missing param, Query('${url}').has()
      should return false`,
      () => {
        assert.strictEqual(
          Query(url).has(),
          false,
        );
      }
    );

    it(
      `Query('${url}').has('name')
      should return true`,
      () => {
        assert.strictEqual(
          Query(url).has('name'),
          true,
        );
      }
    );

    it(
      `Query('${url}').has('weight')
      should return false`,
      () => {
        assert.strictEqual(
          Query(url).has('weight'),
          false,
        );
      }
    );

    it(
      `Query('${url}').has(['name', 'age'])
      should return true`,
      () => {
        assert.strictEqual(
          Query(url).has(['name', 'age']),
          true,
        );
      }
    );

    it(
      `Query('${url}').has(['name', 'weight'])
      should return false`,
      () => {
        assert.strictEqual(
          Query(url).has(['name', 'weight']),
          false,
        );
      }
    );
  });

  describe('#query.href()', () => {
    const noHashUrl = url.replace(/#.*$/, '');

    it(
      `Query('${noHashUrl}').href()
      should return ${noHashUrl}`,
      () => {
        assert.strictEqual(Query(noHashUrl).href(), noHashUrl);
      }
    );

    const addedQuerys = { country: 'china' };
    let addedQueryString = { ...result, ...addedQuerys };
    addedQueryString = Object.keys(addedQueryString)
      .map((name) => `${encodeURIComponent(name)}=${encodeURIComponent(addedQueryString[name])}`)
      .join('&');
    const addedQueryUrl = noHashUrl.replace(/\?.*$/, '') + '?' + addedQueryString;

    it(
      `Query('${noHashUrl}').add(${JSON.stringify(addedQuerys)}).href()
      should return ${addedQueryUrl}`,
      () => {
        assert.strictEqual(
          Query(noHashUrl).add(addedQuerys).href(),
          addedQueryUrl
        );
      }
    );
  });
});
