# @totebox/http

## 安装

```
npm i @totebox/http
```

## 使用

如果要兼容旧的浏览器，类似于 IE，你需要在项目入口处导入 fetch 的 polyfill。`@totebox/http` 已经包含了 `whatwg-fetch` 的依赖，无需安装，直接导入即可。

项目入口：

```js
import 'whatwg-fetch'
```

api 层：

```js
import http from '@totebox/http';

const request = http.create(/* settings */);
request.get(/* REQUEST_URL */);
```

### 直接用于 html 中

```html
<script src="./node_modules/@totebox/http/dist/http.js"></script>
<script>
  $totebox.http(/* REQUEST_URL */);
</script>
```

## API

### http.create( settings )

统一处理请求配置，返回各请求方法的对象。

#### settings

#####  fetch options

参考 [官方文档](https://github.github.io/fetch/)。

##### timeout

请求超时，默认：0

##### interceptors.response( data )

你应该继续返回一个处理后的数据对象，或者 Promise（可以是 rejection 状态）。

```js
interceptors: {
  response(data) {
    if (data.status !== 0) {
      return Promise.reject(new Error(`${data.message}, # interceptors.response`));
    }

    return data.data;
  },
  ...
},
```

##### interceptors.error( err )

**err:** `{ url, message, statusText }`

`statusText` 可能的值为：`"timeout"`、`"abort"`，或者 fetch 请求错误的状态字符串。你应该继续返回该 `err` 对象。

```js
interceptors: {
  error(err) {
    err.message = `${err.url} -> error: ${err.message}, error status: ${err.statusText}, # interceptors.error`;
    return err;
  },
},
```

#### http.create 的返回对象

* request.get( url [, data [, options ] ] )
* request.post( url [, data [, options ] ] )
* request.put( url [, data [, options ] ] )
* request.patch( url [, data [, options ] ] )
* request.delete( url [, data [, options ] ] )

`options` 可以单独配置一个请求。所有方法都返回 Promise 对象，包括一个取消请求的 `abort` 方法：

```js
...

if (req) {
  req.abort();
}
req = request.get(/* REQUEST_URL */);
const data = await req;
```

### http( url, options [, interceptors] )

fetch 的底层封装。返回包含 `abort` 方法的 Promise 对象。

#### url

请求地址

#### options

fetch 的 options，[参考文档](https://github.github.io/fetch/)。另外还增加了 `timeout` 选项。

#### interceptors

可选，同上面 `interceptors.response` 和 `interceptors.error`

## License

[MIT](https://github.com/nicolaszhao/totebox/blob/master/LICENSE) © [nicolaszhao](https://github.com/nicolaszhao)
