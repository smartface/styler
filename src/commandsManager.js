import merge from "./utils/merge";

function extend(styles, className, extendFrom) {
  styles[className] = merge(styles[className], styles[extendFrom]);

  return styles;
}

function extendAll(styles, className, extendFrom) {
  const patternStr = "\\"+extendFrom+"\\W+";
  console.log(patternStr);
  const pattern = new RegExp(patternStr);
  Object.keys(styles).forEach(classN => {
    if(pattern.test(classN)){
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

export default {
  addCommandFactory(commandFactory) {
    commands.push(commandFactory);
  },
  getCommands() {
    return commands.concat();
  }
};
