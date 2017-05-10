(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "./utils/styleDenormalizer", "./utils/commander"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("./utils/styleDenormalizer"), require("./utils/commander"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.styleDenormalizer, global.commander);
    global.flatStyles = mod.exports;
  }
})(this, function (module, exports, _styleDenormalizer, _commander) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = flatStyles;

  var _styleDenormalizer2 = _interopRequireDefault(_styleDenormalizer);

  var _commander2 = _interopRequireDefault(_commander);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function flatStyles(rawStyles) {
    var res = (0, _styleDenormalizer2.default)(rawStyles);

    (0, _commander2.default)(res.styles, res.commands);

    return res.styles;
  }
  module.exports = exports["default"];
});