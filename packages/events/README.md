# @totebox/events
## 安装

```
npm i @totebox/events
```

## 使用

### ESM

```js
import Events from '@totebox/events';

const events = new Events();
events.on('change', () => {});
// 带命名空间的
events.on('change.user', () => {});
// 同时触发 'change' 和 'change.user'
events.trigger('change');

// 继承到其他模块中，并用属性选择器
class User extends Events {
  constructor() {
    this.name = 'Nicolas';
    this.on('change:name', (name) => console.log(name));
  }

  update(name) {
    this.name = name;
    this.trigger('change:name', name);
  }
}
```

### Browser

```html
<script src="./node_modules/@totebox/events/dist/events.js"></script>
<script>
  var events = new $totebox.Events();
  ...
</script>
```

## API

### on(event, callback)

事件绑定

#### event

**type:** String|Object

* `"event"`
* `"event:attr"`
* `"event.namespace"`
* `"event:attr.namespace"`
* 用以上格式并以空格分割的字符串
* 用以上格式作为事件映射对象的 key: `{ "event": handler, "event:attr": handler, ... }`

#### callback(data1 [, data2, ...])

**type:** Function

执行 `.trigger` 可触发相应 event 下的 `callback`，`callback` 的参数可通过 `.trigger` 传入。

### once(event, callback)

同 `.on`，但 `callback` 只能被 `.trigger` 触发一次，触发后就会立即移除。

### off(event)

事件移除

#### event

**type:** String

1. 只传 `"event"`，则移除所有该类型的事件，包括所有命名空间下的，以及该类型事件有属性选择器的
2. 传入 `"event:attr"` 则移除所有该类型事件 + 该属性选择器的事件，包括所有命名空间下的
3. 传入 `"event.namespace"` 则移除该命名空间下的所有该类型事件，包括有属性选择器的
4. 传入 `"event:name.namespace"` 则会只移除该命名空间下的，有该属性选择器的事件
5. 只传 `".namespace"`，则会移除该命名空间下的所有事件
6. 缺失，则移除所有事件

### trigger(event, ...data)

事件触发

#### event

**type:** String

用法同 `.off` 的 event 规则中的 1，2，3，4

## License

[MIT](https://github.com/nicolaszhao/totebox/blob/master/LICENSE) © [nicolaszhao](https://github.com/nicolaszhao)

