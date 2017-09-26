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
        ".blue":{
          color: "blue",
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
      const combined = combineStyler(styler(style1), styler(style2))(".button .button.red .button.blue");
      const res = combined();
      
      expect(res).to.be.eql({width: 100, height: 200, "color": "blue", "fillColor": "#ff0c0c", top: '10dp', left: '20dp', font: { size: '20dp', bold: true } });
  });
  
  it("should be able to use with memoizeStyler", () => {
    const combinedStyling = combineStyler(styler(style1), styler(style2));
    const mergedRes = combinedStyling(".button")();
    const cachableStyling = memoizeStyler(combinedStyling);
    const style = cachableStyling(".button")();
    
    expect(mergedRes).to.be.eql({width: 100, height: 200, top: '10dp', left: '20dp', font: { size: '20dp', bold: true } });
    expect(style).to.be.eql(mergedRes);
  });

  it("should be able to be combined with another stylers", () => {
    const combined1 = combineStyler(styler(style1), styler(style2));
    const combined2 = combineStyler(combined1, styler(style3));
    const combinedRes = combined2(".button")();

    expect(combinedRes).to.be.eql({width: 100, height: 200, top: '1000', left: '20dp', font: { size: '20dp', bold: true } });
  });
});
