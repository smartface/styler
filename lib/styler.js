(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "./utils/cloneStyle", "./utils/findClassNames", "./utils/mapStyles"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("./utils/cloneStyle"), require("./utils/findClassNames"), require("./utils/mapStyles"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.cloneStyle, global.findClassNames, global.mapStyles);
    global.styler = mod.exports;
  }
})(this, function (module, exports, _cloneStyle, _findClassNames, _mapStyles) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = styler;

  var _cloneStyle2 = _interopRequireDefault(_cloneStyle);

  var _findClassNames2 = _interopRequireDefault(_findClassNames);

  var _mapStyles2 = _interopRequireDefault(_mapStyles);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Styling Wrapper
   * Returns style scoped function
   *
   * @params {object} style Styles Object
   */
  function styler(style) {
    return function (classNames) {
      var parsedClassNames = (0, _findClassNames2.default)(classNames);

      return function (fn) {
        parsedClassNames.forEach(function (classNm) {
          (0, _mapStyles2.default)(style, classNm, function (className, key, value) {
            fn(className, key, (0, _cloneStyle2.default)(value));
          });
        });
      };
    };
  }
  module.exports = exports["default"];
});