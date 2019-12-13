# @totebox/query

## 安装

```
npm i @totebox/query
```

## 使用

```js
import Query from '../src/index';

const query = Query(url);
query.add({ country: 'china' }).href(); // ...?country=china&...
```

## API

### Query([url]) => query

url 不传默认为 `location.href`。

### query.values() => querys object

### query.add(values = {}) => query

### query.remove(querys) => query

**querys:** String | Array，url 中要移除的 query 的 key

### query.has(querys) => Boolean

**querys:** String | Array，url 中要匹配的 query 的 key，如果是数组，必须全部匹配

### query.href() => url

## License

[MIT](https://github.com/nicolaszhao/totebox/LICENSE) © [nicolaszhao](https://github.com/nicolaszhao)
