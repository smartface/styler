import {CLASSNAME, ID, CHILD_CLASS, COMMAND} from "./constants";

const findClassNames = (function findClassNames() {
  const classesRegExp = /[\.\#]?([a-zA-Z\W0-9][^\.^\#]*)/g;
  const cache = {};
  
  return function styleSelector(selector) {
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

export default findClassNames;
