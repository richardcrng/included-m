import FirestoreModel from "./FirestoreModel";

export type ActivityType =
  | "read"
  | "select-an-answer"
  | "select-for-each-blank"
  | "select-multiple"
  | "swipe-cards";

export interface ActivityBase {
  activityType: ActivityType;
  blocks: string[];
  lessonId?: string;
  answers?: AnswerBase[];
  choices?: ChoicesBase;
  cards?: CardBase[];
}

export interface ChoicesBase {
  [match: string]: AnswerBase[];
}

export interface CardBase {
  text: string;
  isRight: boolean;
  choiceRight: string;
  choiceLeft: string;
  feedbackOnCorrect?: string;
  feedbackOnNotCorrect?: string;
}

export type AnswerBase = {
  text: string;
  isCorrect: boolean;
  feedback?: string;
  isSelected?: boolean;
};

// interface ActivityForFirestore extends ActivityCreateData {}

export default class Activity extends FirestoreModel<ActivityBase>(
  "activity"
) {}
