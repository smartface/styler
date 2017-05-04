(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "./mergeStylers", "./styler", "./componentStyler"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("./mergeStylers"), require("./styler"), require("./componentStyler"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.mergeStylers, global.styler, global.componentStyler);
    global.Styla = mod.exports;
  }
})(this, function (module, exports, _mergeStylers, _styler, _componentStyler) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _mergeStylers2 = _interopRequireDefault(_mergeStylers);

  var _styler2 = _interopRequireDefault(_styler);

  var _componentStyler2 = _interopRequireDefault(_componentStyler);

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

  var Styla = function () {
    Styla.from = function from(styles) {
      return new Styla((0, _styler2.default)(styles));
    };

    function Styla(styler) {
      _classCallCheck(this, Styla);

      this.styler = styler;
    }

    Styla.prototype.merge = function merge() {
      var args = Array.prototype.slice.call(arguments).concat([this.styler]);
      return new Styla(_mergeStylers2.default.call(null, args));
    };

    Styla.prototype.assign = function assign(classNames, component) {
      return new Styla((0, _componentStyler2.default)(this.styler));
    };

    return Styla;
  }();

  exports.default = Styla;
  module.exports = exports["default"];
});