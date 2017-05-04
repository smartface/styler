import cloneStyle from "./cloneStyle";

export function styleAssign(target, key, value) {
  const style = target;

  if (typeof style[key] === "object") {
    style[key] = {...style[key], ...value};
  } else if (typeof value === "object") {
    style[key] = {...value};
  } else {
    style[key] = value;
  }
}

export function styleAssignAndClone(target, key, value) {
  styleAssign(target, key, cloneStyle(value));
}
