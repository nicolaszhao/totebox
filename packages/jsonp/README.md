# @totebox/jsonp

## 安装

```
npm i @totebox/jsonp
```

## 使用

```js
import jsonp from '@totebox/jsonp';

jsonp(/* REQUEST_URL */, (err, data) => {});
```

请求回调 `cb` 为 error-first 风格：

```js
jsonp(url, (err, data) => {
  if (err) {
    return console.log(err);
  }
  ...
});
```

### 直接用于 html 中

```html
<script src="./node_modules/@totebox/jsonp/dist/jsonp.js"></script>
<script>
  $totebox.jsonp(/* REQUEST_URL */, function(err, data) {});
</script>
```

## API

### jsonp( url [ , options, cb ] )

如果第 2 个参数传递了对象，就认为是 jsonp 方法的配置。

#### options.jsonpCallback

设置 url 中 `callback` 的参数值，url 中的 `callback` 优先级高于该配置。如果 `callback=?` 或者 `jsonpCallback` 没配置，则默认设置为 `callback=_[时间戳]`，否则为 `callback` 或者 `jsonpCallback` 的值加调用次数。

#### options.timeout

设置请求超时。

