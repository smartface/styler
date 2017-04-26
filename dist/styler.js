"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = styler;
var getClassValue = exports.getClassValue = function getClassValue(styleDef) {
  return function (className) {
    if (typeof styleDef[className] === "undefined") {
      return styleDef[className];
    } else {
      throw new Error("Specified className ${className} is not found.");
    }
  };
};

var findClassNames = exports.findClassNames = function () {
  var classesRegExp = /\.([a-zA-Z\W0-9][^\.]*)/g;
  var cache = {};
  return function (selector) {
    if (cache.hasOwnProperty(selector)) {
      return cache[selector];
    }
    var classes = selector.replace(/[ ]+/g, " ").split(" ").map(function (items) {
      return items.match(classesRegExp);
    });

    if (!classes) {
      return '';
    }

    cache[selector] = classes;

    return classes;
  };
}();

var mapStyles = function mapStyles(style, classNames, fn) {
  classNames = classNames.slice();
  var className = classNames.shift();

  if (Array.isArray(className)) {
    mapStyles(style, className, fn);
  } else if (_typeof(style[className]) === "object" && classNames) {
    Object.keys(style[className]).map(function (key) {
      if (key.charAt(0) !== "." && key.charAt(0) !== "&") {
        fn(className, key, style[className][key]);
      } else if (key.charAt(0) === "&") {
        classNames.push(key);
      }
    });

    mapStyles(style[className], classNames, fn);
  }
};

/**
 * Styling Wrapper
 * Returns style scoped function
 * 
 * @params {object} style Styles Object
 */
function styler(style) {
  return function (classNames) {
    classNames = findClassNames(classNames);

    return function (fn) {
      classNames.forEach(function (classNames) {
        mapStyles(style, classNames, function (className, key, value) {
          fn(className, key, value);
        });
      });
    };
  };
};