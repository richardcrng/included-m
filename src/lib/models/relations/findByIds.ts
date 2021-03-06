import { ModelConstructor } from "../FirestoreModel";
import { retrieve, Relatable } from "./relations";
import { LazyHasMany, ClassDefinition } from "./relations.types";

/**
 * Create a `LazyHasMany` relation between a relating `ActiveClass`
 *  and some related `ActiveClass`. The relation is made through
 *  a property on the relating `ActiveClass`, which is retrieved
 *  through the return value of executing `cb`, used as an array
 *  of string `_id`s used to find members of the related `ActiveClass`
 *
 * @param related The related `ActiveClass` or its name
 * @param cb A function that returns a string `_id`
 * @template RelatedInstance - The instance which is being related to
 *
 * @returns a `LazyHasMany` relation
 */
export function findByIds<RelatedInstance = unknown>(
  related: Relatable<ClassDefinition<RelatedInstance>>,
  cb: () => string[]
): LazyHasMany<RelatedInstance> {
  return async function () {
    const ids = cb();
    const RelatedClass = retrieve(related) as ModelConstructor<RelatedInstance>;
    const results = await RelatedClass.findByIds(...ids);
    return results.filter((result: any) => result) as RelatedInstance[];
  };
}
