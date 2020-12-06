export type Activity =
  ReadActivity
    | SelectAnAnswerActivity
    | SelectMultipleActivity
    | SelectForEachBlankSimpleActivity
    | SwipeCardsActivity

export type ContentBlock = string

export type ReadActivity = {
  activityType: 'read',
  blocks: ContentBlock[]
}

export type SelectAnAnswerActivity = {
  activityType: 'select-an-answer',
  blocks: ContentBlock[],
  answers: SelectMultipleAnswer[]
}

export type SelectMultipleActivity = {
  activityType: 'select-multiple',
  blocks: ContentBlock[],
  answers: SelectMultipleAnswer[]
}

export type SelectMultipleAnswer = {
  text: string
  isCorrect: boolean
  feedback?: string | {
    header?: string,
    message: string,
    buttonText?: string
  }
  isSelected?: boolean
}

export type SelectForEachBlankSimpleActivity = {
  activityType: 'select-for-each-blank',
  blocks: ContentBlock[]
}

export type SwipeCardsActivity = {
  activityType: 'swipe-cards',
  blocks: ContentBlock[],
  cards: SwipeCard[],
  choices: [string, string]
}

export type SwipeCard = {
  text: string,
  isRight: boolean
}

export function isSelectMultipleActivity(activity: Activity): activity is SelectMultipleActivity {
  return activity.activityType === 'select-multiple'
}

export function isSelectForEachBlankActivity(activity: Activity): activity is SelectForEachBlankSimpleActivity {
  return activity.activityType === 'select-for-each-blank'
}
