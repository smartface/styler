import normalizeStyle from "../src/utils/normalizeStyle";
const styleWithNestedShortcut = {
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
          ".red":{
            color: "red2",
          }
        },
      },
      ".label": {
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
describe("Styler", function() {
  it("should parse and flat source", function() {
    const res = normalizeStyle(styleWithNestedShortcut);
    console.log(res);
  })
});
