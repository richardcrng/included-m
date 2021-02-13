import FirestoreModel from "./FirestoreModel";
import relations from "./relations";
import { AsyncReturnType } from "type-fest";
import Topic from "./Topic";

export interface CourseBase {
  courseTitle: string;
  description: string;
  topicIdsOrdered: string[];
}

export interface CourseWithTopics extends Omit<CourseBase, "topicIdsOrdered"> {
  topics: AsyncReturnType<Topic["toObjectDeepRecursive"]>[];
}

export type CoursePOJO = ReturnType<Course["toObject"]>;
export type CoursePOJODeep = AsyncReturnType<Course["toObjectDeep"]>;
export type CoursePOJODeepR = AsyncReturnType<Course["toObjectDeepRecursive"]>;

export default class Course extends FirestoreModel<CourseBase>("course") {
  topics = relations.findByIds(Topic, () => this.topicIdsOrdered);

  static async createWithTopics({ topics, ...rest }: CourseWithTopics) {
    const thisId = this.generateId();
    const createdTopics = await Promise.all(
      topics.map((topic) =>
        Topic.createWithChapters({
          ...topic,
          courseId: thisId,
        })
      )
    );
    const topicIdsOrdered = createdTopics.map((createdTopics) =>
      createdTopics.getId()
    );
    const course = await this.createAndSave({
      topicIdsOrdered,
      ...rest,
    });
    return course;
  }

  async toObjectDeep(): Promise<
    Omit<ReturnType<Course["toObject"]>, "topicIdsOrdered"> & {
      topics: AsyncReturnType<Topic["toObjectDeep"]>[];
    }
  > {
    const topics = await this.topics();
    const topicsWithLessons = await Promise.all(
      topics.map((topic) => topic.toObjectDeep())
    );
    return {
      ...this.toObject(),
      topics: topicsWithLessons,
    };
  }

  async toObjectDeepRecursive(): Promise<
    Omit<ReturnType<Course["toObject"]>, "topicIdsOrdered"> & {
      topics: AsyncReturnType<Topic["toObjectDeepRecursive"]>[];
    }
  > {
    const topics = await this.topics();
    const topicsWithLessons = await Promise.all(
      topics.map((topic) => topic.toObjectDeepRecursive())
    );
    return {
      ...this.toObject(),
      topics: topicsWithLessons,
    };
  }
}
