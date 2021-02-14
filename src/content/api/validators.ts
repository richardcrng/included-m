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
  isPathToLesson,
  LessonPath,
  LessonRoute,
  pathToContentType,
  pathToRoute,
  routeToId,
  TopicPath,
  TopicRoute,
} from "../types/content-path.types";
import { ContentYaml, LessonYaml } from "../types/content-yaml.types";

type LoadedJsYaml = ReturnType<typeof safeLoad>;

export type StandardiseYaml<T extends ContentYaml> = (
  jsYaml: LoadedJsYaml | T,
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
  jsYaml,
  path
) => {
  if (!isPathToLesson(path)) {
    throw new Error("Is not a path to lesson");
  } else {
    const { id, route } = contentMetadata(path);
    const defaultYaml: LessonYaml = {
      id,
      path,
      route,
      lessonTitle: capitalCase(id),
      activities: [],
    };
    try {
      const yamlObj = baseYamlValidation(jsYaml, path);
      return {
        ...defaultYaml,
        ...yamlObj,
      };
    } catch (err) {
      return defaultYaml;
    }
  }
};
