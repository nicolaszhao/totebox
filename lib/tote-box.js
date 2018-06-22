(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("urijs"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "urijs"], factory);
	else if(typeof exports === 'object')
		exports["ToteBox"] = factory(require("lodash"), require("urijs"));
	else
		root["ToteBox"] = factory(root["Lodash"], root["URI"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"root":"Lodash","amd":"lodash","commonjs":"lodash","commonjs2":"lodash"}
var external_root_Lodash_amd_lodash_commonjs_lodash_commonjs2_lodash_ = __webpack_require__(0);

// CONCATENATED MODULE: ./src/string.js


/**
 * 转换 text 中在 data 中出现的占位为最终字符串
 * 例如：text = 'Hello, {name}!', data = { name: 'Nicolas' } 会转换为 'Hello, Nicolas!'
 * 如果 dataReplaceable 设置为 true，会删除 data 中被 text 匹配到的值
 * @param {String} text 
 * @param {Object} data 
 * @param {Boolean} dataReplaceable 
 */
function parseTextPlaceholder(text, data) {
  var dataReplaceable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var rPlaceholder = /\{([^}]+)\}/g;

  if (rPlaceholder.test(text) && Object(external_root_Lodash_amd_lodash_commonjs_lodash_commonjs2_lodash_["isPlainObject"])(data) && !Object(external_root_Lodash_amd_lodash_commonjs_lodash_commonjs2_lodash_["isEmpty"])(data)) {
    return text.replace(rPlaceholder, function (match, placeholder) {
      var val = data[placeholder];

      if (!Object(external_root_Lodash_amd_lodash_commonjs_lodash_commonjs2_lodash_["isUndefined"])(val)) {
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

function noop() {}
// CONCATENATED MODULE: ./src/array.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function arrayToTree(data) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$id = _ref.id,
      id = _ref$id === undefined ? 'id' : _ref$id,
      _ref$parentId = _ref.parentId,
      parentId = _ref$parentId === undefined ? 'parentId' : _ref$parentId,
      _ref$rootParentId = _ref.rootParentId,
      rootParentId = _ref$rootParentId === undefined ? 0 : _ref$rootParentId,
      _ref$children = _ref.children,
      children = _ref$children === undefined ? 'children' : _ref$children;

  var list = [],
      map = {},
      tree = [];

  for (var i = 0; i < data.length; i++) {
    map[data[i][id]] = i;
    list.push(_extends({}, data[i], _defineProperty({}, children, [])));
  }

  for (var _i = 0; _i < list.length; _i++) {
    var node = list[_i];

    if (node[parentId] !== rootParentId) {
      var foundIndex = map[node[parentId]];

      if (typeof foundIndex === 'number') {
        var found = list[foundIndex];

        found.children.push(node);
      }
    } else {
      tree.push(node);
    }
  }

  return tree;
}

// 任务分割函数，当一个函数运行时间过长，可以使用该函数把它拆分为一系列能在较短时间内完成的子函数，使用定时器加入到队列。
function chunk(data, process, context) {
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;

  var tasks = data.concat();

  var run = function run() {
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
function batch(data, process, context, cb) {
  var _ref2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
      _ref2$runDuration = _ref2.runDuration,
      runDuration = _ref2$runDuration === undefined ? 25 : _ref2$runDuration,
      _ref2$chunkDuration = _ref2.chunkDuration,
      chunkDuration = _ref2$chunkDuration === undefined ? 50 : _ref2$chunkDuration;

  var tasks = data.concat();

  var run = function run() {
    setTimeout(function () {
      var start = Date.now();

      do {
        process.call(context, tasks.shift());
      } while (tasks.length && Date.now() - start < chunkDuration);

      if (tasks.length) {
        run();
      } else {
        cb();
      }
    }, runDuration);
  };

  run();
}
// CONCATENATED MODULE: ./src/util.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function util_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function util_type(obj) {
  if (obj == null) {
    return obj + '';
  }

  var types = 'Number String Boolean Array Function Object Math Date RegExp Error'.split(' ');
  var class2Type = {};

  types.forEach(function (type) {
    class2Type['[object ' + type + ']'] = type.toLowerCase();
  });

  return class2Type[Object.prototype.toString.call(obj)] || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj));
}

/**
 * Deep merge objects.
 * @param {Object} target
 * @param {Object} sources
 */
function deepAssign(target) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (!sources.length) return target;

  var source = sources.shift();

  var props = Object.keys(source);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = props[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var prop = _step.value;

      if (util_type(source[prop]) === 'object' || util_type(source[prop]) === 'array') {
        if (!target[prop]) {
          Object.assign(target, util_defineProperty({}, prop, util_type(source[prop]) === 'object' ? {} : []));
        }

        deepAssign(target[prop], source[prop]);
      } else {

        // 如果 target 是数组，会被 Object.assign 视为属性名为 0、1、2... 的对象
        // { [prop]: source[prop] } -> { 0: 'a' } 会覆盖 target 的 index 为 0 的值
        Object.assign(target, util_defineProperty({}, prop, source[prop]));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return deepAssign.apply(undefined, [target].concat(sources));
}

// 返回介于 a 到 b 之间的一个随机数
function random(a, b) {
  var val = b - a + 1;

  return Math.floor(Math.random() * val + a);
}
// CONCATENATED MODULE: ./src/time.js

/**
 * 时间解析器方法
 * @param time {Number(millisecond)}
 * @param units {Array(['年', '月', '周', '天', '小时', '分钟', '秒'])}
 * @returns {Array} 比如：[ '1周', '14小时', '29秒' ]
 */
function timeParser(time) {
  var units = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '年 月 周 天 小时 分钟 秒'.split(' ');

  var timeKeys = 'year month week day hours minutes second'.split(' '),
      timeValues = [1, 12, 4, 7, 24, 60, 60],
      yearMilliseconds = 1000 * 60 * 60 * 24 * 365;

  var values = {},
      ret = [];

  timeKeys.reduce(function (prev, cur, i) {
    var next = void 0;

    if (i === 0) {
      next = time / yearMilliseconds;
    } else {
      next = (prev - Math.floor(prev)) * timeValues[i];
    }

    values[cur] = Math.floor(next);

    return next;
  }, time);

  timeKeys.forEach(function (key, i) {
    if (values[key]) {
      ret.push('' + values[key] + units[i]);
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
function timer(second) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$onStart = _ref.onStart,
      onStart = _ref$onStart === undefined ? time_noop : _ref$onStart,
      _ref$onProgress = _ref.onProgress,
      onProgress = _ref$onProgress === undefined ? time_noop : _ref$onProgress,
      _ref$onEnd = _ref.onEnd,
      onEnd = _ref$onEnd === undefined ? time_noop : _ref$onEnd;

  var context = arguments[2];

  var timerId = void 0;

  var tick = function tick() {
    timerId = setTimeout(function () {
      if (!second) {
        return onEnd.bind(context)(second);
      }

      onProgress.bind(context)(--second);
      tick();
    }, 1000);
  };

  onStart.bind(context)(second);
  tick();

  return function stop(cb) {
    clearTimeout(timerId);
    cb.bind(context)(second);
  };
}

function time_noop() {}
// CONCATENATED MODULE: ./src/ability.js



/**
 * 对 localStorage 的高级封装
 * 与 localStorage 不同的是，set 方法的 value 可以是任何类型的值，通过 get 方法返回之前存入的值，返回值根据存入的类型而定
 */
var cache = {
  get: function get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  set: function set(key, value) {
    value = typeof value !== 'string' ? JSON.stringify(value) : value;

    // 在有些移动端机型，同时执行 localStorage.setItem 多次会导致异常
    try {
      localStorage.setItem(key, value);
    } catch (ex) {
      console.error('cache.set(' + key + ', ' + value + ') error: ' + ex.message + '.');
    }
  },
  remove: function remove(key) {
    localStorage.removeItem(key);
  },
  clear: function clear() {
    localStorage.clear();
  }
};

/**
 * 把 cache 作为一个数据表一样管理
 */
var cacheTable = {
  get: function get(primaryKey, secondaryKey) {
    var table = cache.get(primaryKey);

    if (util_type(table) !== 'object' || util_type(table[secondaryKey]) === 'undefined') {
      return null;
    }

    return table[secondaryKey];
  },


  // 如果原有数据和 value 都是普通对象，那么 value 将与原有数据合并
  // 否则 value 覆盖原有数据
  set: function set(primaryKey, secondaryKey, value) {
    var table = cache.get(primaryKey) || {},
        row = table[secondaryKey];

    if (row && util_type(row) === util_type(value) && Object(external_root_Lodash_amd_lodash_commonjs_lodash_commonjs2_lodash_["isPlainObject"])(value)) {
      table[secondaryKey] = Object.assign({}, row, value);
    } else {
      table[secondaryKey] = value;
    }

    cache.set(primaryKey, table);
  },
  remove: function remove(primaryKey, secondaryKey) {
    var table = cache.get(primaryKey);

    if (util_type(table) !== 'object') {
      return;
    }

    delete table[secondaryKey];
    cache.set(primaryKey, table);
  },
  clear: function clear(primaryKey) {
    var table = cache.get(primaryKey);

    if (util_type(table) !== 'object') {
      return;
    }

    cache.set(primaryKey, null);
  }
};

var cookie = {
  get: function get(name) {
    var pattern = '(?:;\\s)?' + encodeURIComponent(name) + '=([^;]*);?',
        rCookie = new RegExp(pattern);

    return rCookie.test(document.cookie) ? decodeURIComponent(RegExp['$1']) : null;
  },
  set: function set(name, value) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        expires = _ref.expires,
        path = _ref.path,
        domain = _ref.domain,
        secure = _ref.secure;

    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

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
  remove: function remove(name) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        path = _ref2.path,
        domain = _ref2.domain,
        secure = _ref2.secure;

    var options = {

      // 设置失效时间为1970年1月1日（初始化为0ms的Date对象的值）
      expires: new Date(0),

      path: path, domain: domain, secure: secure
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
  var hidden = void 0,
      eventType = void 0;

  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    eventType = 'visibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    eventType = 'webkitvisibilitychange';
  }

  document.addEventListener(eventType, function () {
    if (typeof handler === 'function') {
      handler(!document[hidden]);
    }
  }, false);
}

function loadFile(type, url, callback, context) {
  var el = void 0;

  if (type === 'js') {
    el = document.createElement('script');
    el.type = 'text/javascript';
  } else if (type === 'css') {
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

  el[type === 'js' ? 'src' : 'href'] = url;
  document.getElementsByTagName('head')[0].appendChild(el);
}
// CONCATENATED MODULE: ./src/query.js
var query_typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var rUrl = /^([^?#]+)(\?[^#]+)?(#.+)?/;

function getQuerys() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var rQueryValue = /^([^=]+)(?:=(.*))?$/;

  var _ref = rUrl.exec(url) || [],
      _ref2 = _slicedToArray(_ref, 3),
      search = _ref2[2];

  if (!search) {
    return null;
  }

  var ret = {},
      args = search.substring(1).split('&'),
      len = args.length;

  for (var i = 0; i < len; i++) {
    var queryMatch = rQueryValue.exec(args[i]);

    if (queryMatch) {
      var _queryMatch = _slicedToArray(queryMatch, 3),
          name = _queryMatch[1],
          value = _queryMatch[2];

      name = decodeURIComponent(name);
      value = typeof value !== 'undefined' ? decodeURIComponent(value) : '';
      ret[name] = /\d+/.test(value) ? +value : value;
    }
  }

  return ret;
}

function addQuerys() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var querys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var oriQuerys = getQuerys(url) || {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(querys)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var name = _step.value;

      oriQuerys[name] = querys[name];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var queryString = [];

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.keys(oriQuerys)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _name = _step2.value;

      queryString.push(encodeURIComponent(_name) + '=' + encodeURIComponent(oriQuerys[_name]));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  if (!queryString.length) {
    return url;
  }

  var _rUrl$exec = rUrl.exec(url),
      _rUrl$exec2 = _slicedToArray(_rUrl$exec, 4),
      baseUrl = _rUrl$exec2[1],
      _rUrl$exec2$ = _rUrl$exec2[3],
      hash = _rUrl$exec2$ === undefined ? '' : _rUrl$exec2$;

  return baseUrl + '?' + queryString.join('&') + hash;
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
function querys() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var url = args[0],
      params = args[1];


  if (!url) {
    url = window.location.href;
  } else if ((typeof url === 'undefined' ? 'undefined' : query_typeof(url)) === 'object') {
    var _ref3 = [window.location.href, url];
    url = _ref3[0];
    params = _ref3[1];
  }

  if (!params) {
    return getQuerys(url);
  }

  return addQuerys(url, params);
}
// EXTERNAL MODULE: external {"root":"URI","amd":"urijs","commonjs":"urijs","commonjs2":"urijs"}
var external_root_URI_amd_urijs_commonjs_urijs_commonjs2_urijs_ = __webpack_require__(1);
var external_root_URI_amd_urijs_commonjs_urijs_commonjs2_urijs_default = /*#__PURE__*/__webpack_require__.n(external_root_URI_amd_urijs_commonjs_urijs_commonjs2_urijs_);

// CONCATENATED MODULE: ./src/http.js




var message = '请求接口"{url}"时出错，错误信息：{message}';

var http_http = function http(url, options) {
  return fetch(url, options).then(function (res) {
    return res.json().then(function (json) {
      if (json.status === 0) {
        return json.data;
      } else {
        return Promise.reject(json);
      }
    }, function (err) {
      throw new Error(parseTextPlaceholder(message, { url: url, message: err.message }));
    });
  }, function (err) {
    throw new Error(parseTextPlaceholder(message, { url: url, message: err.message }));
  });
};

var http_request = function request(url, options) {
  var timeout = void 0;

  if (options.timeout) {
    timeout = options.timeout;
    delete options.timeout;

    return Promise.race([http_http(url, options),

    // 根据options.timeout的值来判断超时处理，超时后直接reject
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        return reject(new Error(parseTextPlaceholder(message, { url: url, message: '请求超时' })));
      }, timeout);
    })]);
  }

  return http_http(url, options);
};

var types = 'get post put patch delete'.split(' ');

types.forEach(function (type) {

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
  http_http[type] = function (url, data, options) {
    url = parseTextPlaceholder(url, data, true);

    options = Object.assign({
      method: type.toUpperCase()
    }, http_http.defaults, options);

    if (type === 'get' || type === 'delete') {
      if (Object(external_root_Lodash_amd_lodash_commonjs_lodash_commonjs2_lodash_["isPlainObject"])(data) && !Object(external_root_Lodash_amd_lodash_commonjs_lodash_commonjs2_lodash_["isEmpty"])(data)) {
        url = new external_root_URI_amd_urijs_commonjs_urijs_commonjs2_urijs_default.a(url);
        url = url.query(data).href();
      }
    } else {
      options = Object.assign(options, {
        body: Object(external_root_Lodash_amd_lodash_commonjs_lodash_commonjs2_lodash_["isPlainObject"])(data) && !Object(external_root_Lodash_amd_lodash_commonjs_lodash_commonjs2_lodash_["isEmpty"])(data) ? JSON.stringify(data) : ''
      });
    }

    return http_request(url, options);
  };
});

// 可以设置通用的默认配置项来统一处理请求设置项
http_http.defaults = {};

/* harmony default export */ var src_http = (http_http);
// CONCATENATED MODULE: ./src/history.js
var History = function History() {
  this.stack = [];
  this.activeIndex = 0;
};

History.prototype = {
  constructor: History,

  getActive: function getActive() {
    return this.stack[this.activeIndex];
  },

  getPrev: function getPrev() {
    return this.stack[this.activeIndex - 1];
  },

  getNext: function getNext() {
    return this.stack[this.activeIndex + 1];
  },

  size: function size() {
    return this.stack.length;
  },

  add: function add(url) {
    if (this.getNext()) {
      this.stack = this.stack.slice(0, this.activeIndex + 1);
    }

    this.stack.push(url);
    this.activeIndex = this.stack.length - 1;

    return this.stack.length;
  },

  find: function find(url) {
    var length = this.stack.length,
        index,
        i;

    for (i = 0; i < length; i++) {
      if (url === this.stack[i]) {
        index = i;
        break;
      }
    }

    return index;
  },

  direct: function direct(url) {
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

/* harmony default export */ var src_history = (History);
// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "parseTextPlaceholder", function() { return parseTextPlaceholder; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "arrayToTree", function() { return arrayToTree; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "chunk", function() { return chunk; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "batch", function() { return batch; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "type", function() { return util_type; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "deepAssign", function() { return deepAssign; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeParser", function() { return timeParser; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timer", function() { return timer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "noop", function() { return time_noop; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "cache", function() { return cache; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "cacheTable", function() { return cacheTable; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "cookie", function() { return cookie; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "listenPageVisibility", function() { return listenPageVisibility; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "loadFile", function() { return loadFile; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "getQuerys", function() { return getQuerys; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "addQuerys", function() { return addQuerys; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "querys", function() { return querys; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "http", function() { return src_http; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "History", function() { return src_history; });









/***/ })
/******/ ]);
});