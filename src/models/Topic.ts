import FirestoreModel from "./FirestoreModel";
import relations from "./relations";
import { AsyncReturnType } from "type-fest";
import Chapter from "./Chapter";

export interface TopicBase {
  courseId?: string;
  topicTitle: string;
  chapterIdsOrdered: string[];
}

export interface TopicWithChapters
  extends Omit<TopicBase, "chapterIdsOrdered"> {
  chapters: AsyncReturnType<Chapter["toObjectDeep"]>[];
}

export default class Topic extends FirestoreModel<TopicBase>("chapter") {
  chapters = relations.findByIds(Chapter, () => this.chapterIdsOrdered);

  static async createWithChapters({
    topicTitle,
    chapters,
    ...rest
  }: TopicWithChapters) {
    const createdChapters = await Promise.all(
      chapters.map((chapter) => Chapter.createWithLessons(chapter))
    );
    const chapterIdsOrdered = createdChapters.map((createdChapters) =>
      createdChapters.getId()
    );
    const topic = await this.createAndSave({
      topicTitle,
      chapterIdsOrdered,
      ...rest,
    });
    await Promise.all(
      createdChapters.map(async (chapter) => {
        chapter.topicId = topic.id;
        await chapter.save();
      })
    );
    return topic;
  }

  async toObjectDeep(): Promise<
    ReturnType<Topic["toObject"]> & {
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
}
