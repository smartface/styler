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
    global.getClassValue = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var getClassValue = function getClassValue(styleDef) {
    return function (className) {
      if (typeof styleDef[className] === 'undefined') {
        return styleDef[className];
      }

      throw new Error('Specified className ' + className + ' is not found.');
    };
  };

  exports.default = getClassValue;
  module.exports = exports['default'];
});