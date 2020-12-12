import { ActiveClass, Schema, relations } from 'fireactive'
import Activity from './Activity'

const lessonSchema = {
  chapterId: Schema.string({ optional: true }),
  lessonTitle: Schema.string,
  activityIds: Schema.indexed.boolean,
}

export default class Lesson extends ActiveClass(lessonSchema) {

  chapter = relations.findById('Chapter', 'chapterId')

  activities = relations.findByIds<Lesson, Activity>(Activity, () => Object.keys(this.activityIds))
}

relations.store(Lesson)