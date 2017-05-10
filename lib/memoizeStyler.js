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

  /**
   * Memoize Pattern implementation for Styler. Decorates a styler function 
   * and caches every request then returns styles from the cache.
   * 
   * @param {Function} styler - Styler function
   * @returns {Function} - Styling composer
   */
  function memoizeStyler(styler) {
    var memory = {};

    /**
     * Gets styles from styler then caches them using className as a key
     * 
     * @param {String} className - Classnames string
     */
    return function (className) {
      if (!memory[className]) {
        var styling = styler(className);
        var newStyle = {};

        styling(function (className, key, value) {
          (0, _styleAssign.styleAssignAndClone)(newStyle, key, value);
        });

        memory[className] = newStyle;
      }

      /**
       * Styles mapping function, get styles from styler or cache if exists then calls fn and pass style.
       *
       * @params {Function} fn - Map function
       */
      return function (fn) {
        var style = (0, _cloneStyle2.default)(memory[className]);
        Object.keys(memory[className]).forEach(function (key) {
          return fn(className, key, style[key]);
        });

        return function removeFromMemory() {
          var all = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          if (all) {
            memory = {};
          } else {
            delete memory[className];
          }
        };
      };
    };
  }
  module.exports = exports["default"];
});