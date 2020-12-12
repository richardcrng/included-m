import { ActiveClass, Schema } from 'fireactive'
import { ContentBlockCRUD } from '../content/types'

const contentBlockSchema = {
  markdown: Schema.string
}

export default class ContentBlock extends ActiveClass(contentBlockSchema) {
  static async createFromRaw(data: ContentBlockCRUD): Promise<ContentBlock> {
    if (typeof data === 'string') {
      return await this.create({
        markdown: data
      })
    } else {
      return await this.create(data)
    }
  }

  static async createManyFromRaw(...docs: ContentBlockCRUD[]): Promise<ContentBlock[]> {
    return await Promise.all(docs.map(doc => (
      this.createFromRaw(doc)
    )))
  }
}