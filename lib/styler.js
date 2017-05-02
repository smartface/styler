(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './utils/cloneStyle'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./utils/cloneStyle'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.cloneStyle);
    global.styler = mod.exports;
  }
})(this, function (exports, _cloneStyle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.findClassNames = exports.getClassValue = undefined;
  exports.default = styler;

  var _cloneStyle2 = _interopRequireDefault(_cloneStyle);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var getClassValue = exports.getClassValue = function getClassValue(styleDef) {
    return function (className) {
      if (typeof styleDef[className] === 'undefined') {
        return styleDef[className];
      }

      throw new Error('Specified className ' + className + ' is not found.');
    };
  };

  var findClassNames = exports.findClassNames = function () {
    var classesRegExp = /\.([a-zA-Z\W0-9][^.]*)/g;
    var cache = {};
    return function (selector) {
      if (Object.prototype.hasOwnProperty.call(cache, selector)) {
        return cache[selector];
      }
      var classes = selector.replace(/[ ]+/g, ' ').split(' ').map(function (items) {
        return items.match(classesRegExp);
      });

      if (!classes) {
        return '';
      }

      cache[selector] = classes;

      return classes;
    };
  }();

  var mapStyles = function mapStyles(style, classNames, fn) {
    var classNamesCopy = classNames.slice();
    var className = classNamesCopy.shift();

    if (Array.isArray(className)) {
      mapStyles(style, className, fn);
    } else if (_typeof(style[className]) === 'object' && classNamesCopy) {
      Object.keys(style[className]).forEach(function (key) {
        if (key.charAt(0) !== '.' && key.charAt(0) !== '&') {
          fn(className, key, style[className][key]);
        } else if (key.charAt(0) === '&') {
          classNamesCopy.push(key);
        }
      });

      mapStyles(style[className], classNamesCopy, fn);
    }
  };

  /**
   * Styling Wrapper
   * Returns style scoped function
   *
   * @params {object} style Styles Object
   */
  function styler(style) {
    return function (classNames) {
      var parsedClassNames = findClassNames(classNames);

      return function (fn) {
        parsedClassNames.forEach(function (classNm) {
          mapStyles(style, classNm, function (className, key, value) {
            fn(className, key, (0, _cloneStyle2.default)(value));
          });
        });
      };
    };
  }
});