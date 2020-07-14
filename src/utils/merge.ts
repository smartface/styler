import { hasProp } from "./hasProp";
import { isObj } from "./isObj";

function recurse(acc:{[key: string]: any}, obj: object) {
  for (var p in obj) {
    acc[p] = (isObj(obj[p]) && isObj(acc[p])) || (isObj(obj[p]) && !acc[p])
      ? recurse(
          hasProp(acc, p)
            ? acc[p]
            : {},
          obj[p])
      : obj[p];
  }

  return acc;
}

/**
 * Creates a deeply merged copy of the specified objects
 * 
 * @returns {Object}
 */
export default function deepMerge(...args:object[]) {
  let acc:{[key: string]: any} = {};

  for (var i = 0; i < args.length; i++) {
    acc = recurse(acc, args[i]);
  }

  return acc;
}
