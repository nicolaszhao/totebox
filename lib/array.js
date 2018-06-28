(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["array"] = factory();
	else
		root["ToteBox"] = root["ToteBox"] || {}, root["ToteBox"]["array"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayToTree", function() { return arrayToTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chunk", function() { return chunk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "batch", function() { return batch; });
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

/***/ })

/******/ });
});