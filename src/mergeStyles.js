export default function mergeStyles(){
    const stylers = Array.prototype.slice.call(arguments);
    const result = {};
    const mapFn = function(className, key, value){
        if(typeof value === "object"){
            Object.assign(result[key], value);
        } else {
            result[key] = value;
        }
    };
    
    stylers.forEach(style => style(mapFn()));
    
    return result;
}
