import { ActiveClass, Schema } from 'fireactive'

const answerSchema = {
  text: Schema.string,
  isCorrect: Schema.boolean,
  feedback: Schema.string({ optional: true }),
}

export default class Answer extends ActiveClass(answerSchema) {
}