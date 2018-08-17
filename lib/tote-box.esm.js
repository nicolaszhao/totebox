exports["ToteBox"] =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.type = type;
exports.deepAssign = deepAssign;
exports.random = random;

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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = undefined;
exports.parseTextPlaceholder = parseTextPlaceholder;
exports.parseNumberPlaceholder = parseNumberPlaceholder;
exports.formatSize = formatSize;
exports.trim = trim;

var _lodash = __webpack_require__(0);

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

  if (rPlaceholder.test(text) && (0, _lodash.isPlainObject)(data) && !(0, _lodash.isEmpty)(data)) {
    return text.replace(rPlaceholder, function (match, placeholder) {
      var val = data[placeholder];

      if (!(0, _lodash.isUndefined)(val)) {
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
function parseNumberPlaceholder(text) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return text.replace(/\{(\d+)\}/g, function (m, i) {
    return params[i];
  });
}

function formatSize(bytes) {
  var i = -1;

  do {
    bytes = bytes / 1024;
    i++;
  } while (bytes >= 1024);

  return parseFloat(Math.max(bytes, 0.1).toFixed(2)) + ['KB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];
}

function trim(text) {
  return text.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

var html = exports.html = {
  entityify: function entityify(text) {
    var character = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;'
    };

    return text.replace(/[<>"&]/g, function (match) {
      return character[match];
    });
  },
  deentityify: function deentityify(text) {
    var entity = {
      quot: '"',
      lt: '<',
      gt: '>'
    };

    return text.replace(/&([^&;]+);/g, function (match, key) {
      var ret = entity[key];

      return typeof ret === 'string' ? ret : match;
    });
  },


  strip: function strip(text) {
    return text.replace(/<(?:.|\s)*?>/g, '');
  },

  escape: function escape(text) {
    if (typeof text !== 'string') {
      return '';
    }

    var rscript = /<script[^>]*>(?:(?:(?!<\/script>).)*<\/script>)?/gi,
        rstyle = /<style[^>]*>(?:(?!@import|<\/style>).)*@import(?:(?!<\/style>).)+<\/style>/gi,
        rlink = /<link(?:(?!\.css).)+\.css[^>]*>/gi,
        rinnerevent = /on[a-zA-Z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s\/>]+)/gi,
        rinnerexpress = /javascript:/gi;

    return text.replace(rscript, '').replace(rstyle, '').replace(rlink, '').replace(rinnerevent, '').replace(rinnerexpress, '');
  },


  filter: function filter(text, maxlength) {
    if (text === '') return '';

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _string = __webpack_require__(2);

Object.keys(_string).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _string[key];
    }
  });
});

var _array = __webpack_require__(4);

Object.keys(_array).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _array[key];
    }
  });
});

var _util = __webpack_require__(1);

Object.keys(_util).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _util[key];
    }
  });
});

var _date = __webpack_require__(5);

Object.keys(_date).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _date[key];
    }
  });
});

var _time = __webpack_require__(6);

Object.keys(_time).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _time[key];
    }
  });
});

var _ability = __webpack_require__(7);

Object.keys(_ability).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _ability[key];
    }
  });
});

var _query = __webpack_require__(8);

Object.keys(_query).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _query[key];
    }
  });
});

var _http = __webpack_require__(9);

Object.defineProperty(exports, 'http', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_http).default;
  }
});

var _jsonp = __webpack_require__(11);

Object.defineProperty(exports, 'jsonp', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_jsonp).default;
  }
});

var _history = __webpack_require__(12);

