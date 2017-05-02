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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function styleAssign(target, key, value) {
    var style = target;

    if (_typeof(style[key]) === "object") {
      Object.assign(style[key], value);
    } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
      style[key] = value;
    } else {
      style[key] = value;
    }
  }

  function styleAssignAndClone(target, key, value) {
    styleAssign(target, key, (0, _cloneStyle2.default)(value));
  }
});