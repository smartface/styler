import merge from "../src/utils/merge";
import {
  expect
}
from "chai";

const style1 = {
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
    ".text-16": {
      font: {
        size: "16"
      },
    },
    "&-button": {
      width: 300,
      height: 400,
      "&-red": {
        color: "red"
      },
      "&-red2": {
        color: "red2"
      }
    },
  },
};

const style2 = {
  ".button": {
    width: 100,
    height: 400,
    ".red": {
      color: "red1",
    }
  },
  ".label": {
    width: 104,
    text: "label",
    ".text-16": {
      font: {
        size: "16"
      },
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

const basicStyle1 = {
  ".button": {
    width: 100,
    height: 200,
  },
};

const basicStyle2 = {
  ".button": {
    ".red": {
      color: "red1",
    }
  },
};

describe("Merging Styles", function() {
  it("should create deeply copy of style", function() {
    const basicStyle1 = {
      ".button": {
        width: 100,
        height: 200,
        ".red": {
          color: "red1",
        }
      },
    };
    
    let style = merge(basicStyle1);

    expect(style).to.be.eql(basicStyle1);
    expect(style !== basicStyle1).to.be.true;
    expect(style[".button"] === basicStyle1[".button"]).to.be.false;
    expect(style[".button"][".red"] === basicStyle1[".button"][".red"]).to.be.false;
  });

  it("should merge deeply two styles as a new instance", function() {
    let style = merge(basicStyle1, basicStyle2);
    expect(style).to.be.eql({ '.button': { width: 100, height: 200, '.red': { color: 'red1' } } });
    
    style = merge(style1, style2);
    expect(style).to.be.eql({
      ".button": {
        width: 100,
        height: 400,
        ".red": {
          color: "red1",
        }
      },
      ".label": {
        width: 104,
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
    });
  });
  
  it("should merge deeply 3 and more styles as a new instance", function() {
    
  });
});
