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

  const props = Object.keys(source);

  for (let prop of props) {
    if (type(source[prop]) === 'object' || type(source[prop]) === 'array') {
      if (!target[prop]) {
        Object.assign(target, { [prop]: type(source[prop]) === 'object' ? {} : [] });
      }

      deepAssign(target[prop], source[prop]);
    } else {

      // 如果 target 是数组，会被 Object.assign 视为属性名为 0、1、2... 的对象
      // { [prop]: source[prop] } -> { 0: 'a' } 会覆盖 target 的 index 为 0 的值
      Object.assign(target, { [prop]: source[prop] });
    }
  }

  return deepAssign(target, ...sources);  
}
