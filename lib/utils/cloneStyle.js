(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.cloneStyle = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = cloneStyle;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function cloneStyle(style) {
    if ((typeof style === "undefined" ? "undefined" : _typeof(style)) !== "object") return style;

    var copy = {};
    Object.keys(style).forEach(function (key) {
      _typeof(copy[key]) === "object" ? Object.assign({}, style[key]) : copy[key] = style[key];
    });

    return copy;
  }
});