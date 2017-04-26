"use strict";

exports.__esModule = true;

exports.default = function (styler) {
    return function (theme) {
        return function (className) {
            var styling = styler(className);
            var styles = {};
            styling(function (className, key, value) {
                if (typeof value === "function") {
                    value = value(theme);
                }
                styles[key] = value;
            });

            return styles;
        };
    };
};