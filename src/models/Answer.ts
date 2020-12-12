import { ActiveClass, Schema } from 'fireactive'

const answerSchema = {
  text: Schema.string,
  isCorrect: Schema.boolean,
  feedback: Schema.string({ optional: true }),
}

export default class Answer extends ActiveClass(answerSchema) {

  static async createMany(...docs: Parameters<typeof Answer['create']>[0][]) {
    const promises = docs.map(doc => (
      this.create(doc)
    ))
    return await Promise.all(promises)
  }
}