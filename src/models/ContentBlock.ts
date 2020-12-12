import { ActiveClass, Schema } from 'fireactive'

const contentBlockSchema = {
  markdown: Schema.string
}

export default class ContentBlock extends ActiveClass(contentBlockSchema) {
}