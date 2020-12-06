export type Activity =
  ReadActivity
    | SelectMultipleActivity

export type ReadActivity = {
  activityType: 'read',
  blocks: ContentBlock[]
}

export type SelectMultipleActivity = {
  activityType: 'select-multiple',
  blocks: ContentBlock[]
}

export type ContentBlock = string | SelectMultipleAnswers

export type SelectMultipleAnswers = {
  type: 'select-multiple-answers',
  answers: { text: string, isCorrect: boolean }[]
}

export function isSelectMultipleActivity(activity: Activity): activity is SelectMultipleActivity {
  return activity.activityType === 'select-multiple'
}

export function isSelectMultipleAnswers(block: ContentBlock): block is SelectMultipleAnswers {
  return typeof block === 'object'
    && block.type === 'select-multiple-answers'
}