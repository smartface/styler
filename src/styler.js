/**
 * @copyright (c) 2017 Smartface.io
 * @license MIT
 * @author Cenk Cetinkaya
 * @version  1.0.0
*/

import cloneStyle from "./utils/cloneStyle";
import findClassNames from "./utils/findClassNames";
import mapStyles from "./utils/mapStyles";
import flatStyles from "./flatStyles";

/**
 * Styling Wrapper. In order to return desired styles, composes styling functions.
 * 
 * @example
 *  const styler = require("@smartface/styler").styler or require("@smartface/styler/lib/styler");
 *  const styles = {
 *      ".button"{
 *        widht: "100px",
 *        height: "30px",
 *        ".blue": {
 *          color: "blue"
 *        },
 *        ".red": {
 *          color: "red"
 *        }
 *    }
 *  }
 *  
 *  const styling = styler(styles);
 *  const blueButtonStyle = {};
 *  const redButtonStyle = {};
 * 
 *  styling(".button.blue")(function(className, key, value){
 *    blueButtonStyle[key] = value;
 *  }); 
 *  // blueButtonStyle equals to {width: "100px", height: "20px", color: "blue"}
 *  
 *  styling(".button.red")(function(className, key, value){
 *    redButtonStyle[key] = value;
 *  });
 *  // redButtonStyle equals to {width: "100px", height: "20px", color: "red"}
 * 
 * @param {Object} style - Styles Object
 * @returns {Function} - Styling composer
 */
export default function styler(style) {
  const denormalizedStyles = flatStyles(style);
  
  /**
   * Styling composer
   * 
   * @param {String} classNames - Class names of desired styles
   */
  return function (classNames) {
    const parsedClassNames = findClassNames(classNames).map((classNm) => classNm.join(""));
    
    /**
     * Styles mapping
     * 
     * @param {Function} fn - Mapping callback function
     */
    return function (fn) {
      mapStyles(
        denormalizedStyles,
        parsedClassNames,
        (className, key, value) => {
          fn(className, key, cloneStyle(value));
        });
    };
  };
}
