"use strict";

exports.__esModule = true;

exports.default = function (styler) {
    var memory = {};
    return function (theme) {
        return function (className, fn) {
            if (memory[className]) {
                fn && Object.keys(memory[className]).forEach(function (key) {
                    return fn(className, key, memory[className][key]);
                });
                return memory[className];
            }

            var styling = styler(className);
            var styles = {};

            styling(function (className, key, value) {
                if (typeof value === "function") {
                    value = value(theme);
                }

                styles[key] = value;
                fn && fn(className, key, value);
            });

            memory[className] = styles;

            return function () {
                delete memory[className];
            };
        };
    };
};