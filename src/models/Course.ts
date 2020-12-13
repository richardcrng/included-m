import { ActiveClass, Schema, relations } from 'fireactive'
import { CourseCRUD } from '../content/types'
import Topic, { TopicRaw, TopicRawDeep } from './Topic'
import { numericKeys } from './utils'

const courseSchema = {
  courseTitle: Schema.string,
  description: Schema.string,
  topicIdsOrdered: Schema.indexed.string,
}

export interface CourseRaw {
  _id: string,
  courseTitle: string,
  description: string,
  topicIds: string[]
}

export type CourseRawDeep<R extends boolean = true> = CourseRaw & {
  topics: R extends true
    ? TopicRawDeep[]
    : R extends false
      ? TopicRaw[]
      : (TopicRaw | TopicRawDeep)[]
}

export default class Course extends ActiveClass(courseSchema) {

  course = relations.findById('Course', 'courseId')

  topics = relations.findByIds<Course, Topic>(Topic, () => Object.values(this.topicIdsOrdered))

  static async createFromRaw(data: CourseCRUD): Promise<Course> {
    const topics = await Topic.createManyFromRaw(...data.topics)
    const topicIdsOrdered = numericKeys(
      topics.map((topic: Topic) => topic.getId())
    )
    const course = await this.create({
      courseTitle: data.courseTitle,
      description: data.description,
      topicIdsOrdered
    })
    return course
  }

  toRaw(): CourseRaw {

    return {
      _id: this.getId(),
      courseTitle: this.courseTitle,
      description: this.description,
      topicIds: this.topicIds
    }
  }

  get topicIds(): string[] {
    return Object.values(this.topicIdsOrdered)
  }

  async toRawDeep(recursive: true): Promise<CourseRawDeep<true>>
  async toRawDeep(): Promise<CourseRawDeep<true>>
  async toRawDeep(recursive: false): Promise<CourseRawDeep<false>>

  async toRawDeep(recursive = true): Promise<CourseRawDeep<boolean>> {
    if (recursive) {
      const topics = await this.topics()
      const rawChapters = await Promise.all(topics.map(
        topic => topic.toRawDeep()
      ))
      return {
        ...this.toRaw(),
        topics: rawChapters
      }
    } else {
      const topics = await this.topics()
      const rawChapters = topics.map(
        topic => topic.toRaw()
      )
      return {
        ...this.toRaw(),
        topics: rawChapters
      }
    }
  }
}

relations.store(Course)