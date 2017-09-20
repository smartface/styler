/**
 * Created by smartface on 10/18/16.
 */

import styler from "../src/styler";
import findClassNames from "../src/utils/findClassNames";
import componentStyler from "../src/componentStyler";
import { expect } from "chai";
import commands from "../src/commandsManager";

// import {findClassNames} from "../src/styler";
// const styler = require("../src/styler").styler;
// const resetStylerCache = require("../src/styler").resetStylerCache;
// const componentStyler = require("../src/styler").componentStyler;

describe("CommandsManager", function() {
  var component = { prop: "-", top: 0, left: 0 };

  beforeEach(function() {});

  it("should be add a new command", function() {
    var style1 = {
      ".button": {
        top: '10dp',
        left: '20dp',
        font: {
          size: "20dp"
        },
        ".red": {
          fillColor: "#ff0c0c"
        },
        "@newCommand": {
          "top": 100
        },
        "+media:Screen.width > 100": {
          "top": 100,
          "width": "Screen.width/2"
        }
      }
    };

    commands.addCommandFactory(function(command) {
      switch (command) {
        case '@newCommand':
          return (styles, className, value) => {
            styles[className].top = value.top;
            return styles;
          };
      }
    });
    
    const styling = styler(style1);
    const styles = styling(".button")();
    
    // console.log(styling(".button")())

    expect(styles).to.eql({
      top: 100,
      left: '20dp',
      font: {
        size: "20dp"
      },
    });
  });
  
  it("should be add a new runtime command", function() {
    var style1 = {
      ".button": {
        top: '10dp',
        left: '20dp',
        font: {
          size: "20dp"
        },
        ".red": {
          fillColor: "#ff0c0c"
        },
        "+media:Screen.width > 100": {
          "top": 100,
          "width": "Screen.width/2"
        }
      }
    };

    commands.addRuntimeCommandFactory(function runtimeCommandFactory(command) {
      switch (command) {
        case '+media':
          return ({args, className, value}) => {
            const screen = {width: 200};
            const evalValue = (function(Screen){
              const res = eval(args);
              res && Object.keys(value).forEach(key => value[key] = eval(value[key]));
              
              return res;
            }(screen))
            
            if(evalValue){
              return value;
            }
            
            return {};
          };
      }
    });
    
    const styling = styler(style1);
    const styles = styling(".button")();
    
    // console.log(styling(".button")())

    expect(styles).to.eql({
      top: 100,
      width: 100,
      left: '20dp',
      font: {
        size: "20dp",
      },
    });
  });

  it("should extend deeply", function() {
    var style1 = {
      ".button": {
        top: '10dp',
        left: '20dp',
        font: {
          size: "20dp"
        },
        ".red": {
          fillColor: "#ff0c0c"
        },
      },
      ".button.f": {
        top: '10dp',
        left: '20dp',
        font: {
          size: "20dp"
        },
        ".red": {
          fillColor: "#ff0c0c"
        },
      },
      ".buttonExtended": {
        "@extend*": ".button",
        top: 100
      },
      ".buttonA": {
        "@extend*": ".buttonExtended",
        top: null,
        left: null,
      }
    };

    const styling = styler(style1);
    const styles = styling(".buttonExtended.red")();

    expect(styling()()).to.eql(
      { '.button': { top: '10dp', left: '20dp', font: { size: '20dp' } },
      '.button.red': 
       { top: '10dp',
         left: '20dp',
         font: { size: '20dp' },
         fillColor: '#ff0c0c' },
      '.button.f': { top: '10dp', left: '20dp', font: { size: '20dp' } },
      '.button.f.red': 
       { top: '10dp',
         left: '20dp',
         font: { size: '20dp' },
         fillColor: '#ff0c0c' },
      '.buttonExtended': { top: 100 },
      '.buttonExtended.red': 
       { top: 100,
         left: '20dp',
         font: { size: '20dp' },
         fillColor: '#ff0c0c' },
      '.buttonExtended.f': { top: 100, left: '20dp', font: { size: '20dp' } },
      '.buttonExtended.f.red': 
       { top: 100,
         left: '20dp',
         font: { size: '20dp' },
         fillColor: '#ff0c0c' },
      '.buttonA': { top: null, left: null },
      '.buttonA.red': 
       { top: null,
         left: null,
         font: { size: '20dp' },
         fillColor: '#ff0c0c' },
      '.buttonA.f': { top: null, left: null, font: { size: '20dp' } },
      '.buttonA.f.red': 
       { top: null,
         left: null,
         font: { size: '20dp' },
         fillColor: '#ff0c0c' },
      // ".buttonA":{
      //   top: null,
      //   left: null,
      // } 
      }
     )
  });
});
