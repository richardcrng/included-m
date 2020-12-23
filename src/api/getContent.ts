import WhyWhatError from "../lib/why-what-error";
import { ChapterIndex, CourseIndex, TopicIndex } from "./content-types";

const BRANCH = "main";
const PROJECT_ID = "23276565";
const IS_SANDBOX = false;

const treeUrl = (route: string[]) =>
  process.env.NODE_ENV === "development"
    ? `http://localhost:4000/tree/${route.join("/")}`
    : `https://gitlab.com/api/v4/projects/${PROJECT_ID}/repository/tree?path=${route.join(
        "/"
      )}&ref=${BRANCH}`;

const indexUrl = (route: string[]) =>
  process.env.NODE_ENV === "development"
    ? `http://localhost:4000/json/${route.join("/")}`
    : `https://gitlab.com/api/v4/projects/${PROJECT_ID}/
repository/files/${encodeURIComponent(
        `${route.join("/")}/index.json`
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

function isPathToLesson(path: ContentPath): path is LessonPath {
  return !!path.lessonId;
}

export async function getContent(
  path: ContentPath
): Promise<GitLabTreeContent[]>;
export async function getContent(
  path: ContentPath,
  target: "tree"
): Promise<GitLabTreeContent[]>;
export async function getContent<T = any, P extends ContentPath = ContentPath>(
  path: P,
  target: "index.json"
): Promise<T & { id: string; path: P; route: string[] }>;
export async function getContent<T = any, P extends ContentPath = ContentPath>(
  path: P,
  target: "index.json",
  recursive: true
): Promise<T & { id: string; path: P; route: string[] }>;

export async function getContent<T = any, P extends ContentPath = ContentPath>(
  path: P,
  target: "index.json" | "tree" = "index.json",
  recursive = false
) {
  // const route = contentStringPath(path);
  if (target === "tree") {
    return getTree(path);
  } else {
    return getIndex<T, P>(path);
  }
}

export const contentStringPath = (path: ContentPath): string[] => {
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
  return route;
};

interface GitLabTreeContent {
  id: string;
  name: string;
  type: "tree" | "blob";
  path: string;
  mode: string;
}

const getTree = async (path: ContentPath, filterForTrees = true) => {
  if (IS_SANDBOX) return Promise.resolve(getSandboxTree(path))

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
) => {
  if (IS_SANDBOX) return Promise.resolve(getSandboxIndex<T, P>(path))

  const route = contentStringPath(path);

  const json = await fetch(indexUrl(route)).then((res) => res.json());
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

const getSandboxTree = (path: ContentPath) => {
  const route = contentStringPath(path);

  const loaded = require("../course/" + route.join("/") + "/index.json");
  let subDirs: string[] = [];
  if (isPathToCourse(path)) {
    subDirs = (loaded as CourseIndex).topicIdsOrdered;
  } else if (isPathToTopic(path)) {
    subDirs = (loaded as TopicIndex).chapterIdsOrdered;
  } else if (isPathToChapter(path)) {
    subDirs = (loaded as ChapterIndex).lessonIdsOrdered;
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

const getSandboxIndex = <T = any, P extends ContentPath = ContentPath>(path: ContentPath) => {
  const route = contentStringPath(path);
  const loaded = require("../course/" + route.join("/") + "/index.json");
  if (loaded) {
    return {
      ...loaded,
      path,
      route
    } as T & { id: string; path: P }
  } else {
    throw new WhyWhatError({
      what: "Couldn't find content",
      why: "Nothing at " + route.join("/"),
    });
  }
};
