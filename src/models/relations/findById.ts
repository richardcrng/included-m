import { get } from "lodash";
import { ModelConstructor } from "../FirestoreModel";
import { Relatable, retrieve } from "./relations";
import { ClassDefinition, LazyHasOne } from "./relations.types";

/**
 * Create a `LazyHasOne` relation between a relating `ModelConstructor`
 *  and some related `ModelConstructor`. The relation is made through
 *  a property on the relating `ModelConstructor`, which is retrieved
 *  through `prop` such that the value is used as an `_id` to find
 *  a member of the related `ModelConstructor`
 *
 * @param related The related `ModelConstructor` or its name
 * @param prop The prop field
 * @template RelatingInstance - The instance which owns the relation
 * @template RelatedInstance - The instance which is being related to
 *
 * @returns a `LazyHasOne` relation
 */
export function findById<RelatingInstance, RelatedInstance = unknown>(
  related: Relatable<ClassDefinition<RelatedInstance>>,
  prop: keyof RelatingInstance
): LazyHasOne<RelatingInstance, RelatedInstance>;

/**
 * Create a `LazyHasOne` relation between a relating `ModelConstructor`
 *  and some related `ModelConstructor`. The relation is made through
 *  a property on the relating `ModelConstructor`, which is retrieved
 *  through the return value of executing `cb`, used as an `_id`
 *  to find a member of the related `ModelConstructor`
 *
 * @param related The related `ModelConstructor` or its name
 * @param cb A function that returns a string `_id`
 * @template RelatingInstance - The instance which owns the relation
 * @template RelatedInstance - The instance which is being related to
 *
 * @returns a `LazyHasOne` relation
 */
export function findById<RelatingInstance, RelatedInstance = unknown>(
  related: Relatable<ClassDefinition<RelatedInstance>>,
  cb: () => string | undefined
): LazyHasOne<RelatingInstance, RelatedInstance>;

/**
 * Create a `LazyHasOne` relation between a relating `ModelConstructor`
 *  and some related `ModelConstructor`. The relation is made through
 *  a property on the relating `ModelConstructor`, which is retrieved
 *  through the property `path` array such that the value is used
 *  as an `_id` to find a member of the related `ModelConstructor`
 *
 * @param related The related `ModelConstructor` or its name
 * @param prop The prop field
 * @template RelatingInstance - The instance which owns the relation
 * @template RelatedInstance - The instance which is being related to
 *
 * @returns a `LazyHasOne` relation
 */
export function findById<RelatingInstance, RelatedInstance = unknown>(
  related: Relatable<ClassDefinition<RelatedInstance>>,
  path: string[]
): LazyHasOne<RelatingInstance, RelatedInstance>;

export function findById<RelatingInstance, RelatedInstance = unknown>(
  related: Relatable<ClassDefinition<RelatedInstance>>,
  lookup: keyof RelatingInstance | string[] | Function
): LazyHasOne<RelatingInstance, RelatedInstance> {
  return async function (this: RelatingInstance) {
    const id: string =
      typeof lookup === "function"
        ? lookup()
        : Array.isArray(lookup)
        ? get(this, lookup)
        : get(this, lookup);

    const RelatedClass = retrieve(related) as ModelConstructor<RelatedInstance>;

    const res = await RelatedClass.findById(id);

    return res;
  };
}
