import cloneStyle from "./utils/cloneStyle";
import {styleAssignAndClone} from "./utils/styleAssign";

export default function memoizeStyler(styler) {
  let memory = {};
  
  return (memoClassName) => {
    if (!memory[memoClassName]) {
      const styling = styler(memoClassName);
      const newStyle = {};
  
      styling((className, key, value) => {
        styleAssignAndClone(newStyle, key, value);
      });

      memory[memoClassName] = newStyle;
    }
    
    return function(fn){
      const style = cloneStyle(memory[memoClassName]);
      Object
        .keys(memory[memoClassName])
        .forEach(key => fn(memoClassName, key, style[key]));
      
      return function removeFromMemory(all=false) {
        if(all){
          memory = {};
        } else {
          delete memory[memoClassName];
        }
      };
    };
  };
}
