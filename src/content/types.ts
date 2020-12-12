export type CourseCRUD = {
  courseTitle: string,
  description: string,
  topics: TopicCRUD[]
}

export type TopicCRUD = {
  topicTitle: string,
  description: string,
  chapters: ChapterCRUD[]
}

export type ChapterCRUD = {
  chapterTitle: string,
  lessons: LessonCRUD[]
}

export type LessonCRUD = {
  lessonTitle: string,
  activities: ActivityCRUD[],
  isCompleted?: boolean
}

export type ActivityCRUD =
  ReadActivityCRUD
    | SelectAnAnswerActivityCRUD
    | SelectForEachBlankActivityCRUD
    | SelectMultipleActivityCRUD
    | SwipeCardsActivityCRUD

export type ContentBlock = string

export type ReadActivityCRUD = {
  activityType: 'read',
  blocks: ContentBlock[]
}

export type AnswerFeedback = string | {
  header?: string,
  message: string,
  buttonText?: string
}

export type SelectAnAnswerActivityCRUD = {
  activityType: 'select-an-answer',
  blocks: ContentBlock[],
  answers: SelectMultipleAnswer[]
}

export type SelectForEachBlankActivityCRUD = SelectForEachBlankSimpleActivityCRUD | SelectForEachBlankComplexActivityCRUD

export type SelectForEachBlankSimpleActivityCRUD = {
  activityType: 'select-for-each-blank',
  blocks: ContentBlock[]
}

export type SelectForEachBlankComplexActivityCRUD = SelectForEachBlankSimpleActivityCRUD & {
  choices: {
    [blankKey: string]: SelectMultipleAnswer[]
  }
}

export type SelectForEachBlankChoices = {
  [blankKey: string]: SelectMultipleAnswer[]
}

export type SelectMultipleActivityCRUD = {
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

export type SwipeCardsActivityCRUD = {
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

export function isSelectMultipleActivityCRUD(activity: ActivityCRUD): activity is SelectMultipleActivityCRUD {
  return activity.activityType === 'select-multiple'
}

export function isSelectForEachBlankActivityCRUD(activity: ActivityCRUD): activity is SelectForEachBlankActivityCRUD {
  return activity.activityType === 'select-for-each-blank'
}

export function isComplexSelectForEachBlankActivityCRUD(activity: SelectForEachBlankActivityCRUD): activity is SelectForEachBlankComplexActivityCRUD {
  // @ts-ignore
  return activity.choices
}