export function type(obj) {
  if (obj == null) {
    return obj + '';
  }

  const types = 'Number String Boolean Array Function Object Math Date RegExp Error'.split(' ');
  let class2Type = {};

  types.forEach(type => {
    class2Type[`[object ${type}]`] = type.toLowerCase();
  });

  return class2Type[Object.prototype.toString.call(obj)] || typeof obj;
}

/**
 * Deep merge objects.
 * @param {Object} target
 * @param {Object} sources
 */
export function deepAssign(target, ...sources) {
  if (!sources.length) return target;

  const source = sources.shift();

  if ((type(target) === 'object' || type(target) === 'array') &&
    (type(source) === 'object' || type(source) === 'array')
  ) {
    for (let key of Object.keys(source)) {
      if (type(source[key]) === 'object' || type(source[key]) === 'array') {
        if (!target[key]) {
          Object.assign(target, { [key]: type(source[key]) === 'object' ? {} : [] });
        }

        deepAssign(target[key], source[key]);
      } else {

        // 如果 target 是数组，会被 Object.assign 视为属性名为 0、1、2... 的对象
        // { [prop]: source[prop] } -> { 0: 'a' } 会覆盖 target 的 index 为 0 的值
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepAssign(target, ...sources);
}

// 返回介于 a 到 b 之间的一个随机数
export function random(a, b) {
  const val = b - a + 1;

  return Math.floor(Math.random() * val + a);
}

export function delayTask(task, delay = 600) {
  let running = false;
  let taskTimer = setTimeout(() => {
    running = true;
    task();
  }, delay);

  // return clear state, true: cleared, false: not cleared
  return () => {
    clearTimeout(taskTimer);

    return !running;
  };
}

const merge = (left, right) => {
  const ret = [];
  let l = 0,
    r = 0;

  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      ret.push(left[l++]);
    } else {
      ret.push(right[r++]);
    }
  }

  return [...ret, ...left.slice(l), ...right.slice(r)];
};

// 排序算法 - 并归排序
// 觉得挺有意思的，就拿来实现下
export function mergeSort(data) {
  const len = data.length;

  if (len === 1) {
    return data;
  }

  const mid = Math.floor(len / 2),
    left = data.slice(0, mid),
    right = data.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

export function arrayToTree(data, {
  id = 'id',
  parentId = 'parentId',
  rootParentId = 0,
  children = 'children'
} = {}) {

  const list = [],
    map = {},
    tree = [];

  for (let i = 0; i < data.length; i++) {
    map[data[i][id]] = i;
    list.push({
      ...data[i],
      [children]: []
    });
  }

  for (let i = 0; i < list.length; i++) {
    const node = list[i];

    if (node[parentId] !== rootParentId) {
      const foundIndex = map[node[parentId]];

      if (typeof foundIndex === 'number') {
        const found = list[foundIndex];

        found.children.push(node);
      }
    } else {
      tree.push(node);
    }
  }

  return tree;
}

// 任务分割函数，当一个函数运行时间过长，可以使用该函数把它拆分为一系列能在较短时间内完成的子函数，使用定时器加入到队列。
export function chunk(data, process, context, duration = 100) {
  const tasks = data.concat();

  const run = () => {
    setTimeout(function () {
      process.call(context, tasks.shift());

      if (tasks.length) {
        run();
      }
    }, duration);
  };

  run();
}

// 在一定时间（毫秒）内批量处理数据量比较大的数组，以减轻运行大数据数组对客户端的程序阻塞
export function batch(data, process, context, cb = noop, { runDuration = 25, chunkDuration = 50 } = {}) {
  const tasks = data.concat();

  const run = () => {
    setTimeout(function () {
      var start = Date.now();

      do {
        process.call(context, tasks.shift());
      } while (tasks.length && (Date.now() - start < chunkDuration));

      if (tasks.length) {
        run();
      } else {
        cb();
      }
    }, runDuration);
  };

  run();
}

export function noop() {}
