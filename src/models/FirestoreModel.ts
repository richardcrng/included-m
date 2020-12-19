import firebase from "firebase/app";
import { ModelConstructor } from "./FirestoreModel.types";
import db from "./db";

function FirestoreModel<T extends {}>(collectionPath: string) {
  // @ts-ignore
  const Model: ModelConstructor<T> = class Model {
    static collectionPath = collectionPath;

    constructor(attributes: T) {
      for (let key in attributes) {
        // @ts-ignore
        this[key] = attributes[key];
      }
    }

    static get collection() {
      return db.collection(this.collectionPath).withConverter(this.converter);
    }

    static get converter() {
      return {
        fromFirestore: this.fromFirestore,
        toFirestore: this.toFirestore,
      };
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
      return {} as T;
    }

    public toObject() {
      return Model.toFirestore(this);
    }
  };

  return Model;
}

export default FirestoreModel;
