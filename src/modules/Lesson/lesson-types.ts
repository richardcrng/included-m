export type Activity =
  ReadActivity
    | SelectMultipleActivity
    | SelectForEachBlankSimpleActivity

export type ContentBlock = string

export type ReadActivity = {
  activityType: 'read',
  blocks: ContentBlock[]
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

export function isSelectMultipleActivity(activity: Activity): activity is SelectMultipleActivity {
  return activity.activityType === 'select-multiple'
}

export function isSelectForEachBlankActivity(activity: Activity): activity is SelectForEachBlankSimpleActivity {
  return activity.activityType === 'select-for-each-blank'
}
