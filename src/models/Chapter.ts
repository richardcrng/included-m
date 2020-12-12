import { ActiveClass, Schema, relations } from 'fireactive'
import Lesson from './Lesson'

const lessonSchema = {
  topicId: Schema.string({ optional: true }),
  chapterTitle: Schema.string,
  lessonIds: Schema.indexed.boolean,
}

export default class Chapter extends ActiveClass(lessonSchema) {

  topic = relations.findById('Topic', 'topicId')

  lessons = relations.findByIds<Chapter, Lesson>(Lesson, () => Object.keys(this.lessonIds))
}

relations.store(Chapter)