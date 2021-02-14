export function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

export function hasOwnProperties<X extends {}, Y extends PropertyKey>(
  obj: X,
  props: Y[]
): obj is X & Record<Y, unknown> {
  return props.every((prop) => hasOwnProperty(obj, prop));
}
