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
  courseTitle?: string;
  topicTitle?: string;
  chapterTitle?: string;
  lessonTitle?: string;
  description?: string;
  topicIdsOrdered?: string[];
  chapterIdsOrdered?: string[];
  lessonIdsOrdered?: string[];
  activities?: ActivityJSON[];
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
  courseTitle?: never;
  courseIdsOrdered?: never;
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
  courseTitle?: never;
  courseIdsOrdered?: never;
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
  courseTitle?: never;
  courseIdsOrdered?: never;
  topicIdsOrdered?: never;
}

export interface LessonYaml extends LessonCommon {
  activities: ActivityJSON[];
}

export interface LessonJSON extends LessonCommon {
  activities: ActivityJSON[];
}

export enum ActivityType {
  READ = "read",
  SELECT_AN_ANSWER = "select-one",
  SELECT_FOR_EACH_BLANK = "select-for-each-blank",
  SELECT_MULTIPLE = "select-multiple",
  SEQUENCE = "sequence",
  SWIPE_CARDS = "swipe-cards",
}

// export type ActivityType =
//   | "read"
//   | "select-one"
//   | "select-for-each-blank"
//   | "select-multiple"
//   | "swipe-cards";

export interface ActivityJSONCommon {
  activityType: ActivityType;
  blocks: ContentBlockJSON[];
  answers?: AnswerJSON[];
  choices?: {
    [blankKey: string]: AnswerJSON[];
  };
  cards?: CardJSON[];
  sequence?: SequenceItemJSON[];
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
  | SelectOneActivityJSON
  | SelectForEachBlankActivityJSON
  | SelectMultipleActivityJSON
  | SequenceActivityJSON
  | SwipeCardsActivityJSON;

export type ContentBlockJSON =
  | string
  | {
      markdown: string;
    };

export interface ReadActivityJSON extends ActivityJSONCommon {
  activityType: ActivityType.READ;
  blocks: ContentBlockJSON[];
  answers?: never;
  choices?: never;
  cards?: never;
  sequence?: never;
}

export type AnswerFeedback =
  | string
  | {
      header?: string;
      message: string;
      buttonText?: string;
    };

export interface SelectOneActivityJSON extends ActivityJSONCommon {
  activityType: ActivityType.SELECT_AN_ANSWER;
  blocks: ContentBlockJSON[];
  answers: AnswerJSON[];
  choices?: never;
  cards?: never;
  sequence?: never;
}

export type SelectForEachBlankActivityJSON =
  | SelectForEachBlankSimpleActivityJSON
  | SelectForEachBlankComplexActivityJSON;

export interface SelectForEachBlankSimpleActivityJSON
  extends ActivityJSONCommon {
  activityType: ActivityType.SELECT_FOR_EACH_BLANK;
  blocks: ContentBlockJSON[];
  answers?: never;
  cards?: never;
  sequence?: never;
}

export interface SelectForEachBlankComplexActivityJSON
  extends SelectForEachBlankSimpleActivityJSON {
  choices: {
    [blankKey: string]: AnswerJSON[];
  };
}

export interface SelectMultipleActivityJSON extends ActivityJSONCommon {
  activityType: ActivityType.SELECT_MULTIPLE;
  blocks: ContentBlockJSON[];
  answers: AnswerJSON[];
  cards?: never;
  choices?: never;
  sequence?: never;
}

export interface SequenceActivityJSON extends ActivityJSONCommon {
  activityType: ActivityType.SEQUENCE;
  blocks: ContentBlockJSON[];
  sequence: SequenceItemJSON[];
  cards?: never;
  choices?: never;
}

export interface AnswerJSON {
  text: string;
  isCorrect: boolean;
  feedback?: string;
  isSelected?: boolean;
}

export interface SwipeCardsActivityJSON extends ActivityJSONCommon {
  activityType: ActivityType.SWIPE_CARDS;
  blocks: ContentBlockJSON[];
  cards: CardJSON[];
}

export interface SequenceItemJSON {
  text: string;
  feedback: {
    whenCorrect: string;
    whenMisordered: string[];
  };
}

// export type SwipeCard = {
//   text: string;
//   isRight: boolean;
//   feedbackOnCorrect?: AnswerFeedback;
//   feedbackOnNotCorrect?: AnswerFeedback;
//   choiceLeft: string;
//   choiceRight: string;
// };
