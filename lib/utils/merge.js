(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.merge = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = deepMerge;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function isObj(val) {
    return (typeof val === "undefined" ? "undefined" : _typeof(val)) === "object";
  }

  function recurse(acc, obj) {
    for (var p in obj) {
      acc[p] = isObj(obj[p]) ? recurse(acc[p] || {}, obj[p]) : obj[p];
    }

    return acc;
  }

  /**
   * Creates deep copy and given merge objects
   * 
   */
  function deepMerge() {
    var acc = {};

    for (var i = 0; i < arguments.length; i++) {
      acc = recurse(acc, arguments[i]);
    }

    return acc;
  }
  module.exports = exports["default"];
});