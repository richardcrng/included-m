import { safeLoad, dump } from "js-yaml";
import {
  ChapterYaml,
  ChapterYamlDeep,
  ContentYaml,
  CourseYaml,
  CourseYamlDeep,
  CourseYamlRecursive,
  FetchedYaml,
  LessonYaml,
  ParsedYaml,
  TopicYaml,
  TopicYamlDeep,
  TopicYamlRecursive,
} from "../content-types";
import {
  ChapterPath,
  ContentPath,
  contentStringPath,
  CoursePath,
  LessonPath,
  TopicPath,
  yamlFileName,
} from "../getContent";

async function fetchPublicYaml(path: ContentPath): Promise<FetchedYaml> {
  const route = contentStringPath(path);
  const navigationFrontMatter = dump({
    path,
    route,
  });
  try {
    const raw = await fetch(
      `/course/${route.join("/")}/${yamlFileName(path)}.yaml`
    )
      .then((res) => res.text())
      // remove <!DOCTYPE html> if that's how it's been parsed
      .then((res) => (res.startsWith("<!DOCTYPE html>") ? "" : res));
    return { raw: `${navigationFrontMatter}\n${raw}`, didFetch: true };
  } catch (err) {
    return { raw: navigationFrontMatter, didFetch: false };
  }
}

async function fetchAndParsePublicYaml<T extends ContentYaml>(
  path: ContentPath
): Promise<ParsedYaml<T>> {
  const fetchedYaml = await fetchPublicYaml(path);
  const parsed = safeLoad(fetchedYaml.raw) as T;
  return {
    ...fetchedYaml,
    parsed,
    path,
    route: contentStringPath(path),
  };
}

export async function fetchAndParsePublicLesson(
  path: LessonPath
): Promise<ParsedYaml<LessonYaml>> {
  return fetchAndParsePublicYaml<LessonYaml>(path);
}

export async function fetchAndParsePublicChapter(
  path: ChapterPath
): Promise<ParsedYaml<ChapterYaml>> {
  return fetchAndParsePublicYaml<ChapterYaml>(path);
}

export async function fetchAndParsePublicChapterDeep(
  path: ChapterPath
): Promise<ParsedYaml<ChapterYamlDeep>> {
  const chapterYaml = await fetchAndParsePublicYaml<ChapterYaml>(path);
  const fetchLessons = chapterYaml.parsed.lessonIdsOrdered.map((lessonId) =>
    fetchAndParsePublicLesson({
      ...path,
      lessonId,
    }).then((yaml) => yaml.parsed)
  );
  const lessons = await Promise.all(fetchLessons);
  return {
    ...chapterYaml,
    parsed: {
      ...chapterYaml.parsed,
      lessons,
    },
  };
}

export async function fetchAndParsePublicTopic(
  path: TopicPath
): Promise<ParsedYaml<TopicYaml>> {
  return fetchAndParsePublicYaml<TopicYaml>(path);
}

export async function fetchAndParsePublicTopicDeep(
  path: TopicPath
): Promise<ParsedYaml<TopicYamlDeep>> {
  const topicYaml = await fetchAndParsePublicYaml<TopicYaml>(path);
  const fetchChapters = topicYaml.parsed.chapterIdsOrdered.map((chapterId) =>
    fetchAndParsePublicChapter({
      ...path,
      chapterId,
    }).then((yaml) => yaml.parsed)
  );
  const chapters = await Promise.all(fetchChapters);
  return {
    ...topicYaml,
    parsed: {
      ...topicYaml.parsed,
      chapters,
    },
  };
}

export async function fetchAndParsePublicTopicRecursive(
  path: TopicPath
): Promise<ParsedYaml<TopicYamlRecursive>> {
  const topicYaml = await fetchAndParsePublicYaml<TopicYaml>(path);
  const fetchChapters = topicYaml.parsed.chapterIdsOrdered.map((chapterId) =>
    fetchAndParsePublicChapterDeep({
      ...path,
      chapterId,
    }).then((yaml) => yaml.parsed)
  );
  const chapters = await Promise.all(fetchChapters);
  return {
    ...topicYaml,
    parsed: {
      ...topicYaml.parsed,
      chapters,
    },
  };
}

export async function fetchAndParsePublicCourse(
  path: CoursePath
): Promise<ParsedYaml<CourseYaml>> {
  return fetchAndParsePublicYaml<CourseYaml>(path);
}

export async function fetchAndParsePublicCourseDeep(
  path: CoursePath
): Promise<ParsedYaml<CourseYamlDeep>> {
  const courseYaml = await fetchAndParsePublicYaml<CourseYaml>(path);
  const fetchTopics = courseYaml.parsed.topicIdsOrdered.map((topicId) =>
    fetchAndParsePublicTopic({
      ...path,
      topicId,
    }).then((yaml) => yaml.parsed)
  );
  const topics = await Promise.all(fetchTopics);
  return {
    ...courseYaml,
    parsed: {
      ...courseYaml.parsed,
      topics,
    },
  };
}

export async function fetchAndParsePublicCourseRecursive(
  path: CoursePath
): Promise<ParsedYaml<CourseYamlRecursive>> {
  const courseYaml = await fetchAndParsePublicYaml<CourseYaml>(path);
  const fetchTopics = courseYaml.parsed.topicIdsOrdered.map((topicId) =>
    fetchAndParsePublicTopicRecursive({
      ...path,
      topicId,
    }).then((yaml) => yaml.parsed)
  );
  const topics = await Promise.all(fetchTopics);
  return {
    ...courseYaml,
    parsed: {
      ...courseYaml.parsed,
      topics,
    },
  };
}
