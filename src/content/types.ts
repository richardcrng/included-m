export type Course = {
  courseTitle: string,
  description: string,
  topics: Topic[]
}

export type Topic = {
  topicTitle: string,
  description: string,
  chapters: Chapter[]
}

export type Chapter = {
  chapterTitle: string,
  lessons: Lesson[]
}

export type Lesson = {
  lessonTitle: string,
  activities: Activity[],
  isCompleted?: boolean
}

export type Activity =
  ReadActivity
    | SelectAnAnswerActivity
    | SelectForEachBlankActivity
    | SelectMultipleActivity
    | SwipeCardsActivity

export type ContentBlock = string

export type ReadActivity = {
  activityType: 'read',
  blocks: ContentBlock[]
}

export type AnswerFeedback = string | {
  header?: string,
  message: string,
  buttonText?: string
}

export type SelectAnAnswerActivity = {
  activityType: 'select-an-answer',
  blocks: ContentBlock[],
  answers: SelectMultipleAnswer[]
}

export type SelectForEachBlankActivity = SelectForEachBlankSimpleActivity | SelectForEachBlankComplexActivity

export type SelectForEachBlankSimpleActivity = {
  activityType: 'select-for-each-blank',
  blocks: ContentBlock[]
}

export type SelectForEachBlankComplexActivity = SelectForEachBlankSimpleActivity & {
  choices: {
    [blankKey: string]: SelectMultipleAnswer[]
  }
}

export type SelectForEachBlankChoices = {
  [blankKey: string]: SelectMultipleAnswer[]
}

export type SelectMultipleActivity = {
  activityType: 'select-multiple',
  blocks: ContentBlock[],
  answers: SelectMultipleAnswer[]
}

export type SelectMultipleAnswer = {
  text: string
  isCorrect: boolean
  feedback?: AnswerFeedback
  isSelected?: boolean
}

export type SwipeCardsActivity = {
  activityType: 'swipe-cards',
  blocks: ContentBlock[],
  cards: SwipeCard[],
  choices: [string, string]
}

export type SwipeCard = {
  text: string,
  isRight: boolean,
  feedbackCorrect?: AnswerFeedback,
  feedbackNotCorrect?: AnswerFeedback
}

export function isSelectMultipleActivity(activity: Activity): activity is SelectMultipleActivity {
  return activity.activityType === 'select-multiple'
}

export function isSelectForEachBlankActivity(activity: Activity): activity is SelectForEachBlankActivity {
  return activity.activityType === 'select-for-each-blank'
}

export function isComplexSelectForEachBlankActivity(activity: SelectForEachBlankActivity): activity is SelectForEachBlankComplexActivity {
  // @ts-ignore
  return activity.choices
}