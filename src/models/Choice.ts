import { ActiveClass, Schema, relations } from 'fireactive'
import { SelectForEachBlankChoices } from '../content/types'
import Answer from './Answer'
import { indexVals } from './utils';

const choiceSchema = {
  textMatch: Schema.string,
  answerIds: Schema.indexed.boolean
}

export default class Choice extends ActiveClass(choiceSchema) {

  answers = relations.findByIds<Choice, Answer>(Answer, () => Object.keys(this.answerIds))

  static async createFromChoicesCRUD(data: SelectForEachBlankChoices) {
    const entries = Object.entries(data)
    let res: Choice[] = []
    for (let [textMatch, answersData] of entries) {
      const answers = await Answer.createMany(...answersData)
      const answerIds = answers.map(answer => answer.getId())
      const choice = await this.create({ textMatch, answerIds: indexVals(answerIds) })
      res.push(choice)
    }
    return res
  }
}