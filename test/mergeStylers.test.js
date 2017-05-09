/**
 * Created by smartface on 10/18/16.
 */

import styler from "../src/styler";
import findClassNames from "../src/utils/findClassNames";
import mergeStylers from "../src/mergeStylers";
import componentStyler from "../src/componentStyler";
import memoizeStyler from "../src/memoizeStyler";
import {expect} from "chai";

// import {findClassNames} from "../src/styler";
// const styler = require("../src/styler").styler;
// const resetStylerCache = require("../src/styler").resetStylerCache;
// const componentStyler = require("../src/styler").componentStyler;

describe("Merge Stylers", function() {
    var style1 = {
      ".button": {
        width: 100,
        height: 200,
        ".red":{
          color: "red",
        },
        font: {
            size: "12dp",
            bold: true
        },
      },
      ".text-16":{
        font: {
          size: "16",
          bold: true
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
  
  it("should merge given style objects", () => {
      const merged = mergeStylers(styler(style1), styler(style2))(".button");
      const res = merged();
      
      expect({width: 100, height: 200, top: '10dp', left: '20dp', font: { size: '20dp', bold: true } }).to.be.eql(res);
  });
  
  it("should be able to use with memoizeStyler", () => {
    const component = {};
    const merged = mergeStylers(styler(style1), styler(style2));
    const mergedRes = merged(".button")();
    
    componentStyler(memoizeStyler(merged))(".button")(component);
    expect({width: 100, height: 200, top: '10dp', left: '20dp', font: { size: '20dp', bold: true } }).to.be.eql(component);
  });
});
