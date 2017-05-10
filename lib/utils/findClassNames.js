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
    global.findClassNames = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var findClassNames = function () {
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

  exports.default = findClassNames;
  module.exports = exports['default'];
});