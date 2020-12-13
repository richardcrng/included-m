import { ActiveClass, Schema, relations } from 'fireactive'
import { ActivityCRUDBase, ActivityType } from '../content/types'
import Answer, { AnswerRaw } from './Answer'
import Card, { CardRaw } from './Card'
import Choice, { ChoiceRawDeep } from './Choice'
import ContentBlock, { ContentBlockRaw } from './ContentBlock'
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
  contentBlockIdsOrdered: Schema.indexed.string,
  choiceIdsOrdered: Schema.indexed.string,
  answerIdsOrdered: Schema.indexed.string,
  cardIdsOrdered: Schema.indexed.string
}

export interface ActivityRaw {
  lessonId?: string,
  activityType: ActivityType,
  contentBlockIds: string[],
  choiceIds: string[],
  answerIds: string[],
  cardIds: string[]
}

export interface ActivityRawDeep extends ActivityRaw {
  choices: ChoiceRawDeep[],
  answers: AnswerRaw[],
  cards: CardRaw[],
  contentBlocks: ContentBlockRaw[]
}

export default class Activity extends ActiveClass(activitySchema) {

  // relations
  lesson = relations.findById('Lesson', 'lessonId')
  choices = relations.findByIds<Activity, Choice>(Choice, () => Object.values(this.choiceIdsOrdered))
  answers = relations.findByIds<Activity, Answer>(Answer, () => Object.values(this.answerIdsOrdered))
  cards = relations.findByIds<Activity, Card>(Card, () => Object.values(this.cardIdsOrdered))
  contentBlocks = relations.findByIds<Activity, ContentBlock>(ContentBlock, () => this.contentBlockIds)

  static async createFromRaw(data: ActivityCRUDBase) {

    let choiceIdsOrdered: Record<string, string> = {}
    let cardIdsOrdered: Record<string, string> = {}

    const {
      activityType
    } = data

    const blocks = await ContentBlock.createManyFromRaw(...data.blocks)
    const contentBlockIdsOrdered = numericKeys(
      blocks.map(block => block.getId())
    )

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
      contentBlockIdsOrdered,
      choiceIdsOrdered,
      cardIdsOrdered
    })
  }

  static async createManyFromRaw(...docs: ActivityCRUDBase[]): Promise<Activity[]> {
    return await Promise.all(docs.map(doc => (
      this.createFromRaw(doc)
    )))
  }

  get contentBlockIds(): string[] {
    return Object.values(this.contentBlockIdsOrdered)
  }

  get choiceIds(): string[] {
    return Object.values(this.choiceIdsOrdered)
  }

  get answerIds(): string[] {
    return Object.values(this.answerIdsOrdered)
  }

  get cardIds(): string[] {
    return Object.values(this.cardIdsOrdered)
  }

  toRaw(): ActivityRaw {
    return {
      lessonId: this.lessonId ? this.lessonId : undefined,
      activityType: this.activityType,
      contentBlockIds: this.contentBlockIds,
      cardIds: this.cardIds,
      answerIds: this.answerIds,
      choiceIds: this.choiceIds
    }
  }

  async toRawDeep(): Promise<ActivityRawDeep> {
    const [answers, choices, cards, contentBlocks] = await Promise.all([
      this.answers(),
      this.choices(),
      this.cards(),
      this.contentBlocks()
    ])

    const [rawAnswers, rawChoices, rawCards, rawContentBlocks] = await Promise.all([
      Promise.all(answers.map(answer => answer.toRawDeep())),
      Promise.all(choices.map(choice => choice.toRawDeep())),
      Promise.all(cards.map(card => card.toRawDeep())),
      Promise.all(contentBlocks.map(block => block.toRawDeep()))
    ])

    return {
      ...this.toRaw(),
      answers: rawAnswers,
      choices: rawChoices,
      cards: rawCards,
      contentBlocks: rawContentBlocks
    }
  }
}

relations.store(Activity)