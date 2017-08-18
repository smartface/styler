/**
 * Created by smartface on 10/18/16.
 */

import flatStyler from "../src/flatStyler";
import styler from "../src/styler";
import componentStyler from "../src/componentStyler";
import merge from "../src/utils/merge";
import { expect } from "chai";


// import {findClassNames} from "../src/styler";
// const styler = require("../src/styler").styler;
// const resetStylerCache = require("../src/styler").resetStylerCache;
// const componentStyler = require("../src/styler").componentStyler;

describe("FlatStyler", function() {
  var component = { prop: "-", top: 0, left: 0 };
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
      top: '12dp',
      font: {
        size: "40dp"
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
      ".red": {
        color: "red",
      }
    },
    ".text-16": {
      font: {
        size: "16"
      },
      ".blue": {
        color: "blue",
        ".bold": {
          font: {
            bold: true
          }
        },
        ".italic": {
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
        ".red": {
          color: "red2",
        }
      },
    },
    ".text-16": {
      font: {
        size: "16"
      },
      ".blue": {
        fillColor: "black",
        font: {
          size: "12dp"
        }
      },
      ".red": {
        fillColor: "black",
        font: {
          size: "12dp"
        }
      }
    }
  };


  beforeEach(function() {});

  it("should be build a stylesBundle from the specified styles", function() {
    const styler1 = styler(style3);
    const styler2 = styler(style2);
    const styler3 = styler(style3);
    const flat = flatStyler(styler1, styler2, styler3);
    // console.log(flat(".button .text-16"))
    expect(flat(".button .text-16")()).to.be.eql({
      width: 100,
      height: 200,
      top: '12dp',
      left: '20dp',
      font: {
        size: "40dp"
      }
    })
  });
});
