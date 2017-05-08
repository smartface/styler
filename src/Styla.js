import styler from "./styler";

class StylerDriver {
  constructor(styler){
    this.subscribers = [];
  }
  
  subscribe(fn){
    this.subscribers.push(fn);
  }
}
