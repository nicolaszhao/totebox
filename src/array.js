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

function noop() {}
