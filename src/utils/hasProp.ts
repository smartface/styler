export function hasProp(target: object, prop: string) {
  return Object.prototype.hasOwnProperty.call(target, prop);
}