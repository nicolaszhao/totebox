# @totebox/history

## 安装

```
npm i @totebox/history
```

## 使用

```js
import History from '../src/index';

const history = new History();
history.direct('/a'); // return 1
history.direct('/b'); // return 2
history.direct('/a'); // return -1
```

