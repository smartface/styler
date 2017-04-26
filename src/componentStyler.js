/**
 * Component styling wrapper
 * 
 * Example:
 * ```js
 *  ...
 * 
 *  var componentStyle = componentStyler(style)(className);
 *  var comps = [comp1, comp2];
 *  comps.map(componentStyle);
 * or
 *  componentStyle(component);
 * 
 * ...
 * ```
 * @params {object} style Styles object
 * 
 */
export default function componentStyler(styler) {
  return function(className) {
    return function(component, componentName) {
      styler(className)(function(styleName, key, value) {
        function setKey(component, key, value){
          if(typeof value === 'object'){
            Object.assign(component[key], value);
          } else {
            component[key] = value;
          }
        }
        
        if(((componentName && componentName == styleName) || (className && styleName)) && component.hasOwnProperty(key)) {
        //   if (component instanceof AbstractComponent && componentName == styleName && component.hasProp(key)) {
          if (componentName == styleName && component.hasProp(key)) {
            component.set(key, value);
          } else {
            setKey(component, key, value);
          }
        } else {
          if(typeof component === "object") {
            setKey(component, key, value);
          }
          
          console.warning("[Warning][ComponentName :"+component.name+", StyleName: "+styleName+"] style cannot be assigned.");
        }
      });
    };
  };
};