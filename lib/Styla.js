(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./styler"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./styler"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.styler);
    global.Styla = mod.exports;
  }
})(this, function (_styler) {
  "use strict";

  var _styler2 = _interopRequireDefault(_styler);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var StylerDriver = function () {
    function StylerDriver(styler) {
      _classCallCheck(this, StylerDriver);

      this.subscribers = [];
    }

    StylerDriver.prototype.subscribe = function subscribe(fn) {
      this.subscribers.push(fn);
    };

    return StylerDriver;
  }();
});