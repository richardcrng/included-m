import FirestoreModel from "./FirestoreModel";
import relations from "./relations";
import { AsyncReturnType } from "type-fest";
import Lesson from "./Lesson";

export interface ChapterBase {
  topicId?: string;
  chapterTitle: string;
  lessonIdsOrdered: string[];
}

export interface ChapterWithLessons
  extends Omit<ChapterBase, "lessonIdsOrdered"> {
  lessons: AsyncReturnType<Lesson["toObjectDeep"]>[];
}

export default class Chapter extends FirestoreModel<ChapterBase>("lesson") {
  lessons = relations.findByIds(Lesson, () => this.lessonIdsOrdered);

  static async createWithLessons({ lessons, ...rest }: ChapterWithLessons) {
    const createdLessons = await Promise.all(
      lessons.map((lesson) => Lesson.createWithActivities(lesson))
    );
    const lessonIdsOrdered = createdLessons.map((createdLessons) =>
      createdLessons.getId()
    );
    const chapter = await this.createAndSave({ ...rest, lessonIdsOrdered });
    await Promise.all(
      createdLessons.map(async (lesson) => {
        lesson.chapterId = chapter.id;
        await lesson.save();
      })
    );
    return chapter;
  }

  async toObjectDeep(): Promise<
    ReturnType<Chapter["toObject"]> & {
      lessons: AsyncReturnType<Lesson["toObjectDeep"]>[];
    }
  > {
    const lessons = await this.lessons();
    const lessonsWithActivities = await Promise.all(
      lessons.map((lesson) => lesson.toObjectDeep())
    );
    return {
      ...this.toObject(),
      lessons: lessonsWithActivities,
    };
  }
}
