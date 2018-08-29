
/**
* NZ's utils
*
* Web: https://github.com/nicolaszhao/tote-box
*
* Licensed under
*   MIT License http://www.opensource.org/licenses/mit-license
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('urijs'), require('axios')) :
  typeof define === 'function' && define.amd ? define(['exports', 'urijs', 'axios'], factory) :
  (factory((global.ToteBox = {}),global.URI,global.axios));
}(this, (function (exports,URI,axios) { 'use strict';

  URI = URI && URI.hasOwnProperty('default') ? URI['default'] : URI;
  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

  /**
   * Checks if `value` is `undefined`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
   * @example
   *
   * _.isUndefined(void 0);
   * // => true
   *
   * _.isUndefined(null);
   * // => false
   */
  function isUndefined(value) {
    return value === undefined;
  }

  var isUndefined_1 = isUndefined;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = _overArg(Object.keys, Object);

  var _nativeKeys = nativeKeys;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto$1.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeys = baseKeys;

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$2.toString;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$1.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$3.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = _root['__core-js_shared__'];

  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$4 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$4.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }
    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */
  var DataView = _getNative(_root, 'DataView');

  var _DataView = DataView;

  /* Built-in method references that are verified to be native. */
  var Map = _getNative(_root, 'Map');

  var _Map = Map;

  /* Built-in method references that are verified to be native. */
  var Promise$1 = _getNative(_root, 'Promise');

  var _Promise = Promise$1;

  /* Built-in method references that are verified to be native. */
  var Set = _getNative(_root, 'Set');

  var _Set = Set;

  /* Built-in method references that are verified to be native. */
  var WeakMap = _getNative(_root, 'WeakMap');

  var _WeakMap = WeakMap;

  /** `Object#toString` result references. */
  var mapTag = '[object Map]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      setTag = '[object Set]',
      weakMapTag = '[object WeakMap]';

  var dataViewTag = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = _toSource(_DataView),
      mapCtorString = _toSource(_Map),
      promiseCtorString = _toSource(_Promise),
      setCtorString = _toSource(_Set),
      weakMapCtorString = _toSource(_WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = _baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag) ||
      (_Map && getTag(new _Map) != mapTag) ||
      (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
      (_Set && getTag(new _Set) != setTag) ||
      (_WeakMap && getTag(new _WeakMap) != weakMapTag)) {
    getTag = function(value) {
      var result = _baseGetTag(value),
          Ctor = result == objectTag ? value.constructor : undefined,
          ctorString = Ctor ? _toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag;
          case mapCtorString: return mapTag;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag;
          case weakMapCtorString: return weakMapTag;
        }
      }
      return result;
    };
  }

  var _getTag = getTag;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$3.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  var isArray_1 = isArray;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  var isLength_1 = isLength;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  var stubFalse_1 = stubFalse;

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
  });

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag$1 = '[object Map]',
      numberTag = '[object Number]',
      objectTag$1 = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag$1 = '[object Set]',
      stringTag = '[object String]',
      weakMapTag$1 = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag$1] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag$1] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag$1] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike_1(value) &&
      isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  module.exports = nodeUtil;
  });

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

  var isTypedArray_1 = isTypedArray;

  /** `Object#toString` result references. */
  var mapTag$2 = '[object Map]',
      setTag$2 = '[object Set]';

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

  /**
   * Checks if `value` is an empty object, collection, map, or set.
   *
   * Objects are considered empty if they have no own enumerable string keyed
   * properties.
   *
   * Array-like values such as `arguments` objects, arrays, buffers, strings, or
   * jQuery-like collections are considered empty if they have a `length` of `0`.
   * Similarly, maps and sets are considered empty if they have a `size` of `0`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty(null);
   * // => true
   *
   * _.isEmpty(true);
   * // => true
   *
   * _.isEmpty(1);
   * // => true
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({ 'a': 1 });
   * // => false
   */
  function isEmpty(value) {
    if (value == null) {
      return true;
    }
    if (isArrayLike_1(value) &&
        (isArray_1(value) || typeof value == 'string' || typeof value.splice == 'function' ||
          isBuffer_1(value) || isTypedArray_1(value) || isArguments_1(value))) {
      return !value.length;
    }
    var tag = _getTag(value);
    if (tag == mapTag$2 || tag == setTag$2) {
      return !value.size;
    }
    if (_isPrototype(value)) {
      return !_baseKeys(value).length;
    }
    for (var key in value) {
      if (hasOwnProperty$4.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  var isEmpty_1 = isEmpty;

  /** Built-in value references. */
  var getPrototype = _overArg(Object.getPrototypeOf, Object);

  var _getPrototype = getPrototype;

  /** `Object#toString` result references. */
  var objectTag$2 = '[object Object]';

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype,
      objectProto$7 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString$2.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$2) {
      return false;
    }
    var proto = _getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$5.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString$2.call(Ctor) == objectCtorString;
  }

  var isPlainObject_1 = isPlainObject;

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

    if (rPlaceholder.test(text) && isPlainObject_1(data) && !isEmpty_1(data)) {
      return text.replace(rPlaceholder, function (match, placeholder) {
        var val = data[placeholder];

        if (!isUndefined_1(val)) {
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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var merge = function merge(left, right) {
    var ret = [];
    var l = 0,
        r = 0;

    while (l < left.length && r < right.length) {
      if (left[l] < right[r]) {
        ret.push(left[l++]);
      } else {
        ret.push(right[r++]);
      }
    }

    return [].concat(ret, toConsumableArray(left.slice(l)), toConsumableArray(right.slice(r)));
  };

  // 排序算法 - 并归排序
  // 觉得挺有意思的，就拿来实现下
  function mergeSort(data) {
    var len = data.length;

    if (len === 1) {
      return data;
    }

    var mid = Math.floor(len / 2),
        left = data.slice(0, mid),
        right = data.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
  }

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
      list.push(_extends({}, data[i], defineProperty({}, children, [])));
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

    if ((type(target) === 'object' || type(target) === 'array') && (type(source) === 'object' || type(source) === 'array')) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(source)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (type(source[key]) === 'object' || type(source[key]) === 'array') {
            if (!target[key]) {
              Object.assign(target, defineProperty({}, key, type(source[key]) === 'object' ? {} : []));
            }

            deepAssign(target[key], source[key]);
          } else {

            // 如果 target 是数组，会被 Object.assign 视为属性名为 0、1、2... 的对象
            // { [prop]: source[prop] } -> { 0: 'a' } 会覆盖 target 的 index 为 0 的值
            Object.assign(target, defineProperty({}, key, source[key]));
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
    }

    return deepAssign.apply(undefined, [target].concat(sources));
  }

  // 返回介于 a 到 b 之间的一个随机数
  function random(a, b) {
    var val = b - a + 1;

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
        onStart = _ref$onStart === undefined ? noop$1 : _ref$onStart,
        _ref$onProgress = _ref.onProgress,
        onProgress = _ref$onProgress === undefined ? noop$1 : _ref$onProgress,
        _ref$onEnd = _ref.onEnd,
        onEnd = _ref$onEnd === undefined ? noop$1 : _ref$onEnd;

    var context = arguments[2];

    if (type(value) !== 'date' && type(value) !== 'number') {
      throw new Error('The value of params must be a Date or Number.');
    }

    var cdType = type(value) === 'date' ? 'date' : 'second';
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
              values = objectWithoutProperties(_getDateValues, ['dif']);

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
              values = objectWithoutProperties(_getDateValues2, ['dif']);

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

  function noop$1() {}

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

      if (type(table) !== 'object' || type(table[secondaryKey]) === 'undefined') {
        return null;
      }

      return table[secondaryKey];
    },


    // 如果原有数据和 value 都是普通对象，那么 value 将与原有数据合并
    // 否则 value 覆盖原有数据
    set: function set(primaryKey, secondaryKey, value) {
      var table = cache.get(primaryKey) || {},
          row = table[secondaryKey];

      if (row && type(row) === type(value) && isPlainObject_1(value)) {
        table[secondaryKey] = Object.assign({}, row, value);
      } else {
        table[secondaryKey] = value;
      }

      cache.set(primaryKey, table);
    },
    remove: function remove(primaryKey, secondaryKey) {
      var table = cache.get(primaryKey);

      if (type(table) !== 'object') {
        return;
      }

      delete table[secondaryKey];
      cache.set(primaryKey, table);
    },
    clear: function clear(primaryKey) {
      var table = cache.get(primaryKey);

      if (type(table) !== 'object') {
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

    eventTypes.forEach(function (type$$1) {
      window.addEventListener(type$$1, loadImage, false);
    });
  }

  function loadFile(type$$1, url, callback, context) {
    var el = void 0;

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

  var rUrl = /^([^?#]+)(\?[^#]+)?(#.+)?/;

  function getQuerys() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var rQueryValue = /^([^=]+)(?:=(.*))?$/;

    var _ref = rUrl.exec(url) || [],
        _ref2 = slicedToArray(_ref, 3),
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
        var _queryMatch = slicedToArray(queryMatch, 3),
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
        _rUrl$exec2 = slicedToArray(_rUrl$exec, 4),
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

  var message = '请求接口"{url}"时出错，错误信息：{message}';

  var request = function request(url, options) {
    var requestPromise = fetch(url, options).then(function (res) {
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

    var abort = void 0;

    var abortPromise = new Promise(function (resolve, reject) {
      abort = function abort() {
        reject(new Error(parseTextPlaceholder(message, { url: url, message: 'abort' })));
      };
    });

    var tasks = [requestPromise, abortPromise],
        timeout = options.timeout;


    var timeoutPromise = void 0;

    if (timeout) {
      delete options.timeout;
      timeoutPromise = new Promise(function (resolve, reject) {
        setTimeout(function () {
          return reject(new Error(parseTextPlaceholder(message, { url: url, message: '请求超时' })));
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
    request[type] = function (url, data, options) {
      url = parseTextPlaceholder(url, data, true);

      options = Object.assign({
        method: type.toUpperCase()
      }, request.defaults, options);

      if (type === 'get' || type === 'delete') {
        if (isPlainObject_1(data) && !isEmpty_1(data)) {
          url = new URI(url);
          url = url.query(data).href();
        }
      } else {
        options = Object.assign(options, {
          body: isPlainObject_1(data) && !isEmpty_1(data) ? JSON.stringify(data) : ''
        });
      }

      return request(url, options);
    };
  });

  // 可以设置通用的默认配置项来统一处理请求设置项
  request.defaults = {};

  function request$1() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        filterResponse = _ref.filterResponse,
        beautifyError = _ref.beautifyError;

    var inst = axios.create(config);

    return 'get delete head options post put patch'.split(' ').reduce(function (req, method) {
      req[method] = function (url, data, config) {
        var methodsWithBody = ['post put patch'];
        var xhr = null;

        if (methodsWithBody.includes(method)) {
          xhr = inst[method](url, data, config);
        } else {
          xhr = inst[method](url, _extends({
            params: data
          }, config));
        }

        return xhr.then(function (_ref2) {
          var data = _ref2.data;

          if (typeof filterResponse === 'function') {
            return filterResponse(data);
          }

          return data;
        }).catch(function (err) {
          if (typeof beautifyError === 'function') {
            Promise.reject(beautifyError(url, err));
          }

          Promise.reject(err);
        });
      };

      return req;
    }, {});
  }

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

  exports.fetchRequest = request;
  exports.axiosRequest = request$1;
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

  Object.defineProperty(exports, '__esModule', { value: true });

})));
