import { ChoicesCRUD } from "../content/types";
import { AnswerRaw } from "./Answer";
import { numericKeys } from "./utils";

export interface ChoiceRaw {
  _id: string;
  textMatch: string;
  answerIds: string[];
}

export interface ChoiceRawDeep extends ChoiceRaw {
  answers: AnswerRaw[];
}
