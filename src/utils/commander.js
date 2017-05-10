import {
  styleAssign,
  styleAssignAndClone
}
from "./styleAssign";
import cloneStyle from "./cloneStyle";
import findClassNames from "./findClassNames";
import merge from "./merge";

function extend(styles, className, extendFrom) {
  let targetValue = styles;
  styles[className] = merge(styles[className], styles[extendFrom]);

  return styles;
}

function findCommnand(key) {
  switch (key) {
    case '@extend':
      return extend;
    default:
      throw new Error(`${key} Commnand cannot be found`);
  }
}

export default function searchAndApplyCommand(denormalizedStyle, commandMap) {
  Object.keys(commandMap).forEach(command => {
    // console.log("commandMap", command);
    commandMap[command].forEach(({className, value}) => {
      findCommnand(command)(denormalizedStyle, className, value);
    })
  });
}
