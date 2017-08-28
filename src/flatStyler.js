/**
 * @copyright (c) 2017 Smartface.io
 * @license MIT
 * @author Cenk Cetinkaya
 */

import styler from "./styler";

/**
 * Flats specified Stylers
 *
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

  return function flatStylerStyle(classNames){
    return flattedStyler(classNames);
  };
}
