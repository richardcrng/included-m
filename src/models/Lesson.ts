import { ActiveClass, Schema, relations } from 'fireactive'
import { LessonCRUD } from '../content/types'
import Activity from './Activity'
import { numericKeys } from './utils'

const lessonSchema = {
  chapterId: Schema.string({ optional: true }),
  lessonTitle: Schema.string,
  activityIdsOrdered: Schema.indexed.string,
}

export default class Lesson extends ActiveClass(lessonSchema) {

  chapter = relations.findById('Chapter', 'chapterId')

  activities = relations.findByIds<Lesson, Activity>(Activity, () => Object.values(this.activityIdsOrdered))

  static async createFromRaw(data: LessonCRUD) {

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
}

relations.store(Lesson)