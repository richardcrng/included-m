import { ActiveClass, Schema, relations } from 'fireactive'
import { CourseCRUD } from '../content/types'
import Topic from './Topic'
import { numericKeys } from './utils'

const courseSchema = {
  courseTitle: Schema.string,
  description: Schema.string,
  topicIdsOrdered: Schema.indexed.string,
}

export interface CourseRaw {
  courseTitle: string,
  description: string,
  topicIds: string[]
}

export default class Course extends ActiveClass(courseSchema) {

  course = relations.findById('Course', 'courseId')

  topics = relations.findByIds<Course, Topic>(Topic, () => Object.values(this.topicIdsOrdered))

  static async createFromRaw(data: CourseCRUD): Promise<Course> {
    const topics = await Topic.createManyFromRaw(...data.topics)
    const topicIdsOrdered = numericKeys(
      topics.map((chapter: Topic) => chapter.getId())
    )
    const chapter = await this.create({
      courseTitle: data.courseTitle,
      description: data.description,
      topicIdsOrdered
    })
    return chapter
  }

  toRaw(): CourseRaw {
    const {
      courseTitle, description, topicIds
    } = this

    return JSON.parse(JSON.stringify({
      courseTitle, description, topicIds
    }))
  }

  get topicIds(): string[] {
    return Object.values(this.topicIdsOrdered)
  }
}

relations.store(Course)