Object.defineProperty(exports, 'History', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_history).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.arrayToTree = arrayToTree;
exports.chunk = chunk;
exports.batch = batch;

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
function batch(data, process, context) {
  var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;

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

function noop() {}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLeapYear = isLeapYear;
exports.parseDate = parseDate;
exports.formatDate = formatDate;
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

  var year = -1,
      month = -1,
      day = -1,
      iValue = 0,
      date = new Date(),
      iFormat = void 0,
      extra = void 0;

  var lookAhead = function lookAhead(match) {
    var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;

    if (matches) {
      iFormat++;
    }

    return matches;
  },
      getNumber = function getNumber(match) {
    var isDoubled = lookAhead(match),
        size = match === 'y' && isDoubled ? 4 : 2,
        digits = new RegExp('^\\d{1,' + size + '}'),
        num = value.substring(iValue).match(digits);

    if (!num) {
      throw 'Missing number at position ' + iValue;
    }

    iValue += num[0].length;

    return parseInt(num[0], 10);
  },
      checkLiteral = function checkLiteral() {
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

  var output = '',
      iFormat = void 0,
      lookAhead = function lookAhead(match) {
    var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;

    if (matches) {
      iFormat++;
    }

    return matches;
  },
      formatNumber = function formatNumber(match, value, len) {
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
        output += lookAhead('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100;
        break;
      default:
        output += format.charAt(iFormat);
    }
  }

  return output;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeParser = timeParser;
exports.countdown = countdown;
exports.noop = noop;

var _util = __webpack_require__(1);

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

  if ((0, _util.type)(value) !== 'date' && (0, _util.type)(value) !== 'number') {
    throw new Error('The value of params must be a Date or Number.');
  }

  var cdType = (0, _util.type)(value) === 'date' ? 'date' : 'second';
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cookie = exports.cacheTable = exports.cache = undefined;
exports.listenPageVisibility = listenPageVisibility;
exports.isElementInViewport = isElementInViewport;
exports.lazyLoadImage = lazyLoadImage;
exports.loadFile = loadFile;

var _lodash = __webpack_require__(0);

var _util = __webpack_require__(1);

/**
 * 对 localStorage 的高级封装
 * 与 localStorage 不同的是，set 方法的 value 可以是任何类型的值，通过 get 方法返回之前存入的值，返回值根据存入的类型而定
 */
var cache = exports.cache = {
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
var cacheTable = exports.cacheTable = {
  get: function get(primaryKey, secondaryKey) {
    var table = cache.get(primaryKey);

    if ((0, _util.type)(table) !== 'object' || (0, _util.type)(table[secondaryKey]) === 'undefined') {
      return null;
    }

    return table[secondaryKey];
  },


  // 如果原有数据和 value 都是普通对象，那么 value 将与原有数据合并
  // 否则 value 覆盖原有数据
  set: function set(primaryKey, secondaryKey, value) {
    var table = cache.get(primaryKey) || {},
        row = table[secondaryKey];

    if (row && (0, _util.type)(row) === (0, _util.type)(value) && (0, _lodash.isPlainObject)(value)) {
      table[secondaryKey] = Object.assign({}, row, value);
    } else {
      table[secondaryKey] = value;
    }

    cache.set(primaryKey, table);
  },
  remove: function remove(primaryKey, secondaryKey) {
    var table = cache.get(primaryKey);

    if ((0, _util.type)(table) !== 'object') {
      return;
    }

    delete table[secondaryKey];
    cache.set(primaryKey, table);
  },
  clear: function clear(primaryKey) {
    var table = cache.get(primaryKey);

    if ((0, _util.type)(table) !== 'object') {
      return;
    }

    cache.set(primaryKey, null);
  }
};

var cookie = exports.cookie = {
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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getQuerys = getQuerys;
exports.addQuerys = addQuerys;
exports.querys = querys;
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
  } else if ((typeof url === 'undefined' ? 'undefined' : _typeof(url)) === 'object') {
    var _ref3 = [window.location.href, url];
    url = _ref3[0];
    params = _ref3[1];
  }

  if (!params) {
    return getQuerys(url);
  }

  return addQuerys(url, params);
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _urijs = __webpack_require__(10);

var _urijs2 = _interopRequireDefault(_urijs);

var _lodash = __webpack_require__(0);

var _string = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var message = '请求接口"{url}"时出错，错误信息：{message}';

var http = function http(url, options) {
  var requestPromise = fetch(url, options).then(function (res) {
    return res.json().then(function (json) {
      if (json.status === 0) {
        return json.data;
      } else {
        return Promise.reject(json);
      }
    }, function (err) {
      throw new Error((0, _string.parseTextPlaceholder)(message, { url: url, message: err.message }));
    });
  }, function (err) {
    throw new Error((0, _string.parseTextPlaceholder)(message, { url: url, message: err.message }));
  });

  var abort = void 0;

  var abortPromise = new Promise(function (resolve, reject) {
    abort = function abort() {
      reject(new Error((0, _string.parseTextPlaceholder)(message, { url: url, message: 'abort' })));
    };
  });

  var tasks = [requestPromise, abortPromise],
      timeout = options.timeout;


  var timeoutPromise = void 0;

  if (timeout) {
    delete options.timeout;
    timeoutPromise = new Promise(function (resolve, reject) {
      setTimeout(function () {
        return reject(new Error((0, _string.parseTextPlaceholder)(message, { url: url, message: '请求超时' })));
      }, timeout);
    });

    tasks.push(timeoutPromise);
  }

  var p = Promise.race(tasks);

  p.abort = abort;

  return p;
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
  http[type] = function (url, data, options) {
    url = (0, _string.parseTextPlaceholder)(url, data, true);

    options = Object.assign({
      method: type.toUpperCase()
    }, http.defaults, options);

    if (type === 'get' || type === 'delete') {
      if ((0, _lodash.isPlainObject)(data) && !(0, _lodash.isEmpty)(data)) {
        url = new _urijs2.default(url);
        url = url.query(data).href();
      }
    } else {
      options = Object.assign(options, {
        body: (0, _lodash.isPlainObject)(data) && !(0, _lodash.isEmpty)(data) ? JSON.stringify(data) : ''
      });
    }

    return http(url, options);
  };
});

// 可以设置通用的默认配置项来统一处理请求设置项
http.defaults = {};

exports.default = http;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("urijs");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = jsonp;
/*
 * url: string
 * settings: object
 *   jsonpCallback: string
 *   timeout: number
 *   done: function
 *   fail: function
 */
function jsonp(url, settings) {
  var script = document.createElement('script');
  var obj = void 0,
      props = void 0,
      jsonpCallback = void 0,
      response = void 0,
      i = void 0,
      timer = void 0;

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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = History;

/***/ })
/******/ ]);