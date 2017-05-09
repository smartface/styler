const findClassNames = (function() {
  const classesRegExp = /\.([a-zA-Z\W0-9][^.]*)/g;
  const cache = {};
  
  return function(selector) {
    
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
