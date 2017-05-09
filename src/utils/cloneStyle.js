/**
 * Create deep clone of given style object
 * 
 * @param {Object} style
 */
export default function cloneStyle(style) {
  if (typeof style !== "object")
    return style;

  var copy = {};
  Object.keys(style).forEach((key) => {
    typeof copy[key] === "object" ? Object.assign({}, style[key]) : copy[key] = style[key];
  });

  return copy;
}
