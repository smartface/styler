(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "./utils/styleAssign"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("./utils/styleAssign"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.styleAssign);
    global.themeStyler = mod.exports;
  }
})(this, function (module, exports, _styleAssign) {
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

  module.exports = exports["default"];
});