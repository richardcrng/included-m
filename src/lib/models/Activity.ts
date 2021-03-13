import FirestoreModel from "./FirestoreModel";

export type ActivityType =
  | "read"
  | "select-one"
  | "select-for-each-blank"
  | "select-multiple"
  | "swipe-cards";

export interface ActivityBase {
  activityType: ActivityType;
  blocks: (string | BlockBase)[];
  lessonId?: string;
  answers?: AnswerBase[];
  choices?: ChoicesBase;
  cards?: CardBase[];
}

export interface BlockBase {
  markdown: string;
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

export type ActivityPOJO = ReturnType<Activity["toObject"]>;

// interface ActivityForFirestore extends ActivityCreateData {}

export default class Activity extends FirestoreModel<ActivityBase>("activity") {
  constructor({ blocks, ...rest }: ActivityBase) {
    super({ blocks: standardiseBlocks(blocks), ...rest });
  }

  toObject() {
    const obj = super.toObject();
    return {
      ...obj,
      blocks: standardiseBlocks(obj.blocks),
    };
  }
}

function standardiseBlocks(blocks: (string | BlockBase)[]): BlockBase[] {
  return blocks.map((block) => {
    if (typeof block === "string") {
      return {
        markdown: block,
      };
    } else {
      return block;
    }
  });
}
