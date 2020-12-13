import { ActiveClass, Schema } from 'fireactive'

const answerSchema = {
  text: Schema.string,
  isCorrect: Schema.boolean,
  feedback: Schema.string({ optional: true }),
}

export interface AnswerRaw {
  _id: string,
  text: string,
  isCorrect: boolean,
  feedback?: string
}

export default class Answer extends ActiveClass(answerSchema) {

  toRaw(): AnswerRaw {
    return {
      _id: this.getId(),
      text: this.text,
      isCorrect: this.isCorrect,
      feedback: this.feedback ? this.feedback : undefined
    }
  }

  async toRawDeep(): Promise<AnswerRaw> {
    return await Promise.resolve(this.toRaw())
  }
}