import styleDenormalizer from "../src/utils/styleDenormalizer";
import merge from "../src/utils/merge";
import commander from "../src/utils/commander";
import {expect} from "chai";
import commands from "../src/commandsManager";

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
  it("should build style shortcuts and commmands", function() {
    const res = styleDenormalizer(styleWithNestedShortcuts);
    // userProps
    // className = ".button.red .label .text
    expect(res[0].styles).to.be.eql(
    {
      '#button': { width: 100, height: 200 },
      '#button.red': { width: 100, height: 200, color: 'red1' },
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

    expect(res[0].commands).to.be.eql({'@extend': [{ className: ".text-16", value: ".label" }]});
  });
  
  it("should be able to be extended from a className", function() {
    const res = styleDenormalizer(styleWithNestedShortcuts);
    commander(res[0].styles, res[0].commands, commands.getCommands());
    
    expect(res[0].styles).to.be.eql(
    {
      '#button': { width: 100, height: 200 },
      '#button.red': { width: 100, height: 200, color: 'red1' },
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

    expect(res[0].commands).to.be.eql({'@extend': [{ className: ".text-16", value: ".label" }]});
  });
  
  it("should be able to merge null value as null", function() {
    const res = styleDenormalizer({".root": {x: null, y: null, z: {a: 1, b: null}}});
    expect(res[0].styles[".root"]).to.be.eql({x: null, y: null, z:{a: 1, b: null}});
  });

  it("should be able to merge NaN value as NaN", function() {
    const res = styleDenormalizer({".root": {x: NaN, y: NaN, z: {a: 1, b: NaN}}});
    expect(res[0].styles[".root"]).to.be.eql({x: NaN, y: NaN, z:{a: 1, b: NaN}});
  });
});
