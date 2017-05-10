import {styleAssign, styleAssignAndClone} from "./styleAssign";

export default function styleDenormalizer(styles) {
  const denormalizedStyles = {};
  const commands = {};
  
  function flatStyle(style, key, parent="") {
    Object.keys(style[key]).forEach((skey) => {
      let newKey = key;
      
      if(key.charAt(0) === '&') {
        newKey = key.slice(1);
      }

      if (skey.charAt(0) !== '@' && skey.charAt(0) !== '.' && skey.charAt(0) !== '&') { // current's not a className or a parenting shortcut or a command
        denormalizedStyles[parent+newKey] = denormalizedStyles[parent+newKey] || {};
        
        // current is className then merge with parent
        if(parent && denormalizedStyles[parent] && key.charAt(0) === '.') {
          denormalizedStyles[parent+newKey] = {...denormalizedStyles[parent], ...denormalizedStyles[parent+newKey]};
        }
        
        styleAssign(denormalizedStyles[parent+newKey], skey, style[key][skey]);
      } else if(skey.charAt(0) === '@') { // It's a command
        commands[skey] = commands[skey] || [];
        commands[skey].push({
          className: parent+newKey,
          value: style[key][skey]
        });
        
        delete style[skey];
      } else {
        flatStyle(style[key], skey, parent+newKey);
      }
    });
  }
  
  Object.keys(styles).forEach((key) => {
    flatStyle(styles, key);
  });
  
  return {
    styles: denormalizedStyles,
    commands
  };
};
