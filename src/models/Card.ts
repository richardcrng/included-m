import { ActiveClass, Schema } from 'fireactive'

const cardSchema = {
  text: Schema.string,
  isRight: Schema.boolean,
  choiceRight: Schema.string,
  choiceLeft: Schema.string,
  feedbackOnCorrect: Schema.string({ optional: true }),
  feedbackOnNotCorrect: Schema.string({ optional: true })
}

export default class Card extends ActiveClass(cardSchema) {}