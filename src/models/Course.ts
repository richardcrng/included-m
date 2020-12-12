import { ActiveClass, Schema, relations } from 'fireactive'
import Topic from './Topic'

const courseSchema = {
  courseTitle: Schema.string,
  description: Schema.string,
  topicIds: Schema.indexed.boolean,
}

export default class Course extends ActiveClass(courseSchema) {

  course = relations.findById('Course', 'courseId')

  topics = relations.findByIds<Course, Topic>(Topic, () => Object.keys(this.topicIds))
}

relations.store(Course)