import React from "react";
import themeStyler from "./themeStyler";
import styler from "./styler";

export default function connectStyler(Component, style) {
  const theme = themeStyler(styler(style));

  return (props) => {
    const themeStyle = theme(props.theme)(props.themeClassName);

    const p = Object.assign({}, props);
    delete p.themeClassName;
    delete p.theme;

    return <Component themeStyle={themeStyle} {...p} />;
  };
};
