import cloneStyle from "./utils/cloneStyle";
import findClassNames from "./utils/findClassNames";
import mapStyles from "./utils/mapStyles";

/**
 * Styling Wrapper
 * Returns style scoped function
 *
 * @params {object} style Styles Object
 */
export default function styler(style) {
  return function (classNames) {
    const parsedClassNames = findClassNames(classNames);

    return function (fn) {
      parsedClassNames.forEach((classNm) => {
        mapStyles(
          style,
          classNm,
          (className, key, value) => {
            fn(className, key, cloneStyle(value));
          });
      });
    };
  };
}
