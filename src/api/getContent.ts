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
export async function getContent<T = any, P extends ContentPath = ContentPath>(
  path: P,
  target: "index.json"
): Promise<T & { id: string; path: P }>;
export async function getContent<T = any, P extends ContentPath = ContentPath>(
  path: P,
  target: "index.json",
  recursive: true
): Promise<T & { id: string; path: P }>;

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
  const route = contentStringPath(path);
  const json: GitLabTreeContent[] = await fetch(
    `https://gitlab.com/api/v4/projects/${PROJECT_ID}/repository/tree?path=${route.join(
      "/"
    )}&ref=${BRANCH}`
  ).then((res) => res.json());

  return filterForTrees ? json.filter((val) => val.type === "tree") : json;
};

const getIndex = async <T = any, P extends ContentPath = ContentPath>(
  path: P
) => {
  const route = contentStringPath(path);

  const json = await fetch(
    `https://gitlab.com/api/v4/projects/${PROJECT_ID}/
repository/files/${encodeURIComponent(
      `${route.join("/")}/index.json`
    )}/raw?ref=${BRANCH}`
  ).then((res) => res.json());
  return {
    ...json,
    id: route[route.length - 1],
    path,
  } as T & { id: string; path: P };
};
