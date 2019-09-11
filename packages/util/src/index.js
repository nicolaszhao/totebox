class A {
  fn() {

  }
}

const a = new A();
a.fn();

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
