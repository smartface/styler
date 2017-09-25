import builder from '../src/buildStyles';
import {expect} from "chai";

const styleWithNestedShortcuts = {
      "#button": {
        width: 100,
        height: 200,
        ".red": {
          color: "red1",
        }
      },
      ".button": {
        width: 100,
        height: 200,
        ".red": {
          color: "red1",
        }
      },
      ".label": {
        width: 101,
        font: {
          bold: true,
          size: "8"
        },
        text: "label",
        ".text-16":{
          font: {
            size: "16",
            bold: false
          },
        },
        "&-button": {
          width: 300,
          height: 400,
          "&-red":{
            color: "red"
          },
          "&-red2":{
            color: "red2"
          }
        },
      },
      ".text-16":{
        "@extend": ".label,.label.text-16",
        font: {
          size: "32"
        },
        "&-blue":{
          fillColor: "black",
          font: {
            size: "12dp"
          }
        }
      }
    };

describe("Build Styles", function() {
  it("should merge and flat given styles", function() {
    const res = builder(styleWithNestedShortcuts);
    // userProps
    // className = ".button.red .label .text
    expect(res).to.be.eql(
    {
      '#button': { width: 100, height: 200 },
      '#button.red': { width: 100, height: 200, color: 'red1' },
      '.button': { width: 100, height: 200 },
      '.button.red': { width: 100, height: 200, color: 'red1' },
      '.label': {text: "label", font: {"bold": true, size: "8"}, width: 101},
      '.label.text-16': { text: "label", width: 101, font: { size: "16", "bold": false} },
      '.label-button': { height: 400, width: 300 },
      '.label-button-red': { color: 'red' },
      '.label-button-red2': { color: 'red2' },
      '.text-16': { font: {size: "32", "bold": false}, width: 101, text: "label" },
      '.text-16-blue': { fillColor: "black", font: {size: "12dp"} }
    });
  });
});
