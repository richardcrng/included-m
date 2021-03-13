import { safeLoad, dump } from "js-yaml";
import {
  baseYamlValidation,
  standardiseChapterYaml,
  standardiseCourseYaml,
  standardiseLessonYaml,
  standardiseTopicYaml,
  StandardiseYaml,
} from "../validators/content-validation";
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
  pathToRoute,
  CoursePath,
  LessonPath,
  routeToId,
  TopicPath,
  yamlContentType,
} from "../types/content-path.types";

async function fetchPublicYaml(path: ContentPath): Promise<FetchedYaml> {
  const route = pathToRoute(path);
  const id = routeToId(route);
  const frontMatter: ContentCommon = {
    path,
    route,
    id,
  };
  const commonFrontmatter = dump(frontMatter);
  try {
    const raw = await fetch(
      `/course/${route.join("/")}/${yamlContentType(path)}.yaml`
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

// function parseYaml<T extends ContentYaml>(
//   fetchedYaml: FetchedYaml,
//   standardiseYaml: StandardiseYaml<T>
// ): T {
//   const jsYaml = safeLoad(fetchedYaml.raw) as T;
//   return standardiseYaml(jsYaml);
// }

async function fetchAndParsePublicYaml<T extends ContentYaml>(
  path: ContentPath,
  standardiseYaml: StandardiseYaml<T>
): Promise<ParsedYaml<T>> {
  const fetchedYaml = await fetchPublicYaml(path);
  const jsYaml = safeLoad(fetchedYaml.raw);
  const validatedYaml = baseYamlValidation(jsYaml, path);
  const parsed = standardiseYaml(validatedYaml, path);
  return {
    ...fetchedYaml,
    parsed,
    path,
    route: pathToRoute(path),
  };
}

export async function fetchAndParsePublicLesson(
  path: LessonPath
): Promise<ParsedYaml<LessonYaml>> {
  return fetchAndParsePublicYaml<LessonYaml>(path, standardiseLessonYaml);
}

export async function fetchAndParsePublicChapter(
  path: ChapterPath
): Promise<ParsedYaml<ChapterYaml>> {
  return fetchAndParsePublicYaml<ChapterYaml>(path, standardiseChapterYaml);
}

export async function fetchAndParsePublicChapterDeep(
  path: ChapterPath
): Promise<ParsedYaml<ChapterYamlDeep>> {
  const chapterYaml = await fetchAndParsePublicChapter(path);
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
  return fetchAndParsePublicYaml<TopicYaml>(path, standardiseTopicYaml);
}

export async function fetchAndParsePublicTopicDeep(
  path: TopicPath
): Promise<ParsedYaml<TopicYamlDeep>> {
  const topicYaml = await fetchAndParsePublicTopic(path);
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
  const topicYaml = await fetchAndParsePublicTopic(path);
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
  return fetchAndParsePublicYaml<CourseYaml>(path, standardiseCourseYaml);
}

export async function fetchAndParsePublicCourseDeep(
  path: CoursePath
): Promise<ParsedYaml<CourseYamlDeep>> {
  const courseYaml = await fetchAndParsePublicCourse(path);
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
  const courseYaml = await fetchAndParsePublicCourse(path);
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
