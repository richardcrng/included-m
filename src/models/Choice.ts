import { ActiveClass, Schema, relations } from 'fireactive'
import Answer from './Answer'

const choiceSchema = {
  answerIds: Schema.indexed.boolean
}

export default class Choice extends ActiveClass(choiceSchema) {

  answers = relations.findByIds<Choice, Answer>(Answer, () => Object.keys(this.answerIds))
}