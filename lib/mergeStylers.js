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
    global.mergeStylers = mod.exports;
  }
})(this, function (exports, _styleAssign) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = mergeStylers;
  function mergeStylers() {
    var stylers = Array.prototype.slice.call(arguments);

    return function (className) {
      return function (fn) {
        var result = {};
        var mapFn = function mapFn(className, key, value) {
          (0, _styleAssign.styleAssignAndClone)(result, key, value);
          fn && fn(className, key, value);
        };

        stylers.forEach(function (styler) {
          return styler(className)(mapFn);
        });

        return result;
      };
    };
  }
});