import { ActiveClass, Schema, relations } from 'fireactive'
import { ChoicesCRUD } from '../content/types'
import Answer from './Answer'
import { indexVals, numericKeys } from './utils';

const choiceSchema = {
  textMatch: Schema.string,
  answerIdsOrdered: Schema.indexed.string
}

export default class Choice extends ActiveClass(choiceSchema) {

  answers = relations.findByIds<Choice, Answer>(Answer, () => Object.values(this.answerIdsOrdered))

  static async createFromRaw(data: ChoicesCRUD) {
    const entries = Object.entries(data)
    let res: Choice[] = []
    for (let [textMatch, answersData] of entries) {
      const answers = await Answer.createMany(...answersData)
      const answerIds = answers.map(answer => answer.getId())
      const choice = await this.create({ textMatch, answerIdsOrdered: numericKeys(answerIds) })
      res.push(choice)
    }
    return res
  }
}