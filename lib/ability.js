(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else if(typeof exports === 'object')
		exports["ability"] = factory(require("lodash"));
	else
		root["ToteBox"] = root["ToteBox"] || {}, root["ToteBox"]["ability"] = factory(root["Lodash"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepAssign", function() { return deepAssign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function type(obj) {
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

      if (type(source[prop]) === 'object' || type(source[prop]) === 'array') {
        if (!target[prop]) {
          Object.assign(target, _defineProperty({}, prop, type(source[prop]) === 'object' ? {} : []));
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

// 返回介于 a 到 b 之间的一个随机数
function random(a, b) {
  var val = b - a + 1;

  return Math.floor(Math.random() * val + a);
}

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cache", function() { return cache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cacheTable", function() { return cacheTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cookie", function() { return cookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listenPageVisibility", function() { return listenPageVisibility; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementInViewport", function() { return isElementInViewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lazyLoadImage", function() { return lazyLoadImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadFile", function() { return loadFile; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);



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

    if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["type"])(table) !== 'object' || Object(_util__WEBPACK_IMPORTED_MODULE_1__["type"])(table[secondaryKey]) === 'undefined') {
      return null;
    }

    return table[secondaryKey];
  },


  // 如果原有数据和 value 都是普通对象，那么 value 将与原有数据合并
  // 否则 value 覆盖原有数据
  set: function set(primaryKey, secondaryKey, value) {
    var table = cache.get(primaryKey) || {},
        row = table[secondaryKey];

    if (row && Object(_util__WEBPACK_IMPORTED_MODULE_1__["type"])(row) === Object(_util__WEBPACK_IMPORTED_MODULE_1__["type"])(value) && Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(value)) {
      table[secondaryKey] = Object.assign({}, row, value);
    } else {
      table[secondaryKey] = value;
    }

    cache.set(primaryKey, table);
  },
  remove: function remove(primaryKey, secondaryKey) {
    var table = cache.get(primaryKey);

    if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["type"])(table) !== 'object') {
      return;
    }

    delete table[secondaryKey];
    cache.set(primaryKey, table);
  },
  clear: function clear(primaryKey) {
    var table = cache.get(primaryKey);

    if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["type"])(table) !== 'object') {
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

// source: http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

// TODO: 还未经过测试
function lazyLoadImage() {
  var dataSrcAttr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data-src';
  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  var eventTypes = 'DOMContentLoaded load resize scroll'.split(' '),
      images = container.querySelectorAll('img[' + dataSrcAttr + ']');

  if (!images.length) {
    return;
  }

  var loadImage = function loadImage() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var image = _step.value;

        var src = void 0;

        if (isElementInViewport(image) && (src = image.getAttribute(dataSrcAttr))) {
          image.setAttribute('src', src);
          image.removeAttribute(dataSrcAttr);
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
  };

  eventTypes.forEach(function (type) {
    window.addEventListener(type, loadImage, false);
  });
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

/***/ })

/******/ });
});