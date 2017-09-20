import styler from "./styler";

class Styla {
  constructor(commands){
    this.subscribers = [];
  }
  
  subscribe(fn){
    this.subscribers.push(fn);
  }
}
