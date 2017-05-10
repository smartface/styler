(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.mapStyles = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var mapStyles = function mapStyles(style, classNames, fn) {
    var classNamesCopy = classNames.slice();
    var className = classNamesCopy.shift();
    var parent = "";

    if (Array.isArray(className)) {
      mapStyles(style, className, fn);
    } else if (_typeof(style[className]) === 'object' && classNamesCopy) {
      parent = className;

      Object.keys(style[className]).forEach(function (key) {
        if (key.charAt(0) !== '.' && key.charAt(0) !== '&') {
          fn(className, key, style[className][key]);
        } else if (key.charAt(0) === '&') {
          var withParentKey = parent + key.slice(1);
          style[withParentKey][withParentKey] = style[className][key];

          delete style[className][key];
        }
      });

      mapStyles(style[className], classNamesCopy, fn);
    }
  };

  exports.default = mapStyles;
  module.exports = exports['default'];
});