import firebase from "firebase/app";
import "firebase/firestore";
import pluralize from "pluralize";

let app: firebase.app.App;

type ModelDoc<T> = MaybeWithId<T> & {
  constructor: ModelConstructor<T>;

  getId(): string;
  ref(): firebase.firestore.DocumentReference<ModelDoc<T>>;
  save(): Promise<void>;
  toObject(): MaybeWithId<T>;
};

type ModelConstructor<T> = {
  new (docData?: T, implement?: boolean): ModelDoc<T>;

  // properties
  collection: firebase.firestore.CollectionReference<ModelDoc<T>>;
  db: firebase.firestore.Firestore;
  name: string;

  create(docData: T): Promise<ModelDoc<T>>;
  findById(id: string): Promise<ModelDoc<T>>;
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options?: firebase.firestore.SnapshotOptions
  ): ModelDoc<T>;
  toFirestore(model: ModelDoc<T> | MaybeWithId<T>): MaybeWithId<T>;
};

function FirestoreModel<T>(modelName: string) {
  // @ts-ignore
  const Model: ModelConstructor<T> = class Model {
    static collectionPath = pluralize(modelName);

    constructor(docData?: T, implement: boolean = true) {
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

    static get converter() {
      return {
        fromFirestore: this.fromFirestore,
        toFirestore: this.toFirestore,
      };
    }

    static get db() {
      return firebase.firestore(getApp());
    }

    static async create(this: ModelConstructor<T>, docData: T) {
      const doc = new this(docData);
      await doc.save();
    }

    static async findById(id: string): Promise<Model> {
      const snapshot = await this.collection.doc(id).get();
      return snapshot.data()!;
    }

    static fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options?: firebase.firestore.SnapshotOptions
    ): Model {
      const data = snapshot.data(options)!;
      return new Model(data as T);
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

    toObject() {
      return Model.toFirestore(this);
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
