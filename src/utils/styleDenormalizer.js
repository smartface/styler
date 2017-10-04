import {styleAssign, styleAssignAndClone} from "./styleAssign";
import merge from "./merge";

import {CLASSNAME, RUNTIME_COMMAND, ID, CHILD_CLASS, COMMAND} from "../constants";

function flat(styles){
  const denormalizedStyles = {};
  const commands = {};
  const runtimeCommands = {};
  var parentIndex = 0;

  function flatStyle(style, key, parent="") {
    Object.keys(style[key]).forEach((skey) => {
      var newKey = key;
      
      if(key.charAt(0) === CHILD_CLASS) {
        newKey = key.slice(1);
      }
      
      switch (skey.charAt(0)) {
        case RUNTIME_COMMAND:
          let currentClass = parent+newKey;
          runtimeCommands[currentClass] = runtimeCommands[currentClass] || [];
          runtimeCommands[currentClass].push({
            type: skey.slice(0, skey.indexOf(":")),
            args: skey.slice(skey.indexOf(":")+1),
            className: parent+newKey,
            value: style[key][skey]
          });
          
          delete style[key][skey];
          break;
        case COMMAND:
          commands[skey] = commands[skey] || [];
          const newCommand = {
            className: parent+newKey,
            value: style[key][skey]
          };
          
          if(parent === "") {
            commands[skey].splice(parentIndex, 0, newCommand);
            parentIndex = commands[skey].length;
          } else {
            commands[skey].splice(parentIndex, 0, newCommand);
          }

          delete style[key][skey];
          break;
        case CLASSNAME:
        case ID:
        case CHILD_CLASS:
          flatStyle(style[key], skey, parent+newKey);
          
          break;
        default:
          denormalizedStyles[parent+newKey] = denormalizedStyles[parent+newKey] || {};
          
          // if current is className then merge with parent
          if(parent && denormalizedStyles[parent] && key.charAt(0) === CLASSNAME) {
            denormalizedStyles[parent+newKey] = merge(denormalizedStyles[parent], denormalizedStyles[parent+newKey]);
          }

          styleAssign(denormalizedStyles[parent+newKey], skey, style[key][skey]);
      }
    });
  }
  
  Object.keys(styles).forEach((key, index) => {
    flatStyle(styles, key);
  });
  
  return {
    styles: denormalizedStyles,
    commands,
    runtimeCommands
  };
}

function flatStyles(styles){
  return styles.map(style => flat(merge(style)));
}

export default function styleDenormalizer() {
  const styles = Array.prototype.slice.call(arguments);
  return flatStyles(styles);
};
