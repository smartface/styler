import { styleAssignAndClone } from "./utils/styleAssign";

export default (styler) => {
  return (theme) => {
    return (className) => {
      const styling = styler(className);
      var styles = {};
      styling((className, key, value) => {
        if (typeof value === "function") {
          value = value(theme);
        }

        styleAssignAndClone(styles, key, value);
      });

      return styles;
    };
  };
};
