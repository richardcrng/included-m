import FirestoreModel from "./FirestoreModel";
import Lesson from "./Lesson";
import relations from "./relations";

export type ActivityType =
  | "read"
  | "select-an-answer"
  | "select-for-each-blank"
  | "select-multiple"
  | "swipe-cards";

export interface ActivityBase {
  activityType: ActivityType;
  blocks: string[];
  lessonId?: string;
}

// interface ActivityForFirestore extends ActivityCreateData {}

export default class Activity extends FirestoreModel<ActivityBase>(
  "activity"
) {}
