/**
 * @copyright (c) 2017 Smartface.io
 * @license MIT
 * @author Cenk Cetinkaya
 * @version  1.0.0
 */

import cloneStyle from "./utils/cloneStyle";
import findClassNames from "./utils/findClassNames";
import mapStyles from "./utils/flatMapStyles";
import flatStyles from "./flatStyles";
import merge from "./utils/merge";
/**
 * Styling Wrapper. In order to return desired styles. Makes styles flatted then merge all by classNames then pass merged styles to callback.
 * 
 * @example
 *  const styler = require("@smartface/styler").flatStyler or require("@smartface/styler/lib/flatStyler");
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
  return function(classNames) {
    const parsedClassNames = findClassNames(classNames).map((classNm) => classNm.join(""));

    /**
     * Styles mapping
     * 
     * @param {Function} fn - Mapping callback function
     */
    return function(fn) {
      const styles = [];
      
      parsedClassNames.forEach((className) => {
        styles.push(denormalizedStyles[className]);
      });

      var mergedStyle = merge.apply(null, styles);
      
      Object.keys(mergedStyle).forEach((key) => {
        fn(classNames, key, mergedStyle[key]);
      });
      
      mergedStyle = null;
    };
  };
}
