import FirestoreModel from "./FirestoreModel";

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

export default class Activity extends FirestoreModel<ActivityBase>(
  "activities"
) {}
