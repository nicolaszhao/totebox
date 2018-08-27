
/**
* NZ's utils
*
* Version: 0.7.4
*
* Author: NZ
* Web: https://github.com/nicolaszhao/tote-box
*
* Licensed under
*   MIT License http://www.opensource.org/licenses/mit-license
*
*/

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var lodash = require('lodash');
var URI = _interopDefault(require('urijs'));

/**
 * 转换 text 中在 data 中出现的占位为最终字符串
 * 例如：text = 'Hello, {name}!', data = { name: 'Nicolas' } 会转换为 'Hello, Nicolas!'
 * 如果 dataReplaceable 设置为 true，会删除 data 中被 text 匹配到的值
 * @param {String} text 
 * @param {Object} data 
 * @param {Boolean} dataReplaceable 
 */
function parseTextPlaceholder(text, data, dataReplaceable = false) {
  let rPlaceholder = /\{([^}]+)\}/g;

  if (rPlaceholder.test(text) && lodash.isPlainObject(data) && !lodash.isEmpty(data)) {
    return text.replace(rPlaceholder, function (match, placeholder) {
      let val = data[placeholder];

      if (!lodash.isUndefined(val)) {
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
function parseNumberPlaceholder(text, ...params) {
  return text.replace(/\{(\d+)\}/g, function (m, i) {
    return params[i];
  });
}

function formatSize(bytes) {
  let i = -1;

  do {
    bytes = bytes / 1024;
    i++;
  } while (bytes >= 1024);

  return parseFloat(Math.max(bytes, 0.1).toFixed(2)) + ['KB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];
}

function trim(text) {
  return text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

const html = {
  entityify(text) {
    const character = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;'
    };

    return text.replace(/[<>"&]/g, function (match) {
      return character[match];
    });
  },

  deentityify(text) {
    const entity = {
      quot: '"',
      lt: '<',
      gt: '>'
    };

    return text.replace(/&([^&;]+);/g, function (match, key) {
      const ret = entity[key];

      return typeof ret === 'string' ? ret : match;
    });
  },

  strip: function (text) {
    return text.replace(/<(?:.|\s)*?>/g, '');
  },

  escape(text) {
    if (typeof text !== 'string') {
      return '';
    }
    
    const rscript = /<script[^>]*>(?:(?:(?!<\/script>).)*<\/script>)?/gi,
      rstyle = /<style[^>]*>(?:(?!@import|<\/style>).)*@import(?:(?!<\/style>).)+<\/style>/gi,
      rlink = /<link(?:(?!\.css).)+\.css[^>]*>/gi,
      rinnerevent = /on[a-zA-Z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s\/>]+)/gi,
      rinnerexpress = /javascript:/gi;
    
    return text.replace(rscript, '')
      .replace(rstyle, '')
      .replace(rlink, '')
      .replace(rinnerevent, '')
      .replace(rinnerexpress, '');
  },

  filter: function (text, maxlength) {
    if (text === '')
      return '';

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
    text = this.strip(text);

    if (typeof maxlength === 'number') {
      text = text.substring(0, maxlength);
    }

    return text;
  }
};

const merge = (left, right) => {
  const ret = [];
  let l = 0,
    r = 0;

  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      ret.push(left[l++]);
    } else {
      ret.push(right[r++]);
    }
  }

  return [...ret, ...left.slice(l), ...right.slice(r)];
};

// 排序算法 - 并归排序
// 觉得挺有意思的，就拿来实现下
function mergeSort(data) {
  const len = data.length;

  if (len === 1) {
    return data;
  }

  const mid = Math.floor(len / 2),
    left = data.slice(0, mid),
    right = data.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function arrayToTree(data, {
  id = 'id',
  parentId = 'parentId',
  rootParentId = 0,
  children = 'children'
} = {}) {

  const list = [],
    map = {},
    tree = [];

  for (let i = 0; i < data.length; i++) {
    map[data[i][id]] = i;
    list.push({
      ...data[i],
      [children]: []
    });
  }

  for (let i = 0; i < list.length; i++) {
    const node = list[i];

    if (node[parentId] !== rootParentId) {
      const foundIndex = map[node[parentId]];

      if (typeof foundIndex === 'number') {
        const found = list[foundIndex];

        found.children.push(node);
      }
    } else {
      tree.push(node);
    }
  }

  return tree;
}

// 任务分割函数，当一个函数运行时间过长，可以使用该函数把它拆分为一系列能在较短时间内完成的子函数，使用定时器加入到队列。
function chunk(data, process, context, duration = 100) {
  const tasks = data.concat();

  const run = () => {
    setTimeout(function () {
      process.call(context, tasks.shift());

      if (tasks.length) {
        run();
      }
    }, duration);
  };

  run();
}

// 在一定时间（毫秒）内批量处理数据量比较大的数组，以减轻运行大数据数组对客户端的程序阻塞
function batch(data, process, context, cb = noop, { runDuration = 25, chunkDuration = 50 } = {}) {
  const tasks = data.concat();

  const run = () => {
    setTimeout(function () {
      var start = Date.now();

      do {
        process.call(context, tasks.shift());
      } while (tasks.length && (Date.now() - start < chunkDuration));

      if (tasks.length) {
        run();
      } else {
        cb();
      }
    }, runDuration);
  };

  run();
}

function noop() {}

function type(obj) {
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
function deepAssign(target, ...sources) {
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
function random(a, b) {
  const val = b - a + 1;

  return Math.floor(Math.random() * val + a);
}

/**
 * 
 * TODO: 该模块下方法还未做过任何测试
 */

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function parseDate(format, value) {
  if (value === '') {
    return null;
  }

  let year = -1,
    month = -1,
    day = -1,
    iValue = 0,
    date = new Date(),
    iFormat, extra;

  const lookAhead = function (match) {
      const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);

      if (matches) {
        iFormat++;
      }

      return matches;
    },

    getNumber = function (match) {
      const isDoubled = lookAhead(match),
        size = (match === 'y' && isDoubled ? 4 : 2),
        digits = new RegExp('^\\d{1,' + size + '}'),
        num = value.substring(iValue).match(digits);

      if (!num) {
        throw 'Missing number at position ' + iValue;
      }

      iValue += num[0].length;

      return parseInt(num[0], 10);
    },

    checkLiteral = function () {
      if (value.charAt(iValue) !== format.charAt(iFormat)) {
        throw 'Unexpected literal at position ' + iValue;
      }

      iValue++;
    };

  for (iFormat = 0; iFormat < format.length; iFormat++) {
    switch (format.charAt(iFormat)) {
      case 'd':
        day = getNumber('d');
        break;
      case 'm':
        month = getNumber('m');
        break;
      case 'y':
        year = getNumber('y');
        break;
      default:
        checkLiteral();
    }
  }

  if (iValue < value.length) {
    extra = value.substr(iValue);

    if (!/^\s+/.test(extra)) {
      throw 'Extra/unparsed characters found in date: ' + extra;
    }
  }

  if (year === -1) {
    year = date.getFullYear();
  } else if (year < 100) {
    year += date.getFullYear() - date.getFullYear() % 100;
  }

  date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    throw 'Invalid date';
  }

  return date;
}

function formatDate(format, date) {
  if (!date) {
    return '';
  }

  let output = '',
    iFormat,

    lookAhead = function (match) {
      const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);

      if (matches) {
        iFormat++;
      }

      return matches;
    },

    formatNumber = function (match, value, len) {
      var num = '' + value;

      if (lookAhead(match)) {
        while (num.length < len) {
          num = '0' + num;
        }
      }

      return num;
    };

  for (iFormat = 0; iFormat < format.length; iFormat++) {
    switch (format.charAt(iFormat)) {
      case 'd':
        output += formatNumber('d', date.getDate(), 2);
        break;
      case 'm':
        output += formatNumber('m', date.getMonth() + 1, 2);
        break;
      case 'y':
        output += (lookAhead('y') ? date.getFullYear() :
          (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
        break;
      default:
        output += format.charAt(iFormat);
    }
  }

  return output;
}

/**
 * 时间解析器方法
 * @param time {Number(millisecond)}
 * @param units {Array(['年', '月', '周', '天', '小时', '分钟', '秒'])}
 * @returns {Array} 比如：[ '1周', '14小时', '29秒' ]
 */
function timeParser(time, units = '年 月 周 天 小时 分钟 秒'.split(' ')) {
  const timeKeys = 'year month week day hours minutes second'.split(' '),
    timeValues = [1, 12, 4, 7, 24, 60, 60],
    yearMilliseconds = 1000 * 60 * 60 * 24 * 365;

  let values = {},
    ret = [];

  timeKeys.reduce((prev, cur, i) => {
    let next;

    if (i === 0) {
      next = time / yearMilliseconds;
    } else {
      next = (prev - Math.floor(prev)) * timeValues[i];
    }

    values[cur] = Math.floor(next);

    return next;
  }, time);

  timeKeys.forEach((key, i) => {
    if (values[key]) {
      ret.push(`${values[key]}${units[i]}`);
    }
  });

  return ret;
}

/**
 * 秒钟倒计时工具，返回 stop 方法，执行可用来停止 tick 执行
 * @param {Number} second 
 * @param {Object} events: { onStart, onProgress, onEnd } 
 * @param {Object} context 
 */
function countdown(value, { onStart = noop: noop$1, onProgress = noop: noop$1, onEnd = noop: noop$1 } = {}, context) {
  if (type(value) !== 'date' && type(value) !== 'number') {
    throw new Error('The value of params must be a Date or Number.');
  }

  const cdType = type(value) === 'date' ? 'date' : 'second';
  const last = value;
  let timerId;

  const getDateValues = (value) => {
    const dif = value - Date.now();
    let hours, minutes, second;

    hours = minutes = second = 0;

    if (dif > 0) {
      hours = Math.floor(dif / (1000 * 60 * 60));
      minutes = Math.floor(dif / (1000 * 60)) - hours * 60;
      second = Math.floor(dif / 1000) - hours * 60 * 60 - minutes * 60;
    }
    
    return { dif, hours, minutes, second };
  };

  const tick = () => {
    timerId = setTimeout(() => {
      if (cdType === 'date') {
        const { dif, ...values } = getDateValues(last);

        // 缓存 value 变量，方便在执行停止时可以传入 stop
        value = values;

        if (dif <= 0) {
          return onEnd.bind(context)(value);
        }

        onProgress.bind(context)(value);
      } else {
        if (!value) {
          return onEnd.bind(context)(value);
        }
  
        onProgress.bind(context)(--value);
      }

      tick();
    }, 1000);
  };

  return {
    start() {
      if (cdType === 'date') {
        const { dif, ...values } = getDateValues(last);
    
        value = values;
      }

      onStart.bind(context)(value);
      tick();
    },

    stop(callback) {
      clearTimeout(timerId);
      callback && callback.bind(context)(value);
    }
  };
}

function noop$1() { }

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
    } catch (ex) {
      console.error(`cache.set(${key}, ${value}) error: ${ex.message}.`);
    }
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
const cacheTable = {
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

    if (row && type(row) === type(value) && lodash.isPlainObject(value)) {
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

const cookie = {
  get(name) {
    const pattern = `(?:;\\s)?${encodeURIComponent(name)}=([^;]*);?`,
      rCookie = new RegExp(pattern);

    return rCookie.test(document.cookie) ?
      decodeURIComponent(RegExp['$1']) :
      null;
  },

  set(name, value, { expires, path, domain, secure } = {}) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString();
    }

    if (path) {
      cookieText += '; path=' + path;
    }

    if (domain) {
      cookieText += '; domain=' + domain;
    }

    if (secure) {
      cookieText += '; secure';
    }

    document.cookie = cookieText;
  },

  remove(name, { path, domain, secure } = {}) {
    const options = {

      // 设置失效时间为1970年1月1日（初始化为0ms的Date对象的值）
      expires: new Date(0),

      path, domain, secure
    };

    this.set(name, '', options);
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
function listenPageVisibility(handler) {
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

// source: http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// TODO: 还未经过测试
function lazyLoadImage(dataSrcAttr = 'data-src', container = document) {
  const eventTypes = 'DOMContentLoaded load resize scroll'.split(' '),
    images = container.querySelectorAll(`img[${dataSrcAttr}]`);

  if (!images.length) {
    return;
  }

  const loadImage = () => {
    for (let image of images) {
      let src;

      if (isElementInViewport(image) && (src = image.getAttribute(dataSrcAttr))) {
        image.setAttribute('src', src);
        image.removeAttribute(dataSrcAttr);
      }
    }
  };
  
  eventTypes.forEach((type$$1) => {
    window.addEventListener(type$$1, loadImage, false);
  });
}

function loadFile(type$$1, url, callback, context) {
  let el;

  if (type$$1 === 'js') {
    el = document.createElement('script');
    el.type = 'text/javascript';
  } else if (type$$1 === 'css') {
    el = document.createElement('link');
    el.rel = 'stylesheet';
    el.type = 'text/css';
  }

  if (callback) {

    // IE
    if (el.readyState) {
      el.onreadystatechange = function () {
        if (el.readyState == 'loaded' || el.readyState == 'complete') {

          // 防止其他 ready 状态更改时再次触发
          el.onreadystatechange = null;

          callback.bind(context)();
        }
      };
    } else {
      el.onload = function () {
        callback.bind(context)();
      };
    }
  }

  el[type$$1 === 'js' ? 'src' : 'href'] = url;
  document.getElementsByTagName('head')[0].appendChild(el);
}

const rUrl = /^([^?#]+)(\?[^#]+)?(#.+)?/;

function getQuerys(url = '') {
  const rQueryValue = /^([^=]+)(?:=(.*))?$/;

  let [, , search] = rUrl.exec(url) || [];

  if (!search) {
    return null;
  }

  const ret = {},
    args = search.substring(1).split('&'),
    len = args.length;

  for (let i = 0; i < len; i++) {
    const queryMatch = rQueryValue.exec(args[i]);

    if (queryMatch) {
      let [, name, value] = queryMatch;

      name = decodeURIComponent(name);
      value = typeof value !== 'undefined' ? decodeURIComponent(value) : '';
      ret[name] = /\d+/.test(value) ? +value : value;
    }
  }

  return ret;
}

function addQuerys(url = '', querys = {}) {
  const oriQuerys = getQuerys(url) || {};
  
  for (let name of Object.keys(querys)) {
    oriQuerys[name] = querys[name];
  }

  const queryString = [];

  for (let name of Object.keys(oriQuerys)) {
    queryString.push(`${encodeURIComponent(name)}=${encodeURIComponent(oriQuerys[name])}`);
  }

  if (!queryString.length) {
    return url;
  }

  const [, baseUrl, , hash = ''] = rUrl.exec(url);

  return `${baseUrl}?${queryString.join('&')}${hash}`;
}

/**
 * 参数可通过多种方式传入
 * querys(); -> { ...querys }
 * querys(url); -> { ...querys }
 * querys(params); -> 'url?params#hash'
 * querys(url, params); -> 'url?params#hash'
 * 
 * @param {String} url
 * @param {Object} params: 需要添加到 URL search 部分的参数，如果传了该参数，会调用 addQuerys 方法
 */
function querys(...args) {
  let [url, params] = args;

  if (!url) {
    url = window.location.href;
  } else if (typeof url === 'object') {
    [url, params] = [window.location.href, url];
  }

  if (!params) {
    return getQuerys(url);
  }

  return addQuerys(url, params);
}

let message = '请求接口"{url}"时出错，错误信息：{message}';

let http = function (url, options) {
  const requestPromise = fetch(url, options)
    .then((res) => {
      return res.json()
        .then((json) => {
          if (json.status === 0) {
            return json.data;
          } else {
            return Promise.reject(json);
          }
        }, err => {
          throw new Error(parseTextPlaceholder(message, { url, message: err.message }));
        });
    }, err => {
      throw new Error(parseTextPlaceholder(message, { url, message: err.message }));
    });

  let abort;

  const abortPromise = new Promise((resolve, reject) => {
    abort = () => {
      reject(new Error(parseTextPlaceholder(message, { url, message: 'abort' })));
    };
  });

  const tasks = [requestPromise, abortPromise],
    { timeout } = options;

  let timeoutPromise;

  if (timeout) {
    delete options.timeout;
    timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error(parseTextPlaceholder(message, { url, message: '请求超时' }))), timeout);
    });

    tasks.push(timeoutPromise);
  }

  const p = Promise.race(tasks);

  p.abort = abort;

  return p;
};

let types = 'get post put patch delete'.split(' ');

types.forEach((type) => {

  /**
   * 异步数据请求 window.fetch 的高级封装
   * @param url: (String) url字符串中可以包含占位符(RUSTful API)，用传入的data参数，解析这些占位符
   *   例如：
   *   url = '//xx.xxx.com/api/user/{userId}', data = {userId: 123, userName: 'Nicolas'}
   *   --> url: '//xx.xxx.com/api/user/123'
   *   --> data: {userName: 'Nicolas'}
   *
   * @param data: (Object) 如果是get和delete请求，该对象会被追加到url的query部分。否则，该对象会JSON.stringify，
   * 然后配置到请求设置项的body中。注意：data中如果匹配到url中的占位字符，相应的数据在解析完成后会从data中移除
   *
   * @param options (Object) fetch API 的设置选项，另外增加了额外的timeout(Number)参数
   */
  http[type] = (url, data, options) => {
    url = parseTextPlaceholder(url, data, true);

    options = Object.assign({
      method: type.toUpperCase()
    }, http.defaults, options);

    if (type === 'get' || type === 'delete') {
      if (lodash.isPlainObject(data) && !lodash.isEmpty(data)) {
        url = new URI(url);
        url = url.query(data).href();
      }
    } else {
      options = Object.assign(options, {
        body: lodash.isPlainObject(data) && !lodash.isEmpty(data) ? JSON.stringify(data) : ''
      });
    }

    return http(url, options);
  };
});

// 可以设置通用的默认配置项来统一处理请求设置项
http.defaults = {};

/*
 * url: string
 * settings: object
 *   jsonpCallback: string
 *   timeout: number
 *   done: function
 *   fail: function
 */
function jsonp(url, settings) {
  const script = document.createElement('script');
  let obj, 
    props, 
    jsonpCallback, 
    response, 
    i, 
    timer;

  script.type = 'text/javascript';

  jsonpCallback = settings.jsonpCallback;

  if (jsonpCallback.indexOf('.') !== -1) {
    props = jsonpCallback.split('.');
    window[props[0]] = obj = {};

    for (i = 1; i < props.length; i++) {
      if (i < props.length - 1) {
        obj = obj[props[i]] = {};
      } else {
        obj[props[i]] = function () {
          response = arguments[0];
        };
      }
    }
  } else {
    window[jsonpCallback] = function () {
      response = arguments[0];
    };
  }

  if (settings.timeout) {
    timer = setTimeout(function () {
      delete settings.done;
      if (typeof settings.fail === 'function') {
        settings.fail();
      }
    }, settings.timeout);
  }

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        clearTimeout(timer);

        if (typeof settings.done === 'function') {
          settings.done(response);
        }
      }
    };
  } else {
    script.onload = function () {
      clearTimeout(timer);

      if (typeof settings.done === 'function') {
        settings.done(response);
      }
    };
  }

  script.src = url;
  (document.head || document.getElementsByTagName('head')[0]).appendChild(script);
}

var History = function() {
  this.stack = [];
  this.activeIndex = 0;
};

History.prototype = {
  constructor: History,

  getActive: function() {
    return this.stack[this.activeIndex];
  },

  getPrev: function() {
    return this.stack[this.activeIndex - 1];
  },

  getNext: function() {
    return this.stack[this.activeIndex + 1];
  },

  size: function() {
    return this.stack.length;
  },

  add: function(url) {
    if (this.getNext()) {
      this.stack = this.stack.slice(0, this.activeIndex + 1);
    }

    this.stack.push(url);
    this.activeIndex = this.stack.length - 1;

    return this.stack.length;
  },

  find: function(url) {
    var length = this.stack.length, index, i;

    for (i = 0; i < length; i++) {
      if (url === this.stack[i]) {
        index = i;
        break;
      }
    }

    return index;
  },

  direct: function(url) {
    var newActiveIndex = this.find(url),
      a = this.activeIndex;

    if (typeof newActiveIndex !== 'undefined') {
      this.activeIndex = newActiveIndex;
    }

    if (newActiveIndex < a) {
      return -1;
    } else if (newActiveIndex > a) {
      return 1;
    } else {
      return this.add(url);
    }
  }
};

exports.http = http;
exports.jsonp = jsonp;
exports.History = History;
exports.parseTextPlaceholder = parseTextPlaceholder;
exports.parseNumberPlaceholder = parseNumberPlaceholder;
exports.formatSize = formatSize;
exports.trim = trim;
exports.html = html;
exports.mergeSort = mergeSort;
exports.arrayToTree = arrayToTree;
exports.chunk = chunk;
exports.batch = batch;
exports.type = type;
exports.deepAssign = deepAssign;
exports.random = random;
exports.isLeapYear = isLeapYear;
exports.parseDate = parseDate;
exports.formatDate = formatDate;
exports.timeParser = timeParser;
exports.countdown = countdown;
exports.noop = noop$1;
exports.cache = cache;
exports.cacheTable = cacheTable;
exports.cookie = cookie;
exports.listenPageVisibility = listenPageVisibility;
exports.isElementInViewport = isElementInViewport;
exports.lazyLoadImage = lazyLoadImage;
exports.loadFile = loadFile;
exports.getQuerys = getQuerys;
exports.addQuerys = addQuerys;
exports.querys = querys;
