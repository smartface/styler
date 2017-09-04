/**
 * @copyright (c) 2017 Smartface.io
 * @license MIT
 * @author Cenk Cetinkaya
 */

import styler from "./styler";

/**
 * Flats specified Stylers
 *
 * @param {...function} - Styling functions
 * return {function} - Styling Composer
 */
export default function flatStyler(){
  const stylers = Array.prototype.slice.call(arguments);
  const styles = stylers.map(function(stylr){
    const style = stylr()(); 
    
    return Array.isArray(style)
      ? flatStyler.apply(null, style)()()
      : style
  });

  const flattedStyler = styler.apply(null, styles);
  /**
   * Flatten Styling Composer
   *
   * @param {string} classNames
   * @returns {Object} - Flatten Styles
   */
  return function flatStylerStyle(classNames){
    return flattedStyler(classNames);
  };
}
