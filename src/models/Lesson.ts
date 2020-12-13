import { ActiveClass, Schema, relations } from 'fireactive'
import { LessonCRUD } from '../content/types'
import Activity, { ActivityRaw, ActivityRawDeep } from './Activity'
import { numericKeys } from './utils'

const lessonSchema = {
  chapterId: Schema.string({ optional: true }),
  lessonTitle: Schema.string,
  activityIdsOrdered: Schema.indexed.string,
}

export interface LessonRaw {
  chapterId?: string,
  lessonTitle: string,
  activityIds: string[]
}

export type LessonRawDeep<R extends boolean = true> = LessonRaw & {
  activities: R extends true
    ? ActivityRawDeep[]
    : R extends false
      ? ActivityRaw[]
      : (ActivityRaw | ActivityRawDeep)[]
}

export default class Lesson extends ActiveClass(lessonSchema) {

  chapter = relations.findById('Chapter', 'chapterId')

  activities = relations.findByIds<Lesson, Activity>(Activity, () => Object.values(this.activityIdsOrdered))

  static async createFromRaw(data: LessonCRUD): Promise<Lesson> {
    const activities = await Activity.createManyFromRaw(...data.activities)
    const activityIdsOrdered = numericKeys(
      activities.map((activity: Activity) => activity.getId())
    )
    const lesson = await this.create({
      lessonTitle: data.lessonTitle,
      activityIdsOrdered
    })
    return lesson
  }

  static async createManyFromRaw(...docs: LessonCRUD[]): Promise<Lesson[]> {
    return await Promise.all(docs.map(doc => (
      this.createFromRaw(doc)
    )))
  }

  get activityIds(): string[] {
    return Object.values(this.activityIdsOrdered)
  }

  toRaw(): LessonRaw {
    return {
      chapterId: this.chapterId ? this.chapterId : undefined,
      lessonTitle: this.lessonTitle,
      activityIds: this.activityIds
    }
  }

  async toRawDeep(recursive: true): Promise<LessonRawDeep<true>>
  async toRawDeep(): Promise<LessonRawDeep<true>>
  async toRawDeep(recursive: false): Promise<LessonRawDeep<false>>

  async toRawDeep(recursive = true): Promise<LessonRawDeep<boolean>> {
    if (recursive) {
      const activities = await this.activities()
      const rawActivities = await Promise.all(activities.map(
        activity => activity.toRawDeep()
      ))
      return {
        ...this.toRaw(),
        activities: rawActivities
      }
    } else {
      const activities = await this.activities()
      const rawActivities = activities.map(
        activity => activity.toRaw()
      )
      return {
        ...this.toRaw(),
        activities: rawActivities
      }
    }
  }
}

relations.store(Lesson)