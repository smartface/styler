import {styleAssignAndClone} from "./utils/styleAssign";

/**
 * Component styling wrapper
 * 
 * Example:
 * ```js
 *  ...
 * 
 *  var componentStyle = componentStyler(style)(className);
 *  var comps = [comp1, comp2];
 *  comps.map(componentStyle);
 * or
 *  componentStyle(component);
 * 
 * ...
 * ```
 * @params {object} style Styles object
 * 
 */
export default function componentStyler(styler) {
  return function(className) {
    return function(component) {
      styler(className)(function(cName, key, value) {
        if(typeof component === "object") {
          styleAssignAndClone(component, key, value);
        } else {
          throw "[Component :"+component+", ClassName: "+cName+"] style cannot be assigned.";
        }
      });
    };
  };
};
