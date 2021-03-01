import { safeLoad } from "js-yaml";
import { capitalCase } from "change-case";
import {
  ChapterPath,
  ChapterRoute,
  ContentPath,
  ContentRoute,
  ContentType,
  CoursePath,
  CourseRoute,
  isPathToChapter,
  isPathToCourse,
  isPathToLesson,
  isPathToTopic,
  LessonPath,
  LessonRoute,
  pathToContentType,
  pathToRoute,
  routeToId,
  TopicPath,
  TopicRoute,
} from "../types/content-path.types";
import {
  ChapterYaml,
  ContentYaml,
  CourseYaml,
  LessonYaml,
  TopicYaml,
} from "../types/content-yaml.types";

type LoadedJsYaml = ReturnType<typeof safeLoad>;

export type StandardiseYaml<T extends ContentYaml> = (
  jsYamlObj: object,
  path: ContentPath
) => T;

export type ContentMetadata =
  | CourseMetadata
  | TopicMetadata
  | ChapterMetadata
  | LessonMetadata;

interface BaseContentMetadata {
  route: ContentRoute;
  id: string;
  stringPath: string;
  resourceType: ContentType;
}

interface CourseMetadata extends BaseContentMetadata {
  route: CourseRoute;
  resourceType: ContentType.COURSE;
}

interface TopicMetadata extends BaseContentMetadata {
  route: TopicRoute;
  resourceType: ContentType.TOPIC;
}

interface ChapterMetadata extends BaseContentMetadata {
  route: ChapterRoute;
  resourceType: ContentType.CHAPTER;
}

interface LessonMetadata extends BaseContentMetadata {
  route: LessonRoute;
  resourceType: ContentType.LESSON;
}

function contentMetadata(contentPath: CoursePath): CourseMetadata;
function contentMetadata(contentPath: TopicPath): TopicMetadata;
function contentMetadata(contentPath: ChapterPath): ChapterMetadata;
function contentMetadata(contentPath: LessonPath): LessonMetadata;
function contentMetadata(contentPath: ContentPath): ContentMetadata;
function contentMetadata(contentPath: ContentPath): any {
  const resourceType = pathToContentType(contentPath);
  const route = pathToRoute(contentPath);
  const id = routeToId(route);
  const stringPath = route.join("/");
  return {
    route,
    id,
    stringPath,
    resourceType,
  };
}

export function baseYamlValidation(
  jsYaml: LoadedJsYaml,
  contentPath: ContentPath
): object {
  const { stringPath, resourceType } = contentMetadata(contentPath);
  const resource = `${resourceType[0].toUpperCase}${resourceType.slice(1)}`;

  if (typeof jsYaml === "undefined") {
    throw new Error(
      `${resource} at ${stringPath} gets processed into undefined - it should be an object`
    );
  } else if (typeof jsYaml === "string") {
    throw new Error(
      `${resource} at ${stringPath} gets processed into a string - it should be an object`
    );
  } else {
    return jsYaml;
  }
}

export const standardiseLessonYaml: StandardiseYaml<LessonYaml> = (
  yamlObj,
  path
) => {
  if (!isPathToLesson(path)) {
    throw new Error("Is not a path to Lesson");
  } else {
    const { id, route } = contentMetadata(path);
    const defaultYaml: LessonYaml = {
      id,
      path,
      route,
      lessonTitle: capitalCase(id),
      activities: [],
    };
    return {
      ...defaultYaml,
      ...yamlObj,
    };
  }
};

export const standardiseChapterYaml: StandardiseYaml<ChapterYaml> = (
  yamlObj,
  path
) => {
  if (!isPathToChapter(path)) {
    throw new Error("Is not a path to Chapter");
  } else {
    const { id, route } = contentMetadata(path);
    const defaultYaml: ChapterYaml = {
      id,
      path,
      route,
      chapterTitle: capitalCase(id),
      lessonIdsOrdered: [],
    };
    return {
      ...defaultYaml,
      ...yamlObj,
    };
  }
};

export const standardiseTopicYaml: StandardiseYaml<TopicYaml> = (
  yamlObj,
  path
) => {
  if (!isPathToTopic(path)) {
    throw new Error("Is not a path to Topic");
  } else {
    const { id, route } = contentMetadata(path);
    const title = capitalCase(id);
    const defaultYaml: TopicYaml = {
      id,
      path,
      route,
      topicTitle: title,
      description: `Learn about ${title}`,
      chapterIdsOrdered: [],
    };
    return {
      ...defaultYaml,
      ...yamlObj,
    };
  }
};

export const standardiseCourseYaml: StandardiseYaml<CourseYaml> = (
  yamlObj,
  path
) => {
  if (!isPathToCourse(path)) {
    throw new Error("Is not a path to Course");
  } else {
    const { id, route } = contentMetadata(path);
    const title = capitalCase(id);
    const defaultYaml: CourseYaml = {
      id,
      path,
      route,
      courseTitle: title,
      description: `Learn about ${title}`,
      topicIdsOrdered: [],
    };
    return {
      ...defaultYaml,
      ...yamlObj,
    };
  }
};
