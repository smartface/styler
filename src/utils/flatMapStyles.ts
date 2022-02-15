import merge from "./merge";

const flatMapStyles = function(style, classNames, fn) {

  var mergedStyle = {};
  var styles = [];

  classNames.forEach((className) => {
    styles.push(style[className]);
  });
  
  mergedStyle = merge.call(null, styles);
  
  fn(classNames, mergedStyle);
};

export default flatMapStyles;
