(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./cloneStyle"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./cloneStyle"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.cloneStyle);
    global.styleAssign = mod.exports;
  }
})(this, function (exports, _cloneStyle) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.styleAssign = styleAssign;
  exports.styleAssignAndClone = styleAssignAndClone;

  var _cloneStyle2 = _interopRequireDefault(_cloneStyle);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /**
   * Assigns value to target object with key
   * 
   * @param {Object} target
   * @param {String} key
   * @param {*} value
   */
  function styleAssign(target, key, value) {
    var style = target;

    if (_typeof(style[key]) === "object") {
      style[key] = _extends({}, style[key], value);
    } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
      style[key] = _extends({}, value);
    } else {
      style[key] = value;
    }
  }

  /**
   * Helper method clone and assigns value to target object with key
   * 
   * @param {Object} target
   * @param {String} key
   * @param {*} value
   */
  function styleAssignAndClone(target, key, value) {
    styleAssign(target, key, (0, _cloneStyle2.default)(value));
  }
});