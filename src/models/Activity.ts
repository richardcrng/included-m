import { ActiveClass, Schema, relations } from 'fireactive'
import { ActivityCRUDBase } from '../content/types'
import Answer from './Answer'
import Card from './Card'
import Choice from './Choice'
import { numericKeys } from './utils';

const activitySchema = {
  lessonId: Schema.string({ optional: true }),
  activityType: Schema.enum([
    'read',
    'select-an-answer',
    'select-for-each-blank',
    'select-multiple',
    'swipe-cards'
  ]),
  blocks: Schema.indexed.string,
  choiceIdsOrdered: Schema.indexed.string,
  answerIdsOrdered: Schema.indexed.string,
  cardIdsOrdered: Schema.indexed.string
}

export default class Activity extends ActiveClass(activitySchema) {

  // relations
  lesson = relations.findById('Lesson', 'lessonId')
  choices = relations.findByIds<Activity, Choice>(Choice, () => Object.values(this.choiceIdsOrdered))
  answers = relations.findByIds<Activity, Answer>(Answer, () => Object.values(this.answerIdsOrdered))
  cards = relations.findByIds<Activity, Card>(Card, () => Object.values(this.cardIdsOrdered))

  static async createFromRaw(data: ActivityCRUDBase) {

    let choiceIdsOrdered: Record<string, string> = {}
    let cardIdsOrdered: Record<string, string> = {}

    const {
      activityType
    } = data

    const blocks = numericKeys(data.blocks)

    if (data.choices) {
      const choices = await Choice.createManyFromRaw(data.choices)
      choiceIdsOrdered = numericKeys(
        choices.map(choice => choice.getId())
      )
    }
    if (data.cards) {
      const cards = await Card.createMany(...data.cards)
      cardIdsOrdered = numericKeys(
        cards.map(card => card.getId())
      )
    }

    return await this.create({
      activityType,
      blocks,
      choiceIdsOrdered,
      cardIdsOrdered
    })
  }

  static async createManyFromRaw(...docs: ActivityCRUDBase[]): Promise<Activity[]> {
    return await Promise.all(docs.map(doc => (
      this.createFromRaw(doc)
    )))
  }
}

relations.store(Activity)