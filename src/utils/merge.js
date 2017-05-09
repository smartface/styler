import basicMerge from "./basicMerge";

export function basicMerge(objects) {
  var out = {};

  for (var i = 0; i < objects.length; i++) {
    for (var p in objects[i]) {
      out[p] = objects[i][p];
    }
  }

  return out;
}

function recurse(){
}


export default function deepMerge() {
  var args = Array.prototype.slice.call(arguments);
  
  args.reduce((acc, curr) => {
    curr.forEach()
    
  }, {})
}
