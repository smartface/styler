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
    global.componentStyler = mod.exports;
  }
})(this, function (module, exports, _styleAssign) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = componentStyler;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /**
   * Component High Order Styler function. Gets styles from styler then assigns them to given object or component.
   * 
   * @example
   *  ...
   * 
   *  var componentStyle = componentStyler(style)(className);
   *  var comps = [comp1, comp2];
   *  comps.map(componentStyle);
   * or
   *  componentStyle(component);
   * 
   * ...
   * 
   * @params {Function} styler - Styles object
   * @returns {Function} - Styling composer 
   */
  function componentStyler(styler) {

    /**
     * Styling composer
     * 
     * @param {String} classNames - Class names of desired styles
     */
    return function (className) {

      /**
       * Assigns styles to component
       * 
       * @param {Object} component - Assingee component
       */
      return function (component) {
        styler(className)(function (cName, key, value) {
          if ((typeof component === "undefined" ? "undefined" : _typeof(component)) === "object") {
            (0, _styleAssign.styleAssignAndClone)(component, key, value);
          } else {
            throw "[Component :" + component + ", ClassName: " + cName + "] style cannot be assigned.";
          }
        });
      };
    };
  };
  module.exports = exports["default"];
});