# styler 
[![Build Status](https://travis-ci.org/smartface/styler.svg)](https://travis-ci.org/smartface/styler)
[![Npm Status](https://img.shields.io/npm/v/@smartface/styler.svg?style=flat)](https://www.npmjs.com/package/@smartface/styler)

Component styling wrapper. Provides to create reusable jss definitions like SASS, LESS etc.

### Style Objects
A style object is similar to a CSS definition. We create style objects with selectors then we can use whenever we want to assign them to components. For example:

### Selectors
Styling selectors are also similar to the CSS selectors. There are 2 kinds of selectors.

- "." ClassName selector
- "#" Element ID selector (Just a convention, in fact it's completely same with the classname selector)

```js

 const styleObject = {
   ".calendar":{
     "right":0,
     "left":0,
     "top":0,
     "height":360,
     "paddingLeft":0,
     "paddingRight":0
   },
   "#articleHeader":{
     "textColor":"#1775D0"
   }
}
```


## Styling Directives and Rules

#### Nested Selectors
```js

 const styleObject = {
   //base classname
   ".calendar":{
     // sub classname of .calendar, it interits all styles from base-className .calendar. Usage: .calendar.size
     ".size":{
       right:0,
       left:0,
       top:0,
       height:360,
       paddingLeft:0,
       paddingRight:0
       // sub classname of .size, it interits all styles from base-className .calendar.size. Usage: .calendar.size.big
       ".big": {
	    height: 600
       }
     }
   };

```

Different from CSS, nested selectors inherit properties from parents and override them if they contain same properties.

#### "&" Parent Selector

Parent selector is a useful tool. For instance you want to use naming conventions like BEM(Block, Element, Modifier) then parent selector helps you to create well documented selectors. For example:

I have a component that name is header and it contains other components that are named **navbar**, **yearLabel** and **arrow**. In BEM convention, **header** component is our block and these nested components are its elements. Then we can create style object as below. 

```js
const styleObject = {
	"#header":{
		"&_monthLabel":{
			"textColor":"#1775D0"
		},
		"&_yearLabel":{
			"textColor":"#B1B1B4"
		},
		"&_arrow":{
			"flexProps":{
				"flexGrow":1,
				"textColor":"#B1B1B4"
			  }
		}  
	}
```

### Build-time Directives
Build-time directives are run once style-objects are compiled by Styler.

#### @extend Rule

Extend rule provides inheritance between selectors so that selectors can inherit properties from another selectors.  **@extend** rule affects all nested-selectors of a selector but not with parent-selector rule(&). For example:

```js
const styles = {
  ".baseComponent":{
    width: 100,
    height: 200,
  },
  ".anotherBaseComponent":{
    width: 100,
    height: 200,
  },
  ".childComponent":{
    "@extend": ".baseComponent,.anotherBaseComponent"
  }
}
```

### Run-time Directives
Run-time directives are run for each style request by @smartface/styler, when making request to Styler, parent selector's properties are overriden if necessary.

```js
const styles = {
  ".baseComponent":{
    width: 100,
    height: 200
    "+anyRuleCreatedByUser:rule-params":{
      "width": 400
    },
    "+anotherRuleCreatedByUser:rule-params":{
      "width": 400,
      "height": 500
    }
  }
}
```

## Styling Conventions and Best Practices
According to [BEM](http://getbem.com/), pages are built by blocks, blocks are built by elements and another blocks. Elements and blocks have modifiers that are used to manipulate their display properties. 

For the blocks we can use "\__" or "\_" and for the elements we can use "\__" or "\_" and for the modifiers we can use "\--" or "\-".

For example:
In the CSS 
```css
.parentBlock {
...
}
.parentBlock_element {
...
}

.parentBlock_element-modifier {
...
}

.parentBlock_childBlock--modifier {
...
}

/* or with modifiers*/

.searchBlock_searchInputE{
}
.searchBlock_searchInput-activated{
}
.searchBlock_searchInput-deactivated{
}

/* or with modifiers as variable */
.searchBlock_searchInput-isActivated--true{
...
}
.searchBlock_searchInput-isActivated--false{
...
}
.searchBlock_searchInput-color{
...
}
.searchBlock_searchInput-color--red{
...
}

```

This method makes styles more readable, maintainable and easier to understand.
