(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "./utils/cloneStyle", "./utils/findClassNames", "./utils/flatMapStyles", "./flatStyles", "./utils/merge"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("./utils/cloneStyle"), require("./utils/findClassNames"), require("./utils/flatMapStyles"), require("./flatStyles"), require("./utils/merge"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.cloneStyle, global.findClassNames, global.flatMapStyles, global.flatStyles, global.merge);
    global.flatStyler = mod.exports;
  }
})(this, function (module, exports, _cloneStyle, _findClassNames, _flatMapStyles, _flatStyles, _merge) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = styler;

  var _cloneStyle2 = _interopRequireDefault(_cloneStyle);

  var _findClassNames2 = _interopRequireDefault(_findClassNames);

  var _flatMapStyles2 = _interopRequireDefault(_flatMapStyles);

  var _flatStyles2 = _interopRequireDefault(_flatStyles);

  var _merge2 = _interopRequireDefault(_merge);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Styling Wrapper. In order to return desired styles. Makes styles flatted then merge all by classNames then pass merged styles to callback.
   * 
   * @example
   *  const styler = require("@smartface/styler").flatStyler or require("@smartface/styler/lib/flatStyler");
   *  const styles = {
   *      ".button"{
   *        widht: "100px",
   *        height: "30px",
   *        ".blue": {
   *          color: "blue"
   *        },
   *        ".red": {
   *          color: "red"
   *        }
   *    }
   *  }
   *  
   *  const styling = styler(styles);
   *  const blueButtonStyle = {};
   *  const redButtonStyle = {};
   * 
   *  styling(".button.blue")(function(className, key, value){
   *    blueButtonStyle[key] = value;
   *  }); 
   *  // blueButtonStyle equals to {width: "100px", height: "20px", color: "blue"}
   *  
   *  styling(".button.red")(function(className, key, value){
   *    redButtonStyle[key] = value;
   *  });
   *  // redButtonStyle equals to {width: "100px", height: "20px", color: "red"}
   * 
   * @param {Object} style - Styles Object
   * @returns {Function} - Styling composer
   */
  function styler(style) {
    var denormalizedStyles = (0, _flatStyles2.default)(style);

    /**
     * Styling composer
     * 
     * @param {String} classNames - Class names of desired styles
     */
    return function (classNames) {
      var parsedClassNames = (0, _findClassNames2.default)(classNames).map(function (classNm) {
        return classNm.join("");
      });

      /**
       * Styles mapping
       * 
       * @param {Function} fn - Mapping callback function
       */
      return function (fn) {
        var styles = [];

        parsedClassNames.forEach(function (className) {
          styles.push(denormalizedStyles[className]);
        });

        var mergedStyle = _merge2.default.apply(null, styles);

        Object.keys(mergedStyle).forEach(function (key) {
          fn(classNames, key, mergedStyle[key]);
        });

        mergedStyle = null;
      };
    };
  } /**
     * @copyright (c) 2017 Smartface.io
     * @license MIT
     * @author Cenk Cetinkaya
     * @version  1.0.0
     */

  module.exports = exports["default"];
});