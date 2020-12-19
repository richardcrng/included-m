import firebase from "firebase/app";
import "firebase/firestore";

let app: firebase.app.App;

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

if (!firebase.apps.length) {
  // Initialize Cloud Firestore through Firebase
  app = firebase.initializeApp({
    apiKey: "AIzaSyBPAfs2hzOGiIBmDm_iZG4hQsZfNdZaRz0",
    authDomain: "included-m.firebaseapp.com",
    projectId: "included-m",
  });
}

function FirestoreModel<T extends {}>(collectionPath: string) {
  const Model = class Model {
    static collectionPath = collectionPath;

    constructor(attributes: T) {
      for (let key in attributes) {
        // @ts-ignore
        this[key] = attributes[key];
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

    static async findById(id: string): Promise<Model> {
      const snapshot = await this.collection.doc(id).get();
      return snapshot.data()!;
    }

    static fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options?: firebase.firestore.SnapshotOptions
    ): Model {
      const data = snapshot.data(options)!;
      return new Model(({ ...data, id: snapshot.id } as unknown) as T);
    }

    static toFirestore(model: Model | MaybeWithId<T>): MaybeWithId<T> {
      return JSON.parse(JSON.stringify(model)) as MaybeWithId<T>;
    }

    toObject() {
      return Model.toFirestore(this);
    }
  };

  return Model;
}

export type MaybeWithId<T> = T & { _id?: string };
export type WithId<T> = T & { id: string };

export default FirestoreModel;
