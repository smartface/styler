"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = componentStyler;

var _styleAssign = require("./utils/styleAssign");

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