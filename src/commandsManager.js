import merge from "./utils/merge";

function extend(styles, className, extendFrom) {
  const extendeds = extendFrom.split(",");
  let superStyles = {};
  
  extendeds.forEach((extend) => {
     superStyles = merge(superStyles, styles[extend]);
  });
  
  styles[className] = merge(superStyles, styles[className]);
  
  return styles;
}

function extendAll(styles, className, extendFrom) {
  const extendeds = extendFrom.split(",");
  const extendingClassNamePattern = new RegExp("\\"+extendFrom+"\\W+");
  Object.keys(styles).forEach(classN => {
    if(extendingClassNamePattern.test(classN)){
      styles[classN.replace(extendFrom, className)] = merge(styles[classN], styles[className]);
    }
  });
  
  return styles;
}

function findCommnand(command) {
  switch (command) {
    case '@extend':
      return extend;
    case '@extend*':
      return extendAll;
  }
}

const commands = [findCommnand];
const runtimeCommands = [];

export default {
  addCommandFactory(commandFactory) {
    commands.push(commandFactory);
  },
  addRuntimeCommandFactory(commandFactory) {
    runtimeCommands.push(commandFactory);
  },
  getCommands() {
    return commands.concat();
  },
  getRuntimeCommands() {
    return runtimeCommands.concat();
  }
};
