import styleDenormalizer from "./utils/styleDenormalizer";
import commander from "./utils/searchAndApplyCommand";
import merge from "./utils/merge";
import commands from "./commandsManager";
import type { Style } from "./StylerTypes";
import { RUNTIME_COMMAND_DESCRIPTOR, STYLER_BUNDLE_DESCRIPTOR } from "./constants";

export default function buildStyles(...rawStyles: Style[]) {
  const runtimeCommands = {isEmpty: true};
  
  if(rawStyles[0].__styler_bundle__)
    return rawStyles[0];
  const compileCommands = commands.getCommands();
  const built = styleDenormalizer(...rawStyles)
    .reduce( (acc, res) => {
      acc = merge(acc, res.styles);
      commander(acc, res.commands, compileCommands, res.runtimeCommands);
      if(res.runtimeCommands){
        runtimeCommands.isEmpty && delete runtimeCommands.isEmpty;
        for(let key in res.runtimeCommands){
          runtimeCommands[key] = runtimeCommands[key] || [];
          // merge command collection with new by key
          res.runtimeCommands[key] && (runtimeCommands[key] = runtimeCommands[key].concat(res.runtimeCommands[key]));
        }
      }
      
      return acc;
    }, {});
    
    if(!runtimeCommands.isEmpty){
      Object.defineProperty(
        built, 
        RUNTIME_COMMAND_DESCRIPTOR, 
        {
          enumerable: false,
          configurable: false,
          writable: false,
          value: {...runtimeCommands}
        });
    }

  Object.defineProperty(
    built, 
    STYLER_BUNDLE_DESCRIPTOR, 
    {
      enumerable: false,
      configurable: false,
      writable: false,
      value: true
    });
    
  return built;
}
