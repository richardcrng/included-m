import { ActiveClass, Schema } from 'fireactive'

const answerSchema = {
  text: Schema.string,
  isCorrect: Schema.boolean,
  feedback: Schema.string({ optional: true }),
}

export interface AnswerRaw {
  text: string,
  isCorrect: boolean,
  feedback?: string
}

export default class Answer extends ActiveClass(answerSchema) {

  toRaw(): AnswerRaw {
    return {
      text: this.text,
      isCorrect: this.isCorrect,
      feedback: this.feedback ? this.feedback : undefined
    }
  }
}