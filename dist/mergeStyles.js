"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = mergeStyles;
function mergeStyles() {
    var stylers = Array.prototype.slice.call(arguments);
    var result = {};
    var mapFn = function mapFn(className, key, value) {
        if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
            Object.assign(result[key], value);
        } else {
            result[key] = value;
        }
    };

    stylers.forEach(function (style) {
        return style(mapFn());
    });

    return result;
}