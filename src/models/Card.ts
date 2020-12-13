import { ActiveClass, Schema } from 'fireactive'

const cardSchema = {
  text: Schema.string,
  isRight: Schema.boolean,
  choiceRight: Schema.string,
  choiceLeft: Schema.string,
  feedbackOnCorrect: Schema.string({ optional: true }),
  feedbackOnNotCorrect: Schema.string({ optional: true })
}

export interface CardRaw {
  _id: string,
  text: string,
  isRight: boolean,
  choiceRight: string,
  choiceLeft: string,
  feedbackOnCorrect?: string,
  feedbackOnNotCorrect?: string
}

export default class Card extends ActiveClass(cardSchema) {

  toRaw(): CardRaw {
    return {
      _id: this.getId(),
      text: this.text,
      isRight: this.isRight,
      choiceRight: this.choiceRight,
      choiceLeft: this.choiceLeft,
      feedbackOnCorrect: this.feedbackOnCorrect ? this.feedbackOnCorrect : undefined,
      feedbackOnNotCorrect: this.feedbackOnNotCorrect ? this.feedbackOnNotCorrect : undefined
    }
  }

  async toRawDeep(): Promise<CardRaw> {
    return await Promise.resolve(this.toRaw())
  }
}