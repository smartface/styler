import findClassNames from "../src/utils/findClassNames";
import {expect} from "chai";

describe("Classname Parser", function() {
  it("should parse classNames from a specified string", function() {
    expect(findClassNames(".button.red .layout.left")).to.eql([['.button', '.red' ], [ '.layout', '.left' ]]);
    expect(findClassNames(".button .red   .layout.left")).to.eql([['.button'], ['.red' ], [ '.layout', '.left' ]]);
    expect(findClassNames(".button .red .label.button.red   .layout.left")).to.eql([['.button'], ['.red' ], [ '.label', '.button', '.red'], [ '.layout', '.left' ]]);
  });
});
