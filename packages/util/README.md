# @totebox/util

## 安装

```
npm i @totebox/util
```

## 使用

```js
import { type } from '@totebox/util';
```

## API

### noop()

### type(obj)

### deepAssign(target, source[, ...sources])

### random(a, b)

### inRandomRate(value)

### randomId(length[, { uniqueId, prefix }])

#### uniqueId

Default: `true`

### delayTask(task[, delay = 600]) => clearTask()

### mergeSort(array)

### toTree(array[,  options])

把树形关系的数组结构解析成树形结构

#### options

##### options.id (Default: `"id"`)

数据项中的 id 字段名

##### options.parentId (Default: `"parentId"`)

数据项中父节点的 id 字段名

##### options.rootParentId (Default: `0`)

数据项中顶层父节点 id 字段的值

##### options.children (Default: `"children"`)

解析后树节点下，子树的字段名

### chunk(array, process, context[, callback, duration = 100])

### batch(array, process, context[, callback, { runDuration = 25, chunkDuration = 50 }])

### motion(start, end, duration[, { step, done }]) => clearMotion()

### LazyTasks

```
const lazyTasks = new LazyTasks()
```

#### lazyTasks.add(id, { do, delay })

#### lazyTasks.run(id)

#### lazyTasks.start(id, { cb })

#### lazyTasks.stop(id, { cb, clear })

### parseTime(time[, maxUnit = 'day'])

解析一个毫秒值为可读的时间对象：`{ day, hour, minute, second }`，设置的 `maxUnit` 如果当最大单位的时间值没有取到，就用 `0` 来填补。

#### time

要解析的毫秒值

#### maxUnit (default: "day")

day|hour|minute|second

或简写：d|h|m|s

### formatTime(duration) => "hh:mm:ss"

### countdown(value[, { onStart, onProgress, onEnd }, context])

返回：

`{ start(), stop(cb) }`

#### value

表示未来的一个时间的毫秒值，或者 n 秒倒计时

### isLeapYear(year)

### parseDate(value, format)

#### value

一个表示时间的字符串

#### format

时间格式化字符串，需要和 value 的格式匹配

### formatDate(date, format)

### parseTextPlaceholder(text, data[, dataReplaceable = false])

```js
// return 'Hello, Nicolas!'
parseTextPlaceholder('Hello, {name}!', { name: 'Nicolas' });
```

### parseNumberPlaceholder(text, param[, ...params])

```js
// 'Do you love me? Yes, I love You!'
format('Do {0} love {1}? Yes, {2} love {0}!', 'you', 'me', 'I')
```

### formatSize(bytes)

### trim(text)

### entityify(text)

### deentityify(text)

### strip(text)

### escape(text)

### filter(text, maxlength)

## License

[MIT](https://github.com/nicolaszhao/totebox/LICENSE) © [nicolaszhao](https://github.com/nicolaszhao)
