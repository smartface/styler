"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = cloneStyle;
function cloneStyle(style) {
    if ((typeof style === "undefined" ? "undefined" : _typeof(style)) !== "object") return style;

    var copy = {};
    Object.keys(style).forEach(function (key) {
        _typeof(copy[key]) === "object" ? Object.assign({}, style[key]) : copy[key] = style[key];
    });

    return copy;
}