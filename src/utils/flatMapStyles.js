import merge from "./merge";

const flatMapStyles = function(style, classNames, fn) {
  // const classNamesCopy = classNames.slice();
  // const className = classNamesCopy.shift();
  // let parent = "";

  // console.log("className", style, className);
  // if (Array.isArray(className)) {
  //   mapStyles(style, className, fn);
  // } else if (typeof style[className] === 'object' && classNamesCopy) {
    // parent = className;
  var mergedStyle = {};
  var styles = [];

  classNames.forEach((className) => {
    styles.push(style[className]);
  });
  
  mergedStyle = merge.call(null, styles);
  
  console.log(mergedStyle);
  
  fn(classNames, mergedStyle);

    // mapStyles(style[className], classNamesCopy, fn);
  // }
};

export default flatMapStyles;
