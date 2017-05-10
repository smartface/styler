(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "./merge"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("./merge"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.merge);
    global.flatMapStyles = mod.exports;
  }
})(this, function (module, exports, _merge) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _merge2 = _interopRequireDefault(_merge);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var flatMapStyles = function flatMapStyles(style, classNames, fn) {
    // const classNamesCopy = classNames.slice();
    // const className = classNamesCopy.shift();
    // let parent = "";

    // console.log("className", style, className);
    // if (Array.isArray(className)) {
    //   mapStyles(style, className, fn);
    // } else if (typeof style[className] === 'object' && classNamesCopy) {
    // parent = className;
    var mergedStyle = {};
    var styles = [];

    classNames.forEach(function (className) {
      styles.push(style[className]);
    });

    mergedStyle = _merge2.default.call(null, styles);

    console.log(mergedStyle);

    fn(classNames, mergedStyle);

    // mapStyles(style[className], classNamesCopy, fn);
    // }
  };

  exports.default = flatMapStyles;
  module.exports = exports["default"];
});