(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "./styleAssign"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("./styleAssign"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.styleAssign);
    global.styleDenormalizer = mod.exports;
  }
})(this, function (module, exports, _styleAssign) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = styleDenormalizer;

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

  function styleDenormalizer(styles) {
    var denormalizedStyles = {};
    var commands = {};

    function flatStyle(style, key) {
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      Object.keys(style[key]).forEach(function (skey) {
        var newKey = key;

        if (key.charAt(0) === '&') {
          newKey = key.slice(1);
        }

        if (skey.charAt(0) !== '@' && skey.charAt(0) !== '.' && skey.charAt(0) !== '&') {
          // current's not a className or a parenting shortcut or a command
          denormalizedStyles[parent + newKey] = denormalizedStyles[parent + newKey] || {};

          // current is className then merge with parent
          if (parent && denormalizedStyles[parent] && key.charAt(0) === '.') {
            denormalizedStyles[parent + newKey] = _extends({}, denormalizedStyles[parent], denormalizedStyles[parent + newKey]);
          }

          (0, _styleAssign.styleAssign)(denormalizedStyles[parent + newKey], skey, style[key][skey]);
        } else if (skey.charAt(0) === '@') {
          // It's a command
          commands[skey] = commands[skey] || [];
          commands[skey].push({
            className: parent + newKey,
            value: style[key][skey]
          });

          delete style[skey];
        } else {
          flatStyle(style[key], skey, parent + newKey);
        }
      });
    }

    Object.keys(styles).forEach(function (key) {
      flatStyle(styles, key);
    });

    return {
      styles: denormalizedStyles,
      commands: commands
    };
  };
  module.exports = exports["default"];
});