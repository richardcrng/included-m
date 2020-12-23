interface CourseCommon {
  courseTitle: string;
  description: string;
}

export interface CourseIndex extends CourseCommon {
  topicIdsOrdered: string[];
}

export interface CourseJSON extends CourseCommon {
  topics: TopicJSON[];
}

interface TopicCommon {
  topicTitle: string;
  description: string;
}

export interface TopicIndex extends TopicCommon {
  chapterIdsOrdered: string[];
}

export interface TopicJSON extends TopicCommon {
  chapters: ChapterJSON[];
}

interface ChapterCommon {
  chapterTitle: string;
}

export interface ChapterIndex extends ChapterCommon {
  lessonIdsOrdered: string[];
}

export interface ChapterJSON extends ChapterCommon {
  lessons: LessonJSON[];
}

interface LessonCommon {
  lessonTitle: string;
}

export interface LessonIndex extends LessonCommon {
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

export type ActivityJSONBase = {
  activityType: ActivityType;
  blocks: ContentBlockJSON[];
  answers?: AnswerJSON[];
  choices?: {
    [blankKey: string]: AnswerJSON[];
  };
  cards?: CardJSON[];
};

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

export type ReadActivityJSON = {
  activityType: "read";
  blocks: ContentBlockJSON[];
};

export type AnswerFeedback =
  | string
  | {
      header?: string;
      message: string;
      buttonText?: string;
    };

export type SelectAnAnswerActivityJSON = {
  activityType: "select-an-answer";
  blocks: ContentBlockJSON[];
  answers: AnswerJSON[];
};

export type SelectForEachBlankActivityJSON =
  | SelectForEachBlankSimpleActivityJSON
  | SelectForEachBlankComplexActivityJSON;

export type SelectForEachBlankSimpleActivityJSON = {
  activityType: "select-for-each-blank";
  blocks: ContentBlockJSON[];
};

export type SelectForEachBlankComplexActivityJSON = SelectForEachBlankSimpleActivityJSON & {
  choices: {
    [blankKey: string]: AnswerJSON[];
  };
};

export type SelectForEachBlankChoices = {
  [blankKey: string]: AnswerJSON[];
};

export type SelectMultipleActivityJSON = {
  activityType: "select-multiple";
  blocks: ContentBlockJSON[];
  answers: AnswerJSON[];
};

export type AnswerJSON = {
  text: string;
  isCorrect: boolean;
  feedback?: string;
  isSelected?: boolean;
};

export type SwipeCardsActivityJSON = ActivityJSONBase & {
  activityType: "swipe-cards";
  blocks: ContentBlockJSON[];
  cards: SwipeCard[];
};

export type SwipeCard = {
  text: string;
  isRight: boolean;
  feedbackOnCorrect?: AnswerFeedback;
  feedbackOnNotCorrect?: AnswerFeedback;
  choiceLeft: string;
  choiceRight: string;
};
