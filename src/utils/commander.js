import {
  styleAssign,
  styleAssignAndClone
}
from "./styleAssign";
import cloneStyle from "./cloneStyle";
import findClassNames from "./findClassNames";

function extend(styles, className, extendFrom) {
  let targetValue = styles;
  styles[className];

  // targetClasses.forEach(classNameArr => {
  //   classNameArr.forEach(className => {
  //     targetValue = targetValue[className];
  //   });
  // });

  // delete style[subKey];
  // console.log("targetValue----");
  // console.log(targetValue);
  // console.log("-----targetValue");
  // Object.assign(style, targetValue);

  return style;
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
