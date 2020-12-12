import { ActiveClass, Schema, relations } from 'fireactive'
import { ChapterCRUD } from '../content/types'
import Lesson from './Lesson'
import { numericKeys } from './utils'

const lessonSchema = {
  topicId: Schema.string({ optional: true }),
  chapterTitle: Schema.string,
  lessonIdsOrdered: Schema.indexed.string,
}

export default class Chapter extends ActiveClass(lessonSchema) {

  topic = relations.findById('Topic', 'topicId')

  lessons = relations.findByIds<Chapter, Lesson>(Lesson, () => Object.values(this.lessonIdsOrdered))

  static async createFromRaw(data: ChapterCRUD): Promise<Chapter> {
    const lessons = await Lesson.createManyFromRaw(...data.lessons)
    const lessonIdsOrdered = numericKeys(
      lessons.map((activity: Lesson) => activity.getId())
    )
    const chapter = await this.create({
      chapterTitle: data.chapterTitle,
      lessonIdsOrdered
    })
    return chapter
  }

  static async createManyFromRaw(...docs: ChapterCRUD[]): Promise<Chapter[]> {
    return await Promise.all(docs.map(doc => (
      this.createFromRaw(doc)
    )))
  }
}

relations.store(Chapter)