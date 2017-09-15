/**
 * @copyright (c) 2017 Smartface.io
 * @license MIT
 * @author Cenk Cetinkaya
 * @version  1.1.2
 */

import cloneStyle from "./utils/cloneStyle";
import findClassNames from "./utils/findClassNames";
import mapStyles from "./utils/flatMapStyles";
import buildStyles from "./buildStyles";
import merge from "./utils/merge";
/**
 * Styling Wrapper. In order to return desired styles. Makes styles flatted then merge all by classNames then pass merged styles to callback.
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
 * @param {...Object.<string, (string | number | function | Object)>} - Style Objects
 * @returns {function} - Styling composer
 */
export default function styler() {
  const stylesBundle = buildStyles.apply(null, arguments);

  /**
   * Styling composer
   * 
   * @param {...string} classNames - Class names of desired styles
   */
  return function stylingComposer(classNames) {
    var parsedClassNames;
    const styles = [];
    
    if(classNames){
      parsedClassNames = findClassNames(classNames).map((classNm) => classNm ? classNm.join("") : "");
      parsedClassNames.forEach((className) => {
        styles.push(stylesBundle[className]);
      });
    } else {
      styles.push(stylesBundle);
    }
    
    const style = merge.apply(null, styles);

    /**
     * Styles mapper. If passed a function as the argument then return styles to the funtion or null then return style object.
     * 
     * @param {?function=} [null] fn - Mapping callback function
     */
    return function stylesComposer(fn=null) {
      
      //create deepcopy of the style
      
      if(fn){
        let result = {};
        
        parsedClassNames.forEach((className) => {
          Object.keys(stylesBundle[className]).forEach((key) => {
            let value = stylesBundle[className][key] instanceof Object 
              ? merge(stylesBundle[className][key])
              : stylesBundle[className][key];
              
            result[key] = fn(classNames, key, value);
          });
        });

        return result;
      };

      return style;
    };
  };
}
