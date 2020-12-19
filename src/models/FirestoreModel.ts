import firebase from "firebase/app";
import "firebase/firestore";
import { ModelConstructor } from "./FirestoreModel.types";

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
  // @ts-ignore
  const Model: ModelConstructor<T> = class Model {
    static collectionPath = collectionPath;
    public class = Model;

    constructor(attributes: T) {
      for (let key in attributes) {
        // @ts-ignore
        this[key] = attributes[key];
      }
    }

    static get collection() {
      return this.db
        .collection(this.collectionPath)
        .withConverter(this.converter);
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

    static toFirestore(model: Model | T): T {
      return JSON.parse(JSON.stringify(model)) as T;
    }

    public toObject() {
      return this.class.toFirestore(this);
    }
  };

  return Model;
}

export default FirestoreModel;
