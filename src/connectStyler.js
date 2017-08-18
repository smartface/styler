import React from "react";
import themeStyler from "./themeStyler";
import styler from "./styler";

export default function withStyler(Component, styler) {
  return new class StylerWrapper extends React.Component {
    render(){
      const {className, ...p} = this.props;
    
      return <Component {...styler(className)()} {...p} />;
    }
  };
};
