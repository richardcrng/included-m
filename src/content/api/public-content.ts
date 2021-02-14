import { safeLoad, dump } from "js-yaml";
import {
  ChapterYaml,
  ChapterYamlDeep,
  ContentYaml,
  ContentCommon,
  CourseYaml,
  CourseYamlDeep,
  CourseYamlRecursive,
  FetchedYaml,
  LessonYaml,
  ParsedYaml,
  TopicYaml,
  TopicYamlDeep,
  TopicYamlRecursive,
} from "../types/content-yaml.types";
import {
  ChapterPath,
  ContentPath,
  contentStringPath,
  CoursePath,
  LessonPath,
  TopicPath,
  yamlFileName,
} from "../types/content-path.types";

async function fetchPublicYaml(path: ContentPath): Promise<FetchedYaml> {
  const route = contentStringPath(path);
  const id = route[route.length - 1];
  const frontMatter: ContentCommon = {
    path,
    route,
    id,
  };
  const commonFrontmatter = dump(frontMatter);
  try {
    const raw = await fetch(
      `/course/${route.join("/")}/${yamlFileName(path)}.yaml`
    )
      .then((res) => res.text())
      // remove <!DOCTYPE html> if that's how it's been parsed
      .then((res) => (res.match(/<!DOCTYPE html>/i) ? "" : res));
    return {
      raw: `${commonFrontmatter}\n${raw}`,
      didFetch: true,
      ...frontMatter,
    };
  } catch (err) {
    return { raw: commonFrontmatter, didFetch: false, ...frontMatter };
  }
}

type StandardiseYaml<T extends ContentYaml> = (
  jsYaml: ReturnType<typeof safeLoad> | T
) => T;

// function parseYaml<T extends ContentYaml>(
//   fetchedYaml: FetchedYaml,
//   standardiseYaml: StandardiseYaml<T>
// ): T {
//   const jsYaml = safeLoad(fetchedYaml.raw) as T;
//   return standardiseYaml(jsYaml);
// }

async function fetchAndParsePublicYaml<T extends ContentYaml>(
  path: ContentPath,
  standardiseYaml?: StandardiseYaml<T>
): Promise<ParsedYaml<T>> {
  const fetchedYaml = await fetchPublicYaml(path);
  const jsYaml = safeLoad(fetchedYaml.raw) as T;
  const parsed = standardiseYaml ? standardiseYaml(jsYaml) : jsYaml;
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
