function isObj(val){
  return typeof val === "object";
}

function recurse(acc, obj){
  for (var p in obj) {
    acc[p] = isObj(obj[p]) ? recurse(acc[p] || {}, obj[p]) : obj[p];
  }
  
  return acc;
}

/**
 * Creates deep copy and given merge objects
 * 
 */
export default function deepMerge() {
  let acc = {};
  
  for (var i=0; i < arguments.length; i++) {
    acc = recurse(acc, arguments[i]);
  }
  
  return acc;
}
