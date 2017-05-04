const getClassValue = function (styleDef) {
  return function (className) {
    if (typeof styleDef[className] === 'undefined') {
      return styleDef[className];
    }

    throw new Error(`Specified className ${className} is not found.`);
  };
};

export default getClassValue;
