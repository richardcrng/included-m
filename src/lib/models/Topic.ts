import FirestoreModel from "./FirestoreModel";
import relations from "./relations";
import { AsyncReturnType } from "type-fest";
import Chapter from "./Chapter";

export interface TopicBase {
  courseId?: string;
  topicTitle: string;
  description: string;
  chapterIdsOrdered: string[];
}

export interface TopicWithChapters
  extends Omit<TopicBase, "chapterIdsOrdered"> {
  chapters: AsyncReturnType<Chapter["toObjectDeepRecursive"]>[];
}

export type TopicPOJO = ReturnType<Topic["toObject"]>;
export type TopicPOJODeep = AsyncReturnType<Topic["toObjectDeep"]>;
export type TopicPOJODeepR = AsyncReturnType<Topic["toObjectDeepRecursive"]>;

export default class Topic extends FirestoreModel<TopicBase>("topic") {
  chapters = relations.findByIds(Chapter, () => this.chapterIdsOrdered);

  static async createWithChapters({ chapters, ...rest }: TopicWithChapters) {
    const thisId = this.generateId();
    const createdChapters = await Promise.all(
      chapters.map((chapter) =>
        Chapter.createWithLessons({
          ...chapter,
          topicId: thisId,
        })
      )
    );
    const chapterIdsOrdered = createdChapters.map((createdChapters) =>
      createdChapters.getId()
    );
    const topic = await this.createAndSave({
      chapterIdsOrdered,
      ...rest,
    });
    return topic;
  }

  async toObjectDeep(): Promise<
    Omit<ReturnType<Topic["toObject"]>, "chapterIdsOrdered"> & {
      chapters: AsyncReturnType<Chapter["toObjectDeep"]>[];
    }
  > {
    const chapters = await this.chapters();
    const chaptersWithLessons = await Promise.all(
      chapters.map((chapter) => chapter.toObjectDeep())
    );
    return {
      ...this.toObject(),
      chapters: chaptersWithLessons,
    };
  }

  async toObjectDeepRecursive(): Promise<
    Omit<ReturnType<Topic["toObject"]>, "chapterIdsOrdered"> & {
      chapters: AsyncReturnType<Chapter["toObjectDeepRecursive"]>[];
    }
  > {
    const chapters = await this.chapters();
    const chaptersWithLessons = await Promise.all(
      chapters.map((chapter) => chapter.toObjectDeepRecursive())
    );
    return {
      ...this.toObject(),
      chapters: chaptersWithLessons,
    };
  }
}
