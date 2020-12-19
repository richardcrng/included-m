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
  activities: ReturnType<Activity["toObject"]>[];
}

// interface LessonForFirestore extends LessonCreateData {}

export default class Lesson extends FirestoreModel<LessonBase>("lesson") {
  static async createWithActivities({
    activities,
    ...rest
  }: LessonWithActivities) {
    const createdActivities = await Promise.all(
      activities.map((activity) => Activity.create(activity))
    );
    const activityIdsOrdered = createdActivities.map((createdActivities) =>
      createdActivities.getId()
    );
    return this.create({ ...rest, activityIdsOrdered });
  }
}
