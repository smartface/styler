import cloneStyle from "./utils/cloneStyle";
import findClassNames from "./utils/findClassNames";
import mapStyles from "./utils/mapStyles";

/**
 * Styling Wrapper
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
 * @param {Object} - style Styles Object
 * @returns style scoped function
 */
export default function styler(style) {
  /**
   * Styling composer
   * 
   * @param {String} classNames
   */
  return function (classNames) {
    const parsedClassNames = findClassNames(classNames);

    /**
     * Styling map
     * 
     * @param {Function} - fn
     */
    return function (fn) {
      parsedClassNames.forEach((classNm) => {
        mapStyles(
          style,
          classNm,
          (className, key, value) => {
            fn(className, key, cloneStyle(value));
          });
      });
    };
  };
}
