# Global





* * *

### exports() 

Styling Wrapper. In order to return desired styles. Makes styles flatted then merge all by classNames then pass merged styles to callback.

**Parameters**

****: `Object.&lt;string, (string|number|function()|Object)&gt;`, Style Objects

**Returns**: `function`, - Styling composer

**Example**:
```js
const styler = require("@smartface/styler").styler or require("@smartface/styler/lib/styler");
 const styles = {
     ".button"{
       widht: "100px",
       height: "30px",
       ".blue": {
         color: "blue"
       },
       ".red": {
         color: "red"
       }
   }
 }
 
 const styling = styler(styles);
 const blueButtonStyle = {};
 const redButtonStyle = {};

 styling(".button.blue")(function(className, key, value){
   blueButtonStyle[key] = value;
 }); 
 // blueButtonStyle equals to {width: "100px", height: "20px", color: "blue"}
 
 styling(".button.red")(function(className, key, value){
   redButtonStyle[key] = value;
 });
 // redButtonStyle equals to {width: "100px", height: "20px", color: "red"}
```



* * *










