import { ActivityCRUDBase, ActivityType } from "../content/types";
import { AnswerRaw } from "./Answer";
import { CardRaw } from "./Card";
import { ChoiceRawDeep } from "./Choice";
import { ContentBlockRaw } from "./ContentBlock";
import { numericKeys } from "./utils";

export interface ActivityRaw {
  _id: string;
  lessonId?: string;
  activityType: ActivityType;
  contentBlockIds: string[];
  choiceIds: string[];
  answerIds: string[];
  cardIds: string[];
}

export interface ActivityRawDeep extends ActivityRaw {
  choices: ChoiceRawDeep[];
  answers: AnswerRaw[];
  cards: CardRaw[];
  contentBlocks: ContentBlockRaw[];
}
