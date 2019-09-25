import isPlainObject from 'lodash/isPlainObject';
import { type } from './util';

/**
 * 转换文本中出现的以参数 data 的 key 为占位的字符串，将 data 的 key 对应的 value 进行替换，比如：
 * text: 'Hello, {name}!', data: { name: 'Nicolas' } 会转换为 'Hello, Nicolas!'
 * dataReplaceable 为 true，会删除 data 中被 text 匹配到的值。一般用于同时处理 API 请求 body 和 request url 的 rest api 替换
 * @param {String} text
 * @param {Object} data
 * @param {Boolean} dataReplaceable
 */
export function parseTextPlaceholder(text, data, dataReplaceable = false) {
  let rPlaceholder = /\{([^}]+)\}/g;

  if (rPlaceholder.test(text) && isPlainObject(data) && Object.keys(data).length) {
    return text.replace(rPlaceholder, function (match, placeholder) {
      let val = data[placeholder];

      if (type(val) !== 'undefined') {
        if (dataReplaceable) {
          delete data[placeholder];
        }

        return val;
      }

      return match;
    });
  }

  return text;
}

// example: format('Do {0} love {1}? Yes, {2} love {0}!', 'you', 'me', 'I');
// return: 'Do you love me? Yes, I love You!'
export function parseNumberPlaceholder(text, ...params) {
  return text.replace(/\{(\d+)\}/g, function (m, i) {
    return params[i];
  });
}

export function formatSize(bytes) {
  let i = -1;

  do {
    bytes = bytes / 1024;
    i++;
  } while (bytes >= 1024);

  return parseFloat(Math.max(bytes, 0.1).toFixed(2)) + ['KB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];
}

export function trim(text) {
  return text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
