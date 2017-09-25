/**
 * @copyright (c) 2017 Smartface.io
 * @license MIT
 * @author Cenk Cetinkaya
 */

import cloneStyle from "./utils/cloneStyle";
import findClassNames from "./utils/findClassNames";
import mapStyles from "./utils/flatMapStyles";
import buildStyles from "./buildStyles";
import merge from "./utils/merge";
import commandsManager from "./commandsManager";

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
function styler(...rawStyles) {
  const stylesBundle = buildStyles.apply(null, rawStyles);

  /**
   * Styling composer
   * 
   * @param {...string} classNames - Class names of desired styles
   */
  return function stylingComposer(classNames) {
    var parsedClassNames;
    const styles = [];

    if (classNames) {
      const commands = stylesBundle.__runtime_commands__;
      parsedClassNames = findClassNames(classNames).map((classNm) => classNm ? classNm.join("") : "");
      parsedClassNames.forEach((className) => {
        if(!stylesBundle[className]){
          throw new TypeError(className+" cannot be found");
        }
        
        let style = stylesBundle[className];
        let factories = commands[className]
          ? commandsManager.getRuntimeCommands()
          : null;
        if (factories) {
          factories.forEach(factory => {
            commands[className].forEach(command => {
              let fn = factory(command.type);
              fn && (style = merge(style, fn(command)));
            });
          });
        }
        
        styles.push(style);
      });
    } else {
      const commands = stylesBundle.__runtime_commands__;
      const factories = commandsManager.getRuntimeCommands();
      styles.push(stylesBundle);
      
      // if runtime commands and command factories exist
      if (factories.length > 0 && commands) {
        // run all runtime commands of the styles
        Object.keys(commands).forEach(className => {
          commands[className].forEach(command => {
            factories.forEach(factory => {
              let style = {};
              const fn = factory(command.type);
              fn && (style[className] = merge(stylesBundle[className], fn(command)));
              styles.push(style);
            });
          });
        });
      }
    }

    const style = merge.apply(null, styles);

    /**
     * Styles mapper. If passed a function as the argument then return styles to the funtion or null then return style object.
     * 
     * @param {?function=} [null] fn - Mapping callback function
     */
    return function stylesComposer(fn = null) {

      //create deepcopy of the style

      if (fn) {
        let result = {};

        parsedClassNames.forEach((className) => {
          Object.keys(stylesBundle[className]).forEach((key) => {
            let value = stylesBundle[className][key] !== null &&
              stylesBundle[className][key] instanceof Object ?
              merge(stylesBundle[className][key]) :
              stylesBundle[className][key];

            result[key] = fn(classNames, key, value);
          });
        });

        return result;
      };

      return style;
    };
  };
}

export default styler;
