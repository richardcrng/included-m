import { ContentPath, ContentRoute } from "./getContent";

export interface FetchedYaml {
  raw: string;
  didFetch: boolean;
}

export interface ParsedYaml<T extends ContentYaml = ContentYaml>
  extends FetchedYaml {
  parsed: T;
  path: ContentPath;
  route: ContentRoute;
}

interface CourseCommon {
  courseTitle: string;
  description: string;
}

export type ContentYaml = CourseYaml | TopicYaml | ChapterYaml | LessonYaml;

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

interface TopicCommon {
  topicTitle: string;
  description: string;
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

interface ChapterCommon {
  chapterTitle: string;
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

interface LessonCommon {
  lessonTitle: string;
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
