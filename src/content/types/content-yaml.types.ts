import {
  ChapterPath,
  ChapterRoute,
  ContentPath,
  ContentRoute,
  CoursePath,
  CourseRoute,
  isPathToChapter,
  isPathToCourse,
  isPathToLesson,
  isPathToTopic,
  LessonPath,
  LessonRoute,
  TopicPath,
  TopicRoute,
} from "./content-path.types";

export interface FetchedYaml extends ContentCommon {
  raw: string;
  didFetch: boolean;
}

export interface ParsedYaml<T extends ContentYaml = ContentYaml>
  extends FetchedYaml {
  parsed: T;
  path: ContentPath;
  route: ContentRoute;
}
export type ContentYaml = CourseYaml | TopicYaml | ChapterYaml | LessonYaml;

export function isCourseYaml(
  contentYaml: ContentYaml
): contentYaml is CourseYaml {
  return isPathToCourse(contentYaml.path);
}

export function isTopicYaml(
  contentYaml: ContentYaml
): contentYaml is TopicYaml {
  return isPathToTopic(contentYaml.path);
}

export function isChapterYaml(
  contentYaml: ContentYaml
): contentYaml is ChapterYaml {
  return isPathToChapter(contentYaml.path);
}

export function isLessonYaml(
  contentYaml: ContentYaml
): contentYaml is LessonYaml {
  return isPathToLesson(contentYaml.path);
}

function isArrayWithContent<T = unknown>(
  maybeArray: T[] | undefined | null
): boolean {
  return Array.isArray(maybeArray) ? maybeArray.length > 0 : false;
}

export function hasChildContent(contentYaml: ContentYaml): boolean {
  let arrToCheck: unknown[] = [];
  if (isCourseYaml(contentYaml)) {
    arrToCheck = contentYaml.topicIdsOrdered;
  } else if (isTopicYaml(contentYaml)) {
    arrToCheck = contentYaml.chapterIdsOrdered;
  } else if (isChapterYaml(contentYaml)) {
    arrToCheck = contentYaml.lessonIdsOrdered;
  } else if (isLessonYaml(contentYaml)) {
    arrToCheck = contentYaml.activities;
  }
  return isArrayWithContent(arrToCheck);
}

export interface ContentCommon {
  id: string;
  path: ContentPath;
  route: ContentRoute;
}

interface CourseCommon extends ContentCommon {
  courseTitle: string;
  description: string;
  path: CoursePath;
  route: CourseRoute;
}

export interface CourseYaml extends CourseCommon {
  topicIdsOrdered: string[];
}

export interface CourseYamlDeep extends CourseYaml {
  topics: TopicYaml[];
}

export interface CourseYamlRecursive extends CourseYaml {
  topics: TopicYamlRecursive[];
}

export interface CourseJSON extends CourseCommon {
  topics: TopicJSON[];
}

interface TopicCommon extends ContentCommon {
  topicTitle: string;
  description: string;
  path: TopicPath;
  route: TopicRoute;
}

export interface TopicYaml extends TopicCommon {
  chapterIdsOrdered: string[];
}

export interface TopicYamlDeep extends TopicYaml {
  chapters: ChapterYaml[];
}

export interface TopicYamlRecursive extends TopicYaml {
  chapters: ChapterYamlDeep[];
}

export interface TopicJSON extends TopicCommon {
  chapters: ChapterJSON[];
}

interface ChapterCommon extends ContentCommon {
  chapterTitle: string;
  path: ChapterPath;
  route: ChapterRoute;
}

export interface ChapterYaml extends ChapterCommon {
  lessonIdsOrdered: string[];
}

export interface ChapterYamlDeep extends ChapterYaml {
  lessons: LessonYaml[];
}

export interface ChapterJSON extends ChapterCommon {
  lessons: LessonJSON[];
}

interface LessonCommon extends ContentCommon {
  lessonTitle: string;
  path: LessonPath;
  route: LessonRoute;
}

export interface LessonYaml extends LessonCommon {
  activities: ActivityJSON[];
}

export interface LessonJSON extends LessonCommon {
  activities: ActivityJSON[];
}

export type ActivityType =
  | "read"
  | "select-an-answer"
  | "select-for-each-blank"
  | "select-multiple"
  | "swipe-cards";

export interface ActivityJSONCommon {
  activityType: ActivityType;
  blocks: ContentBlockJSON[];
  answers?: AnswerJSON[];
  choices?: {
    [blankKey: string]: AnswerJSON[];
  };
  cards?: CardJSON[];
}

export interface ChoicesJSON {
  [match: string]: AnswerJSON[];
}

export interface CardJSON {
  text: string;
  isRight: boolean;
  choiceRight: string;
  choiceLeft: string;
  feedbackOnCorrect?: string;
  feedbackOnNotCorrect?: string;
}

export type ActivityJSON =
  | ReadActivityJSON
  | SelectAnAnswerActivityJSON
  | SelectForEachBlankActivityJSON
  | SelectMultipleActivityJSON
  | SwipeCardsActivityJSON;

export type ContentBlockJSON =
  | string
  | {
      markdown: string;
    };

export interface ReadActivityJSON extends ActivityJSONCommon {
  activityType: "read";
  blocks: ContentBlockJSON[];
  answers: never;
  choices: never;
  cards: never;
}

export type AnswerFeedback =
  | string
  | {
      header?: string;
      message: string;
      buttonText?: string;
    };

export interface SelectAnAnswerActivityJSON extends ActivityJSONCommon {
  activityType: "select-an-answer";
  blocks: ContentBlockJSON[];
  answers: AnswerJSON[];
  choices: never;
  cards: never;
}

export type SelectForEachBlankActivityJSON =
  | SelectForEachBlankSimpleActivityJSON
  | SelectForEachBlankComplexActivityJSON;

export interface SelectForEachBlankSimpleActivityJSON
  extends ActivityJSONCommon {
  activityType: "select-for-each-blank";
  blocks: ContentBlockJSON[];
  answers: never;
  cards: never;
}

export interface SelectForEachBlankComplexActivityJSON
  extends SelectForEachBlankSimpleActivityJSON {
  choices: {
    [blankKey: string]: AnswerJSON[];
  };
}

export interface SelectMultipleActivityJSON extends ActivityJSONCommon {
  activityType: "select-multiple";
  blocks: ContentBlockJSON[];
  answers: AnswerJSON[];
  cards: never;
  choices: never;
}

export interface AnswerJSON {
  text: string;
  isCorrect: boolean;
  feedback?: string;
  isSelected?: boolean;
}

export interface SwipeCardsActivityJSON extends ActivityJSONCommon {
  activityType: "swipe-cards";
  blocks: ContentBlockJSON[];
  cards: CardJSON[];
}

// export type SwipeCard = {
//   text: string;
//   isRight: boolean;
//   feedbackOnCorrect?: AnswerFeedback;
//   feedbackOnNotCorrect?: AnswerFeedback;
//   choiceLeft: string;
//   choiceRight: string;
// };
