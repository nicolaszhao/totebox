# @totebox/ajax

## 安装

```
npm i @totebox/ajax
```

## 使用

### ESM

```js
import Ajax from '@totebox/ajax';

// simple get request
Ajax(/* REQUEST_URL */);

const ajax = Ajax(/* settings */);
ajax.get(/* REQUEST_URL */);
```

### 直接用于 html 中

```html
<script src="./node_modules/@totebox/ajax/dist/ajax.js"></script>
<script>
  $totebox.ajax(/* REQUEST_URL */);
</script>
```

## API

### Ajax(settings)

```js
const ajax = Ajax({
  ...axios.configs,
  interceptors: {
    response(data) {
      ...
      return data.data;
    },
    error(err) {
      ...
      return err;
    },
  },
});

const data = await ajax.get( /* REQUEST_URL */ );
```

#### axios configs

参考 [axios](https://github.com/axios/axios#request-config) 配置文档

#### interceptors

##### interceptors.response( data, config )

**data:** 响应对象中的服务端数据

**config:** axios 的请求配置对象

你应该继续返回一个数据对象，或者 Promise（可以是 rejection 状态）：

```js
interceptors: {
  response(data) {
    if (data.status !== 0) {
      return Promise.reject(new Error(data.message || 'Server Error'));
    }
    return data.data;
  },
  ...
},
```

##### interceptors.error( err )

**err:** axios 的请求错误对象。如果一个请求被你 `abort` 了，该对象还会在它的 `response` 上设置一个值为 `"abort"` 的 `statusText` 属性：

```
{
  response: {
    statusText: 'abort'
    ...
  },
  message: 'Request abort'
}
```

你应该继续返回该 `err` 对象：

```js
interceptors: {
  ...
  error(err) {
    err.message = `Request api error, url: ${err.config ? err.config.url : ''}, message: ${err.message}`;
    return err;
  },
},
```

#### Ajax(settings) 的返回对象

* ajax.get( url [,  data [, options ] ] )
* ajax.post( url [,  data [, options ] ] )
* ajax.delete( url [,  data [, options ] ] )
* ajax.put( url [,  data [, options ] ] )
* ajax.patch( url [,  data [, options ] ] )
* ajax.head( url [,  data [, options ] ] )
* ajax.options( url [,  data [, options ] ] )

`options` 可以单独配置一个请求，和 axios 一致，但对 get、delete、head、options 的参数传递方式做了调整。所有方法都返回 Promise 对象，包括一个可以取消请求的 `abort` 方法：

```js
...

if (xhr) {
  xhr.abort();
}
xhr = ajax.get(/* REQUEST_URL */);
const data = await xhr;
```

### Ajax(url)

```js
const { data } = await Ajax( /* REQUEST_URL */ );
```

## License

[MIT](https://github.com/nicolaszhao/totebox/blob/master/LICENSE) © [nicolaszhao](https://github.com/nicolaszhao)
