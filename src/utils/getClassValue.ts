export default function getClassValue(styleDef: object) {
  return function (className: string) {
    if (typeof styleDef[className] === 'undefined') {
      return styleDef[className];
    }

    throw new Error(`Specified className ${className} is not found.`);
  };
};
