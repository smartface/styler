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
    global.extendStyler = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (styler) {
    return function (theme) {
      return function (className) {
        var styling = styler(className);
        var styles = {};
        styling(function (className, key, value) {
          if (typeof value === "function") {
            value = value(theme);
          }
          styles[key] = value;
        });

        return styles;
      };
    };
  };
});