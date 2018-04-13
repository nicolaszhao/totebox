import { isPlainObject } from 'lodash';
import { type } from './util';

/**
 * 对 localStorage 的高级封装
 * 与 localStorage 不同的是，set 方法的 value 可以是任何类型的值，通过 get 方法返回之前存入的值，返回值根据存入的类型而定
 */
const cache = {
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
 * 起到缓存数据表的作用
 */
cache.large = {
  get(primaryKey, secondary) {
    let data = cache.get(primaryKey);

    if (data) {
      return data[secondary];
    }

    return data;
  },

  // 如果原有数据和 data 都是普通对象，那么将 data 与原有数据合并
  // 否则 data 覆盖原有数据
  set(primaryKey, secondary, data) {
    let
      cacheData = cache.get(primaryKey),
      secondaryData;

    !cacheData && (cacheData = {});
    secondaryData = cacheData[secondary];

    if (secondaryData && type(secondaryData) === type(data) && isPlainObject(data)) {
      cacheData[secondary] = Object.assign({}, cacheData[secondary], data);
    } else {
      cacheData[secondary] = data;
    }

    cache.set(primaryKey, cacheData);
  }
};

export default cache;
