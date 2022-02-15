/**
 * Created by smartface on 10/18/16.
 */

import flatStyler from "../src/flatStyler";
import styler from "../src/styler";
import combineStyler from "../src/combineStyler";
import merge from "../src/utils/merge";
import { expect } from "chai";

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
        color: "red2",
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

  beforeEach(function() {});

  it("should build a new flatted style-bundle from specified stylers", function() {
    const styler1 = styler(style1);
    const styler2 = styler(style2);
    const styler3 = styler(style3);
    const flat = flatStyler(styler1, styler2, styler3);

    expect(flat(".button .text-16.blue.italic")()).to.be.eql({
      width: 100,
      height: 200,
      top: '12dp',
      left: '20dp',
      color: "blue",
      font: {
        bold: true,
        size: "16"
      }
    })
  });

  it("should be able to flat combinedStyler", function() {
    const styler1 = styler(style1);
    const styler2 = styler(style2);
    const styler3 = styler(style3);
    const combined = combineStyler(styler1, styler2, styler3);

    const flat = flatStyler(combined);

    expect(flat(".button .text-16.blue.italic")()).to.be.eql({
      width: 100,
      height: 200,
      top: '12dp',
      left: '20dp',
      color: "blue",
      font: {
        bold: true,
        size: "16"
      }
    })

    expect(flat()()).to.be.eql({
      '.button': {
        top: '12dp',
        left: '20dp',
        font: { size: '40dp' },
        width: 100,
        height: 200
      },
      '.button.red': {
        top: '12dp',
        left: '20dp',
        font: { size: '40dp' },
        fillColor: '#ff0c0c',
        width: 100,
        height: 200,
        color: 'red2'
      },
      '.text-16': { font: { size: '16' } },
      '.text-16.blue': { font: { size: '16' }, color: 'blue' },
      '.text-16.blue.bold': { font: { size: '16', bold: true }, color: 'blue' },
      '.text-16.blue.italic': { font: { size: '16', bold: true }, color: 'blue' }
    })
  });
});
