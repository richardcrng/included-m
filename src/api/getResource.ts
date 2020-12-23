import {
  ChapterIndex,
  CourseIndex,
  LessonIndex,
  TopicIndex,
} from "../content/content-types";
import { ChapterPath, CoursePath, getContent, TopicPath } from "./getContent";

export async function getCourseContents(path: CoursePath) {
  return Promise.all([
    getContent<CourseIndex>(path, "index.json"),
    getContent(path, "tree"),
  ]);
}

export async function getCourseDeep(path: CoursePath) {
  const [{ topicIdsOrdered, ...rest }, contents] = await getCourseContents(
    path
  );

  const getTopicIndices = contents.map((val) =>
    getContent<TopicIndex>(
      {
        ...path,
        topicId: val.name,
      },
      "index.json"
    )
  );

  const topics = await Promise.all(getTopicIndices);
  return { ...rest, topics };
}

export async function getCourseDeepRecursive(path: CoursePath) {
  const [{ topicIdsOrdered, ...rest }, contents] = await getCourseContents(
    path
  );

  const getTopicIndices = contents.map((val) =>
    getTopicDeep({
      ...path,
      topicId: val.name,
    })
  );

  const topics = await Promise.all(getTopicIndices);
  return { ...rest, topics };
}

export async function getTopicContents(path: TopicPath) {
  return Promise.all([
    getContent<TopicIndex>(path, "index.json"),
    getContent(path, "tree"),
  ]);
}

export async function getTopicDeep(path: TopicPath) {
  const [{ chapterIdsOrdered, ...rest }, contents] = await getTopicContents(
    path
  );

  const getChapterIndices = contents.map((val) =>
    getContent<ChapterIndex>(
      {
        ...path,
        chapterId: val.name,
      },
      "index.json"
    )
  );

  const chapters = await Promise.all(getChapterIndices);
  return { ...rest, chapters };
}

export async function getTopicDeepRecursive(path: TopicPath) {
  const [{ chapterIdsOrdered, ...rest }, contents] = await getTopicContents(
    path
  );

  const getChapterIndices = contents.map((val) =>
    getChapterDeep({
      ...path,
      chapterId: val.name,
    })
  );

  const chapters = await Promise.all(getChapterIndices);
  return { ...rest, chapters };
}

export async function getChapterContents(path: ChapterPath) {
  return Promise.all([
    getContent<ChapterIndex>(path, "index.json"),
    getContent(path, "tree"),
  ]);
}

export async function getChapterDeep(path: ChapterPath) {
  const [{ lessonIdsOrdered, ...rest }, contents] = await getChapterContents(
    path
  );

  const getLessonIndices = contents.map((val) =>
    getContent<LessonIndex>(
      {
        ...path,
        lessonId: val.name,
      },
      "index.json"
    )
  );

  const lessons = await Promise.all(getLessonIndices);
  return { ...rest, lessons };
}
