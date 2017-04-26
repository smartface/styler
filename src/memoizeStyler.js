export default (styler) => {
    const memory = {};
    return (theme) => {
        return (className, fn) => {
            if(memory[className]){
                fn && Object.keys(memory[className]).forEach(key => fn(className, key, memory[className][key]) );
                return memory[className];
            }
            
            const styling = styler(className);
            const styles = {};
            
            styling((className, key, value) => {
                if (typeof value === "function") {
                    value = value(theme);
                }
                
                styles[key] = value;
                fn && fn(className, key, value);
            });
            
            memory[className] = styles;

            return function(){
                delete memory[className];
            };
        };
    };
};
