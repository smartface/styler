export default function searchAndApplyCommand(denormalizedStyle, commandMap, commandFactory=[], runtimeCommands={}) {
  Object.keys(commandMap).forEach(command => {
    commandMap[command].forEach(({className, value}) => {
      commandFactory.forEach(fn => fn(command) && fn(command)(denormalizedStyle, className, value, runtimeCommands))
    })
  });
}
