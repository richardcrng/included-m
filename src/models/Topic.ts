import { TopicCRUD } from "../content/types";
import { ChapterRaw, ChapterRawDeep } from "./Chapter";
import { numericKeys } from "./utils";

export interface TopicRaw {
  _id: string;
  courseId?: string;
  topicTitle: string;
  description: string;
  chapterIds: string[];
}

export type TopicRawDeep<R extends boolean = true> = TopicRaw & {
  chapters: R extends true
    ? ChapterRawDeep[]
    : R extends false
    ? ChapterRaw[]
    : (ChapterRaw | ChapterRawDeep)[];
};
