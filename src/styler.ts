/**
 * @copyright (c) 2017 Smartface.io
 * @license MIT
 * @author Cenk Cetinkaya
 */

import findClassNames from "./utils/findClassNames";
import buildStyles from "./buildStyles";
import merge from "./utils/merge";
import commandsManager from "./commandsManager";
import { Styler } from "./StylerTypes";


/**
 * Styling Wrapper. In order to return desired styles. Makes styles flatted then merge all by classNames then pass merged styles to callback.
 * 
 * @example
 *  import styler from "@smartface/styler";
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
const styler: Styler = (...rawStyles) => {
  const stylesBundle = buildStyles.apply(null, rawStyles);

  /**
   * Styling factory
   * 
   * @param {...string} classNames - Class names of desired styles
   */
  return function styleFactory(classNames?: string, errorHandler?:(error:any) => void, isCommandDisabled?: boolean) {
    if(errorHandler && typeof errorHandler !== "function"){
      throw new Error("Error handler must be a function");
    }

    let parsedClassNames: string[];
    const styles = [];
    const notFound = [];
    

    if (classNames) {
      const commands = stylesBundle.__runtime_commands__;
      parsedClassNames = findClassNames(classNames).map((classNm) => classNm ? classNm.join("") : "");
      parsedClassNames.forEach((className) => {
        if(!stylesBundle[className]){
          notFound.push(className);
          return;
        }
        
        let style = stylesBundle[className];
        let factories = commands[className] && !isCommandDisabled
          ? commandsManager.getRuntimeCommands()
          : null;
        if (factories && !isCommandDisabled) {
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
      if (factories.length > 0 && commands && !isCommandDisabled) {
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
    
    if(notFound.length > 0 && errorHandler){
      errorHandler(notFound.join(", ")+" cannot be found.");
    }
    
    /**
     * Styles mapper. If passed a function as the argument then return styles to the funtion or null then return style object.
     * 
     * @param {?function=} [null] fn - Mapping callback function
     */
    return function stylesComposer(mapFn:(classNames: string, key: string, value:any)=>void = null) {

      //create deepcopy of the style

      if (mapFn) {
        let result = {};

          if(style){
            Object.keys(style).forEach((key) => {
              let value = style[key] !== null &&
                style[key] instanceof Object 
                  ? merge(style[key])
                  : style[key];
  
              result[key] = mapFn(classNames, key, value);
            });
          }

        return result;
      };

      return style;
    };
  };
}

export default styler;