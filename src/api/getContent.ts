import { safeLoad } from "js-yaml";
import WhyWhatError from "../lib/why-what-error";
import { ChapterYaml, CourseYaml, TopicYaml } from "./content-types";

const BRANCH = "main";
const PROJECT_ID = "23270946";
// const IS_SANDBOX = process.env.NODE_ENV === "development";
// const IS_SANDBOX = false;
const IS_SANDBOX = true;

const coursePath = (route: ContentRoute): string =>
  ["public", "course", ...route].join("/");

const treeUrl = (route: ContentRoute): string =>
  IS_SANDBOX
    ? `http://localhost:4000/tree/${route.join("/")}`
    : `https://gitlab.com/api/v4/projects/${PROJECT_ID}/repository/tree?path=${coursePath(
        route
      )}&ref=${BRANCH}`;

const indexUrl = (route: ContentRoute, fileName = "index"): string =>
  IS_SANDBOX
    ? `http://localhost:4000/json/${route.join("/")}`
    : `https://gitlab.com/api/v4/projects/${PROJECT_ID}/
repository/files/${encodeURIComponent(
        `${coursePath(route)}/${fileName}.yaml`
      )}/raw?ref=${BRANCH}`;

export interface CoursePath {
  courseId: string;
  topicId?: never;
  chapterId?: never;
  lessonId?: never;
}
export interface TopicPath {
  courseId: string;
  topicId: string;
  chapterId?: never;
  lessonId?: never;
}

export interface ChapterPath {
  courseId: string;
  topicId: string;
  chapterId: string;
  lessonId?: never;
}

export interface LessonPath {
  courseId: string;
  topicId: string;
  chapterId: string;
  lessonId: string;
}

export type ContentPath = CoursePath | TopicPath | ChapterPath | LessonPath;

function isPathToCourse(path: ContentPath): path is CoursePath {
  return !path.topicId;
}

function isPathToTopic(path: ContentPath): path is TopicPath {
  return !!path.topicId && !path.chapterId;
}

function isPathToChapter(path: ContentPath): path is ChapterPath {
  return !!path.chapterId && !path.lessonId;
}

export function yamlFileName(path: ContentPath): string {
  if (isPathToCourse(path)) {
    return "course";
  } else if (isPathToTopic(path)) {
    return "topic";
  } else if (isPathToChapter(path)) {
    return "chapter";
  } else {
    return "lesson";
  }
}

// function isPathToLesson(path: ContentPath): path is LessonPath {
//   return !!path.lessonId;
// }

export async function getContent(
  path: ContentPath
): Promise<GitLabTreeContent[]>;
export async function getContent(
  path: ContentPath,
  target: "tree"
): Promise<GitLabTreeContent[]>;
export async function getContent<T = any, P extends ContentPath = ContentPath>(
  path: P,
  target: "index"
): Promise<T & { id: string; path: P; route: ContentRoute }>;
export async function getContent<T = any, P extends ContentPath = ContentPath>(
  path: P,
  target: "index"
): Promise<T & { id: string; path: P; route: ContentRoute }>;

export async function getContent<T = any, P extends ContentPath = ContentPath>(
  path: P,
  target: "index" | "tree" = "index"
) {
  // const route = contentStringPath(path);
  if (target === "tree") {
    return getTree(path);
  } else {
    return getIndex<T, P>(path);
  }
}

export type ContentRoute =
  | CourseRoute
  | TopicRoute
  | TopicRoute
  | ChapterRoute
  | LessonRoute;
export type CourseRoute = [string];
export type TopicRoute = [string, string];
export type ChapterRoute = [string, string, string];
export type LessonRoute = [string, string, string, string];

export const contentStringPath = (path: ContentPath): ContentRoute => {
  const route: string[] = [path["courseId"]];
  if (path["topicId"]) {
    route.push(path["topicId"]);
    if (path["chapterId"]) {
      route.push(path["chapterId"]);
      if (path["lessonId"]) {
        route.push(path["lessonId"]);
      }
    }
  }
  return route as ContentRoute;
};

interface GitLabTreeContent {
  id: string;
  name: string;
  type: "tree" | "blob";
  path: string;
  mode: string;
}

const getTree = async (
  path: ContentPath,
  filterForTrees = true
): Promise<GitLabTreeContent[]> => {
  if (IS_SANDBOX) return getSandboxTree(path);

  const route = contentStringPath(path);

  const json: GitLabTreeContent[] = await fetch(treeUrl(route)).then((res) =>
    res.json()
  );

  if (json) {
    return filterForTrees ? json.filter((val) => val.type === "tree") : json;
  } else {
    throw new WhyWhatError({
      what: "Couldn't find tree",
      why: "Nothing at " + route.join("/"),
    });
  }
};

const getIndex = async <T = any, P extends ContentPath = ContentPath>(
  path: P
): Promise<
  T & {
    id: string;
    path: P;
  }
> => {
  if (IS_SANDBOX) return getSandboxIndex<T, P>(path);

  const route = contentStringPath(path);

  const json = await fetch(indexUrl(route, yamlFileName(path)))
    .then((res) => res.blob())
    .then((res) => res.text())
    .then((yamlAsString): any => safeLoad(yamlAsString));
  if (json && String(json.message).match("404")) {
    throw new WhyWhatError({
      what: "Couldn't find content",
      why: "Nothing at " + route.join("/"),
    });
  } else if (json) {
    return {
      ...json,
      id: route[route.length - 1],
      path,
      route,
    } as T & { id: string; path: P };
  } else {
    throw new WhyWhatError({
      what: "Couldn't find content",
      why: "Nothing at " + route.join("/"),
    });
  }
};

const getSandboxTree = async (path: ContentPath) => {
  const route = contentStringPath(path);

  const loaded = await fetch(
    `/course/${route.join("/")}/${yamlFileName(path)}.yaml`
  ).then((res) => res.text());
  const yamlObj = safeLoad(loaded) as any;
  let subDirs: string[] = [];
  if (isPathToCourse(path)) {
    subDirs = (yamlObj as CourseYaml).topicIdsOrdered || [];
  } else if (isPathToTopic(path)) {
    subDirs = (yamlObj as TopicYaml).chapterIdsOrdered || [];
  } else if (isPathToChapter(path)) {
    subDirs = (yamlObj as ChapterYaml).lessonIdsOrdered || [];
  }

  if (subDirs) {
    return subDirs.map((subDir) => ({
      id: subDir,
      name: subDir,
      type: "tree",
      path: route.join("/"),
      mode: "mode",
    })) as GitLabTreeContent[];
  } else {
    throw new WhyWhatError({
      what: "Couldn't find tree",
      why: "Nothing at " + route.join("/"),
    });
  }
};

const getSandboxIndex = async <T = any, P extends ContentPath = ContentPath>(
  path: ContentPath
) => {
  const route = contentStringPath(path);
  const loaded = await fetch(
    `/course/${route.join("/")}/${yamlFileName(path)}.yaml`
  ).then(async (res) => res.text());
  const yamlObj = safeLoad(loaded) as any;
  if (yamlObj) {
    return {
      ...yamlObj,
      path,
      route,
    } as T & { id: string; path: P };
  } else {
    throw new WhyWhatError({
      what: "Couldn't find content",
      why: "Nothing at " + route.join("/"),
    });
  }
};
