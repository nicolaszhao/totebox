# @totebox/cli

## 安装

```
npm i @totebox/cli
```

## 使用

### 用于模块

```js
const { indicator } = require('@totebox/cli');
```

### 用于命令行

```
ftp-deploy
```

## API

### indicator(waitingText = 'waiting', duration = 120)

返回 `stop()` 方法，用来停止指示器。这是示例：

```js
console.log('Indicator starting...');
const stopIndicator = indicator();

setTimeout(() => {
  stopIndicator();
  console.log('Indicator stopped!');
}, 5000);
```

## CLI

### ftp-deploy

用于部署静态资源到 ftp 服务器，你需要在项目中配置一个文件 `.ftpdeployconfig`，这里是个完整示例：

```
username = username
password = password
host = host
port = port
from = dist
to = /data/awesome_project/
```

**注意：** 此文件的内容为敏感信息，你应该始终把文件 `.ftpdeployconfig` 加入到 `.gitignore` 中。

#### 可选参数

`from` 和 `to` 两个选项，你可以通过在命名后面传递参数来覆盖配置文件的参数，比如：

```
ftp-deploy --from build --to /data/awesome_project_2/
```

`from` 和 `to` 也有两个简写别名：

```
ftp-deploy -f [from] -t [to]
```

## License

[MIT](https://github.com/nicolaszhao/totebox/blob/master/LICENSE) © [nicolaszhao](https://github.com/nicolaszhao)
