# @totebox/ui

## 安装

```
npm i @totebox/ui
```

确保你的项目中已经安装了以下依赖以及相应的版本：

```shell
npm i classnames@^2.2.0 react@^16.8.0 react-dom@^16.8.0 react-transition-group@^4.3.0
```

## 使用

```js
import { Animate, Loading, Modal, /*other components...*/ } from '@totebox/ui'
```

## 组件 API

* [Animate](###Animate)
* [Loading](###Loading)
* [Modal](###Modal)

### Animate

#### Props

| Props                      | Description                                                  | Type    | Default |
| -------------------------- | ------------------------------------------------------------ | ------- | ------- |
| in                         | 显示/隐藏元素                                                | Boolean | `false` |
| [animation](####animation) | 动画展现方式                                                 | String  | "fade"  |
| duration                   | 动画展现时间                                                 | Number  | 400     |
| 其他属性                   | 参考：[react-transition-group](https://reactcommunity.org/react-transition-group/css-transition) |         |         |

#### animation

| animation       |                  |                   |                |
| --------------- | ---------------- | ----------------- | -------------- |
| `fade`          | `fadeDown`       | `fadeLeft`        | `fadeRight`    |
| `fadeUp`        |                  |                   |                |
| `flip`          | `flipX`          | `flipY`           |                |
| `rotate`        | `rotateDownLeft` | `rotateDownRight` | `rotateUpLeft` |
| `rotateUpRight` |                  |                   |                |
| `zoom`          |                  |                   |                |

#### Example

```react
<Animate in={visible} animation="zoom" duration="600">
  <div className="loading" />
</Animate>
```

### Loading

#### Props

| Props    | Description                 | Type    | Default |
| -------- | --------------------------- | ------- | ------- |
| visible  | 组件显示/隐藏               | Boolean | false   |
| 其他属性 | 参考：[Animate](###Animate) |         |         |

#### Example

```react
<Loading visible={loading} />
```

### Modal

#### Props

| Props      | Description                 | Type     | Default        |
| --------- | -------------------- | -------- | ------------- |
| title     | Modal 标题           | String   | "Title" |
| visible   | Modal 是否可见       | Boolean  | `false`       |
| animation | 动画展现方式         | String   | "zoom"        |
| onClose   | 点击右上角叉后的回调 | Function | noop          |

#### Example

```react
const [modalVisible, setModalVisible] = useState(true);

<Modal
  title="Example"
  visible={modalVisible}
  animation="flip"
  onClose={() => setModalVisible(false)}
>
  <p>Message...</p>
</Modal>
```

## License

[MIT](https://github.com/nicolaszhao/totebox/blob/master/LICENSE) © [nicolaszhao](https://github.com/nicolaszhao)
