function isObj(val){
  return val !== null && val instanceof Object;
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
    if(arguments[i] && arguments[i].__runtime__commands !== undefined){
      acc.__runtime_commands__ = {...acc.__runtime_commands__, ...arguments[i].__runtime__commands};
    }
  }
  
  return acc;
}
