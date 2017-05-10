const mapStyles = function (style, classNames, fn) {
  const classNamesCopy = classNames.slice();
  const className = classNamesCopy.shift();
  let parent = "";
  
  if (Array.isArray(className)) {
    mapStyles(style, className, fn);
  } else if (typeof style[className] === 'object' && classNamesCopy) {
    parent = className;
    
    Object.keys(style[className])
      .forEach((key) => {
        if (key.charAt(0) !== '.' && key.charAt(0) !== '&') {
          fn(className, key, style[className][key]);
        } else if (key.charAt(0) === '&') {
          let withParentKey = parent + key.slice(1);
          style[withParentKey][withParentKey] = style[className][key];
          
          delete style[className][key];
        }
      });
      
    mapStyles(style[className], classNamesCopy, fn);
  }
};

export default mapStyles;
