import {
  styleAssignAndClone
}
from "./utils/styleAssign";

/**
 * Component High Order Styler function. Gets styles from styler then assigns them to given object or component.
 * 
 * @example
 *  ...
 * 
 *  var componentStyle = componentStyler(style)(className);
 *  var comps = [comp1, comp2];
 *  comps.map(componentStyle);
 * or
 *  componentStyle(component);
 * 
 * ...
 * 
 * @params {Function} styler - Styles object
 * @returns {Function} - Styling composer 
 */
export default function componentStyler(styler) {

  /**
   * Styling composer
   * 
   * @param {String} classNames - Class names of desired styles
   */
  return function(className) {

    /**
     * Assigns styles to component
     * 
     * @param {Object} component - Assingee component
     */
    return function(component) {
      styler(className)(function(cName, key, value) {
        if (typeof component === "object") {
          styleAssignAndClone(component, key, value);
        }
        else {
          throw "[Component :" + component + ", ClassName: " + cName + "] style cannot be assigned.";
        }
      });
    };
  };
};
