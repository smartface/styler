import {styleAssign, styleAssignAndClone} from "./styleAssign";
import merge from "./merge";

import {CLASSNAME, RUNTIME_COMMAND, ID, CHILD_CLASS, COMMAND} from "../constants";
import type { Style } from "../StylerTypes";
import type { FlatStyle } from "./FlatStyle";

function flat(styles: Style): FlatStyle {
  const denormalizedAccumulator = {};
  const commands = {};
  const runtimeCommands = {};
  let parentIndex = 0;

  function flatStyle(style: object, key: string, parent="") {
    const tasks = [];
    Object.keys(style[key]).forEach((skey) => {
      var clenChildKey = key;
      
      if(key.charAt(0) === CHILD_CLASS) {
        // clear classname
        clenChildKey = key.slice(1);
      }
      
      switch (skey.charAt(0)) {
        case RUNTIME_COMMAND:
          let currentClass = parent+clenChildKey;
          runtimeCommands[currentClass] = runtimeCommands[currentClass] || [];
          const sepPos = skey.indexOf(":");

          if(sepPos < 3){
            throw new Error(`Syntax Error: ${skey} command must be ended with ':' before expression`)
          }

          runtimeCommands[currentClass].push({
            type: skey.slice(0, skey.indexOf(":")),
            args: skey.slice(skey.indexOf(":")+1),
            className: parent+clenChildKey,
            value: style[key][skey]
          });
          
          delete style[key][skey];
          break;
        case COMMAND:
          commands[skey] = commands[skey] || [];
          const newCommand = {
            className: parent+clenChildKey,
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
          // Delay task until complete parent attributes are completed
          tasks.push(() => flatStyle(style[key], skey, parent+clenChildKey))
          break;
        case ID:
        case CHILD_CLASS:
          flatStyle(style[key], skey, parent+clenChildKey);
          
          break;
        default:
          denormalizedAccumulator[parent+clenChildKey] = denormalizedAccumulator[parent+clenChildKey] || {};
          
          // if current is className then merge with parent
          if(parent && denormalizedAccumulator[parent] && key.charAt(0) === CLASSNAME) {
            denormalizedAccumulator[parent+clenChildKey] = merge(denormalizedAccumulator[parent], denormalizedAccumulator[parent+clenChildKey]);
          }

          styleAssign(denormalizedAccumulator[parent+clenChildKey], skey, style[key][skey]);
        }
    });
    // Run delayed tasks
    while(tasks.length)
      tasks.shift()();
  }

  for (const key in styles) {
    flatStyle(styles, key);
  }
  
  return {
    styles: denormalizedAccumulator,
    commands,
    runtimeCommands
  };
}

function flatStyles(styles: Style[]) {
  return styles.map(style => flat(merge(style)));
}

export default function styleDenormalizer(...styles:Style[]) {
  return flatStyles(styles);
};
