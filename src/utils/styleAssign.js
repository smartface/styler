import cloneStyle from "./cloneStyle";

/**
 * Assigns value to target object with key
 * 
 * @param {Object} target
 * @param {String} key
 * @param {*} value
 */
export function styleAssign(target, key, value) {
  const style = target;

  if (style[key] !== null && typeof style[key] === "object") {
    style[key] = {...style[key], ...value};
  } else if (value !== null  && typeof value === "object") {
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
export function styleAssignAndClone(target, key, value) {
  styleAssign(target, key, cloneStyle(value));
}
