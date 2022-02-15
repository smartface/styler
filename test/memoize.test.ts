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

describe("Memoize Styler", function() {
  it("should merge deeply two styles as a new instance", function() {

  });
});
