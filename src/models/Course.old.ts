import { CourseCRUD } from "../content/types";
import { TopicRaw, TopicRawDeep } from "./Topic.old";

export interface CourseRaw {
  _id: string;
  courseTitle: string;
  description: string;
  topicIds: string[];
}

export type CourseRawDeep<R extends boolean = true> = CourseRaw & {
  topics: R extends true
    ? TopicRawDeep[]
    : R extends false
    ? TopicRaw[]
    : (TopicRaw | TopicRawDeep)[];
};
