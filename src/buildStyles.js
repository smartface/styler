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
      
      return acc
    }, {});
    
  return built;
}
