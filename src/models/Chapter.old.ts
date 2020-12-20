import { ChapterCRUD } from "../content/types";
import { LessonRaw, LessonRawDeep } from "./Lesson.old";

export interface ChapterRaw {
  _id: string;
  topicId?: string;
  chapterTitle: string;
  lessonIds: string[];
}

export type ChapterRawDeep<R extends boolean = true> = ChapterRaw & {
  lessons: R extends true
    ? LessonRawDeep[]
    : R extends false
    ? LessonRaw[]
    : (LessonRaw | LessonRawDeep)[];
};
