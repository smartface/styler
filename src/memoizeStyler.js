import cloneStyle from "./utils/cloneStyle";
import {styleAssignAndClone} from "./utils/styleAssign";

/**
 * Memoize Pattern implementation for Styler. Decorates a styler function 
 * and caches every request then returns styles from the cache.
 * 
 * @param {Function} styler - Styler function
 * @returns {Function} - Styling composer
 */
export default function memoizeStyler(styler) {
  let memory = {};
  
  /**
   * Gets styles from styler then caches them using className as a key
   * 
   * @param {String} className - Classnames string
   */
  return (className) => {
    if (!memory[className]) {
      const styling = styler(className);
      const newStyle = {};
  
      styling((className, key, value) => {
        styleAssignAndClone(newStyle, key, value);
      });

      memory[className] = newStyle;
    }
    
    /**
     * Styles mapping function, get styles from styler or cache if exists then calls fn and pass style.
     *
     * @params {Function} fn - Map function
     */
    return function(fn){
      const style = cloneStyle(memory[className]);
      Object
        .keys(memory[className])
        .forEach(key => fn(className, key, style[key]));
      
      return function removeFromMemory(all=false) {
        if(all) {
          memory = {};
        } else {
          delete memory[className];
        }
      };
    };
  };
}
