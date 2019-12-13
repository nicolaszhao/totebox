# @totebox/browser

## 安装

```
npm i @totebox/browser
```

## 使用

### ESM

```js
import { cookie } from '@totebox/browser';
```

### 直接用于 html 中

```html
<script src="./node_modules/@totebox/browser/dist/browser.js"></script>
<script>
  $totebox.browser.view.viewHeight();
</script>
```

## API

### cookie

#### cookie.get(name)

#### cookie.set(name, value[, { expires, path, domain, secure }])

#### cookie.remove(name[, { path, domain, secure }])

### storage

#### storage.get(key)

#### storage.set(key, value)

#### storage.remove(key)

#### storage.clear()

### storageTable(primaryKey) => st

#### st.get(key)

#### st.set(key, value)

#### st.remove(key)

#### st.clear()

### view

#### view.viewHeight()

#### view.viewWidth()

#### view.documentHeight()

#### view.documentWidth()

#### view.scrollTop([top])

#### view.scrollLeft([left])

### listenPageVisibility(handler)

### listenScrollToBottom([options, ]callback)

#### options

Default: `{ distance: 0 }`

### isElementInViewport(el)

元素完全位于视口中

### isElementAppearInViewport(el)

元素在视口中出现

### lazyLoadImage([dataSrcAttr, container])

#### dataSrcAttr

Default: `"data-src"`

#### container

Default: `document`

### loadScript(url, callback)

### loadStyle(url, callback)

## License

[MIT](https://github.com/nicolaszhao/totebox/LICENSE) © [nicolaszhao](https://github.com/nicolaszhao)
