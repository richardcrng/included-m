import { ActiveClass, Schema, relations } from 'fireactive'
import { TopicCRUD } from '../content/types'
import Chapter from './Chapter'
import { numericKeys } from './utils'

const topicSchema = {
  courseId: Schema.string({ optional: true }),
  topicTitle: Schema.string,
  description: Schema.string,
  chapterIdsOrdered: Schema.indexed.string,
}

export interface TopicRaw {
  courseId?: string,
  topicTitle: string,
  description: string,
  chapterIds: string[]
}

export default class Topic extends ActiveClass(topicSchema) {

  course = relations.findById('Course', 'courseId')

  chapters = relations.findByIds<Topic, Chapter>(Chapter, () => Object.values(this.chapterIdsOrdered))

  static async createFromRaw(data: TopicCRUD): Promise<Topic> {
    const chapters = await Chapter.createManyFromRaw(...data.chapters)
    const chapterIdsOrdered = numericKeys(
      chapters.map((chapter: Chapter) => chapter.getId())
    )
    const chapter = await this.create({
      topicTitle: data.topicTitle,
      description: data.description,
      chapterIdsOrdered
    })
    return chapter
  }

  static async createManyFromRaw(...docs: TopicCRUD[]): Promise<Topic[]> {
    return await Promise.all(docs.map(doc => (
      this.createFromRaw(doc)
    )))
  }

  get chapterIds(): string[] {
    return Object.values(this.chapterIdsOrdered)
  }

  toRaw(): TopicRaw {
    const {
      courseId, topicTitle, description, chapterIds
    } = this

    return {
      courseId: courseId ? courseId : undefined,
      topicTitle,
      description,
      chapterIds
    }
  }
}

relations.store(Topic)