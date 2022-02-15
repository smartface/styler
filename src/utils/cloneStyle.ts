import { isObj } from "./isObj";

/**
 * Create deep clone of given style object
 *
 * @param {Object} style
 */
export default function cloneStyle(style: any) {
  if (!isObj(style)) return style;

  var copy = {};
  Object.keys(style).forEach((key) => {
    isObj(copy[key]) ? Object.assign({}, style[key]) : (copy[key] = style[key]);
  });

  return copy;
}
