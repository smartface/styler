# Global





* * *

### exports(style) 

Styling Wrapper

**Parameters**

**style**: `Object`, style Styles Object

**Returns**: , style scoped function

**Example**:
```js
### For Example:
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
```



* * *










