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
    global.mergeStylers = mod.exports;
  }
})(this, function (module, exports, _styleAssign) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = mergeStylers;


  /**
   * Takes multiple stylers as parameters and returns single styler function. 
   * Searches given classnames from all given stylers then output like a single Styler.
   *
   * @example
   * ...
   * const styler1 = styler(styles1);
   * const styler2 = styler(styles2);
   * const styler3 = styler(styles3);
   * 
   * const mergedStyler = mergeStyler(styler1, styler2, styler3);
   * const styles = mergedStyler(".button.small .button.warning");
   * 
   * styles(function(className, key, value){
   *  ...
   *  
   * });
   * 
   * @param {Function} - Styler
   * @returns {Function}
   */
  function mergeStylers() {
    var stylers = Array.prototype.slice.call(arguments);
    /**
     * Styling composer
     * 
     * @param {String} classNames - Class names of desired styles
     */
    return function (className) {
      /**
       * Styles mapping
       * 
       * @param {Function} fn - Map callback function
       */
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
  module.exports = exports["default"];
});