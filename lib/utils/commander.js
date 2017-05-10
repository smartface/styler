(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "./styleAssign", "./cloneStyle", "./findClassNames", "./merge"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("./styleAssign"), require("./cloneStyle"), require("./findClassNames"), require("./merge"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.styleAssign, global.cloneStyle, global.findClassNames, global.merge);
    global.commander = mod.exports;
  }
})(this, function (module, exports, _styleAssign, _cloneStyle, _findClassNames, _merge) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = searchAndApplyCommand;

  var _cloneStyle2 = _interopRequireDefault(_cloneStyle);

  var _findClassNames2 = _interopRequireDefault(_findClassNames);

  var _merge2 = _interopRequireDefault(_merge);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function extend(styles, className, extendFrom) {
    var targetValue = styles;
    styles[className] = (0, _merge2.default)(styles[className], styles[extendFrom]);

    return styles;
  }

  function findCommnand(key) {
    switch (key) {
      case '@extend':
        return extend;
      default:
        throw new Error(key + " Commnand cannot be found");
    }
  }

  function searchAndApplyCommand(denormalizedStyle, commandMap) {
    Object.keys(commandMap).forEach(function (command) {
      // console.log("commandMap", command);
      commandMap[command].forEach(function (_ref) {
        var className = _ref.className,
            value = _ref.value;

        findCommnand(command)(denormalizedStyle, className, value);
      });
    });
  }
  module.exports = exports["default"];
});