import styleDenormalizer from "./utils/styleDenormalizer";
import commander from "./utils/commander";
import merge from "./utils/merge";
import commands from "./commandsManager";

export default function buildStyles(...rawStyles) {
  const runtimeCommands = {isEmpty: true};
  
  if(rawStyles[0].__styler_bundle__)
    return rawStyles[0];
    
  const built = styleDenormalizer
    .apply(null, rawStyles)
    .reduce( (acc, res) => {
      acc = merge(acc, res.styles);
      commander(acc, res.commands, commands.getCommands(), res.runtimeCommands);
      if(res.runtimeCommands){
        runtimeCommands.isEmpty && delete runtimeCommands.isEmpty;
        Object.keys(res.runtimeCommands).forEach(key => {
          runtimeCommands[key] = runtimeCommands[key] || [];
          // merge command collection with new by key
          res.runtimeCommands[key] && (runtimeCommands[key] = runtimeCommands[key].concat(res.runtimeCommands[key]));
        });
      }
      
      return acc;
    }, {});
    
    if(!runtimeCommands.isEmpty){
      Object.defineProperty(
        built, 
        '__runtime_commands__', 
        {
          enumerable: false,
          configurable: false,
          writable: false,
          value: {...runtimeCommands}
        });
    }

  Object.defineProperty(
    built, 
    '__styler_bundle__', 
    {
      enumerable: false,
      configurable: false,
      writable: false,
      value: true
    });
    
  return built;
}
