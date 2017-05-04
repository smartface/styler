import mergeStylers from "./mergeStylers";
import styler from "./styler";
import componentStyler from "./componentStyler";

export default class Styla {
  static from(styles) {
    return new Styla(styler(styles));
  }

  constructor(styler) {
    this.styler = styler;
  }

  merge() {
    const args = Array.prototype.slice.call(arguments).concat([this.styler]);
    return new Styla(mergeStylers.call(null, args));
  }
  
  assign(classNames, component){
    return new Styla(componentStyler(this.styler));
  }
}
