(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./utils/styleAssign"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./utils/styleAssign"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.styleAssign);
    global.themeStyler = mod.exports;
  }
})(this, function (exports, _styleAssign) {
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

          (0, _styleAssign.styleAssignAndClone)(styles, key, value);
        });

        return styles;
      };
    };
  };
});