import styleDenormalizer from "./utils/styleDenormalizer";
import commander from "./utils/commander";
import merge from "./utils/merge";
import commands from "./commandsManager";

export default function buildStyles() {
  const rawStyles = Array.prototype.slice.call(arguments);
  const runtimeCommands = {};
  
  const built = styleDenormalizer
    .apply(null, rawStyles)
    .reduce( (acc, res) => {
      
      acc = merge(acc, res.styles);
      commander(acc, res.commands, commands.getCommands());
      if(res.runtimeCommands){
        Object.keys(res.runtimeCommands).forEach(key => {
          runtimeCommands[key] = runtimeCommands[key] || [];
          res.runtimeCommands[key] && (runtimeCommands[key] = runtimeCommands[key].concat(res.runtimeCommands[key]));
        });
      }
      
      return acc;
    }, {});
    
    Object.defineProperty(built, '__runtime_commands__', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: {...runtimeCommands}
    });

  return built;
}
