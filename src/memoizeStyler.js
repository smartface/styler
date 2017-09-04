import {styleAssignAndClone} from "./utils/styleAssign";
import merge from "./utils/merge";
import findClassNames from "./utils/findClassNames";

/**
 * Memoize Pattern implementation for Styler. Decorates a styler function 
 * and caches every request then returns styles from the cache.
 * 
 * @param {function} styling - Styling function
 * @returns {function} - Styling composer
 */
export default function memoizeStyler(styling) {
  var memory = {};
  
  /**
   * Gets styles from styler then caches them using className as a key
   * 
   * @param {string} classNames - Classnames string
   * @returns {function | Object} - If classnames exists then return styles composer if not returns the cache's deep copy.
   */
  return (classNames) => {
    if(classNames){
      const styles = styling(classNames);
      const parsedClassNames = findClassNames(classNames).map((classNm) => classNm.join(""));
      
      if(!memory[classNames]){
        memory[classNames] = {};
        styles((className, key, value) => {
          if (!memory[className]) {
            memory[className] = memory[className] || {};
            memory[className][key] = value;
          };
          memory[classNames][key] = value;
        });
      }
    }

    const style = classNames ? merge(memory[classNames]) : merge(memory);
    
    /**
     * Styles mapping function, get styles from styler or cache if exists then calls fn and pass style.
     *
     * @param {function} fn - Map function
     * @returns {Object} - Styles
     */
    return function(fn=null){
      if(typeof fn === 'function'){
        Object
          .keys(style)
          .forEach(key => fn(classNames, key, style[key]));
      }
      
      // returns deep copy of styles from cache
      return style;
    };
  };
}
