"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = componentStyler;
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
    return function (component, componentName) {
      styler(className)(function (styleName, key, value) {
        function setKey(component, key, value) {
          if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
            Object.assign(component[key], value);
          } else {
            component[key] = value;
          }
        }

        if ((componentName && componentName == styleName || className && styleName) && component.hasOwnProperty(key)) {
          //   if (component instanceof AbstractComponent && componentName == styleName && component.hasProp(key)) {
          if (componentName == styleName && component.hasProp(key)) {
            component.set(key, value);
          } else {
            setKey(component, key, value);
          }
        } else {
          if ((typeof component === "undefined" ? "undefined" : _typeof(component)) === "object") {
            setKey(component, key, value);
          }

          console.warning("[Warning][ComponentName :" + component.name + ", StyleName: " + styleName + "] style cannot be assigned.");
        }
      });
    };
  };
};