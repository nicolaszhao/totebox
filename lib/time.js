(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["time"] = factory();
	else
		root["ToteBox"] = root["ToteBox"] || {}, root["ToteBox"]["time"] = factory();
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeParser", function() { return timeParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "countdown", function() { return countdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



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
function countdown(value) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$onStart = _ref.onStart,
      onStart = _ref$onStart === undefined ? noop : _ref$onStart,
      _ref$onProgress = _ref.onProgress,
      onProgress = _ref$onProgress === undefined ? noop : _ref$onProgress,
      _ref$onEnd = _ref.onEnd,
      onEnd = _ref$onEnd === undefined ? noop : _ref$onEnd;

  var context = arguments[2];

  if (Object(_util__WEBPACK_IMPORTED_MODULE_0__["type"])(value) !== 'date' && Object(_util__WEBPACK_IMPORTED_MODULE_0__["type"])(value) !== 'number') {
    throw new Error('The value of params must be a Date or Number.');
  }

  var cdType = Object(_util__WEBPACK_IMPORTED_MODULE_0__["type"])(value) === 'date' ? 'date' : 'second';
  var last = value;
  var timerId = void 0;

  var getDateValues = function getDateValues(value) {
    var dif = value - Date.now();
    var hours = void 0,
        minutes = void 0,
        second = void 0;

    hours = minutes = second = 0;

    if (dif > 0) {
      hours = Math.floor(dif / (1000 * 60 * 60));
      minutes = Math.floor(dif / (1000 * 60)) - hours * 60;
      second = Math.floor(dif / 1000) - hours * 60 * 60 - minutes * 60;
    }

    return { dif: dif, hours: hours, minutes: minutes, second: second };
  };

  var tick = function tick() {
    timerId = setTimeout(function () {
      if (cdType === 'date') {
        var _getDateValues = getDateValues(last),
            dif = _getDateValues.dif,
            values = _objectWithoutProperties(_getDateValues, ['dif']);

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
    start: function start() {
      if (cdType === 'date') {
        var _getDateValues2 = getDateValues(last),
            dif = _getDateValues2.dif,
            values = _objectWithoutProperties(_getDateValues2, ['dif']);

        value = values;
      }

      onStart.bind(context)(value);
      tick();
    },
    stop: function stop(callback) {
      clearTimeout(timerId);
      callback && callback.bind(context)(value);
    }
  };
}

function noop() {}

/***/ })

/******/ });
});