export const getClassValue = function(styleDef) {
  return function(className) {
    if (typeof styleDef[className] === "undefined") {
      return styleDef[className];
    }
    else {
      throw new Error("Specified className ${className} is not found.");
    }
  };
};

export const findClassNames = (function() {
  const classesRegExp = /\.([a-zA-Z\W0-9][^\.]*)/g;
  const cache = {};
  return function(selector) {
    if (cache.hasOwnProperty(selector)) {
      return cache[selector];
    }
    const classes = selector.replace(/[ ]+/g, " ")
      .split(" ")
      .map(function(items) {
        return items.match(classesRegExp);
      });

    if (!classes) {
      return '';
    }

    cache[selector] = classes;

    return classes;
  };
})();

const mapStyles = function(style, classNames, fn) {
  classNames = classNames.slice();
  const className = classNames.shift();

  if (Array.isArray(className)) {
    mapStyles(style, className, fn);
  }
  else if (typeof style[className] === "object" && classNames) {
    Object.keys(style[className])
      .map(function(key) {
        if (key.charAt(0) !== "." && key.charAt(0) !== "&") {
          fn(className, key, style[className][key]);
        }
        else if (key.charAt(0) === "&") {
          classNames.push(key);
        }
      });

    mapStyles(style[className], classNames, fn);
  }
};

/**
 * Styling Wrapper
 * Returns style scoped function
 * 
 * @params {object} style Styles Object
 */
export default function styler(style) {
  return function(classNames) {
    classNames = findClassNames(classNames);
    
    return function(fn) {
      classNames.forEach(function(classNames) {
        mapStyles(
          style,
          classNames,
          function(className, key, value) {
            fn(className, key, value);
          });
      });
    };
  };
};
