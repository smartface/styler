export default function memoizeStyler(styler) {
  const memory = {};

  return theme => (themeClassName, fn) => {
    if (memory[themeClassName]) {
      fn && Object
        .keys(memory[themeClassName])
        .forEach(key => fn(themeClassName, key, memory[themeClassName][key]));
      return memory[themeClassName];
    }

    const styling = styler(themeClassName);
    const styles = {};

    styling((className, key, value) => {
      let val = value;

      if (typeof value === 'function') {
        val = value(theme);
      }
      styles[key] = val;
      fn && fn(className, key, val);
    });

    memory[themeClassName] = styles;

    return function removeFromMemory() {
      delete memory[themeClassName];
    };
  };
}
