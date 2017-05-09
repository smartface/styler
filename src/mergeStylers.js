import {styleAssignAndClone} from "./utils/styleAssign";

/**
 * Takes multiple stylers as parameters and returns single styler function. 
 * Searches given classnames from all given stylers then output like a single Styler.
 *
 * @example
 * ...
 * const styler1 = styler(styles1);
 * const styler2 = styler(styles2);
 * const styler3 = styler(styles3);
 * 
 * const mergedStyler = mergeStyler(styler1, styler2, styler3);
 * const styles = mergedStyler(".button.small .button.warning");
 * 
 * styles(function(className, key, value){
 *  ...
 *  
 * });
 * 
 * @param {Function} - Styler
 * @returns {Function}
 */
export default function mergeStylers() {
  const stylers = Array.prototype.slice.call(arguments);
  /**
   * Styling composer
   * 
   * @param {String} classNames - Class names of desired styles
   */
  return function(className) {
    /**
     * Styles mapping
     * 
     * @param {Function} fn - Map callback function
     */
    return function(fn) {
      const result = {};
      const mapFn = function(className, key, value) {
        styleAssignAndClone(result, key, value);
        fn && fn(className, key, value);
      };

      stylers.forEach(styler => styler(className)(mapFn));

      return result;
    };
  };
}
