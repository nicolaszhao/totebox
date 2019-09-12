import isPlainObject from 'lodash/isPlainObject';
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';

/**
 * 转换 text 中在 data 中出现的占位为最终字符串
 * 例如：text = 'Hello, {name}!', data = { name: 'Nicolas' } 会转换为 'Hello, Nicolas!'
 * 如果 dataReplaceable 设置为 true，会删除 data 中被 text 匹配到的值
 * @param {String} text
 * @param {Object} data
 * @param {Boolean} dataReplaceable
 */
export function parseTextPlaceholder(text, data, dataReplaceable = false) {
  let rPlaceholder = /\{([^}]+)\}/g;

  if (rPlaceholder.test(text) && isPlainObject(data) && !isEmpty(data)) {
    return text.replace(rPlaceholder, function (match, placeholder) {
      let val = data[placeholder];

      if (!isUndefined(val)) {
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
