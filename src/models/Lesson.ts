import Activity from "./Activity";
import FirestoreModel from "./FirestoreModel";
import relations from "./relations";

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

export default class Lesson extends FirestoreModel<LessonBase>("lesson") {
  activities = relations.findByIds(Activity, () => this.activityIdsOrdered);

  static async createWithActivities({
    activities,
    ...rest
  }: LessonWithActivities) {
    const createdActivities = await Promise.all(
      activities.map((activity) => Activity.createAndSave(activity))
    );
    const activityIdsOrdered = createdActivities.map((createdActivities) =>
      createdActivities.getId()
    );
    return this.create({ ...rest, activityIdsOrdered });
  }

  async toObjectDeep(): Promise<
    ReturnType<Lesson["toObject"]> & {
      activities: ReturnType<Activity["toObject"]>[];
    }
  > {
    const activities = await this.activities();
    return {
      ...this.toObject(),
      activities: activities.map((activity) => activity.toObject()),
    };
  }
}
