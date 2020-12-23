import {
  ChapterIndex,
  CourseIndex,
  LessonIndex,
  TopicIndex,
} from "../content/content-types";
import {
  ChapterPath,
  CoursePath,
  getContent,
  LessonPath,
  TopicPath,
} from "./getContent";

export async function getCourseContents(path: CoursePath) {
  const [{ topicIdsOrdered, ...rest }, topicContents] = await Promise.all([
    getContent<CourseIndex>(path, "index.json"),
    getContent(path, "tree"),
  ]);
  const topicIds = topicIdsOrdered.filter((topicId) =>
    topicContents.some((topic) => topic.name === topicId)
  );
  return { topicIds, ...rest };
}

export async function getCourseDeep(path: CoursePath) {
  const { topicIds, ...rest } = await getCourseContents(path);

  const getTopicIndices = topicIds.map((topicId) =>
    getContent<TopicIndex>(
      {
        ...path,
        topicId,
      },
      "index.json"
    )
  );

  const topics = await Promise.all(getTopicIndices);
  return { ...rest, topics };
}

export async function getCourseDeepRecursive(path: CoursePath) {
  const { topicIds, ...rest } = await getCourseContents(path);

  const getTopicIndices = topicIds.map((topicId) =>
    getTopicDeep({
      ...path,
      topicId,
    })
  );

  const topics = await Promise.all(getTopicIndices);
  return { ...rest, topics };
}

export async function getTopicContents(path: TopicPath) {
  const [{ chapterIdsOrdered, ...rest }, chapterContents] = await Promise.all([
    getContent<TopicIndex>(path, "index.json"),
    getContent(path, "tree"),
  ]);
  const chapterIds = chapterIdsOrdered.filter((chapterId) =>
    chapterContents.some((chapter) => chapter.name === chapterId)
  );
  return { chapterIds, ...rest };
}

export async function getTopicDeep(path: TopicPath) {
  const { chapterIds, ...rest } = await getTopicContents(path);

  const getChapterIndices = chapterIds.map((chapterId) =>
    getContent<ChapterIndex>(
      {
        ...path,
        chapterId,
      },
      "index.json"
    )
  );

  const chapters = await Promise.all(getChapterIndices);
  return { ...rest, chapters };
}

export async function getTopicDeepRecursive(path: TopicPath) {
  const { chapterIds, ...rest } = await getTopicContents(path);

  const getChapterIndices = chapterIds.map((chapterId) =>
    getChapterDeep({
      ...path,
      chapterId,
    })
  );

  const chapters = await Promise.all(getChapterIndices);
  return { ...rest, chapters };
}

export async function getChapterContents(path: ChapterPath) {
  const [{ lessonIdsOrdered, ...rest }, chapterContents] = await Promise.all([
    getContent<ChapterIndex>(path, "index.json"),
    getContent(path, "tree"),
  ]);
  const lessonIds = lessonIdsOrdered.filter((lessonId) =>
    chapterContents.some((lesson) => lesson.name === lessonId)
  );
  return { lessonIds, ...rest };
}

export async function getChapterDeep(path: ChapterPath) {
  const { lessonIds, ...rest } = await getChapterContents(path);

  const getLessonIndices = lessonIds.map((lessonId) =>
    getContent<LessonIndex>(
      {
        ...path,
        lessonId,
      },
      "index.json"
    )
  );

  const lessons = await Promise.all(getLessonIndices);
  return { ...rest, lessons };
}

export async function getLesson(path: LessonPath) {
  return getContent<LessonIndex>(path, "index.json");
}
