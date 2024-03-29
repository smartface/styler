import merge from "./utils/merge";

function extend(styles: object, className: string, extendFrom: string, runtimeCommands: {[key: string]: any}) {
  if(extendFrom === null || extendFrom === undefined)
    throw new TypeError(`Classname: ${className} must not be extended from empty parent`);
  
  const classNamePattern = new RegExp("\\"+className+"[\\.]+");
  const extendeds = extendFrom.split(",");
  let superStyles = {};
  // console.log(classN, " :: ", styles[classN])
  extendeds.forEach((extend) => {
    superStyles = merge(superStyles, styles[extend]);
    // merge if extended className has runtime commands
    if(runtimeCommands && runtimeCommands[extend]){
      runtimeCommands[className] = runtimeCommands[className] || [];
      //override extended className commands
      runtimeCommands[className] = runtimeCommands[extend].map(item => merge(item)).concat(runtimeCommands[className].map(obj => merge(obj)));
    }
  });
  
  styles[className] = merge(superStyles, styles[className]);

  Object.keys(styles).forEach(classN => {
    if(classNamePattern.test(classN)){
      styles[classN] = merge(styles[className], styles[classN]);
    }
  });

  return styles;
}

function extendAll(styles: object, className: string, extendFrom: string) {
  const parents = extendFrom.split(",");
  const extendingClassNamePattern = new RegExp("\\"+extendFrom+"\\W+");
  
  Object.keys(styles).forEach(classN => {
    if(classN === extendFrom || extendingClassNamePattern.test(classN)){
      // console.log(classN, " :: ", styles[classN])
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

export type RuntimeCommand = (styles: {[key: string]: any}, className: string, value: any) => object;
export type CommandFactory = (command: string) => RuntimeCommand;
export type RuntimeCommandFactory = (command: string) => (params: {args: string, className: string, value: any}) => object;
export default {
  addCommandFactory(commandFactory: CommandFactory) {
    commands.push(commandFactory);
  },
  addRuntimeCommandFactory(commandFactory: RuntimeCommandFactory) {
    runtimeCommands.push(commandFactory);
  },
  getCommands() {
    return commands.concat();
  },
  getRuntimeCommands() {
    return runtimeCommands.concat();
  }
};
