import React from "react";
import themeStyler from "./themeStyler";
import styler from "./styler";

/**
 * Experimental styling HOC for React Components
 * 
 * @param {React.Component}
 * @param {function} styling - Styling Composer
 */
export default function withStyler(Component, styling) {
  return new class StylingWrapper extends React.Component {
    render(){
      const {className, ...p} = this.props;
    
      return <Component {...styler(className)()} {...p} />;
    }
  };
};
