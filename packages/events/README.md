# Events Trigger
一个简单的自定义事件触发器。源码使用最流行的ES6语法编写，类似于jQuery的事件api(on, off, trigger)，可单独使用或者被其他构造器对象继承使用。

## 快速上手
1. 使用[npm](https://docs.npmjs.com)安装到你的项目中：`npm install --save events-trigger`
2. 使用commonjs或者es6模块方式导入：
````
var EventsTrigger = require('events-trigger');
//
// 或者
import EventsTrigger from 'events-trigger';
````
3. 绑定一个自定义事件：
````
let events = new EventsTrigger();
events.on('my-event', () => console.log('trigger my-event'));
````
4. 触发你的自定义事件：
````
events.trigger('my-event');
````

## 方法

* on(type, callback)：绑定自定义事件

    **type: (String)**

    事件类型，可以是type，或者type.namespace，例如：`myevent.mudule01`

    **callback(data1 [, data2, ...]): (Function)**

    事件回调方法，参数可以传入单个或多个，例如：`handler(1, 2, 3)`


* off([event])：删除自定义事件

    **type: (String)**

    事件类型，可选。type或者.namespace，或者type.namespace。只传入type, 删除所有类型为type的事件。
    传入.namespace，删除所有命名空间为namespace的事件，不限制事件类型。传入type.namespace，只删除namespace下类型为type的事件。
    如果不传入任何参数，会移除所有事件。

* trigger(type, [data1 [, data2, ...]])：触发自定义事件

    **type: (String)**

    事件类型，可以是type，或者type.namespace

    **data: (Any Type)**

    触发`on`所绑定的事件的回调方法时，传入的参数，可以是单个或者多个

## 示例

### 基本用法

````````
import Events from 'events-trigger';
let events = new Events();
events.on('touch', (message) => console.log(message));
events.trigger('touch', 'trigger touch');

````````

### 使用事件命名空间

````````
import Events from 'events-trigger';
let events = new Events();
events.on('touch.e1', (message) => console.log(message));
events.on('touch.e2', (message) => console.log(message));
events.trigger('touch.e1', 'trigger touch on e1');

````````

### 被其他构造函数继承

````````
import Events from 'events-trigger';

class SomeModule extends Events {
    constructor() {
        super();
        
        this.create();
    }
    
    create() {
        this.trigger('create');
    }
}

let someModule = new SomeModule();

someMudule.on('create', () => console.log('create!'));

````````
