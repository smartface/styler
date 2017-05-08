import {styleAssign} from "./styleAssign";

export default function normalizeStyle(styles) {
  const normalizedStyles = {};
  
  function flatStyle(styles, key, parent=""){
    Object.keys(styles[key]).forEach((skey) => {
      let newKey = key;
      
      if(key.charAt(0) === '&'){
        newKey = key.slice(1);
      }
      
      if (skey.charAt(0) !== '.' && skey.charAt(0) !== '&') {
        normalizedStyles[parent+newKey] = normalizedStyles[parent+key] || {};
        styleAssign(normalizedStyles[parent+newKey], skey, styles[key][skey]);
      } else {
        flatStyle(styles[key], skey, parent+newKey);
      }
    });
  }
  
  Object.keys(styles).forEach((key) => {
    flatStyle(styles, key);
  });
  
  return normalizedStyles;
};
