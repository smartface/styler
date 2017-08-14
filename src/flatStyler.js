/**
 * @copyright (c) 2017 Smartface.io
 * @license MIT
 * @author Cenk Cetinkaya
 */

import styler from "./styler";

export default function flatStyler(){
  const stylers = Array.prototype.slice(arguments);
  const styles = stylers.map(function(stylr){
    return stylr()();
  });
  const flattedStyler = styler.apply(null, styles);
  
  return function flatStylerStyle(classNames){
    return flattedStyler(classNames);
  }
};
