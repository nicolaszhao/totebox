(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else if(typeof exports === 'object')
		exports["string"] = factory(require("lodash"));
	else
		root["ToteBox"] = root["ToteBox"] || {}, root["ToteBox"]["string"] = factory(root["Lodash"]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTextPlaceholder", function() { return parseTextPlaceholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseNumberPlaceholder", function() { return parseNumberPlaceholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatSize", function() { return formatSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trim", function() { return trim; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);


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

  if (rPlaceholder.test(text) && Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isPlainObject"])(data) && !Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isEmpty"])(data)) {
    return text.replace(rPlaceholder, function (match, placeholder) {
      var val = data[placeholder];

      if (!Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(val)) {
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

var html = {
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

/***/ })
/******/ ]);
});