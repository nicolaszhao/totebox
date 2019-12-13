// eslint-disable-next-line import/no-extraneous-dependencies
import { type } from '@totebox/util';

// localStorage 的高阶封装
// set 可设置多种数据类型，get 直接返回 set 存入的数据值
export const storage = {

  // 如果 key 不存在，返回 null
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },

  set(key, value) {
    // 有些移动端机型，同时多次执行 localStorage.setItem 会导致异常
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (ex) {
      // ignore
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

// storage table =>
// [primary-key]: {
//   [secondary-key]: data
// }
export function storageTable(primaryKey) {
  const getTable = () => storage.get(primaryKey);

  return {
    get(key) {
      const table = getTable();
      return type(table) === 'object' && type(table[key]) !== 'undefined' ? table[key] : null;
    },

    // 如果存入的值和之前的数据都是 Object，则会合并两者，否则直接覆盖
    set(key, value) {
      const table = getTable() || {};
      const prev = table[key];

      if (type(prev) === 'object' && type(value) === 'object') {
        table[key] = { ...prev, ...value };
      } else {
        table[key] = value;
      }

      storage.set(primaryKey, table);
    },

    remove(key) {
      const table = getTable();

      if (type(table) === 'object') {
        delete table[key];
        storage.set(primaryKey, table);
      }
    },

    clear() {
      storage.remove(primaryKey);
    },
  };
}
