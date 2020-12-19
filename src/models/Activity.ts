import db from "./db";
import firebase from "firebase";

export const activityConverter = {
  toFirestore(activity: Activity | ActivityPOJO): ActivityPOJO {
    return {
      id: activity.id,
      activityType: activity.activityType,
      blocks: activity.blocks,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options?: firebase.firestore.SnapshotOptions
  ): Activity {
    const data = snapshot.data(options)!;
    return new Activity({ ...data, id: snapshot.id } as ActivityPOJO);
  },
};

export type ActivityType =
  | "read"
  | "select-an-answer"
  | "select-for-each-blank"
  | "select-multiple"
  | "swipe-cards";

export interface ActivityBase {
  activityType: ActivityType;
  blocks: string[];
}

export interface ActivityPOJO extends ActivityBase {
  id?: string;
}

interface ActivityCreateData extends ActivityBase {
  id?: string;
}

// interface ActivityForFirestore extends ActivityCreateData {}

export default class Activity implements ActivityBase {
  public activityType: ActivityType;
  public blocks: string[];
  public id?: string;

  static collectionPath = "activities";

  constructor({ activityType, blocks, id }: ActivityCreateData) {
    this.activityType = activityType;
    this.blocks = blocks;
    this.id = id;
  }

  static get collection() {
    return db.collection(this.collectionPath).withConverter(activityConverter);
  }

  static async findById(id: string): Promise<Activity> {
    const snapshot = await this.collection.doc(id).get();
    return snapshot.data()!;
  }

  public toObject(): ActivityPOJO {
    return activityConverter.toFirestore(this);
  }
}
