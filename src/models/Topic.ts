import { ActiveClass, Schema, relations } from 'fireactive'
import Chapter from './Chapter'

const topicSchema = {
  courseId: Schema.string({ optional: true }),
  topicTitle: Schema.string,
  description: Schema.string,
  chapterIds: Schema.indexed.boolean,
}

export default class Topic extends ActiveClass(topicSchema) {

  course = relations.findById('Course', 'courseId')

  chapters = relations.findByIds<Topic, Chapter>(Chapter, () => Object.keys(this.chapterIds))
}

relations.store(Topic)