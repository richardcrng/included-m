export interface CourseCRUD {
  courseTitle: string,
  description: string,
  topics: TopicCRUD[]
}

export interface TopicCRUD {
  topicTitle: string,
  description: string,
  chapters: ChapterCRUD[]
}

export interface ChapterCRUD {
  chapterTitle: string,
  lessons: LessonCRUD[]
}

export interface LessonCRUD {
  lessonTitle: string,
  activities: ActivityCRUD[],
  isCompleted?: boolean
}

type ActivityType = 'read' | 'select-an-answer' | 'select-for-each-blank' | 'select-multiple' | 'swipe-cards'

export type ActivityCRUDBase = {
  activityType: ActivityType,
  blocks: string[],
  answers?: AnswerCRUD[],
  choices?: {
    [blankKey: string]: AnswerCRUD[]
  }
  cards?: CardCRUD[]
}

export interface ChoicesCRUD {
  [match: string]: AnswerCRUD[]
}

export interface CardCRUD {
  text: string,
  isRight: boolean,
  choiceRight: string,
  choiceLeft: string,
  feedbackOnCorrect?: string,
  feedbackOnNotCorrect?: string
}

export type ActivityCRUD =
  ReadActivityCRUD
    | SelectAnAnswerActivityCRUD
    | SelectForEachBlankActivityCRUD
    | SelectMultipleActivityCRUD
    | SwipeCardsActivityCRUD

export type ContentBlockCRUD = string

export type ReadActivityCRUD = {
  activityType: 'read',
  blocks: ContentBlockCRUD[]
}

export type AnswerFeedback = string | {
  header?: string,
  message: string,
  buttonText?: string
}

export type SelectAnAnswerActivityCRUD = {
  activityType: 'select-an-answer',
  blocks: ContentBlockCRUD[],
  answers: AnswerCRUD[]
}

export type SelectForEachBlankActivityCRUD = SelectForEachBlankSimpleActivityCRUD | SelectForEachBlankComplexActivityCRUD

export type SelectForEachBlankSimpleActivityCRUD = {
  activityType: 'select-for-each-blank',
  blocks: ContentBlockCRUD[]
}

export type SelectForEachBlankComplexActivityCRUD = SelectForEachBlankSimpleActivityCRUD & {
  choices: {
    [blankKey: string]: AnswerCRUD[]
  }
}

export type SelectForEachBlankChoices = {
  [blankKey: string]: AnswerCRUD[]
}

export type SelectMultipleActivityCRUD = {
  activityType: 'select-multiple',
  blocks: ContentBlockCRUD[],
  answers: AnswerCRUD[]
}

export type AnswerCRUD = {
  text: string
  isCorrect: boolean
  feedback?: string
  isSelected?: boolean
}

export type SwipeCardsActivityCRUD = ActivityCRUDBase & {
  activityType: 'swipe-cards',
  blocks: ContentBlockCRUD[],
  cards: SwipeCard[],
}

export type SwipeCard = {
  text: string,
  isRight: boolean,
  feedbackCorrect?: AnswerFeedback,
  feedbackNotCorrect?: AnswerFeedback,
  choiceLeft: string,
  choiceRight: string
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