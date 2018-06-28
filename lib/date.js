(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["date"] = factory();
	else
		root["ToteBox"] = root["ToteBox"] || {}, root["ToteBox"]["date"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLeapYear", function() { return isLeapYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseDate", function() { return parseDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
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

/***/ })

/******/ });
});