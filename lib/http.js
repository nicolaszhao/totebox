(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("urijs"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "urijs"], factory);
	else if(typeof exports === 'object')
		exports["http"] = factory(require("lodash"), require("urijs"));
	else
		root["ToteBox"] = root["ToteBox"] || {}, root["ToteBox"]["http"] = factory(root["Lodash"], root["URI"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__3__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTextPlaceholder", function() { return parseTextPlaceholder; });
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

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




var message = '请求接口"{url}"时出错，错误信息：{message}';

var http = function http(url, options) {
  return fetch(url, options).then(function (res) {
    return res.json().then(function (json) {
      if (json.status === 0) {
        return json.data;
      } else {
        return Promise.reject({
          message: Object(_string__WEBPACK_IMPORTED_MODULE_2__["parseTextPlaceholder"])(message, { url: url, message: json.message }),
          status: json.status,
          data: json.data
        });
      }
    }, function (err) {
      throw new Error(Object(_string__WEBPACK_IMPORTED_MODULE_2__["parseTextPlaceholder"])(message, { url: url, message: err.message }));
    });
  }, function (err) {
    throw new Error(Object(_string__WEBPACK_IMPORTED_MODULE_2__["parseTextPlaceholder"])(message, { url: url, message: err.message }));
  });
};

var request = function request(url, options) {
  var timeout = void 0;

  if (options.timeout) {
    timeout = options.timeout;
    delete options.timeout;

    return Promise.race([http(url, options),

    // 根据options.timeout的值来判断超时处理，超时后直接reject
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        return reject(new Error(Object(_string__WEBPACK_IMPORTED_MODULE_2__["parseTextPlaceholder"])(message, { url: url, message: '请求超时' })));
      }, timeout);
    })]);
  }

  return http(url, options);
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
    url = Object(_string__WEBPACK_IMPORTED_MODULE_2__["parseTextPlaceholder"])(url, data, true);

    options = Object.assign({
      method: type.toUpperCase()
    }, http.defaults, options);

    if (type === 'get' || type === 'delete') {
      if (Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(data) && !Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isEmpty"])(data)) {
        url = new urijs__WEBPACK_IMPORTED_MODULE_0___default.a(url);
        url = url.query(data).href();
      }
    } else {
      options = Object.assign(options, {
        body: Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isPlainObject"])(data) && !Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isEmpty"])(data) ? JSON.stringify(data) : ''
      });
    }

    return request(url, options);
  };
});

// 可以设置通用的默认配置项来统一处理请求设置项
http.defaults = {};

/* harmony default export */ __webpack_exports__["default"] = (http);

/***/ })
/******/ ]);
});