export const getClassValue = function (styleDef) {
  return function (className) {
    if (typeof styleDef[className] === 'undefined') {
      return styleDef[className];
    }

    throw new Error(`Specified className ${className} is not found.`);

  };
}

export const findClassNames = (function () {
  const classesRegExp = /\.([a-zA-Z\W0-9][^.]*)/g;
  const cache = {};
  return function (selector) {
    if (Object.prototype.hasOwnProperty.call(cache, selector)) {
      return cache[selector];
    }
    const classes = selector.replace(/[ ]+/g, ' ')
      .split(' ')
      .map(items => items.match(classesRegExp));

    if (!classes) {
      return '';
    }

    cache[selector] = classes;

    return classes;
  };
}());

const mapStyles = function (style, classNames, fn) {
  const classNamesCopy = classNames.slice();
  const className = classNamesCopy.shift();

  if (Array.isArray(className)) {
    mapStyles(style, className, fn);
  } else if (typeof style[className] === 'object' && classNamesCopy) {
    Object.keys(style[className])
      .forEach((key) => {
        if (key.charAt(0) !== '.' && key.charAt(0) !== '&') {
          fn(className, key, style[className][key]);
        } else if (key.charAt(0) === '&') {
          classNamesCopy.push(key);
        }
      });

    mapStyles(style[className], classNamesCopy, fn);
  }
};

/**
 * Styling Wrapper
 * Returns style scoped function
 *
 * @params {object} style Styles Object
 */
export default function styler(style) {
  return function (classNames) {
    const parsedClassNames = findClassNames(classNames);

    return function (fn) {
      parsedClassNames.forEach((classNm) => {
        mapStyles(
          style,
          classNm,
          (className, key, value) => {
            fn(className, key, value);
          });
      });
    };
  };
}
