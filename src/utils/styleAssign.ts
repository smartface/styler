import cloneStyle from "./cloneStyle";
import { isObj } from "./isObj";

/**
 * Assigns value to target object with key
 * 
 * @param {Object} target
 * @param {String} key
 * @param {*} value
 */
export function styleAssign(target: object, key: string, value: any) {
  const style = target;

  if (isObj(style[key])) {
    Object.assign(style[key], value);
  } else if (isObj(value)) {
    style[key] = {...value};
  } else {
    style[key] = value;
  }
}

/**
 * Helper method clone and assigns value to target object with key
 * 
 * @param {Object} target
 * @param {String} key
 * @param {*} value
 */
export function styleAssignAndClone(target: object, key: string, value: any) {
  styleAssign(target, key, cloneStyle(value));
}
