import isPlainObject from 'lodash/isPlainObject';
import { type } from './util';

/**
 * Example: parseTextPlaceholder('Hello, {name}!', { name: 'Nicolas' })
 * returns 'Hello, Nicolas!'
 * dataReplaceable: true，将删除 data 中被 text 匹配到的值。常用于处理 rest url & post data
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

// Example: format('Do {0} love {1}? Yes, {2} love {0}!', 'you', 'me', 'I')
// returns 'Do you love me? Yes, I love You!'
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
