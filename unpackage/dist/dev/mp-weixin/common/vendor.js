(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// import navigateTo from 'uni-helpers/navigate-to'

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"想玩商家端","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!********************************************!*\
  !*** F:/Project/想玩/想玩商家端/common/router.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _uniSimpleRouter = _interopRequireDefault(__webpack_require__(/*! uni-simple-router */ 12));
var _store = _interopRequireDefault(__webpack_require__(/*! @/common/store */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_uniSimpleRouter.default);
//初始化
var router = new _uniSimpleRouter.default({
  APP: {
    animation: {
      animationType: 'pop-in',
      animationDuration: 300 } },


  encodeURI: true,
  routes: [{"path":"/pages/home/home","name":"home"},{"path":"/pages/login/login","name":"login"},{"path":"/pages/login/code","name":"code"},{"path":"/pages/login/enter","name":"enter"},{"path":"/pages/active/active","name":"active"},{"path":"/pages/active/detail","name":"active_detail"},{"path":"/pages/active/create","name":"active_create"},{"path":"/pages/active/vote","name":"active_vote"},{"path":"/pages/msg/msg","name":"msg"},{"path":"/pages/msg/chat","name":"msg_chat"},{"path":"/pages/store/store","name":"store"},{"path":"/pages/store/edit","name":"store_edit"},{"path":"/pages/store/tgw","name":"store_tgw"},{"path":"/pages/promote/promote","name":"promote"},{"path":"/pages/promote/create_goods","name":"promote_create_goods"},{"path":"/pages/promote/create_flow","name":"promote_create_flow"},{"path":"/pages/promote/merch","name":"promote_merch"},{"path":"/pages/promote/history","name":"promote_history"},{"path":"/pages/promote/history_detail","name":"promote_history_detail"},{"path":"/pages/discounts/discounts","name":"discounts"},{"path":"/pages/discounts/create_goods","name":"create_goods"},{"path":"/pages/discounts/cooperation","name":"cooperation_goods"},{"path":"/pages/discounts/select_product","name":"select_product"},{"path":"/pages/discounts/create_product","name":"create_product"},{"path":"/pages/discounts/create_platform","name":"create_platform"},{"path":"/pages/discounts/goods_detail","name":"goods_detail"},{"path":"/pages/discounts/platform_detail","name":"platform_detail"},{"path":"/pages/discounts/product_detail","name":"product_detail"},{"path":"/pages/discounts/cooperation_detail","name":"cooperation_detail"},{"path":"/pages/member/member","name":"member"},{"path":"/pages/user/user","name":"user"},{"path":"/pages/user/wallet","name":"user_wallet"},{"path":"/pages/user/withdrawal","name":"user_withdraw"},{"path":"/pages/user/withdrawal_list","name":"user_withdrawal_list"},{"path":"/pages/order/order","meta":{"auth":true}}] //路由表
});

//全局路由前置守卫
router.beforeEach(function (to, from, next) {
  // console.log('前置守卫Yoooooooooo')
  console.log('to', to);
  console.log('----willGo----', to.path);

  // 有两个个判断条件,一个是token,还有一个路由元信息
  var tokenFlag = _store.default.getters.loginFlag;
  if (to.path != '/pages/login/login') {
    uni.setStorageSync('fromLogin', { path: to.path, query: to.query });
  }

  if (to.meta && to.meta.auth && !tokenFlag) {
    console.log('我要登录');
    next('/pages/login/login');
  } else {
    console.log('正常跳转页面');
    next();
  }

});

// 全局路由后置守卫
router.afterEach(function (to, from) {

});var _default =

router;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!*******************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.RouterMount = exports.default = void 0;var _util = __webpack_require__(/*! ./helpers/util */ 13);
var _navJump = _interopRequireDefault(__webpack_require__(/*! ./helpers/navJump */ 17));
var _util2 = __webpack_require__(/*! ./vueRouter/util */ 29);
var _util3 = __webpack_require__(/*! ./appRouter/util */ 22);
var _util4 = __webpack_require__(/*! ./appletsRouter/util */ 25);
var _config = __webpack_require__(/*! ./helpers/config */ 14);
var _warn = __webpack_require__(/*! ./helpers/warn */ 16);
var _hooks = __webpack_require__(/*! ./lifeCycle/hooks */ 33);
var _base = __webpack_require__(/*! ./vueRouter/base */ 15);
var _appletsPatch = _interopRequireDefault(__webpack_require__(/*! ./patch/applets-patch */ 34));
var _appPatch = _interopRequireDefault(__webpack_require__(/*! ./patch/app-patch */ 35));
var _mixins = _interopRequireDefault(__webpack_require__(/*! ./helpers/mixins */ 36));
var _urlQuery = _interopRequireDefault(__webpack_require__(/*! ./helpers/urlQuery */ 40));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}




var H5PATCH = null;




var parseQuery = new _urlQuery.default();

_config.Global.H5RouterReady = new Promise(function (resolve) {return _config.Global.RouterReadyPromise = resolve;});var

Router = /*#__PURE__*/function () {
  function Router(arg) {_classCallCheck(this, Router);
    Router.$root = this;
    _config.Global.Router = this; // 全局缓存一个对象，不必使用时都传递
    _config.Global.$parseQuery = parseQuery;
    this.CONFIG = (0, _util.formatConfig)(arg);
    this.lifeCycle = _config.lifeCycle;
    _hooks.registerRouterHooks.call(this); // 注册全局Router生命钩子
    if ((0, _util.appPlatform)() === 'H5') {
      H5PATCH.setLoadingStatus(this.CONFIG.h5);
    }
  }_createClass(Router, [{ key: "push",




























    /** 动态的导航到一个新 URL 保留浏览历史
                                        * navigateTo
                                        * @param {Object} rule
                                        */value: function push(
    rule) {
      _navJump.default.call(this, rule, 'push');
    }

    /** 动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
      * redirectTo
      * @param {Object} rule
      */ }, { key: "replace", value: function replace(
    rule) {
      _navJump.default.call(this, rule, 'replace');
    }

    /** 动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
      * 	reLaunch
      * @param {Object} rule
      */ }, { key: "replaceAll", value: function replaceAll(
    rule) {
      _navJump.default.call(this, rule, 'replaceAll');
    }

    /** 动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
      * @param {Object} rule
      */ }, { key: "pushTab", value: function pushTab(
    rule) {
      _navJump.default.call(this, rule, 'pushTab');
    }

    /**
      * 返回到指定层级页面上
       * @param {Number} backLayer 需要返回的页面层级 默认 1
       * @param {Object} delta 暂时无用
       * @param {enforce} 是否强制越过跳转加锁检查 默认 false
      */ }, { key: "back", value: function back()
    {var backLayer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;var delta = arguments.length > 1 ? arguments[1] : undefined;var enforce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (backLayer.constructor != Number) {
        return (0, _warn.err)("\u8FD4\u56DE\u5C42\u7EA7\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2ANumber\u7C7B\u578B\u4E14\u5FC5\u987B\u5927\u4E8E1\uFF1A".concat(
        backLayer));

      }
      _navJump.default.call(this, {
        backLayer: backLayer, delta: delta, H5PATCH: H5PATCH },
      'back', true, enforce);
    }

    /**
      * 获取当前页面下的 Route 信息
      *
      * @param {Object} Vim 当前开发者可以传递一个 vue 组件对象 来获取当前下的 Route 信息
      */ }, { key: "getPageRoute", value: function getPageRoute(
    Vim) {
      var pages = getCurrentPages();
      switch ((0, _util.appPlatform)(true)) {
        case 'H5':
          return _util2.H5GetPageRoute.call(this, pages, Vim);
        case 'APP':
          return (0, _util3.APPGetPageRoute)(pages, Vim);
        case 'APPLETS':
          return (0, _util4.AppletsPageRoute)(pages, Vim);
        default:
          break;}

    } }, { key: "beforeEach", value: function beforeEach(

    fn) {
      return (0, _hooks.registerHook)(this.lifeCycle.beforeHooks, fn);
    } }, { key: "afterEach", value: function afterEach(

    fn) {
      return (0, _hooks.registerHook)(this.lifeCycle.afterHooks, fn);
    } }, { key: "$Route", get: function get() {return this.getPageRoute();} /**
                                                                             * 获取 url 参数帮助类实例
                                                                             */ }, { key: "$parseQuery", get: function get() {return _config.Global.$parseQuery;} /**
                                                                                                                                                                   * 获取当前是否处于正在跳转的状态
                                                                                                                                                                   * H5 状态下始终为false
                                                                                                                                                                   */ }, { key: "$lockStatus", get: function get() {return _config.Global.LockStatus;} /**
                                                                                                                                                                                                                                                        * 动态设置拦截状态
                                                                                                                                                                                                                                                        */, set: function set(status) {(0, _warn.warn)('你确定要这么做？你知道后果？', true);_config.Global.LockStatus = status;} }]);return Router;}();Router.install = function (Vue) {(0, _mixins.default)(Vue, Router);Object.defineProperty(Vue.prototype, '$Router', { get: function get() {return Router.$root;
    } });

  Object.defineProperty(Vue.prototype, '$Route', {
    get: function get() {
      return Router.$root.getPageRoute(this);
    } });

};var _default =
Router;
/**
         *
         * @param {VueComponent } Vim vue实例对象
         * @param {dom} el	dom节点选择器
         */exports.default = _default;
var RouterMount = function RouterMount(Vim, el) {
  switch ((0, _util.appPlatform)(true)) {
    case 'APP':
      (0, _appPatch.default)(Vim, el);
      break;
    case 'APPLETS':
      (0, _appletsPatch.default)(Vim, el);
      break;
    case 'H5':
      _base.vueMount.push({ Vim: Vim, el: el });
      break;
    default:
      (0, _warn.warn)('糟糕！！！还有其他的执行环境？？？没听说过啊。一脸懵逼？？？加QQ群问问：769241495');
      break;}

};exports.RouterMount = RouterMount;

/***/ }),

/***/ 13:
/*!**************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/helpers/util.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.copyObject = exports.formatURLQuery = exports.resolveRule = exports.exactRule = exports.parseQuery = exports.parseQueryD = exports.parseQueryN = exports.filter = exports.formatConfig = exports.noop = exports.appPlatform = exports.isObject = exports.isH5 = void 0;var _config = __webpack_require__(/*! ./config */ 14);
var _base = __webpack_require__(/*! ../vueRouter/base */ 15);
var _warn = __webpack_require__(/*! ./warn */ 16);function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 当前是不是H5运行环境
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */
var isH5 = function isH5() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};
/**
    * 判断当前变量是否为Object
    * @param {Object} strObj
    */exports.isH5 = isH5;
var isObject = function isObject(strObj) {
  return strObj.toString() === '[object Object]' && strObj.constructor === Object;
};
/**
    * 获取当前运行平台
    * @param {Boolean} applets 默认false  true时所有小程序平台统一返回 APPLETS
    */exports.isObject = isObject;
var appPlatform = function appPlatform() {var applets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var platform = '';


























  platform = 'WEIXIN';






  if (applets) {

    platform = 'APPLETS';

  }

  return platform;
};
/**
    * 定义一个空方法 如果最后一个参数为true则打印所有参数
    * @param  {...any} args
    */exports.appPlatform = appPlatform;
var noop = function noop() {for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
  if (args[args.length - 1] === true) {
    (0, _warn.log)(args);
  }
};
/**
    * 格式化基础配置信息 通过new Router传递过来的参数
    */exports.noop = noop;
var formatConfig = function formatConfig(userConfig) {
  if (!userConfig.routes || userConfig.routes.constructor !== Array) {
    return (0, _warn.err)("\u8DEF\u7531\u53C2\u6570 'routes' \u5FC5\u987B\u4F20\u9012 \r\n\r\n".concat(JSON.stringify(userConfig)));
  }
  if (userConfig.h5 != null && userConfig.h5.constructor !== Object) {
    return (0, _warn.err)("h5\u53C2\u6570\u4F20\u9012\u9519\u8BEF\uFF0C\u5E94\u8BE5\u662F\u4E00\u4E2A 'Object' \u7C7B\u578B \u793A\u4F8B\uFF1A\r\n\r\n".concat(JSON.stringify(_config.baseConfig.h5)));
  }
  var config = Object.create(null);
  var baseConfigKeys = Object.keys(_config.baseConfig);
  for (var i = 0; i < baseConfigKeys.length; i += 1) {
    var key = baseConfigKeys[i];
    if (userConfig[key] != null) {
      if (userConfig[key].constructor === Object) {
        config[key] = _objectSpread(_objectSpread({},
        _config.baseConfig[key]),
        userConfig[key]);

      } else if (key == 'routes') {// 需要加入已知的白名单
        config[key] = [].concat(_toConsumableArray(_config.baseConfig[key]), _toConsumableArray(userConfig[key]), _toConsumableArray(_base.builtIn));
      } else {
        config[key] = userConfig[key];
      }
    } else {
      config[key] = _config.baseConfig[key];
    }
  }
  return config;
};exports.formatConfig = formatConfig;
var filter = function filter(str) {
  str += '';
  str = str.replace(/%/g, '%25');
  str = str.replace(/\+/g, '%2B');
  str = str.replace(/ /g, '%20');
  str = str.replace(/\//g, '%2F');
  str = str.replace(/\?/g, '%3F');
  str = str.replace(/&/g, '%26');
  str = str.replace(/=/g, '%3D');
  str = str.replace(/#/g, '%23');
  return str;
};
/**
    * 使用encodeURI:true的情况	需要进行编码后再传递，解码等等 可以传递深度对象并会在路径后面加入一个query=
    *
    * @param {String} routerName //路径名称
    * @param {JSON} query 	//需要格式化参数
    * @param {Boolean} Encode 	//是获取还是编码后传递
    */exports.filter = filter;
var parseQueryN = function parseQueryN(routerName, query, Encode) {
  if (Encode) {
    return {
      url: routerName,
      query: JSON.parse(decodeURIComponent(query.replace(/^query=/, ''))) };

  }
  return {
    url: routerName,
    query: "query=".concat(encodeURIComponent(JSON.stringify(query))) };

};
/**
    * 使用encodeURI:false的情况 直接格式化为普通的queryURl参数形式传递即可 扁平深度对象
    *
    * @param {String} routerName //路径名称
    * @param {JSON} query 	//需要格式化参数
    * @param {Boolean} Encode 	//是获取还是编码后传递
    */exports.parseQueryN = parseQueryN;
var parseQueryD = function parseQueryD(routerName, query, Encode) {
  if (Encode) {
    var obj = {};
    var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
    while (reg.exec(query)) {
      obj[RegExp.$1] = RegExp.$2;
    }
    return {
      url: routerName,
      query: obj };

  }
  var encodeArr = [];
  var queryKeys = Object.keys(query);
  for (var i = 0; i < queryKeys.length; i += 1) {
    var attr = queryKeys[i];
    var encodeStr = '';
    if (query[attr].constructor == Object) {
      encodeStr = parseQueryD(routerName, query[attr], Encode).query;
      encodeArr.push(encodeStr);
    } else {
      encodeStr = filter(query[attr]);
      encodeArr.push("".concat(attr, "=").concat(encodeStr));
    }
  }
  return {
    url: routerName,
    query: encodeArr.join('&') };

};
/**
    * @param {String} routerName //路径名称
    * @param {JSON} query 	//需要格式化参数
    * @param {Boolean} Encode 	//是获取还是编码后传递
    */exports.parseQueryD = parseQueryD;
var parseQuery = function parseQuery(routerName, query) {var Encode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (_config.Global.Router.CONFIG.encodeURI) {
    return parseQueryN(routerName, query, Encode);
  }
  return parseQueryD(routerName, query, Encode);
};exports.parseQuery = parseQuery;

var exactRule = function exactRule(cloneRule, routes, ruleKey) {var getRule = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var params = {};
  var i = 0;
  // eslint-disable-next-line
  while (true) {
    var item = routes[i];
    if (item == null) {
      if (!getRule) {
        (0, _warn.err)("\u8DEF\u7531\u8868\u4E2D\u672A\u67E5\u627E\u5230 '".concat(ruleKey, "' \u4E3A '").concat(cloneRule[ruleKey], "'"));
      }
      return {
        path: '',
        name: '' };

    }
    if (item[ruleKey] != null && item[ruleKey] === cloneRule[ruleKey]) {
      if (!getRule) {
        params.url = item.path;
        params.rule = item;
        if (isH5()) {// 如果是h5 则使用优先使用自定义路径名称
          params.url = item.aliasPath || item.path;
        }
        return params;
      }
      return item;
    }
    i += 1;
  }
};exports.exactRule = exactRule;

var resolveRule = function resolveRule(router, rule) {var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var ruleKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'path';
  var ruleInfo = (0, _config.route)(
  exactRule(_objectSpread({},
  rule),

  router.CONFIG.routes,
  ruleKey,
  router));

  return _objectSpread(_objectSpread({},
  ruleInfo), {}, {
    query: query });

};
/**
    * 把一些不必要的参数进行格式化掉，完成url的美观
    * @param {String} URLQuery URL中传递的参数
    */exports.resolveRule = resolveRule;
var formatURLQuery = function formatURLQuery(URLQuery) {
  switch (URLQuery.trim()) {
    case 'query=%7B%7D':
    case '%7B%7D':
    case '?query=%7B%7D':
    case '?':
    case '?[object Object]':
    case '?query={}':
      URLQuery = '';
      break;
    default:
      (0, _warn.warn)('url已经很完美啦，不需要格式化！');
      break;}

  return URLQuery;
};
/**
    * 拷贝对象
    * @param {Object} object
    */exports.formatURLQuery = formatURLQuery;
var copyObject = function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
};exports.copyObject = copyObject;

/***/ }),

/***/ 14:
/*!****************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/helpers/config.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.route = exports.appletsConfig = exports.uniAppHook = exports.Global = exports.lifeCycle = exports.H5FnTypeToggle = exports.methods = exports.baseConfig = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var baseConfig = {
  h5: {
    rewriteFun: true, // 是否对uni-app reLaunch/navigateBack 两个方法重写 处理uni刷新直接返回到首页和触发路由守卫
    paramsToQuery: false, // h5端上通过params传参时规则是vue-router 刷新会丢失 开启此开关将变成?连接的方式
    loading: true, // 是否显示加载动画
    hinderTab: false, // 是否拦截uni-app自带底部菜单   TODO
    vueRouterDev: false, // 完全使用采用vue-router的开发模式
    useUniConfig: true, // 是否采用在pages.json下的所有页面配置信息,false时需开发者自行设置页面
    keepUniIntercept: false, // 保留uni-app使用vue-router的拦截器
    vueNext: false, // 在next管道函数中是否获取vueRouter next的原本参数
    replaceStyle: false, // 是否对resetStyle函数中返回的style节点进行全部替换，否则为追加
    resetStyle: function resetStyle() {return JSON.parse('{}');}, // 自定义加载样式函数 可返回一个包涵 html、style、script 的对象来重置Router内置的加载动画
    mode: 'hash',
    base: '/',
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    scrollBehavior: function scrollBehavior(to, from, savedPostion) {return savedPostion;},
    fallback: true },

  APP: {
    holdTabbar: true, // 是否开启底部菜单拦截
    loddingPageStyle: function loddingPageStyle() {return JSON.parse('{"backgroundColor":"#FFF"}');}, // 当前等待页面的样式 必须返回一个json
    loddingPageHook: function loddingPageHook(view) {plus.navigator.closeSplashscreen();view.show();}, // 刚刚打开页面处于等待状态,会触发此事件
    animation: { animationType: 'pop-in', animationDuration: 300 }, // 页面切换动画
    switchPageOutTime: 1000 // 最高能忍耐的页面切换时间 达到此时间 不管切换有没有完成都会显示页面出来 这对启动页帮助很大
  },
  debugger: false, // 是否处于开发阶段 设置为true则打印日志
  encodeURI: true, // 是否对url传递的参数进行编码
  routerBeforeEach: function routerBeforeEach() {}, // router 前置路由函数 每次触发跳转前先会触发此函数
  routerAfterEach: function routerAfterEach() {}, // router 后置路由函数 每次触发跳转后会触发此函数
  routes: [] };exports.baseConfig = baseConfig;


var methods = {
  push: 'navigateTo',
  replace: 'redirectTo',
  replaceAll: 'reLaunch',
  pushTab: 'switchTab',
  back: 'navigateBack' };exports.methods = methods;


var H5FnTypeToggle = {
  push: 'push',
  replace: 'replace',
  replaceAll: 'replace',
  pushTab: 'replace' };exports.H5FnTypeToggle = H5FnTypeToggle;


var lifeCycle = {
  beforeHooks: [],
  afterHooks: [],
  routerHooks: [],
  routerbeforeHooks: [], // 内部跳转前生命周期
  routerAfterHooks: [] // 内部跳转后生命周期
};exports.lifeCycle = lifeCycle;

var Global = { // 缓存一些必要的对象，作为全局可以访问的参数
  $parseQuery: null, // url query 帮助类实例
  Router: {},
  vueRouter: {},
  addedRoutes: [], // 用于缓存用户动态添加的路由
  RouterReadyPromise: function RouterReadyPromise() {},
  H5RouterReady: null, // 当前router是否就绪
  backLayerC: 1, // 返回api调用时开发者传递的 delta
  LockStatus: false // 当前是否正在进行跳转 正在跳转调用api是不给跳转的
};exports.Global = Global;

var uniAppHook = {
  indexVue: {}, // 首页 组件对象
  toutiaoIndexThis: {}, // 头条小程序Index this对象
  appVue: {}, // 同getApp()获取到的对象一毛一样的  其实就是app.vue组件
  onLaunch: { fun: [], args: {}, isHijack: false }, // 这两个是app.vue
  onShow: { fun: [], args: {}, isHijack: false },
  variationFuns: ['onReady', 'onUnload'], // 一些uni-app的变异方法 需要处理下
  waitHooks: {}, // 首页等待中的生命钩子 一些需要等待的Hooks,就是在页面没有进来之前一些提前触发的生命钩子 主要是用户已经声明好的
  indexCallHooks: ['onLoad', 'onReady', 'created', 'onShow'], // 在首页首次启动时需要触发的生命周期
  needHooks: ['onLoad', 'onReady', 'onShow', 'created', 'onHide', 'onUnload', 'onResize'], // 首页需要拦截的生命钩子
  pageReady: false,
  onLaunched: false // 否触发onLaunch事件
};exports.uniAppHook = uniAppHook;

var appletsConfig = { // 小程序端的一些路由所需配置
  onLaunchEd: false // 当前小程序端是否触发onLaunch事件
};exports.appletsConfig = appletsConfig;

var route = function route() {var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread(_objectSpread({},
  object), {}, {
    params: {},
    query: {} });

};exports.route = route;

/***/ }),

/***/ 15:
/*!****************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/vueRouter/base.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.vueMount = exports.vuelifeHooks = exports.builtIn = void 0;var builtIn = [{
  path: '/preview-image',
  name: 'previewImage',
  component: {
    render: function render() {} } },

{
  path: '/choose-location',
  name: 'chooseLocation',
  component: {
    render: function render() {} } },

{
  path: '/open-location',
  name: 'openLocation',
  component: {
    render: function render() {} } }];

// uni-app内置路由
exports.builtIn = builtIn;var vuelifeHooks = { // vueRouter的原始生命周期
  beforeHooks: [],
  afterHooks: [] };exports.vuelifeHooks = vuelifeHooks;

var vueMount = []; // 使用内部对象保留实例化下的appVue,并使用Router进行挂载触发第一次路由钩子
exports.vueMount = vueMount;

/***/ }),

/***/ 16:
/*!**************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/helpers/warn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.warnLock = exports.log = exports.warn = exports.err = void 0;var _config = __webpack_require__(/*! ./config */ 14);


var isLog = function isLog(type, errText, enforce) {
  if (!enforce) {
    var dev = _config.Global.Router.CONFIG.debugger;
    var isObject = dev.toString() === '[object Object]';
    if (dev === false) {
      return false;
    }if (dev === false) {
      return false;
    }if (isObject) {
      if (dev[type] === false) {
        return false;
      }
    }
  }
  /* eslint no-console:"off" */
  console[type](errText);
};
var err = function err(errInfo) {var enforce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isLog('error', errInfo, enforce);
};exports.err = err;

var warn = function warn(errInfo) {var enforce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isLog('warn', errInfo, enforce);
};exports.warn = warn;

var log = function log(errInfo) {var enforce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isLog('log', errInfo, enforce);
};exports.log = log;
var warnLock = function warnLock(errInfo) {
  console.warn(errInfo);
};exports.warnLock = warnLock;

/***/ }),

/***/ 17:
/*!*****************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/helpers/navJump.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _util = __webpack_require__(/*! ./util */ 13);
var _config = __webpack_require__(/*! ./config */ 14);
var _hooks = __webpack_require__(/*! ../appRouter/hooks */ 18);
var _hooks2 = __webpack_require__(/*! ../appletsRouter/hooks */ 24);
var _uniNav = _interopRequireDefault(__webpack_require__(/*! ../appRouter/uniNav */ 23));
var _appletsNav = _interopRequireDefault(__webpack_require__(/*! ../appletsRouter/appletsNav */ 27));
var _warn = __webpack_require__(/*! ./warn */ 16);
var _routerNav = _interopRequireDefault(__webpack_require__(/*! ../vueRouter/routerNav */ 28));
var compile = _interopRequireWildcard(__webpack_require__(/*! ./compile */ 26));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 返回api 触发的公共函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @param {Object/String} rule  当前跳转规则
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @param {String} fnType    跳转页面的类型方法
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * this 为当前 Router 实例
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */
var isBcakNav = function isBcakNav(_ref)



{var _this = this;var backLayer = _ref.backLayer,delta = _ref.delta,H5PATCH = _ref.H5PATCH;
  compile.H5(function () {
    H5PATCH.on('historyBack', {
      backLayer: backLayer,
      delta: delta });

  });
  compile.APP(function () {
    _config.Global.backLayerC = backLayer; // 告诉路由需要返回几层
    uni.navigateBack({
      delta: backLayer,
      complete: function complete() {
        _config.Global.LockStatus = false; // 跳转完成解锁状态
      } });

  });
  compile.mp(function () {
    _hooks2.backCallHook.call(_this, backLayer, function () {
      uni.navigateBack({
        delta: backLayer });

    });
  });
};

/**
    * 非 返回api 触发的公共函数
    * @param {Object/String} rule  当前跳转规则
    * @param {String} fnType    跳转页面的类型方法
    *
    * this 为当前 Router 实例
    */

var notBackNav = function notBackNav(rule, fnType) {
  if (rule == null) {
    return (0, _warn.err)('跳转规则为空，不允许这样操作');
  }
  if (rule.constructor === String) {// 单独 path 的情况   允许？拼接参数
    var ruleArray = rule.split('?');
    if (ruleArray.length > 1) {
      rule = {
        path: ruleArray[0],
        query: _config.Global.$parseQuery.parse(ruleArray[1]) };

    }
  }
  switch ((0, _util.appPlatform)(true)) {
    case 'H5':
      return _routerNav.default.call(this, _config.H5FnTypeToggle[fnType], rule, _config.methods[fnType]);
    case 'APP':
      _config.Global.LockStatus = true; // 设置为锁住状态
      return _hooks.transitionTo.call(this, rule, fnType, _uniNav.default);
    case 'APPLETS':
      _config.Global.LockStatus = true; // 设置为锁住状态
      return _hooks2.appletsTransitionTo.call(this, rule, fnType, _appletsNav.default);
    default:
      (0, _warn.err)('糟糕！！！还有其他的执行环境？？？没听说过啊。一脸懵逼？？？加QQ群问问：769241495');
      break;}

};

/**
    * 处理正在跳转的公共api
    * @param {Object/String} rule  当前跳转规则
    * @param {String} fnType    跳转页面的类型方法
    * @param {Boolean} isBack  是否通过 back() api 调用的 默认为false
    * @param {Boolean} enforce 是否强制越过跳转加锁检查 默认false  目前只有back() api 传递了
    *
    * this 为当前 Router 实例
    */
var navjump = function navjump(rule, fnType) {var isBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var enforce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (_config.Global.LockStatus && !enforce) {// 正在跳转的状态下 给出提示正在跳转
    return (0, _warn.warn)('当前页面正在处于跳转状态，请稍后再进行跳转....');
  }
  if (isBack) {// 是返回api触发的
    return isBcakNav.call(this, rule, fnType);
  }
  return notBackNav.call(this, rule, fnType);
};var _default =

navjump;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!*****************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/appRouter/hooks.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.beforeTabHooks = exports.triggerLifeCycle = exports.transitionTo = exports.backApiCallHook = exports.beforeBackHooks = exports.proxyIndexHook = exports.proxyLaunchHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));var _config = __webpack_require__(/*! ../helpers/config */ 14);
var _util = __webpack_require__(/*! ./util */ 22);


var _util2 = __webpack_require__(/*! ../helpers/util */ 13);
var _warn = __webpack_require__(/*! ../helpers/warn */ 16);
var _uniNav = _interopRequireDefault(__webpack_require__(/*! ./uniNav */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var startBack = false; // 主要是兼容低端手机返回卡 然后多次返回直接提示退出的问题

/**
 * 还原并执行所有 拦截下来的生命周期 app.vue 及 index 下的生命周期
 * @param {Boolean} callHome // 是否触发首页的生命周期
 *
 * this 为当前 page 对象
 */
var callwaitHooks = function callwaitHooks(callHome) {var _this = this;
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var variation, appVue, indexVue, onLaunch, onShow, waitHooks, variationFuns, indexCallHooks, app, key, _loop, _key;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              variation = []; // 存储一下在uni-app上的变异生命钩子  奇葩的要死

              appVue =
              _config.uniAppHook.appVue, indexVue = _config.uniAppHook.indexVue, onLaunch = _config.uniAppHook.onLaunch, onShow = _config.uniAppHook.onShow, waitHooks = _config.uniAppHook.waitHooks, variationFuns = _config.uniAppHook.variationFuns, indexCallHooks = _config.uniAppHook.indexCallHooks;
              app = appVue.$options;_context.next = 5;return (
                onLaunch.fun[onLaunch.fun.length - 1].call(appVue, onLaunch.args));case 5: // 确保只执行最后一个 并且强化异步操作
              onShow.fun[onShow.fun.length - 1].call(appVue, onShow.args); // onshow 不保证异步 直接确保执行最后一个
              if (callHome) {// 触发首页生命周期
                // eslint-disable-next-line
                for (key in waitHooks) {
                  if (indexCallHooks.includes(key)) {// 只有在被包含的情况下才执行
                    _util.callAppHook.call(_this, waitHooks[key].fun);
                  }
                }
              }
              if (onLaunch.isHijack) {// 还原 onLaunch生命钩子
                app.onLaunch.splice(app.onLaunch.length - 1, 1, onLaunch.fun[0]);
              }
              if (onShow.isHijack) {// 继续还原 onShow
                app.onShow.splice(app.onShow.length - 1, 1, onShow.fun[0]);
              }
              // eslint-disable-next-line
              _loop = function _loop(_key) {// 还原 首页下的生命钩子
                var item = waitHooks[_key];
                if (item.isHijack) {
                  if (variationFuns.includes(_key)) {// 变异方法
                    variation.push({ key: _key, fun: item.fun[0] });
                  } else {
                    var indeHooks = indexVue[_key];
                    // 修复 https://github.com/SilurianYang/uni-simple-router/issues/76
                    setTimeout(function () {// 异步延迟还原 不然 uni-app 给给触发了
                      indeHooks.splice(indeHooks.length - 1, 1, item.fun[0]);
                    }, 50);
                  }
                }};for (_key in waitHooks) {_loop(_key);
              }
              resolve(variation);case 12:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * 还原剩下的奇葩生命钩子
    * @param {Object} variation 当前uni-app中的一些变异方法  奇葩生命钩子
    */
var callVariationHooks = function callVariationHooks(variation) {
  for (var i = 0; i < variation.length; i += 1) {var _variation$i =
    variation[i],key = _variation$i.key,fun = _variation$i.fun;
    var indeHooks = _config.uniAppHook.indexVue[key];
    indeHooks.splice(indeHooks.length - 1, 1, fun);
  }
};

/**
    * 主要是对app.vue下onLaunch和onShow生命周期进行劫持
    *
    * this 为当前 page 对象
    */
var proxyLaunchHook = function proxyLaunchHook() {var _this2 = this;var _this$$options =



  this.$options,onLaunch = _this$$options.onLaunch,onShow = _this$$options.onShow;
  _config.uniAppHook.appVue = this; // 缓存 当前app.vue组件对象
  if (onLaunch.length > 1) {// 确保有写 onLaunch 可能有其他混入 那也办法
    _config.uniAppHook.onLaunch.isHijack = true;
    _config.uniAppHook.onLaunch.fun = onLaunch.splice(onLaunch.length - 1, 1, function (arg) {
      _config.uniAppHook.onLaunch.args = arg;
    }); // 替换uni-app自带的生命周期
  }
  if (onShow.length > 0) {
    _config.uniAppHook.onShow.isHijack = true;
    _config.uniAppHook.onShow.fun = onShow.splice(onShow.length - 1, 1, function (arg) {
      _config.uniAppHook.onShow.args = arg;
      if (_config.uniAppHook.pageReady) {// 因为还有app切前台后台的操作
        _util.callAppHook.call(_this2, _config.uniAppHook.onShow.fun, arg);
      }
    }); // 替换替换 都替换
  }
};

/**
    * 把指定页面的生命钩子函数保存并替换
    * this 为当前 page 对象
    */exports.proxyLaunchHook = proxyLaunchHook;
var proxyIndexHook = function proxyIndexHook(Router) {var
  needHooks = _config.uniAppHook.needHooks,waitHooks = _config.uniAppHook.waitHooks;
  var options = this.$options;
  _config.uniAppHook.indexVue = options;
  for (var i = 0; i < needHooks.length; i += 1) {
    var key = needHooks[i];
    if (options[key] != null) {// 只劫持开发者声明的生命周期
      var length = options[key].length;
      // eslint-disable-next-line
      var whObject = waitHooks[key] = {};
      whObject.fun = options[key].splice(length - 1, 1, _util2.noop); // 把实际的页面生命钩子函数缓存起来,替换原有的生命钩子
      whObject.isHijack = true;
    }
  }
  // eslint-disable-next-line
  triggerLifeCycle.call(this, Router); // 接着 主动我们触发导航守卫
};
/**
    * 触发全局beforeHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */exports.proxyIndexHook = proxyIndexHook;
var beforeHooks = function beforeHooks(_from, _to) {var _this3 = this;
  return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {var beforeHooksFun;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              beforeHooksFun = _this3.lifeCycle.beforeHooks[0];if (!(
              beforeHooksFun == null)) {_context2.next = 3;break;}return _context2.abrupt("return",
              resolve());case 3:_context2.next = 5;return (

                beforeHooksFun.call(_this3, _to, _from, resolve));case 5:case "end":return _context2.stop();}}}, _callee2);}));return function (_x2) {return _ref2.apply(this, arguments);};}());

};
/**
    * 触发全局afterEachHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */
var afterEachHooks = function afterEachHooks(_from, _to) {
  var afterHooks = this.lifeCycle.afterHooks[0];
  if (afterHooks != null && afterHooks.constructor === Function) {
    afterHooks.call(this, _to, _from);
  }
};
/**
    * 触发全局 beforeEnter 生命钩子
    * @param {Object} finalRoute 	// 当前格式化后的路由参数
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */
var beforeEnterHooks = function beforeEnterHooks(finalRoute, _from, _to) {var _this4 = this;
  return new Promise( /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve) {var beforeEnter;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
              beforeEnter = finalRoute.route.beforeEnter;if (!(
              beforeEnter == null || beforeEnter.constructor !== Function)) {_context3.next = 3;break;}return _context3.abrupt("return",
              resolve());case 3:_context3.next = 5;return (

                beforeEnter.call(_this4, _to, _from, resolve));case 5:case "end":return _context3.stop();}}}, _callee3);}));return function (_x3) {return _ref3.apply(this, arguments);};}());

};
/**
    * 触发返回事件公共方法
    * @param {Object} page	用getPages获取到的页面栈对象
    * @param {Object} options 	当前vue页面对象
    * @param {Object} backLayerC	需要返回页面的层级
      *
    * this 为当前 Router 对象
    */
var backCallHook = function backCallHook(page, options) {var _this5 = this;var backLayerC = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var route = (0, _util.APPGetPageRoute)([page]);
  var NAVTYPE = 'RouterBack';
  // eslint-disable-next-line
  transitionTo.call(this, { path: route.path, query: route.query }, NAVTYPE, function (finalRoute, fnType) {
    if (fnType != NAVTYPE) {// 返回时的api如果有next到其他页面 那么必须带上NAVTYPE  不相同则表示需要跳转到其他页面
      return (0, _uniNav.default)(finalRoute, fnType);
    }
    if (startBack) {// 如果当前处于正在返回的状态
      return (0, _warn.warn)('当前处于正在返回的状态，请稍后再试！');
    }
    startBack = true; // 标记开始返回
    options.onBackPress = [_util2.noop]; // 改回uni-app可执行的状态
    setTimeout(function () {
      _this5.back(backLayerC, undefined, true); // 越过加锁验证
      startBack = false; // 返回结束
    });
  });
};
/**
    * 处理返回按钮的生命钩子
    * @param {Object} options 当前 vue 组件对象下的$options对象
    * @param {Array} args  当前页面是点击头部返回还是底部返回
    *
    * this 为当前 Router 对象
    */
var beforeBackHooks = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(options, args) {var isNext, page;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
              (0, _util.getPageOnBeforeBack)(args));case 2:isNext = _context4.sent;if (!(
            isNext === false)) {_context4.next = 6;break;} // onBeforeBack  返回了true 阻止了跳转
            _config.Global.LockStatus = false; // 也需要解锁
            return _context4.abrupt("return", false);case 6:

            page = (0, _util.getPages)(-3); // 上一个页面对象
            backCallHook.call(this, page, options);case 8:case "end":return _context4.stop();}}}, _callee4, this);}));return function beforeBackHooks(_x4, _x5) {return _ref4.apply(this, arguments);};}();

/**
                                                                                                                                                                                                             * 处理back api的生命钩子
                                                                                                                                                                                                             * @param {Object} options 当前 vue 组件对象下的$options对象
                                                                                                                                                                                                             * @param {Array} args  当前页面是点击头部返回还是底部返回
                                                                                                                                                                                                             *
                                                                                                                                                                                                             * this 为当前 Router 对象
                                                                                                                                                                                                             */exports.beforeBackHooks = beforeBackHooks;
var backApiCallHook = /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(options, args) {var backLayerC, pages, page;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
              (0, _util.getPageOnBeforeBack)(args));case 2:
            backLayerC = _config.Global.backLayerC;
            pages = (0, _util.getPages)();
            page = null;
            if (backLayerC > pages.length - 1 || backLayerC == pages.length - 1) {// 返回的首页 我们需要显示tabbar拦截
              // eslint-disable-next-line
              page = pages[0];
            } else {
              page = pages[pages.length - 2];
            }
            backCallHook.call(this, page, options, backLayerC);case 7:case "end":return _context5.stop();}}}, _callee5, this);}));return function backApiCallHook(_x6, _x7) {return _ref5.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                         *  v1.5.4+
                                                                                                                                                                                                                         * beforeRouteLeave 生命周期
                                                                                                                                                                                                                         * @param {Object} to       将要去的那个页面 to对象
                                                                                                                                                                                                                         * @param {Object} from     从那个页面触发的 from对象
                                                                                                                                                                                                                         *  @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
                                                                                                                                                                                                                         * this 为当前 Router 对象
                                                                                                                                                                                                                         */exports.backApiCallHook = backApiCallHook;
var beforeRouteLeaveHooks = function beforeRouteLeaveHooks(from, to, leaveHook) {
  return new Promise(function (resolve) {
    if (leaveHook) {// 我们知道这个是来自页面beforeRouteLeave next到其他地方，所有不必再执行啦
      (0, _warn.warn)('beforeRouteLeave next到其他地方，无须再执行！');
      return resolve();
    }
    if (from.path == to.path) {// 进入首页的时候不触发
      return resolve();
    }
    var currentPage = (0, _util.getPages)(-2); // 获取到全部的页面对象
    var callThis = (0, _util.getPageVmOrMp)(currentPage); // 获取到页面的 $vm 对象 及 page页面的this对象
    var beforeRouteLeave = callThis.$options.beforeRouteLeave; // 查看当前是否有开发者声明
    if (beforeRouteLeave == null) {
      (0, _warn.warn)('当前页面下无 beforeRouteLeave 钩子声明，无须执行！');
      return resolve();
    }
    if (beforeRouteLeave != null && beforeRouteLeave.constructor !== Function) {
      (0, _warn.warn)('beforeRouteLeave 生命钩子声明错误，必须是一个函数！');
      return resolve();
    }
    beforeRouteLeave.call(callThis, to, from, resolve); // 执行生命钩子
  });
};

/**
    * 验证当前 next() 管道函数是否支持下一步
    *
    * @param {Object} Intercept 拦截到的新路由规则
    * @param {Object} fnType 跳转页面的类型方法 原始的
    * @param {Object} navCB 回调函数 原始的
    * @param {Boolean} leaveHookCall:? 是否为 beforeRouteLeave 触发的next 做拦截判断
    * this 为当前 Router 对象
    *
    */
var isNext = function isNext(Intercept, fnType, navCB) {var _this6 = this;var leaveHookCall = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return new Promise(function (resolve, reject) {
    if (Intercept == null) {// 什么也不做 直接执行下一个钩子
      return resolve();
    }
    if (Intercept === false) {// 路由中断
      _config.Global.LockStatus = false; // 解锁跳转状态
      return reject('路由终止');
    }
    if (Intercept.constructor === String) {// 说明 开发者直接传的path 并且没有指定 NAVTYPE 那么采用原来的navType
      reject('next到其他页面');
      // eslint-disable-next-line
      return transitionTo.call(_this6, Intercept, fnType, navCB, leaveHookCall);
    }
    if (Intercept.constructor === Object) {// 有一系列的配置 包括页面切换动画什么的
      reject('next到其他页面');
      // eslint-disable-next-line
      return transitionTo.call(_this6, Intercept, Intercept.NAVTYPE || fnType, navCB, leaveHookCall);
    }
  });
};
/**
    * 核心方法 处理一系列的跳转配置
    * @param {Object} rule 当前跳转规则
    * @param {Object} fnType 跳转页面的类型方法
    * @param {Object} navCB:? 回调函数
    * @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
    *
    * this 为当前 Router 对象
    */
var transitionTo = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(rule, fnType, navCB) {var leaveHook,finalRoute,_from,_to,leaveResult,beforeResult,enterResult,_args6 = arguments;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:leaveHook = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : false;_context6.next = 3;return (
              this.lifeCycle.routerbeforeHooks[0].call(this));case 3: // 触发内部跳转前的生命周期
            finalRoute = (0, _util.ruleToUniNavInfo)(rule, this.CONFIG.routes); // 获得到最终的 route 对象
            _from = (0, _util.formatFrom)(this.CONFIG.routes); // 先根据跳转类型获取 from 数据
            _to = (0, _util.formatTo)(finalRoute); // 再根据跳转类型获取 to 数据
            _context6.prev = 6;_context6.next = 9;return (
              beforeRouteLeaveHooks.call(this, _from, _to, leaveHook));case 9:leaveResult = _context6.sent;_context6.next = 12;return (
              isNext.call(this, leaveResult, fnType, navCB, true));case 12:_context6.next = 14;return (

              beforeHooks.call(this, _from, _to));case 14:beforeResult = _context6.sent;_context6.next = 17;return (
              isNext.call(this, beforeResult, fnType, navCB));case 17:_context6.next = 19;return (

              beforeEnterHooks.call(this, finalRoute, _from, _to));case 19:enterResult = _context6.sent;_context6.next = 22;return (
              isNext.call(this, enterResult, fnType, navCB));case 22:_context6.next = 28;break;case 24:_context6.prev = 24;_context6.t0 = _context6["catch"](6);

            (0, _warn.warn)(_context6.t0); // 打印开发者操作的日志
            return _context6.abrupt("return", false);case 28:

            if (navCB) {
              navCB.call(this, finalRoute, fnType); // 执行当前回调生命周期
            }
            afterEachHooks.call(this, _from, _to);_context6.next = 32;return (
              this.lifeCycle.routerAfterHooks[0].call(this));case 32:case "end":return _context6.stop();}}}, _callee6, this, [[6, 24]]);}));return function transitionTo(_x8, _x9, _x10) {return _ref6.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                                      * 主动触发导航守卫
                                                                                                                                                                                                                                      * @param {Object} Router 当前路由对象
                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                      * this  当前vue页面组件对象
                                                                                                                                                                                                                                      */exports.transitionTo = transitionTo;
var triggerLifeCycle = function triggerLifeCycle(Router) {var _this7 = this;
  var topPage = getCurrentPages()[0];
  if (topPage == null) {
    return (0, _warn.warn)('打扰了,当前一个页面也没有 这不是官方的bug是什么??');
  }var _getPageVmOrMp =
  (0, _util.getPageVmOrMp)(topPage, false),query = _getPageVmOrMp.query,page = _getPageVmOrMp.page;
  transitionTo.call(Router, { path: page.route, query: query }, 'push', /*#__PURE__*/function () {var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(finalRoute, fnType) {var variation;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
              variation = [];if (!(
              "/".concat(page.route) == finalRoute.route.path)) {_context7.next = 7;break;} // 在首页不动的情况下
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞
              _context7.next = 5;return callwaitHooks.call(_this7, true);case 5:_context7.next = 12;break;case 7:_context7.next = 9;return (

                callwaitHooks.call(_this7, false));case 9:variation = _context7.sent;_context7.next = 12;return (
                (0, _uniNav.default)(finalRoute, fnType));case 12:

              plus.nativeObj.View.getViewById('router-loadding').close();
              callVariationHooks(variation);
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞
            case 15:case "end":return _context7.stop();}}}, _callee7);}));return function (_x11, _x12) {return _ref7.apply(this, arguments);};}());
};

/**
    * 处理tabbar点击拦截事件
    * @param {Object} path 当前需要跳转的tab页面路径
    *
    * this 为当前 Router 对象
    */exports.triggerLifeCycle = triggerLifeCycle;
var beforeTabHooks = function beforeTabHooks(path) {
  transitionTo.call(this, { path: "/".concat(path), query: {} }, 'pushTab', function (finalRoute, fnType) {
    (0, _uniNav.default)(finalRoute, fnType);
  });
};exports.beforeTabHooks = beforeTabHooks;

/***/ }),

/***/ 19:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 20);

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"想玩商家端","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"想玩商家端","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"想玩商家端","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"想玩商家端","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 21);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 21:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 22:
/*!****************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/appRouter/util.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.assertCanBack = exports.getPageOnBeforeBack = exports.APPGetPageRoute = exports.ruleToUniNavInfo = exports.formatFrom = exports.getFormatQuery = exports.pathOrNameToRoute = exports.formatTo = exports.getPageVmOrMp = exports.isNvuePage = exports.getPages = exports.callAppHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));var _warn = __webpack_require__(/*! ../helpers/warn */ 16);
var _util = __webpack_require__(/*! ../helpers/util */ 13);
var _config = __webpack_require__(/*! ../helpers/config */ 14);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * 触发指定生命钩子
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @param {Array} funList	//需要执行的方法列表
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @param {Object} args //触发生命钩子传递的参数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */
var callAppHook = function callAppHook() {var funList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var args = arguments.length > 1 ? arguments[1] : undefined;
  for (var i = 0; i < funList.length; i += 1) {
    funList[i].call(this, args);
  }
};
/**
    * @param {Number} index //需要获取的页面下标 -2:表示获取最后一个即当前页面 -1:表示全部 -3:当前页面的前一个页面
    * @param {Boolean} all //是否获取全部的页面
    */exports.callAppHook = callAppHook;
var getPages = function getPages() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);
  if (index === -1) {
    return pages;
  }
  if (index === -2) {
    return pages[pages.length - 1];
  }
  if (index === -3) {
    return pages[pages.length - 2];
  }
  return pages[index];
};
/**
    * 验证当前页面是否为nvue页面
    * @param {Object} page 当前页面对象
    */exports.getPages = getPages;
var isNvuePage = function isNvuePage(page) {
  var cstr = page.constructor.name;
  var pageType = {
    s: true,
    z: false };

  return pageType[cstr];
};

/**
    * @param {Object} page //当前顶级页面对象
    * @param {Object} vim:? //是否获取 $vm 对象还是 $mp 对象
    */exports.isNvuePage = isNvuePage;
var getPageVmOrMp = function getPageVmOrMp(page) {var vim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (vim) {
    return page.$vm;
  }
  if (page.$vm.$mp) {
    return page.$vm.$mp;
  }
  if (isNvuePage(page)) {// nvue 页面
    return {
      page: page,
      query: page.__displayReporter.query };

  }
};

/**
    * 获取 to 的配置参数
    * @param {Object} rule 当前跳转的规则
    */exports.getPageVmOrMp = getPageVmOrMp;
var formatTo = function formatTo(finalRoute) {
  var route = (0, _util.copyObject)(finalRoute.route);var
  rule = finalRoute.rule;
  route.query = rule.query || rule.params || {};
  return route;
};
/**
    * 通过一个未知的路径或者名称 在路由表中查找指定路由表 并返回
    * @param {string} type   //path 或者 name
    * @param {Object} routes //当前对象的所有路由表
    */exports.formatTo = formatTo;
var pathOrNameToRoute = function pathOrNameToRoute(type) {var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.Global.Router.CONFIG.routes;
  var routesKeys = Object.keys(routes);
  for (var i = 0; i < routesKeys.length; i += 1) {
    var key = routesKeys[i];
    var item = routes[key];
    if (item.path === "/".concat(type)) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.path === type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.name == type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
  }
  (0, _warn.err)("\u5F53\u524D '".concat(type, "' \u5728\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684 name \u6216\u8005 path"));
};
/**
    * 统一格式话 路由传递的参数 看看是编码还是非编码 做相应的对策
    *
    * @param {Object} query 当前的路由参数
    * @param {Boolean} getter 是从页面获取 route 对象下的参数 还是编码后传输
    */exports.pathOrNameToRoute = pathOrNameToRoute;
var getFormatQuery = function getFormatQuery() {var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (_config.Global.Router.CONFIG.encodeURI) {
    try {
      query = JSON.parse(decodeURIComponent(query.query || encodeURIComponent('{}')));
    } catch (e) {
      query = JSON.parse(query.query);
    }
  }
  return query;
};
/**
    * 获取 from 的配置参数 from 页面永远都是站在当前页面忘其它地方走 所以都是最后一个页面
    *
    * @param {Object} routes //当前对象的所有路由表
    */exports.getFormatQuery = getFormatQuery;
var formatFrom = function formatFrom(routes) {
  var topPage = getPages(-2);var _getPageVmOrMp =
  getPageVmOrMp(topPage, false),page = _getPageVmOrMp.page,query = _getPageVmOrMp.query;
  var route = pathOrNameToRoute(page.route, routes); // 获取到当前路由表下的 route
  route.query = getFormatQuery(query); // 不管是编码传输还是非编码 最后都得在 to/from 中换成json对象
  return route;
};
/**
    *
    * 把用户的跳转路由规则格式化成uni-app可用的路由跳转规则
    *
    * @param {Object} rule  //当前用户跳转的路由规则
    * @param {Object} routes //当前simple-router 下的路由表
    */exports.formatFrom = formatFrom;
var ruleToUniNavInfo = function ruleToUniNavInfo(rule, routes) {
  if (rule == null) {
    return (0, _warn.err)('当前跳转规则为空,请检查跳转代码');
  }
  // eslint-disable-next-line
  var navType = 'path',route = null,query = {},animation = {};
  if (rule.constructor === String) {// 是字符串类型 那当前就是路径啦
    route = pathOrNameToRoute(rule, routes); // 直接把 rule 当 path 传递 完事
  } else if (rule.constructor === Object) {// 对象类型 可以是 path 或者 name
    route = pathOrNameToRoute(rule.path || (navType = 'name', rule.name), routes); // 两则必有其一 报错自己处理
    query = rule.query || rule.params || {};
    animation = rule.animation || {};
  } else {
    return (0, _warn.err)('传的什么乱七八糟的类型?路由跳转规则只认字符串 \'path\' , 对象 \'path\' , 对象 \'name\' ');
  }
  animation = _objectSpread(_objectSpread(_objectSpread({}, _config.Global.Router.CONFIG.APP.animation), route.animation || {}), animation); // 合并多种方式声明的动画效果
  route.animation = animation; // 这才是最终的页面切换效果
  // 路径处理完后   开始格式化参数
  var uniRoute = (0, _util.parseQuery)(route.path, query); // uni-app 需要的跳转规则
  return {
    rule: rule,
    route: route,
    uniRoute: uniRoute };

};
/**
    * 获取当前页面下的 Route 信息
    *
    * @param {Object} pages 获取页面对象集合
    * @param {Object} Vim 用户传递的当前页面对象
    */exports.ruleToUniNavInfo = ruleToUniNavInfo;
var APPGetPageRoute = function APPGetPageRoute(pages, Vim) {var
  query = {},path = '';
  var page = pages[pages.length - 1]; // 获取到当前页面
  if (pages.length > 0) {
    query = getFormatQuery(page.options, true);
    path = page.route;
  } else if (Vim != null) {
    query = getFormatQuery(Vim.$mp.page.options, true);
    path = page.route;
  }
  var route = pathOrNameToRoute(path);
  route.query = query;
  return route;
};
/**
    * 获取当前页面下的 onBeforeBack 生命周期并执行
    *
    * @param {Object} args 当前返回页面时uni-app传递的参数
    */exports.APPGetPageRoute = APPGetPageRoute;
var getPageOnBeforeBack = function getPageOnBeforeBack(args) {
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var currPage, onBeforeBack, isNext;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              currPage = getPages(-2); // 获取到当前页面
              onBeforeBack = currPage.$vm.$options.onBeforeBack;if (!(
              onBeforeBack != null && onBeforeBack.constructor === Function)) {_context.next = 8;break;}_context.next = 5;return (
                onBeforeBack.call(currPage.$vm, args));case 5:isNext = _context.sent;if (!(
              isNext === true)) {_context.next = 8;break;}return _context.abrupt("return",
              resolve(false));case 8:return _context.abrupt("return",


              resolve(true));case 9:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * 断言当前页面是否可返回上一级
    * @param {Object} page 当前页面webview对象
    */exports.getPageOnBeforeBack = getPageOnBeforeBack;
var assertCanBack = function assertCanBack(page) {
  var pageStyle = page.$getAppWebview().getStyle();
  if (pageStyle.titleNView != null && pageStyle.titleNView.autoBackButton) {// 只有处理有带返回按钮的页面
    return true;
  }
  // 两种情况 1.真的是顶级页面时  2.自定义头部
  var $page = page.$page;
  if ($page && $page.meta.isQuit === false) {// 自定义头部 不是顶级页面
    return true;
  }
  return false; // 不可返回 真的是顶级页面时 返回就直接退出app了
};exports.assertCanBack = assertCanBack;

/***/ }),

/***/ 23:
/*!******************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/appRouter/uniNav.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! ../helpers/config */ 14);
var _util = __webpack_require__(/*! ../helpers/util */ 13);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var stop = null;

/**
                  * @param {Object} finalRoute 格式化后的路由跳转规则
                  * @param {Object} NAVTYPE 需要调用的跳转方法
                  */
var uniPushTo = function uniPushTo(finalRoute, NAVTYPE) {
  return new Promise(function (resolve) {
    var query = (0, _util.formatURLQuery)("?".concat(finalRoute.uniRoute.query));var
    APP = _config.baseConfig.APP;var
    url = finalRoute.uniRoute.url;
    stop = setTimeout(function () {
      resolve(url);
      resolve = _util.noop; // 执行完了就没了 确保不会被下一次执行
      _config.Global.LockStatus = false; // 跳转完成解锁状态
    }, APP.switchPageOutTime);

    uni[_config.methods[NAVTYPE]](_objectSpread(_objectSpread({
      url: url + query },
    finalRoute.route.animation), {}, {
      complete: function complete() {
        clearTimeout(stop);
        resolve(url);
        resolve = _util.noop; // 执行完了就没了 确保不会被下一次执行
        _config.Global.LockStatus = false; // 跳转完成解锁状态
      } }),
    true); // 这里传递true 主要是兼容重写 uni.switchTab
  });
};var _default =

uniPushTo;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 24:
/*!*********************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/appletsRouter/hooks.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.appletsProxyIndexHook = exports.triggerLifeCycle = exports.backCallHook = exports.appletsTransitionTo = exports.proxyLaunchHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));var _config = __webpack_require__(/*! ../helpers/config */ 14);
var _util = __webpack_require__(/*! ./util */ 25);


var _appletsNav = _interopRequireDefault(__webpack_require__(/*! ./appletsNav */ 27));
var _util2 = __webpack_require__(/*! ../helpers/util */ 13);
var _warn = __webpack_require__(/*! ../helpers/warn */ 16);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @param {String} key
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @param {Function} hook 需要执行及还原的生命周期函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
var toutiaoIndexHookCall = function toutiaoIndexHookCall(key, hook) {var
  indexVue = _config.uniAppHook.indexVue;
  var indeHooks = indexVue[key];
  indeHooks.splice(indeHooks.length - 1, 1, hook);
};

/**
    * 还原并执行所有 拦截下来的生命周期 app.vue 及 index 下的生命周期
    * @param {Boolean} callHome // 是否触发首页的生命周期
    *
    * this 为当前 page 对象
    */
var callwaitHooks = function callwaitHooks(callHome) {var _this = this;
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var variation, appVue, onLaunch, onShow, waitHooks, variationFuns, indexCallHooks, app, key, _key, item;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              variation = []; // 存储一下在uni-app上的变异生命钩子  奇葩的要死

              appVue =
              _config.uniAppHook.appVue, onLaunch = _config.uniAppHook.onLaunch, onShow = _config.uniAppHook.onShow, waitHooks = _config.uniAppHook.waitHooks, variationFuns = _config.uniAppHook.variationFuns, indexCallHooks = _config.uniAppHook.indexCallHooks;
              app = appVue.$options;_context.next = 5;return (
                onLaunch.fun[onLaunch.fun.length - 1].call(appVue, onLaunch.args));case 5: // 确保只执行最后一个 并且强化异步操作
              onShow.fun[onShow.fun.length - 1].call(appVue, onShow.args); // onshow 不保证异步 直接确保执行最后一个
              if (callHome) {// 触发首页生命周期
                // eslint-disable-next-line
                for (key in waitHooks) {
                  if (indexCallHooks.includes(key)) {// 只有在被包含的情况下才执行
                    _util.callAppHook.call(_this, waitHooks[key].fun);
                  }
                }
              }
              if (onLaunch.isHijack) {// 还原 onLaunch生命钩子
                app.onLaunch.splice(app.onLaunch.length - 1, 1, onLaunch.fun[0]);
              }
              if (onShow.isHijack) {// 继续还原 onShow
                app.onShow.splice(app.onShow.length - 1, 1, onShow.fun[0]);
              }
              // eslint-disable-next-line
              for (_key in waitHooks) {// 还原 首页下的生命钩子
                item = waitHooks[_key];
                if (item.isHijack) {
                  if (variationFuns.includes(_key)) {// 变异方法
                    variation.push({ key: _key, fun: item.fun[0] });
                  } else {
                    toutiaoIndexHookCall(_key, item.fun[0]);
                  }
                }
              }
              resolve(variation);case 11:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * 还原剩下的奇葩生命钩子
    * @param {Object} variation 当前uni-app中的一些变异方法  奇葩生命钩子
    */
var callVariationHooks = function callVariationHooks(variation) {
  for (var i = 0; i < variation.length; i += 1) {var _variation$i =
    variation[i],key = _variation$i.key,fun = _variation$i.fun;
    toutiaoIndexHookCall(key, fun);
  }
};

/**
    * 主要是对app.vue下onLaunch和onShow生命周期进行劫持
    *
    * this 为当前 page 对象
    */
var proxyLaunchHook = function proxyLaunchHook() {var _this2 = this;var _this$$options =



  this.$options,onLaunch = _this$$options.onLaunch,onShow = _this$$options.onShow;
  _config.uniAppHook.appVue = this; // 缓存 当前app.vue组件对象
  if (onLaunch.length > 1) {// 确保有写 onLaunch 可能有其他混入 那也办法
    _config.uniAppHook.onLaunch.isHijack = true;
    _config.uniAppHook.onLaunch.fun = onLaunch.splice(onLaunch.length - 1, 1, function (arg) {
      _config.uniAppHook.onLaunch.args = arg;
    }); // 替换uni-app自带的生命周期
  }
  if (onShow.length > 0) {
    _config.uniAppHook.onShow.isHijack = true;
    _config.uniAppHook.onShow.fun = onShow.splice(onShow.length - 1, 1, function (arg) {
      _config.uniAppHook.onShow.args = arg;
      if (_config.uniAppHook.pageReady) {// 因为还有app切前台后台的操作
        _util.callAppHook.call(_this2, _config.uniAppHook.onShow.fun, arg);
      }
    }); // 替换替换 都替换
  }
};
/**
    * 触发全局beforeHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */exports.proxyLaunchHook = proxyLaunchHook;
var beforeHooks = function beforeHooks(_from, _to) {var _this3 = this;
  return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {var beforeHooksFun;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              beforeHooksFun = _this3.lifeCycle.beforeHooks[0];if (!(
              beforeHooksFun == null)) {_context2.next = 3;break;}return _context2.abrupt("return",
              resolve());case 3:_context2.next = 5;return (

                beforeHooksFun.call(_this3, _to, _from, resolve));case 5:case "end":return _context2.stop();}}}, _callee2);}));return function (_x2) {return _ref2.apply(this, arguments);};}());

};
/**
    * 触发全局afterEachHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */
var afterEachHooks = function afterEachHooks(_from, _to) {
  var afterHooks = this.lifeCycle.afterHooks[0];
  if (afterHooks != null && afterHooks.constructor === Function) {
    afterHooks.call(this, _to, _from);
  }
};
/**
    * 触发全局 beforeEnter 生命钩子
    * @param {Object} finalRoute 	// 当前格式化后的路由参数
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */
var beforeEnterHooks = function beforeEnterHooks(finalRoute, _from, _to) {var _this4 = this;
  return new Promise( /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve) {var beforeEnter;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
              beforeEnter = finalRoute.route.beforeEnter;if (!(
              beforeEnter == null || beforeEnter.constructor !== Function)) {_context3.next = 3;break;}return _context3.abrupt("return",
              resolve());case 3:_context3.next = 5;return (

                beforeEnter.call(_this4, _to, _from, resolve));case 5:case "end":return _context3.stop();}}}, _callee3);}));return function (_x3) {return _ref3.apply(this, arguments);};}());

};
/**
    *  v1.5.4+
    * beforeRouteLeave 生命周期
    * @param {Object} to       将要去的那个页面 to对象
    * @param {Object} from     从那个页面触发的 from对象
    *  @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
    * this 为当前 Router 对象
    */
var beforeRouteLeaveHooks = function beforeRouteLeaveHooks(from, to, leaveHook) {
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve) {var currentPage, callThis, beforeRouteLeave;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (!
              leaveHook) {_context4.next = 3;break;} // 我们知道这个是来自页面beforeRouteLeave next到其他地方，所有不必再执行啦
              (0, _warn.warn)('beforeRouteLeave next到其他地方，无须再执行！');return _context4.abrupt("return",
              resolve());case 3:if (!(

              from.path == to.path)) {_context4.next = 5;break;}return _context4.abrupt("return",
              resolve());case 5:

              currentPage = (0, _util.getPages)(-2); // 获取到全部的页面对象
              callThis = (0, _util.getPageVmOrMp)(currentPage); // 获取到页面的 $vm 对象 及 page页面的this对象
              beforeRouteLeave = callThis.$options.beforeRouteLeave; // 查看当前是否有开发者声明
              if (!(beforeRouteLeave == null)) {_context4.next = 11;break;}
              (0, _warn.warn)('当前页面下无 beforeRouteLeave 钩子声明，无须执行！');return _context4.abrupt("return",
              resolve());case 11:if (!(

              beforeRouteLeave != null && beforeRouteLeave.constructor !== Function)) {_context4.next = 14;break;}
              (0, _warn.warn)('beforeRouteLeave 生命钩子声明错误，必须是一个函数！');return _context4.abrupt("return",
              resolve());case 14:_context4.next = 16;return (

                beforeRouteLeave.call(callThis, to, from, resolve));case 16:case "end":return _context4.stop();}}}, _callee4);}));return function (_x4) {return _ref4.apply(this, arguments);};}());

};

/**
    * 核心方法 处理一系列的跳转配置
    * @param {Object} rule 当前跳转规则
    * @param {Object} fnType 跳转页面的类型方法
    * @param {Object} navCB:? 回调函数
    * @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
    * this 为当前 Router 对象
    *
    */
var appletsTransitionTo = /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(rule, fnType, navCB) {var leaveHook,finalRoute,_from,_to,leaveResult,beforeResult,enterResult,_args5 = arguments;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:leaveHook = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : false;_context5.next = 3;return (
              this.lifeCycle.routerbeforeHooks[0].call(this));case 3: // 触发内部跳转前的生命周期
            finalRoute = (0, _util.ruleToUniNavInfo)(rule, this.CONFIG.routes); // 获得到最终的 route 对象
            _from = (0, _util.formatFrom)(this.CONFIG.routes); // 先根据跳转类型获取 from 数据
            _to = (0, _util.formatTo)(finalRoute); // 再根据跳转类型获取 to 数据
            _context5.prev = 6;_context5.next = 9;return (
              beforeRouteLeaveHooks.call(this, _from, _to, leaveHook));case 9:leaveResult = _context5.sent;_context5.next = 12;return (

              isNext.call(this, leaveResult, fnType, navCB, true));case 12:_context5.next = 14;return (

              beforeHooks.call(this, _from, _to));case 14:beforeResult = _context5.sent;_context5.next = 17;return (

              isNext.call(this, beforeResult, fnType, navCB));case 17:_context5.next = 19;return (

              beforeEnterHooks.call(this, finalRoute, _from, _to));case 19:enterResult = _context5.sent;_context5.next = 22;return (

              isNext.call(this, enterResult, fnType, navCB));case 22:_context5.next = 28;break;case 24:_context5.prev = 24;_context5.t0 = _context5["catch"](6);

            (0, _warn.warn)(_context5.t0); // 打印开发者操作的日志
            return _context5.abrupt("return", false);case 28:

            if (navCB) {
              navCB.call(this, finalRoute, fnType); // 执行当前回调生命周期
            }
            afterEachHooks.call(this, _from, _to);_context5.next = 32;return (
              this.lifeCycle.routerAfterHooks[0].call(this));case 32:case "end":return _context5.stop();}}}, _callee5, this, [[6, 24]]);}));return function appletsTransitionTo(_x5, _x6, _x7) {return _ref5.apply(this, arguments);};}();


/**
                                                                                                                                                                                                                                            * 触发全局 返回事件
                                                                                                                                                                                                                                            * @param {Number} backLayer 需要返回的页面层级
                                                                                                                                                                                                                                            * @param {Function} next 正真的回调函数
                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                            * this 为当前 Router 对象
                                                                                                                                                                                                                                            */exports.appletsTransitionTo = appletsTransitionTo;
var backCallHook = function backCallHook(backLayer, next) {
  var pages = (0, _util.getPages)(); // 获取到全部的页面对象
  var toPage = pages.reverse()[backLayer];
  if (toPage == null) {// 没有匹配到的时候
    return (0, _warn.warn)('亲爱的开发者，你确定页面栈中有这么多历史记录给你返回？');
  }var _getPageVmOrMp =
  (0, _util.getPageVmOrMp)(toPage, false),query = _getPageVmOrMp.query,page = _getPageVmOrMp.page;
  var beforeFntype = 'RouterBack';
  appletsTransitionTo.call(this, { path: page.route, query: query }, beforeFntype, function (finalRoute, fnType) {
    var toPath = finalRoute.uniRoute.url;
    if ("/".concat(page.route) == toPath || page.route == toPath) {// 直接调用返回api
      next();
    } else {// 有拦截到其他页面时
      if (fnType == beforeFntype) {
        return (0, _warn.warn)('调用返回api被拦截到其他页面需要指定合理的 ‘NAVTYPE’ ');
      }
      (0, _appletsNav.default)(finalRoute, fnType);
    }
  });
};

/**
    * 主动触发导航守卫
    * @param {Object} Router 当前路由对象
    *
    */exports.backCallHook = backCallHook;
var triggerLifeCycle = function triggerLifeCycle(Router) {var _this5 = this;
  var topPage = getCurrentPages()[0];
  if (topPage == null) {
    return (0, _warn.warn)('打扰了,当前一个页面也没有 这不是官方的bug是什么??');
  }var _getPageVmOrMp2 =
  (0, _util.getPageVmOrMp)(topPage, false),query = _getPageVmOrMp2.query,page = _getPageVmOrMp2.page;
  appletsTransitionTo.call(Router, { path: page.route, query: query }, 'push', /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(finalRoute, fnType) {var variation;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
              variation = [];if (!(
              "/".concat(page.route) == finalRoute.route.path || page.route == finalRoute.route.path)) {_context6.next = 7;break;} // 在首页不动的情况下
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞
              _context6.next = 5;return callwaitHooks.call(_this5, true);case 5:_context6.next = 12;break;case 7:_context6.next = 9;return (

                callwaitHooks.call(_this5, false));case 9:variation = _context6.sent;_context6.next = 12;return (
                (0, _appletsNav.default)(finalRoute, fnType));case 12:

              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞
              callVariationHooks(variation);case 14:case "end":return _context6.stop();}}}, _callee6);}));return function (_x8, _x9) {return _ref6.apply(this, arguments);};}());

};
/**
    * 把指定页面的生命钩子函数保存并替换
    * this 为当前 page 对象
    */exports.triggerLifeCycle = triggerLifeCycle;
var appletsProxyIndexHook = function appletsProxyIndexHook(Router) {
  if (false) {}var
  needHooks = _config.uniAppHook.needHooks,waitHooks = _config.uniAppHook.waitHooks;
  var options = this.$options;
  _config.uniAppHook.indexVue = options;
  for (var i = 0; i < needHooks.length; i += 1) {
    var key = needHooks[i];
    if (options[key] != null) {// 只劫持开发者声明的生命周期
      var length = options[key].length;
      // eslint-disable-next-line
      var whObject = waitHooks[key] = {};
      whObject.fun = options[key].splice(length - 1, 1, _util2.noop); // 把实际的页面生命钩子函数缓存起来,替换原有的生命钩子
      whObject.isHijack = true;
    }
  }
  triggerLifeCycle.call(this, Router); // 接着 主动我们触发导航守卫
};
/**
    * 验证当前 next() 管道函数是否支持下一步
    *
    * @param {Object} Intercept 拦截到的新路由规则
    * @param {Object} fnType 跳转页面的类型方法 原始的
    * @param {Object} navCB 回调函数 原始的
    * @param {Boolean} leaveHookCall:? 是否为 beforeRouteLeave 触发的next 做拦截判断
    * this 为当前 Router 对象
    *
    */exports.appletsProxyIndexHook = appletsProxyIndexHook;
var isNext = function isNext(Intercept, fnType, navCB) {var _this6 = this;var leaveHookCall = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return new Promise(function (resolve, reject) {
    if (Intercept == null) {// 什么也不做 直接执行下一个钩子
      return resolve();
    }
    if (Intercept === false) {// 路由中断 我们需要把防抖设置为false
      _config.Global.LockStatus = false; // 解锁跳转状态
      return reject('路由终止');
    }
    if (Intercept.constructor === String) {// 说明 开发者直接传的path 并且没有指定 NAVTYPE 那么采用原来的navType
      reject('next到其他页面');
      return appletsTransitionTo.call(_this6, Intercept, fnType, navCB, leaveHookCall);
    }
    if (Intercept.constructor === Object) {// 有一系列的配置 包括页面切换动画什么的
      reject('next到其他页面');
      return appletsTransitionTo.call(_this6, Intercept, Intercept.NAVTYPE || fnType, navCB, leaveHookCall);
    }
  });
};

/***/ }),

/***/ 25:
/*!********************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/appletsRouter/util.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.AppletsPageRoute = exports.ruleToUniNavInfo = exports.formatFrom = exports.formatTo = exports.pathOrNameToRoute = exports.getPages = exports.getFormatQuery = exports.getPageVmOrMp = exports.callAppHook = void 0;var _config = __webpack_require__(/*! ../helpers/config */ 14);
var _util = __webpack_require__(/*! ../helpers/util */ 13);
var _warn = __webpack_require__(/*! ../helpers/warn */ 16);
var _compile = __webpack_require__(/*! ../helpers/compile */ 26);
/**
                                               * 触发指定生命钩子
                                               * @param {Array} funList	//需要执行的方法列表
                                               * @param {Object} args //触发生命钩子传递的参数
                                               */
var callAppHook = function callAppHook(funList, args) {
  for (var i = 0; i < funList.length; i += 1) {
    funList[i].call(this, args);
  }
};
/**
    * @param {Object} page //当前顶级页面对象
    * @param {Object} vim:? //是否获取 $vm 对象还是 $mp 对象
    */exports.callAppHook = callAppHook;
var getPageVmOrMp = function getPageVmOrMp(page) {var vim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (vim) {
    return page.$vm;
  }var
  $mp = page.$vm.$mp;
  (0, _compile.baiduApple)(function () {// 百度小程序新增一个route属性
    $mp.page.route = $mp.page.is;
  });
  (0, _compile.touTiao)(function () {// 头条小程序新增一个route属性
    $mp.page.route = $mp.page.is;
  });
  return $mp;
};
/**
    * 统一格式话 路由传递的参数 看看是编码还是非编码 做相应的对策
    *
    * @param {Object} query 当前的路由参数
    * @param {Boolean} getter 是从页面获取 route 对象下的参数 还是编码后传输
    */exports.getPageVmOrMp = getPageVmOrMp;
var getFormatQuery = function getFormatQuery() {var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var getter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (_config.Global.Router.CONFIG.encodeURI) {
    if (getter) {
      try {// 除去微信小程序都不需要 decodeURIComponent
        query = JSON.parse(decodeURIComponent(query.query) || '{}');
      } catch (e) {// 其他小程序
        query = JSON.parse(query.query || '{}');
      }
    } else {
      try {
        query = JSON.parse(decodeURIComponent(query.query || encodeURIComponent('{}')));
      } catch (e) {
        query = JSON.parse(query.query);
      }
    }
  }
  return query;
};
/**
    * @param {Number} index //需要获取的页面下标 -2:表示获取最后一个即当前页面 -1:表示全部 -3:当前页面的前一个页面
    * @param {Boolean} all //是否获取全部的页面
    */exports.getFormatQuery = getFormatQuery;
var getPages = function getPages() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);
  if (index === -1) {
    return pages;
  }
  if (index === -2) {
    return pages[pages.length - 1];
  }
  if (index === -3) {
    return pages[pages.length - 2];
  }
  return pages[index];
};
/**
    * 通过一个未知的路径或者名称 在路由表中查找指定路由表 并返回
    * @param {string} type   //path 或者 name
    * @param {Object} routes //当前对象的所有路由表
    */exports.getPages = getPages;
var pathOrNameToRoute = function pathOrNameToRoute(type) {var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.Global.Router.CONFIG.routes;
  var routesKeys = Object.keys(routes);
  for (var i = 0; i < routesKeys.length; i += 1) {
    var key = routesKeys[i];
    var item = routes[key];
    if (item.path === "/".concat(type)) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.path === type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.name == type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
  }
  (0, _warn.err)("\u5F53\u524D '".concat(type, "' \u5728\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684 name \u6216\u8005 path"));
};

/**
    * 获取 to 的配置参数
    * @param {Object} rule 当前跳转的规则
    */exports.pathOrNameToRoute = pathOrNameToRoute;
var formatTo = function formatTo(finalRoute) {
  var route = (0, _util.copyObject)(finalRoute.route);var
  rule = finalRoute.rule;
  route.query = rule.query || rule.params || {};
  return route;
};

/**
    * 获取 from 的配置参数 from 页面永远都是站在当前页面忘其它地方走 所以都是最后一个页面
    *
    * @param {Object} routes //当前对象的所有路由表
    */exports.formatTo = formatTo;
var formatFrom = function formatFrom(routes) {
  var topPage = getPages(-2);var _getPageVmOrMp =
  getPageVmOrMp(topPage, false),page = _getPageVmOrMp.page,query = _getPageVmOrMp.query;
  var route = pathOrNameToRoute(page.route, routes); // 获取到当前路由表下的 route
  route.query = getFormatQuery(query); // 不管是编码传输还是非编码 最后都得在 to/from 中换成json对象
  return route;
};

/**
    *
    * 把用户的跳转路由规则格式化成uni-app可用的路由跳转规则
    *
    * @param {Object} rule  //当前用户跳转的路由规则
    * @param {Object} routes //当前simple-router 下的路由表
    */exports.formatFrom = formatFrom;
var ruleToUniNavInfo = function ruleToUniNavInfo(rule, routes) {
  if (rule == null) {
    return (0, _warn.err)('当前跳转规则为空,请检查跳转代码');
  }
  // eslint-disable-next-line
  var navType = 'path',route = null,query = {};
  if (rule.constructor === String) {// 是字符串类型 那当前就是路径啦
    route = pathOrNameToRoute(rule, routes); // 直接把 rule 当 path 传递 完事
  } else if (rule.constructor === Object) {// 对象类型 可以是 path 或者 name
    route = pathOrNameToRoute(rule.path || (navType = 'name', rule.name), routes); // 两则必有其一 报错自己处理
    query = rule.query || rule.params || {};
  } else {
    return (0, _warn.err)('传的什么乱七八糟的类型?路由跳转规则只认字符串 \'path\' , 对象 \'path\' , 对象 \'name\' ');
  }
  // 路径处理完后   开始格式化参数
  var uniRoute = (0, _util.parseQuery)(route.path, query); // uni-app 需要的跳转规则
  return {
    rule: rule,
    route: route,
    uniRoute: uniRoute };

};
/**
    * 获取当前页面下的 Route 信息
    *
    * @param {Object} pages 获取页面对象集合
    * @param {Object} Vim 用户传递的当前页面对象
    */exports.ruleToUniNavInfo = ruleToUniNavInfo;
var AppletsPageRoute = function AppletsPageRoute(pages, Vim) {var
  query = {},path = '';
  var page = pages[pages.length - 1]; // 获取到当前页面
  if (pages.length > 0) {
    var uniQuery = getPageVmOrMp(page, false).query;
    query = getFormatQuery(uniQuery, true);
    path = page.route;
  } else if (Vim != null) {
    query = getFormatQuery(Vim.$mp.page.options, true);
    path = page.route;
  }
  var route = pathOrNameToRoute(path);
  route.query = query;
  return route;
};exports.AppletsPageRoute = AppletsPageRoute;

/***/ }),

/***/ 26:
/*!*****************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/helpers/compile.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.mp = exports.touTiao = exports.baiduApple = exports.notH5 = exports.applets = exports.APP = exports.H5 = void 0;var H5 = function H5(fn) {



};exports.H5 = H5;
var APP = function APP(fn) {



};exports.APP = APP;
var applets = function applets(fn) {

  fn();

};exports.applets = applets;
var notH5 = function notH5(fn) {

  fn();

};exports.notH5 = notH5;
var baiduApple = function baiduApple(fn) {



};exports.baiduApple = baiduApple;
var touTiao = function touTiao(fn) {



};exports.touTiao = touTiao;
var mp = function mp(fn) {

  fn();

};exports.mp = mp;

/***/ }),

/***/ 27:
/*!**************************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/appletsRouter/appletsNav.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _config = __webpack_require__(/*! ../helpers/config */ 14);
var _util = __webpack_require__(/*! ../helpers/util */ 13);


/**
                                         * @param {Object} finalRoute 格式化后的路由跳转规则
                                         * @param {Object} NAVTYPE 需要调用的跳转方法
                                         */
var appletsUniPushTo = function appletsUniPushTo(finalRoute, NAVTYPE) {
  return new Promise(function (resolve) {
    var query = (0, _util.formatURLQuery)("?".concat(finalRoute.uniRoute.query));var
    url = finalRoute.uniRoute.url;
    uni[_config.methods[NAVTYPE]]({
      url: url + query,
      complete: function complete() {
        resolve(url);
        _config.Global.LockStatus = false; // 跳转完成解锁状态
      } });

  });
};var _default =
appletsUniPushTo;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 28:
/*!*********************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/vueRouter/routerNav.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _warn = __webpack_require__(/*! ../helpers/warn */ 16);
var _util = __webpack_require__(/*! ./util */ 29);

/**
                                * @param {Object} replace vue-router的跳转方式
                                * @param {Object} rule 需要跳转到的路由匹配规则
                                * @param {Object} type 对应的官方跳转模式
                                *
                                * this 为当前 Router 实例
                                */
var H5PushTo = function H5PushTo(replace, rule, type) {
  if (this.$route == null) {
    return (0, _warn.err)('h5端路由为就绪，请检查调用代码');
  }
  rule = (0, _util.formatUserRule)(rule, this.selfRoutes, this.CONFIG);
  var objPath = (0, _util.strPathToObjPath)(rule);
  objPath.type = type;
  this.$route[replace](objPath);
};var _default =

H5PushTo;exports.default = _default;

/***/ }),

/***/ 29:
/*!****************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/vueRouter/util.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.diffRouter = exports.H5GetPageRoute = exports.getPages = exports.strPathToObjPath = exports.encodeURLQuery = exports.vueDevRouteProxy = exports.getRouterNextInfo = exports.formatUserRule = exports.nameToRute = exports.pathToRute = exports.getFuntionConfig = exports.fromatRoutes = exports.resloveChildrenPath = exports.resolveRender = void 0;var _warn = __webpack_require__(/*! ../helpers/warn */ 16);
var _util = __webpack_require__(/*! ../helpers/util */ 13);
var _proxy = __webpack_require__(/*! ./proxy/proxy */ 30);
var _config = __webpack_require__(/*! ../helpers/config */ 14);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var pagesConfigReg = /props:\s*\(.*\)\s*(\([\s\S]*\))\s*},/;
var pagesConfigRegCli = /props:\s*Object\.assign\s*(\([\s\S]*\))\s*},/; // 脚手架项目
var defRoutersReg = /props:\s*{([\s\S]+)}\s*},/;

/**
                                                  * 解析验证当前的 component 选项是否配置正确 只有vueRouterDev:false 才会调用此方法
                                                  * @param {Function|Object} component
                                                  * @param {Object} item
                                                  * @param {Boolean} useUniConfig
                                                  */
var resolveRender = function resolveRender(_ref,


item, useUniConfig) {var component = _ref.component,components = _ref.components;
  if (components != null) {
    (0, _warn.warn)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018components\u2019 \u65E0\u6548\uFF0C\r\n\r\n ".concat(JSON.stringify(item)));
  }
  if (useUniConfig == true) {// 采用uni-pages.json中的配置时component可以为空
    return false;
  }
  if (item.path == '*') {// 唯独这个情况在vue-router中可以不用component
    return true;
  }
  if (component == null) {
    return (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u4E2D \u2018component\u2019 \u9009\u9879\u4E0D\u80FD\u4E3A\u7A7A\uFF1A\r\n\r\n ".concat(JSON.stringify(item)));
  }
  if (component.constructor === Function) {
    item.component = {
      render: component };

  } else if (component.constructor === Object) {
    if (component.render == null || component.render.constructor !== Function) {
      (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018render\u2019 \u51FD\u6570\u7F3A\u5931\u6216\u7C7B\u578B\u4E0D\u6B63\u786E\uFF1A\r\n\r\n ".concat(JSON.stringify(item)));
    }
  } else {
    (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018component\u2019 \u9009\u9879\u4EC5\u652F\u6301 Function\u3001Object \u7C7B\u578B\u3002\u5E76\u786E\u4FDD Object \u7C7B\u578B\u65F6\u4F20\u9012\u4E86 \u2018render\u2019 \u51FD\u6570  \uFF1A\r\n\r\n ".concat(
    JSON.stringify(item)));

  }
};
/**
    * 递归解析 H5配置中有存在嵌套对象的情况,优先以path为key存储。没有则找aliasPath作为key
    * @param {Object} objRoutes
    * @param {Array} children
    * @param {Boolean} useUniConfig 是否使用pages.json下的页面配置
    */exports.resolveRender = resolveRender;
var resloveChildrenPath = function resloveChildrenPath(objRoutes, children, useUniConfig) {
  for (var i = 0; i < children.length; i += 1) {
    var item = children[i];
    resolveRender(item, item, useUniConfig);
    if (item.path != null) {
      objRoutes[item.path] = _objectSpread(_objectSpread({},
      item),
      {
        _ROUTERPATH: true // 使用page.json中的path为路径
      });

    } else {
      objRoutes[item.aliasPath] = _objectSpread(_objectSpread({},
      item),
      {
        _ROUTERPATH: false });


    }
    if (item.children && item.children.constructor === Array) {
      resloveChildrenPath(objRoutes, item.children, useUniConfig);
    }
  }
};
/**
    * 格式化原始路由表
    * @param {Object} routes  路由表
    * @param {Boolean} userRoute  是否为用户自己配置的路由表
    * @param {Boolean} H5CONFIG
    */exports.resloveChildrenPath = resloveChildrenPath;
var fromatRoutes = function fromatRoutes(routes, userRoute, _ref2)


{var vueRouterDev = _ref2.vueRouterDev,useUniConfig = _ref2.useUniConfig;
  if (userRoute && vueRouterDev) {// 如果是用户的路由表并且 完全采用vueRouter开发 则不作处理直接返回
    return routes;
  }
  var objRoutes = {};
  for (var i = 0; i < routes.length; i += 1) {
    var item = routes[i];
    var path = item.path === '/' ? item.alias : item.path;
    if (userRoute) {
      if (item.children && item.children.constructor === Array) {
        resloveChildrenPath(objRoutes, item.children, useUniConfig);
      }
      resolveRender(item, item, useUniConfig); // 是否使用pages.json下的页面配置
    }
    objRoutes[path] = _objectSpread(_objectSpread({},
    item),
    {
      _PAGEPATH: path.substring(1) });


  }
  return objRoutes;
};

/**
    * 解析vueRouter中 component 下 render函数中的配置信息
    * @param {String} FunStr
    */exports.fromatRoutes = fromatRoutes;
var getFuntionConfig = function getFuntionConfig(FunStr) {
  var matchText = FunStr.match(pagesConfigReg);
  var prefix = '';
  if (matchText == null) {// 是uni-app自带的默认路由及配置 也可能是脚手架项目
    matchText = FunStr.match(pagesConfigRegCli);
    if (matchText == null) {// 确认不是脚手架项目
      try {
        // eslint-disable-next-line
        matchText = FunStr.match(defRoutersReg)[1];
        // eslint-disable-next-line
        matchText = eval("Object.assign({".concat(matchText, "})"));
        prefix = 'system-';
      } catch (error) {
        (0, _warn.err)("\u8BFB\u53D6uni-app\u9875\u9762\u6784\u5EFA\u65B9\u6CD5\u914D\u7F6E\u9519\u8BEF \r\n\r\n ".concat(error));
      }
    } else {
      // eslint-disable-next-line
      matchText = eval("Object.assign".concat(matchText[1]));
    }
  } else {
    // eslint-disable-next-line
    matchText = eval("Object.assign".concat(matchText[1]));
  }
  return {
    config: matchText,
    prefix: prefix,
    FunStr: FunStr };

};
/**
    * 通过一个未知的路径名称 在路由表中查找指定路由表 并返回
    * @param {String} path //不管是aliasPath名的路径还是path名的路径
    * @param {Object} routes//当前对象的所有路由表
    */exports.getFuntionConfig = getFuntionConfig;
var pathToRute = function pathToRute(path, routes) {
  var PATHKEY = '';
  var rute = {};
  var routeKeys = Object.keys(routes);
  for (var i = 0; i < routeKeys.length; i += 1) {
    var key = routeKeys[i];
    var item = routes[key];
    rute = item;
    if (item.aliasPath == path) {// path参数是优先采用aliasPath为值得 所以可以先判断是否与aliasPath相同
      PATHKEY = 'aliasPath';
      break;
    }
    // eslint-disable-next-line
    if ("/".concat(item._PAGEPATH) == path) {// 路径相同
      PATHKEY = 'path';
      break;
    }
  }
  return {
    PATHKEY: _defineProperty({},
    PATHKEY, path),

    rute: rute };

};
/**
    * 通过一个路径name 在路由表中查找指定路由表 并返回
    * @param {String} name//实例化路由时传递的路径表中所匹配的对应路由name
    * @param {Object} routes//当前对象的所有路由表
    */exports.pathToRute = pathToRute;
var nameToRute = function nameToRute(name, routes) {
  var routesKeys = Object.keys(routes);
  for (var i = 0; i < routesKeys.length; i += 1) {
    var key = routesKeys[i];
    var item = routes[key];
    if (item.name == name) {
      return item;
    }
  }

  (0, _warn.err)("\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230 name\u4E3A:'".concat(name, "' \u7684\u8DEF\u7531"));
};
/**
    * 根据用户传入的路由规则 格式化成正确的路由规则
    * @param {Object} rule 用户需要跳转的路由规则
    * @param {Object} selfRoutes simple-router下的所有routes对象
    * @param {Object} CONFIG 当前路由下的所有配置信息
    */exports.nameToRute = nameToRute;
var formatUserRule = function formatUserRule(rule, selfRoutes, CONFIG) {
  var type = '';
  var ruleQuery = (type = 'query', rule.query || (type = 'params', rule.params)) || (type = '', {});
  var rute = {}; // 默认在router中的配置
  if (type == '' && rule.name != null) {// 那就是可能没有穿任何值咯
    type = 'params';
  }
  if (type != 'params') {
    var route = pathToRute(rule.path || rule, selfRoutes);
    if (Object.keys(route.PATHKEY)[0] == '') {
      (0, _warn.err)("'".concat(route.PATHKEY[''], "' \u8DEF\u5F84\u5728\u8DEF\u7531\u8868\u4E2D\u672A\u627E\u5230"));
      return null;
    }
    rute = route.rute;
    if (rule.path) {
      rule.path = rute.path;
    }
  }
  if (type != '') {// 当然是对象啦 这个主要是首页H5PushTo调用时的
    if (type == 'params' && CONFIG.h5.paramsToQuery) {// 如果是name规则并且设置了转query,那么就转path跳转了
      var _nameToRute =


      nameToRute(rule.name, selfRoutes),aliasPath = _nameToRute.aliasPath,path = _nameToRute.path;
      delete rule.name;
      delete rule.params;
      rule.path = aliasPath || path;
      type = 'query';
    }
    var query = _config.Global.$parseQuery.transfer(ruleQuery);
    if (CONFIG.encodeURI) {
      if (query != '') {
        rule[type] = {
          query: query.replace(/^query=/, '') };

      }
    } else {
      rule[type] = ruleQuery;
    }
  } else {// 纯字符串,那就只有是path啦
    rule = rute.path;
  }
  return rule;
};

/**
    * 根据是否获取非vue-Router next管道参数，来进行格式化
    *
    * @param {Object} to
    * @param {Object} from
    * @param {Router} Router  //router当前实例对象
    */exports.formatUserRule = formatUserRule;
var getRouterNextInfo = function getRouterNextInfo(to, from, Router) {var
  toRoute = to,fromRoute = from;
  var H5 = Router.CONFIG.h5;
  if (H5.vueNext === false && H5.vueRouterDev === false) {// 不采用vue-router中的to和from,需要格式化成Router中$Route获取的一样一样的
    var toPath = {},fromPath = {};
    toPath[to.meta.PATHKEY] = to.meta.PATHKEY === 'path' ? "/".concat(to.meta.pagePath) : "".concat(to.path);
    fromPath[from.meta.PATHKEY] = from.meta.PATHKEY === 'path' ? "/".concat(from.meta.pagePath) : "".concat(from.path);

    if (to.meta.PATHKEY == null) {// 未使用uni-pages.json中的配置、通过addRoutes时 meta.PATHKEY 可能未undefined
      toPath = pathToRute(to.path, Router.selfRoutes).PATHKEY;
    }
    if (from.meta.PATHKEY == null) {
      fromPath = pathToRute(from.path, Router.selfRoutes).PATHKEY;
    }

    var isEmptyTo = Object.keys(to.query).length != 0 ? (0, _util.copyObject)(to.query) : (0, _util.copyObject)(to.params);
    var isEmptyFrom = Object.keys(from.query).length != 0 ? (0, _util.copyObject)(from.query) : (0, _util.copyObject)(from.params);
    /* eslint-disable */
    delete isEmptyTo.__id__; // 删除uni-app下的内置属性
    delete isEmptyFrom.__id__;
    /* eslint-enable */
    var toQuery = _config.Global.$parseQuery.queryGet(isEmptyTo).decode;
    var fromQuery = _config.Global.$parseQuery.queryGet(isEmptyFrom).decode;
    toRoute = (0, _util.resolveRule)(Router, toPath, toQuery, Object.keys(toPath)[0]);
    fromRoute = (0, _util.resolveRule)(Router, fromPath, fromQuery, Object.keys(fromPath)[0]);
  } else {
    if (fromRoute.name == null && toRoute.name != null) {// 这种情况是因为uni-app在使用vue-router时搞了骚操作。
      fromRoute = _objectSpread(_objectSpread({},
      fromRoute),
      {
        name: toRoute.name });

      // 这个情况一般出现在首次加载页面
    }
  }
  return {
    toRoute: toRoute,
    fromRoute: fromRoute };

};exports.getRouterNextInfo = getRouterNextInfo;
var vueDevRouteProxy = function vueDevRouteProxy(routes, Router) {
  var proxyRoutes = [];
  for (var i = 0; i < routes.length; i += 1) {
    var item = routes[i];
    var childrenRoutes = Reflect.get(item, 'children');
    if (childrenRoutes != null) {
      var childrenProxy = vueDevRouteProxy(childrenRoutes, Router);
      item.children = childrenProxy;
    }
    var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, item);
    proxyRoutes.push(ProxyRoute);
  }
  return proxyRoutes;
};
/**
    * 组装成编码后的路由query传递信息
    * @param {Object} CONFIG simple-router 对象配置
    * @param {Object} query 传递的参数
    * @param {Object} mode 路由模式
    */exports.vueDevRouteProxy = vueDevRouteProxy;

var encodeURLQuery = function encodeURLQuery(CONFIG, query, mode) {
  if (Object.keys(query).length == 0) {// 没有传值的时候 我们啥都不管
    return '';
  }
  if (CONFIG.h5.vueRouterDev === false) {// 没有采取完全模式开发时 才转换
    var _Global$$parseQuery$q = _config.Global.$parseQuery.queryGet(query),strQuery = _Global$$parseQuery$q.strQuery,historyObj = _Global$$parseQuery$q.historyObj;
    if (mode === 'history') {
      return historyObj;
    }
    return strQuery;
  } // 完全彩种 vue-router 开发的时候 我们不用管
  if (mode === 'history') {// 此模式下 需要的就是对象
    return query;
  }
  return _config.Global.$parseQuery.stringify(query); // hash转成字符串拼接
};
/**
    * 把一个未知的路由跳转规则进行格式化为 hash、history 可用的,主要表现在 history模式下直接传入path会报错__id__错误的问题
    * @param {*} path 需要判断修改的路径规则
    */exports.encodeURLQuery = encodeURLQuery;
var strPathToObjPath = function strPathToObjPath(path) {
  if (path == null) {// 我们也不用管啦,这个情况是路由守卫中传递的
    return path;
  }
  if ((0, _util.isObject)(path)) {// 是对象我们不用管
    return path;
  }
  return { // 这种情况就是只有path时,直接返回path对象了
    path: path };

};
/**
    * 通过 getCurrentPages() api 获取指定页面的 page 对象 默认是获取当前页面page对象
    * @param {Number} index //需要获取的页面索引
    * @param {Boolean} all //是否获取全部的页面
    */exports.strPathToObjPath = strPathToObjPath;
var getPages = function getPages() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);
  return pages.reverse()[index];
};
/**
    * 获取当前页面下的 Route 信息
    *
    * @param {Object} pages 获取页面对象集合
    * @param {Object} Vim 用户传递的当前页面对象
    */exports.getPages = getPages;
var H5GetPageRoute = function H5GetPageRoute(pages, Vim) {
  if (pages.length > 0) {// 直接取当前页面的对象
    var currentRoute = pages[pages.length - 1].$route;
    return getRouterNextInfo(currentRoute, currentRoute, this).toRoute;
  }if (Vim && Vim.$route) {
    return getRouterNextInfo(Vim.$route, Vim.$route, this).toRoute;
  }
  return {};
};

/**
    * 在useUniConfig:true 的情况下重新拼装路由表 useUniConfig:false 不需要读取page.json中的数据 直接使用component作为页面组件
    * @param {Router} Router//unis-simple-router 路由对象
    * @param {vueRouter} vueRouter//vue-router对象
    * @param {Boolean} useUniConfig//是否采用uni-page.json中的配置选项
    * @param {Array} routes//需要循环的routes表
    */exports.H5GetPageRoute = H5GetPageRoute;
var diffRouter = function diffRouter(Router, vueRouter, useUniConfig, routes) {
  var newRouterMap = [];
  if (useUniConfig) {// 使用pages.json的样式配置 只是单纯的把url路径改成用户自定义的 保留uni的所以的配置及生命周期、缓存
    var Routes = routes || vueRouter.options.routes;
    var cloneSelfRoutes = (0, _util.copyObject)(Router.selfRoutes); // copy一个对象随便搞xxoo
    Routes.forEach(function (item) {
      var path = item.path === '/' ? item.alias : item.path;
      var vueRoute = Router.vueRoutes[path] || Router.vueRoutes[item.path] || Router.selfRoutes[path];
      var CselfRoute = Router.selfRoutes[path];
      delete cloneSelfRoutes[path]; // 移除已经添加到容器中的路由，用于最后做对比 是否page.json中没有，而实例化时传递了
      if (CselfRoute == null) {
        return (0, _warn.err)("\u8BFB\u53D6 \u2018pages.json\u2019 \u4E2D\u9875\u9762\u914D\u7F6E\u9519\u8BEF\u3002\u5B9E\u4F8B\u5316\u65F6\u4F20\u9012\u7684\u8DEF\u7531\u8868\u4E2D\u672A\u627E\u5230\u8DEF\u5F84\u4E3A\uFF1A".concat(
        path, " \r\n\r\n \u53EF\u4EE5\u5C1D\u8BD5\u628A \u2018useUniConfig\u2019 \u8BBE\u7F6E\u4E3A \u2018false\u2019\u3002\u6216\u8005\u914D\u7F6E\u6B63\u786E\u7684\u8DEF\u5F84\u3002\u5982\u679C\u4F60\u662F\u52A8\u6001\u6DFB\u52A0\u7684\u5219\u4E0D\u7528\u7406\u4F1A"));

      }
      var pageConfigJson = {
        config: {} };

      if (vueRoute.component) {
        pageConfigJson = getFuntionConfig(vueRoute.component.render.toString());
        CselfRoute.component = {
          render: function render(h) {return vueRoute.component.render(h);} };

      }
      delete CselfRoute.components; // useUniConfig:true 时不允许携带components
      delete CselfRoute.children; // useUniConfig:true 时不允许携带children
      CselfRoute.meta = _objectSpread(_objectSpread(_objectSpread({},
      pageConfigJson.config),
      item.meta || {}), {}, {
        PATHKEY: CselfRoute.aliasPath ? 'aliasPath' : 'path',
        pagePath: CselfRoute.path.substring(1) });

      CselfRoute.path = CselfRoute.aliasPath || (item.path === '/' ? item.path : CselfRoute.path);
      item.alias = item.path === '/' ? item.alias : CselfRoute.path; // 重新给vueRouter赋值一个新的路径，欺骗uni-app源码判断
      var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, CselfRoute);
      newRouterMap.push(ProxyRoute);
    });
    if (Object.keys(cloneSelfRoutes).length > 0) {// 确实page.json中没有，而实例化时传递了
      var testG = cloneSelfRoutes['*']; // 全局通配符,他是个例外'通配符'可以被添加
      if (testG && routes == null) {
        var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, Router.selfRoutes['*']);
        newRouterMap.push(ProxyRoute);
      }
      if (routes == null) {// 非动态添加时才打印警告
        var cloneSelfRoutesKeys = Object.keys(cloneSelfRoutes);
        for (var i = 0; i < cloneSelfRoutesKeys.length; i += 1) {
          var key = cloneSelfRoutesKeys[i];
          if (key !== '*') {// 通配符不警告
            (0, _warn.warn)("\u5B9E\u4F8B\u5316\u65F6\u4F20\u9012\u7684routes\u53C2\u6570\uFF1A\r\n\r\n ".concat(JSON.stringify(cloneSelfRoutes[key]), " \r\n\r\n \u5728pages.json\u4E2D\u672A\u627E\u5230\u3002\u81EA\u5B9A\u6392\u9664\u6389\uFF0C\u4E0D\u4F1A\u6DFB\u52A0\u5230\u8DEF\u7531\u4E2D"));
          }
        }
      }
    }
  } else {// 不使用任何的uni配置完全使用 完全使用component作为页面使用
    var _Routes = routes || Router.selfRoutes;
    var RoutesKeys = Object.keys(_Routes);
    for (var _i = 0; _i < RoutesKeys.length; _i += 1) {
      var _key = RoutesKeys[_i];
      var item = _Routes[_key];
      // eslint-disable-next-line
      if (item._ROUTERPATH != null) {// 不寻找children下的路径，只取第一层
        continue;
      }
      delete item.components;
      delete item.children;
      item.path = item.aliasPath || item.path; // 优先获取别名为路径
      if (item.path !== '*') {
        item.component = item.component.render || item.component; // render可能是用户使用addRoutes api进行动态添加的
      }
      item.meta = _objectSpread(_objectSpread({},
      item.meta || {}), {}, {
        PATHKEY: item.aliasPath ? 'aliasPath' : 'path',
        pagePath: item.path.substring(1) });

      var _ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, item);
      newRouterMap.push(_ProxyRoute);
    }
  }
  return newRouterMap;
};exports.diffRouter = diffRouter;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!***********************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/vueRouter/proxy/proxy.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.proxyEachHooks = exports.proxyBeforeEnter = void 0;var _concat = __webpack_require__(/*! ../concat */ 31);
var _base = __webpack_require__(/*! ../base */ 15);
var _myArray = _interopRequireDefault(__webpack_require__(/*! ../extends/myArray */ 32));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                    * 通过 Object.defineProperty 代理一个对象主要是拦截beforeEnter 生命钩子
                                                                                                                                                                    * @param {Router} Router  路由实例对象
                                                                                                                                                                    * @param {Object} BeProxy 需要代理的路由表
                                                                                                                                                                    */
var proxyBeforeEnter = function proxyBeforeEnter(Router, BeProxy) {
  var proxyDc = Object.create(null); // 创建没有继承的属性
  var BeProxyKeys = Object.keys(BeProxy);var _loop = function _loop(
  i) {
    var key = BeProxyKeys[i];
    Object.defineProperty(proxyDc, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        var value = BeProxy[key];
        if (key == 'beforeEnter' && value !== undefined) {
          return function (to, from, next) {
            (0, _concat.beforeEnterHooks)(to, from, next, value, Router);
          };
        }
        return value;
      },
      set: function set(v) {
        BeProxy[key] = v;
      } });};for (var i = 0; i < BeProxyKeys.length; i += 1) {_loop(i);

  }
  return proxyDc;
};

/**
    * 在uni-app没有注入生命周期时先直接代理相关生命周期数组
    * @param {Object} Router
    * @param {Object} key
    * @param {Funtion} hookFun
    */exports.proxyBeforeEnter = proxyBeforeEnter;
var proxyEachHooks = function proxyEachHooks(Router, key, hookFun) {
  var vueOldHooks = _base.vuelifeHooks[key];
  return new _myArray.default(Router, vueOldHooks, hookFun);
};exports.proxyEachHooks = proxyEachHooks;

/***/ }),

/***/ 31:
/*!******************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/vueRouter/concat.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.registerRouter = exports.triggerLifeCycle = exports.beforeHooks = exports.afterHooks = exports.beforeEnterHooks = exports.forMatNext = exports.appMount = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));var _warn = __webpack_require__(/*! ../helpers/warn */ 16);
var _util = __webpack_require__(/*! ./util */ 29);


var _util2 = __webpack_require__(/*! ../helpers/util */ 13);
var _base = __webpack_require__(/*! ./base */ 15);
var _config = __webpack_require__(/*! ../helpers/config */ 14);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var beforeEachCount = 0;
var afterEachCount = 0;
var resolveLaunch = null;
var beforeEnterDep = []; // 记录当前是否有重复的页面进入 避免重复触发
var beforeEachLaunch = new Promise(function (resolve) {return resolveLaunch = resolve;});

/**
                                                                                           * 把vue实例进行挂载到dom下
                                                                                           * @param {Router} Router uni-simple-router实例对象
                                                                                           */
var appMount = function appMount() {
  if (_base.vueMount.length == 0) {
    return (0, _warn.err)('检测到您未进行dom模型挂载操作，请调用api\r\n\r\n RouterMount(Vim: any, el: any): void');
  }var _vueMount$ =



  _base.vueMount[0],Vim = _vueMount$.Vim,el = _vueMount$.el;
  var formatEl = el;
  if (el == null) {
    formatEl = '#app'; // 这是uni-app在h5中的官方节点
  }
  try {
    Vim.$mount(formatEl);
  } catch (error) {
    (0, _warn.warn)("\u6302\u8F7Dvue\u8282\u70B9\u65F6\u9519\u8BEF\u5566".concat(error));
  }
};

/**
    * 格式化 next传递过来的参数 作为vue-router可用的
    * @param {Object} to//即将跳转到的路由页面
    * @param {*} Intercept
    * @param {Funtion} next//路由连接管道
    * @param {Router} Router//路由对象
    */exports.appMount = appMount;
var forMatNext = function forMatNext(to, Intercept, next, Router) {var
  CONFIG = Router.CONFIG,selfRoutes = Router.selfRoutes;
  if (CONFIG.h5.vueRouterDev) {// 完全使用vue-router开发的时候 vueRouterDev:true 不用做啥直接略过
    next(Intercept);
    return Intercept;
  }
  if (typeof Intercept === 'object') {// 只有是对象类型的时候 我们才进行格式化
    var navType = Reflect.get(Intercept, 'NAVTYPE');
    delete Intercept.NAVTYPE;
    if (navType == 'push') {
      Intercept.replace = false;
      Intercept.type = 'navigateTo';
    } else {
      Intercept.replace = true; // uni-app导航api所谓的NAVTYPE取值在h5都是replace:true
      Intercept.type = 'reLaunch';
    }
    var name = Reflect.get(Intercept, 'name'); // 统一格式化path
    Intercept.query = Intercept.params || Intercept.query;
    delete Intercept.name;
    delete Intercept.params;
    if (Intercept.query == null) {
      Intercept.query = {};
    }
    if (name != null) {var _nameToRute =
      (0, _util.nameToRute)(name, selfRoutes),aliasPath = _nameToRute.aliasPath,path = _nameToRute.path;
      Intercept.path = aliasPath || path;
    } else {// 当设置别名时可以是别名跳转也可以path跳转
      Intercept.path = Reflect.get(Intercept, 'path');
      var rute = (0, _util.formatUserRule)(Intercept.path, selfRoutes, CONFIG);
      if (rute == null) {
        return false;
      }
      Intercept.path = rute;
    }
    if (CONFIG.encodeURI) {// 如果设置的编码传递则进行编码后传递
      var query = encodeURIComponent(JSON.stringify(Intercept.query));
      var formatQuery = (0, _util2.formatURLQuery)(query);
      Intercept.query = {};
      if (formatQuery != '') {
        Intercept.query.query = formatQuery;
      }
    }
  } else if (Intercept != null && Intercept.constructor === String) {
    Intercept = (0, _util.formatUserRule)(Intercept, selfRoutes, CONFIG);
  }
  var objPath = Intercept;
  if (Intercept != null && Intercept.constructor !== Boolean) {
    objPath = (0, _util.strPathToObjPath)(Intercept);
    if (objPath != null) {
      var type = Reflect.get(objPath, 'type');
      if (type == null) {// 当next()是一个路径时
        objPath.type = 'navigateTo';
      }
    }
  } else if (Intercept === false) {
    Router.lifeCycle.routerAfterHooks[0].call(Router, { H5Intercept: true });
  }
  next(objPath); // 统一格式化为对象的方式传递
  return Intercept;
};
/**
    *  v1.5.4+
    * beforeRouteLeave 生命周期
    * @param {Object} to       将要去的那个页面 vue-router to对象
    * @param {Object} from     从那个页面触发的 vue-router from对象
    * @param {Object} next      vue-router beforeEach next管道函数
    * @param {Object} Router   Router路由对象
    */exports.forMatNext = forMatNext;
var beforeRouteLeaveHooks = function beforeRouteLeaveHooks(to, from, next, Router) {
  return new Promise(function (resolve) {var
    currentRoute = Router.$route.currentRoute;
    if (currentRoute.path == to.path) {// 如果是同一个页面直接返回  不执行页面中的Leave事件
      return resolve();
    }
    var page = (0, _util.getPages)(); // 获取到当前的页面对象
    if (page == null || page._HHYANGbeforeRouteLeaveCalled) {
      (0, _warn.warn)('当前环境下无须执行 beforeRouteLeave。 原因：1.page等于null  2.真的的无须执行');
      return resolve();
    }
    var beforeRouteLeaveArray = page.$options.beforeRouteLeave; // 获取到页面下的 beforeRouteLeave 路由守卫
    if (beforeRouteLeaveArray == null) {// 当前页面没有预设 beforeRouteLeave 啥都不做
      return resolve();
    }var _getRouterNextInfo =
    (0, _util.getRouterNextInfo)(to, from, Router),toRoute = _getRouterNextInfo.toRoute,fromRoute = _getRouterNextInfo.fromRoute;
    var beforeRouteLeave = beforeRouteLeaveArray[0]; // 不管怎么样 只执行第一个钩子  其他都不管
    beforeRouteLeave.call(page, toRoute, fromRoute, function (Intercept) {// 开始执行生命周期
      if (Intercept == null) {// 放行状态  直接返回
        return resolve();
      }
      page._HHYANGbeforeRouteLeaveCalled = true; // 标记一下当前已经做过 beforeRouteLeave 啦
      forMatNext(to, Intercept, next, Router); // 直接交给vue-router 处理
    });
  });
};

/**
    * 修复首页beforeEnter执行两次的问题 https://github.com/SilurianYang/uni-simple-router/issues/67
    *
    * beforeEnter 生命周期
    * @param {Object} to
    * @param {Object} from
    * @param {Object} next
    * @param {Object} userHooks
    * @param {Object} Router
    */
var beforeEnterHooks = function beforeEnterHooks(to, from, next, userHooks, Router) {
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {var res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!

              beforeEnterDep.includes(to.path)) {_context2.next = 3;break;}
              next();return _context2.abrupt("return",
              resolve());case 3:

              beforeEnterDep = [to.path];if (!

              Reflect.get(Router, 'H5RouterReady')) {_context2.next = 11;break;}_context2.next = 7;return (
                new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolveNext) {var _getRouterNextInfo2, toRoute, fromRoute;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_getRouterNextInfo2 =



                            (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo2.toRoute, fromRoute = _getRouterNextInfo2.fromRoute;_context.next = 3;return (
                              userHooks(toRoute, fromRoute, resolveNext));case 3:case "end":return _context.stop();}}}, _callee);}));return function (_x2) {return _ref2.apply(this, arguments);};}()));case 7:res = _context2.sent;

              forMatNext(to, res, next, Router);_context2.next = 12;break;case 11:

              next();case 12:

              resolve();case 13:case "end":return _context2.stop();}}}, _callee2);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * vueAfter 生命周期
    * @param {Object} to
    * @param {Object} from
    * @param {Object} next
    * @param {Object} Router
    */exports.beforeEnterHooks = beforeEnterHooks;
var afterHooks = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(to, from, next, Router) {var _getRouterNextInfo3, toRoute, fromRoute;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            _base.vuelifeHooks.afterHooks[0](to, from);if (!
            _config.lifeCycle.afterHooks[0]) {_context3.next = 10;break;}if (!(
            afterEachCount === 0)) {_context3.next = 6;break;}_context3.next = 5;return (
              beforeEachLaunch);case 5:
            appMount(Router);case 6:_getRouterNextInfo3 =




            (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo3.toRoute, fromRoute = _getRouterNextInfo3.fromRoute;
            _config.lifeCycle.afterHooks[0](toRoute, fromRoute);_context3.next = 11;break;case 10:
            if (afterEachCount === 0) {
              appMount(Router);
            }case 11:
            afterEachCount += 1;
            Router.lifeCycle.routerAfterHooks[0].call(Router);case 13:case "end":return _context3.stop();}}}, _callee3);}));return function afterHooks(_x3, _x4, _x5, _x6) {return _ref3.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                        * vueBefore 生命周期
                                                                                                                                                                                                                        * @param {Object} to       将要去的那个页面 vue-router to对象
                                                                                                                                                                                                                        * @param {Object} from     从那个页面触发的 vue-router from对象
                                                                                                                                                                                                                        * @param {Object} next      vue-router beforeEach next管道函数
                                                                                                                                                                                                                        * @param {Object} H5Config
                                                                                                                                                                                                                        */exports.afterHooks = afterHooks;
var beforeHooks = function beforeHooks(to, from, next, Router) {
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(resolve) {var H5;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                Router.lifeCycle.routerbeforeHooks[0].call(Router));case 2:_context6.next = 4;return (
                beforeRouteLeaveHooks(to, from, next, Router));case 4: // 执行1.5.4+ beforeRouteLeave生命钩子
              H5 = Router.CONFIG.h5;
              _base.vuelifeHooks.beforeHooks[0](to, from, /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(Intercept) {var res, beforeIntercept, selfRoutes, beforeEnter;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:if (!(
                          Intercept != null && H5.keepUniIntercept === true && H5.vueRouterDev === false)) {_context5.next = 5;break;}
                          next(Intercept);
                          (0, _warn.warn)('uni-app 内部强制触发跳转拦截');
                          beforeEachCount += 1;return _context5.abrupt("return",
                          resolve());case 5:if (


                          _config.lifeCycle.beforeHooks[0]) {_context5.next = 10;break;}
                          next();
                          beforeEachCount += 1;
                          resolveLaunch();return _context5.abrupt("return",
                          resolve());case 10:_context5.next = 12;return (

                            new Promise( /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolveNext) {var _getRouterNextInfo4, toRoute, fromRoute;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_getRouterNextInfo4 =



                                        (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo4.toRoute, fromRoute = _getRouterNextInfo4.fromRoute;_context4.next = 3;return (
                                          _config.lifeCycle.beforeHooks[0](toRoute, fromRoute, resolveNext));case 3:case "end":return _context4.stop();}}}, _callee4);}));return function (_x9) {return _ref6.apply(this, arguments);};}()));case 12:res = _context5.sent;

                          beforeIntercept = forMatNext(to, res, next, Router);if (!(
                          beforeEachCount == 0 && beforeIntercept == null && to.meta.isTabBar)) {_context5.next = 20;break;} // 首次触发beforeEach，并且首页没有进行跳转的情况下才触发beforeEnter 主要是keep-alive

                          selfRoutes =
                          Router.selfRoutes;
                          beforeEnter = Reflect.get(selfRoutes["/".concat(to.meta.pagePath)], 'beforeEnter');if (!
                          beforeEnter) {_context5.next = 20;break;}_context5.next = 20;return (
                            beforeEnterHooks(to, from, next, beforeEnter, Router));case 20:


                          beforeEachCount += 1;
                          resolveLaunch();
                          resolve();case 23:case "end":return _context5.stop();}}}, _callee5);}));return function (_x8) {return _ref5.apply(this, arguments);};}());case 6:case "end":return _context6.stop();}}}, _callee6);}));return function (_x7) {return _ref4.apply(this, arguments);};}());


};
/**
    * 通过自动调用router api来完成触发生命周期
    * 修复 history 模式下报错的问题  https://github.com/SilurianYang/uni-simple-router/issues/38
    * 修复 history 模式下刷新页面参数丢失的问题 https://github.com/SilurianYang/uni-simple-router/issues/45
    * 修复 history 模式下首次打开页面url错误时不走 path:* 的匹配项  https://github.com/SilurianYang/uni-simple-router/issues/58
    *
    * @param {Object} Router //当前simple-router 对象
    * @param {Object} vueRouter vue-router对象
    */exports.beforeHooks = beforeHooks;
var triggerLifeCycle = function triggerLifeCycle(Router, vueRouter) {var
  CONFIG = Router.CONFIG;
  var currRoute = vueRouter.currentRoute;
  if (vueRouter.mode === 'hash') {var

    query =

    currRoute.query,path = currRoute.path;

    var URLQuery = (0, _util.encodeURLQuery)(CONFIG, query, 'hash');

    vueRouter.replace("".concat(path).concat(URLQuery));
  } else {var _getRouterNextInfo5 =


    (0, _util.getRouterNextInfo)(currRoute, currRoute, Router),toRoute = _getRouterNextInfo5.toRoute;
    var _URLQuery = (0, _util.encodeURLQuery)(CONFIG, currRoute.query, 'history');
    vueRouter.replace({
      path: toRoute.aliasPath || toRoute.path || currRoute.path,
      query: _URLQuery,
      type: 'redirectTo' });

  }
};

/** 注册自定义的路由到vue-router中 前提是必须使用vueRouter开发模式
    * @param {Object} Router
    * @param {Object} vueRouter
    * @param {Boolean} vueRouterDev
    */exports.triggerLifeCycle = triggerLifeCycle;
var registerRouter = function registerRouter(Router, vueRouter, vueRouterDev) {
  var routeMap = [];
  if (!vueRouterDev) {// 则进行对比两个路由表  主要工作是做路径的优化
    routeMap = (0, _util.diffRouter)(Router, vueRouter, Router.CONFIG.h5.useUniConfig);
  } else {// 完全使用vue-router开发时直接采用开发者的路由表
    routeMap = (0, _util.vueDevRouteProxy)(Router.CONFIG.routes, Router);
  }
  var createRouter = function createRouter() {return new vueRouter.constructor({
      base: vueRouter.options.base,
      mode: vueRouter.options.mode,
      routes: routeMap });};

  var router = createRouter();
  vueRouter.matcher = router.matcher;
  _config.Global.vueRouter = vueRouter; // 把当前vueRouter缓存到全局对象中
  _config.Global.RouterReadyPromise(); // router已经准备就绪 调用promise.resolve();
  Router.H5RouterReady = true; // 并挂载到Router对象下
  // 注册完成所有的钩子及相关参数，手动触发Router的生命周期
  setTimeout(function () {
    triggerLifeCycle(Router, vueRouter);
  });
};exports.registerRouter = registerRouter;

/***/ }),

/***/ 32:
/*!***************************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/vueRouter/extends/myArray.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * 实现一个继承的 数组类  代理掉 vue-router 生命钩子的数据
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */var
MyArray = /*#__PURE__*/function (_Array) {_inherits(MyArray, _Array);var _super = _createSuper(MyArray);
  function MyArray(Router, vueOldHooks, hookFun) {var _this;_classCallCheck(this, MyArray);
    _this = _super.call(this);
    _this.Router = Router;
    _this.vueOldHooks = vueOldHooks;
    _this.hookFun = hookFun;return _this;
  }_createClass(MyArray, [{ key: "push", value: function push(

    v) {var _this2 = this;
      this.vueOldHooks.splice(0, 1, v); // 把vue-router路由生命钩子保存起来
      this[this.length] = function (to, from, next) {
        _this2.hookFun(to, from, next, _this2.Router);
      };
    } }]);return MyArray;}( /*#__PURE__*/_wrapNativeSuper(Array));var _default =


MyArray;exports.default = _default;

/***/ }),

/***/ 33:
/*!*****************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/lifeCycle/hooks.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.registerRouterHooks = exports.registerHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));var _util = __webpack_require__(/*! ../helpers/util */ 13);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}







var registerHook = function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) list.splice(i, 1);
  };
};
/**
    * 注册全局Router生命钩子
    */exports.registerHook = registerHook;
var registerRouterHooks = function registerRouterHooks() {
  registerHook(this.lifeCycle.routerbeforeHooks, function () {var _this = this;
    return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                _this.CONFIG.routerBeforeEach(); // 触发暴露给开发者的生命钩子
                if ((0, _util.appPlatform)(true) === 'H5') {
                  H5PATCH.on('toogle', 'startLodding');
                }return _context.abrupt("return",
                resolve(true));case 3:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

  });
  registerHook(this.lifeCycle.routerAfterHooks, function () {var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (res.H5Intercept !== true) {
      this.CONFIG.routerAfterEach(); // 触发暴露给开发者的生命钩子
    }
    if ((0, _util.appPlatform)(true) === 'H5') {
      H5PATCH.on('toogle', 'stopLodding');
    }
    return true;
  });
};exports.registerRouterHooks = registerRouterHooks;

/***/ }),

/***/ 34:
/*!*********************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/patch/applets-patch.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
/**
                                                                                                      * 截止 1.3.5 版本 不做任何操作
                                                                                                      * @param {element} el dom节点
                                                                                                      */
var appletsMount = function appletsMount(Vim) {
  Vim.$mount();
};var _default =

appletsMount;exports.default = _default;

/***/ }),

/***/ 35:
/*!*****************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/patch/app-patch.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 截止 1.3.5 版本 不做任何操作
                                                                                                      * @param {element} el dom节点
                                                                                                      */
var appMount = function appMount(Vim) {
  Vim.$mount();
};var _default =
appMount;exports.default = _default;

/***/ }),

/***/ 36:
/*!****************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/helpers/mixins.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! ./config */ 14);
var _init = _interopRequireDefault(__webpack_require__(/*! ../vueRouter/init */ 37));
var _init2 = __webpack_require__(/*! ../appRouter/init */ 38);
var _init3 = _interopRequireDefault(__webpack_require__(/*! ../appletsRouter/init */ 39));
var _util = __webpack_require__(/*! ./util */ 13);
var _hooks = __webpack_require__(/*! ../appRouter/hooks */ 18);
var _hooks2 = __webpack_require__(/*! ../appletsRouter/hooks */ 24);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 获取一些需要在各个平台混入的事件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Object} Router 当前原始路由对象
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var getMixins = function getMixins(Router) {
  return {
    H5: {
      beforeCreate: function beforeCreate() {
        if (this.$options.router) {
          (0, _init.default)(Router.$root, this.$options.router, this);
        }
      } },

    APP: {
      onLaunch: function onLaunch() {
        _config.uniAppHook.onLaunched = true; // 标志已经触发了 onLaunch 事件
        _init2.appInit.call(this, Router.$root);
      },
      onLoad: function onLoad() {
        // 第一个页面 拦截所有生命周期
        if (_config.uniAppHook.onLaunched && !_config.uniAppHook.pageReady) {
          _config.uniAppHook.onLaunched = false;
          _hooks.proxyIndexHook.call(this, Router.$root);
        }
        (0, _init2.removeBackPressEvent)(this.$mp.page, this.$options); // 移除页面的onBackPress事件
      },
      onBackPress: function onBackPress() {for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
        return _init2.pageIsHeadBack.call(Router.$root, this.$mp.page, this.$options, args);
      } },

    APPLETS: {
      onLaunch: function onLaunch() {
        _config.uniAppHook.onLaunched = true; // 标志已经触发了 onLaunch 事件
        _init3.default.call(this, Router.$root);
      },
      onLoad: function onLoad() {
        if (_config.uniAppHook.onLaunched && !_config.uniAppHook.pageReady) {// 必须是第一个页面
          _config.uniAppHook.onLaunched = false;
          _hooks2.appletsProxyIndexHook.call(this, Router.$root);
        }
      } } };


};

var initMixins = function initMixins(Vue, Router) {
  Vue.mixin(_objectSpread({},
  getMixins(Router)[(0, _util.appPlatform)(true)]));

};var _default =

initMixins;exports.default = _default;

/***/ }),

/***/ 37:
/*!****************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/vueRouter/init.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _concat = __webpack_require__(/*! ./concat */ 31);
var _util = __webpack_require__(/*! ./util */ 29);
var _warn = __webpack_require__(/*! ../helpers/warn */ 16);
var _proxy = __webpack_require__(/*! ./proxy/proxy */ 30);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 重写掉H5端 uni-app原始存在的bug
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @param {Object} Router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */
var rewriteUniFun = function rewriteUniFun(Router) {
  if (Router.CONFIG.h5.rewriteFun === false) {// 不需要重写
    return false;
  }
  uni.reLaunch = function (_ref)

  {var url = _ref.url;
    if (url === '/') {
      (0, _warn.warn)('H5端 uni.reLaunch(\'/\')时 默认被重写了! 你可以使用 this.$Router.replaceAll() 或者 uni.reLaunch(\'/\'?xxx)');
      // eslint-disable-next-line
      if (history.length > 1) {// 只有在有历史记录的时候才返回  不然直接返回首页
        return Router.back();
      }
      return Router.replaceAll('/');
    }
    var path = url.match(/^[^?]+|(\/)/)[0];
    try {
      var query = {};
      url.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
        query[v] = decodeURIComponent(k);
        return "".concat(k, "=").concat(v);
      });
      Router.replaceAll({
        path: path,
        query: query });

    } catch (e) {
      (0, _warn.err)("".concat(url, "\u89E3\u6790\u5931\u8D25\u4E86....  \u8BD5\u8BD5 this.$Router.replaceAll() \u5427"));
    }
  };
  uni.navigateBack = function (delta) {
    var backLayer = delta;
    if (delta.constructor === Object) {// 这种可能就只是uni-app自带的返回按钮,还有种可能就是开发者另类传递的
      backLayer = 1;
    }
    Router.back(backLayer, delta);
  };
};
/**
    * 拦截并注册vueRouter中的生命钩子，路由表解析
    * @param {Object} Router
    * @param {vueRouter} vueRouter
    */
var init = function init(Router, vueRouter) {
  var CONFIG = Router.CONFIG.h5;
  vueRouter.afterHooks = (0, _proxy.proxyEachHooks)(Router, 'afterHooks', _concat.afterHooks);
  vueRouter.beforeHooks = (0, _proxy.proxyEachHooks)(Router, 'beforeHooks', _concat.beforeHooks);
  var objVueRoutes = (0, _util.fromatRoutes)(vueRouter.options.routes, false, {}); // 返回一个格式化好的routes 键值对的形式
  var objSelfRoutes = (0, _util.fromatRoutes)(Router.CONFIG.routes, true, CONFIG);
  Router.vueRoutes = objVueRoutes; // 挂载vue-routes到当前的路由下
  Router.selfRoutes = _objectSpread(_objectSpread({},
  Router.selfRoutes || {}),
  objSelfRoutes);
  // 挂载self-routes到当前路由下
  Router.$route = vueRouter; // 挂载vue-router到$route
  rewriteUniFun(Router); // 重新掉uniapp上的一些有异常的方法
  (0, _concat.registerRouter)(Router, vueRouter, CONFIG.vueRouterDev);
};var _default =
init;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 38:
/*!****************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/appRouter/init.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.appInit = exports.pageIsHeadBack = exports.removeBackPressEvent = exports.registerLoddingPage = exports.rewriteUniFun = void 0;var _hooks = __webpack_require__(/*! ./hooks */ 18);


var _config = __webpack_require__(/*! ../helpers/config */ 14);
var _util = __webpack_require__(/*! ./util */ 22);
var _warn = __webpack_require__(/*! ../helpers/warn */ 16);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 重写掉uni-app的 uni.getLocation 和 uni.chooseLocation APi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Object} Router  当前路由对象
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var rewriteUniFun = function rewriteUniFun(Router) {
  var oldSwitchTab = uni.switchTab; // 缓存 跳转到 tabBar 页面
  uni.switchTab = function (_ref) {var url = _ref.url,args = _objectWithoutProperties(_ref, ["url"]);var normal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (normal === true || _config.uniAppHook.pageReady === false) {// 调用原始的uni-app  api
      oldSwitchTab(_objectSpread({
        url: url },
      args));

    } else {
      if (_config.uniAppHook.pageReady) {// 只有在路由守卫等  处理完所有操作后才能触发
        var path = Router.$Route.path; // 获取当前路径
        if (path == url) {// 路径相同不执行
          return (0, _warn.warn)("\u5F53\u524D\u8DF3\u8F6C\u8DEF\u5F84\uFF1A".concat(url, "  \u5DF2\u5728\u672C\u9875\u9762\u65E0\u987B\u8DF3\u8F6C"));
        }
        _hooks.beforeTabHooks.call(Router, url.substring(1)); // 不要 /
      } else {
        (0, _warn.warn)('路由守卫正在忙碌中 不允许执行 ‘uni.switchTab’');
      }
    }
  };
};

/**
    * 对当前app做一个动画页面 用来过渡首次next 等待时间过长的尴尬
    * @param {Object} Router 当前路由对象
    */exports.rewriteUniFun = rewriteUniFun;
var registerLoddingPage = function registerLoddingPage(Router) {var _Router$CONFIG$APP =
  Router.CONFIG.APP,loddingPageHook = _Router$CONFIG$APP.loddingPageHook,loddingPageStyle = _Router$CONFIG$APP.loddingPageStyle; // 获取app所有配置
  var view = new plus.nativeObj.View('router-loadding', _objectSpread({
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%' },
  loddingPageStyle.call(Router)));

  loddingPageHook.call(Router, view); // 触发等待页面生命周期
};
/**
    * 移除当前 页面上 非router 声明的 onBackPress 事件
    * @param {Object} page 当前 vue 组件对象
    * @param {Object} options	当前page对象的 $options
    * 修复 https://github.com/SilurianYang/uni-simple-router/issues/106
    */exports.registerLoddingPage = registerLoddingPage;
var removeBackPressEvent = function removeBackPressEvent(page, options) {
  var isBack = (0, _util.assertCanBack)(page);
  if (isBack) {// 可返回
    options.onBackPress = [options.onBackPress[0]]; // 路由混入的都干掉
  }
};
/**
    * 判断当前页面是否需要拦截返回
    *
    * @param {Object} page 当前 vue 组件对象
    * @param {Object} options 当前 vue 组件对象下的$options对象
    * @param {Array} args  当前页面是点击头部返回还是底部返回
    * 修复 https://github.com/SilurianYang/uni-simple-router/issues/66
    *
    * this 为当前 Router 对象
    */exports.removeBackPressEvent = removeBackPressEvent;
var pageIsHeadBack = function pageIsHeadBack(page, options, args) {
  if (args[0].from == 'navigateBack') {// 调用api返回
    if (_config.Global.LockStatus) {// 正在跳转的时候 返回按键按的太快啦
      (0, _warn.warn)('当前页面正在处于跳转状态，请稍后再进行跳转....');
      return true;
    }
    _config.Global.LockStatus = true; // 设置为锁住状态
    _hooks.backApiCallHook.call(this, options, args);
    return true;
  }
  var isBack = (0, _util.assertCanBack)(page);
  if (isBack) {// 可返回
    if (_config.Global.LockStatus) {// 正在跳转的时候 返回按键按的太快啦
      (0, _warn.warn)('当前页面正在处于跳转状态，请稍后再进行跳转....');
      return true;
    }
    _config.Global.LockStatus = true; // 设置为锁住状态
    _hooks.beforeBackHooks.call(this, options, args);
    return true;
  }
  return false;
};

/**
    * 开始初始化app端路由配置
    *
    * @param {Object} Router
    *
    * this 为当前 page 对象
    */exports.pageIsHeadBack = pageIsHeadBack;
var appInit = function appInit(Router) {
  _hooks.proxyLaunchHook.call(this);var
  holdTabbar = Router.CONFIG.APP.holdTabbar;
  if (holdTabbar) {// 开启tab拦截时
    rewriteUniFun(Router);
  }
  registerLoddingPage(Router);
};exports.appInit = appInit;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 39:
/*!********************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/appletsRouter/init.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _hooks = __webpack_require__(/*! ./hooks */ 24);

/**
                                                                                                                                      * 开始初始化app端路由配置
                                                                                                                                      *
                                                                                                                                      * @param {Object} Router 	当前Router对象
                                                                                                                                      *
                                                                                                                                      * this 为当前 page 对象
                                                                                                                                      */
var appletsInit = function appletsInit() {
  _hooks.proxyLaunchHook.call(this);
};var _default =
appletsInit;exports.default = _default;

/***/ }),

/***/ 4:
/*!**************************************!*\
  !*** F:/Project/想玩/想玩商家端/pages.json ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!******************************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/node_modules/uni-simple-router/helpers/urlQuery.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! ./config */ 14);
var _warn = __webpack_require__(/*! ./warn */ 16);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var nodeURL = __webpack_require__(/*! query-string */ 41);var

ParseQuery = /*#__PURE__*/function () {function ParseQuery() {_classCallCheck(this, ParseQuery);}_createClass(ParseQuery, [{ key: "isDepthObject",




    /**
                                                                                                                                                    * 判断当前这个对象是否为深度对象
                                                                                                                                                    * @param {Object} obj
                                                                                                                                                    */value: function isDepthObject(
    obj) {
      var str = JSON.stringify(obj);
      return str.match(/}/g).length > 1;
    }

    /**
       * 从URL中提取查询字符串
       * @param {String} url
       */ }, { key: "extract", value: function extract(
    url) {
      return nodeURL.extract(url);
    }

    /**
       * 把一个 key=value&key1=value 的字符串转成对象
       * @param {string} strQuery key=value&key1=value 类型的字符串
       */ }, { key: "parse", value: function parse(
    strQuery) {
      return nodeURL.parse(strQuery);
    }

    /**
       * 把一个对象转成 key=value&key1=value 类型的字符串
       * @param {Object} ObjQuery 符合js标注的对象
       * @param {Boolean} intact 是否在转成的字符串前添加？号
       */ }, { key: "stringify", value: function stringify(
    ObjQuery) {var intact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var strQuery = nodeURL.stringify(ObjQuery);
      if (intact) {
        return "?".concat(strQuery);
      }
      return strQuery;
    }

    /**
       * 把一个对象或者 key=value&key1=value 类型的数据加密成 query=encodeURIComponent(value)
       * @param {Object|String} query 符合js标注的对象 或者 key=value&key1=value 字符串
       * @param {Boolean} intact 是否在转成的字符串前添加？号
       */ }, { key: "encode", value: function encode(
    query) {var intact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var
      strQuery = '',formatQuery = '';
      if (query == null) {
        (0, _warn.warn)('加密参数没有传递，你知道？', true);
        return '';
      }
      if (query.constructor === String) {// 字符串 尝试 转成 对象
        strQuery = JSON.stringify(this.parse(query));
      } else if (query.constructor === Object) {// 直接转成字符串对象即可
        if (Object.keys(query).length === 0) {
          (0, _warn.warn)('当前参数不满足加密规范！');
          return '';
        }
        strQuery = JSON.stringify(query);
      }
      if (intact) {
        formatQuery = '?';
      }
      formatQuery += "query=".concat(encodeURIComponent(strQuery));
      return formatQuery;
    }

    /**
       * 把一个已经加密好的字符串 query=encodeURIComponent(value) 解密成 对象
       * @param {string} strQuery  已经加密好的字符串 query=encodeURIComponent(value)
       */ }, { key: "decode", value: function decode(
    strQuery) {
      if (strQuery == null) {
        (0, _warn.warn)('解密参数没有传递，你知道？', true);
        return {};
      }
      var jsonQuery = strQuery;
      if (strQuery.constructor === Object) {// 如果是对象 看能不能满足要求
        jsonQuery = strQuery.query;
        if (jsonQuery == null) {
          (0, _warn.warn)('当前解密参数不满足编码规则');
          return {};
        }
        jsonQuery = "query=".concat(jsonQuery);
      }
      var decode = {};
      // query 长这个样  query=encodeURIComponent(value)
      var decodeStr = decodeURIComponent(jsonQuery);var _this$parse =
      this.parse(decodeStr),query = _this$parse.query; // 转成 json 获取到正真的json字符串
      if (query == null) {
        (0, _warn.warn)('当前解密参数不满足编码规则');
      } else {
        try {
          decode = JSON.parse(query);
        } catch (error) {
          (0, _warn.warn)('当前解密参数不满足编码规则');
        }
      }
      return decode;
    } }, { key: "queryGet", value: function queryGet(

    query) {var
      encodeURI = _config.Global.Router.CONFIG.encodeURI; // 获取到路由配置
      var decode = query,historyObj = query,strQuery = '';
      switch (encodeURI) {
        case true:{// 加密模式
            decode = this.decode(query);
            strQuery = this.encode(decode);
            historyObj = {
              query: encodeURIComponent(JSON.stringify(decode)) };

            break;
          }
        case false:{// 不加密模式
            strQuery = this.stringify(query);
            break;
          }
        default:{
            (0, _warn.err)('未知参数模式，请检查 \'encodeURI\'', true);
          }}

      return { strQuery: strQuery, historyObj: historyObj, decode: decode };
    }


    /**
       * 对需要传递的参数进行加密解密
       * @param {Object|String} query get为false 必须为 Object 类型
       * @param {String} get 是取值 还是通过api传值
       */ }, { key: "transfer", value: function transfer()
    {var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var
      encodeURI = _config.Global.Router.CONFIG.encodeURI; // 获取到路由配置
      switch (encodeURI) {
        case true:{
            // 加密模式
            return this.encode(query, false);
          }
        case false:{
            // 不加密模式
            return this.stringify(query);
          }
        default:{
            (0, _warn.err)('未知参数模式，请检查 \'encodeURI\' ', true);
          }}

    } }, { key: "queryName", get: function get() {return nodeURL;} }]);return ParseQuery;}();var _default =


ParseQuery;exports.default = _default;

/***/ }),

/***/ 41:
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ 42);
var objectAssign = __webpack_require__(/*! object-assign */ 43);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),

/***/ 42:
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ 422:
/*!*********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/util/emitter.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 递归使用 call 方式this指向
                                                                                                      * @param componentName // 需要找的组件的名称
                                                                                                      * @param eventName // 事件名称
                                                                                                      * @param params // 需要传递的参数
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // 循环子节点找到名称一样的子节点 否则 递归 当前子节点
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * 派发 (向上查找) (一个)
              * @param componentName // 需要找的组件的名称
              * @param eventName // 事件名称
              * @param params // 需要传递的参数
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent 找到最近的父节点 $root 根节点
      var name = parent.$options.name; // 获取当前组件实例的name
      // 如果当前有节点 && 当前没名称 且 当前名称等于需要传进来的名称的时候就去查找当前的节点
      // 循环出当前名称的一样的组件实例
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // 有节点表示当前找到了name一样的实例
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * 广播 (向下查找) (广播多个)
        * @param componentName // 需要找的组件的名称
        * @param eventName // 事件名称
        * @param params // 需要传递的参数
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 423:
/*!*****************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/util/async-validator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {
  _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"NODE_ENV":"development","VUE_APP_NAME":"想玩商家端","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}) && "development" !== 'production' && typeof window !==
'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}

function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;}

    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject({
          errors: errors,
          fields: convertFieldsError(errors) }) :
        resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject({
          errors: results,
          fields: convertFieldsError(results) }) :
        resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField };

  };
}

function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], {}, value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
   *  Rule for validating required fields.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
   *  Rule for validating whitespace.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i };

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function _float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear ===
    'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    // 修改源码，将字符串数值先转为数值
    return typeof +value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  } };

/**
        *  Rule for validating the type of a value.
        *
        *  @param rule The validation rule.
        *  @param value The value of the field on the source object.
        *  @param source The source object being validated.
        *  @param errors An array of errors that this rule may add
        *  validation errors to.
        *  @param options The validation options.
        *  @param options.messages The validation messages.
        */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
   *  Rule for validating minimum and maximum allowed values.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
                    *  Rule for validating a value exists in an enumerable list.
                    *
                    *  @param rule The validation rule.
                    *  @param value The value of the field on the source object.
                    *  @param source The source object being validated.
                    *  @param errors An array of errors that this rule may add
                    *  validation errors to.
                    *  @param options The validation options.
                    *  @param options.messages The validation messages.
                    */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
   *  Rule for validating a regular expression pattern.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param source The source object being validated.
   *  @param errors An array of errors that this rule may add
   *  validation errors to.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1 };


/**
                         *  Performs validation for string types.
                         *
                         *  @param rule The validation rule.
                         *  @param value The value of the field on the source object.
                         *  @param callback The callback function.
                         *  @param source The source object being validated.
                         *  @param options The validation options.
                         *  @param options.messages The validation messages.
                         */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
   *  Validates a function.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a boolean.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates the regular expression type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is an integer.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a number is a floating point number.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an array.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates an object.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
                      *  Validates an enumerable list.
                      *
                      *  @param rule The validation rule.
                      *  @param value The value of the field on the source object.
                      *  @param callback The callback function.
                      *  @param source The source object being validated.
                      *  @param options The validation options.
                      *  @param options.messages The validation messages.
                      */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Validates a regular expression pattern.
   *
   *  Performs validation when a rule only contains
   *  a pattern property but is not declared as a string type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
   *  Performs validation for any type.
   *
   *  @param rule The validation rule.
   *  @param value The value of the field on the source object.
   *  @param callback The callback function.
   *  @param source The source object being validated.
   *  @param options The validation options.
   *  @param options.messages The validation messages.
   */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any };


function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid' },

    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s' },

    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters' },

    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s' },

    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length' },

    pattern: {
      mismatch: '%s value %s does not match pattern %s' },

    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    } };

}
var messages = newMessages();

/**
                               *  Encapsulates a validation schema.
                               *
                               *  @param descriptor An object declaring validation rules
                               *  for this schema.
                               */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule };

        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z });

      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField ===
      'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key });

      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            } else {
              errors = [];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  } };


Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;var _default =

Schema;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/node-libs-browser/mock/process.js */ 424)))

/***/ }),

/***/ 424:
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 425);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ 425:
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 424)))

/***/ }),

/***/ 43:
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 44:
/*!*************************************************!*\
  !*** F:/Project/想玩/想玩商家端/common/store/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 45));



var _user = _interopRequireDefault(__webpack_require__(/*! ./modules/user.js */ 46));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  modules: {
    user: _user.default } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 45:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 46:
/*!********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/common/store/modules/user.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _index = _interopRequireDefault(__webpack_require__(/*! @/common/request/index */ 47));
var _store = _interopRequireDefault(__webpack_require__(/*! @/common/store */ 44));
var _router = _interopRequireDefault(__webpack_require__(/*! @/common/router.js */ 11));
var _tools = _interopRequireDefault(__webpack_require__(/*! @/common/utils/tools */ 51));

var _types = __webpack_require__(/*! ../types.js */ 52);var _mutations;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




var state = {
  userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : {},
  tokenInfo: uni.getStorageSync('tokenInfo') ? uni.getStorageSync('tokenInfo') : {},
  showLoginTip: false };


var actions = {
  //设置token 获取个人信息 并返回上次页面
  setTokenAndBack: function setTokenAndBack(_ref,

  token) {var commit = _ref.commit;
    uni.setStorageSync('tokenInfo', token);
    _store.default.dispatch('getUserInfo');

    //返回登录之前的页面
    var fromLogin = uni.getStorageSync('fromLogin');
    if (fromLogin) {
      _tools.default.routerTo(fromLogin.path, fromLogin.query, true);
      uni.removeStorageSync('fromLogin');
    } else {
      //默认跳转首页
      _router.default.replaceAll('/pages/index/index');
    }
  },

  // 获取用户信息
  getUserInfo: function getUserInfo(_ref2)

  {var commit = _ref2.commit;
    return new Promise(function (resolve, reject) {
      (0, _index.default)('user.info').then(function (res) {
        commit('USER_INFO', res.data);
        uni.setStorageSync('userInfo', res.data);
        resolve(res);
      }).catch(function (e) {
        reject(e);
      });
    });
  } };



var mutations = (_mutations = {}, _defineProperty(_mutations,

_types.USER_INFO, function (state, data) {
  state.userInfo = data;
}), _defineProperty(_mutations,
_types.TOKEN_INFO, function (state, data) {
  uni.setStorageSync('tokenInfo', data);
  state.tokenInfo = data;
}), _defineProperty(_mutations,
_types.OUT_LOGIN, function (state, data) {
  uni.removeStorageSync('tokenInfo');
  uni.removeStorageSync('userInfo');
  _store.default.commit('USER_INFO', {});
  _store.default.commit('TOKEN_INFO', {});
  // router.push('/pages/login/login')
}), _mutations);



var getters = {
  loginFlag: function loginFlag(state) {
    return Boolean(state.tokenInfo.token);
  } };var _default =


{
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 47:
/*!***************************************************!*\
  !*** F:/Project/想玩/想玩商家端/common/request/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = api;var _request = _interopRequireDefault(__webpack_require__(/*! ./request */ 48));
var _api = _interopRequireDefault(__webpack_require__(/*! ./api */ 50));
var _index = _interopRequireDefault(__webpack_require__(/*! @/common/store/index.js */ 44));
var _tools = _interopRequireDefault(__webpack_require__(/*! @/common/utils/tools */ 51));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function api(url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var loading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var request = new _request.default();
  var api = getApiObj(url);

  request.interceptor.request(function (config, cancel) {/* 请求之前拦截器 */
    console.log(api.loading);
    if (api.loading || loading) uni.showLoading({
      title: api.msg || '' });


    var tokenFlag = _index.default.getters.loginFlag;
    console.log(_index.default);
    console.log(_index.default.getters);
    if (api.auth && !tokenFlag) {
      _index.default.commit('OUT_LOGIN');
      console.log('暂未登录,已阻止此次API请求~');
      throw '暂未登录,已阻止此次API请求~';
    }
    if (tokenFlag) {
      //token 即为登录token
      console.log(_index.default.state);
      config.header.Authorization = _index.default.state.user.tokenInfo.token;
    }
    return config;
  });

  request.interceptor.response(function (response) {/* 请求之后拦截器 */
    if (api.loading || loading) uni.hideLoading(); //停止加载
    uni.hideNavigationBarLoading(); //完成停止加载
    uni.stopPullDownRefresh(); //停止下拉刷新
    var resData = response.data;
    if (response.statusCode === 401) {// 服务端返回的状态码不等于200，则reject()
      uni.showToast({
        title: resData.data.errMsg || '请求出错,稍后重试',
        icon: 'none',
        duration: 2000,
        mask: true });

      //401代表token失效
      _index.default.commit('OUT_LOGIN');
      _tools.default.wxLogin();
    }
    if (response.statusCode !== 200) {// 服务端返回的状态码不等于200，则reject()
      uni.showToast({
        title: resData.data.errMsg || '请求出错,稍后重试',
        icon: 'none',
        duration: 2000,
        mask: true });

    }
    // if (response.config.custom.verification) { // 演示自定义参数的作用
    //   return resData
    // }
    return response;
  }, function (response) {// 预留可以日志上报
    console.log('出错了', response);
    uni.hideLoading(); //停止加载
    uni.hideNavigationBarLoading(); //完成停止加载
    uni.stopPullDownRefresh(); //停止下拉刷新
    uni.showToast({
      title: response.data.data.errMsg || '请求出错,稍后重试',
      icon: 'none',
      duration: 2000,
      mask: true });

    return response;
  });

  return request.request({
    url: api.url,
    urlType: api.urlType,
    data: data,
    method: api.method });


}

function getApiObj(url) {
  var apiArray = url.split(".");
  var api = _api.default;
  apiArray.forEach(function (v) {
    api = api[v];
  });
  return api;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 475:
/*!**********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/util/province.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var provinceData = [{ "label": "北京市", "value": "11" }, { "label": "天津市", "value": "12" }, { "label": "河北省", "value": "13" }, { "label": "山西省", "value": "14" }, { "label": "内蒙古自治区", "value": "15" }, { "label": "辽宁省", "value": "21" }, { "label": "吉林省", "value": "22" }, { "label": "黑龙江省", "value": "23" }, { "label": "上海市", "value": "31" }, { "label": "江苏省", "value": "32" }, { "label": "浙江省", "value": "33" }, { "label": "安徽省", "value": "34" }, { "label": "福建省", "value": "35" }, { "label": "江西省", "value": "36" }, { "label": "山东省", "value": "37" }, { "label": "河南省", "value": "41" }, { "label": "湖北省", "value": "42" }, { "label": "湖南省", "value": "43" }, { "label": "广东省", "value": "44" }, { "label": "广西壮族自治区", "value": "45" }, { "label": "海南省", "value": "46" }, { "label": "重庆市", "value": "50" }, { "label": "四川省", "value": "51" }, { "label": "贵州省", "value": "52" }, { "label": "云南省", "value": "53" }, { "label": "西藏自治区", "value": "54" }, { "label": "陕西省", "value": "61" }, { "label": "甘肃省", "value": "62" }, { "label": "青海省", "value": "63" }, { "label": "宁夏回族自治区", "value": "64" }, { "label": "新疆维吾尔自治区", "value": "65" }, { "label": "台湾", "value": "66" }, { "label": "香港", "value": "67" }, { "label": "澳门", "value": "68" }];var _default = provinceData;exports.default = _default;

/***/ }),

/***/ 476:
/*!******************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/util/city.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var cityData = [[{ "label": "市辖区", "value": "1101" }], [{ "label": "市辖区", "value": "1201" }], [{ "label": "石家庄市", "value": "1301" }, { "label": "唐山市", "value": "1302" }, { "label": "秦皇岛市", "value": "1303" }, { "label": "邯郸市", "value": "1304" }, { "label": "邢台市", "value": "1305" }, { "label": "保定市", "value": "1306" }, { "label": "张家口市", "value": "1307" }, { "label": "承德市", "value": "1308" }, { "label": "沧州市", "value": "1309" }, { "label": "廊坊市", "value": "1310" }, { "label": "衡水市", "value": "1311" }], [{ "label": "太原市", "value": "1401" }, { "label": "大同市", "value": "1402" }, { "label": "阳泉市", "value": "1403" }, { "label": "长治市", "value": "1404" }, { "label": "晋城市", "value": "1405" }, { "label": "朔州市", "value": "1406" }, { "label": "晋中市", "value": "1407" }, { "label": "运城市", "value": "1408" }, { "label": "忻州市", "value": "1409" }, { "label": "临汾市", "value": "1410" }, { "label": "吕梁市", "value": "1411" }], [{ "label": "呼和浩特市", "value": "1501" }, { "label": "包头市", "value": "1502" }, { "label": "乌海市", "value": "1503" }, { "label": "赤峰市", "value": "1504" }, { "label": "通辽市", "value": "1505" }, { "label": "鄂尔多斯市", "value": "1506" }, { "label": "呼伦贝尔市", "value": "1507" }, { "label": "巴彦淖尔市", "value": "1508" }, { "label": "乌兰察布市", "value": "1509" }, { "label": "兴安盟", "value": "1522" }, { "label": "锡林郭勒盟", "value": "1525" }, { "label": "阿拉善盟", "value": "1529" }], [{ "label": "沈阳市", "value": "2101" }, { "label": "大连市", "value": "2102" }, { "label": "鞍山市", "value": "2103" }, { "label": "抚顺市", "value": "2104" }, { "label": "本溪市", "value": "2105" }, { "label": "丹东市", "value": "2106" }, { "label": "锦州市", "value": "2107" }, { "label": "营口市", "value": "2108" }, { "label": "阜新市", "value": "2109" }, { "label": "辽阳市", "value": "2110" }, { "label": "盘锦市", "value": "2111" }, { "label": "铁岭市", "value": "2112" }, { "label": "朝阳市", "value": "2113" }, { "label": "葫芦岛市", "value": "2114" }], [{ "label": "长春市", "value": "2201" }, { "label": "吉林市", "value": "2202" }, { "label": "四平市", "value": "2203" }, { "label": "辽源市", "value": "2204" }, { "label": "通化市", "value": "2205" }, { "label": "白山市", "value": "2206" }, { "label": "松原市", "value": "2207" }, { "label": "白城市", "value": "2208" }, { "label": "延边朝鲜族自治州", "value": "2224" }], [{ "label": "哈尔滨市", "value": "2301" }, { "label": "齐齐哈尔市", "value": "2302" }, { "label": "鸡西市", "value": "2303" }, { "label": "鹤岗市", "value": "2304" }, { "label": "双鸭山市", "value": "2305" }, { "label": "大庆市", "value": "2306" }, { "label": "伊春市", "value": "2307" }, { "label": "佳木斯市", "value": "2308" }, { "label": "七台河市", "value": "2309" }, { "label": "牡丹江市", "value": "2310" }, { "label": "黑河市", "value": "2311" }, { "label": "绥化市", "value": "2312" }, { "label": "大兴安岭地区", "value": "2327" }], [{ "label": "市辖区", "value": "3101" }], [{ "label": "南京市", "value": "3201" }, { "label": "无锡市", "value": "3202" }, { "label": "徐州市", "value": "3203" }, { "label": "常州市", "value": "3204" }, { "label": "苏州市", "value": "3205" }, { "label": "南通市", "value": "3206" }, { "label": "连云港市", "value": "3207" }, { "label": "淮安市", "value": "3208" }, { "label": "盐城市", "value": "3209" }, { "label": "扬州市", "value": "3210" }, { "label": "镇江市", "value": "3211" }, { "label": "泰州市", "value": "3212" }, { "label": "宿迁市", "value": "3213" }], [{ "label": "杭州市", "value": "3301" }, { "label": "宁波市", "value": "3302" }, { "label": "温州市", "value": "3303" }, { "label": "嘉兴市", "value": "3304" }, { "label": "湖州市", "value": "3305" }, { "label": "绍兴市", "value": "3306" }, { "label": "金华市", "value": "3307" }, { "label": "衢州市", "value": "3308" }, { "label": "舟山市", "value": "3309" }, { "label": "台州市", "value": "3310" }, { "label": "丽水市", "value": "3311" }], [{ "label": "合肥市", "value": "3401" }, { "label": "芜湖市", "value": "3402" }, { "label": "蚌埠市", "value": "3403" }, { "label": "淮南市", "value": "3404" }, { "label": "马鞍山市", "value": "3405" }, { "label": "淮北市", "value": "3406" }, { "label": "铜陵市", "value": "3407" }, { "label": "安庆市", "value": "3408" }, { "label": "黄山市", "value": "3410" }, { "label": "滁州市", "value": "3411" }, { "label": "阜阳市", "value": "3412" }, { "label": "宿州市", "value": "3413" }, { "label": "六安市", "value": "3415" }, { "label": "亳州市", "value": "3416" }, { "label": "池州市", "value": "3417" }, { "label": "宣城市", "value": "3418" }], [{ "label": "福州市", "value": "3501" }, { "label": "厦门市", "value": "3502" }, { "label": "莆田市", "value": "3503" }, { "label": "三明市", "value": "3504" }, { "label": "泉州市", "value": "3505" }, { "label": "漳州市", "value": "3506" }, { "label": "南平市", "value": "3507" }, { "label": "龙岩市", "value": "3508" }, { "label": "宁德市", "value": "3509" }], [{ "label": "南昌市", "value": "3601" }, { "label": "景德镇市", "value": "3602" }, { "label": "萍乡市", "value": "3603" }, { "label": "九江市", "value": "3604" }, { "label": "新余市", "value": "3605" }, { "label": "鹰潭市", "value": "3606" }, { "label": "赣州市", "value": "3607" }, { "label": "吉安市", "value": "3608" }, { "label": "宜春市", "value": "3609" }, { "label": "抚州市", "value": "3610" }, { "label": "上饶市", "value": "3611" }], [{ "label": "济南市", "value": "3701" }, { "label": "青岛市", "value": "3702" }, { "label": "淄博市", "value": "3703" }, { "label": "枣庄市", "value": "3704" }, { "label": "东营市", "value": "3705" }, { "label": "烟台市", "value": "3706" }, { "label": "潍坊市", "value": "3707" }, { "label": "济宁市", "value": "3708" }, { "label": "泰安市", "value": "3709" }, { "label": "威海市", "value": "3710" }, { "label": "日照市", "value": "3711" }, { "label": "莱芜市", "value": "3712" }, { "label": "临沂市", "value": "3713" }, { "label": "德州市", "value": "3714" }, { "label": "聊城市", "value": "3715" }, { "label": "滨州市", "value": "3716" }, { "label": "菏泽市", "value": "3717" }], [{ "label": "郑州市", "value": "4101" }, { "label": "开封市", "value": "4102" }, { "label": "洛阳市", "value": "4103" }, { "label": "平顶山市", "value": "4104" }, { "label": "安阳市", "value": "4105" }, { "label": "鹤壁市", "value": "4106" }, { "label": "新乡市", "value": "4107" }, { "label": "焦作市", "value": "4108" }, { "label": "濮阳市", "value": "4109" }, { "label": "许昌市", "value": "4110" }, { "label": "漯河市", "value": "4111" }, { "label": "三门峡市", "value": "4112" }, { "label": "南阳市", "value": "4113" }, { "label": "商丘市", "value": "4114" }, { "label": "信阳市", "value": "4115" }, { "label": "周口市", "value": "4116" }, { "label": "驻马店市", "value": "4117" }, { "label": "省直辖县级行政区划", "value": "4190" }], [{ "label": "武汉市", "value": "4201" }, { "label": "黄石市", "value": "4202" }, { "label": "十堰市", "value": "4203" }, { "label": "宜昌市", "value": "4205" }, { "label": "襄阳市", "value": "4206" }, { "label": "鄂州市", "value": "4207" }, { "label": "荆门市", "value": "4208" }, { "label": "孝感市", "value": "4209" }, { "label": "荆州市", "value": "4210" }, { "label": "黄冈市", "value": "4211" }, { "label": "咸宁市", "value": "4212" }, { "label": "随州市", "value": "4213" }, { "label": "恩施土家族苗族自治州", "value": "4228" }, { "label": "省直辖县级行政区划", "value": "4290" }], [{ "label": "长沙市", "value": "4301" }, { "label": "株洲市", "value": "4302" }, { "label": "湘潭市", "value": "4303" }, { "label": "衡阳市", "value": "4304" }, { "label": "邵阳市", "value": "4305" }, { "label": "岳阳市", "value": "4306" }, { "label": "常德市", "value": "4307" }, { "label": "张家界市", "value": "4308" }, { "label": "益阳市", "value": "4309" }, { "label": "郴州市", "value": "4310" }, { "label": "永州市", "value": "4311" }, { "label": "怀化市", "value": "4312" }, { "label": "娄底市", "value": "4313" }, { "label": "湘西土家族苗族自治州", "value": "4331" }], [{ "label": "广州市", "value": "4401" }, { "label": "韶关市", "value": "4402" }, { "label": "深圳市", "value": "4403" }, { "label": "珠海市", "value": "4404" }, { "label": "汕头市", "value": "4405" }, { "label": "佛山市", "value": "4406" }, { "label": "江门市", "value": "4407" }, { "label": "湛江市", "value": "4408" }, { "label": "茂名市", "value": "4409" }, { "label": "肇庆市", "value": "4412" }, { "label": "惠州市", "value": "4413" }, { "label": "梅州市", "value": "4414" }, { "label": "汕尾市", "value": "4415" }, { "label": "河源市", "value": "4416" }, { "label": "阳江市", "value": "4417" }, { "label": "清远市", "value": "4418" }, { "label": "东莞市", "value": "4419" }, { "label": "中山市", "value": "4420" }, { "label": "潮州市", "value": "4451" }, { "label": "揭阳市", "value": "4452" }, { "label": "云浮市", "value": "4453" }], [{ "label": "南宁市", "value": "4501" }, { "label": "柳州市", "value": "4502" }, { "label": "桂林市", "value": "4503" }, { "label": "梧州市", "value": "4504" }, { "label": "北海市", "value": "4505" }, { "label": "防城港市", "value": "4506" }, { "label": "钦州市", "value": "4507" }, { "label": "贵港市", "value": "4508" }, { "label": "玉林市", "value": "4509" }, { "label": "百色市", "value": "4510" }, { "label": "贺州市", "value": "4511" }, { "label": "河池市", "value": "4512" }, { "label": "来宾市", "value": "4513" }, { "label": "崇左市", "value": "4514" }], [{ "label": "海口市", "value": "4601" }, { "label": "三亚市", "value": "4602" }, { "label": "三沙市", "value": "4603" }, { "label": "儋州市", "value": "4604" }, { "label": "省直辖县级行政区划", "value": "4690" }], [{ "label": "市辖区", "value": "5001" }, { "label": "县", "value": "5002" }], [{ "label": "成都市", "value": "5101" }, { "label": "自贡市", "value": "5103" }, { "label": "攀枝花市", "value": "5104" }, { "label": "泸州市", "value": "5105" }, { "label": "德阳市", "value": "5106" }, { "label": "绵阳市", "value": "5107" }, { "label": "广元市", "value": "5108" }, { "label": "遂宁市", "value": "5109" }, { "label": "内江市", "value": "5110" }, { "label": "乐山市", "value": "5111" }, { "label": "南充市", "value": "5113" }, { "label": "眉山市", "value": "5114" }, { "label": "宜宾市", "value": "5115" }, { "label": "广安市", "value": "5116" }, { "label": "达州市", "value": "5117" }, { "label": "雅安市", "value": "5118" }, { "label": "巴中市", "value": "5119" }, { "label": "资阳市", "value": "5120" }, { "label": "阿坝藏族羌族自治州", "value": "5132" }, { "label": "甘孜藏族自治州", "value": "5133" }, { "label": "凉山彝族自治州", "value": "5134" }], [{ "label": "贵阳市", "value": "5201" }, { "label": "六盘水市", "value": "5202" }, { "label": "遵义市", "value": "5203" }, { "label": "安顺市", "value": "5204" }, { "label": "毕节市", "value": "5205" }, { "label": "铜仁市", "value": "5206" }, { "label": "黔西南布依族苗族自治州", "value": "5223" }, { "label": "黔东南苗族侗族自治州", "value": "5226" }, { "label": "黔南布依族苗族自治州", "value": "5227" }], [{ "label": "昆明市", "value": "5301" }, { "label": "曲靖市", "value": "5303" }, { "label": "玉溪市", "value": "5304" }, { "label": "保山市", "value": "5305" }, { "label": "昭通市", "value": "5306" }, { "label": "丽江市", "value": "5307" }, { "label": "普洱市", "value": "5308" }, { "label": "临沧市", "value": "5309" }, { "label": "楚雄彝族自治州", "value": "5323" }, { "label": "红河哈尼族彝族自治州", "value": "5325" }, { "label": "文山壮族苗族自治州", "value": "5326" }, { "label": "西双版纳傣族自治州", "value": "5328" }, { "label": "大理白族自治州", "value": "5329" }, { "label": "德宏傣族景颇族自治州", "value": "5331" }, { "label": "怒江傈僳族自治州", "value": "5333" }, { "label": "迪庆藏族自治州", "value": "5334" }], [{ "label": "拉萨市", "value": "5401" }, { "label": "日喀则市", "value": "5402" }, { "label": "昌都市", "value": "5403" }, { "label": "林芝市", "value": "5404" }, { "label": "山南市", "value": "5405" }, { "label": "那曲地区", "value": "5424" }, { "label": "阿里地区", "value": "5425" }], [{ "label": "西安市", "value": "6101" }, { "label": "铜川市", "value": "6102" }, { "label": "宝鸡市", "value": "6103" }, { "label": "咸阳市", "value": "6104" }, { "label": "渭南市", "value": "6105" }, { "label": "延安市", "value": "6106" }, { "label": "汉中市", "value": "6107" }, { "label": "榆林市", "value": "6108" }, { "label": "安康市", "value": "6109" }, { "label": "商洛市", "value": "6110" }], [{ "label": "兰州市", "value": "6201" }, { "label": "嘉峪关市", "value": "6202" }, { "label": "金昌市", "value": "6203" }, { "label": "白银市", "value": "6204" }, { "label": "天水市", "value": "6205" }, { "label": "武威市", "value": "6206" }, { "label": "张掖市", "value": "6207" }, { "label": "平凉市", "value": "6208" }, { "label": "酒泉市", "value": "6209" }, { "label": "庆阳市", "value": "6210" }, { "label": "定西市", "value": "6211" }, { "label": "陇南市", "value": "6212" }, { "label": "临夏回族自治州", "value": "6229" }, { "label": "甘南藏族自治州", "value": "6230" }], [{ "label": "西宁市", "value": "6301" }, { "label": "海东市", "value": "6302" }, { "label": "海北藏族自治州", "value": "6322" }, { "label": "黄南藏族自治州", "value": "6323" }, { "label": "海南藏族自治州", "value": "6325" }, { "label": "果洛藏族自治州", "value": "6326" }, { "label": "玉树藏族自治州", "value": "6327" }, { "label": "海西蒙古族藏族自治州", "value": "6328" }], [{ "label": "银川市", "value": "6401" }, { "label": "石嘴山市", "value": "6402" }, { "label": "吴忠市", "value": "6403" }, { "label": "固原市", "value": "6404" }, { "label": "中卫市", "value": "6405" }], [{ "label": "乌鲁木齐市", "value": "6501" }, { "label": "克拉玛依市", "value": "6502" }, { "label": "吐鲁番市", "value": "6504" }, { "label": "哈密市", "value": "6505" }, { "label": "昌吉回族自治州", "value": "6523" }, { "label": "博尔塔拉蒙古自治州", "value": "6527" }, { "label": "巴音郭楞蒙古自治州", "value": "6528" }, { "label": "阿克苏地区", "value": "6529" }, { "label": "克孜勒苏柯尔克孜自治州", "value": "6530" }, { "label": "喀什地区", "value": "6531" }, { "label": "和田地区", "value": "6532" }, { "label": "伊犁哈萨克自治州", "value": "6540" }, { "label": "塔城地区", "value": "6542" }, { "label": "阿勒泰地区", "value": "6543" }, { "label": "自治区直辖县级行政区划", "value": "6590" }], [{ "label": "台北", "value": "6601" }, { "label": "高雄", "value": "6602" }, { "label": "基隆", "value": "6603" }, { "label": "台中", "value": "6604" }, { "label": "台南", "value": "6605" }, { "label": "新竹", "value": "6606" }, { "label": "嘉义", "value": "6607" }, { "label": "宜兰", "value": "6608" }, { "label": "桃园", "value": "6609" }, { "label": "苗栗", "value": "6610" }, { "label": "彰化", "value": "6611" }, { "label": "南投", "value": "6612" }, { "label": "云林", "value": "6613" }, { "label": "屏东", "value": "6614" }, { "label": "台东", "value": "6615" }, { "label": "花莲", "value": "6616" }, { "label": "澎湖", "value": "6617" }], [{ "label": "香港岛", "value": "6701" }, { "label": "九龙", "value": "6702" }, { "label": "新界", "value": "6703" }], [{ "label": "澳门半岛", "value": "6801" }, { "label": "氹仔岛", "value": "6802" }, { "label": "路环岛", "value": "6803" }, { "label": "路氹城", "value": "6804" }]];var _default = cityData;exports.default = _default;

/***/ }),

/***/ 477:
/*!******************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/util/area.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var areaData = [[[{ "label": "东城区", "value": "110101" }, { "label": "西城区", "value": "110102" }, { "label": "朝阳区", "value": "110105" }, { "label": "丰台区", "value": "110106" }, { "label": "石景山区", "value": "110107" }, { "label": "海淀区", "value": "110108" }, { "label": "门头沟区", "value": "110109" }, { "label": "房山区", "value": "110111" }, { "label": "通州区", "value": "110112" }, { "label": "顺义区", "value": "110113" }, { "label": "昌平区", "value": "110114" }, { "label": "大兴区", "value": "110115" }, { "label": "怀柔区", "value": "110116" }, { "label": "平谷区", "value": "110117" }, { "label": "密云区", "value": "110118" }, { "label": "延庆区", "value": "110119" }]], [[{ "label": "和平区", "value": "120101" }, { "label": "河东区", "value": "120102" }, { "label": "河西区", "value": "120103" }, { "label": "南开区", "value": "120104" }, { "label": "河北区", "value": "120105" }, { "label": "红桥区", "value": "120106" }, { "label": "东丽区", "value": "120110" }, { "label": "西青区", "value": "120111" }, { "label": "津南区", "value": "120112" }, { "label": "北辰区", "value": "120113" }, { "label": "武清区", "value": "120114" }, { "label": "宝坻区", "value": "120115" }, { "label": "滨海新区", "value": "120116" }, { "label": "宁河区", "value": "120117" }, { "label": "静海区", "value": "120118" }, { "label": "蓟州区", "value": "120119" }]], [[{ "label": "长安区", "value": "130102" }, { "label": "桥西区", "value": "130104" }, { "label": "新华区", "value": "130105" }, { "label": "井陉矿区", "value": "130107" }, { "label": "裕华区", "value": "130108" }, { "label": "藁城区", "value": "130109" }, { "label": "鹿泉区", "value": "130110" }, { "label": "栾城区", "value": "130111" }, { "label": "井陉县", "value": "130121" }, { "label": "正定县", "value": "130123" }, { "label": "行唐县", "value": "130125" }, { "label": "灵寿县", "value": "130126" }, { "label": "高邑县", "value": "130127" }, { "label": "深泽县", "value": "130128" }, { "label": "赞皇县", "value": "130129" }, { "label": "无极县", "value": "130130" }, { "label": "平山县", "value": "130131" }, { "label": "元氏县", "value": "130132" }, { "label": "赵县", "value": "130133" }, { "label": "石家庄高新技术产业开发区", "value": "130171" }, { "label": "石家庄循环化工园区", "value": "130172" }, { "label": "辛集市", "value": "130181" }, { "label": "晋州市", "value": "130183" }, { "label": "新乐市", "value": "130184" }], [{ "label": "路南区", "value": "130202" }, { "label": "路北区", "value": "130203" }, { "label": "古冶区", "value": "130204" }, { "label": "开平区", "value": "130205" }, { "label": "丰南区", "value": "130207" }, { "label": "丰润区", "value": "130208" }, { "label": "曹妃甸区", "value": "130209" }, { "label": "滦县", "value": "130223" }, { "label": "滦南县", "value": "130224" }, { "label": "乐亭县", "value": "130225" }, { "label": "迁西县", "value": "130227" }, { "label": "玉田县", "value": "130229" }, { "label": "唐山市芦台经济技术开发区", "value": "130271" }, { "label": "唐山市汉沽管理区", "value": "130272" }, { "label": "唐山高新技术产业开发区", "value": "130273" }, { "label": "河北唐山海港经济开发区", "value": "130274" }, { "label": "遵化市", "value": "130281" }, { "label": "迁安市", "value": "130283" }], [{ "label": "海港区", "value": "130302" }, { "label": "山海关区", "value": "130303" }, { "label": "北戴河区", "value": "130304" }, { "label": "抚宁区", "value": "130306" }, { "label": "青龙满族自治县", "value": "130321" }, { "label": "昌黎县", "value": "130322" }, { "label": "卢龙县", "value": "130324" }, { "label": "秦皇岛市经济技术开发区", "value": "130371" }, { "label": "北戴河新区", "value": "130372" }], [{ "label": "邯山区", "value": "130402" }, { "label": "丛台区", "value": "130403" }, { "label": "复兴区", "value": "130404" }, { "label": "峰峰矿区", "value": "130406" }, { "label": "肥乡区", "value": "130407" }, { "label": "永年区", "value": "130408" }, { "label": "临漳县", "value": "130423" }, { "label": "成安县", "value": "130424" }, { "label": "大名县", "value": "130425" }, { "label": "涉县", "value": "130426" }, { "label": "磁县", "value": "130427" }, { "label": "邱县", "value": "130430" }, { "label": "鸡泽县", "value": "130431" }, { "label": "广平县", "value": "130432" }, { "label": "馆陶县", "value": "130433" }, { "label": "魏县", "value": "130434" }, { "label": "曲周县", "value": "130435" }, { "label": "邯郸经济技术开发区", "value": "130471" }, { "label": "邯郸冀南新区", "value": "130473" }, { "label": "武安市", "value": "130481" }], [{ "label": "桥东区", "value": "130502" }, { "label": "桥西区", "value": "130503" }, { "label": "邢台县", "value": "130521" }, { "label": "临城县", "value": "130522" }, { "label": "内丘县", "value": "130523" }, { "label": "柏乡县", "value": "130524" }, { "label": "隆尧县", "value": "130525" }, { "label": "任县", "value": "130526" }, { "label": "南和县", "value": "130527" }, { "label": "宁晋县", "value": "130528" }, { "label": "巨鹿县", "value": "130529" }, { "label": "新河县", "value": "130530" }, { "label": "广宗县", "value": "130531" }, { "label": "平乡县", "value": "130532" }, { "label": "威县", "value": "130533" }, { "label": "清河县", "value": "130534" }, { "label": "临西县", "value": "130535" }, { "label": "河北邢台经济开发区", "value": "130571" }, { "label": "南宫市", "value": "130581" }, { "label": "沙河市", "value": "130582" }], [{ "label": "竞秀区", "value": "130602" }, { "label": "莲池区", "value": "130606" }, { "label": "满城区", "value": "130607" }, { "label": "清苑区", "value": "130608" }, { "label": "徐水区", "value": "130609" }, { "label": "涞水县", "value": "130623" }, { "label": "阜平县", "value": "130624" }, { "label": "定兴县", "value": "130626" }, { "label": "唐县", "value": "130627" }, { "label": "高阳县", "value": "130628" }, { "label": "容城县", "value": "130629" }, { "label": "涞源县", "value": "130630" }, { "label": "望都县", "value": "130631" }, { "label": "安新县", "value": "130632" }, { "label": "易县", "value": "130633" }, { "label": "曲阳县", "value": "130634" }, { "label": "蠡县", "value": "130635" }, { "label": "顺平县", "value": "130636" }, { "label": "博野县", "value": "130637" }, { "label": "雄县", "value": "130638" }, { "label": "保定高新技术产业开发区", "value": "130671" }, { "label": "保定白沟新城", "value": "130672" }, { "label": "涿州市", "value": "130681" }, { "label": "定州市", "value": "130682" }, { "label": "安国市", "value": "130683" }, { "label": "高碑店市", "value": "130684" }], [{ "label": "桥东区", "value": "130702" }, { "label": "桥西区", "value": "130703" }, { "label": "宣化区", "value": "130705" }, { "label": "下花园区", "value": "130706" }, { "label": "万全区", "value": "130708" }, { "label": "崇礼区", "value": "130709" }, { "label": "张北县", "value": "130722" }, { "label": "康保县", "value": "130723" }, { "label": "沽源县", "value": "130724" }, { "label": "尚义县", "value": "130725" }, { "label": "蔚县", "value": "130726" }, { "label": "阳原县", "value": "130727" }, { "label": "怀安县", "value": "130728" }, { "label": "怀来县", "value": "130730" }, { "label": "涿鹿县", "value": "130731" }, { "label": "赤城县", "value": "130732" }, { "label": "张家口市高新技术产业开发区", "value": "130771" }, { "label": "张家口市察北管理区", "value": "130772" }, { "label": "张家口市塞北管理区", "value": "130773" }], [{ "label": "双桥区", "value": "130802" }, { "label": "双滦区", "value": "130803" }, { "label": "鹰手营子矿区", "value": "130804" }, { "label": "承德县", "value": "130821" }, { "label": "兴隆县", "value": "130822" }, { "label": "滦平县", "value": "130824" }, { "label": "隆化县", "value": "130825" }, { "label": "丰宁满族自治县", "value": "130826" }, { "label": "宽城满族自治县", "value": "130827" }, { "label": "围场满族蒙古族自治县", "value": "130828" }, { "label": "承德高新技术产业开发区", "value": "130871" }, { "label": "平泉市", "value": "130881" }], [{ "label": "新华区", "value": "130902" }, { "label": "运河区", "value": "130903" }, { "label": "沧县", "value": "130921" }, { "label": "青县", "value": "130922" }, { "label": "东光县", "value": "130923" }, { "label": "海兴县", "value": "130924" }, { "label": "盐山县", "value": "130925" }, { "label": "肃宁县", "value": "130926" }, { "label": "南皮县", "value": "130927" }, { "label": "吴桥县", "value": "130928" }, { "label": "献县", "value": "130929" }, { "label": "孟村回族自治县", "value": "130930" }, { "label": "河北沧州经济开发区", "value": "130971" }, { "label": "沧州高新技术产业开发区", "value": "130972" }, { "label": "沧州渤海新区", "value": "130973" }, { "label": "泊头市", "value": "130981" }, { "label": "任丘市", "value": "130982" }, { "label": "黄骅市", "value": "130983" }, { "label": "河间市", "value": "130984" }], [{ "label": "安次区", "value": "131002" }, { "label": "广阳区", "value": "131003" }, { "label": "固安县", "value": "131022" }, { "label": "永清县", "value": "131023" }, { "label": "香河县", "value": "131024" }, { "label": "大城县", "value": "131025" }, { "label": "文安县", "value": "131026" }, { "label": "大厂回族自治县", "value": "131028" }, { "label": "廊坊经济技术开发区", "value": "131071" }, { "label": "霸州市", "value": "131081" }, { "label": "三河市", "value": "131082" }], [{ "label": "桃城区", "value": "131102" }, { "label": "冀州区", "value": "131103" }, { "label": "枣强县", "value": "131121" }, { "label": "武邑县", "value": "131122" }, { "label": "武强县", "value": "131123" }, { "label": "饶阳县", "value": "131124" }, { "label": "安平县", "value": "131125" }, { "label": "故城县", "value": "131126" }, { "label": "景县", "value": "131127" }, { "label": "阜城县", "value": "131128" }, { "label": "河北衡水经济开发区", "value": "131171" }, { "label": "衡水滨湖新区", "value": "131172" }, { "label": "深州市", "value": "131182" }]], [[{ "label": "小店区", "value": "140105" }, { "label": "迎泽区", "value": "140106" }, { "label": "杏花岭区", "value": "140107" }, { "label": "尖草坪区", "value": "140108" }, { "label": "万柏林区", "value": "140109" }, { "label": "晋源区", "value": "140110" }, { "label": "清徐县", "value": "140121" }, { "label": "阳曲县", "value": "140122" }, { "label": "娄烦县", "value": "140123" }, { "label": "山西转型综合改革示范区", "value": "140171" }, { "label": "古交市", "value": "140181" }], [{ "label": "城区", "value": "140202" }, { "label": "矿区", "value": "140203" }, { "label": "南郊区", "value": "140211" }, { "label": "新荣区", "value": "140212" }, { "label": "阳高县", "value": "140221" }, { "label": "天镇县", "value": "140222" }, { "label": "广灵县", "value": "140223" }, { "label": "灵丘县", "value": "140224" }, { "label": "浑源县", "value": "140225" }, { "label": "左云县", "value": "140226" }, { "label": "大同县", "value": "140227" }, { "label": "山西大同经济开发区", "value": "140271" }], [{ "label": "城区", "value": "140302" }, { "label": "矿区", "value": "140303" }, { "label": "郊区", "value": "140311" }, { "label": "平定县", "value": "140321" }, { "label": "盂县", "value": "140322" }, { "label": "山西阳泉经济开发区", "value": "140371" }], [{ "label": "城区", "value": "140402" }, { "label": "郊区", "value": "140411" }, { "label": "长治县", "value": "140421" }, { "label": "襄垣县", "value": "140423" }, { "label": "屯留县", "value": "140424" }, { "label": "平顺县", "value": "140425" }, { "label": "黎城县", "value": "140426" }, { "label": "壶关县", "value": "140427" }, { "label": "长子县", "value": "140428" }, { "label": "武乡县", "value": "140429" }, { "label": "沁县", "value": "140430" }, { "label": "沁源县", "value": "140431" }, { "label": "山西长治高新技术产业园区", "value": "140471" }, { "label": "潞城市", "value": "140481" }], [{ "label": "城区", "value": "140502" }, { "label": "沁水县", "value": "140521" }, { "label": "阳城县", "value": "140522" }, { "label": "陵川县", "value": "140524" }, { "label": "泽州县", "value": "140525" }, { "label": "高平市", "value": "140581" }], [{ "label": "朔城区", "value": "140602" }, { "label": "平鲁区", "value": "140603" }, { "label": "山阴县", "value": "140621" }, { "label": "应县", "value": "140622" }, { "label": "右玉县", "value": "140623" }, { "label": "怀仁县", "value": "140624" }, { "label": "山西朔州经济开发区", "value": "140671" }], [{ "label": "榆次区", "value": "140702" }, { "label": "榆社县", "value": "140721" }, { "label": "左权县", "value": "140722" }, { "label": "和顺县", "value": "140723" }, { "label": "昔阳县", "value": "140724" }, { "label": "寿阳县", "value": "140725" }, { "label": "太谷县", "value": "140726" }, { "label": "祁县", "value": "140727" }, { "label": "平遥县", "value": "140728" }, { "label": "灵石县", "value": "140729" }, { "label": "介休市", "value": "140781" }], [{ "label": "盐湖区", "value": "140802" }, { "label": "临猗县", "value": "140821" }, { "label": "万荣县", "value": "140822" }, { "label": "闻喜县", "value": "140823" }, { "label": "稷山县", "value": "140824" }, { "label": "新绛县", "value": "140825" }, { "label": "绛县", "value": "140826" }, { "label": "垣曲县", "value": "140827" }, { "label": "夏县", "value": "140828" }, { "label": "平陆县", "value": "140829" }, { "label": "芮城县", "value": "140830" }, { "label": "永济市", "value": "140881" }, { "label": "河津市", "value": "140882" }], [{ "label": "忻府区", "value": "140902" }, { "label": "定襄县", "value": "140921" }, { "label": "五台县", "value": "140922" }, { "label": "代县", "value": "140923" }, { "label": "繁峙县", "value": "140924" }, { "label": "宁武县", "value": "140925" }, { "label": "静乐县", "value": "140926" }, { "label": "神池县", "value": "140927" }, { "label": "五寨县", "value": "140928" }, { "label": "岢岚县", "value": "140929" }, { "label": "河曲县", "value": "140930" }, { "label": "保德县", "value": "140931" }, { "label": "偏关县", "value": "140932" }, { "label": "五台山风景名胜区", "value": "140971" }, { "label": "原平市", "value": "140981" }], [{ "label": "尧都区", "value": "141002" }, { "label": "曲沃县", "value": "141021" }, { "label": "翼城县", "value": "141022" }, { "label": "襄汾县", "value": "141023" }, { "label": "洪洞县", "value": "141024" }, { "label": "古县", "value": "141025" }, { "label": "安泽县", "value": "141026" }, { "label": "浮山县", "value": "141027" }, { "label": "吉县", "value": "141028" }, { "label": "乡宁县", "value": "141029" }, { "label": "大宁县", "value": "141030" }, { "label": "隰县", "value": "141031" }, { "label": "永和县", "value": "141032" }, { "label": "蒲县", "value": "141033" }, { "label": "汾西县", "value": "141034" }, { "label": "侯马市", "value": "141081" }, { "label": "霍州市", "value": "141082" }], [{ "label": "离石区", "value": "141102" }, { "label": "文水县", "value": "141121" }, { "label": "交城县", "value": "141122" }, { "label": "兴县", "value": "141123" }, { "label": "临县", "value": "141124" }, { "label": "柳林县", "value": "141125" }, { "label": "石楼县", "value": "141126" }, { "label": "岚县", "value": "141127" }, { "label": "方山县", "value": "141128" }, { "label": "中阳县", "value": "141129" }, { "label": "交口县", "value": "141130" }, { "label": "孝义市", "value": "141181" }, { "label": "汾阳市", "value": "141182" }]], [[{ "label": "新城区", "value": "150102" }, { "label": "回民区", "value": "150103" }, { "label": "玉泉区", "value": "150104" }, { "label": "赛罕区", "value": "150105" }, { "label": "土默特左旗", "value": "150121" }, { "label": "托克托县", "value": "150122" }, { "label": "和林格尔县", "value": "150123" }, { "label": "清水河县", "value": "150124" }, { "label": "武川县", "value": "150125" }, { "label": "呼和浩特金海工业园区", "value": "150171" }, { "label": "呼和浩特经济技术开发区", "value": "150172" }], [{ "label": "东河区", "value": "150202" }, { "label": "昆都仑区", "value": "150203" }, { "label": "青山区", "value": "150204" }, { "label": "石拐区", "value": "150205" }, { "label": "白云鄂博矿区", "value": "150206" }, { "label": "九原区", "value": "150207" }, { "label": "土默特右旗", "value": "150221" }, { "label": "固阳县", "value": "150222" }, { "label": "达尔罕茂明安联合旗", "value": "150223" }, { "label": "包头稀土高新技术产业开发区", "value": "150271" }], [{ "label": "海勃湾区", "value": "150302" }, { "label": "海南区", "value": "150303" }, { "label": "乌达区", "value": "150304" }], [{ "label": "红山区", "value": "150402" }, { "label": "元宝山区", "value": "150403" }, { "label": "松山区", "value": "150404" }, { "label": "阿鲁科尔沁旗", "value": "150421" }, { "label": "巴林左旗", "value": "150422" }, { "label": "巴林右旗", "value": "150423" }, { "label": "林西县", "value": "150424" }, { "label": "克什克腾旗", "value": "150425" }, { "label": "翁牛特旗", "value": "150426" }, { "label": "喀喇沁旗", "value": "150428" }, { "label": "宁城县", "value": "150429" }, { "label": "敖汉旗", "value": "150430" }], [{ "label": "科尔沁区", "value": "150502" }, { "label": "科尔沁左翼中旗", "value": "150521" }, { "label": "科尔沁左翼后旗", "value": "150522" }, { "label": "开鲁县", "value": "150523" }, { "label": "库伦旗", "value": "150524" }, { "label": "奈曼旗", "value": "150525" }, { "label": "扎鲁特旗", "value": "150526" }, { "label": "通辽经济技术开发区", "value": "150571" }, { "label": "霍林郭勒市", "value": "150581" }], [{ "label": "东胜区", "value": "150602" }, { "label": "康巴什区", "value": "150603" }, { "label": "达拉特旗", "value": "150621" }, { "label": "准格尔旗", "value": "150622" }, { "label": "鄂托克前旗", "value": "150623" }, { "label": "鄂托克旗", "value": "150624" }, { "label": "杭锦旗", "value": "150625" }, { "label": "乌审旗", "value": "150626" }, { "label": "伊金霍洛旗", "value": "150627" }], [{ "label": "海拉尔区", "value": "150702" }, { "label": "扎赉诺尔区", "value": "150703" }, { "label": "阿荣旗", "value": "150721" }, { "label": "莫力达瓦达斡尔族自治旗", "value": "150722" }, { "label": "鄂伦春自治旗", "value": "150723" }, { "label": "鄂温克族自治旗", "value": "150724" }, { "label": "陈巴尔虎旗", "value": "150725" }, { "label": "新巴尔虎左旗", "value": "150726" }, { "label": "新巴尔虎右旗", "value": "150727" }, { "label": "满洲里市", "value": "150781" }, { "label": "牙克石市", "value": "150782" }, { "label": "扎兰屯市", "value": "150783" }, { "label": "额尔古纳市", "value": "150784" }, { "label": "根河市", "value": "150785" }], [{ "label": "临河区", "value": "150802" }, { "label": "五原县", "value": "150821" }, { "label": "磴口县", "value": "150822" }, { "label": "乌拉特前旗", "value": "150823" }, { "label": "乌拉特中旗", "value": "150824" }, { "label": "乌拉特后旗", "value": "150825" }, { "label": "杭锦后旗", "value": "150826" }], [{ "label": "集宁区", "value": "150902" }, { "label": "卓资县", "value": "150921" }, { "label": "化德县", "value": "150922" }, { "label": "商都县", "value": "150923" }, { "label": "兴和县", "value": "150924" }, { "label": "凉城县", "value": "150925" }, { "label": "察哈尔右翼前旗", "value": "150926" }, { "label": "察哈尔右翼中旗", "value": "150927" }, { "label": "察哈尔右翼后旗", "value": "150928" }, { "label": "四子王旗", "value": "150929" }, { "label": "丰镇市", "value": "150981" }], [{ "label": "乌兰浩特市", "value": "152201" }, { "label": "阿尔山市", "value": "152202" }, { "label": "科尔沁右翼前旗", "value": "152221" }, { "label": "科尔沁右翼中旗", "value": "152222" }, { "label": "扎赉特旗", "value": "152223" }, { "label": "突泉县", "value": "152224" }], [{ "label": "二连浩特市", "value": "152501" }, { "label": "锡林浩特市", "value": "152502" }, { "label": "阿巴嘎旗", "value": "152522" }, { "label": "苏尼特左旗", "value": "152523" }, { "label": "苏尼特右旗", "value": "152524" }, { "label": "东乌珠穆沁旗", "value": "152525" }, { "label": "西乌珠穆沁旗", "value": "152526" }, { "label": "太仆寺旗", "value": "152527" }, { "label": "镶黄旗", "value": "152528" }, { "label": "正镶白旗", "value": "152529" }, { "label": "正蓝旗", "value": "152530" }, { "label": "多伦县", "value": "152531" }, { "label": "乌拉盖管委会", "value": "152571" }], [{ "label": "阿拉善左旗", "value": "152921" }, { "label": "阿拉善右旗", "value": "152922" }, { "label": "额济纳旗", "value": "152923" }, { "label": "内蒙古阿拉善经济开发区", "value": "152971" }]], [[{ "label": "和平区", "value": "210102" }, { "label": "沈河区", "value": "210103" }, { "label": "大东区", "value": "210104" }, { "label": "皇姑区", "value": "210105" }, { "label": "铁西区", "value": "210106" }, { "label": "苏家屯区", "value": "210111" }, { "label": "浑南区", "value": "210112" }, { "label": "沈北新区", "value": "210113" }, { "label": "于洪区", "value": "210114" }, { "label": "辽中区", "value": "210115" }, { "label": "康平县", "value": "210123" }, { "label": "法库县", "value": "210124" }, { "label": "新民市", "value": "210181" }], [{ "label": "中山区", "value": "210202" }, { "label": "西岗区", "value": "210203" }, { "label": "沙河口区", "value": "210204" }, { "label": "甘井子区", "value": "210211" }, { "label": "旅顺口区", "value": "210212" }, { "label": "金州区", "value": "210213" }, { "label": "普兰店区", "value": "210214" }, { "label": "长海县", "value": "210224" }, { "label": "瓦房店市", "value": "210281" }, { "label": "庄河市", "value": "210283" }], [{ "label": "铁东区", "value": "210302" }, { "label": "铁西区", "value": "210303" }, { "label": "立山区", "value": "210304" }, { "label": "千山区", "value": "210311" }, { "label": "台安县", "value": "210321" }, { "label": "岫岩满族自治县", "value": "210323" }, { "label": "海城市", "value": "210381" }], [{ "label": "新抚区", "value": "210402" }, { "label": "东洲区", "value": "210403" }, { "label": "望花区", "value": "210404" }, { "label": "顺城区", "value": "210411" }, { "label": "抚顺县", "value": "210421" }, { "label": "新宾满族自治县", "value": "210422" }, { "label": "清原满族自治县", "value": "210423" }], [{ "label": "平山区", "value": "210502" }, { "label": "溪湖区", "value": "210503" }, { "label": "明山区", "value": "210504" }, { "label": "南芬区", "value": "210505" }, { "label": "本溪满族自治县", "value": "210521" }, { "label": "桓仁满族自治县", "value": "210522" }], [{ "label": "元宝区", "value": "210602" }, { "label": "振兴区", "value": "210603" }, { "label": "振安区", "value": "210604" }, { "label": "宽甸满族自治县", "value": "210624" }, { "label": "东港市", "value": "210681" }, { "label": "凤城市", "value": "210682" }], [{ "label": "古塔区", "value": "210702" }, { "label": "凌河区", "value": "210703" }, { "label": "太和区", "value": "210711" }, { "label": "黑山县", "value": "210726" }, { "label": "义县", "value": "210727" }, { "label": "凌海市", "value": "210781" }, { "label": "北镇市", "value": "210782" }], [{ "label": "站前区", "value": "210802" }, { "label": "西市区", "value": "210803" }, { "label": "鲅鱼圈区", "value": "210804" }, { "label": "老边区", "value": "210811" }, { "label": "盖州市", "value": "210881" }, { "label": "大石桥市", "value": "210882" }], [{ "label": "海州区", "value": "210902" }, { "label": "新邱区", "value": "210903" }, { "label": "太平区", "value": "210904" }, { "label": "清河门区", "value": "210905" }, { "label": "细河区", "value": "210911" }, { "label": "阜新蒙古族自治县", "value": "210921" }, { "label": "彰武县", "value": "210922" }], [{ "label": "白塔区", "value": "211002" }, { "label": "文圣区", "value": "211003" }, { "label": "宏伟区", "value": "211004" }, { "label": "弓长岭区", "value": "211005" }, { "label": "太子河区", "value": "211011" }, { "label": "辽阳县", "value": "211021" }, { "label": "灯塔市", "value": "211081" }], [{ "label": "双台子区", "value": "211102" }, { "label": "兴隆台区", "value": "211103" }, { "label": "大洼区", "value": "211104" }, { "label": "盘山县", "value": "211122" }], [{ "label": "银州区", "value": "211202" }, { "label": "清河区", "value": "211204" }, { "label": "铁岭县", "value": "211221" }, { "label": "西丰县", "value": "211223" }, { "label": "昌图县", "value": "211224" }, { "label": "调兵山市", "value": "211281" }, { "label": "开原市", "value": "211282" }], [{ "label": "双塔区", "value": "211302" }, { "label": "龙城区", "value": "211303" }, { "label": "朝阳县", "value": "211321" }, { "label": "建平县", "value": "211322" }, { "label": "喀喇沁左翼蒙古族自治县", "value": "211324" }, { "label": "北票市", "value": "211381" }, { "label": "凌源市", "value": "211382" }], [{ "label": "连山区", "value": "211402" }, { "label": "龙港区", "value": "211403" }, { "label": "南票区", "value": "211404" }, { "label": "绥中县", "value": "211421" }, { "label": "建昌县", "value": "211422" }, { "label": "兴城市", "value": "211481" }]], [[{ "label": "南关区", "value": "220102" }, { "label": "宽城区", "value": "220103" }, { "label": "朝阳区", "value": "220104" }, { "label": "二道区", "value": "220105" }, { "label": "绿园区", "value": "220106" }, { "label": "双阳区", "value": "220112" }, { "label": "九台区", "value": "220113" }, { "label": "农安县", "value": "220122" }, { "label": "长春经济技术开发区", "value": "220171" }, { "label": "长春净月高新技术产业开发区", "value": "220172" }, { "label": "长春高新技术产业开发区", "value": "220173" }, { "label": "长春汽车经济技术开发区", "value": "220174" }, { "label": "榆树市", "value": "220182" }, { "label": "德惠市", "value": "220183" }], [{ "label": "昌邑区", "value": "220202" }, { "label": "龙潭区", "value": "220203" }, { "label": "船营区", "value": "220204" }, { "label": "丰满区", "value": "220211" }, { "label": "永吉县", "value": "220221" }, { "label": "吉林经济开发区", "value": "220271" }, { "label": "吉林高新技术产业开发区", "value": "220272" }, { "label": "吉林中国新加坡食品区", "value": "220273" }, { "label": "蛟河市", "value": "220281" }, { "label": "桦甸市", "value": "220282" }, { "label": "舒兰市", "value": "220283" }, { "label": "磐石市", "value": "220284" }], [{ "label": "铁西区", "value": "220302" }, { "label": "铁东区", "value": "220303" }, { "label": "梨树县", "value": "220322" }, { "label": "伊通满族自治县", "value": "220323" }, { "label": "公主岭市", "value": "220381" }, { "label": "双辽市", "value": "220382" }], [{ "label": "龙山区", "value": "220402" }, { "label": "西安区", "value": "220403" }, { "label": "东丰县", "value": "220421" }, { "label": "东辽县", "value": "220422" }], [{ "label": "东昌区", "value": "220502" }, { "label": "二道江区", "value": "220503" }, { "label": "通化县", "value": "220521" }, { "label": "辉南县", "value": "220523" }, { "label": "柳河县", "value": "220524" }, { "label": "梅河口市", "value": "220581" }, { "label": "集安市", "value": "220582" }], [{ "label": "浑江区", "value": "220602" }, { "label": "江源区", "value": "220605" }, { "label": "抚松县", "value": "220621" }, { "label": "靖宇县", "value": "220622" }, { "label": "长白朝鲜族自治县", "value": "220623" }, { "label": "临江市", "value": "220681" }], [{ "label": "宁江区", "value": "220702" }, { "label": "前郭尔罗斯蒙古族自治县", "value": "220721" }, { "label": "长岭县", "value": "220722" }, { "label": "乾安县", "value": "220723" }, { "label": "吉林松原经济开发区", "value": "220771" }, { "label": "扶余市", "value": "220781" }], [{ "label": "洮北区", "value": "220802" }, { "label": "镇赉县", "value": "220821" }, { "label": "通榆县", "value": "220822" }, { "label": "吉林白城经济开发区", "value": "220871" }, { "label": "洮南市", "value": "220881" }, { "label": "大安市", "value": "220882" }], [{ "label": "延吉市", "value": "222401" }, { "label": "图们市", "value": "222402" }, { "label": "敦化市", "value": "222403" }, { "label": "珲春市", "value": "222404" }, { "label": "龙井市", "value": "222405" }, { "label": "和龙市", "value": "222406" }, { "label": "汪清县", "value": "222424" }, { "label": "安图县", "value": "222426" }]], [[{ "label": "道里区", "value": "230102" }, { "label": "南岗区", "value": "230103" }, { "label": "道外区", "value": "230104" }, { "label": "平房区", "value": "230108" }, { "label": "松北区", "value": "230109" }, { "label": "香坊区", "value": "230110" }, { "label": "呼兰区", "value": "230111" }, { "label": "阿城区", "value": "230112" }, { "label": "双城区", "value": "230113" }, { "label": "依兰县", "value": "230123" }, { "label": "方正县", "value": "230124" }, { "label": "宾县", "value": "230125" }, { "label": "巴彦县", "value": "230126" }, { "label": "木兰县", "value": "230127" }, { "label": "通河县", "value": "230128" }, { "label": "延寿县", "value": "230129" }, { "label": "尚志市", "value": "230183" }, { "label": "五常市", "value": "230184" }], [{ "label": "龙沙区", "value": "230202" }, { "label": "建华区", "value": "230203" }, { "label": "铁锋区", "value": "230204" }, { "label": "昂昂溪区", "value": "230205" }, { "label": "富拉尔基区", "value": "230206" }, { "label": "碾子山区", "value": "230207" }, { "label": "梅里斯达斡尔族区", "value": "230208" }, { "label": "龙江县", "value": "230221" }, { "label": "依安县", "value": "230223" }, { "label": "泰来县", "value": "230224" }, { "label": "甘南县", "value": "230225" }, { "label": "富裕县", "value": "230227" }, { "label": "克山县", "value": "230229" }, { "label": "克东县", "value": "230230" }, { "label": "拜泉县", "value": "230231" }, { "label": "讷河市", "value": "230281" }], [{ "label": "鸡冠区", "value": "230302" }, { "label": "恒山区", "value": "230303" }, { "label": "滴道区", "value": "230304" }, { "label": "梨树区", "value": "230305" }, { "label": "城子河区", "value": "230306" }, { "label": "麻山区", "value": "230307" }, { "label": "鸡东县", "value": "230321" }, { "label": "虎林市", "value": "230381" }, { "label": "密山市", "value": "230382" }], [{ "label": "向阳区", "value": "230402" }, { "label": "工农区", "value": "230403" }, { "label": "南山区", "value": "230404" }, { "label": "兴安区", "value": "230405" }, { "label": "东山区", "value": "230406" }, { "label": "兴山区", "value": "230407" }, { "label": "萝北县", "value": "230421" }, { "label": "绥滨县", "value": "230422" }], [{ "label": "尖山区", "value": "230502" }, { "label": "岭东区", "value": "230503" }, { "label": "四方台区", "value": "230505" }, { "label": "宝山区", "value": "230506" }, { "label": "集贤县", "value": "230521" }, { "label": "友谊县", "value": "230522" }, { "label": "宝清县", "value": "230523" }, { "label": "饶河县", "value": "230524" }], [{ "label": "萨尔图区", "value": "230602" }, { "label": "龙凤区", "value": "230603" }, { "label": "让胡路区", "value": "230604" }, { "label": "红岗区", "value": "230605" }, { "label": "大同区", "value": "230606" }, { "label": "肇州县", "value": "230621" }, { "label": "肇源县", "value": "230622" }, { "label": "林甸县", "value": "230623" }, { "label": "杜尔伯特蒙古族自治县", "value": "230624" }, { "label": "大庆高新技术产业开发区", "value": "230671" }], [{ "label": "伊春区", "value": "230702" }, { "label": "南岔区", "value": "230703" }, { "label": "友好区", "value": "230704" }, { "label": "西林区", "value": "230705" }, { "label": "翠峦区", "value": "230706" }, { "label": "新青区", "value": "230707" }, { "label": "美溪区", "value": "230708" }, { "label": "金山屯区", "value": "230709" }, { "label": "五营区", "value": "230710" }, { "label": "乌马河区", "value": "230711" }, { "label": "汤旺河区", "value": "230712" }, { "label": "带岭区", "value": "230713" }, { "label": "乌伊岭区", "value": "230714" }, { "label": "红星区", "value": "230715" }, { "label": "上甘岭区", "value": "230716" }, { "label": "嘉荫县", "value": "230722" }, { "label": "铁力市", "value": "230781" }], [{ "label": "向阳区", "value": "230803" }, { "label": "前进区", "value": "230804" }, { "label": "东风区", "value": "230805" }, { "label": "郊区", "value": "230811" }, { "label": "桦南县", "value": "230822" }, { "label": "桦川县", "value": "230826" }, { "label": "汤原县", "value": "230828" }, { "label": "同江市", "value": "230881" }, { "label": "富锦市", "value": "230882" }, { "label": "抚远市", "value": "230883" }], [{ "label": "新兴区", "value": "230902" }, { "label": "桃山区", "value": "230903" }, { "label": "茄子河区", "value": "230904" }, { "label": "勃利县", "value": "230921" }], [{ "label": "东安区", "value": "231002" }, { "label": "阳明区", "value": "231003" }, { "label": "爱民区", "value": "231004" }, { "label": "西安区", "value": "231005" }, { "label": "林口县", "value": "231025" }, { "label": "牡丹江经济技术开发区", "value": "231071" }, { "label": "绥芬河市", "value": "231081" }, { "label": "海林市", "value": "231083" }, { "label": "宁安市", "value": "231084" }, { "label": "穆棱市", "value": "231085" }, { "label": "东宁市", "value": "231086" }], [{ "label": "爱辉区", "value": "231102" }, { "label": "嫩江县", "value": "231121" }, { "label": "逊克县", "value": "231123" }, { "label": "孙吴县", "value": "231124" }, { "label": "北安市", "value": "231181" }, { "label": "五大连池市", "value": "231182" }], [{ "label": "北林区", "value": "231202" }, { "label": "望奎县", "value": "231221" }, { "label": "兰西县", "value": "231222" }, { "label": "青冈县", "value": "231223" }, { "label": "庆安县", "value": "231224" }, { "label": "明水县", "value": "231225" }, { "label": "绥棱县", "value": "231226" }, { "label": "安达市", "value": "231281" }, { "label": "肇东市", "value": "231282" }, { "label": "海伦市", "value": "231283" }], [{ "label": "加格达奇区", "value": "232701" }, { "label": "松岭区", "value": "232702" }, { "label": "新林区", "value": "232703" }, { "label": "呼中区", "value": "232704" }, { "label": "呼玛县", "value": "232721" }, { "label": "塔河县", "value": "232722" }, { "label": "漠河县", "value": "232723" }]], [[{ "label": "黄浦区", "value": "310101" }, { "label": "徐汇区", "value": "310104" }, { "label": "长宁区", "value": "310105" }, { "label": "静安区", "value": "310106" }, { "label": "普陀区", "value": "310107" }, { "label": "虹口区", "value": "310109" }, { "label": "杨浦区", "value": "310110" }, { "label": "闵行区", "value": "310112" }, { "label": "宝山区", "value": "310113" }, { "label": "嘉定区", "value": "310114" }, { "label": "浦东新区", "value": "310115" }, { "label": "金山区", "value": "310116" }, { "label": "松江区", "value": "310117" }, { "label": "青浦区", "value": "310118" }, { "label": "奉贤区", "value": "310120" }, { "label": "崇明区", "value": "310151" }]], [[{ "label": "玄武区", "value": "320102" }, { "label": "秦淮区", "value": "320104" }, { "label": "建邺区", "value": "320105" }, { "label": "鼓楼区", "value": "320106" }, { "label": "浦口区", "value": "320111" }, { "label": "栖霞区", "value": "320113" }, { "label": "雨花台区", "value": "320114" }, { "label": "江宁区", "value": "320115" }, { "label": "六合区", "value": "320116" }, { "label": "溧水区", "value": "320117" }, { "label": "高淳区", "value": "320118" }], [{ "label": "锡山区", "value": "320205" }, { "label": "惠山区", "value": "320206" }, { "label": "滨湖区", "value": "320211" }, { "label": "梁溪区", "value": "320213" }, { "label": "新吴区", "value": "320214" }, { "label": "江阴市", "value": "320281" }, { "label": "宜兴市", "value": "320282" }], [{ "label": "鼓楼区", "value": "320302" }, { "label": "云龙区", "value": "320303" }, { "label": "贾汪区", "value": "320305" }, { "label": "泉山区", "value": "320311" }, { "label": "铜山区", "value": "320312" }, { "label": "丰县", "value": "320321" }, { "label": "沛县", "value": "320322" }, { "label": "睢宁县", "value": "320324" }, { "label": "徐州经济技术开发区", "value": "320371" }, { "label": "新沂市", "value": "320381" }, { "label": "邳州市", "value": "320382" }], [{ "label": "天宁区", "value": "320402" }, { "label": "钟楼区", "value": "320404" }, { "label": "新北区", "value": "320411" }, { "label": "武进区", "value": "320412" }, { "label": "金坛区", "value": "320413" }, { "label": "溧阳市", "value": "320481" }], [{ "label": "虎丘区", "value": "320505" }, { "label": "吴中区", "value": "320506" }, { "label": "相城区", "value": "320507" }, { "label": "姑苏区", "value": "320508" }, { "label": "吴江区", "value": "320509" }, { "label": "苏州工业园区", "value": "320571" }, { "label": "常熟市", "value": "320581" }, { "label": "张家港市", "value": "320582" }, { "label": "昆山市", "value": "320583" }, { "label": "太仓市", "value": "320585" }], [{ "label": "崇川区", "value": "320602" }, { "label": "港闸区", "value": "320611" }, { "label": "通州区", "value": "320612" }, { "label": "海安县", "value": "320621" }, { "label": "如东县", "value": "320623" }, { "label": "南通经济技术开发区", "value": "320671" }, { "label": "启东市", "value": "320681" }, { "label": "如皋市", "value": "320682" }, { "label": "海门市", "value": "320684" }], [{ "label": "连云区", "value": "320703" }, { "label": "海州区", "value": "320706" }, { "label": "赣榆区", "value": "320707" }, { "label": "东海县", "value": "320722" }, { "label": "灌云县", "value": "320723" }, { "label": "灌南县", "value": "320724" }, { "label": "连云港经济技术开发区", "value": "320771" }, { "label": "连云港高新技术产业开发区", "value": "320772" }], [{ "label": "淮安区", "value": "320803" }, { "label": "淮阴区", "value": "320804" }, { "label": "清江浦区", "value": "320812" }, { "label": "洪泽区", "value": "320813" }, { "label": "涟水县", "value": "320826" }, { "label": "盱眙县", "value": "320830" }, { "label": "金湖县", "value": "320831" }, { "label": "淮安经济技术开发区", "value": "320871" }], [{ "label": "亭湖区", "value": "320902" }, { "label": "盐都区", "value": "320903" }, { "label": "大丰区", "value": "320904" }, { "label": "响水县", "value": "320921" }, { "label": "滨海县", "value": "320922" }, { "label": "阜宁县", "value": "320923" }, { "label": "射阳县", "value": "320924" }, { "label": "建湖县", "value": "320925" }, { "label": "盐城经济技术开发区", "value": "320971" }, { "label": "东台市", "value": "320981" }], [{ "label": "广陵区", "value": "321002" }, { "label": "邗江区", "value": "321003" }, { "label": "江都区", "value": "321012" }, { "label": "宝应县", "value": "321023" }, { "label": "扬州经济技术开发区", "value": "321071" }, { "label": "仪征市", "value": "321081" }, { "label": "高邮市", "value": "321084" }], [{ "label": "京口区", "value": "321102" }, { "label": "润州区", "value": "321111" }, { "label": "丹徒区", "value": "321112" }, { "label": "镇江新区", "value": "321171" }, { "label": "丹阳市", "value": "321181" }, { "label": "扬中市", "value": "321182" }, { "label": "句容市", "value": "321183" }], [{ "label": "海陵区", "value": "321202" }, { "label": "高港区", "value": "321203" }, { "label": "姜堰区", "value": "321204" }, { "label": "泰州医药高新技术产业开发区", "value": "321271" }, { "label": "兴化市", "value": "321281" }, { "label": "靖江市", "value": "321282" }, { "label": "泰兴市", "value": "321283" }], [{ "label": "宿城区", "value": "321302" }, { "label": "宿豫区", "value": "321311" }, { "label": "沭阳县", "value": "321322" }, { "label": "泗阳县", "value": "321323" }, { "label": "泗洪县", "value": "321324" }, { "label": "宿迁经济技术开发区", "value": "321371" }]], [[{ "label": "上城区", "value": "330102" }, { "label": "下城区", "value": "330103" }, { "label": "江干区", "value": "330104" }, { "label": "拱墅区", "value": "330105" }, { "label": "西湖区", "value": "330106" }, { "label": "滨江区", "value": "330108" }, { "label": "萧山区", "value": "330109" }, { "label": "余杭区", "value": "330110" }, { "label": "富阳区", "value": "330111" }, { "label": "临安区", "value": "330112" }, { "label": "桐庐县", "value": "330122" }, { "label": "淳安县", "value": "330127" }, { "label": "建德市", "value": "330182" }], [{ "label": "海曙区", "value": "330203" }, { "label": "江北区", "value": "330205" }, { "label": "北仑区", "value": "330206" }, { "label": "镇海区", "value": "330211" }, { "label": "鄞州区", "value": "330212" }, { "label": "奉化区", "value": "330213" }, { "label": "象山县", "value": "330225" }, { "label": "宁海县", "value": "330226" }, { "label": "余姚市", "value": "330281" }, { "label": "慈溪市", "value": "330282" }], [{ "label": "鹿城区", "value": "330302" }, { "label": "龙湾区", "value": "330303" }, { "label": "瓯海区", "value": "330304" }, { "label": "洞头区", "value": "330305" }, { "label": "永嘉县", "value": "330324" }, { "label": "平阳县", "value": "330326" }, { "label": "苍南县", "value": "330327" }, { "label": "文成县", "value": "330328" }, { "label": "泰顺县", "value": "330329" }, { "label": "温州经济技术开发区", "value": "330371" }, { "label": "瑞安市", "value": "330381" }, { "label": "乐清市", "value": "330382" }], [{ "label": "南湖区", "value": "330402" }, { "label": "秀洲区", "value": "330411" }, { "label": "嘉善县", "value": "330421" }, { "label": "海盐县", "value": "330424" }, { "label": "海宁市", "value": "330481" }, { "label": "平湖市", "value": "330482" }, { "label": "桐乡市", "value": "330483" }], [{ "label": "吴兴区", "value": "330502" }, { "label": "南浔区", "value": "330503" }, { "label": "德清县", "value": "330521" }, { "label": "长兴县", "value": "330522" }, { "label": "安吉县", "value": "330523" }], [{ "label": "越城区", "value": "330602" }, { "label": "柯桥区", "value": "330603" }, { "label": "上虞区", "value": "330604" }, { "label": "新昌县", "value": "330624" }, { "label": "诸暨市", "value": "330681" }, { "label": "嵊州市", "value": "330683" }], [{ "label": "婺城区", "value": "330702" }, { "label": "金东区", "value": "330703" }, { "label": "武义县", "value": "330723" }, { "label": "浦江县", "value": "330726" }, { "label": "磐安县", "value": "330727" }, { "label": "兰溪市", "value": "330781" }, { "label": "义乌市", "value": "330782" }, { "label": "东阳市", "value": "330783" }, { "label": "永康市", "value": "330784" }], [{ "label": "柯城区", "value": "330802" }, { "label": "衢江区", "value": "330803" }, { "label": "常山县", "value": "330822" }, { "label": "开化县", "value": "330824" }, { "label": "龙游县", "value": "330825" }, { "label": "江山市", "value": "330881" }], [{ "label": "定海区", "value": "330902" }, { "label": "普陀区", "value": "330903" }, { "label": "岱山县", "value": "330921" }, { "label": "嵊泗县", "value": "330922" }], [{ "label": "椒江区", "value": "331002" }, { "label": "黄岩区", "value": "331003" }, { "label": "路桥区", "value": "331004" }, { "label": "三门县", "value": "331022" }, { "label": "天台县", "value": "331023" }, { "label": "仙居县", "value": "331024" }, { "label": "温岭市", "value": "331081" }, { "label": "临海市", "value": "331082" }, { "label": "玉环市", "value": "331083" }], [{ "label": "莲都区", "value": "331102" }, { "label": "青田县", "value": "331121" }, { "label": "缙云县", "value": "331122" }, { "label": "遂昌县", "value": "331123" }, { "label": "松阳县", "value": "331124" }, { "label": "云和县", "value": "331125" }, { "label": "庆元县", "value": "331126" }, { "label": "景宁畲族自治县", "value": "331127" }, { "label": "龙泉市", "value": "331181" }]], [[{ "label": "瑶海区", "value": "340102" }, { "label": "庐阳区", "value": "340103" }, { "label": "蜀山区", "value": "340104" }, { "label": "包河区", "value": "340111" }, { "label": "长丰县", "value": "340121" }, { "label": "肥东县", "value": "340122" }, { "label": "肥西县", "value": "340123" }, { "label": "庐江县", "value": "340124" }, { "label": "合肥高新技术产业开发区", "value": "340171" }, { "label": "合肥经济技术开发区", "value": "340172" }, { "label": "合肥新站高新技术产业开发区", "value": "340173" }, { "label": "巢湖市", "value": "340181" }], [{ "label": "镜湖区", "value": "340202" }, { "label": "弋江区", "value": "340203" }, { "label": "鸠江区", "value": "340207" }, { "label": "三山区", "value": "340208" }, { "label": "芜湖县", "value": "340221" }, { "label": "繁昌县", "value": "340222" }, { "label": "南陵县", "value": "340223" }, { "label": "无为县", "value": "340225" }, { "label": "芜湖经济技术开发区", "value": "340271" }, { "label": "安徽芜湖长江大桥经济开发区", "value": "340272" }], [{ "label": "龙子湖区", "value": "340302" }, { "label": "蚌山区", "value": "340303" }, { "label": "禹会区", "value": "340304" }, { "label": "淮上区", "value": "340311" }, { "label": "怀远县", "value": "340321" }, { "label": "五河县", "value": "340322" }, { "label": "固镇县", "value": "340323" }, { "label": "蚌埠市高新技术开发区", "value": "340371" }, { "label": "蚌埠市经济开发区", "value": "340372" }], [{ "label": "大通区", "value": "340402" }, { "label": "田家庵区", "value": "340403" }, { "label": "谢家集区", "value": "340404" }, { "label": "八公山区", "value": "340405" }, { "label": "潘集区", "value": "340406" }, { "label": "凤台县", "value": "340421" }, { "label": "寿县", "value": "340422" }], [{ "label": "花山区", "value": "340503" }, { "label": "雨山区", "value": "340504" }, { "label": "博望区", "value": "340506" }, { "label": "当涂县", "value": "340521" }, { "label": "含山县", "value": "340522" }, { "label": "和县", "value": "340523" }], [{ "label": "杜集区", "value": "340602" }, { "label": "相山区", "value": "340603" }, { "label": "烈山区", "value": "340604" }, { "label": "濉溪县", "value": "340621" }], [{ "label": "铜官区", "value": "340705" }, { "label": "义安区", "value": "340706" }, { "label": "郊区", "value": "340711" }, { "label": "枞阳县", "value": "340722" }], [{ "label": "迎江区", "value": "340802" }, { "label": "大观区", "value": "340803" }, { "label": "宜秀区", "value": "340811" }, { "label": "怀宁县", "value": "340822" }, { "label": "潜山县", "value": "340824" }, { "label": "太湖县", "value": "340825" }, { "label": "宿松县", "value": "340826" }, { "label": "望江县", "value": "340827" }, { "label": "岳西县", "value": "340828" }, { "label": "安徽安庆经济开发区", "value": "340871" }, { "label": "桐城市", "value": "340881" }], [{ "label": "屯溪区", "value": "341002" }, { "label": "黄山区", "value": "341003" }, { "label": "徽州区", "value": "341004" }, { "label": "歙县", "value": "341021" }, { "label": "休宁县", "value": "341022" }, { "label": "黟县", "value": "341023" }, { "label": "祁门县", "value": "341024" }], [{ "label": "琅琊区", "value": "341102" }, { "label": "南谯区", "value": "341103" }, { "label": "来安县", "value": "341122" }, { "label": "全椒县", "value": "341124" }, { "label": "定远县", "value": "341125" }, { "label": "凤阳县", "value": "341126" }, { "label": "苏滁现代产业园", "value": "341171" }, { "label": "滁州经济技术开发区", "value": "341172" }, { "label": "天长市", "value": "341181" }, { "label": "明光市", "value": "341182" }], [{ "label": "颍州区", "value": "341202" }, { "label": "颍东区", "value": "341203" }, { "label": "颍泉区", "value": "341204" }, { "label": "临泉县", "value": "341221" }, { "label": "太和县", "value": "341222" }, { "label": "阜南县", "value": "341225" }, { "label": "颍上县", "value": "341226" }, { "label": "阜阳合肥现代产业园区", "value": "341271" }, { "label": "阜阳经济技术开发区", "value": "341272" }, { "label": "界首市", "value": "341282" }], [{ "label": "埇桥区", "value": "341302" }, { "label": "砀山县", "value": "341321" }, { "label": "萧县", "value": "341322" }, { "label": "灵璧县", "value": "341323" }, { "label": "泗县", "value": "341324" }, { "label": "宿州马鞍山现代产业园区", "value": "341371" }, { "label": "宿州经济技术开发区", "value": "341372" }], [{ "label": "金安区", "value": "341502" }, { "label": "裕安区", "value": "341503" }, { "label": "叶集区", "value": "341504" }, { "label": "霍邱县", "value": "341522" }, { "label": "舒城县", "value": "341523" }, { "label": "金寨县", "value": "341524" }, { "label": "霍山县", "value": "341525" }], [{ "label": "谯城区", "value": "341602" }, { "label": "涡阳县", "value": "341621" }, { "label": "蒙城县", "value": "341622" }, { "label": "利辛县", "value": "341623" }], [{ "label": "贵池区", "value": "341702" }, { "label": "东至县", "value": "341721" }, { "label": "石台县", "value": "341722" }, { "label": "青阳县", "value": "341723" }], [{ "label": "宣州区", "value": "341802" }, { "label": "郎溪县", "value": "341821" }, { "label": "广德县", "value": "341822" }, { "label": "泾县", "value": "341823" }, { "label": "绩溪县", "value": "341824" }, { "label": "旌德县", "value": "341825" }, { "label": "宣城市经济开发区", "value": "341871" }, { "label": "宁国市", "value": "341881" }]], [[{ "label": "鼓楼区", "value": "350102" }, { "label": "台江区", "value": "350103" }, { "label": "仓山区", "value": "350104" }, { "label": "马尾区", "value": "350105" }, { "label": "晋安区", "value": "350111" }, { "label": "闽侯县", "value": "350121" }, { "label": "连江县", "value": "350122" }, { "label": "罗源县", "value": "350123" }, { "label": "闽清县", "value": "350124" }, { "label": "永泰县", "value": "350125" }, { "label": "平潭县", "value": "350128" }, { "label": "福清市", "value": "350181" }, { "label": "长乐市", "value": "350182" }], [{ "label": "思明区", "value": "350203" }, { "label": "海沧区", "value": "350205" }, { "label": "湖里区", "value": "350206" }, { "label": "集美区", "value": "350211" }, { "label": "同安区", "value": "350212" }, { "label": "翔安区", "value": "350213" }], [{ "label": "城厢区", "value": "350302" }, { "label": "涵江区", "value": "350303" }, { "label": "荔城区", "value": "350304" }, { "label": "秀屿区", "value": "350305" }, { "label": "仙游县", "value": "350322" }], [{ "label": "梅列区", "value": "350402" }, { "label": "三元区", "value": "350403" }, { "label": "明溪县", "value": "350421" }, { "label": "清流县", "value": "350423" }, { "label": "宁化县", "value": "350424" }, { "label": "大田县", "value": "350425" }, { "label": "尤溪县", "value": "350426" }, { "label": "沙县", "value": "350427" }, { "label": "将乐县", "value": "350428" }, { "label": "泰宁县", "value": "350429" }, { "label": "建宁县", "value": "350430" }, { "label": "永安市", "value": "350481" }], [{ "label": "鲤城区", "value": "350502" }, { "label": "丰泽区", "value": "350503" }, { "label": "洛江区", "value": "350504" }, { "label": "泉港区", "value": "350505" }, { "label": "惠安县", "value": "350521" }, { "label": "安溪县", "value": "350524" }, { "label": "永春县", "value": "350525" }, { "label": "德化县", "value": "350526" }, { "label": "金门县", "value": "350527" }, { "label": "石狮市", "value": "350581" }, { "label": "晋江市", "value": "350582" }, { "label": "南安市", "value": "350583" }], [{ "label": "芗城区", "value": "350602" }, { "label": "龙文区", "value": "350603" }, { "label": "云霄县", "value": "350622" }, { "label": "漳浦县", "value": "350623" }, { "label": "诏安县", "value": "350624" }, { "label": "长泰县", "value": "350625" }, { "label": "东山县", "value": "350626" }, { "label": "南靖县", "value": "350627" }, { "label": "平和县", "value": "350628" }, { "label": "华安县", "value": "350629" }, { "label": "龙海市", "value": "350681" }], [{ "label": "延平区", "value": "350702" }, { "label": "建阳区", "value": "350703" }, { "label": "顺昌县", "value": "350721" }, { "label": "浦城县", "value": "350722" }, { "label": "光泽县", "value": "350723" }, { "label": "松溪县", "value": "350724" }, { "label": "政和县", "value": "350725" }, { "label": "邵武市", "value": "350781" }, { "label": "武夷山市", "value": "350782" }, { "label": "建瓯市", "value": "350783" }], [{ "label": "新罗区", "value": "350802" }, { "label": "永定区", "value": "350803" }, { "label": "长汀县", "value": "350821" }, { "label": "上杭县", "value": "350823" }, { "label": "武平县", "value": "350824" }, { "label": "连城县", "value": "350825" }, { "label": "漳平市", "value": "350881" }], [{ "label": "蕉城区", "value": "350902" }, { "label": "霞浦县", "value": "350921" }, { "label": "古田县", "value": "350922" }, { "label": "屏南县", "value": "350923" }, { "label": "寿宁县", "value": "350924" }, { "label": "周宁县", "value": "350925" }, { "label": "柘荣县", "value": "350926" }, { "label": "福安市", "value": "350981" }, { "label": "福鼎市", "value": "350982" }]], [[{ "label": "东湖区", "value": "360102" }, { "label": "西湖区", "value": "360103" }, { "label": "青云谱区", "value": "360104" }, { "label": "湾里区", "value": "360105" }, { "label": "青山湖区", "value": "360111" }, { "label": "新建区", "value": "360112" }, { "label": "南昌县", "value": "360121" }, { "label": "安义县", "value": "360123" }, { "label": "进贤县", "value": "360124" }], [{ "label": "昌江区", "value": "360202" }, { "label": "珠山区", "value": "360203" }, { "label": "浮梁县", "value": "360222" }, { "label": "乐平市", "value": "360281" }], [{ "label": "安源区", "value": "360302" }, { "label": "湘东区", "value": "360313" }, { "label": "莲花县", "value": "360321" }, { "label": "上栗县", "value": "360322" }, { "label": "芦溪县", "value": "360323" }], [{ "label": "濂溪区", "value": "360402" }, { "label": "浔阳区", "value": "360403" }, { "label": "柴桑区", "value": "360404" }, { "label": "武宁县", "value": "360423" }, { "label": "修水县", "value": "360424" }, { "label": "永修县", "value": "360425" }, { "label": "德安县", "value": "360426" }, { "label": "都昌县", "value": "360428" }, { "label": "湖口县", "value": "360429" }, { "label": "彭泽县", "value": "360430" }, { "label": "瑞昌市", "value": "360481" }, { "label": "共青城市", "value": "360482" }, { "label": "庐山市", "value": "360483" }], [{ "label": "渝水区", "value": "360502" }, { "label": "分宜县", "value": "360521" }], [{ "label": "月湖区", "value": "360602" }, { "label": "余江县", "value": "360622" }, { "label": "贵溪市", "value": "360681" }], [{ "label": "章贡区", "value": "360702" }, { "label": "南康区", "value": "360703" }, { "label": "赣县区", "value": "360704" }, { "label": "信丰县", "value": "360722" }, { "label": "大余县", "value": "360723" }, { "label": "上犹县", "value": "360724" }, { "label": "崇义县", "value": "360725" }, { "label": "安远县", "value": "360726" }, { "label": "龙南县", "value": "360727" }, { "label": "定南县", "value": "360728" }, { "label": "全南县", "value": "360729" }, { "label": "宁都县", "value": "360730" }, { "label": "于都县", "value": "360731" }, { "label": "兴国县", "value": "360732" }, { "label": "会昌县", "value": "360733" }, { "label": "寻乌县", "value": "360734" }, { "label": "石城县", "value": "360735" }, { "label": "瑞金市", "value": "360781" }], [{ "label": "吉州区", "value": "360802" }, { "label": "青原区", "value": "360803" }, { "label": "吉安县", "value": "360821" }, { "label": "吉水县", "value": "360822" }, { "label": "峡江县", "value": "360823" }, { "label": "新干县", "value": "360824" }, { "label": "永丰县", "value": "360825" }, { "label": "泰和县", "value": "360826" }, { "label": "遂川县", "value": "360827" }, { "label": "万安县", "value": "360828" }, { "label": "安福县", "value": "360829" }, { "label": "永新县", "value": "360830" }, { "label": "井冈山市", "value": "360881" }], [{ "label": "袁州区", "value": "360902" }, { "label": "奉新县", "value": "360921" }, { "label": "万载县", "value": "360922" }, { "label": "上高县", "value": "360923" }, { "label": "宜丰县", "value": "360924" }, { "label": "靖安县", "value": "360925" }, { "label": "铜鼓县", "value": "360926" }, { "label": "丰城市", "value": "360981" }, { "label": "樟树市", "value": "360982" }, { "label": "高安市", "value": "360983" }], [{ "label": "临川区", "value": "361002" }, { "label": "东乡区", "value": "361003" }, { "label": "南城县", "value": "361021" }, { "label": "黎川县", "value": "361022" }, { "label": "南丰县", "value": "361023" }, { "label": "崇仁县", "value": "361024" }, { "label": "乐安县", "value": "361025" }, { "label": "宜黄县", "value": "361026" }, { "label": "金溪县", "value": "361027" }, { "label": "资溪县", "value": "361028" }, { "label": "广昌县", "value": "361030" }], [{ "label": "信州区", "value": "361102" }, { "label": "广丰区", "value": "361103" }, { "label": "上饶县", "value": "361121" }, { "label": "玉山县", "value": "361123" }, { "label": "铅山县", "value": "361124" }, { "label": "横峰县", "value": "361125" }, { "label": "弋阳县", "value": "361126" }, { "label": "余干县", "value": "361127" }, { "label": "鄱阳县", "value": "361128" }, { "label": "万年县", "value": "361129" }, { "label": "婺源县", "value": "361130" }, { "label": "德兴市", "value": "361181" }]], [[{ "label": "历下区", "value": "370102" }, { "label": "市中区", "value": "370103" }, { "label": "槐荫区", "value": "370104" }, { "label": "天桥区", "value": "370105" }, { "label": "历城区", "value": "370112" }, { "label": "长清区", "value": "370113" }, { "label": "章丘区", "value": "370114" }, { "label": "平阴县", "value": "370124" }, { "label": "济阳县", "value": "370125" }, { "label": "商河县", "value": "370126" }, { "label": "济南高新技术产业开发区", "value": "370171" }], [{ "label": "市南区", "value": "370202" }, { "label": "市北区", "value": "370203" }, { "label": "黄岛区", "value": "370211" }, { "label": "崂山区", "value": "370212" }, { "label": "李沧区", "value": "370213" }, { "label": "城阳区", "value": "370214" }, { "label": "即墨区", "value": "370215" }, { "label": "青岛高新技术产业开发区", "value": "370271" }, { "label": "胶州市", "value": "370281" }, { "label": "平度市", "value": "370283" }, { "label": "莱西市", "value": "370285" }], [{ "label": "淄川区", "value": "370302" }, { "label": "张店区", "value": "370303" }, { "label": "博山区", "value": "370304" }, { "label": "临淄区", "value": "370305" }, { "label": "周村区", "value": "370306" }, { "label": "桓台县", "value": "370321" }, { "label": "高青县", "value": "370322" }, { "label": "沂源县", "value": "370323" }], [{ "label": "市中区", "value": "370402" }, { "label": "薛城区", "value": "370403" }, { "label": "峄城区", "value": "370404" }, { "label": "台儿庄区", "value": "370405" }, { "label": "山亭区", "value": "370406" }, { "label": "滕州市", "value": "370481" }], [{ "label": "东营区", "value": "370502" }, { "label": "河口区", "value": "370503" }, { "label": "垦利区", "value": "370505" }, { "label": "利津县", "value": "370522" }, { "label": "广饶县", "value": "370523" }, { "label": "东营经济技术开发区", "value": "370571" }, { "label": "东营港经济开发区", "value": "370572" }], [{ "label": "芝罘区", "value": "370602" }, { "label": "福山区", "value": "370611" }, { "label": "牟平区", "value": "370612" }, { "label": "莱山区", "value": "370613" }, { "label": "长岛县", "value": "370634" }, { "label": "烟台高新技术产业开发区", "value": "370671" }, { "label": "烟台经济技术开发区", "value": "370672" }, { "label": "龙口市", "value": "370681" }, { "label": "莱阳市", "value": "370682" }, { "label": "莱州市", "value": "370683" }, { "label": "蓬莱市", "value": "370684" }, { "label": "招远市", "value": "370685" }, { "label": "栖霞市", "value": "370686" }, { "label": "海阳市", "value": "370687" }], [{ "label": "潍城区", "value": "370702" }, { "label": "寒亭区", "value": "370703" }, { "label": "坊子区", "value": "370704" }, { "label": "奎文区", "value": "370705" }, { "label": "临朐县", "value": "370724" }, { "label": "昌乐县", "value": "370725" }, { "label": "潍坊滨海经济技术开发区", "value": "370772" }, { "label": "青州市", "value": "370781" }, { "label": "诸城市", "value": "370782" }, { "label": "寿光市", "value": "370783" }, { "label": "安丘市", "value": "370784" }, { "label": "高密市", "value": "370785" }, { "label": "昌邑市", "value": "370786" }], [{ "label": "任城区", "value": "370811" }, { "label": "兖州区", "value": "370812" }, { "label": "微山县", "value": "370826" }, { "label": "鱼台县", "value": "370827" }, { "label": "金乡县", "value": "370828" }, { "label": "嘉祥县", "value": "370829" }, { "label": "汶上县", "value": "370830" }, { "label": "泗水县", "value": "370831" }, { "label": "梁山县", "value": "370832" }, { "label": "济宁高新技术产业开发区", "value": "370871" }, { "label": "曲阜市", "value": "370881" }, { "label": "邹城市", "value": "370883" }], [{ "label": "泰山区", "value": "370902" }, { "label": "岱岳区", "value": "370911" }, { "label": "宁阳县", "value": "370921" }, { "label": "东平县", "value": "370923" }, { "label": "新泰市", "value": "370982" }, { "label": "肥城市", "value": "370983" }], [{ "label": "环翠区", "value": "371002" }, { "label": "文登区", "value": "371003" }, { "label": "威海火炬高技术产业开发区", "value": "371071" }, { "label": "威海经济技术开发区", "value": "371072" }, { "label": "威海临港经济技术开发区", "value": "371073" }, { "label": "荣成市", "value": "371082" }, { "label": "乳山市", "value": "371083" }], [{ "label": "东港区", "value": "371102" }, { "label": "岚山区", "value": "371103" }, { "label": "五莲县", "value": "371121" }, { "label": "莒县", "value": "371122" }, { "label": "日照经济技术开发区", "value": "371171" }, { "label": "日照国际海洋城", "value": "371172" }], [{ "label": "莱城区", "value": "371202" }, { "label": "钢城区", "value": "371203" }], [{ "label": "兰山区", "value": "371302" }, { "label": "罗庄区", "value": "371311" }, { "label": "河东区", "value": "371312" }, { "label": "沂南县", "value": "371321" }, { "label": "郯城县", "value": "371322" }, { "label": "沂水县", "value": "371323" }, { "label": "兰陵县", "value": "371324" }, { "label": "费县", "value": "371325" }, { "label": "平邑县", "value": "371326" }, { "label": "莒南县", "value": "371327" }, { "label": "蒙阴县", "value": "371328" }, { "label": "临沭县", "value": "371329" }, { "label": "临沂高新技术产业开发区", "value": "371371" }, { "label": "临沂经济技术开发区", "value": "371372" }, { "label": "临沂临港经济开发区", "value": "371373" }], [{ "label": "德城区", "value": "371402" }, { "label": "陵城区", "value": "371403" }, { "label": "宁津县", "value": "371422" }, { "label": "庆云县", "value": "371423" }, { "label": "临邑县", "value": "371424" }, { "label": "齐河县", "value": "371425" }, { "label": "平原县", "value": "371426" }, { "label": "夏津县", "value": "371427" }, { "label": "武城县", "value": "371428" }, { "label": "德州经济技术开发区", "value": "371471" }, { "label": "德州运河经济开发区", "value": "371472" }, { "label": "乐陵市", "value": "371481" }, { "label": "禹城市", "value": "371482" }], [{ "label": "东昌府区", "value": "371502" }, { "label": "阳谷县", "value": "371521" }, { "label": "莘县", "value": "371522" }, { "label": "茌平县", "value": "371523" }, { "label": "东阿县", "value": "371524" }, { "label": "冠县", "value": "371525" }, { "label": "高唐县", "value": "371526" }, { "label": "临清市", "value": "371581" }], [{ "label": "滨城区", "value": "371602" }, { "label": "沾化区", "value": "371603" }, { "label": "惠民县", "value": "371621" }, { "label": "阳信县", "value": "371622" }, { "label": "无棣县", "value": "371623" }, { "label": "博兴县", "value": "371625" }, { "label": "邹平县", "value": "371626" }], [{ "label": "牡丹区", "value": "371702" }, { "label": "定陶区", "value": "371703" }, { "label": "曹县", "value": "371721" }, { "label": "单县", "value": "371722" }, { "label": "成武县", "value": "371723" }, { "label": "巨野县", "value": "371724" }, { "label": "郓城县", "value": "371725" }, { "label": "鄄城县", "value": "371726" }, { "label": "东明县", "value": "371728" }, { "label": "菏泽经济技术开发区", "value": "371771" }, { "label": "菏泽高新技术开发区", "value": "371772" }]], [[{ "label": "中原区", "value": "410102" }, { "label": "二七区", "value": "410103" }, { "label": "管城回族区", "value": "410104" }, { "label": "金水区", "value": "410105" }, { "label": "上街区", "value": "410106" }, { "label": "惠济区", "value": "410108" }, { "label": "中牟县", "value": "410122" }, { "label": "郑州经济技术开发区", "value": "410171" }, { "label": "郑州高新技术产业开发区", "value": "410172" }, { "label": "郑州航空港经济综合实验区", "value": "410173" }, { "label": "巩义市", "value": "410181" }, { "label": "荥阳市", "value": "410182" }, { "label": "新密市", "value": "410183" }, { "label": "新郑市", "value": "410184" }, { "label": "登封市", "value": "410185" }], [{ "label": "龙亭区", "value": "410202" }, { "label": "顺河回族区", "value": "410203" }, { "label": "鼓楼区", "value": "410204" }, { "label": "禹王台区", "value": "410205" }, { "label": "祥符区", "value": "410212" }, { "label": "杞县", "value": "410221" }, { "label": "通许县", "value": "410222" }, { "label": "尉氏县", "value": "410223" }, { "label": "兰考县", "value": "410225" }], [{ "label": "老城区", "value": "410302" }, { "label": "西工区", "value": "410303" }, { "label": "瀍河回族区", "value": "410304" }, { "label": "涧西区", "value": "410305" }, { "label": "吉利区", "value": "410306" }, { "label": "洛龙区", "value": "410311" }, { "label": "孟津县", "value": "410322" }, { "label": "新安县", "value": "410323" }, { "label": "栾川县", "value": "410324" }, { "label": "嵩县", "value": "410325" }, { "label": "汝阳县", "value": "410326" }, { "label": "宜阳县", "value": "410327" }, { "label": "洛宁县", "value": "410328" }, { "label": "伊川县", "value": "410329" }, { "label": "洛阳高新技术产业开发区", "value": "410371" }, { "label": "偃师市", "value": "410381" }], [{ "label": "新华区", "value": "410402" }, { "label": "卫东区", "value": "410403" }, { "label": "石龙区", "value": "410404" }, { "label": "湛河区", "value": "410411" }, { "label": "宝丰县", "value": "410421" }, { "label": "叶县", "value": "410422" }, { "label": "鲁山县", "value": "410423" }, { "label": "郏县", "value": "410425" }, { "label": "平顶山高新技术产业开发区", "value": "410471" }, { "label": "平顶山市新城区", "value": "410472" }, { "label": "舞钢市", "value": "410481" }, { "label": "汝州市", "value": "410482" }], [{ "label": "文峰区", "value": "410502" }, { "label": "北关区", "value": "410503" }, { "label": "殷都区", "value": "410505" }, { "label": "龙安区", "value": "410506" }, { "label": "安阳县", "value": "410522" }, { "label": "汤阴县", "value": "410523" }, { "label": "滑县", "value": "410526" }, { "label": "内黄县", "value": "410527" }, { "label": "安阳高新技术产业开发区", "value": "410571" }, { "label": "林州市", "value": "410581" }], [{ "label": "鹤山区", "value": "410602" }, { "label": "山城区", "value": "410603" }, { "label": "淇滨区", "value": "410611" }, { "label": "浚县", "value": "410621" }, { "label": "淇县", "value": "410622" }, { "label": "鹤壁经济技术开发区", "value": "410671" }], [{ "label": "红旗区", "value": "410702" }, { "label": "卫滨区", "value": "410703" }, { "label": "凤泉区", "value": "410704" }, { "label": "牧野区", "value": "410711" }, { "label": "新乡县", "value": "410721" }, { "label": "获嘉县", "value": "410724" }, { "label": "原阳县", "value": "410725" }, { "label": "延津县", "value": "410726" }, { "label": "封丘县", "value": "410727" }, { "label": "长垣县", "value": "410728" }, { "label": "新乡高新技术产业开发区", "value": "410771" }, { "label": "新乡经济技术开发区", "value": "410772" }, { "label": "新乡市平原城乡一体化示范区", "value": "410773" }, { "label": "卫辉市", "value": "410781" }, { "label": "辉县市", "value": "410782" }], [{ "label": "解放区", "value": "410802" }, { "label": "中站区", "value": "410803" }, { "label": "马村区", "value": "410804" }, { "label": "山阳区", "value": "410811" }, { "label": "修武县", "value": "410821" }, { "label": "博爱县", "value": "410822" }, { "label": "武陟县", "value": "410823" }, { "label": "温县", "value": "410825" }, { "label": "焦作城乡一体化示范区", "value": "410871" }, { "label": "沁阳市", "value": "410882" }, { "label": "孟州市", "value": "410883" }], [{ "label": "华龙区", "value": "410902" }, { "label": "清丰县", "value": "410922" }, { "label": "南乐县", "value": "410923" }, { "label": "范县", "value": "410926" }, { "label": "台前县", "value": "410927" }, { "label": "濮阳县", "value": "410928" }, { "label": "河南濮阳工业园区", "value": "410971" }, { "label": "濮阳经济技术开发区", "value": "410972" }], [{ "label": "魏都区", "value": "411002" }, { "label": "建安区", "value": "411003" }, { "label": "鄢陵县", "value": "411024" }, { "label": "襄城县", "value": "411025" }, { "label": "许昌经济技术开发区", "value": "411071" }, { "label": "禹州市", "value": "411081" }, { "label": "长葛市", "value": "411082" }], [{ "label": "源汇区", "value": "411102" }, { "label": "郾城区", "value": "411103" }, { "label": "召陵区", "value": "411104" }, { "label": "舞阳县", "value": "411121" }, { "label": "临颍县", "value": "411122" }, { "label": "漯河经济技术开发区", "value": "411171" }], [{ "label": "湖滨区", "value": "411202" }, { "label": "陕州区", "value": "411203" }, { "label": "渑池县", "value": "411221" }, { "label": "卢氏县", "value": "411224" }, { "label": "河南三门峡经济开发区", "value": "411271" }, { "label": "义马市", "value": "411281" }, { "label": "灵宝市", "value": "411282" }], [{ "label": "宛城区", "value": "411302" }, { "label": "卧龙区", "value": "411303" }, { "label": "南召县", "value": "411321" }, { "label": "方城县", "value": "411322" }, { "label": "西峡县", "value": "411323" }, { "label": "镇平县", "value": "411324" }, { "label": "内乡县", "value": "411325" }, { "label": "淅川县", "value": "411326" }, { "label": "社旗县", "value": "411327" }, { "label": "唐河县", "value": "411328" }, { "label": "新野县", "value": "411329" }, { "label": "桐柏县", "value": "411330" }, { "label": "南阳高新技术产业开发区", "value": "411371" }, { "label": "南阳市城乡一体化示范区", "value": "411372" }, { "label": "邓州市", "value": "411381" }], [{ "label": "梁园区", "value": "411402" }, { "label": "睢阳区", "value": "411403" }, { "label": "民权县", "value": "411421" }, { "label": "睢县", "value": "411422" }, { "label": "宁陵县", "value": "411423" }, { "label": "柘城县", "value": "411424" }, { "label": "虞城县", "value": "411425" }, { "label": "夏邑县", "value": "411426" }, { "label": "豫东综合物流产业聚集区", "value": "411471" }, { "label": "河南商丘经济开发区", "value": "411472" }, { "label": "永城市", "value": "411481" }], [{ "label": "浉河区", "value": "411502" }, { "label": "平桥区", "value": "411503" }, { "label": "罗山县", "value": "411521" }, { "label": "光山县", "value": "411522" }, { "label": "新县", "value": "411523" }, { "label": "商城县", "value": "411524" }, { "label": "固始县", "value": "411525" }, { "label": "潢川县", "value": "411526" }, { "label": "淮滨县", "value": "411527" }, { "label": "息县", "value": "411528" }, { "label": "信阳高新技术产业开发区", "value": "411571" }], [{ "label": "川汇区", "value": "411602" }, { "label": "扶沟县", "value": "411621" }, { "label": "西华县", "value": "411622" }, { "label": "商水县", "value": "411623" }, { "label": "沈丘县", "value": "411624" }, { "label": "郸城县", "value": "411625" }, { "label": "淮阳县", "value": "411626" }, { "label": "太康县", "value": "411627" }, { "label": "鹿邑县", "value": "411628" }, { "label": "河南周口经济开发区", "value": "411671" }, { "label": "项城市", "value": "411681" }], [{ "label": "驿城区", "value": "411702" }, { "label": "西平县", "value": "411721" }, { "label": "上蔡县", "value": "411722" }, { "label": "平舆县", "value": "411723" }, { "label": "正阳县", "value": "411724" }, { "label": "确山县", "value": "411725" }, { "label": "泌阳县", "value": "411726" }, { "label": "汝南县", "value": "411727" }, { "label": "遂平县", "value": "411728" }, { "label": "新蔡县", "value": "411729" }, { "label": "河南驻马店经济开发区", "value": "411771" }], [{ "label": "济源市", "value": "419001" }]], [[{ "label": "江岸区", "value": "420102" }, { "label": "江汉区", "value": "420103" }, { "label": "硚口区", "value": "420104" }, { "label": "汉阳区", "value": "420105" }, { "label": "武昌区", "value": "420106" }, { "label": "青山区", "value": "420107" }, { "label": "洪山区", "value": "420111" }, { "label": "东西湖区", "value": "420112" }, { "label": "汉南区", "value": "420113" }, { "label": "蔡甸区", "value": "420114" }, { "label": "江夏区", "value": "420115" }, { "label": "黄陂区", "value": "420116" }, { "label": "新洲区", "value": "420117" }], [{ "label": "黄石港区", "value": "420202" }, { "label": "西塞山区", "value": "420203" }, { "label": "下陆区", "value": "420204" }, { "label": "铁山区", "value": "420205" }, { "label": "阳新县", "value": "420222" }, { "label": "大冶市", "value": "420281" }], [{ "label": "茅箭区", "value": "420302" }, { "label": "张湾区", "value": "420303" }, { "label": "郧阳区", "value": "420304" }, { "label": "郧西县", "value": "420322" }, { "label": "竹山县", "value": "420323" }, { "label": "竹溪县", "value": "420324" }, { "label": "房县", "value": "420325" }, { "label": "丹江口市", "value": "420381" }], [{ "label": "西陵区", "value": "420502" }, { "label": "伍家岗区", "value": "420503" }, { "label": "点军区", "value": "420504" }, { "label": "猇亭区", "value": "420505" }, { "label": "夷陵区", "value": "420506" }, { "label": "远安县", "value": "420525" }, { "label": "兴山县", "value": "420526" }, { "label": "秭归县", "value": "420527" }, { "label": "长阳土家族自治县", "value": "420528" }, { "label": "五峰土家族自治县", "value": "420529" }, { "label": "宜都市", "value": "420581" }, { "label": "当阳市", "value": "420582" }, { "label": "枝江市", "value": "420583" }], [{ "label": "襄城区", "value": "420602" }, { "label": "樊城区", "value": "420606" }, { "label": "襄州区", "value": "420607" }, { "label": "南漳县", "value": "420624" }, { "label": "谷城县", "value": "420625" }, { "label": "保康县", "value": "420626" }, { "label": "老河口市", "value": "420682" }, { "label": "枣阳市", "value": "420683" }, { "label": "宜城市", "value": "420684" }], [{ "label": "梁子湖区", "value": "420702" }, { "label": "华容区", "value": "420703" }, { "label": "鄂城区", "value": "420704" }], [{ "label": "东宝区", "value": "420802" }, { "label": "掇刀区", "value": "420804" }, { "label": "京山县", "value": "420821" }, { "label": "沙洋县", "value": "420822" }, { "label": "钟祥市", "value": "420881" }], [{ "label": "孝南区", "value": "420902" }, { "label": "孝昌县", "value": "420921" }, { "label": "大悟县", "value": "420922" }, { "label": "云梦县", "value": "420923" }, { "label": "应城市", "value": "420981" }, { "label": "安陆市", "value": "420982" }, { "label": "汉川市", "value": "420984" }], [{ "label": "沙市区", "value": "421002" }, { "label": "荆州区", "value": "421003" }, { "label": "公安县", "value": "421022" }, { "label": "监利县", "value": "421023" }, { "label": "江陵县", "value": "421024" }, { "label": "荆州经济技术开发区", "value": "421071" }, { "label": "石首市", "value": "421081" }, { "label": "洪湖市", "value": "421083" }, { "label": "松滋市", "value": "421087" }], [{ "label": "黄州区", "value": "421102" }, { "label": "团风县", "value": "421121" }, { "label": "红安县", "value": "421122" }, { "label": "罗田县", "value": "421123" }, { "label": "英山县", "value": "421124" }, { "label": "浠水县", "value": "421125" }, { "label": "蕲春县", "value": "421126" }, { "label": "黄梅县", "value": "421127" }, { "label": "龙感湖管理区", "value": "421171" }, { "label": "麻城市", "value": "421181" }, { "label": "武穴市", "value": "421182" }], [{ "label": "咸安区", "value": "421202" }, { "label": "嘉鱼县", "value": "421221" }, { "label": "通城县", "value": "421222" }, { "label": "崇阳县", "value": "421223" }, { "label": "通山县", "value": "421224" }, { "label": "赤壁市", "value": "421281" }], [{ "label": "曾都区", "value": "421303" }, { "label": "随县", "value": "421321" }, { "label": "广水市", "value": "421381" }], [{ "label": "恩施市", "value": "422801" }, { "label": "利川市", "value": "422802" }, { "label": "建始县", "value": "422822" }, { "label": "巴东县", "value": "422823" }, { "label": "宣恩县", "value": "422825" }, { "label": "咸丰县", "value": "422826" }, { "label": "来凤县", "value": "422827" }, { "label": "鹤峰县", "value": "422828" }], [{ "label": "仙桃市", "value": "429004" }, { "label": "潜江市", "value": "429005" }, { "label": "天门市", "value": "429006" }, { "label": "神农架林区", "value": "429021" }]], [[{ "label": "芙蓉区", "value": "430102" }, { "label": "天心区", "value": "430103" }, { "label": "岳麓区", "value": "430104" }, { "label": "开福区", "value": "430105" }, { "label": "雨花区", "value": "430111" }, { "label": "望城区", "value": "430112" }, { "label": "长沙县", "value": "430121" }, { "label": "浏阳市", "value": "430181" }, { "label": "宁乡市", "value": "430182" }], [{ "label": "荷塘区", "value": "430202" }, { "label": "芦淞区", "value": "430203" }, { "label": "石峰区", "value": "430204" }, { "label": "天元区", "value": "430211" }, { "label": "株洲县", "value": "430221" }, { "label": "攸县", "value": "430223" }, { "label": "茶陵县", "value": "430224" }, { "label": "炎陵县", "value": "430225" }, { "label": "云龙示范区", "value": "430271" }, { "label": "醴陵市", "value": "430281" }], [{ "label": "雨湖区", "value": "430302" }, { "label": "岳塘区", "value": "430304" }, { "label": "湘潭县", "value": "430321" }, { "label": "湖南湘潭高新技术产业园区", "value": "430371" }, { "label": "湘潭昭山示范区", "value": "430372" }, { "label": "湘潭九华示范区", "value": "430373" }, { "label": "湘乡市", "value": "430381" }, { "label": "韶山市", "value": "430382" }], [{ "label": "珠晖区", "value": "430405" }, { "label": "雁峰区", "value": "430406" }, { "label": "石鼓区", "value": "430407" }, { "label": "蒸湘区", "value": "430408" }, { "label": "南岳区", "value": "430412" }, { "label": "衡阳县", "value": "430421" }, { "label": "衡南县", "value": "430422" }, { "label": "衡山县", "value": "430423" }, { "label": "衡东县", "value": "430424" }, { "label": "祁东县", "value": "430426" }, { "label": "衡阳综合保税区", "value": "430471" }, { "label": "湖南衡阳高新技术产业园区", "value": "430472" }, { "label": "湖南衡阳松木经济开发区", "value": "430473" }, { "label": "耒阳市", "value": "430481" }, { "label": "常宁市", "value": "430482" }], [{ "label": "双清区", "value": "430502" }, { "label": "大祥区", "value": "430503" }, { "label": "北塔区", "value": "430511" }, { "label": "邵东县", "value": "430521" }, { "label": "新邵县", "value": "430522" }, { "label": "邵阳县", "value": "430523" }, { "label": "隆回县", "value": "430524" }, { "label": "洞口县", "value": "430525" }, { "label": "绥宁县", "value": "430527" }, { "label": "新宁县", "value": "430528" }, { "label": "城步苗族自治县", "value": "430529" }, { "label": "武冈市", "value": "430581" }], [{ "label": "岳阳楼区", "value": "430602" }, { "label": "云溪区", "value": "430603" }, { "label": "君山区", "value": "430611" }, { "label": "岳阳县", "value": "430621" }, { "label": "华容县", "value": "430623" }, { "label": "湘阴县", "value": "430624" }, { "label": "平江县", "value": "430626" }, { "label": "岳阳市屈原管理区", "value": "430671" }, { "label": "汨罗市", "value": "430681" }, { "label": "临湘市", "value": "430682" }], [{ "label": "武陵区", "value": "430702" }, { "label": "鼎城区", "value": "430703" }, { "label": "安乡县", "value": "430721" }, { "label": "汉寿县", "value": "430722" }, { "label": "澧县", "value": "430723" }, { "label": "临澧县", "value": "430724" }, { "label": "桃源县", "value": "430725" }, { "label": "石门县", "value": "430726" }, { "label": "常德市西洞庭管理区", "value": "430771" }, { "label": "津市市", "value": "430781" }], [{ "label": "永定区", "value": "430802" }, { "label": "武陵源区", "value": "430811" }, { "label": "慈利县", "value": "430821" }, { "label": "桑植县", "value": "430822" }], [{ "label": "资阳区", "value": "430902" }, { "label": "赫山区", "value": "430903" }, { "label": "南县", "value": "430921" }, { "label": "桃江县", "value": "430922" }, { "label": "安化县", "value": "430923" }, { "label": "益阳市大通湖管理区", "value": "430971" }, { "label": "湖南益阳高新技术产业园区", "value": "430972" }, { "label": "沅江市", "value": "430981" }], [{ "label": "北湖区", "value": "431002" }, { "label": "苏仙区", "value": "431003" }, { "label": "桂阳县", "value": "431021" }, { "label": "宜章县", "value": "431022" }, { "label": "永兴县", "value": "431023" }, { "label": "嘉禾县", "value": "431024" }, { "label": "临武县", "value": "431025" }, { "label": "汝城县", "value": "431026" }, { "label": "桂东县", "value": "431027" }, { "label": "安仁县", "value": "431028" }, { "label": "资兴市", "value": "431081" }], [{ "label": "零陵区", "value": "431102" }, { "label": "冷水滩区", "value": "431103" }, { "label": "祁阳县", "value": "431121" }, { "label": "东安县", "value": "431122" }, { "label": "双牌县", "value": "431123" }, { "label": "道县", "value": "431124" }, { "label": "江永县", "value": "431125" }, { "label": "宁远县", "value": "431126" }, { "label": "蓝山县", "value": "431127" }, { "label": "新田县", "value": "431128" }, { "label": "江华瑶族自治县", "value": "431129" }, { "label": "永州经济技术开发区", "value": "431171" }, { "label": "永州市金洞管理区", "value": "431172" }, { "label": "永州市回龙圩管理区", "value": "431173" }], [{ "label": "鹤城区", "value": "431202" }, { "label": "中方县", "value": "431221" }, { "label": "沅陵县", "value": "431222" }, { "label": "辰溪县", "value": "431223" }, { "label": "溆浦县", "value": "431224" }, { "label": "会同县", "value": "431225" }, { "label": "麻阳苗族自治县", "value": "431226" }, { "label": "新晃侗族自治县", "value": "431227" }, { "label": "芷江侗族自治县", "value": "431228" }, { "label": "靖州苗族侗族自治县", "value": "431229" }, { "label": "通道侗族自治县", "value": "431230" }, { "label": "怀化市洪江管理区", "value": "431271" }, { "label": "洪江市", "value": "431281" }], [{ "label": "娄星区", "value": "431302" }, { "label": "双峰县", "value": "431321" }, { "label": "新化县", "value": "431322" }, { "label": "冷水江市", "value": "431381" }, { "label": "涟源市", "value": "431382" }], [{ "label": "吉首市", "value": "433101" }, { "label": "泸溪县", "value": "433122" }, { "label": "凤凰县", "value": "433123" }, { "label": "花垣县", "value": "433124" }, { "label": "保靖县", "value": "433125" }, { "label": "古丈县", "value": "433126" }, { "label": "永顺县", "value": "433127" }, { "label": "龙山县", "value": "433130" }, { "label": "湖南吉首经济开发区", "value": "433172" }, { "label": "湖南永顺经济开发区", "value": "433173" }]], [[{ "label": "荔湾区", "value": "440103" }, { "label": "越秀区", "value": "440104" }, { "label": "海珠区", "value": "440105" }, { "label": "天河区", "value": "440106" }, { "label": "白云区", "value": "440111" }, { "label": "黄埔区", "value": "440112" }, { "label": "番禺区", "value": "440113" }, { "label": "花都区", "value": "440114" }, { "label": "南沙区", "value": "440115" }, { "label": "从化区", "value": "440117" }, { "label": "增城区", "value": "440118" }], [{ "label": "武江区", "value": "440203" }, { "label": "浈江区", "value": "440204" }, { "label": "曲江区", "value": "440205" }, { "label": "始兴县", "value": "440222" }, { "label": "仁化县", "value": "440224" }, { "label": "翁源县", "value": "440229" }, { "label": "乳源瑶族自治县", "value": "440232" }, { "label": "新丰县", "value": "440233" }, { "label": "乐昌市", "value": "440281" }, { "label": "南雄市", "value": "440282" }], [{ "label": "罗湖区", "value": "440303" }, { "label": "福田区", "value": "440304" }, { "label": "南山区", "value": "440305" }, { "label": "宝安区", "value": "440306" }, { "label": "龙岗区", "value": "440307" }, { "label": "盐田区", "value": "440308" }, { "label": "龙华区", "value": "440309" }, { "label": "坪山区", "value": "440310" }], [{ "label": "香洲区", "value": "440402" }, { "label": "斗门区", "value": "440403" }, { "label": "金湾区", "value": "440404" }], [{ "label": "龙湖区", "value": "440507" }, { "label": "金平区", "value": "440511" }, { "label": "濠江区", "value": "440512" }, { "label": "潮阳区", "value": "440513" }, { "label": "潮南区", "value": "440514" }, { "label": "澄海区", "value": "440515" }, { "label": "南澳县", "value": "440523" }], [{ "label": "禅城区", "value": "440604" }, { "label": "南海区", "value": "440605" }, { "label": "顺德区", "value": "440606" }, { "label": "三水区", "value": "440607" }, { "label": "高明区", "value": "440608" }], [{ "label": "蓬江区", "value": "440703" }, { "label": "江海区", "value": "440704" }, { "label": "新会区", "value": "440705" }, { "label": "台山市", "value": "440781" }, { "label": "开平市", "value": "440783" }, { "label": "鹤山市", "value": "440784" }, { "label": "恩平市", "value": "440785" }], [{ "label": "赤坎区", "value": "440802" }, { "label": "霞山区", "value": "440803" }, { "label": "坡头区", "value": "440804" }, { "label": "麻章区", "value": "440811" }, { "label": "遂溪县", "value": "440823" }, { "label": "徐闻县", "value": "440825" }, { "label": "廉江市", "value": "440881" }, { "label": "雷州市", "value": "440882" }, { "label": "吴川市", "value": "440883" }], [{ "label": "茂南区", "value": "440902" }, { "label": "电白区", "value": "440904" }, { "label": "高州市", "value": "440981" }, { "label": "化州市", "value": "440982" }, { "label": "信宜市", "value": "440983" }], [{ "label": "端州区", "value": "441202" }, { "label": "鼎湖区", "value": "441203" }, { "label": "高要区", "value": "441204" }, { "label": "广宁县", "value": "441223" }, { "label": "怀集县", "value": "441224" }, { "label": "封开县", "value": "441225" }, { "label": "德庆县", "value": "441226" }, { "label": "四会市", "value": "441284" }], [{ "label": "惠城区", "value": "441302" }, { "label": "惠阳区", "value": "441303" }, { "label": "博罗县", "value": "441322" }, { "label": "惠东县", "value": "441323" }, { "label": "龙门县", "value": "441324" }], [{ "label": "梅江区", "value": "441402" }, { "label": "梅县区", "value": "441403" }, { "label": "大埔县", "value": "441422" }, { "label": "丰顺县", "value": "441423" }, { "label": "五华县", "value": "441424" }, { "label": "平远县", "value": "441426" }, { "label": "蕉岭县", "value": "441427" }, { "label": "兴宁市", "value": "441481" }], [{ "label": "城区", "value": "441502" }, { "label": "海丰县", "value": "441521" }, { "label": "陆河县", "value": "441523" }, { "label": "陆丰市", "value": "441581" }], [{ "label": "源城区", "value": "441602" }, { "label": "紫金县", "value": "441621" }, { "label": "龙川县", "value": "441622" }, { "label": "连平县", "value": "441623" }, { "label": "和平县", "value": "441624" }, { "label": "东源县", "value": "441625" }], [{ "label": "江城区", "value": "441702" }, { "label": "阳东区", "value": "441704" }, { "label": "阳西县", "value": "441721" }, { "label": "阳春市", "value": "441781" }], [{ "label": "清城区", "value": "441802" }, { "label": "清新区", "value": "441803" }, { "label": "佛冈县", "value": "441821" }, { "label": "阳山县", "value": "441823" }, { "label": "连山壮族瑶族自治县", "value": "441825" }, { "label": "连南瑶族自治县", "value": "441826" }, { "label": "英德市", "value": "441881" }, { "label": "连州市", "value": "441882" }], [{ "label": "东莞市", "value": "441900" }], [{ "label": "中山市", "value": "442000" }], [{ "label": "湘桥区", "value": "445102" }, { "label": "潮安区", "value": "445103" }, { "label": "饶平县", "value": "445122" }], [{ "label": "榕城区", "value": "445202" }, { "label": "揭东区", "value": "445203" }, { "label": "揭西县", "value": "445222" }, { "label": "惠来县", "value": "445224" }, { "label": "普宁市", "value": "445281" }], [{ "label": "云城区", "value": "445302" }, { "label": "云安区", "value": "445303" }, { "label": "新兴县", "value": "445321" }, { "label": "郁南县", "value": "445322" }, { "label": "罗定市", "value": "445381" }]], [[{ "label": "兴宁区", "value": "450102" }, { "label": "青秀区", "value": "450103" }, { "label": "江南区", "value": "450105" }, { "label": "西乡塘区", "value": "450107" }, { "label": "良庆区", "value": "450108" }, { "label": "邕宁区", "value": "450109" }, { "label": "武鸣区", "value": "450110" }, { "label": "隆安县", "value": "450123" }, { "label": "马山县", "value": "450124" }, { "label": "上林县", "value": "450125" }, { "label": "宾阳县", "value": "450126" }, { "label": "横县", "value": "450127" }], [{ "label": "城中区", "value": "450202" }, { "label": "鱼峰区", "value": "450203" }, { "label": "柳南区", "value": "450204" }, { "label": "柳北区", "value": "450205" }, { "label": "柳江区", "value": "450206" }, { "label": "柳城县", "value": "450222" }, { "label": "鹿寨县", "value": "450223" }, { "label": "融安县", "value": "450224" }, { "label": "融水苗族自治县", "value": "450225" }, { "label": "三江侗族自治县", "value": "450226" }], [{ "label": "秀峰区", "value": "450302" }, { "label": "叠彩区", "value": "450303" }, { "label": "象山区", "value": "450304" }, { "label": "七星区", "value": "450305" }, { "label": "雁山区", "value": "450311" }, { "label": "临桂区", "value": "450312" }, { "label": "阳朔县", "value": "450321" }, { "label": "灵川县", "value": "450323" }, { "label": "全州县", "value": "450324" }, { "label": "兴安县", "value": "450325" }, { "label": "永福县", "value": "450326" }, { "label": "灌阳县", "value": "450327" }, { "label": "龙胜各族自治县", "value": "450328" }, { "label": "资源县", "value": "450329" }, { "label": "平乐县", "value": "450330" }, { "label": "荔浦县", "value": "450331" }, { "label": "恭城瑶族自治县", "value": "450332" }], [{ "label": "万秀区", "value": "450403" }, { "label": "长洲区", "value": "450405" }, { "label": "龙圩区", "value": "450406" }, { "label": "苍梧县", "value": "450421" }, { "label": "藤县", "value": "450422" }, { "label": "蒙山县", "value": "450423" }, { "label": "岑溪市", "value": "450481" }], [{ "label": "海城区", "value": "450502" }, { "label": "银海区", "value": "450503" }, { "label": "铁山港区", "value": "450512" }, { "label": "合浦县", "value": "450521" }], [{ "label": "港口区", "value": "450602" }, { "label": "防城区", "value": "450603" }, { "label": "上思县", "value": "450621" }, { "label": "东兴市", "value": "450681" }], [{ "label": "钦南区", "value": "450702" }, { "label": "钦北区", "value": "450703" }, { "label": "灵山县", "value": "450721" }, { "label": "浦北县", "value": "450722" }], [{ "label": "港北区", "value": "450802" }, { "label": "港南区", "value": "450803" }, { "label": "覃塘区", "value": "450804" }, { "label": "平南县", "value": "450821" }, { "label": "桂平市", "value": "450881" }], [{ "label": "玉州区", "value": "450902" }, { "label": "福绵区", "value": "450903" }, { "label": "容县", "value": "450921" }, { "label": "陆川县", "value": "450922" }, { "label": "博白县", "value": "450923" }, { "label": "兴业县", "value": "450924" }, { "label": "北流市", "value": "450981" }], [{ "label": "右江区", "value": "451002" }, { "label": "田阳县", "value": "451021" }, { "label": "田东县", "value": "451022" }, { "label": "平果县", "value": "451023" }, { "label": "德保县", "value": "451024" }, { "label": "那坡县", "value": "451026" }, { "label": "凌云县", "value": "451027" }, { "label": "乐业县", "value": "451028" }, { "label": "田林县", "value": "451029" }, { "label": "西林县", "value": "451030" }, { "label": "隆林各族自治县", "value": "451031" }, { "label": "靖西市", "value": "451081" }], [{ "label": "八步区", "value": "451102" }, { "label": "平桂区", "value": "451103" }, { "label": "昭平县", "value": "451121" }, { "label": "钟山县", "value": "451122" }, { "label": "富川瑶族自治县", "value": "451123" }], [{ "label": "金城江区", "value": "451202" }, { "label": "宜州区", "value": "451203" }, { "label": "南丹县", "value": "451221" }, { "label": "天峨县", "value": "451222" }, { "label": "凤山县", "value": "451223" }, { "label": "东兰县", "value": "451224" }, { "label": "罗城仫佬族自治县", "value": "451225" }, { "label": "环江毛南族自治县", "value": "451226" }, { "label": "巴马瑶族自治县", "value": "451227" }, { "label": "都安瑶族自治县", "value": "451228" }, { "label": "大化瑶族自治县", "value": "451229" }], [{ "label": "兴宾区", "value": "451302" }, { "label": "忻城县", "value": "451321" }, { "label": "象州县", "value": "451322" }, { "label": "武宣县", "value": "451323" }, { "label": "金秀瑶族自治县", "value": "451324" }, { "label": "合山市", "value": "451381" }], [{ "label": "江州区", "value": "451402" }, { "label": "扶绥县", "value": "451421" }, { "label": "宁明县", "value": "451422" }, { "label": "龙州县", "value": "451423" }, { "label": "大新县", "value": "451424" }, { "label": "天等县", "value": "451425" }, { "label": "凭祥市", "value": "451481" }]], [[{ "label": "秀英区", "value": "460105" }, { "label": "龙华区", "value": "460106" }, { "label": "琼山区", "value": "460107" }, { "label": "美兰区", "value": "460108" }], [{ "label": "海棠区", "value": "460202" }, { "label": "吉阳区", "value": "460203" }, { "label": "天涯区", "value": "460204" }, { "label": "崖州区", "value": "460205" }], [{ "label": "西沙群岛", "value": "460321" }, { "label": "南沙群岛", "value": "460322" }, { "label": "中沙群岛的岛礁及其海域", "value": "460323" }], [{ "label": "儋州市", "value": "460400" }], [{ "label": "五指山市", "value": "469001" }, { "label": "琼海市", "value": "469002" }, { "label": "文昌市", "value": "469005" }, { "label": "万宁市", "value": "469006" }, { "label": "东方市", "value": "469007" }, { "label": "定安县", "value": "469021" }, { "label": "屯昌县", "value": "469022" }, { "label": "澄迈县", "value": "469023" }, { "label": "临高县", "value": "469024" }, { "label": "白沙黎族自治县", "value": "469025" }, { "label": "昌江黎族自治县", "value": "469026" }, { "label": "乐东黎族自治县", "value": "469027" }, { "label": "陵水黎族自治县", "value": "469028" }, { "label": "保亭黎族苗族自治县", "value": "469029" }, { "label": "琼中黎族苗族自治县", "value": "469030" }]], [[{ "label": "万州区", "value": "500101" }, { "label": "涪陵区", "value": "500102" }, { "label": "渝中区", "value": "500103" }, { "label": "大渡口区", "value": "500104" }, { "label": "江北区", "value": "500105" }, { "label": "沙坪坝区", "value": "500106" }, { "label": "九龙坡区", "value": "500107" }, { "label": "南岸区", "value": "500108" }, { "label": "北碚区", "value": "500109" }, { "label": "綦江区", "value": "500110" }, { "label": "大足区", "value": "500111" }, { "label": "渝北区", "value": "500112" }, { "label": "巴南区", "value": "500113" }, { "label": "黔江区", "value": "500114" }, { "label": "长寿区", "value": "500115" }, { "label": "江津区", "value": "500116" }, { "label": "合川区", "value": "500117" }, { "label": "永川区", "value": "500118" }, { "label": "南川区", "value": "500119" }, { "label": "璧山区", "value": "500120" }, { "label": "铜梁区", "value": "500151" }, { "label": "潼南区", "value": "500152" }, { "label": "荣昌区", "value": "500153" }, { "label": "开州区", "value": "500154" }, { "label": "梁平区", "value": "500155" }, { "label": "武隆区", "value": "500156" }], [{ "label": "城口县", "value": "500229" }, { "label": "丰都县", "value": "500230" }, { "label": "垫江县", "value": "500231" }, { "label": "忠县", "value": "500233" }, { "label": "云阳县", "value": "500235" }, { "label": "奉节县", "value": "500236" }, { "label": "巫山县", "value": "500237" }, { "label": "巫溪县", "value": "500238" }, { "label": "石柱土家族自治县", "value": "500240" }, { "label": "秀山土家族苗族自治县", "value": "500241" }, { "label": "酉阳土家族苗族自治县", "value": "500242" }, { "label": "彭水苗族土家族自治县", "value": "500243" }]], [[{ "label": "锦江区", "value": "510104" }, { "label": "青羊区", "value": "510105" }, { "label": "金牛区", "value": "510106" }, { "label": "武侯区", "value": "510107" }, { "label": "成华区", "value": "510108" }, { "label": "龙泉驿区", "value": "510112" }, { "label": "青白江区", "value": "510113" }, { "label": "新都区", "value": "510114" }, { "label": "温江区", "value": "510115" }, { "label": "双流区", "value": "510116" }, { "label": "郫都区", "value": "510117" }, { "label": "金堂县", "value": "510121" }, { "label": "大邑县", "value": "510129" }, { "label": "蒲江县", "value": "510131" }, { "label": "新津县", "value": "510132" }, { "label": "都江堰市", "value": "510181" }, { "label": "彭州市", "value": "510182" }, { "label": "邛崃市", "value": "510183" }, { "label": "崇州市", "value": "510184" }, { "label": "简阳市", "value": "510185" }], [{ "label": "自流井区", "value": "510302" }, { "label": "贡井区", "value": "510303" }, { "label": "大安区", "value": "510304" }, { "label": "沿滩区", "value": "510311" }, { "label": "荣县", "value": "510321" }, { "label": "富顺县", "value": "510322" }], [{ "label": "东区", "value": "510402" }, { "label": "西区", "value": "510403" }, { "label": "仁和区", "value": "510411" }, { "label": "米易县", "value": "510421" }, { "label": "盐边县", "value": "510422" }], [{ "label": "江阳区", "value": "510502" }, { "label": "纳溪区", "value": "510503" }, { "label": "龙马潭区", "value": "510504" }, { "label": "泸县", "value": "510521" }, { "label": "合江县", "value": "510522" }, { "label": "叙永县", "value": "510524" }, { "label": "古蔺县", "value": "510525" }], [{ "label": "旌阳区", "value": "510603" }, { "label": "罗江区", "value": "510604" }, { "label": "中江县", "value": "510623" }, { "label": "广汉市", "value": "510681" }, { "label": "什邡市", "value": "510682" }, { "label": "绵竹市", "value": "510683" }], [{ "label": "涪城区", "value": "510703" }, { "label": "游仙区", "value": "510704" }, { "label": "安州区", "value": "510705" }, { "label": "三台县", "value": "510722" }, { "label": "盐亭县", "value": "510723" }, { "label": "梓潼县", "value": "510725" }, { "label": "北川羌族自治县", "value": "510726" }, { "label": "平武县", "value": "510727" }, { "label": "江油市", "value": "510781" }], [{ "label": "利州区", "value": "510802" }, { "label": "昭化区", "value": "510811" }, { "label": "朝天区", "value": "510812" }, { "label": "旺苍县", "value": "510821" }, { "label": "青川县", "value": "510822" }, { "label": "剑阁县", "value": "510823" }, { "label": "苍溪县", "value": "510824" }], [{ "label": "船山区", "value": "510903" }, { "label": "安居区", "value": "510904" }, { "label": "蓬溪县", "value": "510921" }, { "label": "射洪县", "value": "510922" }, { "label": "大英县", "value": "510923" }], [{ "label": "市中区", "value": "511002" }, { "label": "东兴区", "value": "511011" }, { "label": "威远县", "value": "511024" }, { "label": "资中县", "value": "511025" }, { "label": "内江经济开发区", "value": "511071" }, { "label": "隆昌市", "value": "511083" }], [{ "label": "市中区", "value": "511102" }, { "label": "沙湾区", "value": "511111" }, { "label": "五通桥区", "value": "511112" }, { "label": "金口河区", "value": "511113" }, { "label": "犍为县", "value": "511123" }, { "label": "井研县", "value": "511124" }, { "label": "夹江县", "value": "511126" }, { "label": "沐川县", "value": "511129" }, { "label": "峨边彝族自治县", "value": "511132" }, { "label": "马边彝族自治县", "value": "511133" }, { "label": "峨眉山市", "value": "511181" }], [{ "label": "顺庆区", "value": "511302" }, { "label": "高坪区", "value": "511303" }, { "label": "嘉陵区", "value": "511304" }, { "label": "南部县", "value": "511321" }, { "label": "营山县", "value": "511322" }, { "label": "蓬安县", "value": "511323" }, { "label": "仪陇县", "value": "511324" }, { "label": "西充县", "value": "511325" }, { "label": "阆中市", "value": "511381" }], [{ "label": "东坡区", "value": "511402" }, { "label": "彭山区", "value": "511403" }, { "label": "仁寿县", "value": "511421" }, { "label": "洪雅县", "value": "511423" }, { "label": "丹棱县", "value": "511424" }, { "label": "青神县", "value": "511425" }], [{ "label": "翠屏区", "value": "511502" }, { "label": "南溪区", "value": "511503" }, { "label": "宜宾县", "value": "511521" }, { "label": "江安县", "value": "511523" }, { "label": "长宁县", "value": "511524" }, { "label": "高县", "value": "511525" }, { "label": "珙县", "value": "511526" }, { "label": "筠连县", "value": "511527" }, { "label": "兴文县", "value": "511528" }, { "label": "屏山县", "value": "511529" }], [{ "label": "广安区", "value": "511602" }, { "label": "前锋区", "value": "511603" }, { "label": "岳池县", "value": "511621" }, { "label": "武胜县", "value": "511622" }, { "label": "邻水县", "value": "511623" }, { "label": "华蓥市", "value": "511681" }], [{ "label": "通川区", "value": "511702" }, { "label": "达川区", "value": "511703" }, { "label": "宣汉县", "value": "511722" }, { "label": "开江县", "value": "511723" }, { "label": "大竹县", "value": "511724" }, { "label": "渠县", "value": "511725" }, { "label": "达州经济开发区", "value": "511771" }, { "label": "万源市", "value": "511781" }], [{ "label": "雨城区", "value": "511802" }, { "label": "名山区", "value": "511803" }, { "label": "荥经县", "value": "511822" }, { "label": "汉源县", "value": "511823" }, { "label": "石棉县", "value": "511824" }, { "label": "天全县", "value": "511825" }, { "label": "芦山县", "value": "511826" }, { "label": "宝兴县", "value": "511827" }], [{ "label": "巴州区", "value": "511902" }, { "label": "恩阳区", "value": "511903" }, { "label": "通江县", "value": "511921" }, { "label": "南江县", "value": "511922" }, { "label": "平昌县", "value": "511923" }, { "label": "巴中经济开发区", "value": "511971" }], [{ "label": "雁江区", "value": "512002" }, { "label": "安岳县", "value": "512021" }, { "label": "乐至县", "value": "512022" }], [{ "label": "马尔康市", "value": "513201" }, { "label": "汶川县", "value": "513221" }, { "label": "理县", "value": "513222" }, { "label": "茂县", "value": "513223" }, { "label": "松潘县", "value": "513224" }, { "label": "九寨沟县", "value": "513225" }, { "label": "金川县", "value": "513226" }, { "label": "小金县", "value": "513227" }, { "label": "黑水县", "value": "513228" }, { "label": "壤塘县", "value": "513230" }, { "label": "阿坝县", "value": "513231" }, { "label": "若尔盖县", "value": "513232" }, { "label": "红原县", "value": "513233" }], [{ "label": "康定市", "value": "513301" }, { "label": "泸定县", "value": "513322" }, { "label": "丹巴县", "value": "513323" }, { "label": "九龙县", "value": "513324" }, { "label": "雅江县", "value": "513325" }, { "label": "道孚县", "value": "513326" }, { "label": "炉霍县", "value": "513327" }, { "label": "甘孜县", "value": "513328" }, { "label": "新龙县", "value": "513329" }, { "label": "德格县", "value": "513330" }, { "label": "白玉县", "value": "513331" }, { "label": "石渠县", "value": "513332" }, { "label": "色达县", "value": "513333" }, { "label": "理塘县", "value": "513334" }, { "label": "巴塘县", "value": "513335" }, { "label": "乡城县", "value": "513336" }, { "label": "稻城县", "value": "513337" }, { "label": "得荣县", "value": "513338" }], [{ "label": "西昌市", "value": "513401" }, { "label": "木里藏族自治县", "value": "513422" }, { "label": "盐源县", "value": "513423" }, { "label": "德昌县", "value": "513424" }, { "label": "会理县", "value": "513425" }, { "label": "会东县", "value": "513426" }, { "label": "宁南县", "value": "513427" }, { "label": "普格县", "value": "513428" }, { "label": "布拖县", "value": "513429" }, { "label": "金阳县", "value": "513430" }, { "label": "昭觉县", "value": "513431" }, { "label": "喜德县", "value": "513432" }, { "label": "冕宁县", "value": "513433" }, { "label": "越西县", "value": "513434" }, { "label": "甘洛县", "value": "513435" }, { "label": "美姑县", "value": "513436" }, { "label": "雷波县", "value": "513437" }]], [[{ "label": "南明区", "value": "520102" }, { "label": "云岩区", "value": "520103" }, { "label": "花溪区", "value": "520111" }, { "label": "乌当区", "value": "520112" }, { "label": "白云区", "value": "520113" }, { "label": "观山湖区", "value": "520115" }, { "label": "开阳县", "value": "520121" }, { "label": "息烽县", "value": "520122" }, { "label": "修文县", "value": "520123" }, { "label": "清镇市", "value": "520181" }], [{ "label": "钟山区", "value": "520201" }, { "label": "六枝特区", "value": "520203" }, { "label": "水城县", "value": "520221" }, { "label": "盘州市", "value": "520281" }], [{ "label": "红花岗区", "value": "520302" }, { "label": "汇川区", "value": "520303" }, { "label": "播州区", "value": "520304" }, { "label": "桐梓县", "value": "520322" }, { "label": "绥阳县", "value": "520323" }, { "label": "正安县", "value": "520324" }, { "label": "道真仡佬族苗族自治县", "value": "520325" }, { "label": "务川仡佬族苗族自治县", "value": "520326" }, { "label": "凤冈县", "value": "520327" }, { "label": "湄潭县", "value": "520328" }, { "label": "余庆县", "value": "520329" }, { "label": "习水县", "value": "520330" }, { "label": "赤水市", "value": "520381" }, { "label": "仁怀市", "value": "520382" }], [{ "label": "西秀区", "value": "520402" }, { "label": "平坝区", "value": "520403" }, { "label": "普定县", "value": "520422" }, { "label": "镇宁布依族苗族自治县", "value": "520423" }, { "label": "关岭布依族苗族自治县", "value": "520424" }, { "label": "紫云苗族布依族自治县", "value": "520425" }], [{ "label": "七星关区", "value": "520502" }, { "label": "大方县", "value": "520521" }, { "label": "黔西县", "value": "520522" }, { "label": "金沙县", "value": "520523" }, { "label": "织金县", "value": "520524" }, { "label": "纳雍县", "value": "520525" }, { "label": "威宁彝族回族苗族自治县", "value": "520526" }, { "label": "赫章县", "value": "520527" }], [{ "label": "碧江区", "value": "520602" }, { "label": "万山区", "value": "520603" }, { "label": "江口县", "value": "520621" }, { "label": "玉屏侗族自治县", "value": "520622" }, { "label": "石阡县", "value": "520623" }, { "label": "思南县", "value": "520624" }, { "label": "印江土家族苗族自治县", "value": "520625" }, { "label": "德江县", "value": "520626" }, { "label": "沿河土家族自治县", "value": "520627" }, { "label": "松桃苗族自治县", "value": "520628" }], [{ "label": "兴义市", "value": "522301" }, { "label": "兴仁县", "value": "522322" }, { "label": "普安县", "value": "522323" }, { "label": "晴隆县", "value": "522324" }, { "label": "贞丰县", "value": "522325" }, { "label": "望谟县", "value": "522326" }, { "label": "册亨县", "value": "522327" }, { "label": "安龙县", "value": "522328" }], [{ "label": "凯里市", "value": "522601" }, { "label": "黄平县", "value": "522622" }, { "label": "施秉县", "value": "522623" }, { "label": "三穗县", "value": "522624" }, { "label": "镇远县", "value": "522625" }, { "label": "岑巩县", "value": "522626" }, { "label": "天柱县", "value": "522627" }, { "label": "锦屏县", "value": "522628" }, { "label": "剑河县", "value": "522629" }, { "label": "台江县", "value": "522630" }, { "label": "黎平县", "value": "522631" }, { "label": "榕江县", "value": "522632" }, { "label": "从江县", "value": "522633" }, { "label": "雷山县", "value": "522634" }, { "label": "麻江县", "value": "522635" }, { "label": "丹寨县", "value": "522636" }], [{ "label": "都匀市", "value": "522701" }, { "label": "福泉市", "value": "522702" }, { "label": "荔波县", "value": "522722" }, { "label": "贵定县", "value": "522723" }, { "label": "瓮安县", "value": "522725" }, { "label": "独山县", "value": "522726" }, { "label": "平塘县", "value": "522727" }, { "label": "罗甸县", "value": "522728" }, { "label": "长顺县", "value": "522729" }, { "label": "龙里县", "value": "522730" }, { "label": "惠水县", "value": "522731" }, { "label": "三都水族自治县", "value": "522732" }]], [[{ "label": "五华区", "value": "530102" }, { "label": "盘龙区", "value": "530103" }, { "label": "官渡区", "value": "530111" }, { "label": "西山区", "value": "530112" }, { "label": "东川区", "value": "530113" }, { "label": "呈贡区", "value": "530114" }, { "label": "晋宁区", "value": "530115" }, { "label": "富民县", "value": "530124" }, { "label": "宜良县", "value": "530125" }, { "label": "石林彝族自治县", "value": "530126" }, { "label": "嵩明县", "value": "530127" }, { "label": "禄劝彝族苗族自治县", "value": "530128" }, { "label": "寻甸回族彝族自治县", "value": "530129" }, { "label": "安宁市", "value": "530181" }], [{ "label": "麒麟区", "value": "530302" }, { "label": "沾益区", "value": "530303" }, { "label": "马龙县", "value": "530321" }, { "label": "陆良县", "value": "530322" }, { "label": "师宗县", "value": "530323" }, { "label": "罗平县", "value": "530324" }, { "label": "富源县", "value": "530325" }, { "label": "会泽县", "value": "530326" }, { "label": "宣威市", "value": "530381" }], [{ "label": "红塔区", "value": "530402" }, { "label": "江川区", "value": "530403" }, { "label": "澄江县", "value": "530422" }, { "label": "通海县", "value": "530423" }, { "label": "华宁县", "value": "530424" }, { "label": "易门县", "value": "530425" }, { "label": "峨山彝族自治县", "value": "530426" }, { "label": "新平彝族傣族自治县", "value": "530427" }, { "label": "元江哈尼族彝族傣族自治县", "value": "530428" }], [{ "label": "隆阳区", "value": "530502" }, { "label": "施甸县", "value": "530521" }, { "label": "龙陵县", "value": "530523" }, { "label": "昌宁县", "value": "530524" }, { "label": "腾冲市", "value": "530581" }], [{ "label": "昭阳区", "value": "530602" }, { "label": "鲁甸县", "value": "530621" }, { "label": "巧家县", "value": "530622" }, { "label": "盐津县", "value": "530623" }, { "label": "大关县", "value": "530624" }, { "label": "永善县", "value": "530625" }, { "label": "绥江县", "value": "530626" }, { "label": "镇雄县", "value": "530627" }, { "label": "彝良县", "value": "530628" }, { "label": "威信县", "value": "530629" }, { "label": "水富县", "value": "530630" }], [{ "label": "古城区", "value": "530702" }, { "label": "玉龙纳西族自治县", "value": "530721" }, { "label": "永胜县", "value": "530722" }, { "label": "华坪县", "value": "530723" }, { "label": "宁蒗彝族自治县", "value": "530724" }], [{ "label": "思茅区", "value": "530802" }, { "label": "宁洱哈尼族彝族自治县", "value": "530821" }, { "label": "墨江哈尼族自治县", "value": "530822" }, { "label": "景东彝族自治县", "value": "530823" }, { "label": "景谷傣族彝族自治县", "value": "530824" }, { "label": "镇沅彝族哈尼族拉祜族自治县", "value": "530825" }, { "label": "江城哈尼族彝族自治县", "value": "530826" }, { "label": "孟连傣族拉祜族佤族自治县", "value": "530827" }, { "label": "澜沧拉祜族自治县", "value": "530828" }, { "label": "西盟佤族自治县", "value": "530829" }], [{ "label": "临翔区", "value": "530902" }, { "label": "凤庆县", "value": "530921" }, { "label": "云县", "value": "530922" }, { "label": "永德县", "value": "530923" }, { "label": "镇康县", "value": "530924" }, { "label": "双江拉祜族佤族布朗族傣族自治县", "value": "530925" }, { "label": "耿马傣族佤族自治县", "value": "530926" }, { "label": "沧源佤族自治县", "value": "530927" }], [{ "label": "楚雄市", "value": "532301" }, { "label": "双柏县", "value": "532322" }, { "label": "牟定县", "value": "532323" }, { "label": "南华县", "value": "532324" }, { "label": "姚安县", "value": "532325" }, { "label": "大姚县", "value": "532326" }, { "label": "永仁县", "value": "532327" }, { "label": "元谋县", "value": "532328" }, { "label": "武定县", "value": "532329" }, { "label": "禄丰县", "value": "532331" }], [{ "label": "个旧市", "value": "532501" }, { "label": "开远市", "value": "532502" }, { "label": "蒙自市", "value": "532503" }, { "label": "弥勒市", "value": "532504" }, { "label": "屏边苗族自治县", "value": "532523" }, { "label": "建水县", "value": "532524" }, { "label": "石屏县", "value": "532525" }, { "label": "泸西县", "value": "532527" }, { "label": "元阳县", "value": "532528" }, { "label": "红河县", "value": "532529" }, { "label": "金平苗族瑶族傣族自治县", "value": "532530" }, { "label": "绿春县", "value": "532531" }, { "label": "河口瑶族自治县", "value": "532532" }], [{ "label": "文山市", "value": "532601" }, { "label": "砚山县", "value": "532622" }, { "label": "西畴县", "value": "532623" }, { "label": "麻栗坡县", "value": "532624" }, { "label": "马关县", "value": "532625" }, { "label": "丘北县", "value": "532626" }, { "label": "广南县", "value": "532627" }, { "label": "富宁县", "value": "532628" }], [{ "label": "景洪市", "value": "532801" }, { "label": "勐海县", "value": "532822" }, { "label": "勐腊县", "value": "532823" }], [{ "label": "大理市", "value": "532901" }, { "label": "漾濞彝族自治县", "value": "532922" }, { "label": "祥云县", "value": "532923" }, { "label": "宾川县", "value": "532924" }, { "label": "弥渡县", "value": "532925" }, { "label": "南涧彝族自治县", "value": "532926" }, { "label": "巍山彝族回族自治县", "value": "532927" }, { "label": "永平县", "value": "532928" }, { "label": "云龙县", "value": "532929" }, { "label": "洱源县", "value": "532930" }, { "label": "剑川县", "value": "532931" }, { "label": "鹤庆县", "value": "532932" }], [{ "label": "瑞丽市", "value": "533102" }, { "label": "芒市", "value": "533103" }, { "label": "梁河县", "value": "533122" }, { "label": "盈江县", "value": "533123" }, { "label": "陇川县", "value": "533124" }], [{ "label": "泸水市", "value": "533301" }, { "label": "福贡县", "value": "533323" }, { "label": "贡山独龙族怒族自治县", "value": "533324" }, { "label": "兰坪白族普米族自治县", "value": "533325" }], [{ "label": "香格里拉市", "value": "533401" }, { "label": "德钦县", "value": "533422" }, { "label": "维西傈僳族自治县", "value": "533423" }]], [[{ "label": "城关区", "value": "540102" }, { "label": "堆龙德庆区", "value": "540103" }, { "label": "林周县", "value": "540121" }, { "label": "当雄县", "value": "540122" }, { "label": "尼木县", "value": "540123" }, { "label": "曲水县", "value": "540124" }, { "label": "达孜县", "value": "540126" }, { "label": "墨竹工卡县", "value": "540127" }, { "label": "格尔木藏青工业园区", "value": "540171" }, { "label": "拉萨经济技术开发区", "value": "540172" }, { "label": "西藏文化旅游创意园区", "value": "540173" }, { "label": "达孜工业园区", "value": "540174" }], [{ "label": "桑珠孜区", "value": "540202" }, { "label": "南木林县", "value": "540221" }, { "label": "江孜县", "value": "540222" }, { "label": "定日县", "value": "540223" }, { "label": "萨迦县", "value": "540224" }, { "label": "拉孜县", "value": "540225" }, { "label": "昂仁县", "value": "540226" }, { "label": "谢通门县", "value": "540227" }, { "label": "白朗县", "value": "540228" }, { "label": "仁布县", "value": "540229" }, { "label": "康马县", "value": "540230" }, { "label": "定结县", "value": "540231" }, { "label": "仲巴县", "value": "540232" }, { "label": "亚东县", "value": "540233" }, { "label": "吉隆县", "value": "540234" }, { "label": "聂拉木县", "value": "540235" }, { "label": "萨嘎县", "value": "540236" }, { "label": "岗巴县", "value": "540237" }], [{ "label": "卡若区", "value": "540302" }, { "label": "江达县", "value": "540321" }, { "label": "贡觉县", "value": "540322" }, { "label": "类乌齐县", "value": "540323" }, { "label": "丁青县", "value": "540324" }, { "label": "察雅县", "value": "540325" }, { "label": "八宿县", "value": "540326" }, { "label": "左贡县", "value": "540327" }, { "label": "芒康县", "value": "540328" }, { "label": "洛隆县", "value": "540329" }, { "label": "边坝县", "value": "540330" }], [{ "label": "巴宜区", "value": "540402" }, { "label": "工布江达县", "value": "540421" }, { "label": "米林县", "value": "540422" }, { "label": "墨脱县", "value": "540423" }, { "label": "波密县", "value": "540424" }, { "label": "察隅县", "value": "540425" }, { "label": "朗县", "value": "540426" }], [{ "label": "乃东区", "value": "540502" }, { "label": "扎囊县", "value": "540521" }, { "label": "贡嘎县", "value": "540522" }, { "label": "桑日县", "value": "540523" }, { "label": "琼结县", "value": "540524" }, { "label": "曲松县", "value": "540525" }, { "label": "措美县", "value": "540526" }, { "label": "洛扎县", "value": "540527" }, { "label": "加查县", "value": "540528" }, { "label": "隆子县", "value": "540529" }, { "label": "错那县", "value": "540530" }, { "label": "浪卡子县", "value": "540531" }], [{ "label": "那曲县", "value": "542421" }, { "label": "嘉黎县", "value": "542422" }, { "label": "比如县", "value": "542423" }, { "label": "聂荣县", "value": "542424" }, { "label": "安多县", "value": "542425" }, { "label": "申扎县", "value": "542426" }, { "label": "索县", "value": "542427" }, { "label": "班戈县", "value": "542428" }, { "label": "巴青县", "value": "542429" }, { "label": "尼玛县", "value": "542430" }, { "label": "双湖县", "value": "542431" }], [{ "label": "普兰县", "value": "542521" }, { "label": "札达县", "value": "542522" }, { "label": "噶尔县", "value": "542523" }, { "label": "日土县", "value": "542524" }, { "label": "革吉县", "value": "542525" }, { "label": "改则县", "value": "542526" }, { "label": "措勤县", "value": "542527" }]], [[{ "label": "新城区", "value": "610102" }, { "label": "碑林区", "value": "610103" }, { "label": "莲湖区", "value": "610104" }, { "label": "灞桥区", "value": "610111" }, { "label": "未央区", "value": "610112" }, { "label": "雁塔区", "value": "610113" }, { "label": "阎良区", "value": "610114" }, { "label": "临潼区", "value": "610115" }, { "label": "长安区", "value": "610116" }, { "label": "高陵区", "value": "610117" }, { "label": "鄠邑区", "value": "610118" }, { "label": "蓝田县", "value": "610122" }, { "label": "周至县", "value": "610124" }], [{ "label": "王益区", "value": "610202" }, { "label": "印台区", "value": "610203" }, { "label": "耀州区", "value": "610204" }, { "label": "宜君县", "value": "610222" }], [{ "label": "渭滨区", "value": "610302" }, { "label": "金台区", "value": "610303" }, { "label": "陈仓区", "value": "610304" }, { "label": "凤翔县", "value": "610322" }, { "label": "岐山县", "value": "610323" }, { "label": "扶风县", "value": "610324" }, { "label": "眉县", "value": "610326" }, { "label": "陇县", "value": "610327" }, { "label": "千阳县", "value": "610328" }, { "label": "麟游县", "value": "610329" }, { "label": "凤县", "value": "610330" }, { "label": "太白县", "value": "610331" }], [{ "label": "秦都区", "value": "610402" }, { "label": "杨陵区", "value": "610403" }, { "label": "渭城区", "value": "610404" }, { "label": "三原县", "value": "610422" }, { "label": "泾阳县", "value": "610423" }, { "label": "乾县", "value": "610424" }, { "label": "礼泉县", "value": "610425" }, { "label": "永寿县", "value": "610426" }, { "label": "彬县", "value": "610427" }, { "label": "长武县", "value": "610428" }, { "label": "旬邑县", "value": "610429" }, { "label": "淳化县", "value": "610430" }, { "label": "武功县", "value": "610431" }, { "label": "兴平市", "value": "610481" }], [{ "label": "临渭区", "value": "610502" }, { "label": "华州区", "value": "610503" }, { "label": "潼关县", "value": "610522" }, { "label": "大荔县", "value": "610523" }, { "label": "合阳县", "value": "610524" }, { "label": "澄城县", "value": "610525" }, { "label": "蒲城县", "value": "610526" }, { "label": "白水县", "value": "610527" }, { "label": "富平县", "value": "610528" }, { "label": "韩城市", "value": "610581" }, { "label": "华阴市", "value": "610582" }], [{ "label": "宝塔区", "value": "610602" }, { "label": "安塞区", "value": "610603" }, { "label": "延长县", "value": "610621" }, { "label": "延川县", "value": "610622" }, { "label": "子长县", "value": "610623" }, { "label": "志丹县", "value": "610625" }, { "label": "吴起县", "value": "610626" }, { "label": "甘泉县", "value": "610627" }, { "label": "富县", "value": "610628" }, { "label": "洛川县", "value": "610629" }, { "label": "宜川县", "value": "610630" }, { "label": "黄龙县", "value": "610631" }, { "label": "黄陵县", "value": "610632" }], [{ "label": "汉台区", "value": "610702" }, { "label": "南郑区", "value": "610703" }, { "label": "城固县", "value": "610722" }, { "label": "洋县", "value": "610723" }, { "label": "西乡县", "value": "610724" }, { "label": "勉县", "value": "610725" }, { "label": "宁强县", "value": "610726" }, { "label": "略阳县", "value": "610727" }, { "label": "镇巴县", "value": "610728" }, { "label": "留坝县", "value": "610729" }, { "label": "佛坪县", "value": "610730" }], [{ "label": "榆阳区", "value": "610802" }, { "label": "横山区", "value": "610803" }, { "label": "府谷县", "value": "610822" }, { "label": "靖边县", "value": "610824" }, { "label": "定边县", "value": "610825" }, { "label": "绥德县", "value": "610826" }, { "label": "米脂县", "value": "610827" }, { "label": "佳县", "value": "610828" }, { "label": "吴堡县", "value": "610829" }, { "label": "清涧县", "value": "610830" }, { "label": "子洲县", "value": "610831" }, { "label": "神木市", "value": "610881" }], [{ "label": "汉滨区", "value": "610902" }, { "label": "汉阴县", "value": "610921" }, { "label": "石泉县", "value": "610922" }, { "label": "宁陕县", "value": "610923" }, { "label": "紫阳县", "value": "610924" }, { "label": "岚皋县", "value": "610925" }, { "label": "平利县", "value": "610926" }, { "label": "镇坪县", "value": "610927" }, { "label": "旬阳县", "value": "610928" }, { "label": "白河县", "value": "610929" }], [{ "label": "商州区", "value": "611002" }, { "label": "洛南县", "value": "611021" }, { "label": "丹凤县", "value": "611022" }, { "label": "商南县", "value": "611023" }, { "label": "山阳县", "value": "611024" }, { "label": "镇安县", "value": "611025" }, { "label": "柞水县", "value": "611026" }]], [[{ "label": "城关区", "value": "620102" }, { "label": "七里河区", "value": "620103" }, { "label": "西固区", "value": "620104" }, { "label": "安宁区", "value": "620105" }, { "label": "红古区", "value": "620111" }, { "label": "永登县", "value": "620121" }, { "label": "皋兰县", "value": "620122" }, { "label": "榆中县", "value": "620123" }, { "label": "兰州新区", "value": "620171" }], [{ "label": "嘉峪关市", "value": "620201" }], [{ "label": "金川区", "value": "620302" }, { "label": "永昌县", "value": "620321" }], [{ "label": "白银区", "value": "620402" }, { "label": "平川区", "value": "620403" }, { "label": "靖远县", "value": "620421" }, { "label": "会宁县", "value": "620422" }, { "label": "景泰县", "value": "620423" }], [{ "label": "秦州区", "value": "620502" }, { "label": "麦积区", "value": "620503" }, { "label": "清水县", "value": "620521" }, { "label": "秦安县", "value": "620522" }, { "label": "甘谷县", "value": "620523" }, { "label": "武山县", "value": "620524" }, { "label": "张家川回族自治县", "value": "620525" }], [{ "label": "凉州区", "value": "620602" }, { "label": "民勤县", "value": "620621" }, { "label": "古浪县", "value": "620622" }, { "label": "天祝藏族自治县", "value": "620623" }], [{ "label": "甘州区", "value": "620702" }, { "label": "肃南裕固族自治县", "value": "620721" }, { "label": "民乐县", "value": "620722" }, { "label": "临泽县", "value": "620723" }, { "label": "高台县", "value": "620724" }, { "label": "山丹县", "value": "620725" }], [{ "label": "崆峒区", "value": "620802" }, { "label": "泾川县", "value": "620821" }, { "label": "灵台县", "value": "620822" }, { "label": "崇信县", "value": "620823" }, { "label": "华亭县", "value": "620824" }, { "label": "庄浪县", "value": "620825" }, { "label": "静宁县", "value": "620826" }, { "label": "平凉工业园区", "value": "620871" }], [{ "label": "肃州区", "value": "620902" }, { "label": "金塔县", "value": "620921" }, { "label": "瓜州县", "value": "620922" }, { "label": "肃北蒙古族自治县", "value": "620923" }, { "label": "阿克塞哈萨克族自治县", "value": "620924" }, { "label": "玉门市", "value": "620981" }, { "label": "敦煌市", "value": "620982" }], [{ "label": "西峰区", "value": "621002" }, { "label": "庆城县", "value": "621021" }, { "label": "环县", "value": "621022" }, { "label": "华池县", "value": "621023" }, { "label": "合水县", "value": "621024" }, { "label": "正宁县", "value": "621025" }, { "label": "宁县", "value": "621026" }, { "label": "镇原县", "value": "621027" }], [{ "label": "安定区", "value": "621102" }, { "label": "通渭县", "value": "621121" }, { "label": "陇西县", "value": "621122" }, { "label": "渭源县", "value": "621123" }, { "label": "临洮县", "value": "621124" }, { "label": "漳县", "value": "621125" }, { "label": "岷县", "value": "621126" }], [{ "label": "武都区", "value": "621202" }, { "label": "成县", "value": "621221" }, { "label": "文县", "value": "621222" }, { "label": "宕昌县", "value": "621223" }, { "label": "康县", "value": "621224" }, { "label": "西和县", "value": "621225" }, { "label": "礼县", "value": "621226" }, { "label": "徽县", "value": "621227" }, { "label": "两当县", "value": "621228" }], [{ "label": "临夏市", "value": "622901" }, { "label": "临夏县", "value": "622921" }, { "label": "康乐县", "value": "622922" }, { "label": "永靖县", "value": "622923" }, { "label": "广河县", "value": "622924" }, { "label": "和政县", "value": "622925" }, { "label": "东乡族自治县", "value": "622926" }, { "label": "积石山保安族东乡族撒拉族自治县", "value": "622927" }], [{ "label": "合作市", "value": "623001" }, { "label": "临潭县", "value": "623021" }, { "label": "卓尼县", "value": "623022" }, { "label": "舟曲县", "value": "623023" }, { "label": "迭部县", "value": "623024" }, { "label": "玛曲县", "value": "623025" }, { "label": "碌曲县", "value": "623026" }, { "label": "夏河县", "value": "623027" }]], [[{ "label": "城东区", "value": "630102" }, { "label": "城中区", "value": "630103" }, { "label": "城西区", "value": "630104" }, { "label": "城北区", "value": "630105" }, { "label": "大通回族土族自治县", "value": "630121" }, { "label": "湟中县", "value": "630122" }, { "label": "湟源县", "value": "630123" }], [{ "label": "乐都区", "value": "630202" }, { "label": "平安区", "value": "630203" }, { "label": "民和回族土族自治县", "value": "630222" }, { "label": "互助土族自治县", "value": "630223" }, { "label": "化隆回族自治县", "value": "630224" }, { "label": "循化撒拉族自治县", "value": "630225" }], [{ "label": "门源回族自治县", "value": "632221" }, { "label": "祁连县", "value": "632222" }, { "label": "海晏县", "value": "632223" }, { "label": "刚察县", "value": "632224" }], [{ "label": "同仁县", "value": "632321" }, { "label": "尖扎县", "value": "632322" }, { "label": "泽库县", "value": "632323" }, { "label": "河南蒙古族自治县", "value": "632324" }], [{ "label": "共和县", "value": "632521" }, { "label": "同德县", "value": "632522" }, { "label": "贵德县", "value": "632523" }, { "label": "兴海县", "value": "632524" }, { "label": "贵南县", "value": "632525" }], [{ "label": "玛沁县", "value": "632621" }, { "label": "班玛县", "value": "632622" }, { "label": "甘德县", "value": "632623" }, { "label": "达日县", "value": "632624" }, { "label": "久治县", "value": "632625" }, { "label": "玛多县", "value": "632626" }], [{ "label": "玉树市", "value": "632701" }, { "label": "杂多县", "value": "632722" }, { "label": "称多县", "value": "632723" }, { "label": "治多县", "value": "632724" }, { "label": "囊谦县", "value": "632725" }, { "label": "曲麻莱县", "value": "632726" }], [{ "label": "格尔木市", "value": "632801" }, { "label": "德令哈市", "value": "632802" }, { "label": "乌兰县", "value": "632821" }, { "label": "都兰县", "value": "632822" }, { "label": "天峻县", "value": "632823" }, { "label": "大柴旦行政委员会", "value": "632857" }, { "label": "冷湖行政委员会", "value": "632858" }, { "label": "茫崖行政委员会", "value": "632859" }]], [[{ "label": "兴庆区", "value": "640104" }, { "label": "西夏区", "value": "640105" }, { "label": "金凤区", "value": "640106" }, { "label": "永宁县", "value": "640121" }, { "label": "贺兰县", "value": "640122" }, { "label": "灵武市", "value": "640181" }], [{ "label": "大武口区", "value": "640202" }, { "label": "惠农区", "value": "640205" }, { "label": "平罗县", "value": "640221" }], [{ "label": "利通区", "value": "640302" }, { "label": "红寺堡区", "value": "640303" }, { "label": "盐池县", "value": "640323" }, { "label": "同心县", "value": "640324" }, { "label": "青铜峡市", "value": "640381" }], [{ "label": "原州区", "value": "640402" }, { "label": "西吉县", "value": "640422" }, { "label": "隆德县", "value": "640423" }, { "label": "泾源县", "value": "640424" }, { "label": "彭阳县", "value": "640425" }], [{ "label": "沙坡头区", "value": "640502" }, { "label": "中宁县", "value": "640521" }, { "label": "海原县", "value": "640522" }]], [[{ "label": "天山区", "value": "650102" }, { "label": "沙依巴克区", "value": "650103" }, { "label": "新市区", "value": "650104" }, { "label": "水磨沟区", "value": "650105" }, { "label": "头屯河区", "value": "650106" }, { "label": "达坂城区", "value": "650107" }, { "label": "米东区", "value": "650109" }, { "label": "乌鲁木齐县", "value": "650121" }, { "label": "乌鲁木齐经济技术开发区", "value": "650171" }, { "label": "乌鲁木齐高新技术产业开发区", "value": "650172" }], [{ "label": "独山子区", "value": "650202" }, { "label": "克拉玛依区", "value": "650203" }, { "label": "白碱滩区", "value": "650204" }, { "label": "乌尔禾区", "value": "650205" }], [{ "label": "高昌区", "value": "650402" }, { "label": "鄯善县", "value": "650421" }, { "label": "托克逊县", "value": "650422" }], [{ "label": "伊州区", "value": "650502" }, { "label": "巴里坤哈萨克自治县", "value": "650521" }, { "label": "伊吾县", "value": "650522" }], [{ "label": "昌吉市", "value": "652301" }, { "label": "阜康市", "value": "652302" }, { "label": "呼图壁县", "value": "652323" }, { "label": "玛纳斯县", "value": "652324" }, { "label": "奇台县", "value": "652325" }, { "label": "吉木萨尔县", "value": "652327" }, { "label": "木垒哈萨克自治县", "value": "652328" }], [{ "label": "博乐市", "value": "652701" }, { "label": "阿拉山口市", "value": "652702" }, { "label": "精河县", "value": "652722" }, { "label": "温泉县", "value": "652723" }], [{ "label": "库尔勒市", "value": "652801" }, { "label": "轮台县", "value": "652822" }, { "label": "尉犁县", "value": "652823" }, { "label": "若羌县", "value": "652824" }, { "label": "且末县", "value": "652825" }, { "label": "焉耆回族自治县", "value": "652826" }, { "label": "和静县", "value": "652827" }, { "label": "和硕县", "value": "652828" }, { "label": "博湖县", "value": "652829" }, { "label": "库尔勒经济技术开发区", "value": "652871" }], [{ "label": "阿克苏市", "value": "652901" }, { "label": "温宿县", "value": "652922" }, { "label": "库车县", "value": "652923" }, { "label": "沙雅县", "value": "652924" }, { "label": "新和县", "value": "652925" }, { "label": "拜城县", "value": "652926" }, { "label": "乌什县", "value": "652927" }, { "label": "阿瓦提县", "value": "652928" }, { "label": "柯坪县", "value": "652929" }], [{ "label": "阿图什市", "value": "653001" }, { "label": "阿克陶县", "value": "653022" }, { "label": "阿合奇县", "value": "653023" }, { "label": "乌恰县", "value": "653024" }], [{ "label": "喀什市", "value": "653101" }, { "label": "疏附县", "value": "653121" }, { "label": "疏勒县", "value": "653122" }, { "label": "英吉沙县", "value": "653123" }, { "label": "泽普县", "value": "653124" }, { "label": "莎车县", "value": "653125" }, { "label": "叶城县", "value": "653126" }, { "label": "麦盖提县", "value": "653127" }, { "label": "岳普湖县", "value": "653128" }, { "label": "伽师县", "value": "653129" }, { "label": "巴楚县", "value": "653130" }, { "label": "塔什库尔干塔吉克自治县", "value": "653131" }], [{ "label": "和田市", "value": "653201" }, { "label": "和田县", "value": "653221" }, { "label": "墨玉县", "value": "653222" }, { "label": "皮山县", "value": "653223" }, { "label": "洛浦县", "value": "653224" }, { "label": "策勒县", "value": "653225" }, { "label": "于田县", "value": "653226" }, { "label": "民丰县", "value": "653227" }], [{ "label": "伊宁市", "value": "654002" }, { "label": "奎屯市", "value": "654003" }, { "label": "霍尔果斯市", "value": "654004" }, { "label": "伊宁县", "value": "654021" }, { "label": "察布查尔锡伯自治县", "value": "654022" }, { "label": "霍城县", "value": "654023" }, { "label": "巩留县", "value": "654024" }, { "label": "新源县", "value": "654025" }, { "label": "昭苏县", "value": "654026" }, { "label": "特克斯县", "value": "654027" }, { "label": "尼勒克县", "value": "654028" }], [{ "label": "塔城市", "value": "654201" }, { "label": "乌苏市", "value": "654202" }, { "label": "额敏县", "value": "654221" }, { "label": "沙湾县", "value": "654223" }, { "label": "托里县", "value": "654224" }, { "label": "裕民县", "value": "654225" }, { "label": "和布克赛尔蒙古自治县", "value": "654226" }], [{ "label": "阿勒泰市", "value": "654301" }, { "label": "布尔津县", "value": "654321" }, { "label": "富蕴县", "value": "654322" }, { "label": "福海县", "value": "654323" }, { "label": "哈巴河县", "value": "654324" }, { "label": "青河县", "value": "654325" }, { "label": "吉木乃县", "value": "654326" }], [{ "label": "石河子市", "value": "659001" }, { "label": "阿拉尔市", "value": "659002" }, { "label": "图木舒克市", "value": "659003" }, { "label": "五家渠市", "value": "659004" }, { "label": "铁门关市", "value": "659006" }]], [[{ "label": "台北", "value": "660101" }], [{ "label": "高雄", "value": "660201" }], [{ "label": "基隆", "value": "660301" }], [{ "label": "台中", "value": "660401" }], [{ "label": "台南", "value": "660501" }], [{ "label": "新竹", "value": "660601" }], [{ "label": "嘉义", "value": "660701" }], [{ "label": "宜兰", "value": "660801" }], [{ "label": "桃园", "value": "660901" }], [{ "label": "苗栗", "value": "661001" }], [{ "label": "彰化", "value": "661101" }], [{ "label": "南投", "value": "661201" }], [{ "label": "云林", "value": "661301" }], [{ "label": "屏东", "value": "661401" }], [{ "label": "台东", "value": "661501" }], [{ "label": "花莲", "value": "661601" }], [{ "label": "澎湖", "value": "661701" }]], [[{ "label": "香港岛", "value": "670101" }], [{ "label": "九龙", "value": "670201" }], [{ "label": "新界", "value": "670301" }]], [[{ "label": "澳门半岛", "value": "680101" }], [{ "label": "氹仔岛", "value": "680201" }], [{ "label": "路环岛", "value": "680301" }], [{ "label": "路氹城", "value": "680401" }]]];var _default = areaData;exports.default = _default;

/***/ }),

/***/ 48:
/*!*****************************************************!*\
  !*** F:/Project/想玩/想玩商家端/common/request/request.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 19));var _env = __webpack_require__(/*! @/env */ 49);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var




Request = /*#__PURE__*/function () {function Request() {var _this = this;_classCallCheck(this, Request);_defineProperty(this, "config",
    {
      baseUrl: _env.API_URL,
      header: {
        'content-type': 'application/json',
        'platform': uni.getStorageSync('platform') },

      method: 'GET',
      dataType: 'json',

      responseType: 'text',

      custom: {} });_defineProperty(this, "interceptor",

























    {
      /**
       * @param {Request~requestCallback} cb - 请求之前拦截,接收一个函数（config, cancel）=> {return config}。第一个参数为全局config,第二个参数为函数，调用则取消本次请求。
       */
      request: function request(cb) {
        if (cb) {
          _this.requestBeforeFun = cb;
        }
      },
      /**
          * @param {Request~responseCallback} cb 响应拦截器，对响应数据做点什么
          * @param {Request~responseErrCallback} ecb 响应拦截器，对响应错误做点什么
          */
      response: function response(cb, ecb) {
        if (cb && ecb) {
          _this.requestComFun = cb;
          _this.requestComFail = ecb;
        }
      } });}_createClass(Request, [{ key: "requestBeforeFun", value: function requestBeforeFun(


    config) {
      return config;
    } }, { key: "requestComFun", value: function requestComFun(

    response) {
      return response;
    } }, { key: "requestComFail", value: function requestComFail(

    response) {
      return response;
    }

    /**
       * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
       * @param { Number } statusCode - 请求响应体statusCode（只读）
       * @return { Boolean } 如果为true,则 resolve, 否则 reject
       */ }, { key: "validateStatus", value: function validateStatus(
    statusCode) {
      return statusCode === 200;
    }

    /**
       * @Function
       * @param {Request~setConfigCallback} f - 设置全局默认配置
       */ }, { key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    }

    /**
       * @Function
       * @param {Object} options - 请求配置项
       * @prop {String} options.url - 请求路径
       * @prop {Object} options.data - 请求参数
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
       * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       * @prop {Object} [options.header = config.header] - 请求header
       * @prop {Object} [options.method = config.method] - 请求方法
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _this2 = this;var options,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                options.baseUrl = this.config.baseUrl;
                options.dataType = options.dataType || this.config.dataType;

                options.responseType = options.responseType || this.config.responseType;




                options.url = options.url || '';
                options.urlType = options.urlType || '';
                options.data = options.data || {};
                options.params = options.params || {};
                options.header = options.header || this.config.header;
                options.method = options.method || this.config.method;
                options.custom = _objectSpread(_objectSpread({}, this.config.custom),
                options.custom || {});




                // uni.showToast({
                // 	icon: "loading",
                // 	image: "/static/imgs//logo/logo.gif"
                // })
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var next = true;
                  var handleRe = {};

                  options.complete = function (response) {
                    response.config = handleRe;
                    if (_this2.validateStatus(response.statusCode)) {// 成功
                      response = _this2.requestComFun(response);
                      resolve(response.data);
                    } else if (401 === response.statusCode) {
                      response = _this2.requestComFun(response);
                      resolve(response.data);
                    }
                    // 请求状态为500时
                    // else if (500 === response.statusCode) {
                    // 	resolve(response.data)
                    // } 
                    else {
                        response = _this2.requestComFail(response);
                        reject(response);
                      }
                  };
                  var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options;
                    var err = {
                      errMsg: t,
                      config: config };

                    reject(err);
                    next = false;
                  };

                  handleRe = _objectSpread({}, _this2.requestBeforeFun(options, cancel));

                  var _config = _objectSpread({}, handleRe);

                  if (!next) return;
                  delete _config.custom;
                  console.log(_config);
                  var mergeUrl = Request.posUrl(_config.url) ? _config.url : (_config.urlType === 'Bin' ? _env.API_URL_BIN : _config.baseUrl) + _config.url;
                  if (JSON.stringify(_config.params) !== '{}') {
                    var paramsH = Request.addQueryString(_config.params);
                    mergeUrl += mergeUrl.indexOf('?') === -1 ? "?".concat(paramsH) : "&".concat(paramsH);
                  }
                  _config.url = mergeUrl;
                  uni.request(_config);
                }));case 12:case "end":return _context.stop();}}}, _callee, this);}));function request() {return _request.apply(this, arguments);}return request;}() }, { key: "get", value: function get(


    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.request(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }, { key: "upload", value: function upload(

    url, _ref)











    {var _this3 = this;var filePath = _ref.filePath,name = _ref.name,header = _ref.header,formData = _ref.formData,custom = _ref.custom;
      return new Promise(function (resolve, reject) {
        var next = true;
        var handleRe = {};
        var globalHeader = _objectSpread({}, _this3.config.header);

        delete globalHeader['content-type'];
        var pubConfig = {
          baseUrl: _this3.config.baseUrl,
          url: url,






          filePath: filePath,
          method: 'UPLOAD',
          name: name,
          header: header || globalHeader,
          formData: formData,
          custom: _objectSpread(_objectSpread({}, _this3.config.custom),
          custom || {}),

          complete: function complete(response) {
            response.config = handleRe;
            if (response.statusCode === 200) {// 成功
              response = _this3.requestComFun(response);
              resolve(response);
            } else {
              response = _this3.requestComFail(response);
              reject(response);
            }
          } };

        var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pubConfig;
          var err = {
            errMsg: t,
            config: config };

          reject(err);
          next = false;
        };

        handleRe = _objectSpread({}, _this3.requestBeforeFun(pubConfig, cancel));

        var _config = _objectSpread({}, handleRe);

        if (!next) return;
        delete _config.custom;
        _config.url = Request.posUrl(_config.url) ? _config.url : _config.baseUrl + _config.url;
        uni.uploadFile(_config);
      });
    } }], [{ key: "posUrl", value: function posUrl(url) {/* 判断url是否为绝对路径 */return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);} }, { key: "addQueryString", value: function addQueryString(params) {var paramsData = '';Object.keys(params).forEach(function (key) {paramsData += key + '=' + encodeURIComponent(params[key]) + '&';});return paramsData.substring(0, paramsData.length - 1);} /**
                                                                                                                                                                                                                                                                                                                                                                                                * @property {Function} request 请求拦截器
                                                                                                                                                                                                                                                                                                                                                                                                * @property {Function} response 响应拦截器
                                                                                                                                                                                                                                                                                                                                                                                                * @type {{request: Request.interceptor.request, response: Request.interceptor.response}}
                                                                                                                                                                                                                                                                                                                                                                                                */ }]);return Request;}(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                            * setConfig回调
                                                                                                                                                                                                                                                                                                                                                                                                                            * @return {Object} - 返回操作后的config
                                                                                                                                                                                                                                                                                                                                                                                                                            * @callback Request~setConfigCallback
                                                                                                                                                                                                                                                                                                                                                                                                                            * @param {Object} config - 全局默认config
                                                                                                                                                                                                                                                                                                                                                                                                                            */ /**
                                                                                                                                                                                                                                                                                                                                                                                                                                * 请求拦截器回调
                                                                                                                                                                                                                                                                                                                                                                                                                                * @return {Object} - 返回操作后的config
                                                                                                                                                                                                                                                                                                                                                                                                                                * @callback Request~requestCallback
                                                                                                                                                                                                                                                                                                                                                                                                                                * @param {Object} config - 全局config
                                                                                                                                                                                                                                                                                                                                                                                                                                * @param {Function} [cancel] - 取消请求钩子，调用会取消本次请求
                                                                                                                                                                                                                                                                                                                                                                                                                                */
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                    * 响应拦截器回调
                                                                                                                                                                                                                                                                                                                                                                                                                                    * @return {Object} - 返回操作后的response
                                                                                                                                                                                                                                                                                                                                                                                                                                    * @callback Request~responseCallback
                                                                                                                                                                                                                                                                                                                                                                                                                                    * @param {Object} response - 请求结果 response
                                                                                                                                                                                                                                                                                                                                                                                                                                    */
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                        * 响应错误拦截器回调
                                                                                                                                                                                                                                                                                                                                                                                                                                        * @return {Object} - 返回操作后的response
                                                                                                                                                                                                                                                                                                                                                                                                                                        * @callback Request~responseErrCallback
                                                                                                                                                                                                                                                                                                                                                                                                                                        * @param {Object} response - 请求结果 response
                                                                                                                                                                                                                                                                                                                                                                                                                                        */exports.default = Request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 49:
/*!**********************************!*\
  !*** F:/Project/想玩/想玩商家端/env.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.IMG_URL = exports.MAP_URL = exports.API_URL_BIN = exports.API_URL = exports.LOGIN_URL = void 0; // .env.js 文件
// 不同环境访问不同的路径
// import store from '@/common/store/index'

//登录接口
var ENV_LOGIN_URL = {
  development: 'http://192.168.3.41:8100/merchant/', //开发环境
  production: 'http://192.168.3.41:8100/merchant/' //生产环境
};

//项目接口
var ENV_API_URL = {
  development: 'http://192.168.3.41:8100/merchant/', //开发环境
  production: 'http://192.168.3.41:8100/merchant/' //生产环境
};

//项目接口BIN
var ENV_API_URL_BIN = {
  development: 'http://192.168.3.30:8080/', //开发环境
  production: 'http://192.168.3.30:8080/' //生产环境
};

//图片上传
var IMG_UPLOAD_URL = 'http://cdn.nccnt.com/';

//高德地图
var GAODE_URL = 'https://restapi.amap.com/';

// process.env.NODE_ENV
var LOGIN_URL = ENV_LOGIN_URL['development']; //后台根域名
exports.LOGIN_URL = LOGIN_URL;var API_URL = ENV_API_URL['development']; //后台接口域名
exports.API_URL = API_URL;var API_URL_BIN = ENV_API_URL_BIN['development']; //后台接口域名
exports.API_URL_BIN = API_URL_BIN;var MAP_URL = GAODE_URL; //地图接口
exports.MAP_URL = MAP_URL;var IMG_URL = IMG_UPLOAD_URL; //图片上传接口
exports.IMG_URL = IMG_URL;

/***/ }),

/***/ 50:
/*!*************************************************!*\
  !*** F:/Project/想玩/想玩商家端/common/request/api.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 接口列表文件
                                                                                                      * auth代表接口是否需要token
                                                                                                      */var _default =
{
  /** 登录 **/
  login: {
    register_code: { //手机注册验证码
      url: 'login/register_code',
      method: 'GET',
      loading: true,
      msg: '请求中'
      // desc: '初始化数据',
    },
    wx_session: { //微信code
      url: 'login/wx_session',
      method: 'GET',
      loading: true,
      msg: '请求中' },

    account_register: { //手机账号注册
      url: 'login/account_register',
      method: 'POST',
      loading: true },

    create_data: { //商户入驻
      url: 'login/create_data',
      method: 'POST',
      loading: true,
      msg: '提交中' } },



  /** 数据模块 ↓ **/
  data: {
    homepage: { //首页数据
      url: 'data/homepage',
      method: 'GET',
      loading: true },

    merch_cate: { //商家主营类型
      url: 'data/merch_cate',
      method: 'GET' },

    merch_label: { //商家标签
      url: 'data/merch_label',
      method: 'GET' } },



  /** 动态模块 ↓ **/
  info: {
    list: { //列表数据
      url: 'info/list',
      method: 'GET',
      loading: false },

    detail: { //列表数据
      url: 'info/detail',
      method: 'GET',
      loading: true },

    create: { //发布
      url: 'info/create',
      method: 'POST' },

    'delete': { //删除
      url: 'info/delete',
      method: 'DELETE' } },



  /** 消息模块 ↓ **/
  session: {
    session_list: { //消息列表数据
      url: 'session/session_list',
      method: 'GET' },

    msg_list: { //对话内容
      url: 'session/msg_list',
      method: 'GET' },

    send_msg: { //发送消息
      url: 'session/send_msg',
      method: 'POST' } },



  /** 商家模块 ↓ **/
  store: {
    data: { //获取店铺信息
      url: 'store/data',
      method: 'GET' },

    update_info: { //更新店铺信息
      url: 'store/update_info',
      method: 'PUT',
      loading: true },

    update_logo: { //更新店铺logo
      url: 'store/update_logo',
      method: 'POST',
      loading: true },

    update_banner: { //更新店铺banner
      url: 'store/update_banner',
      method: 'POST',
      loading: true },

    open_store: { //开店
      url: 'store/open_store',
      method: 'PUT',
      loading: true },

    close_store: { //关店
      url: 'store/close_store',
      method: 'PUT',
      loading: true },

    lltg_list: { //获取开放推广列表
      url: 'store/lltg_list',
      method: 'GET',
      loading: true },

    tgw_list: { //推广位列表
      url: 'store/tgw_list',
      method: 'GET',
      loading: true },

    add_tgwtg: { //添加开放推广
      url: 'store/add_tgwtg',
      method: 'POST',
      loading: true },

    pause_tgwtg: { //暂停推广
      url: 'store/pause_tgwtg',
      method: 'PUT',
      loading: true },

    start_tgwtg: { //重新开始推广
      url: 'store/start_tgwtg',
      method: 'PUT',
      loading: true },

    stop_tgwtg: { //终止推广
      url: 'store/stop_tgwtg',
      method: 'PUT',
      loading: true },

    allow_tgwtg: { //接受邀请
      url: 'store/allow_tgwtg',
      method: 'PUT',
      loading: true },

    refuse_tgwtg: { //拒绝邀请
      url: 'store/refuse_tgwtg',
      method: 'PUT',
      loading: true } },



  /** 平台推广 ↓ **/
  pttg: {
    homepage: { //首页推广位申请
      url: 'pttg/homepage',
      method: 'POST',
      loading: true },

    picked: { //精选商家申请
      url: 'pttg/picked',
      method: 'POST' },

    round_top: { //周边商家置顶
      url: 'pttg/round_top',
      method: 'POST' } },



  /** 流量推广 ↓ **/
  lltg: {
    doing_ist: { //推广中列表
      url: 'lltg/doing_list',
      method: 'GET' },

    done_list: { //推广历史列表
      url: 'lltg/done_list',
      method: 'GET' },

    detail: { //推广历史详情
      url: 'lltg/detail',
      method: 'GET' },

    create: { //发布
      url: 'lltg/create',
      method: 'POST',
      loading: true },

    update: { //更新，是否开放
      url: 'lltg/update',
      method: 'PUT',
      loading: true },

    stop: { //终止推广
      url: 'lltg/stop',
      method: 'PUT',
      loading: true },

    merch_list: { //商家列表
      url: 'lltg/merch_list',
      method: 'GET',
      loading: true },

    invite: { //邀请商家
      url: 'lltg/invite',
      method: 'POST',
      loading: true } },



  /** 会员管理 ↓ **/
  member: {
    fans_list: { //关注列表
      url: 'member/fans_list',
      method: 'GET' },

    today_list: { //今日顾客列表
      url: 'member/today_list',
      method: 'GET' } },



  /** 我的模块 ↓ **/
  mine: {
    total: { //统计数据
      url: 'mine/total',
      method: 'GET' } },



  /** 钱包模块 ↓ **/
  wallet: {
    balance_list: { //余额日志
      url: 'wallet/balance_list',
      method: 'GET' },

    withdrawal_list: { //提现申请列表
      url: 'wallet/withdrawal_list',
      method: 'GET' },

    withdrawal: { //提现申请
      url: 'wallet/withdrawal',
      method: 'POST' } },



  /** 商品模块 ↓ **/
  goods: {
    list: { //优惠商品列表
      url: 'goods/data/page',
      urlType: 'Bin',
      method: 'GET' },

    add: { //添加优惠商品
      url: 'goods/add',
      urlType: 'Bin',
      method: 'POST',
      loading: true },

    update: { //修改优惠商品
      url: 'goods/update',
      urlType: 'Bin',
      method: 'PUT',
      loading: true },

    delete: { //删除优惠商品
      url: 'goods/delete',
      urlType: 'Bin',
      method: 'DELETE',
      loading: true },

    soldOut: { //上下架优惠商品
      url: 'goods/soldOut',
      urlType: 'Bin',
      method: 'PUT',
      loading: true } },



  /** 商品推广模块 ↓ **/
  publicity: {
    need: {
      goods_list: { //目前正在推广的商品
        url: 'publicity/need/goods/data/page',
        urlType: 'Bin',
        method: 'GET' },

      goods_add: { //发布推广需求
        url: 'publicity/need/goods/add',
        urlType: 'Bin',
        method: 'POST',
        loading: true },

      goods_update: { //商品修改
        url: 'publicity/need/goods/update',
        urlType: 'Bin',
        method: 'PUT',
        loading: true },

      goods_soldOut: { //上下架推广需求，不影响核销收益计算
        url: 'publicity/need/goods/soldOut',
        urlType: 'Bin',
        method: 'PUT',
        loading: true },

      invite_add: { //邀约推广
        url: 'publicity/need/goods/invite/add',
        urlType: 'Bin',
        method: 'POST',
        loading: true } },


    help: {
      goods_list: { //获取自己正在助推的商品
        url: 'publicity/help/goods/data/page',
        urlType: 'Bin',
        method: 'GET' },

      platform_list: { //平台所有需要推广的商品列表
        url: 'publicity/help/goods/platform/data/page',
        urlType: 'Bin',
        method: 'GET' },

      invite_dispose: { //处理邀约推广
        url: 'publicity/help/goods//invite/dispose',
        urlType: 'Bin',
        method: 'PUT',
        loading: true },

      help_add: { //添加助推商品
        url: 'publicity/help/goods/help/add',
        urlType: 'Bin',
        method: 'PUT',
        loading: true },

      help_soldOut: { //下架助推
        url: 'publicity/help/goods/help/soldOut',
        urlType: 'Bin',
        method: 'PUT',
        loading: true } } },




  /** 平台商品推广模块 ↓ **/
  platform: {
    platform_list: { //平台推广商品
      url: 'platform/data/page',
      urlType: 'Bin',
      method: 'GET' },

    log_list: { //平台推广商品的操作记录
      url: 'platform/log/page',
      urlType: 'Bin',
      method: 'GET' },

    add: { //发布推广需求
      url: 'platform/add',
      urlType: 'Bin',
      method: 'POST',
      loading: true },

    update: { //修改平台推广商品
      url: 'platform/update',
      urlType: 'Bin',
      method: 'PUT',
      loading: true },

    delete: { //删除平台优惠券
      url: 'platform/delete',
      urlType: 'Bin',
      method: 'DELETE',
      loading: true } },



  /** 优惠券模块 ↓ **/
  coupon: {
    list: { //查看优惠券列表
      url: 'coupon/data/page',
      urlType: 'Bin',
      method: 'GET' },

    add: { //发布优惠券
      url: 'coupon/add',
      urlType: 'Bin',
      method: 'POST',
      loading: true },

    update: { //修改优惠券
      url: 'coupon/update',
      urlType: 'Bin',
      method: 'PUT',
      loading: true },

    delete: { //删除优惠券
      url: 'coupon/delete',
      urlType: 'Bin',
      method: 'DELETE',
      loading: true } },



  /** 上传Base64图片 ↓ **/
  uploadBase64: {
    url: 'index/uploadBase64',
    auth: false,
    method: 'POST'
    // desc: '上传Base64位图片',
  },

  /** 用户 ↓ **/
  user: {
    info: {
      url: 'user',
      auth: true,
      method: 'GET'
      // desc: '用户信息',
    },

    profile: {
      url: 'user/profile',
      auth: true,
      method: 'POST'
      // desc: '修改用户信息',
    },

    changeMobile: {
      url: 'user/changemobile',
      auth: true,
      method: 'POST'
      // desc: '修改手机号',
    } },



  /** 短信 ↓ **/
  sms: {
    send: {
      url: 'sms/send',
      method: 'POST'
      // desc: '发送短信',
    } } };exports.default = _default;

/***/ }),

/***/ 51:
/*!*************************************************!*\
  !*** F:/Project/想玩/想玩商家端/common/utils/tools.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _env = __webpack_require__(/*! @/env */ 49);


var _router = _interopRequireDefault(__webpack_require__(/*! @/common/router */ 11));
var _index = _interopRequireDefault(__webpack_require__(/*! @/common/request/index */ 47));
var _store = _interopRequireDefault(__webpack_require__(/*! @/common/store */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =

{
  wxLogin: function wxLogin() {
    var that = this;
    uni.login({
      provider: 'weixin',
      success: function success(res) {
        console.log('微信code', res.code);
        (0, _index.default)('login.wx_session', {
          code: res.code }).
        then(function (res) {
          _store.default.commit('TOKEN_INFO', res.data);
        });
      } });

  },
  /**
      * 跳转再封装，不支持复杂传参。
      */
  routerTo: function routerTo(path) {var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var isTabbar = arguments.length > 2 ? arguments[2] : undefined;
    var objParams = params;
    // 是否跳转外部链接
    if (~path.indexOf('http')) {




      _router.default.push({
        path: '/pages/public/webview',
        query: {
          'webviewPath': path } });



      return false;
    }
    // 判断是否有参数
    if (path.indexOf('?') !== -1) {
      var index = path.lastIndexOf('?');
      var query = path.substring(index + 1, path.length);
      var arr = query.split('&');
      path = path.slice(0, index);
      arr.forEach(function (item) {
        var mArr = [];
        var obj = {};
        mArr = item.split('=');
        obj[mArr[0]] = mArr[1];
        objParams = _objectSpread(_objectSpread({},
        objParams),
        obj);


      });
    }
    // 判断是否是tabbar
    if (isTabbar) {
      _router.default.replaceAll({
        path: path,
        query: objParams });

    } else {
      _router.default.push({
        path: path,
        query: objParams });

    }

  },
  /**
      * fn：检测图片协议，主要用于检测海报图片协议。
      * param(imgPath): 图片地址。
      */

  checkImgHttp: function checkImgHttp(imgPath) {
    var newPath = '';
    var pathArr = imgPath.split('://');





    pathArr[0] = 'https';

    newPath = pathArr.join('://');
    return newPath;
  },
  // 打电话
  callPhone: function callPhone() {var phoneNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var num = phoneNumber.toString();
    uni.makePhoneCall({
      phoneNumber: num,
      fail: function fail(err) {
        console.log('makePhoneCall出错', err);
      } });

  },
  // 图片处理-选择图片
  chooseImage: function chooseImage() {var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return new Promise(function (resolve, reject) {
      uni.chooseImage({
        count: count, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: function success(res) {
          resolve(res.tempFilePaths);
        } });

    }).catch(function (e) {
      reject(e);
    });
  },
  // 图片处理-上传图片
  uploadImage: function uploadImage(api, url) {
    var config_url = _env.API_URL;
    uni.showLoading({
      title: '上传中' });

    return new Promise(function (resolve, reject) {
      uni.uploadFile({
        url: config_url + api,
        filePath: url,
        name: 'file',
        success: function success(res) {
          res = JSON.parse(res.data);
          if (res.code === 1) {
            uni.hideLoading();
            uni.showToast({
              title: '上传成功',
              icon: 'none' });

            resolve(res.data);
          } else {
            uni.hideLoading();
            uni.showModal({
              title: '上传失败',
              content: res.msg });

          }
        } });

    }).catch(function (e) {
      reject(e);
    });
  },
  // 图片处理-预览图片
  previewImage: function previewImage() {var urls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var current = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    uni.previewImage({
      urls: urls,
      current: current,
      indicator: 'default',
      loop: true,
      fail: function fail(err) {
        console.log('previewImage出错', urls, err);
      } });

  },
  // 图片处理-获取图片信息
  getImageInfo: function getImageInfo() {var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return new Promise(function (resolve, reject) {
      uni.getImageInfo({
        src: src,
        success: function success(image) {
          resolve(image);
        },
        fail: function fail(err) {
          console.log('getImageInfo出错', src, err);
        } });

    }).catch(function (e) {
      reject(e);
    });

  },
  /**
      * 格式化时间
      */
  //时间格式化 天时分秒
  format: function format(t) {
    var format = {
      d: '00',
      h: '00',
      m: '00',
      s: '00' };

    if (t > 0) {
      var d = Math.floor(t / 86400);
      var h = Math.floor(t / 3600 % 24);
      var m = Math.floor(t / 60 % 60);
      var s = Math.floor(t % 60);
      format.d = d < 10 ? '0' + d : d;
      format.h = h < 10 ? '0' + h : h;
      format.m = m < 10 ? '0' + m : m;
      format.s = s < 10 ? '0' + s : s;
    }
    return format;
  },
  //时间格式化(格式化最大为小时)
  formatToHours: function formatToHours(t) {
    var format = {
      d: '00',
      h: '00',
      m: '00',
      s: '00' };

    if (t > 0) {
      var h = Math.floor(t / 3600);
      var m = Math.floor(t / 60 % 60);
      var s = Math.floor(t % 60);

      format.h = h < 10 ? '0' + h : h;
      format.m = m < 10 ? '0' + m : m;
      format.s = s < 10 ? '0' + s : s;
    }
    return format;
  },
  // 年月日
  timestamp: function timestamp(_timestamp) {
    var date = new Date(_timestamp); //根据时间戳生成的时间对象
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();

    m = m < 10 ? '0' + m : m;
    d = d < 10 ? '0' + d : d;

    var dateText = y + "-" + m + "-" + d;
    return dateText;
  },
  // 年月日，时分秒
  // "YYYY-mm-dd HH:MM"
  dateFormat: function dateFormat(fmt, date) {
    var ret;
    var opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (var k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
      };
    };
    return fmt;
  },
  // 转时间戳
  stampTime: function stampTime(time) {
    if (!time) return null;
    time = time.replace(/-/g, '/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
    var date = new Date(time); // 构造一个日期型数据，值为传入的字符串
    var stamp = date.getTime();
    return stamp;
  },
  /**
      *  @fn  时间间隔格式化
      *  @param {*} startTime 开始时间的时间戳
      *  @param {*} endTime 结束时间的时间戳
      *  @return {string} str 返回时间字符串
      */
  getTimeInterval: function getTimeInterval(startTime, endTime) {
    var runTime = parseInt((endTime - startTime) / 1000);
    var year = Math.floor(runTime / 86400 / 365);
    runTime = runTime % (86400 * 365);
    var month = Math.floor(runTime / 86400 / 30);
    runTime = runTime % (86400 * 30);
    var day = Math.floor(runTime / 86400);
    runTime = runTime % 86400;
    var hour = Math.floor(runTime / 3600);
    runTime = runTime % 3600;
    var minute = Math.floor(runTime / 60);
    runTime = runTime % 60;
    var second = runTime;
    var str = '';
    if (year > 0) {
      str = year + '年';
    }
    if (year <= 0 && month > 0) {
      str = month + '月';
    }
    if (year <= 0 && month <= 0 && day > 0) {
      str = day + '天';
    }
    if (year <= 0 && month <= 0 && day <= 0 && hour > 0) {
      str = hour + '小时';
    }
    if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute > 0) {
      str = minute + '分钟';
    }
    if (year <= 0 && month <= 0 && day <= 0 && hour <= 0 && minute <= 0 && second > 0) {
      str += second + '秒';
    }
    str += '前';
    return str;
  },


  /**提示框
      *title(标题)
      *icon(图标):  success，loading，none
      *duration(延时): 0为不关闭, 毫秒数
      *options(其它参数)
      */
  msg: function msg(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;var mask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var icon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'none';
    //统一提示方便全局修改
    if (Boolean(title) === false) {
      return;
    }
    uni.showToast({
      title: title,
      duration: duration,
      mask: mask,
      icon: icon });

  },
  // 处理base64图片加前缀
  imgAddSuffix: function imgAddSuffix(img) {
    console.log(img);
    if (img === '') {
      return '';
    } else if (typeof img === 'object') {
      return img.map(function (item) {
        if (item.indexOf('https://') === 0) {
          return item;
        }
        var str = item.substring(item.lastIndexOf('.') + 1);
        return "data:image/".concat(str, ";base64,") + wx.getFileSystemManager().readFileSync(item, 'base64');
      });
    } else {
      var str = img.substring(img.lastIndexOf('.') + 1);
      return "data:image/".concat(str, ";base64,") + wx.getFileSystemManager().readFileSync(img, 'base64');
    }
  },
  //加法
  accAdd: function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  },
  //减法
  accMinus: function accMinus(arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m - arg2 * m) / m;
  },
  //乘法
  accMul: function accMul(arg1, arg2) {
    var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {}
    try {
      m += s2.split(".")[1].length;
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
  //除法
  accDiv: function accDiv(arg1, arg2) {
    var t1, t2, r1, r2;
    try {
      t1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      t1 = 0;
    }
    try {
      t2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      t2 = 0;
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    var res = r1 / r2 * Math.pow(10, t2 - t1);
    return this.isNumber(res) ? res : 0;
  },
  //是否数字
  isNumber: function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/;
    if (regPos.test(val)) return true;else
    return false;
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 52:
/*!*************************************************!*\
  !*** F:/Project/想玩/想玩商家端/common/store/types.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.TOKEN_INFO = exports.OUT_LOGIN = exports.USER_INFO = void 0;var USER_INFO = 'USER_INFO'; //用户信息
exports.USER_INFO = USER_INFO;var OUT_LOGIN = 'OUT_LOGIN'; //退出登录
exports.OUT_LOGIN = OUT_LOGIN;var TOKEN_INFO = 'TOKEN_INFO'; //登录token信息
exports.TOKEN_INFO = TOKEN_INFO;

/***/ }),

/***/ 53:
/*!*********************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 54));























var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 55));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 56));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 57));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 58));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 59));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 60));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 61));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 62));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 63));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 64));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 65));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 66));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 67));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 68));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 69));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 70));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 71));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 72);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 73));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 74));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 75));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 76));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 54:
/*!********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/mixin/mixin.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 55:
/*!*****************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/queryParams.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 56:
/*!****************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/timeFormat.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(Number(dateTime));
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 57:
/*!**************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/timeFrom.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 56));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 58:
/*!*******************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/colorGradient.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 59:
/*!**********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/guid.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 60:
/*!***********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/color.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 61:
/*!***************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/type2icon.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 62:
/*!*****************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/randomArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 63:
/*!***************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/deepClone.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 639:
/*!*********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/components/uni-icons/icons.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 64:
/*!***************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/deepMerge.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 63));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 65:
/*!*************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/addUnit.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 66));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 66:
/*!**********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/test.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 67:
/*!************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/random.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 68:
/*!**********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/trim.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 69:
/*!***********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/toast.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 70:
/*!***************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/getParent.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 71:
/*!*************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/$parent.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 72:
/*!*********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/sys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 73:
/*!**************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/debounce.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 74:
/*!**************************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/function/throttle.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 75:
/*!**********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/config/config.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本创建于2020-11-19
var version = '1.8.2';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 76:
/*!**********************************************************!*\
  !*** F:/Project/想玩/想玩商家端/uview-ui/libs/config/zIndex.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map