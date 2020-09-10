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
  const regPlaceholder = /\{([^}]+)\}/g;

  if (regPlaceholder.test(text) && type(data) === 'object' && Object.keys(data).length) {
    return text.replace(regPlaceholder, (match, placeholder) => {
      const val = data[placeholder];

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
  return text.replace(/\{(\d+)\}/g, (m, i) => params[i]);
}

export function formatSize(bytes) {
  let i = -1;

  do {
    bytes /= 1024;
    i++;
  } while (bytes >= 1024);

  return parseFloat(Math.max(bytes, 0.1).toFixed(2)) + ['KB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];
}

export function trim(text) {
  return text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

export function entityify(text) {
  const character = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
  };

  return text.replace(/[<>"&]/g, (match) => character[match]);
}

export function deentityify(text) {
  const entity = {
    quot: '"',
    lt: '<',
    gt: '>',
  };

  return text.replace(/&([^&;]+);/g, (match, key) => {
    const ret = entity[key];

    return type(ret) === 'string' ? ret : match;
  });
}

export function strip(text) {
  return text.replace(/<(?:.|\s)*?>/g, '');
}

export function escape(text) {
  if (type(text) !== 'string') {
    return '';
  }

  const rscript = /<script[^>]*>(?:(?:(?!<\/script>).)*<\/script>)?/gi;
  const rstyle = /<style[^>]*>(?:(?!@import|<\/style>).)*@import(?:(?!<\/style>).)+<\/style>/gi;
  const rlink = /<link(?:(?!\.css).)+\.css[^>]*>/gi;
  const rinnerevent = /on[a-zA-Z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s/>]+)/gi;
  const rinnerexpress = /javascript:/gi;

  return text.replace(rscript, '')
    .replace(rstyle, '')
    .replace(rlink, '')
    .replace(rinnerevent, '')
    .replace(rinnerexpress, '');
}

export function filter(text, maxLength) {
  if (text === '') {
    return '';
  }

  text = text

    // 将2个以上的空字符转换为一个
    .replace(/\s{2,}/g, ' ')

    // 将所有HTML的换行标记转换为换行符
    .replace(/<br\s*\/?>/g, '\n')

    // 将所有HTML的空格标记转换为一个空字符
    .replace(/(\s*&(n|N)(b|B)(s|S)(p|P);\s*)+/g, ' ')

    // 将单个单引号转换为成对的单引号
    .replace(/'/g, "''");

  // 过滤掉两端空格及HTML标记
  text = trim(text);
  text = strip(text);

  if (type(maxLength) === 'number') {
    text = text.substring(0, maxLength);
  }

  return text;
}
