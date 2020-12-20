export type ClassDefinition<T = unknown> = { new (...args: any[]): T };

export interface LazyHasOne<RelatedInstance> {
  (): Promise<RelatedInstance | undefined>;
}

export interface LazyHasOneOrFail<RelatedInstance> {
  (): Promise<RelatedInstance>;
}

export interface LazyHasMany<RelatedInstance> {
  (): Promise<RelatedInstance[]>;
}

export type Relatable<ThisClass extends ClassDefinition = ClassDefinition> =
  | string
  | ThisClass;

const classes: { [className: string]: ClassDefinition } = {};

export const retrieve = <RelatedClass>(related: Relatable): RelatedClass => {
  if (typeof related !== "string") {
    return (related as unknown) as RelatedClass;
  } else if (classes[related]) {
    return (classes[related] as unknown) as RelatedClass;
  } else {
    throw new Error("Could not find class");
  }
};

export const store = (ActiveClass: ClassDefinition, key?: string): void => {
  classes[key || ActiveClass.name] = ActiveClass;
};
