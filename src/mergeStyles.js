export default function mergeStylers(){
    const stylers = Array.prototype.slice.call(arguments);
    
    return function(className){
        return function(fn){
            const result = {};
            const mapFn = function(className, key, value){
                if(typeof value === "object"){
                    result[key] = Object.assign({}, result[key], value);
                } else {
                    result[key] = value;
                }
                
                fn && fn(className, key, value);
            };
            
            stylers.forEach(styler => styler(className)(mapFn));
            
            return result;
        };
    };
}
