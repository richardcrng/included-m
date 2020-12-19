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
 * @template RelatingInstance - The instance which owns the relation
 * @template RelatedInstance - The instance which is being related to
 *
 * @returns a `LazyHasMany` relation
 */
export function findByIds<RelatingInstance, RelatedInstance = unknown>(
  related: Relatable<ClassDefinition<RelatedInstance>>,
  cb: () => string[]
): LazyHasMany<RelatingInstance, RelatedInstance> {
  return async function (this: RelatingInstance) {
    const ids = cb();
    const RelatedClass = retrieve(related) as ModelConstructor<RelatedInstance>;
    const promises = ids.map((id) => RelatedClass.findById(id));
    const results = await Promise.all(promises);
    return results.filter((result: any) => result) as RelatedInstance[];
  };
}
