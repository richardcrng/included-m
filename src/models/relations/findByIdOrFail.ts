import WhyWhatError from "../../lib/why-what-error";
import { ModelConstructor } from "../FirestoreModel";
import { Relatable, retrieve } from "./relations";
import { ClassDefinition, LazyHasOneOrFail } from "./relations.types";

/**
 * Create a `LazyHasOneOrFail` relation between a relating `ActiveClass`
 *  and some related `ActiveClass`. The relation is made through
 *  a property on the relating `ActiveClass`, which is retrieved
 *  through the return value of executing `cb`, used as an `_id`
 *  to find a member of the related `ActiveClass`
 *
 * @param related The related `ActiveClass` or its name
 * @param cb A function that returns a string `_id`
 * @template RelatedInstance - The instance which is being related to
 *
 * @returns a `LazyHasOneOrFail` relation
 */
export function findByIdOrFail<RelatedInstance = unknown>(
  related: Relatable<ClassDefinition<RelatedInstance>>,
  cb: () => string | undefined
): LazyHasOneOrFail<RelatedInstance> {
  return async function () {
    const id = cb();

    if (id) {
      const RelatedClass = retrieve(
        related
      ) as ModelConstructor<RelatedInstance>;

      const res = await RelatedClass.findByIdOrFail(id);

      return res;
    } else {
      throw new WhyWhatError({
        what: `Could not find related ${related}`,
        why: "There is no provided id to search by",
      });
    }
  };
}
