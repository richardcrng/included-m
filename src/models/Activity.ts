import { ActiveClass, Schema, relations } from 'fireactive'
import { ActivityCRUD } from '../content/types'
import Answer from './Answer'
import Card from './Card'
import Choice from './Choice'

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
  choiceIds: Schema.indexed.boolean,
  answerIds: Schema.indexed.boolean,
  cardIds: Schema.indexed.boolean
}

export default class Activity extends ActiveClass(activitySchema) {

  // relations
  lesson = relations.findById('Lesson', 'lessonId')
  choices = relations.findByIds<Activity, Choice>(Choice, () => Object.keys(this.choiceIds))
  answers = relations.findByIds<Activity, Answer>(Answer, () => Object.keys(this.answerIds))
  cards = relations.findByIds<Activity, Card>(Card, () => Object.keys(this.cardIds))

  // // static
  // static async createFromCRUD(data: ActivityCRUD) {
  //   if (data.)
  // }
}

relations.store(Activity)