# @totebox/http

## 安装

```
npm i @totebox/http
```

## 使用

### Polyfill

如果要兼容旧版本的浏览器，比如 IE，你需要在项目入口处导入 fetch 的 polyfill：

```js
import 'whatwg-fetch'
```

安装 `@totebox/http` 时，已经包含了 `whatwg-fetch` 的依赖，您无需单独安装。

### 在 ES 模块系统中

```js
import http from '@totebox/http';

const request = http.create(/* settings */);
request.get(/* REQUEST_URL */);
```

### 在浏览器中

```html
<script src="./node_modules/@totebox/http/dist/http.js"></script>
<script>
  $totebox.http(/* REQUEST_URL */);
</script>
```

## API

### http.create( settings )

通过该方法返回的请求对象，使用各请求方法时，可共享请求配置

#### settings

#####  ...fetch options

可传入 [fetch api](https://github.github.io/fetch/) 的 options 参数

##### timeout

请求超时，默认：0

##### interceptors.response( data )

你可以在这里对 data 做二次加工，但你应该始终返回一个处理后的数据对象。也可以返回 Promise，当你返回 rejection 状态时，会继续执行 `interceptors.error` 方法。

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

##### interceptors.error( error, statusText, url )

对异常消息的加工方法

**error:** 包含 `message` 属性的错误对象

**statusText:** 错误状态字符串，可能的值为：`"timeout"`、`"abort"`

你应该在 `interceptors.error` 中始终返回一个新的 Error 对象，因为 `error` 参数的 `message` 可能是只读的，比如 `DOMException`。

```js
interceptors: {
  error(err, statusText, url) {
    const message = `Request url: "${url}" failed, message: "${err.message}"${statusText
      ? `, status: "${statusText}"` : ''}`;
    return new Error(message);
  },
},
```

#### http.create 的返回对象

* request.get( url [, data [, options ] ] )
* request.post( url [, data [, options ] ] )
* request.put( url [, data [, options ] ] )
* request.patch( url [, data [, options ] ] )
* request.delete( url [, data [, options ] ] )

每个请求方法，可以额外单独配置 `options`，它包含 [fetch api](https://github.github.io/fetch/) 的 options 参数和 timeout，参考 `http.create` 方法的 settings 参数说明。

请求方法返回的 Promise 对象，同时包含了一个 `abort` 方法，用来取消（中止）请求：

```js
...

if (req) {
  req.abort();
}
req = request.get(/* REQUEST_URL */);
const data = await req;
```

### http( url, options [, interceptors] )

对 fetch 的底层请求逻辑封装，返回包含 `abort` 方法（如上）的 Promise 对象。

#### url

请求地址

#### options

[fetch api](https://github.github.io/fetch/) 的 options 参数和 timeout，参考 `http.create` 方法的 settings 参数说明

#### interceptors

可选，参数 `http.create` 方法的 settings 参数说明

## License

[MIT](https://github.com/nicolaszhao/totebox/blob/master/LICENSE) © [nicolaszhao](https://github.com/nicolaszhao)
