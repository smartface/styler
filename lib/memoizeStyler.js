(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "./utils/cloneStyle", "./utils/styleAssign"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("./utils/cloneStyle"), require("./utils/styleAssign"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.cloneStyle, global.styleAssign);
    global.memoizeStyler = mod.exports;
  }
})(this, function (module, exports, _cloneStyle, _styleAssign) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = memoizeStyler;

  var _cloneStyle2 = _interopRequireDefault(_cloneStyle);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function memoizeStyler(styler) {
    var memory = {};

    return function (memoClassName) {
      if (!memory[memoClassName]) {
        var styling = styler(memoClassName);
        var newStyle = {};

        styling(function (className, key, value) {
          (0, _styleAssign.styleAssignAndClone)(newStyle, key, value);
        });

        memory[memoClassName] = newStyle;
      }

      return function (fn) {
        var style = (0, _cloneStyle2.default)(memory[memoClassName]);
        Object.keys(memory[memoClassName]).forEach(function (key) {
          return fn(memoClassName, key, style[key]);
        });

        return function removeFromMemory() {
          var all = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          if (all) {
            memory = {};
          } else {
            delete memory[memoClassName];
          }
        };
      };
    };
  }
  module.exports = exports["default"];
});