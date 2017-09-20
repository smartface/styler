import styleDenormalizer from "./utils/styleDenormalizer";
import commander from "./utils/commander";
import merge from "./utils/merge";
import commands from "./commandsManager";

export default function buildStyles() {
  const rawStyles = Array.prototype.slice.call(arguments);
  
  const built = styleDenormalizer
    .apply(null, rawStyles)
    .reduce( (acc, res) => {
      acc = merge(acc, res.styles);
      commander(acc, res.commands, commands.getCommands());
      if(res.runtimeCommands){
        acc.__runtime_commands__ = acc.__runtime_commands__ || {};
        Object.keys(res.runtimeCommands).forEach(key => {
          acc.__runtime_commands__[key] = [...acc.__runtime_commands__[key], ...res.runtimeCommands[key]];
        })
      }
      
      Object.defineProperty(acc, '__runtime_commands__', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: Object.freeze(res.runtimeCommands)
      });
      
      return acc
    }, {});
    
  return built;
}
