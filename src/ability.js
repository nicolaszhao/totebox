import { isPlainObject } from 'lodash';
import { type } from './util';

/**
 * 对 localStorage 的高级封装
 * 与 localStorage 不同的是，set 方法的 value 可以是任何类型的值，通过 get 方法返回之前存入的值，返回值根据存入的类型而定
 */
export const cache = {
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  
  set(key, value) {
    value = typeof value !== 'string' ? JSON.stringify(value) : value;

    // 在有些移动端机型，同时执行 localStorage.setItem 多次会导致异常
    try {
      localStorage.setItem(key, value);
    } catch (ex) {}
  },
  
  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};

/**
 * 把 cache 作为一个数据表一样管理
 */
export const cacheTable = {
  get(primaryKey, secondaryKey) {
    const table = cache.get(primaryKey);

    if (type(table) !== 'object' || type(table[secondaryKey]) === 'undefined') {
      return null;
    }

    return table[secondaryKey];
  },

  // 如果原有数据和 value 都是普通对象，那么 value 将与原有数据合并
  // 否则 value 覆盖原有数据
  set(primaryKey, secondaryKey, value) {
    const table = cache.get(primaryKey) || {},
      row = table[secondaryKey];

    if (row && type(row) === type(value) && isPlainObject(value)) {
      table[secondaryKey] = Object.assign({}, row, value);
    } else {
      table[secondaryKey] = value;
    }

    cache.set(primaryKey, table);
  },

  remove(primaryKey, secondaryKey) {
    const table = cache.get(primaryKey);

    if (type(table) !== 'object') {
      return;
    }

    delete table[secondaryKey];
    cache.set(primaryKey, table);
  },

  clear(primaryKey) {
    const table = cache.get(primaryKey);

    if (type(table) !== 'object') {
      return;
    }

    cache.set(primaryKey, null);
  }
};

/**
 * 监听页面可见性变化并绑定处理函数
 * HTML 5 Page Visibility API: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
 * 
 * 
 * 基本用法：
 * listenPageVisibility(visible => {
 *   if (visible) {
 *     // 页面从不可见变为可见
 *   } else {
 *     // 页面从可见变为不可见
 *   }
 * });
 * 
 * 移动端兼容性：
 * iOS:             √ 自带浏览器    √ Chrome for iOS        × UC 浏览器    √ 微信    × QQ    × 微博    × 沪江 Web 容器（支持自身native页面切换）
 * Android 4.4+:    √ 自带浏览器    √ Chrome for Android    √ UC 浏览器    √ 微信    √ QQ    √ 微博    √ 沪江 Web 容器
 * 
 */
export function listenPageVisibility(handler) {
  let hidden, eventType;
  
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    eventType = 'visibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    eventType = 'webkitvisibilitychange';
  }
  
  document.addEventListener(eventType, () => {
    if (typeof handler === 'function') {
      handler(!document[hidden]);
    }
  }, false);
}
