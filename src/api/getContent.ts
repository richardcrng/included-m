import {
  ChapterIndex,
  LessonIndex,
  TopicIndex,
} from "../content/content-types";

const BRANCH = "main";
const PROJECT_ID = "23276565";

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

export async function getContent(
  path: ContentPath
): Promise<GitLabTreeContent[]>;
export async function getContent(
  path: ContentPath,
  target: "tree"
): Promise<GitLabTreeContent[]>;
export async function getContent<T = any>(
  path: ContentPath,
  target: "index.json"
): Promise<T>;
export async function getContent<T = any>(
  path: ContentPath,
  target: "index.json",
  recursive: true
): Promise<T>;

export async function getContent<T = any>(
  path: ContentPath,
  target: "index.json" | "tree" = "index.json",
  recursive = false
) {
  const route = contentStringPath(path);
  if (target === "tree") {
    return getTree(route);
  } else if (!recursive) {
    return getIndex<T>(route);
  } else {
    return getIndex<T>(route);
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

const getTree = async (path: string[], filterForTrees = true) => {
  const json: GitLabTreeContent[] = await fetch(
    `https://gitlab.com/api/v4/projects/${PROJECT_ID}/repository/tree?path=${path.join(
      "/"
    )}&ref=${BRANCH}`
  ).then((res) => res.json());

  return filterForTrees ? json.filter((val) => val.type === "tree") : json;
};

const getIndex = async <T = any>(path: string[]) => {
  const json = await fetch(
    `https://gitlab.com/api/v4/projects/${PROJECT_ID}/
repository/files/${encodeURIComponent(
      `${path.join("/")}/index.json`
    )}/raw?ref=${BRANCH}`
  ).then((res) => res.json());
  return json as T;
};
