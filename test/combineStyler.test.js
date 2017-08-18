/**
 * Created by smartface on 10/18/16.
 */

import styler from "../src/styler";
import findClassNames from "../src/utils/findClassNames";
import combineStyler from "../src/combineStyler";
import componentStyler from "../src/componentStyler";
import memoizeStyler from "../src/memoizeStyler";
import {expect} from "chai";

// import {findClassNames} from "../src/styler";
// const styler = require("../src/styler").styler;
// const resetStylerCache = require("../src/styler").resetStylerCache;
// const componentStyler = require("../src/styler").componentStyler;

describe("Combine Stylers", function() {
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
  
  var style3 = {
    ".button": {
      top: '1000',
    }
  };
  
  it("should combine given stylers", () => {
      const combined = combineStyler(styler(style1), styler(style2))(".button");
      const res = combined();
      
      expect({width: 100, height: 200, top: '10dp', left: '20dp', font: { size: '20dp', bold: true } }).to.be.eql(res);
  });
  
  it("should be able to use with memoizeStyler", () => {
    const combined = combineStyler(styler(style1), styler(style2));
    const mergedRes = combined(".button")();
    const cachableStyler = memoizeStyler(combined);
    const style = cachableStyler(".button")();
    
    // componentStyler()(".button")(component);
    expect({width: 100, height: 200, top: '10dp', left: '20dp', font: { size: '20dp', bold: true } }).to.be.eql(style);
  });

  it("should be able to be combined with another stylers", () => {
    const combined1 = combineStyler(styler(style1), styler(style2));
    const combined2 = combineStyler(combined1, styler(style3));
    const combinedRes = combined2(".button")();

    // componentStyler()(".button")(component);
    expect({width: 100, height: 200, top: '1000', left: '20dp', font: { size: '20dp', bold: true } }).to.be.eql(combinedRes);
  });
});
