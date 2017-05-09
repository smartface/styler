import styleDenormalizer from "./utils/styleDenormalizer";
import commander from "./utils/commander";

export default function flatStyles(rawStyles) {
  let res = styleDenormalizer(rawStyles);

  commander(res.styles, res.commands);
  
  return res.styles;
}
