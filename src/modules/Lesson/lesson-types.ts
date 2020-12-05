
export type ContentBlock = string | SelectMultipleAnswers

export type SelectMultipleAnswers = {
  type: 'select-multiple-answers',
  answers: { text: string, isCorrect: boolean }[]
}

export function isSelectMultipleAnswers(block: ContentBlock): block is SelectMultipleAnswers {
  return typeof block === 'object'
    && block.type === 'select-multiple-answers'
}