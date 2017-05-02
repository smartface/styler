"use strict";

exports.__esModule = true;
exports.default = mergeStylers;

var _styleAssign = require("./utils/styleAssign");

function mergeStylers() {
    var stylers = Array.prototype.slice.call(arguments);

    return function (className) {
        return function (fn) {
            var result = {};
            var mapFn = function mapFn(className, key, value) {
                (0, _styleAssign.styleAssignAndClone)(result, key, value);
                fn && fn(className, key, value);
            };

            stylers.forEach(function (styler) {
                return styler(className)(mapFn);
            });

            return result;
        };
    };
}