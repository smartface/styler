import {styleAssignAndClone} from "./utils/styleAssign";
import merge from "./utils/merge";

/**
 * Takes multiple styling functions and returns single styling function as all is combined.
 * Searches given classnames from all given stylers then output like a single Styler.
 *
 * @example
 * ...
 * const styler1 = styler(styles1);
 * const styler2 = styler(styles2);
 * const styler3 = styler(styles3);
 * 
 * const mergedStyler = combineStyler(styler1, styler2, styler3);
 * const styles = combineStyler(".button.small .button.warning");
 * 
 * styles(function(className, key, value){
 *  ...
 *  
 * });
 * 
 * @param {...function} - Styling functions
 * @returns {function} - Styling Composer
 */
export default function combineStyler() {
  const stylings = Array.prototype.slice.call(arguments);
  /**
   * Styling composer
   * 
   * @param {string} classNames - Class names of desired styles
   */
  return function combinedStyleComposer(classNames) {
    const results = [];
    stylings.forEach(styling => results.push(styling(classNames)()));
    
    const mergedResults = merge.apply(null, results);

    /**
     * Styles mapping
     * 
     * @param {function} fn - Style map callback function
     * @returns {Object|null} - return style object
     */
    return function(fn) {
      if(typeof classNames !== "string"){
        return stylings.slice();
      }
      
      if(typeof fn === "function"){
        const mapResult = {};
        const mapFn = function(classNames, key, value) {
          fn(classNames, key, value);
        };
        
        stylings.forEach(styling => styling(classNames)((className, key, value) => {
          mapResult[className] = mapResult[className] || [];
          mapResult[className].push({[key]: value});
        }));
        
        Object.keys(mapResult)
          .forEach(className => {
            mapResult[className] = merge.apply(null, mapResult[className]);
            Object.keys(mapResult[className]).forEach(key => fn(className, key, mapResult[className][key]));
          })
      }
      
      return mergedResults;
    };
  };
}
