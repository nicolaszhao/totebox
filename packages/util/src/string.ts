import { type } from './util';

/**
 * Example: parseTextPlaceholder('Hello, {name}!', { name: 'Nicolas' })
 * returns 'Hello, Nicolas!'
 * dataReplaceable: true，将删除 data 中被 text 匹配到的值。常用于处理 rest url & post data
 */
export function parseTextPlaceholder(
  text: string,
  data: Record<string | number, unknown>,
  dataReplaceable = false,
): string {
  const regPlaceholder = /\{([^}]+)\}/g;

  if (regPlaceholder.test(text) && type(data) === 'object' && Object.keys(data).length) {
    return text.replace(regPlaceholder, (match, placeholder): string => {
      const val = data[placeholder] as string | number;

      if (type(val) !== 'undefined') {
        if (dataReplaceable) {
          delete data[placeholder];
        }

        return `${val}`;
      }

      return match;
    });
  }

  return text;
}

/**
 * Example: format('Do {0} love {1}? Yes, {2} love {0}!', 'you', 'me', 'I')
 * returns 'Do you love me? Yes, I love You!'
 */
export function parseNumberPlaceholder(text: string, ...params: string[]): string {
  return text.replace(/\{(\d+)\}/g, (m, i) => params[i]);
}

export function formatSize(bytes: number): string {
  let i = -1;

  do {
    bytes /= 1024;
    i++;
  } while (bytes >= 1024);

  return parseFloat(Math.max(bytes, 0.1).toFixed(2)) + ['KB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];
}

export function trim(text: string): string {
  return text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

interface HtmlCharacter {
  [propName: string]: string;
}

export function entityify(text: string): string {
  const character: HtmlCharacter = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
  };

  return text.replace(/[<>"&]/g, (match): string => character[match]);
}

export function deentityify(text: string): string {
  const entity: HtmlCharacter = {
    quot: '"',
    lt: '<',
    gt: '>',
  };

  return text.replace(/&([^&;]+);/g, (match, key) => {
    const ret = entity[key];
    return type(ret) === 'string' ? ret : match;
  });
}

export function strip(text: string): string {
  return text.replace(/<(?:.|\s)*?>/g, '');
}

export function escape(text: string): string {
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

export function filter(text: string, maxLength?: number): string {
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
