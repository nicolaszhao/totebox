export function noop() {
  console.log('This is a noop function.');
}

export function type(obj) {
  if (obj == null) {
    return `${obj}`;
  }

  const types = 'Number String Boolean Array Function Object Math Date RegExp Error'.split(' ');
  const class2Type = {};

  types.forEach((t) => {
    class2Type[`[object ${t}]`] = t.toLowerCase();
  });

  return class2Type[Object.prototype.toString.call(obj)] || typeof obj;
}

export function deepAssign(target, ...sources) {
  if (!sources.length) return target;

  const source = sources.shift();
  const isObjectOrArray = (obj) => ['object', 'array'].includes(type(obj));

  if (isObjectOrArray(target) && isObjectOrArray(source)) {
    Object.keys(source).forEach((key) => {
      if (isObjectOrArray(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: type(source[key]) === 'object' ? {} : [] });
        }

        deepAssign(target[key], source[key]);
      } else {
        // 如果 target 是数组，会被 Object.assign 视为属性名为 0、1、2... 的对象
        // { [prop]: source[prop] } -> { 0: 'a' } 会覆盖 target 的 index 为 0 的值
        Object.assign(target, { [key]: source[key] });
      }
    });
  }

  return deepAssign(target, ...sources);
}

// 返回介于 a 到 b 之间的一个随机数
export function random(a, b) {
  const val = b - a + 1;

  return Math.floor(Math.random() * val + a);
}

// value: 0.01 -> 1%, 0.1 -> 10%, 1 -> 100%
export function inRandomRate(value) {
  value = +value;
  const pointsMatch = /\.(\d+)$/.exec(value);
  let points = 1;

  if (pointsMatch) {
    points = pointsMatch[1].length;
  }

  const coefficient = (10 ** points) * 10;

  return Math.ceil(Math.random() * coefficient) <= value * coefficient;
}

export function randomId(length, { uniqueId = true, prefix } = {}) {
  const radix = uniqueId ? 36 : 10;
  const gen = () => Math.floor(Math.random() * 1999999).toString(radix);

  if (!length) {
    return gen();
  }

  let id = '';

  if (prefix) {
    id = `${prefix}-${id}`;
  }

  while (id.length < length) {
    id += gen();
  }

  return id.substr(0, length);
}

// returns clear function -> cleared: true | false,
export function delayTask(task, delay = 600) {
  let running = false;
  const taskTimer = setTimeout(() => {
    running = true;
    task();
  }, delay);

  return () => {
    clearTimeout(taskTimer);
    return !running;
  };
}

// 并归排序算法工具函数
const merge = (left, right) => {
  const ret = [];
  let l = 0;
  let r = 0;

  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      ret.push(left[l++]);
    } else {
      ret.push(right[r++]);
    }
  }

  return [...ret, ...left.slice(l), ...right.slice(r)];
};

// 数组排序：并归算法
export function mergeSort(data) {
  const len = data.length;

  if (len === 1) {
    return data;
  }

  const mid = Math.floor(len / 2);
  const left = data.slice(0, mid);
  const right = data.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

// O(n)级的，将类的扁平数组转换为树形结构
// Example: [{ id: 1, parentId: 0 }, { id: 2, parentId: 1 }, { id: 3, parentId: 2 }]
// returns [
//  { id: 1, parentId: 0, children: [
//    { id: 2, parentId: 1, children: [
//      { id: 3, parentId: 2, children: [] }
//    ]}
//  ]}
// ]
export function toTree(data, {
  id = 'id',
  parentId = 'parentId',
  rootParentId = 0,
  children = 'children',
} = {}) {
  const list = [];
  const map = {};
  const tree = [];

  for (let i = 0; i < data.length; i++) {
    map[data[i][id]] = i;
    list.push({
      ...data[i],
      [children]: [],
    });
  }

  for (let i = 0; i < list.length; i++) {
    const node = list[i];

    if (node[parentId] !== rootParentId) {
      const foundIndex = map[node[parentId]];

      if (type(foundIndex) === 'number') {
        const found = list[foundIndex];

        found.children.push(node);
      }
    } else {
      tree.push(node);
    }
  }

  return tree;
}

// 耗时任务异步处理函数
// 如果 process 数据处理函数运行时间较长，则不适合在循环中执行，用该函数可以处理为异步执行
export function chunk(data, process, context, callback = noop, duration = 100) {
  const tasks = data.concat();

  const run = () => {
    setTimeout(() => {
      process.call(context, tasks.shift());

      if (tasks.length) {
        run();
      } else {
        callback();
      }
    }, duration);
  };

  run();
}

// 大数据任务批处理函数
// 在一定时间内批量处理数据量比较大的数组，以减轻运行大数据数组对客户端的程序阻塞
export function batch(
  data,
  process,
  context,
  callback = noop,
  { runDuration = 25, chunkDuration = 50 } = {},
) {
  const tasks = data.concat();
  const run = () => {
    setTimeout(() => {
      const start = Date.now();

      do {
        process.call(context, tasks.shift());
      } while (tasks.length && (Date.now() - start < chunkDuration));

      if (tasks.length) {
        run();
      } else {
        callback();
      }
    }, runDuration);
  };

  run();
}

// 在给定时间内将 start 值变化为 end，类似于一个动画过程
// 返回 stop 停止函数
export function motion(start, end, duration, { step = noop, done = noop } = {}) {
  const startTime = Date.now();
  const tickDelay = Math.floor(1000 / 60);
  let stopTimer = null;

  const tick = () => {
    stopTimer = setTimeout(() => {
      const remaining = Math.max(0, startTime + duration - Date.now());
      const percent = 1 - remaining / duration;
      const val = (end - start) * percent + start;

      if (percent < 1) {
        step(val);
        tick();
      } else {
        done(val);
      }
    }, tickDelay);
  };

  tick();

  return () => {
    clearTimeout(stopTimer);
    stopTimer = null;
  };
}

// 延时任务处理
// 如果添加重复的任务，如果任务已完成则不再执行
export class LazyTasks {
  constructor() {
    this.tasks = new Map();
    this.finished = {};
  }

  // task: { do(id), delay }
  add(id, task) {
    if (!this.finished[id]) {
      this.tasks.set(id, task);
      this.start(id);
    }
  }

  run(id) {
    const task = this.tasks.get(id);

    if (task) {
      task.do(id);
      this.finished[id] = true;
      this.tasks.delete(id);
    }
  }

  // options: { cb(id) }
  start(id, options = {}) {
    const task = this.tasks.get(id);

    if (task) {
      task.timer = setTimeout(() => {
        this.run(id);
        task.timer = null;
        options.cb && options.cb(id);
      }, task.delay);
    }
  }

  // options: { cb(id), clear[Boolean] }
  // options.clear 用来确定当重新执行 start 时，是否可以恢复之前的延时任务
  stop(id, options = {}) {
    const task = this.tasks.get(id);

    if (task && task.timer) {
      clearTimeout(task.timer);
      task.timer = null;
      options.clear && this.tasks.delete(id);
      options.cb && options.cb(id);
    }
  }
}
