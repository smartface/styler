"use strict";

exports.__esModule = true;

var _styleAssign = require("./utils/styleAssign");

exports.default = function (styler) {
    return function (theme) {
        return function (className) {
            var styling = styler(className);
            var styles = {};
            styling(function (className, key, value) {
                if (typeof value === "function") {
                    value = value(theme);
                }

                (0, _styleAssign.styleAssignAndClone)(styles, key, value);
            });

            return styles;
        };
    };
};