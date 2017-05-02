import {styleAssignAndClone} from "./utils/styleAssign";

export default function mergeStylers() {
  const stylers = Array.prototype.slice.call(arguments);

  return function(className) {
    return function(fn) {
      const result = {};
      const mapFn = function(className, key, value) {
        styleAssignAndClone(result, key, value);
        fn && fn(className, key, value);
      };

      stylers.forEach(styler => styler(className)(mapFn));

      return result;
    };
  };
}
