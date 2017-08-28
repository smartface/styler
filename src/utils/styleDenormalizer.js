import {styleAssign, styleAssignAndClone} from "./styleAssign";
import merge from "./merge";

import {CLASSNAME, ID, CHILD_CLASS, COMMAND} from "../constants";

function flat(styles){
  const denormalizedStyles = {};
  const commands = {};

  function flatStyle(style, key, parent="") {
    Object.keys(style[key]).forEach((skey) => {
      var newKey = key;
      
      if(key.charAt(0) === CHILD_CLASS) {
        newKey = key.slice(1);
      }
      
      switch (skey.charAt(0)) {
        case COMMAND:
          commands[skey] = commands[skey] || [];
          commands[skey].push({
            className: parent+newKey,
            value: style[key][skey]
          });
          
          delete style[skey];
          break;
        case CLASSNAME:
        case ID:
        case CHILD_CLASS:
          flatStyle(style[key], skey, parent+newKey);
          
          break;
        default:
          denormalizedStyles[parent+newKey] = denormalizedStyles[parent+newKey] || {};
          
          // current is className then merge with parent
          if(parent && denormalizedStyles[parent] && key.charAt(0) === CLASSNAME) {
            denormalizedStyles[parent+newKey] = merge(denormalizedStyles[parent], denormalizedStyles[parent+newKey]);
          }

          styleAssign(denormalizedStyles[parent+newKey], skey, style[key][skey]);
      }
    });
  }
  
  Object.keys(styles).forEach((key) => {
    flatStyle(styles, key);
  });
  
  return {
    styles: denormalizedStyles,
    commands
  }
}

function flatStyles(styles){
  return styles.map(style => flat(style));
}

export default function styleDenormalizer() {
  const styles = Array.prototype.slice.call(arguments);
  return flatStyles(styles);
};
