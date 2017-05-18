import styleDenormalizer from "../src/utils/styleDenormalizer";
import merge from "../src/utils/merge";
import commander from "../src/utils/commander";
import {expect} from "chai";

const styleWithNestedShortcuts = {
      ".button": {
        width: 100,
        height: 200,
        ".red": {
          color: "red1",
        }
      },
      ".label": {
        width: 101,
        text: "label",
        ".text-16":{
          font: {
            size: "16"
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
        "@extend": ".label",
        font: {
          size: "16"
        },
        "&-blue":{
          fillColor: "black",
          font: {
            size: "12dp"
          }
        }
      }
    };

describe("Denormalize Styles", function() {
  it("should return flatted style and commmands", function() {
    const res = styleDenormalizer(styleWithNestedShortcuts);
    
    // userProps
    // className = ".button.red .label .text
    
    expect(res.styles).to.be.eql(
    { 
      '.button': { width: 100, height: 200 },
      '.button.red': { width: 100, height: 200, color: 'red1' },
      '.label': {text: "label", width: 101},
      '.label.text-16': { text: "label", width: 101, font: { size: "16" } },
      '.label-button': { height: 400, width: 300 },
      '.label-button-red': { color: 'red' },
      '.label-button-red2': { color: 'red2' },
      '.text-16': { font: {size: "16"} },
      '.text-16-blue': { fillColor: "black", font: {size: "12dp"} } 
    });

    expect(res.commands).to.be.eql({'@extend': [{ className: ".text-16", value: ".label" }]});
  });
  
  it("should be able to be extended from a className", function() {
    const res = styleDenormalizer(styleWithNestedShortcuts);
    commander(res.styles, res.commands);
    
    expect(res.styles).to.be.eql(
    {
      '.button': { width: 100, height: 200 },
      '.button.red': { width: 100, height: 200, color: 'red1' },
      '.label': {text: "label", width: 101},
      '.label.text-16': { text: "label", width: 101, font: { size: "16" } },
      '.label-button': { height: 400, width: 300 },
      '.label-button-red': { color: 'red' },
      '.label-button-red2': { color: 'red2' },
      '.text-16': { text: "label", width: 101, font: {size: "16"} },
      '.text-16-blue': { fillColor: "black", font: {size: "12dp"} }
    });

    expect(res.commands).to.be.eql({'@extend': [{ className: ".text-16", value: ".label" }]});
  });
  
  it("should be able to merge null value as null", function() {
    const res = merge({x: 100, y: 10, z: {a: 1, b: 2}}, {x: null, z:{b: null}});
    
    expect(res).to.be.eql({x: null, y: 10, z:{a: 1, b: null}});
  });

  it("should be able to merge NaN value as NaN", function() {
    const res = merge({x: 100, y: 10, z: {a: 1, b: 2}}, {x: NaN, z:{b: NaN}});
    
    expect(res).to.be.eql({x: NaN, y: 10, z:{a: 1, b: NaN}});
  });
});
