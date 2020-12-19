import firebase from "firebase/app";

/**
 * An `Model<S>` _instance_ of the `ModelConstructor<S>`.
 * This interface holds the instance methods and properties.
 */
export type Model<T> = {
  [K in keyof T]: T[K];
} & {
  constructor: ModelConstructor<T>;

  id?: string;

  toObject(): T;
};

/**
 * A _class_ to create `Model<S>` instances from the `DocumentSchema`, `S`.
 * This interface holds the static class methods and properties.
 *
 * @template T - a DocumentSchema
 */
export type ModelConstructor<T> = {
  /**
   * Create an instance of the Model -
   *  not yet saved to the database
   */
  new (documentData: T): Model<T>;

  prototype: Model<T>;
  collectionPath: string;

  collection: firebase.firestore.CollectionReference<Model<T>>;

  converter: {
    fromFirestore: ModelConstructor<T>["fromFirestore"];
    toFirestore: ModelConstructor<T>["toFirestore"];
  };

  findById(id: string): Promise<Model<T>>;

  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options?: firebase.firestore.SnapshotOptions
  ): Model<T>;

  toFirestore(model: Model<T> | T): T;
};
