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
    global.componentStyler = mod.exports;
  }
})(this, function (exports, _styleAssign) {
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
   * Component styling wrapper
   * 
   * Example:
   * ```js
   *  ...
   * 
   *  var componentStyle = componentStyler(style)(className);
   *  var comps = [comp1, comp2];
   *  comps.map(componentStyle);
   * or
   *  componentStyle(component);
   * 
   * ...
   * ```
   * @params {object} style Styles object
   * 
   */
  function componentStyler(styler) {
    return function (className) {
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
});