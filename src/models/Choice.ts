import { ChoicesCRUD } from "../content/types";
import { AnswerRaw } from "./Answer";

export interface ChoiceRaw {
  _id: string;
  textMatch: string;
  answerIds: string[];
}

export interface ChoiceRawDeep extends ChoiceRaw {
  answers: AnswerRaw[];
}
