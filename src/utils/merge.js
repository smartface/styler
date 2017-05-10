function isObj(val){
  return typeof val === "object";
}

function recurse(acc, obj){
  const output = {};
  
  for (var p in obj) {
    acc[p] = acc[p] || {};
    acc[p] = isObj(obj[p]) ? recurse(acc[p], obj[p]) : obj[p];
  }
  
  return acc;
}

export default function deepMerge() {
  var args = Array.prototype.slice.call(arguments);
  
  return args.reduce((acc, curr) => {
    return recurse(acc, curr);
  }, {});
}
