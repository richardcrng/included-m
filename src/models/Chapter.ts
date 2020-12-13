import { ActiveClass, Schema, relations } from 'fireactive'
import { ChapterCRUD } from '../content/types'
import Lesson, { LessonRaw, LessonRawDeep } from './Lesson'
import { numericKeys } from './utils'

const lessonSchema = {
  topicId: Schema.string({ optional: true }),
  chapterTitle: Schema.string,
  lessonIdsOrdered: Schema.indexed.string,
}

export interface ChapterRaw {
  _id: string,
  topicId?: string,
  chapterTitle: string,
  lessonIds: string[]
}

export type ChapterRawDeep<R extends boolean = true> = ChapterRaw & {
  lessons: R extends true
    ? LessonRawDeep[]
    : R extends false
      ? LessonRaw[]
      : (LessonRaw | LessonRawDeep)[]
}

export default class Chapter extends ActiveClass(lessonSchema) {

  topic = relations.findById('Topic', 'topicId')

  lessons = relations.findByIds<Chapter, Lesson>(Lesson, () => Object.values(this.lessonIdsOrdered))

  static async createFromRaw(data: ChapterCRUD): Promise<Chapter> {
    const lessons = await Lesson.createManyFromRaw(...data.lessons)
    const lessonIdsOrdered = numericKeys(
      lessons.map((lesson: Lesson) => lesson.getId())
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

  get lessonIds(): string[] {
    return Object.values(this.lessonIdsOrdered)
  }

  toRaw(): ChapterRaw {
    return {
      _id: this.getId(),
      topicId: this.topicId? this.topicId : undefined,
      chapterTitle: this.chapterTitle,
      lessonIds: this.lessonIds
    }
  }

  async toRawDeep(recursive: true): Promise<ChapterRawDeep<true>>
  async toRawDeep(): Promise<ChapterRawDeep<true>>
  async toRawDeep(recursive: false): Promise<ChapterRawDeep<false>>

  async toRawDeep(recursive = true): Promise<ChapterRawDeep<boolean>> {
    if (recursive) {
      const lessons = await this.lessons()
      const rawLessons = await Promise.all(lessons.map(
        lesson => lesson.toRawDeep()
      ))
      return {
        ...this.toRaw(),
        lessons: rawLessons
      }
    } else {
      const lessons = await this.lessons()
      const rawLessons = lessons.map(
        lesson => lesson.toRaw()
      )
      return {
        ...this.toRaw(),
        lessons: rawLessons
      }
    }
  }
}

relations.store(Chapter)