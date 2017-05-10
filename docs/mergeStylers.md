# Global





* * *

### exports() 

Takes multiple stylers as parameters and returns single styler function. 
Searches given classnames from all given stylers then output like a single Styler.

**Parameters**

****: `function`, Styler

**Returns**: `function`

**Example**:
```js
...
const styler1 = styler(styles1);
const styler2 = styler(styles2);
const styler3 = styler(styles3);

const mergedStyler = mergeStyler(styler1, styler2, styler3);
const styles = mergedStyler(".button.small .button.warning");

styles(function(className, key, value){
 ...
 
});
```



* * *










