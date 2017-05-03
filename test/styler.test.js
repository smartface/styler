/**
 * Created by smartface on 10/18/16.
 */

import styler, {findClassNames} from "../src/styler";
import componentStyler from "../src/componentStyler";
import {expect} from "chai";
const Styler = require("../");

// import {findClassNames} from "../src/styler";
// const styler = require("../src/styler").styler;
// const resetStylerCache = require("../src/styler").resetStylerCache;
// const componentStyler = require("../src/styler").componentStyler;

describe("Styler", function() {
  var component = {prop:"-", top: 0, left: 0};
  var style1 = {
    ".button": {
      top: '10dp',
      left: '20dp',
      font: {
        size: "20dp"
      },
      ".red": {
        fillColor: "#ff0c0c"
      }
    }
  };

  var style2 = {
    ".button": {
      top: '10dp',
      left: '20dp',
      font: {
        size: "20dp"
      },
      ".red": {
        fillColor: "#ff0c0c"
      }
    }
  };
  
  var style3 = {
      ".button": {
        width: 100,
        height: 200,
        ".red":{
          color: "red",
        }
      },
      ".text-16":{
        font: {
          size: "16"
        },
        ".blue":{
          color: "blue",
          ".bold": {
            font: {
              bold: true
            }
          }
        }
      }
    };

  var style4 = {
      ".button": {
        width: 100,
        height: 200,
        ".red": {
          color: "red1",
        }
      },
      ".label": {
        ".button": {
          width: 300,
          height: 400,
          ".red":{
            color: "red2",
          }
        },
      },
      ".text-16":{
        font: {
          size: "16"
        },
        ".blue":{
          "&element":{
            fillColor: "black",
            font: {
              size: "12dp"
            }
          }
        }
      }
    };

  beforeEach(function() {
  });

  it("should be required from lib/index", function() {
    console.log(Styler);
    expect(typeof Styler.styler === "function").to.be.true;
    expect(typeof Styler.componentStyler === "function").to.be.true;
    expect(typeof Styler.extendStyler === "function").to.be.true;
    expect(typeof Styler.themeStyler === "function").to.be.true;
    expect(typeof Styler.memoizeStyler === "function").to.be.true;
  });
  
  it("should parse classNames from formatted string", function() {
    expect(findClassNames(".button.red .layout.left")).to.eql([['.button', '.red' ], [ '.layout', '.left' ]]);
    expect(findClassNames(".button .red   .layout.left")).to.eql([['.button'], ['.red' ], [ '.layout', '.left' ]]);
    expect(findClassNames(".button .red .label.button.red   .layout.left")).to.eql([['.button'], ['.red' ], [ '.label', '.button', '.red'], [ '.layout', '.left' ]]);
  });
  
  it("should pass styles to callback", function() {
    var component = {
      width: 0,
      height: 0,
      color: "",
    };
    
    var component2 = {
      width: 0,
      height: 0,
      color: "",
      font: {
        size: "12",
        bold: false
      }
    };
    
    const component3 = {
      width: 0,
      height: 0,
      color: "",
      font: {
        size: "",
        bold: ""
      }
    };
    
    componentStyler(styler(style4))(".label.button.red")(component3);
    
    expect(component3).to.eql({
      width: 300,
      height: 400,
      color: "red2",
      font: {
        size: "",
        bold: ""
      }
    });
    
    const styling = styler(style3);
    styling(".button.red")(function(className, key, value) {
      component[key] = value;
    });
    
    expect(component).to.eql({
      width: 100,
      height: 200,
      color: "red"
    });
    
    component = {};
    
    styling(".button    .text-16.blue.bold")(function(className, key, value){
      if(typeof component[key] === "object"){
        component[key] = Object.assign({}, component[key], value);
      } else {
        component[key] = value;
      }
    });
    
    expect(component).to.eql({
      width: 100,
      height: 200,
      color: "blue",
      font: {
        bold: true,
        size: '16'
      }
    });
    
    styling(".button .text-16.blue.bold")(function(className, key, value){
      if(typeof component2[key] === "object"){
        Object.assign(component2[key], value);
      } else {
        component2[key] = value;
      }
    });
    

    expect(component2).to.eql({
      width: 100,
      height: 200,
      color: "blue",
      font: {
        size: "16",
        bold: true
      }
    });
  });
  
  it("should pass element styles to callback", function() {
    const styling = styler(style4);
    const component = {};
    const output = { font: { size: '12dp' }, fillColor: 'black' };
    
    styling(".text-16.blue")(function(className, key, value) {
      component[key] = value;
    });
    
    expect(component).to.eql(output);
  });

  it("should pass element styles to callback2", function() {
    const styling = styler(style4);
    var component = {};
    
    styling(".text-16.blue")(function(className, key, value) {
      component[key] = value;
    });
    
    expect(component).to.eql({
      fillColor: "black",
      font: {
        size: "12dp"
      }
    });
  });
});
