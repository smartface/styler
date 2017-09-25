import {
  styleAssign,
  styleAssignAndClone
}
from "./styleAssign";
import cloneStyle from "./cloneStyle";
import findClassNames from "./findClassNames";
import merge from "./merge";

export default function searchAndApplyCommand(denormalizedStyle, commandMap, commandFactory=[], runtimeCommands={}) {
  Object.keys(commandMap).forEach(command => {
    // console.log("commandMap", command);
    commandMap[command].forEach(({className, value}) => {
      commandFactory.forEach(fn => fn(command) && fn(command)(denormalizedStyle, className, value, runtimeCommands))
    })
  });
}
