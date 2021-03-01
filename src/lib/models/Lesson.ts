import Activity from "./Activity";
import FirestoreModel from "./FirestoreModel";
import relations from "./relations";
import { AsyncReturnType } from "type-fest";

export type LessonType =
  | "read"
  | "select-one"
  | "select-for-each-blank"
  | "select-multiple"
  | "swipe-cards";

export interface LessonBase {
  chapterId?: string;
  lessonTitle: string;
  activityIdsOrdered: string[];
}

export interface LessonWithActivities
  extends Omit<LessonBase, "activityIdsOrdered"> {
  activities: ReturnType<Activity["toObject"]>[];
}

export type LessonPOJO = ReturnType<Lesson["toObject"]>;
export type LessonPOJODeep = AsyncReturnType<Lesson["toObjectDeep"]>;

export default class Lesson extends FirestoreModel<LessonBase>("lesson") {
  activities = relations.findByIds(Activity, () => this.activityIdsOrdered);

  static async createWithActivities({
    activities,
    ...rest
  }: LessonWithActivities) {
    const thisId = this.generateId();
    const createdActivities = await Promise.all(
      activities.map((activity) =>
        Activity.createAndSave({
          ...activity,
          lessonId: thisId,
        })
      )
    );
    const activityIdsOrdered = createdActivities.map((createdActivities) =>
      createdActivities.getId()
    );
    const lesson = await this.createAndSave({
      ...rest,
      id: thisId,
      activityIdsOrdered,
    });
    return lesson;
  }

  async toObjectDeep(): Promise<
    Omit<ReturnType<Lesson["toObject"]>, "activityIdsOrdered"> & {
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
