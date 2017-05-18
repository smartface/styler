function isObj(val){
  return val !== null && typeof val === "object";
}

function hasProp(target, prop) {
  return Object.prototype.hasOwnProperty.call(target, prop);
}

function recurse(acc, obj) {
  for (var p in obj) {
    acc[p] = isObj(obj[p])
      ? recurse(hasProp(acc, p) ? acc[p] : {}, obj[p])
      : obj[p];
  }
  
  return acc;
}

/**
 * Creates a deeply merged copy of the specified objects
 * 
 * @returns {Object}
 */
export default function deepMerge() {
  let acc = {};
  
  for (var i=0; i < arguments.length; i++) {
    acc = recurse(acc, arguments[i]);
  }
  
  return acc;
}
