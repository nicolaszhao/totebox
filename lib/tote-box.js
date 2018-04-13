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

// CONCATENATED MODULE: ./src/util.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
          Object.assign(target, _defineProperty({}, prop, util_type(source[prop]) === 'object' ? {} : []));
        }

        deepAssign(target[prop], source[prop]);
      } else {

        // 如果 target 是数组，会被 Object.assign 视为属性名为 0、1、2... 的对象
        // { [prop]: source[prop] } -> { 0: 'a' } 会覆盖 target 的 index 为 0 的值
        Object.assign(target, _defineProperty({}, prop, source[prop]));
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
    } catch (ex) {}
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
        return Promise.reject({
          message: parseTextPlaceholder(message, { url: url, message: json.message }),
          status: json.status,
          data: json.data
        });
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
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "type", function() { return util_type; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "deepAssign", function() { return deepAssign; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "parseTextPlaceholder", function() { return parseTextPlaceholder; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "timeParser", function() { return timeParser; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "cache", function() { return cache; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "cacheTable", function() { return cacheTable; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "listenPageVisibility", function() { return listenPageVisibility; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "http", function() { return src_http; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "History", function() { return src_history; });







/***/ })
/******/ ]);
});