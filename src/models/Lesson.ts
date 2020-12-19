import Activity from "./Activity";
import FirestoreModel from "./FirestoreModel";

export type LessonType =
  | "read"
  | "select-an-answer"
  | "select-for-each-blank"
  | "select-multiple"
  | "swipe-cards";

export interface LessonBase {
  lessonTitle: string;
  activityIdsOrdered: string[];
}

export interface LessonWithActivities
  extends Omit<LessonBase, "activityIdsOrdered"> {
  activities: ReturnType<Activity["toObject"]>;
}

interface LessonCreateData extends LessonBase {
  id?: string;
}

// interface LessonForFirestore extends LessonCreateData {}

export default class Lesson extends FirestoreModel<LessonBase>("activity") {
  static createWithActivities(data: LessonWithActivities) {}
}
