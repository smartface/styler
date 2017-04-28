export default function memoizeStyler(styler) {
  const memory = {};
  
  return (memoClassName) => {
    if (!memory[memoClassName]) {
      const styling = styler(memoClassName);
      const styles = {};
  
      styling((className, key, value) => {
        if(typeof value === "object")
          styles[key] = Object.assign({}, value);
        else 
          styles[key] = value;
          
        // memory[className] = Object.assign({}, styles);
      });

      memory[memoClassName] = styles;
    }
    
    return function(fn){
      Object
        .keys(memory[memoClassName])
        .forEach(key => fn(memoClassName, key, memory[memoClassName][key]));
      
      return function removeFromMemory() {
        delete memory[memoClassName];
      };
    }
  };
}
