import { LessonCRUD } from "../content/types";
import { ActivityRaw, ActivityRawDeep } from "./Activity.old";
import { numericKeys } from "./utils";

export interface LessonRaw {
  _id: string;
  chapterId?: string;
  lessonTitle: string;
  activityIds: string[];
}

export type LessonRawDeep<R extends boolean = true> = LessonRaw & {
  activities: R extends true
    ? ActivityRawDeep[]
    : R extends false
    ? ActivityRaw[]
    : (ActivityRaw | ActivityRawDeep)[];
};
