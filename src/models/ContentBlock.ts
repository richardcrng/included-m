import { ActiveClass, Schema } from 'fireactive'
import { ContentBlockCRUD } from '../content/types'

const contentBlockSchema = {
  markdown: Schema.string
}

export interface ContentBlockRaw {
  _id: string,
  markdown: string
}

export default class ContentBlock extends ActiveClass(contentBlockSchema) {
  static async createFromRaw(data: ContentBlockCRUD): Promise<ContentBlock> {
    if (typeof data === 'string') {
      return await this.create({
        markdown: data
      })
    } else {
      // @ts-ignore
      return await this.create(data)
    }
  }

  static async createManyFromRaw(...docs: ContentBlockCRUD[]): Promise<ContentBlock[]> {
    return await Promise.all(docs.map(doc => (
      this.createFromRaw(doc)
    )))
  }

  toRaw(): ContentBlockRaw {
    return {
      _id: this.getId(),
      markdown: this.markdown
    }
  }

  async toRawDeep(): Promise<ContentBlockRaw> {
    return await Promise.resolve(this.toRaw())
  }
}