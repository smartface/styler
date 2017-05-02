"use strict";

exports.__esModule = true;
exports.default = memoizeStyler;

var _cloneStyle = require("./utils/cloneStyle");

var _cloneStyle2 = _interopRequireDefault(_cloneStyle);

var _styleAssign = require("./utils/styleAssign");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function memoizeStyler(styler) {
  var memory = {};

  return function (memoClassName) {
    if (!memory[memoClassName]) {
      var styling = styler(memoClassName);
      var newStyle = {};

      styling(function (className, key, value) {
        (0, _styleAssign.styleAssignAndClone)(newStyle, key, value);
      });

      memory[memoClassName] = newStyle;
    }

    return function (fn) {
      var style = (0, _cloneStyle2.default)(memory[memoClassName]);
      Object.keys(memory[memoClassName]).forEach(function (key) {
        return fn(memoClassName, key, style[key]);
      });

      return function removeFromMemory() {
        var all = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (all) {
          memory = {};
        } else {
          delete memory[memoClassName];
        }
      };
    };
  };
}