import firebase from "firebase/app";
import "firebase/firestore";
import pluralize from "pluralize";
import { Class } from "utility-types";
import WhyWhatError from "../../why-what-error";

let app: firebase.app.App;

function fromFirestore<T, M extends ModelConstructor<T> = ModelConstructor<T>>(
  this: M,
  snapshot: firebase.firestore.QueryDocumentSnapshot,
  options?: firebase.firestore.SnapshotOptions
): ModelDoc<T> {
  const data = snapshot.data(options)!;
  return this.create(data as T);
}

function toFirestore<M, T>(model: M | MaybeWithId<T>): MaybeWithId<T> {
  return JSON.parse(JSON.stringify(model)) as MaybeWithId<T>;
}

export type ModelDoc<T> = MaybeWithId<T> & {
  constructor: ModelConstructor<T>;

  getId(): string;
  ref(): firebase.firestore.DocumentReference<ModelDoc<T>>;
  save(): Promise<void>;
  toObject(): MaybeWithId<T>;
};

export type ModelConstructor<T = {}> = {
  new (docData?: MaybeWithId<T>, implement?: boolean): ModelDoc<T>;

  // properties
  collection: firebase.firestore.CollectionReference<ModelDoc<T>>;
  converter: firebase.firestore.FirestoreDataConverter<ModelDoc<T>>;
  db: firebase.firestore.Firestore;
  name: string;

  create<C extends Class<any> = ModelConstructor<T>, D = InstanceType<C>>(
    this: C,
    docData: MaybeWithId<T>
  ): D;

  createAndSave<
    C extends Class<any> = ModelConstructor<T>,
    D = InstanceType<C>
  >(
    this: C,
    docData: MaybeWithId<T>
  ): Promise<D>;

  findById<C extends Class<any> = ModelConstructor<T>, D = InstanceType<C>>(
    this: C,
    id: string
  ): Promise<D | undefined>;

  findByIds<C extends Class<any> = ModelConstructor<T>, D = InstanceType<C>>(
    this: C,
    ...ids: string[]
  ): Promise<D[]>;

  findByIdOrFail<
    C extends Class<any> = ModelConstructor<T>,
    D = InstanceType<C>
  >(
    this: C,
    id: string
  ): Promise<D>;

  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options?: firebase.firestore.SnapshotOptions
  ): ModelDoc<T>;

  generateId(): string;

  toFirestore(model: ModelDoc<T> | MaybeWithId<T>): MaybeWithId<T>;
};

function FirestoreModel<T>(modelName: string) {
  // @ts-ignore
  const Model: ModelConstructor<T> = class Model {
    static collectionPath = pluralize(modelName);

    constructor(docData?: MaybeWithId<T>, implement: boolean = true) {
      if (docData && implement) {
        for (let key in docData) {
          // @ts-ignore
          this[key] = docData[key];
        }
      }
    }

    static get collection() {
      return this.db
        .collection(this.collectionPath)
        .withConverter(
          this.converter as firebase.firestore.FirestoreDataConverter<Model>
        );
    }

    static get converter(): firebase.firestore.FirestoreDataConverter<
      ModelDoc<T>
    > {
      return {
        // @ts-ignore
        fromFirestore: fromFirestore.bind(this),
        toFirestore: toFirestore,
      };
    }

    static get db() {
      return firebase.firestore(getApp());
    }

    static create(this: ModelConstructor<T>, docData: MaybeWithId<T>) {
      return new this(docData);
    }

    static async createAndSave(
      this: ModelConstructor<T>,
      docData: MaybeWithId<T>
    ) {
      const doc = new this(docData);
      await doc.save();
      return doc;
    }

    static async findById(id: string): Promise<Model | undefined> {
      const snapshot = await this.collection.doc(id).get();
      return snapshot.data();
    }

    static async findByIds(...ids: string[]): Promise<Model[]> {
      const foundDocs = await Promise.all(ids.map((id) => this.findById(id)));
      return foundDocs.filter((doc) => !!doc) as Model[];
    }

    static async findByIdOrFail(id: string): Promise<Model> {
      const model = await this.findById(id);
      if (!model)
        throw new WhyWhatError({
          what: `Failed to find ${modelName}`,
          why: `No document with id ${id} exists in the collection ${this.collectionPath}`,
        });
      return model;
    }

    static fromFirestore(
      this: ModelConstructor<T>,
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options?: firebase.firestore.SnapshotOptions
    ): Model {
      const data = snapshot.data(options)!;
      return this.create(data as T);
    }

    static generateId(): string {
      return this.collection.doc().id;
    }

    static toFirestore(model: Model | MaybeWithId<T>): MaybeWithId<T> {
      return JSON.parse(JSON.stringify(model)) as MaybeWithId<T>;
    }

    getId(this: ModelDoc<T>) {
      return this.ref().id;
    }

    ref(this: ModelDoc<T>) {
      const ref = this.constructor.collection.doc(this.id);
      this.id = ref.id;
      return ref;
    }

    async save(this: ModelDoc<T>): Promise<void> {
      this.getId();
      this.ref().set(this);
    }

    toObject(this: ModelDoc<T>) {
      return this.constructor.toFirestore(this);
    }
  };

  Object.defineProperty(Model, "name", { value: modelName });

  return Model;
}

export type MaybeWithId<T> = T & { id?: string };
export type WithId<T> = T & { id: string };

function getApp(): firebase.app.App {
  if (!firebase.apps.length) {
    // Initialize Cloud Firestore through Firebase
    app = firebase.initializeApp({
      apiKey: "AIzaSyBPAfs2hzOGiIBmDm_iZG4hQsZfNdZaRz0",
      authDomain: "included-m.firebaseapp.com",
      projectId: "included-m",
    });
  }

  return app;
}

export default FirestoreModel;
