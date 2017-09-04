# Global





* * *

### exports() 

Takes multiple styling functions and returns single styling function as all is combined.
Searches given classnames from all given stylers then output like a single Styler.

**Parameters**

****: `function`, Styling functions

**Returns**: `function`, - Styling Composer

**Example**:
```js
...
const styler1 = styler(styles1);
const styler2 = styler(styles2);
const styler3 = styler(styles3);

const mergedStyler = combineStyler(styler1, styler2, styler3);
const styles = combineStyler(".button.small .button.warning");

styles(function(className, key, value){
 ...
 
});
```



* * *










