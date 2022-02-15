import { hasProp } from "./hasProp";

export function isObj(val: any) {
  return val !== null && val instanceof Object && !hasProp(val, "map");
}
